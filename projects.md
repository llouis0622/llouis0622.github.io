---
layout: default
title: 프로젝트
description: 서비스, 모델링, 지식베이스, 스터디까지 — 직접 만들고 운영한 것들
permalink: /projects/
---
{%- assign projects = site.data.projects | sort: "order" -%}
{%- assign categories = projects | map: "category" | uniq -%}

<article class="container page">
  <header class="page__header">
    <p class="eyebrow">Projects</p>
    <h1 class="page__title">{{ page.title }}</h1>
    <p class="page__desc">{{ page.description }}</p>
  </header>

  <div class="filter" role="group" aria-label="카테고리 필터" data-filter-group="projects">
    <button class="chip is-active" type="button" data-filter="all">전체 <span class="chip__count">{{ projects.size }}</span></button>
    {%- for c in categories -%}
      {%- assign n = projects | where: "category", c | size -%}
      <button class="chip" type="button" data-filter="{{ c }}">{{ c }} <span class="chip__count">{{ n }}</span></button>
    {%- endfor -%}
  </div>

  <ul class="grid grid--projects" data-filter-list="projects">
    {%- for pr in projects -%}
      {%- include project-card.html project=pr -%}
    {%- endfor -%}
  </ul>
</article>
