---
title: "동넷 AI 설계: 왜 XGBRanker + SHAP인가"
description: "경로 추천을 정형 데이터의 랭킹 문제로 정의하고, 4개 지도 소스에서 경로를 모아 16개 피처로 점수화하기까지."
category: 모델링
tags: [동넷, XGBoost, LTR, SHAP, OSMnx, GeoPandas, 경로추천]
---

교통약자 맞춤형 경로 추천 서비스 "동넷"의 AI 파트 설계 문서를 정리했다. 결론은 단순하다. **정형(tabular) 데이터의 랭킹 문제**이므로 트리 계열 부스팅 모델을 주력으로 쓰고, SHAP으로 추천 이유를 자동 생성한다.

<!--more-->

## 문제 정의

- 경로 점수화: 경로 피처(도보거리, 환승 수, 계단 여부, 혼잡도 등) → 점수 → 회귀 또는 랭킹(LTR)
- 경로 등급 분류: 매우적합 ~ 이용어려움 → 다중분류
- 경로 속성 라벨링: 계단없음/엘리베이터/저상버스 → 다중라벨
- 부가 예측: 혼잡도, 사고위험 → 회귀/분류

지도 · 교통 피처를 표로 만들어서 학습하는 구조이므로 XGB/LightGBM/RF가 유리하다.

## 경로 수집: 4개 소스 병렬 호출 + fallback

```text
출발지 · 도착지 선택
  ↓ 카카오 로컬 API로 좌표 획득
  ↓ 카카오 · 네이버 · 티맵 · OSMnx에 비동기 병렬 요청
  ↓ 좌표 시퀀스(polyline) 수집
  ↓ 50m 샘플링 후 대응 좌표 평균 거리 30m 이내면 동일 경로로 병합
  ↓ 피처 추출 → 점수화
```

티맵 보행자 API는 `facilityType`에서 계단 · 엘리베이터 여부를 직접 주기 때문에 접근성 피처의 핵심 재료다. OSMnx는 외부 API가 모두 실패해도 **최소 1개 경로를 보장하는 fallback**이자, 프로필별로 엣지 비용을 바꿔(휠체어면 계단 엣지 비용 = ∞, 폭염이면 실외 엣지 가중) 같은 알고리즘으로 다른 경로를 뽑는 레이어다.

## 피처 16개

```text
stair_count, avg_slope_percent, max_slope_percent, min_slope_percent, slope_iqr,
elevator_ratio, sidewalk_width_avg_m, transfer_count, walk_distance_m,
total_duration_min, accident_zone_count, cctv_density, is_low_floor_bus,
crowd_level, weather_risk, shelter_nearby
```

경사도는 평균만으로 부족했다. 최대 경사(가장 가파른 구간)와 IQR(구간 편차)을 넣어야 "평균은 낮은데 한 구간이 급한" 경로를 잡아낸다.

## 모델 구성

| 모델 | 역할 |
|---|---|
| **XGBoost (XGBRanker)** | 프로필별 경로 점수(0~100)와 순위(LTR). 서비스 핵심 |
| LightGBM (LGBMRanker) | 비교 실험 대상. 범주형 피처 처리 강점 |
| Random Forest | 주력 모델이 유의미하게 넘어야 하는 baseline |
| 로지스틱 회귀 | 등급 분류 baseline + 음성명령 의도 분류 |
| 선형 회귀 | 어떤 피처가 점수에 얼마나 영향을 주는지 초기 검증 |
| DBSCAN | 사고 데이터 클러스터링 → `accident_zone_count` 재료 |
| **SHAP** | "엘리베이터 +18점, 계단 없음 +15점" 식 추천 이유 자동 생성 |

DNN · CNN · RNN · GAN · Diffusion · RL은 이 단계에서 제외했다. 데이터가 적고, 정형 피처 기반 점수화에 구조적으로 맞지 않으며, 2개월 일정에서 리스크가 크다. 특히 RL은 환경 · 보상 설계와 대량 상호작용 데이터가 필요해서 MVP 이후로 미뤘다.

## 로짓 단계에서 프로필 패널티

XGBoost 점수를 최종 출력이 아니라 **로짓**으로 취급한다. Softmax 이전에 프로필별 패널티 테이블을 적용해 로짓을 보정한 뒤 Softmax를 연산한다. Softmax 이후에 후처리하면 확률 스케일이 작아져 프로필 편향을 강하게 제어하기 어렵다. 추가 데이터가 들어오면 딥러닝 모델을 함께 학습해 XGBoost와 앙상블(Weighted Average)한 뒤 같은 구조를 유지한다.

## 결과

실제 부산 OD 380개 · 경로 후보 1,137개 · 프로필 평가 6,822개로 6개 랭킹 모델을 비교했고, NDCG@3 0.9166 ~ 0.9596을 확보했다. 서비스는 [dongnet.kr](https://dongnet.kr), 코드는 [github.com/llouis0622/KT-10](https://github.com/llouis0622/KT-10).
