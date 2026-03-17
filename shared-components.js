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
    ];
    let activeLang = localStorage.getItem('lang') || 'pt';

    function getCurrentLang() { return LANGS.find(l => l.code === activeLang) || LANGS[0]; }

    const translations = {
        pt: {
            "hero.welcome": "Bem-vindo à",
            "hero.main": "o principal destino para aulas de handpan em Portugal!",
            "hero.desc": "Aprenda, crie e conecte-se através da magia deste instrumento num ambiente moderno e inspirador.",
            "btn.start": "Começar Agora",
            "btn.video": "▶ Ver Vídeo",
            "stat.title1": "Alunos formados",
            "stat.title2": "Localizações PT",
            "stat.title3": "Anos de experiência",
            "sec.school": "Aprenda ao seu ritmo",
            "sec.school.sub": "Aulas individuais e em grupo para iniciantes e avançados.",
            "card.indiv.title": "Aula Individual",
            "card.indiv.desc": "Sessão personalizada 1-a-1 com um dos nossos instrutores experientes. Progrida ao seu próprio ritmo.",
            "card.group.title": "Aula em Grupo",
            "card.group.desc": "Partilhe a experiência com outros apaixonados. Máximo 6 alunos por sessão para atenção personalizada.",
            "card.pack.title": "Pacote Intensivo",
            "card.pack.desc": "10 aulas individuais com gravação de progresso. Ideal para acelerar o desenvolvimento musical.",
            "card.intro.title": "Aula Introdutória",
            "card.intro.desc": "Nunca tocou handpan? Experimente numa sessão de 30 minutos gratuita. Sem compromisso.",
            "btn.programs": "Ver todos os programas",
            "sec.why": "Uma experiência única",
            "sec.events": "Viva a música ao vivo",
            "btn.events": "Ver todos os eventos →",
            "sec.shop": "Instrumentos & Serviços",
            "sec.test": "O que dizem os nossos alunos",
            "sec.cta": "Experimente a magia<br>do handpan por si mesmo!",
            "sec.cta.sub": "Aula introdutória gratuita de 30 minutos. Sem compromisso.",
            "nav.home": "Início",
            "nav.school": "Escola",
            "nav.book": "Inscrever",
            "nav.events": "Eventos",
            "nav.shop": "Loja",
            "nav.about": "Sobre Nós",
            "nav.blog": "Blogue",
            "nav.contact": "Contactos"
        },
        en: {
            "hero.welcome": "Welcome to",
            "hero.main": "the premier destination for handpan lessons in Portugal!",
            "hero.desc": "Learn, create, and connect through the magic of this instrument in a modern and inspiring environment.",
            "btn.start": "Start Now",
            "btn.video": "▶ Watch Video",
            "stat.title1": "Students taught",
            "stat.title2": "PT Locations",
            "stat.title3": "Years experience",
            "sec.school": "Learn at your own pace",
            "sec.school.sub": "Private and group lessons for beginners and advanced players.",
            "card.indiv.title": "Private Lesson",
            "card.indiv.desc": "Personalized 1-on-1 session with our experienced instructors. Progress at your own pace.",
            "card.group.title": "Group Lesson",
            "card.group.desc": "Share the experience with other enthusiasts. Max 6 students per session for personalized attention.",
            "card.pack.title": "Intensive Package",
            "card.pack.desc": "10 private lessons with progress recording. Ideal to accelerate musical development.",
            "card.intro.title": "Introductory Lesson",
            "card.intro.desc": "Never played handpan? Try a free 30-minute session. No commitment.",
            "btn.programs": "View all programs",
            "sec.why": "A unique experience",
            "sec.events": "Experience live music",
            "btn.events": "View all events →",
            "sec.shop": "Instruments & Services",
            "sec.test": "What our students say",
            "sec.cta": "Experience the magic<br>of the handpan yourself!",
            "sec.cta.sub": "Free 30-minute introductory lesson. No strings attached.",
            "nav.home": "Home",
            "nav.school": "School",
            "nav.book": "Book",
            "nav.events": "Events",
            "nav.shop": "Shop",
            "nav.about": "About Us",
            "nav.blog": "Blog",
            "nav.contact": "Contact"
        },
        ua: {
            "hero.welcome": "Ласкаво просимо до",
            "hero.main": "найкращого місця для уроків хендпану в Португалії!",
            "hero.desc": "Навчайтесь, створюйте та спілкуйтеся через магію цього інструменту в сучасному та надихаючому середовищі.",
            "btn.start": "Почати зараз",
            "btn.video": "▶ Дивитися відео",
            "stat.title1": "Учнів навчено",
            "stat.title2": "Локацій у Португалії",
            "stat.title3": "Років досвіду",
            "sec.school": "Навчайтесь у власному темпі",
            "sec.school.sub": "Індивідуальні та групові заняття для початківців і досвідчених.",
            "card.indiv.title": "Індивідуальний урок",
            "card.indiv.desc": "Персональна сесія 1 на 1 з нашими досвідченими інструкторами. Прогресуйте у власному темпі.",
            "card.group.title": "Груповий урок",
            "card.group.desc": "Поділіться досвідом з іншими ентузіастами. Макс. 6 учнів для індивідуальної уваги.",
            "card.pack.title": "Інтенсивний пакет",
            "card.pack.desc": "10 індивідуальних уроків із записом прогресу. Ідеально для прискорення розвитку.",
            "card.intro.title": "Вступний урок",
            "card.intro.desc": "Ніколи не грали на хендпані? Спробуйте безкоштовне 30-хвилинне заняття.",
            "btn.programs": "Переглянути всі програми",
            "sec.why": "Унікальний досвід",
            "sec.events": "Відчуйте живу музику",
            "btn.events": "Переглянути всі події →",
            "sec.shop": "Інструменти та Послуги",
            "sec.test": "Що кажуть наші учні",
            "sec.cta": "Відчуйте магію<br>хендпану самі!",
            "sec.cta.sub": "Безкоштовний 30-хвилинний вступний урок. Без зобов'язань.",
            "nav.home": "Головна",
            "nav.school": "Школа",
            "nav.book": "Записатись",
            "nav.events": "Події",
            "nav.shop": "Магазин",
            "nav.about": "Про нас",
            "nav.blog": "Блог",
            "nav.contact": "Контакти"
        }
    };

    function t(key) {
        if (!translations[activeLang]) return translations['pt'][key] || key;
        return translations[activeLang][key] || translations['pt'][key] || key;
    }

    function applyTranslations() {
        if(activeLang === 'pt') return;
        const dict = translations[activeLang];
        if(!dict) return;
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if(dict[key]) {
                el.innerHTML = dict[key];
            }
        });
    }

    // ── Inject Bottom Nav ───────────────────────────────────
    function injectBottomNav() {
        const nav = [
            { id: 'index.html', href: 'index.html', icon: homeIcon(), label: t('nav.home') },
            { id: 'escola.html', href: 'escola.html', icon: schoolIcon(), label: t('nav.school') },
            { id: 'inscricao.html', href: 'inscricao.html', icon: calIcon(), label: t('nav.book') },
            { id: 'eventos.html', href: 'eventos.html', icon: starIcon(), label: t('nav.events') },
            { id: 'loja.html', href: 'loja.html', icon: shopIcon(), label: t('nav.shop') },
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
            { href: 'index.html', label: t('nav.home') },
            { href: 'escola.html', label: t('nav.school') },
            { href: 'inscricao.html', label: t('nav.book') },
            { href: 'eventos.html', label: t('nav.events') },
            { href: 'loja.html', label: t('nav.shop') },
            { href: 'sobre.html', label: t('nav.about') },
            { href: 'blogue.html', label: t('nav.blog') },
            { href: 'contactos.html', label: t('nav.contact') },
        ];
        list.innerHTML = links.map(l =>
            `<li><a href="${l.href}" class="${page === l.href ? 'active' : ''}">${l.label}</a></li>`
        ).join('');
    }

    function initDesktopLang() {
        const btn = document.getElementById('desktopLang');
        if(!btn) return;
        const current = getCurrentLang();
        btn.innerHTML = `${current.flag} ${current.code.toUpperCase()}`;
        
        btn.addEventListener('click', () => {
            const currentIndex = LANGS.findIndex(l => l.code === activeLang);
            const nextIndex = (currentIndex + 1) % LANGS.length;
            const nextLang = LANGS[nextIndex];
            localStorage.setItem('lang', nextLang.code);
            location.reload();
        });
    }

    // ── Init ────────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', () => {
        injectAurora();
        injectBottomNav();
        injectStickyCTA();
        injectTopNavLinks();
        initDesktopLang();
        applyTranslations();
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
