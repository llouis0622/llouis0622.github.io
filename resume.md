---
layout: default
title: 이력서
description: 오신의(Shinui Oh) · AI Engineer · LLM & RAG
permalink: /resume/
body_class: is-resume
---
{%- assign r = site.data.resume -%}
{%- assign p = site.data.profile -%}

<article class="container resume">

  <header class="resume__header">
    <div class="resume__id">
      <img class="avatar avatar--lg" src="{{ p.avatar }}" alt="{{ p.name }} 프로필 사진" width="88" height="88">
      <div>
        <p class="eyebrow">Resume · 업데이트 {{ r.updated | date: "%Y.%m.%d" }}</p>
        <h1 class="resume__name">{{ p.name }} <span class="resume__name-en">{{ p.name_en }}</span></h1>
        <p class="resume__role">{{ p.role }} · {{ p.now.company }} {{ p.now.team }} {{ p.now.title }}</p>
        <p class="resume__tagline">{{ p.headline }}</p>
      </div>
    </div>
    <div class="resume__contacts">
      <a href="mailto:{{ p.email }}">{{ p.email }}</a>
      <a href="https://github.com/llouis0622" target="_blank" rel="noopener">github.com/llouis0622</a>
      <a href="https://www.linkedin.com/in/llouis0622/" target="_blank" rel="noopener">linkedin.com/in/llouis0622</a>
      <a href="https://llouis.notion.site/resume" target="_blank" rel="noopener">llouis.notion.site/resume</a>
    </div>
    <div class="resume__tools no-print">
      <button class="btn btn--ghost btn--sm" type="button" onclick="window.print()">PDF로 저장 · 인쇄</button>
      <a class="btn btn--ghost btn--sm" href="https://llouis.notion.site/resume" target="_blank" rel="noopener">Notion에서 보기 <span aria-hidden="true">↗</span></a>
    </div>
  </header>

  <section class="resume__section">
    <h2 class="resume__h2">Profile</h2>
    <p class="resume__summary">{{ r.profile.summary }}</p>
  </section>

  <section class="resume__section">
    <h2 class="resume__h2">Experience</h2>
    {%- for job in r.experience -%}
    <div class="resume__entry">
      <div class="resume__entry-head">
        <div>
          <h3 class="resume__h3">{{ job.company }}</h3>
          <p class="resume__sub">{{ job.title }}</p>
        </div>
        <span class="resume__period">{{ job.period }}</span>
      </div>
      {%- for pj in job.projects -%}
      <div class="resume__project">
        <h4 class="resume__h4">{{ pj.name }}</h4>
        {%- if pj.summary -%}<p class="resume__sub">{{ pj.summary }}</p>{%- endif -%}
        {%- if pj.stack -%}<p class="resume__stack">{{ pj.stack | join: " · " }}</p>{%- endif -%}
        <ul class="resume__bullets">
          {%- for b in pj.bullets -%}<li>{{ b }}</li>{%- endfor -%}
        </ul>
      </div>
      {%- endfor -%}
    </div>
    {%- endfor -%}
  </section>

  <section class="resume__section">
    <h2 class="resume__h2">Selected Projects</h2>
    {%- for pj in r.selected_projects -%}
    <div class="resume__entry">
      <div class="resume__entry-head">
        <div>
          <h3 class="resume__h3">{{ pj.name }}</h3>
          <p class="resume__sub">{{ pj.role }}</p>
        </div>
        <span class="resume__period">{{ pj.period }}</span>
      </div>
      {%- if pj.stack -%}<p class="resume__stack">{{ pj.stack | join: " · " }}</p>{%- endif -%}
      <ul class="resume__bullets">
        {%- for b in pj.bullets -%}<li>{{ b }}</li>{%- endfor -%}
      </ul>
      {%- if pj.links -%}
      <p class="resume__links">
        {%- for l in pj.links -%}<a href="{{ l.url }}" target="_blank" rel="noopener">{{ l.label }} ↗</a>{%- endfor -%}
      </p>
      {%- endif -%}
    </div>
    {%- endfor -%}
  </section>

  <section class="resume__section">
    <h2 class="resume__h2">Technical Skills</h2>
    <dl class="resume__skills">
      {%- for g in r.skills -%}
      <div class="resume__skill">
        <dt>{{ g.group }}</dt>
        <dd>{{ g.items | join: ", " }}</dd>
      </div>
      {%- endfor -%}
    </dl>
  </section>

  <section class="resume__section">
    <h2 class="resume__h2">Research &amp; Awards</h2>
    <div class="resume__cols">
      <div>
        <h3 class="resume__h3 resume__h3--sm">연구</h3>
        <ul class="resume__plain">
          {%- for x in r.research -%}
          <li><strong>{{ x.name }}</strong> · {{ x.org }} <span class="muted">{{ x.period }}</span><br><span class="muted">{{ x.desc }}</span></li>
          {%- endfor -%}
        </ul>
      </div>
      <div>
        <h3 class="resume__h3 resume__h3--sm">수상</h3>
        <ul class="resume__plain">
          {%- for x in r.awards -%}
          <li><strong>{{ x.name }}</strong> · {{ x.org }} <span class="muted">{{ x.year }}</span></li>
          {%- endfor -%}
        </ul>
        <h3 class="resume__h3 resume__h3--sm">대회</h3>
        <ul class="resume__plain">
          {%- for x in r.competitions -%}
          <li><strong>{{ x.name }}</strong> · {{ x.result }} <span class="muted">{{ x.year }}</span></li>
          {%- endfor -%}
        </ul>
      </div>
    </div>
  </section>

  <section class="resume__section">
    <h2 class="resume__h2">Education</h2>
    <ul class="resume__plain">
      {%- for e in r.education -%}
      <li><strong>{{ e.school }}</strong> · {{ e.degree }} <span class="muted">{{ e.period }}</span></li>
      {%- endfor -%}
    </ul>
  </section>

  <section class="resume__section">
    <h2 class="resume__h2">Links</h2>
    <ul class="resume__plain resume__plain--inline">
      {%- for l in p.links -%}
      <li><a href="{{ l.url }}"{% unless l.url contains 'mailto:' %} target="_blank" rel="noopener"{% endunless %}>{{ l.label }}</a></li>
      {%- endfor -%}
    </ul>
  </section>

</article>
