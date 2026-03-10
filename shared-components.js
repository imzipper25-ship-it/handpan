/* shared-components.js — Bottom nav, sticky CTA, language switcher, aurora render */

(function () {
    'use strict';

    // ── Detect current page ──────────────────────────────────
    const page = location.pathname.split('/').pop() || 'index.html';

    // ── Inject Aurora Background ────────────────────────────
    function injectAurora() {
        const aurora = document.createElement('div');
        aurora.className = 'aurora-bg';
        aurora.innerHTML = `
      <div class="aurora-orb" style="width:50vw;height:50vw;top:30%;left:40%;
        background:radial-gradient(circle,#0ea5e9 0%,transparent 70%);animation-delay:-4s;"></div>
      <div class="aurora-orb" style="width:35vw;height:35vw;top:10%;right:10%;
        background:radial-gradient(circle,#10b981 0%,transparent 70%);animation-delay:-12s;"></div>
    `;
        document.body.insertBefore(aurora, document.body.firstChild);
    }

    // ── Language State ──────────────────────────────────────
    const LANGS = [
        { code: 'pt', flag: '🇵🇹', label: 'Português' },
        { code: 'en', flag: '🇬🇧', label: 'English' },
        { code: 'ua', flag: '🇺🇦', label: 'Українська' },
        { code: 'ru', flag: '🇷🇺', label: 'Русский' },
    ];
    let activeLang = localStorage.getItem('lang') || 'pt';

    function getCurrentLang() { return LANGS.find(l => l.code === activeLang) || LANGS[0]; }

    // ── Inject Bottom Nav ───────────────────────────────────
    function injectBottomNav() {
        const nav = [
            { id: 'index.html', href: 'index.html', icon: homeIcon(), label: 'Início' },
            { id: 'escola.html', href: 'escola.html', icon: schoolIcon(), label: 'Escola' },
            { id: 'inscricao.html', href: 'inscricao.html', icon: calIcon(), label: 'Inscrever' },
            { id: 'eventos.html', href: 'eventos.html', icon: starIcon(), label: 'Eventos' },
            { id: 'loja.html', href: 'loja.html', icon: shopIcon(), label: 'Loja' },
        ];

        const langCurrent = getCurrentLang();

        const bn = document.createElement('nav');
        bn.className = 'bottom-nav';
        bn.setAttribute('aria-label', 'Navegação principal');
        bn.innerHTML = nav.map(n => `
      <a href="${n.href}" class="bnav-item${page === n.id ? ' active' : ''}" aria-label="${n.label}">
        ${n.icon}
        <span>${n.label}</span>
      </a>
    `).join('') + `
      <div class="bnav-lang" id="langToggle" role="button" aria-expanded="false" tabindex="0">
        <span class="flag">${langCurrent.flag}</span>
        <span class="label">Idioma</span>
        <div class="lang-dropdown" id="langDropdown">
          ${LANGS.map(l => `
            <div class="lang-option${l.code === activeLang ? ' active' : ''}" data-lang="${l.code}">
              <span class="flag">${l.flag}</span>
              <span>${l.label}</span>
            </div>`).join('')}
        </div>
      </div>
    `;

        document.body.appendChild(bn);

        // Lang dropdown toggle
        const toggle = document.getElementById('langToggle');
        const dropdown = document.getElementById('langDropdown');
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('open');
            toggle.setAttribute('aria-expanded', dropdown.classList.contains('open'));
        });
        document.addEventListener('click', () => dropdown.classList.remove('open'));

        dropdown.querySelectorAll('.lang-option').forEach(opt => {
            opt.addEventListener('click', (e) => {
                e.stopPropagation();
                activeLang = opt.dataset.lang;
                localStorage.setItem('lang', activeLang);
                location.reload();
            });
        });
    }

    // ── Inject Sticky CTA ───────────────────────────────────
    function injectStickyCTA() {
        const cta = document.createElement('div');
        cta.className = 'sticky-cta';
        cta.innerHTML = `
      <a href="inscricao.html" class="sticky-cta-btn" aria-label="Inscreva-se já">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
        </svg>
        Inscreva-se já
      </a>
    `;
        document.body.appendChild(cta);
    }

    // ── Inject Top Nav (links for desktop) ─────────────────
    function injectTopNavLinks() {
        const topNav = document.querySelector('.top-nav');
        if (!topNav) return;
        const list = topNav.querySelector('.nav-links');
        if (!list) return;
        const links = [
            { href: 'index.html', label: 'Início' },
            { href: 'escola.html', label: 'Escola' },
            { href: 'inscricao.html', label: 'Inscrever' },
            { href: 'eventos.html', label: 'Eventos' },
            { href: 'loja.html', label: 'Loja' },
            { href: 'sobre.html', label: 'Sobre Nós' },
            { href: 'blogue.html', label: 'Blog' },
            { href: 'contactos.html', label: 'Contactos' },
        ];
        list.innerHTML = links.map(l =>
            `<li><a href="${l.href}" class="${page === l.href ? 'active' : ''}">${l.label}</a></li>`
        ).join('');
    }

    // ── Init ────────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', () => {
        injectAurora();
        injectBottomNav();
        injectStickyCTA();
        injectTopNavLinks();
    });

    // ── SVG Icons ───────────────────────────────────────────
    function homeIcon() {
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
    }
    function schoolIcon() {
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`;
    }
    function calIcon() {
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
    }
    function starIcon() {
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    }
    function shopIcon() {
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`;
    }

})();
