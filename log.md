---
layout: default
title: 로그
description: 일하고, 만들고, 공부한 것을 기록합니다.
permalink: /log/
---
{%- assign categories = site.posts | map: "category" | compact | uniq -%}

<article class="container page">
  <header class="page__header">
    <p class="eyebrow">Log</p>
    <h1 class="page__title">{{ page.title }}</h1>
    <p class="page__desc">{{ page.description }}</p>
  </header>

  <div class="filter" role="group" aria-label="카테고리 필터" data-filter-group="posts">
    <button class="chip is-active" type="button" data-filter="all">전체 <span class="chip__count">{{ site.posts.size }}</span></button>
    {%- for c in categories -%}
      {%- assign n = site.posts | where: "category", c | size -%}
      <button class="chip" type="button" data-filter="{{ c }}">{{ c }} <span class="chip__count">{{ n }}</span></button>
    {%- endfor -%}
  </div>

  {%- assign years = site.posts | map: "date" | map: "year" -%}
  {%- assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" -%}
  <div data-filter-list="posts">
  {%- for group in posts_by_year -%}
    <section class="year-group" data-year="{{ group.name }}">
      <h2 class="year-group__title">{{ group.name }}</h2>
      <ul class="post-list">
        {%- for post in group.items -%}
          {%- include post-card.html post=post -%}
        {%- endfor -%}
      </ul>
    </section>
  {%- endfor -%}
  </div>
  <p class="empty" data-filter-empty hidden>해당 카테고리의 글이 아직 없습니다.</p>
</article>
