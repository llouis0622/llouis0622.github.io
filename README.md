# llouis0622.github.io

오신의(Shinui Oh) · LLouis 개인 홈페이지. 이력서와 활동 로그를 담습니다.

- 사이트: https://llouis0622.github.io
- 스택: Jekyll(GitHub Pages 기본 빌드) · 플러그인 없는 커스텀 레이아웃 · Pretendard · 흑백 · 다크 모드 기본

## 구조

```
_config.yml          사이트 설정
_data/profile.yml    이름 · 소개 · 현재 소속 · 링크 (홈 · 헤더 · 푸터)
_data/resume.yml     이력서 데이터 → /resume/
_data/projects.yml   프로젝트 카드 → /projects/ 와 홈 하이라이트(featured)
_data/navigation.yml 상단 메뉴
_posts/              로그(블로그) 글
_templates/          글 템플릿 (빌드에서 제외)
_layouts/ _includes/ 레이아웃
assets/css|js|img    스타일 · 스크립트 · 이미지
index.md resume.md projects.md log.md 404.md  페이지
```

## 글 쓰기

1. `_templates/post-template.md` 를 `_posts/YYYY-MM-DD-slug.md` 로 복사
2. front matter의 `title` · `description` · `category` · `tags` 채우기
3. 본문 작성 후 push → GitHub Pages가 자동으로 빌드

`category`는 자유롭게 정할 수 있고, `/log/` 페이지의 필터 칩으로 자동 노출됩니다.

## 이력서 · 프로젝트 수정

- 이력서 내용은 `_data/resume.yml` 만 수정하면 됩니다. (경력 · 프로젝트 · 스킬 · 수상 · 학력)
- 프로젝트 카드는 `_data/projects.yml` 에 항목을 추가하고, 홈에 노출하려면 `featured: true` 로 두세요.
- 현재 소속 · 하는 일은 `_data/profile.yml` 의 `now` 항목입니다.

## 로컬 실행

```bash
bundle install
bundle exec jekyll serve --livereload
# http://localhost:4000
```

## 배포

GitHub Pages 기본 Jekyll 빌드를 사용합니다. 저장소 Settings → Pages → Source가 **Deploy from a branch**(기본 브랜치, `/ (root)`)로 되어 있으면 push 만으로 배포됩니다.
