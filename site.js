/* SuperToken site runtime: shared nav/footer, language toggle, tabs, copy buttons,
   model filters, status loader. No framework, no external scripts. */
(function () {
  const root = document.documentElement;
  const page = root.dataset.page || 'home';

  const copy = {
    zh: {
      home: '首页', models: '模型广场', pricing: '定价', docs: '文档', status: '状态',
      statusLabel: '线路状态', console: '控制台', footStatus: '服务状态', support: '联系支持',
      legal: '使用本服务时请遵守《生成式人工智能服务管理暂行办法》及相关适用法律法规，不得利用大模型生成或传播违法违规内容。',
      copied: '已复制', copyLabel: '复制'
    },
    en: {
      home: 'Home', models: 'Models', pricing: 'Pricing', docs: 'Docs', status: 'Status',
      statusLabel: 'Route status', console: 'Console', footStatus: 'Service status', support: 'Support',
      legal: 'Use this service in accordance with applicable laws and regulations. Do not use language models to generate or distribute illegal content.',
      copied: 'Copied', copyLabel: 'Copy'
    }
  };

  const icon = {
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12"/><path d="M18 6L6 18"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/></svg>'
  };

  // Logo G · 切片：一枚 token 被斜切一刀 —— “折”
  const logo = (id, size) => `<svg width="${size}" height="${size}" viewBox="2 2 20 20" fill="none" aria-hidden="true"><defs><clipPath id="${id}"><rect x="2" y="2" width="20" height="20" rx="6"/></clipPath></defs><rect x="2" y="2" width="20" height="20" rx="6" fill="#1f6f5a"/><path d="M2 22L22 2v20z" fill="#5fcf9f" clip-path="url(#${id})"/></svg>`;

  function navLink(key, href, external) {
    const active = page === key ? ' active' : '';
    const current = page === key ? ' aria-current="page"' : '';
    const target = external ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a href="${href}" class="st-nav-link${active}"${current}${target}><span data-site-copy="${key}"></span></a>`;
  }
  function mobileLink(key, href, external) {
    const target = external ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a href="${href}" class="${page === key ? 'active' : ''}"${target}><span data-site-copy="${key}"></span></a>`;
  }

  const links = [
    ['home', 'index.html'], ['models', 'models.html'], ['pricing', 'pricing.html'],
    ['docs', 'https://docs.supertoken.cc/', true], ['status', 'status.html']
  ];

  const navMount = document.getElementById('site-nav-mount');
  if (navMount) {
    navMount.innerHTML = `<nav class="st-nav" aria-label="主导航">
      <div class="st-nav-inner wrap">
        <div class="st-nav-left">
          <a href="index.html" class="st-brand">${logo('st-logo-nav', 20)}<span class="st-brand-name">SuperToken</span></a>
          <div class="st-nav-links">${links.map(l => navLink(...l)).join('')}</div>
        </div>
        <div class="st-nav-actions">
          <div class="st-lang" role="group" aria-label="Language"><button type="button" id="lang-zh" aria-pressed="true">中</button><button type="button" id="lang-en" aria-pressed="false">EN</button></div>
          <a href="status.html" class="st-status-link"><span class="st-status-dot" id="nav-status-dot"></span><span data-site-copy="statusLabel"></span></a>
          <a href="https://supertoken.cc/login" class="st-console"><span data-site-copy="console"></span></a>
          <button id="nav-menu" class="st-menu-button" type="button" aria-label="打开导航" aria-expanded="false" aria-controls="mobile-nav">${icon.menu}</button>
        </div>
      </div>
      <div id="mobile-nav" class="st-mobile-nav">${links.map(l => mobileLink(...l)).join('')}</div>
    </nav>`;
  }

  const footerMount = document.getElementById('site-footer-mount');
  if (footerMount) {
    footerMount.innerHTML = `<footer class="st-footer"><div class="st-footer-inner wrap">
      <div class="st-footer-row">
        <a href="index.html" class="st-footer-brand">${logo('st-logo-foot', 18)}SuperToken<small>© 2026</small></a>
        <div class="st-footer-links"><a href="models.html" data-site-copy="models"></a><a href="pricing.html" data-site-copy="pricing"></a><a href="https://docs.supertoken.cc/" target="_blank" rel="noopener noreferrer" data-site-copy="docs"></a><a href="status.html" data-site-copy="footStatus"></a></div>
        <div class="st-contacts"><span><i class="k">微信</i><code>minus502</code></span><span><i class="k">微信</i><code>piplszy</code></span><a href="https://x.com/memegoai" target="_blank" rel="noopener noreferrer"><span><i class="k x">X</i><code>@memegoai</code></span></a></div>
      </div>
      <p class="st-legal" data-site-copy="legal"></p>
    </div></footer>`;
  }

  /* ---------- language ---------- */
  const zhTitle = document.title;
  function applyLanguage(lang) {
    const next = lang === 'en' ? 'en' : 'zh';
    const dict = copy[next];
    root.dataset.lang = next;
    root.lang = next === 'en' ? 'en' : 'zh-CN';
    try { localStorage.setItem('st-lang', next); } catch (e) { /* private mode */ }
    document.querySelectorAll('[data-site-copy]').forEach(el => {
      const value = dict[el.dataset.siteCopy];
      if (value) el.textContent = value;
    });
    document.querySelectorAll('[data-copy-zh][data-copy-en]').forEach(el => {
      el.textContent = next === 'en' ? el.dataset.copyEn : el.dataset.copyZh;
    });
    document.querySelectorAll('[data-placeholder-zh][data-placeholder-en]').forEach(el => {
      el.placeholder = next === 'en' ? el.dataset.placeholderEn : el.dataset.placeholderZh;
    });
    if (root.dataset.titleEn) document.title = next === 'en' ? root.dataset.titleEn : zhTitle;
    const zh = document.getElementById('lang-zh');
    const en = document.getElementById('lang-en');
    if (zh && en) {
      zh.classList.toggle('active', next === 'zh');
      en.classList.toggle('active', next === 'en');
      zh.setAttribute('aria-pressed', String(next === 'zh'));
      en.setAttribute('aria-pressed', String(next === 'en'));
    }
  }
  let stored = 'zh';
  try { stored = localStorage.getItem('st-lang') || 'zh'; } catch (e) { /* ignore */ }
  applyLanguage(root.dataset.lang || stored);
  document.getElementById('lang-zh')?.addEventListener('click', () => applyLanguage('zh'));
  document.getElementById('lang-en')?.addEventListener('click', () => applyLanguage('en'));
  const currentLang = () => (root.dataset.lang === 'en' ? 'en' : 'zh');

  /* ---------- mobile menu ---------- */
  const menuButton = document.getElementById('nav-menu');
  const mobileNav = document.getElementById('mobile-nav');
  menuButton?.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.innerHTML = open ? icon.close : icon.menu;
  });
  mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    if (menuButton) menuButton.innerHTML = icon.menu;
  }));

  /* ---------- tabs ---------- */
  document.querySelectorAll('[data-tab]').forEach(tab => tab.addEventListener('click', () => {
    const panel = tab.closest('.panel');
    if (!panel) return;
    panel.querySelectorAll('[data-tab]').forEach(t => {
      const on = t === tab;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', String(on));
    });
    panel.querySelectorAll('[data-panel]').forEach(p => p.classList.toggle('active', p.dataset.panel === tab.dataset.tab));
  }));

  /* ---------- copy buttons ---------- */
  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; } catch (e) { return false; }
  }
  document.querySelectorAll('[data-copy], [data-copy-target]').forEach(btn => btn.addEventListener('click', async () => {
    const text = btn.dataset.copy ?? document.getElementById(btn.dataset.copyTarget)?.textContent ?? '';
    if (!text || !(await copyText(text))) return;
    btn.classList.add('done');
    const label = btn.querySelector('[data-copy-label]');
    const iconHolder = btn.querySelector('[data-copy-icon]');
    if (label) label.textContent = copy[currentLang()].copied;
    if (iconHolder) iconHolder.innerHTML = icon.check;
    setTimeout(() => {
      btn.classList.remove('done');
      if (label) label.textContent = copy[currentLang()].copyLabel;
      if (iconHolder) iconHolder.innerHTML = icon.copy;
    }, 1600);
  }));

  /* ---------- models: search + filters ---------- */
  const search = document.getElementById('model-search');
  if (search) {
    const rows = [...document.querySelectorAll('[data-model-row]')];
    const sections = [...document.querySelectorAll('[data-model-section]')];
    const typeChips = [...document.querySelectorAll('[data-filter-type]')];
    const vendorChips = [...document.querySelectorAll('[data-filter-vendor]')];
    const empty = document.getElementById('models-empty');
    let type = 'all', vendor = 'all';
    function apply() {
      const q = search.value.trim().toLowerCase();
      let visible = 0;
      rows.forEach(row => {
        const ok = (type === 'all' || row.dataset.type === type)
          && (vendor === 'all' || row.dataset.vendor === vendor)
          && (!q || (row.dataset.search || '').toLowerCase().includes(q));
        row.hidden = !ok;
        if (ok) visible += 1;
      });
      sections.forEach(sec => { sec.hidden = !sec.querySelector('[data-model-row]:not([hidden])'); });
      if (empty) empty.hidden = visible !== 0;
    }
    typeChips.forEach(chip => chip.addEventListener('click', () => {
      type = chip.dataset.filterType;
      typeChips.forEach(c => c.classList.toggle('active', c === chip));
      apply();
    }));
    vendorChips.forEach(chip => chip.addEventListener('click', () => {
      vendor = vendor === chip.dataset.filterVendor ? 'all' : chip.dataset.filterVendor;
      vendorChips.forEach(c => c.classList.toggle('active', c.dataset.filterVendor === vendor));
      apply();
    }));
    search.addEventListener('input', apply);
  }

  /* ---------- docs: side nav ---------- */
  const docLinks = [...document.querySelectorAll('.doc-nav a')];
  docLinks.forEach(link => link.addEventListener('click', () => docLinks.forEach(l => l.classList.toggle('active', l === link))));

  /* ---------- status: render from status.json when it exists ----------
     Expected shape (see status.example.json). Without the file the page keeps
     its honest "not connected" state; nothing is hard-coded as green. */
  if (page === 'status') {
    fetch('status.json', { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null))
      .then(data => { if (data) renderStatus(data); })
      .catch(() => { /* keep pending state */ });
  }

  function renderStatus(data) {
    const lang = currentLang();
    const t = (zh, en) => (lang === 'en' ? en : zh);
    const stateText = { ok: t('正常', 'Operational'), warn: t('部分降级', 'Degraded'), down: t('故障', 'Outage'), none: t('未接入', 'Not connected') };
    const overall = data.overall || 'none';

    document.getElementById('status-notice')?.setAttribute('hidden', '');
    const pill = document.getElementById('status-overall');
    if (pill) { pill.className = `status-pill ${overall}`; pill.querySelector('span').textContent = data.headline || stateText[overall]; }
    const dot = document.getElementById('nav-status-dot');
    if (dot) dot.className = `st-status-dot is-${overall}`;
    const updated = document.getElementById('status-updated');
    if (updated && data.updatedAt) updated.textContent = data.updatedAt;

    const s = data.summary || {};
    const set = (id, value, cls) => { const el = document.getElementById(id); if (!el) return; el.textContent = value ?? '--'; el.classList.remove('pending'); if (cls) el.classList.add(cls); };
    set('sum-24h', s.uptime24h);
    set('sum-30d', s.uptime30d);
    const p95 = document.getElementById('sum-p95');
    if (p95) { p95.innerHTML = `${s.p95ms ?? '--'} <small>ms</small>`; p95.classList.remove('pending'); }
    set('sum-incidents', String(s.activeIncidents ?? 0), s.activeIncidents ? 'warn-c' : '');

    const list = document.getElementById('service-list');
    if (list && Array.isArray(data.services)) {
      list.innerHTML = data.services.map(svc => `<div class="srow">
        <div><strong>${esc(svc.name)}</strong><small class="sub">${esc(svc.sub || '')}</small></div>
        <div class="bars" aria-label="24h">${(svc.bars || []).slice(0, 24).map(b => `<span class="${esc(b)}"></span>`).join('')}</div>
        <div class="uptime"><b>${esc(svc.uptime || '--')}</b><small>P95 ${esc(svc.p95 || '--')}</small></div>
        <span class="state ${esc(svc.state || 'none')}"><i></i>${stateText[svc.state] || stateText.none}</span>
      </div>`).join('');
    }

    const inc = document.getElementById('incident-list');
    if (inc && Array.isArray(data.incidents)) {
      inc.innerHTML = data.incidents.length ? data.incidents.map(i => `<div class="incident">
        <time>${esc(i.time)}</time>
        <div><strong>${esc(i.title)}</strong><p>${esc(i.detail || '')}</p></div>
        <span class="badge ${esc(i.state || '')}"><i></i>${esc(i.label || '')}</span>
      </div>`).join('') : `<div class="empty">${t('最近没有事件。', 'No recent incidents.')}</div>`;
    }
  }
  function esc(v) { return String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
})();
