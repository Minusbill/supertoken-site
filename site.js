(function () {
    const root = document.documentElement;
    const activePage = root.dataset.page || 'home';
    const navCopy = {
        zh: { home: '首页', models: '模型广场', pricing: '定价', docs: '文档', status: '状态', statusLabel: '线路状态', console: '控制台' },
        en: { home: 'Home', models: 'Models', pricing: 'Pricing', docs: 'Docs', status: 'Status', statusLabel: 'Route status', console: 'Console' }
    };

    function pageLink(page, href, label, external = false) {
        const active = activePage === page ? ' active' : '';
        const current = activePage === page ? ' aria-current="page"' : '';
        const target = external ? ' target="_blank" rel="noopener noreferrer"' : '';
        return `<a href="${href}" class="st-nav-link${active}"${current}${target}><span data-site-copy="${label}"></span></a>`;
    }

    const navMount = document.getElementById('site-nav-mount');
    if (navMount) {
        navMount.innerHTML = `<nav class="st-nav" aria-label="主导航">
            <div class="st-nav-inner">
                <div class="st-nav-left">
                    <a href="index.html" class="st-brand">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><defs><linearGradient id="site-stlg" x1="3" y1="4" x2="21" y2="20" gradientUnits="userSpaceOnUse"><stop stop-color="#38bdf8"/><stop offset="1" stop-color="#2563eb"/></linearGradient></defs><rect x="3" y="4" width="18" height="4.4" rx="1" fill="url(#site-stlg)"/><rect x="3" y="10" width="12" height="4.4" rx="1" fill="var(--heading)" opacity=".9"/><rect x="3" y="16" width="7" height="4.4" rx="1" fill="var(--muted)"/></svg>
                        <span class="st-brand-name">SuperToken</span>
                    </a>
                    <div class="st-nav-links">${pageLink('home', 'index.html', 'home')}${pageLink('models', 'models.html', 'models')}${pageLink('pricing', 'pricing.html', 'pricing')}${pageLink('docs', 'https://docs.supertoken.cc/', 'docs', true)}${pageLink('status', 'status.html', 'status')}</div>
                </div>
                <div class="st-nav-actions">
                    <div class="st-lang" role="group" aria-label="Language"><button type="button" id="lang-zh" aria-pressed="true">中</button><button type="button" id="lang-en" aria-pressed="false">EN</button></div>
                    <button id="theme-toggle" class="st-icon-button" aria-label="切换亮暗主题"><span id="theme-icon"><i data-lucide="sun"></i></span></button>
                    <a href="status.html" class="st-status-link"><span class="st-status-dot"></span><span data-site-copy="statusLabel"></span></a>
                    <a href="https://supertoken.cc/login" class="st-console"><span data-site-copy="console"></span></a>
                    <button id="nav-menu" class="st-icon-button st-menu-button" aria-label="打开导航" aria-expanded="false" aria-controls="mobile-nav"><span><i data-lucide="menu"></i></span></button>
                </div>
            </div>
            <div id="mobile-nav" class="st-mobile-nav">
                <a href="index.html" class="${activePage === 'home' ? 'active' : ''}"><span data-site-copy="home"></span></a>
                <a href="models.html" class="${activePage === 'models' ? 'active' : ''}"><span data-site-copy="models"></span></a>
                <a href="pricing.html" class="${activePage === 'pricing' ? 'active' : ''}"><span data-site-copy="pricing"></span></a>
                <a href="https://docs.supertoken.cc/" target="_blank" rel="noopener noreferrer" class="${activePage === 'docs' ? 'active' : ''}"><span data-site-copy="docs"></span></a>
                <a href="status.html" class="${activePage === 'status' ? 'active' : ''}"><span data-site-copy="status"></span></a>
            </div>
        </nav>`;
    }

    const footerMount = document.getElementById('site-footer-mount');
    if (footerMount) {
        footerMount.innerHTML = `<footer class="st-footer"><div class="st-footer-inner"><div><span class="st-footer-brand">SuperToken</span><span class="st-mono st-muted" style="margin-left:10px;font-size:10px">© 2026</span></div><div class="st-footer-links"><a href="models.html" data-site-copy="models"></a><a href="pricing.html" data-site-copy="pricing"></a><a href="https://docs.supertoken.cc/" target="_blank" rel="noopener noreferrer" data-site-copy="docs"></a><a href="status.html" data-site-copy="status"></a></div></div></footer>`;
    }

    function renderIcons() {
        if (window.lucide) window.lucide.createIcons({ attrs: { 'stroke-width': 1.8 } });
    }

    function applyTheme(theme) {
        const next = theme === 'light' ? 'light' : 'dark';
        root.dataset.theme = next;
        root.classList.toggle('dark', next === 'dark');
        root.classList.toggle('light', next === 'light');
        localStorage.setItem('st-theme', next);
        const holder = document.getElementById('theme-icon');
        const button = document.getElementById('theme-toggle');
        if (holder) holder.innerHTML = `<i data-lucide="${next === 'dark' ? 'sun' : 'moon'}"></i>`;
        if (button) {
            const label = next === 'dark' ? '切换到日间模式' : '切换到夜间模式';
            button.setAttribute('aria-label', label);
            button.setAttribute('title', label);
        }
        renderIcons();
    }

    function applyLanguage(lang) {
        const next = lang === 'en' ? 'en' : 'zh';
        const copy = navCopy[next];
        root.dataset.lang = next;
        root.lang = next === 'en' ? 'en' : 'zh-CN';
        localStorage.setItem('st-lang', next);
        document.querySelectorAll('[data-site-copy]').forEach(el => {
            const value = copy[el.dataset.siteCopy];
            if (value) el.textContent = value;
        });
        document.querySelectorAll('[data-copy-zh][data-copy-en]').forEach(el => {
            el.textContent = next === 'en' ? el.dataset.copyEn : el.dataset.copyZh;
        });
        document.querySelectorAll('[data-placeholder-zh][data-placeholder-en]').forEach(el => {
            el.placeholder = next === 'en' ? el.dataset.placeholderEn : el.dataset.placeholderZh;
        });
        const zh = document.getElementById('lang-zh');
        const en = document.getElementById('lang-en');
        if (zh && en) {
            zh.classList.toggle('active', next === 'zh');
            en.classList.toggle('active', next === 'en');
            zh.setAttribute('aria-pressed', String(next === 'zh'));
            en.setAttribute('aria-pressed', String(next === 'en'));
        }
    }

    const currentTheme = root.dataset.theme || localStorage.getItem('st-theme') || 'dark';
    const currentLanguage = root.dataset.lang || localStorage.getItem('st-lang') || 'zh';
    applyTheme(currentTheme);
    applyLanguage(currentLanguage);

    document.getElementById('theme-toggle')?.addEventListener('click', () => {
        applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
    });
    document.getElementById('lang-zh')?.addEventListener('click', () => applyLanguage('zh'));
    document.getElementById('lang-en')?.addEventListener('click', () => applyLanguage('en'));

    const menuButton = document.getElementById('nav-menu');
    const mobileNav = document.getElementById('mobile-nav');
    menuButton?.addEventListener('click', () => {
        const open = mobileNav.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', String(open));
        menuButton.querySelector('span').innerHTML = `<i data-lucide="${open ? 'x' : 'menu'}"></i>`;
        renderIcons();
    });
    mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuButton?.setAttribute('aria-expanded', 'false');
    }));

    renderIcons();
})();
