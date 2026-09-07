/* LLouis 홈페이지 — 테마 토글 · 카테고리 필터 · 외부 링크 처리 */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ── 테마 토글 (기본 다크, localStorage에 저장) ───────────── */
  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) { /* 사생활 보호 모드 등 */ }
    var meta = document.querySelector('meta[name="theme-color"]:not([media])');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', theme === 'dark' ? '#0b0b0c' : '#ffffff');
  }

  var toggle = document.querySelector('[data-theme-toggle]');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ── 카테고리 필터 (프로젝트 · 로그) ─────────────────────── */
  var groups = document.querySelectorAll('[data-filter-group]');
  Array.prototype.forEach.call(groups, function (group) {
    var key = group.getAttribute('data-filter-group');
    var list = document.querySelector('[data-filter-list="' + key + '"]');
    if (!list) return;
    var empty = document.querySelector('[data-filter-empty]');
    var buttons = group.querySelectorAll('[data-filter]');
    var items = list.querySelectorAll('[data-category]');
    var sections = list.querySelectorAll('.year-group');

    function apply(filter) {
      var visible = 0;
      Array.prototype.forEach.call(items, function (item) {
        var show = filter === 'all' || item.getAttribute('data-category') === filter;
        item.hidden = !show;
        if (show) visible++;
      });
      Array.prototype.forEach.call(sections, function (sec) {
        var any = sec.querySelector('[data-category]:not([hidden])');
        sec.hidden = !any;
      });
      Array.prototype.forEach.call(buttons, function (b) {
        var on = b.getAttribute('data-filter') === filter;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      if (empty) empty.hidden = visible !== 0;
      try {
        var url = new URL(window.location.href);
        if (filter === 'all') url.searchParams.delete('c'); else url.searchParams.set('c', filter);
        history.replaceState(null, '', url.toString());
      } catch (e) { /* ignore */ }
    }

    Array.prototype.forEach.call(buttons, function (b) {
      b.addEventListener('click', function () { apply(b.getAttribute('data-filter')); });
    });

    var initial = 'all';
    try {
      var c = new URL(window.location.href).searchParams.get('c');
      if (c) {
        Array.prototype.forEach.call(buttons, function (b) {
          if (b.getAttribute('data-filter') === c) initial = c;
        });
      }
    } catch (e) { /* ignore */ }
    apply(initial);
  });

  /* ── 본문 표는 가로 스크롤 래퍼로 감싸기 ─────────────────── */
  var tables = document.querySelectorAll('.prose table');
  Array.prototype.forEach.call(tables, function (t) {
    if (t.parentNode.classList.contains('table-wrap')) return;
    var wrap = document.createElement('div');
    wrap.className = 'table-wrap';
    t.parentNode.insertBefore(wrap, t);
    wrap.appendChild(t);
  });

  /* ── 본문 외부 링크는 새 탭으로 ─────────────────────────── */
  var links = document.querySelectorAll('.prose a[href^="http"]');
  Array.prototype.forEach.call(links, function (a) {
    if (a.host !== window.location.host) {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    }
  });
})();
