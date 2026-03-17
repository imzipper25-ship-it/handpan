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
            "btn.shop": "Visitar a Loja",
            "sec.shop": "Instrumentos & Serviços",
            "sec.test": "O que dizem os nossos alunos",
            "sec.test.tag": "Depoimentos",
            "test.1.q": "\"Mudou a minha vida. O handpan trouxe uma paz que não conhecia.\"",
            "test.1.a": "— Ana S., Lisboa",
            "test.2.q": "\"O professor é incrível. Aprendi em 3 meses o que esperava demorar 1 ano.\"",
            "test.2.a": "— Mikhail V., Cascais",
            "test.3.q": "\"O ambiente é mágico. Recomendo a toda a gente que queira descobrir a música.\"",
            "test.3.a": "— Sofia L., Ericeira",
            "test.4.q": "\"A melhor decisão que tomei. Já levo 6 meses de aulas e adoro cada momento.\"",
            "test.4.a": "— João M., Lisboa",
            "sec.cta": "Experimente a magia<br>do handpan por si mesmo!",
            "sec.cta.sub": "Aula introdutória gratuita de 30 minutos. Sem compromisso.",
            "sec.cta.note": "Sem cartão de crédito • Sem compromisso • Cancele a qualquer momento",
            "btn.free_class": "🎵 Inscreva-se já — É Grátis",
            "footer.desc": "Despertar através do som.<br>Escola de handpan em Portugal desde 2015.",
            "footer.pages": "Páginas",
            "footer.loc": "Localização",
            "loc.lisboa": "📍 Lisboa",
            "loc.ericeira": "📍 Ericeira",
            "loc.cascais": "📍 Cascais",
            "footer.contact": "Contacto",
            "footer.tel": "Telefone",
            "footer.wa": "Mensagem rápida",
            "footer.copy": "© 2026 handpan.pt — Todos os direitos reservados.",
            "footer.priv": "Política de Privacidade",
            "footer.sitemap": "Sitemap",
            "nav.home": "Início",
            "nav.school": "Escola",
            "nav.book": "Inscrever",
            "nav.events": "Eventos",
            "nav.shop": "Loja",
            "nav.about": "Sobre Nós",
            "nav.blog": "Blogue",
            "nav.contact": "Contactos",
            "esc.hero": "Aulas de <span class=\"grad-text\">Handpan</span>",
            "esc.hero.sub": "Para iniciantes e músicos avançados. Aprenda com os melhores em Portugal.",
            "esc.hero.btn": "🎵 Reservar Aula Grátis",
            "esc.tab.all": "Todos",
            "esc.tab.beg": "Iniciante",
            "esc.tab.int": "Intermédio",
            "esc.tab.adv": "Avançado",
            "esc.tab.grp": "Em Grupo",
            "esc.card.btn": "Reservar",
            "esc.card.intro.sub": "Primeira experiência. 30 minutos gratuitos.",
            "esc.card.indiv.sub": "Sessão 1-a-1 personalizada de 60 minutos.",
            "esc.card.grp.sub": "Máximo 6 alunos por sessão de 90 min.",
            "esc.card.pack5": "Pacote 5 Aulas",
            "esc.card.pack5.sub": "Progresso rápido com 5 sessões individuais.",
            "esc.card.pack10": "Pacote Intensivo",
            "esc.card.pack10.sub": "10 aulas para transformar a sua técnica.",
            "esc.card.online": "Aula Online",
            "esc.card.online.sub": "Aprenda de qualquer lugar do mundo.",
            "esc.prog": "Programa",
            "esc.prog.title": "O que vai aprender",
            "esc.faq": "FAQ",
            "esc.faq.title": "Perguntas frequentes",
            "loja.hero": "Instrumentos <span class=\"grad-text\">&amp; Serviços</span>",
            "loja.hero.sub": "Compre, alugue, afine ou repare o seu instrumento.",
            "loja.tab.handpan": "Handpan",
            "loja.tab.outros": "Outros",
            "loja.tab.serv": "Serviços",
            "loja.p1.cat": "Handpan · Nitrided Steel",
            "loja.p1.sub": "Fabricado em Espanha · 9 notas · D Minor",
            "loja.btn.det": "Ver detalhes",
            "loja.p2.cat": "Handpan · Starter",
            "loja.p2.name": "Handpan Entrada",
            "loja.p2.sub": "Ideal para iniciantes · 8 notas",
            "loja.p3.cat": "Percussão",
            "loja.p3.name": "Tambor Xamânico",
            "loja.p3.sub": "Artesanal · Som autêntico",
            "loja.p4.cat": "Som Terapêutico",
            "loja.p4.name": "Taça de Cristal",
            "loja.p4.sub": "Quartzo puro · Frequências de cura",
            "loja.p5.cat": "Serviço",
            "loja.p5.name": "Aluguer de Handpan",
            "loja.p5.sub": "Mensal com opção de compra",
            "loja.p6.name": "Afinação Profissional",
            "loja.p6.sub": "Restauração do som original",
            "loja.btn.orc": "Pedir orçamento",
            "loja.p6.price": "A partir de €80",
            "loja.serv.title": "Serviços especializados",
            "loja.s1.ti": "🔧 Reparação & Afinação",
            "loja.s1.desc": "O seu handpan perdeu o tom ou foi amolgado? Os nossos técnicos especializados restauram cada nota com precisão centesimal.",
            "loja.s1.i1.n": "Afinação Completa",
            "loja.s1.i1.d": "Todas as notas reajustadas ao centésimo de semitom.",
            "loja.s1.i2.n": "Reparação de Amolgado",
            "loja.s1.i2.d": "Restauração estrutural e de som.",
            "loja.s1.i3.n": "Limpeza & Proteção",
            "loja.s1.i3.d": "Tratamento anti-ferrugem e polimento.",
            "loja.s1.i4.n": "Avaliação Gratuita",
            "loja.s1.i4.d": "Diagnóstico do estado do seu instrumento.",
            "loja.free": "Grátis",
            "loja.s2.ti": "🎸 Aluguer de Instrumento",
            "loja.s2.desc": "Experimente o handpan antes de investir. Alugue mensalmente com todo o equipamento incluído.",
            "loja.s2.i1.n": "Plano Básico",
            "loja.s2.i1.d": "1 handpan · Bag incluída",
            "loja.s2.i2.n": "Plano Plus",
            "loja.s2.i2.d": "1 handpan premium + acessórios",
            "loja.s2.i3.n": "Compra Futura",
            "loja.s2.i3.d": "50% do aluguel desconta no preço final",
            "loja.inc": "Incluído",
            "loja.btn.orc2": "Solicitar orçamento",
            "loja.btn.res2": "Reservar serviço",
            "sobre.hero": "A nossa <span class=\"grad-text\">história</span>",
            "sobre.p1": "A <strong>handpan.pt</strong> nasceu em 2015 da paixão pelo handpan e pelo desejo de levar este instrumento único ao coração de Portugal. Somos mais do que uma escola — somos uma comunidade de amantes do som.",
            "sobre.p2": "Acreditamos no poder transformador da música. Cada nota do handpan é uma oportunidade de conexão interior — com você mesmo e com os outros.",
            "sobre.stat.1": "Alunos",
            "sobre.stat.2": "Estúdios",
            "sobre.stat.3": "Anos",
            "sobre.stat.4": "Idiomas",
            "sobre.phil.tag": "Filosofia",
            "sobre.phil.ti": "O que nos move",
            "sobre.v1.ti": "Paixão pelo som",
            "sobre.v1.p": "Cada aula é uma jornada de descoberta. O handpan é um instrumento espiritual e tratamo-lo como tal.",
            "sobre.v2.ti": "Diversidade cultural",
            "sobre.v2.p": "Ensinamos em PT, EN, UA e RU — a música une culturas e pessoas de todo o mundo.",
            "sobre.v3.ti": "Crescimento constante",
            "sobre.v3.p": "Acompanhamos cada aluno com paciência, celebrando cada progresso como uma vitória.",
            "sobre.v4.ti": "Comunidade",
            "sobre.v4.p": "Construímos laços duradouros entre músicos, através de jams, eventos e partilha.",
            "evt.hero": "Concertos & <span class=\"grad-text\">Workshops</span>",
            "evt.hero.sub": "Viva experiências únicas com handpan ao vivo em Portugal.",
            "evt.filter.c": "Concertos",
            "evt.filter.w": "Workshops",
            "evt.filter.s": "Sound Bath",
            "evt.filter.j": "Jam Session",
            "evt.feat.ti": "Próximos eventos em destaque",
            "evt.badge.hot": "🔥 Em destaque",
            "evt.badge.new": "Workshop",
            "evt.badge.sb": "🛁 Sound Bath",
            "evt.f1.ti": "Hang Massive — Concerto Ao Vivo",
            "evt.f2.ti": "Gong Bath & Sound Healing",
            "evt.f3.ti": "Masterclass com Pedro Araújo",
            "evt.f2.pr": "€30/pessoa",
            "evt.f3.pr": "€45/pessoa",
            "evt.list.ti": "Agenda completa",
            "evt.mon.mar": "Mar",
            "evt.mon.abr": "Abr",
            "evt.mon.mai": "Mai",
            "evt.l1.ti": "Masterclass Avançada",
            "evt.l2.ti": "Jam Session Aberta",
            "evt.l3.ti": "Concerto Primavera · handpan.pt",
            "evt.l4.ti": "Meditação & Sound Bath",
            "evt.l5.ti": "Workshop Iniciantes",
            "evt.news.ti": "Não perca nenhum evento",
            "evt.news.sub": "Receba notificações dos próximos eventos diretamente no seu email.",
            "evt.news.ph": "O seu email",
            "evt.news.btn": "Subscrever",
            "ct.hero": "Fale <span class=\"grad-text\">connosco</span>",
            "ct.hero.sub": "Resposta rápida garantida. Estamos em 3 localizações em Portugal.",
            "ct.btn.call": "Ligar agora",
            "ct.btn.wa": "WhatsApp",
            "ct.btn.wa.v": "Mensagem rápida",
            "ct.btn.em": "Email",
            "ct.loc.tag": "Estúdios",
            "ct.loc.ti": "As nossas localizações",
            "ct.tab.eri": "📍 Ericeira",
            "ct.tab.cas": "⛵ Cascais",
            "ct.tab.lis": "🏙️ Lisboa",
            "ct.i.addr": "📍 Morada",
            "ct.i.time": "🕐 Horário",
            "ct.eri.dir": "🚌 Como chegar",
            "ct.cas.dir": "🚆 Como chegar",
            "ct.lis.dir": "🚇 Como chegar",
            "ct.i.serv": "🎵 Serviços",
            "ct.eri.addr": "Rua das Pescas 12<br>2655 Ericeira<br>Portugal",
            "ct.eri.time": "Quartas-feiras<br>18:30<br>(aulas só à quarta)",
            "ct.eri.route": "Linha de autocarro 0423 · 8 min a pé da Praça Principal",
            "ct.eri.serv": "Aulas individuais<br>Sound Bath<br>Afinação & Reparação",
            "ct.cas.addr": "Avenida do Mar 45<br>2750 Cascais<br>Portugal",
            "ct.cas.time": "Sextas-feiras<br>17:00 & 18:30<br>(aulas só à sexta)",
            "ct.cas.route": "Linha de Cascais — Estação de Cascais, 10 min a pé",
            "ct.cas.serv": "Aulas individuais & grupo<br>Online<br>Masterclass",
            "ct.lis.addr": "Rua da Madalena 88<br>1100 Lisboa<br>Portugal",
            "ct.lis.time": "Segundas-feiras<br>17:00 & 18:30<br>(aulas só à segunda)",
            "ct.lis.route": "Metro Rossio (Linha Verde) · 5 min a pé",
            "ct.lis.serv": "Todos os serviços<br>Loja física<br>Eventos & Workshops",
            "ct.form.tag": "Mensagem",
            "ct.form.ti": "Envie-nos uma mensagem",
            "ct.form.n": "Nome *",
            "ct.form.n.ph": "O seu nome",
            "ct.form.t": "Telefone",
            "ct.form.loc": "Localização de interesse",
            "ct.form.msg": "Mensagem *",
            "ct.form.msg.ph": "Como podemos ajudar?",
            "ct.form.btn": "✉️ Enviar Mensagem",
            "ct.form.ok": "✅ Mensagem enviada! Responderemos em breve.",
            "nav.blog": "Blogue",
            "bl.hero": "O Blogue do <span style=\"color:var(--cta-color);\">Handpan</span>",
            "bl.hero.sub": "Artigos, dicas e guias para apaixonados pelo handpan.",
            "bl.search.ph": "Pesquisar artigos...",
            "bl.cat.all": "Todos",
            "bl.cat.guide": "Guias",
            "bl.cat.tech": "Técnica",
            "bl.cat.inst": "Instrumento",
            "bl.cat.cult": "Cultura",
            "bl.cat.ter": "Terapia Sonora",
            "bl.read": "Ler mais →",
            "bl.p0.ti": "A Anatomia do Handpan: Um guia completo para principiantes",
            "bl.p0.meta": "Pedro Araújo · 10 Mar 2026 · 8 min de leitura",
            "bl.p1.ti": "A Arte da Afinação — como manter o seu handpan perfeito",
            "bl.p1.meta": "Ana Costa · 5 Mar 2026 · 5 min",
            "bl.p2.ti": "Guia do Iniciante: Os seus primeiros 30 dias com o handpan",
            "bl.p2.meta": "Sofia Lima · 1 Mar 2026 · 6 min",
            "bl.p3.ti": "Sound Bath: o poder curativo das vibrações do handpan",
            "bl.p3.meta": "Sofia Lima · 25 Fev 2026 · 7 min",
            "bl.p4.ti": "Hang Massive: como dois irmãos mudaram o mundo do handpan",
            "bl.p4.meta": "Pedro Araújo · 20 Fev 2026 · 9 min",
            "bl.p5.ti": "Como escolher o seu primeiro handpan: escala, qualidade e preço",
            "bl.p5.meta": "Mikhail Volkov · 15 Fev 2026 · 10 min",
            "bl.p6.ti": "Improvisação no handpan: encontrar a sua voz musical",
            "bl.p6.meta": "Pedro Araújo · 10 Fev 2026 · 7 min",
            "bl.p7.ti": "Como praticar handpan em casa: rotinas e dicas essenciais",
            "bl.p7.meta": "Sofia Lima · 5 Fev 2026 · 5 min",
            "bl.p8.ti": "Handpan e Meditação: 5 exercícios de mindfulness com o instrumento",
            "bl.p8.meta": "Ana Costa · 1 Fev 2026 · 6 min",
            "bl.p9.ti": "A história do handpan: do PANArt à revolução global do instrumento",
            "bl.p9.meta": "Pedro Araújo · 25 Jan 2026 · 12 min",
            "bl.btn.load": "Carregar mais artigos",
            "evt.mon.mai": "Mai",
            "evt.l5.ti": "Workshop Iniciantes",
            "bk.s1.ti": "Escolha o estúdio",
            "bk.s1.sub": "Selecione a localização mais conveniente para si.",
            "bk.l1.sub": "Quartas · 18:30",
            "bk.l2.sub": "Sextas · 17:00 & 18:30",
            "bk.l3.sub": "Segundas · 17:00 & 18:30",
            "bk.btn.next": "Continuar →",
            "bk.s2.ti": "Tipo de aula & Data",
            "bk.s2.sub": "Escolha o tipo de aula e o dia que prefere.",
            "bk.t1.name": "Individual",
            "bk.t1.pr": "€50/hora",
            "bk.t2.name": "Grupo",
            "bk.t2.pr": "€20/pessoa",
            "bk.t3.name": "Introdutória",
            "bk.t3.pr": "€20",
            "bk.t4.name": "Online",
            "bk.t4.pr": "€35/hora",
            "bk.dow.su": "Dom",
            "bk.dow.mo": "Seg",
            "bk.dow.tu": "Ter",
            "bk.dow.we": "Qua",
            "bk.dow.th": "Qui",
            "bk.dow.fr": "Sex",
            "bk.dow.sa": "Sáb",
            "bk.time.sel": "Escolha o horário:",
            "bk.btn.back": "← Voltar",
            "bk.s3.ti": "Seus dados",
            "bk.s3.sub": "Quase pronto! Precisamos dos seus contactos.",
            "bk.test.1.q": "\"A melhor decisão da minha vida!\"",
            "bk.test.2.q": "\"Aprendi em 1 mês o que esperava…\"",
            "bk.test.3.q": "\"O professor tem uma paciência incrível!\"",
            "bk.f.name": "Nome completo *",
            "bk.f.name.ph": "O seu nome",
            "bk.f.phone": "Telefone / WhatsApp *",
            "bk.f.email": "Email *",
            "bk.f.note": "Nota (opcional)",
            "bk.f.note.ph": "Ex: nunca toquei handpan, prefiro tarde",
            "bk.btn.sum": "Ver resumo →",
            "bk.s4.ti": "Confirmar reserva",
            "bk.s4.sub": "Verifique os detalhes antes de confirmar.",
            "bk.sum.l": "Localização",
            "bk.sum.t": "Tipo de Aula",
            "bk.sum.d": "Data & Hora",
            "bk.sum.n": "Nome",
            "bk.sum.tot": "Total",
            "bk.pay.sec": "Pagamento seguro com:",
            "bk.btn.conf": "✅ Confirmar Reserva",
            "bk.pay.gua": "🔒 Pagamento 100% seguro · Cancele até 24h antes",
            "bk.btn.edit": "← Editar dados",
            "bk.s5.ti": "Reserva Confirmada!",
            "bk.s5.sub": "Receberá uma confirmação por SMS e email. Até breve na <strong>handpan.pt</strong>!",
            "bk.btn.wa": "Falar via WhatsApp",
            "bk.btn.home": "Voltar ao início",
            "prod.specs": "Especificações",
            "prod.back": "← Voltar à Loja",
            "p1.tag": "Coleção Premium",
            "p1.title": "Handpan Master Series",
            "p1.desc1": "Experiencie o pináculo da arte handpan com a nossa Master Series. Cada instrumento é meticulosamente artesanal em Espanha usando aço nitrificado premium, garantindo qualidade de som e durabilidade excecionais.",
            "p1.desc2": "Este handpan possui um tom rico e ressonante com equilíbrio harmônico perfeito. A construção em aço nitrificado proporciona sustentação superior e um som quente e meditativo, ideal para performances e prática pessoal.",
            "p1.sp1": "Feito à mão em Espanha",
            "p1.sp2": "Construção em Aço Nitrificado",
            "p1.sp3": "Qualidade Professional",
            "p1.sp4": "Inclui Estojo Protetor",
            "p1.btn": "Adicionar ao Carrinho - €1,800",
            "p2.tag": "Artesanato Tradicional",
            "p2.title": "Tambor Xamânico",
            "p2.desc1": "Ligue-se a ritmos ancestrais através do nosso autêntico Tambor Xamânico. Feito à mão em Espanha com métodos tradicionais, este tambor produz tons profundos e ressonantes perfeitos para meditação, cerimónias de cura e práticas espirituais.",
            "p2.desc2": "Cada tambor é único, feito com materiais naturais. O som autêntico cria vibrações poderosas que facilitam estados meditativos profundos e jornadas espirituais.",
            "p2.sp2": "Materiais Naturais",
            "p2.sp3": "Som Autêntico",
            "p2.sp4": "Inclui Baqueta",
            "p2.btn": "Adicionar ao Carrinho - €250",
            "p3.tag": "Frequências de Cura",
            "p3.title": "Taça de Cristal",
            "p3.desc1": "Experiencie os tons puros e etéreos da nossa Taça de Cristal. Artesanal em Espanha com cristal de quartzo puro a 99,9%, esta taça produz frequências de cura que ressoam com os centros de energia do corpo.",
            "p3.desc2": "A taça de cristal cria vibrações poderosas que promovem relaxamento profundo, meditação e cura energética. Cada taça está afinada para frequências específicas que correspondem aos diferentes chakras.",
            "p3.sp2": "99,9% Cristal de Quartzo Puro",
            "p3.sp3": "Frequências Sintonizadas por Chakra",
            "p3.sp4": "Inclui Baqueta e Anel",
            "p3.btn": "Adicionar ao Carrinho - €350",
            "ft.desc": "Despertar através do som.<br>Junte-se à nossa comunidade em Portugal.",
            "ft.loc": "Localizações",
            "ft.con": "Ligue-se",
            "ft.news": "Newsletter",
            "ft.email": "O seu email",
            "ft.sub": "Subscrever",
            "ft.copy": "© 2026 Ding Handpan School Lisboa. Todos os direitos reservados."
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
            "btn.shop": "Visit the Shop",
            "sec.shop": "Instruments & Services",
            "sec.test": "What our students say",
            "sec.test.tag": "Testimonials",
            "test.1.q": "\"Changed my life. The handpan brought a peace I didn't know.\"",
            "test.1.a": "— Ana S., Lisbon",
            "test.2.q": "\"The teacher is amazing. I learned in 3 months what I expected to take a year.\"",
            "test.2.a": "— Mikhail V., Cascais",
            "test.3.q": "\"The atmosphere is magical. I recommend it to anyone wanting to discover music.\"",
            "test.3.a": "— Sofia L., Ericeira",
            "test.4.q": "\"The best decision I made. I've been taking lessons for 6 months and love every moment.\"",
            "test.4.a": "— João M., Lisbon",
            "sec.cta": "Experience the magic<br>of the handpan yourself!",
            "sec.cta.sub": "Free 30-minute introductory lesson. No strings attached.",
            "sec.cta.note": "No credit card • No commitment • Cancel anytime",
            "btn.free_class": "🎵 Sign up now — It's Free",
            "footer.desc": "Awakening through sound.<br>Handpan school in Portugal since 2015.",
            "footer.pages": "Pages",
            "footer.loc": "Location",
            "loc.lisboa": "📍 Lisbon",
            "loc.ericeira": "📍 Ericeira",
            "loc.cascais": "📍 Cascais",
            "footer.contact": "Contact",
            "footer.tel": "Phone",
            "footer.wa": "Quick message",
            "footer.copy": "© 2026 handpan.pt — All rights reserved.",
            "footer.priv": "Privacy Policy",
            "footer.sitemap": "Sitemap",
            "nav.home": "Home",
            "nav.school": "School",
            "nav.book": "Book",
            "nav.events": "Events",
            "nav.shop": "Shop",
            "nav.about": "About Us",
            "nav.blog": "Blog",
            "nav.contact": "Contact",
            "esc.hero": "Handpan <span class=\"grad-text\">Lessons</span>",
            "esc.hero.sub": "For beginners and advanced musicians. Learn with the best in Portugal.",
            "esc.hero.btn": "🎵 Book Free Lesson",
            "esc.tab.all": "All",
            "esc.tab.beg": "Beginner",
            "esc.tab.int": "Intermediate",
            "esc.tab.adv": "Advanced",
            "esc.tab.grp": "Group",
            "esc.card.btn": "Book",
            "esc.card.intro.sub": "First experience. 30 free minutes.",
            "esc.card.indiv.sub": "Personalized 1-on-1 session of 60 minutes.",
            "esc.card.grp.sub": "Maximum 6 students per session of 90 min.",
            "esc.card.pack5": "5 Lesson Package",
            "esc.card.pack5.sub": "Fast progress with 5 individual sessions.",
            "esc.card.pack10": "Intensive Package",
            "esc.card.pack10.sub": "10 lessons to transform your technique.",
            "esc.card.online": "Online Lesson",
            "esc.card.online.sub": "Learn from anywhere in the world.",
            "esc.prog": "Program",
            "esc.prog.title": "What you will learn",
            "esc.faq": "FAQ",
            "esc.faq.title": "Frequently asked questions",
            "loja.hero": "Instruments <span class=\"grad-text\">&amp; Services</span>",
            "loja.hero.sub": "Buy, rent, tune, or repair your instrument.",
            "loja.tab.handpan": "Handpan",
            "loja.tab.outros": "Others",
            "loja.tab.serv": "Services",
            "loja.p1.cat": "Handpan · Nitrided Steel",
            "loja.p1.sub": "Made in Spain · 9 notes · D Minor",
            "loja.btn.det": "View details",
            "loja.p2.cat": "Handpan · Starter",
            "loja.p2.name": "Starter Handpan",
            "loja.p2.sub": "Ideal for beginners · 8 notes",
            "loja.p3.cat": "Percussion",
            "loja.p3.name": "Shamanic Drum",
            "loja.p3.sub": "Handcrafted · Authentic sound",
            "loja.p4.cat": "Therapeutic Sound",
            "loja.p4.name": "Crystal Bowl",
            "loja.p4.sub": "Pure quartz · Healing frequencies",
            "loja.p5.cat": "Service",
            "loja.p5.name": "Handpan Rental",
            "loja.p5.sub": "Monthly with purchase option",
            "loja.p6.name": "Professional Tuning",
            "loja.p6.sub": "Restoration of original sound",
            "loja.btn.orc": "Request quote",
            "loja.p6.price": "From €80",
            "loja.serv.title": "Specialized services",
            "loja.s1.ti": "🔧 Repair & Tuning",
            "loja.s1.desc": "Has your handpan lost its tune or been dented? Our specialized technicians restore every note with centesimal precision.",
            "loja.s1.i1.n": "Full Tuning",
            "loja.s1.i1.d": "All notes readjusted to the hundredth of a semitone.",
            "loja.s1.i2.n": "Dent Repair",
            "loja.s1.i2.d": "Structural and sound restoration.",
            "loja.s1.i3.n": "Cleaning & Protection",
            "loja.s1.i3.d": "Anti-rust treatment and polishing.",
            "loja.s1.i4.n": "Free Assessment",
            "loja.s1.i4.d": "Diagnosis of your instrument's condition.",
            "loja.free": "Free",
            "loja.s2.ti": "🎸 Instrument Rental",
            "loja.s2.desc": "Try the handpan before investing. Rent monthly with all equipment included.",
            "loja.s2.i1.n": "Basic Plan",
            "loja.s2.i1.d": "1 handpan · Bag included",
            "loja.s2.i2.n": "Plus Plan",
            "loja.s2.i2.d": "1 premium handpan + accessories",
            "loja.s2.i3.n": "Future Purchase",
            "loja.s2.i3.d": "50% of rental is discounted from final price",
            "loja.inc": "Included",
            "loja.btn.orc2": "Request quote",
            "loja.btn.res2": "Book service",
            "sobre.hero": "Our <span class=\"grad-text\">story</span>",
            "sobre.p1": "<strong>handpan.pt</strong> was born in 2015 from a passion for the handpan and a desire to bring this unique instrument to the heart of Portugal. We are more than a school — we are a community of sound lovers.",
            "sobre.p2": "We believe in the transformative power of music. Every note of the handpan is an opportunity for inner connection — with yourself and with others.",
            "sobre.stat.1": "Students",
            "sobre.stat.2": "Studios",
            "sobre.stat.3": "Years",
            "sobre.stat.4": "Languages",
            "sobre.phil.tag": "Philosophy",
            "sobre.phil.ti": "What drives us",
            "sobre.v1.ti": "Passion for sound",
            "sobre.v1.p": "Every class is a journey of discovery. The handpan is a spiritual instrument and we treat it as such.",
            "sobre.v2.ti": "Cultural diversity",
            "sobre.v2.p": "We teach in PT, EN, UA and RU — music unites cultures and people all over the world.",
            "sobre.v3.ti": "Constant growth",
            "sobre.v3.p": "We accompany each student with patience, celebrating every progress as a victory.",
            "sobre.v4.ti": "Community",
            "sobre.v4.p": "We build lasting bonds between musicians through jams, events, and sharing.",
            "evt.hero": "Concerts & <span class=\"grad-text\">Workshops</span>",
            "evt.hero.sub": "Live unique experiences with live handpan in Portugal.",
            "evt.filter.c": "Concerts",
            "evt.filter.w": "Workshops",
            "evt.filter.s": "Sound Bath",
            "evt.filter.j": "Jam Session",
            "evt.feat.ti": "Upcoming featured events",
            "evt.badge.hot": "🔥 Featured",
            "evt.badge.new": "Workshop",
            "evt.badge.sb": "🛁 Sound Bath",
            "evt.f1.ti": "Hang Massive — Live Concert",
            "evt.f2.ti": "Gong Bath & Sound Healing",
            "evt.f3.ti": "Masterclass with Pedro Araújo",
            "evt.f2.pr": "€30/person",
            "evt.f3.pr": "€45/person",
            "evt.list.ti": "Full schedule",
            "evt.mon.mar": "Mar",
            "evt.mon.abr": "Apr",
            "evt.mon.mai": "May",
            "evt.l1.ti": "Advanced Masterclass",
            "evt.l2.ti": "Open Jam Session",
            "evt.l3.ti": "Spring Concert · handpan.pt",
            "evt.l4.ti": "Meditation & Sound Bath",
            "evt.l5.ti": "Beginners Workshop",
            "evt.news.ti": "Don't miss any event",
            "evt.news.sub": "Receive notifications of upcoming events straight to your email.",
            "evt.news.ph": "Your email",
            "evt.news.btn": "Subscribe",
            "ct.hero": "Talk with <span class=\"grad-text\">us</span>",
            "ct.hero.sub": "Fast response guaranteed. We have 3 locations in Portugal.",
            "ct.btn.call": "Call now",
            "ct.btn.wa": "WhatsApp",
            "ct.btn.wa.v": "Quick message",
            "ct.btn.em": "Email",
            "ct.loc.tag": "Studios",
            "ct.loc.ti": "Our locations",
            "ct.tab.eri": "📍 Ericeira",
            "ct.tab.cas": "⛵ Cascais",
            "ct.tab.lis": "🏙️ Lisbon",
            "ct.i.addr": "📍 Address",
            "ct.i.time": "🕐 Hours",
            "ct.eri.dir": "🚌 Directions",
            "ct.cas.dir": "🚆 Directions",
            "ct.lis.dir": "🚇 Directions",
            "ct.i.serv": "🎵 Services",
            "ct.eri.addr": "Rua das Pescas 12<br>2655 Ericeira<br>Portugal",
            "ct.eri.time": "Wednesdays<br>18:30<br>(classes on Wed only)",
            "ct.eri.route": "Bus line 0423 · 8 min walk from Main Square",
            "ct.eri.serv": "Individual lessons<br>Sound Bath<br>Tuning & Repair",
            "ct.cas.addr": "Avenida do Mar 45<br>2750 Cascais<br>Portugal",
            "ct.cas.time": "Fridays<br>17:00 & 18:30<br>(classes on Fri only)",
            "ct.cas.route": "Cascais Line — Cascais Station, 10 min walk",
            "ct.cas.serv": "Individual & group lessons<br>Online<br>Masterclass",
            "ct.lis.addr": "Rua da Madalena 88<br>1100 Lisbon<br>Portugal",
            "ct.lis.time": "Mondays<br>17:00 & 18:30<br>(classes on Mon only)",
            "ct.lis.route": "Rossio Metro (Green Line) · 5 min walk",
            "ct.lis.serv": "All services<br>Physical shop<br>Events & Workshops",
            "ct.form.tag": "Message",
            "ct.form.ti": "Send us a message",
            "ct.form.n": "Name *",
            "ct.form.n.ph": "Your name",
            "ct.form.t": "Phone",
            "ct.form.loc": "Location of interest",
            "ct.form.msg": "Message *",
            "ct.form.msg.ph": "How can we help?",
            "ct.form.btn": "✉️ Send Message",
            "ct.form.ok": "✅ Message sent! We will reply soon.",
            "nav.blog": "Blog",
            "bl.hero": "The <span style=\"color:var(--cta-color);\">Handpan</span> Blog",
            "bl.hero.sub": "Articles, tips, and guides for handpan lovers.",
            "bl.search.ph": "Search articles...",
            "bl.cat.all": "All",
            "bl.cat.guide": "Guides",
            "bl.cat.tech": "Technique",
            "bl.cat.inst": "Instrument",
            "bl.cat.cult": "Culture",
            "bl.cat.ter": "Sound Therapy",
            "bl.read": "Read more →",
            "bl.p0.ti": "Handpan Anatomy: A complete guide for beginners",
            "bl.p0.meta": "Pedro Araújo · 10 Mar 2026 · 8 min read",
            "bl.p1.ti": "The Art of Tuning — how to keep your handpan perfect",
            "bl.p1.meta": "Ana Costa · 5 Mar 2026 · 5 min",
            "bl.p2.ti": "Beginner's Guide: Your first 30 days with the handpan",
            "bl.p2.meta": "Sofia Lima · 1 Mar 2026 · 6 min",
            "bl.p3.ti": "Sound Bath: the healing power of handpan vibrations",
            "bl.p3.meta": "Sofia Lima · 25 Feb 2026 · 7 min",
            "bl.p4.ti": "Hang Massive: how two brothers changed the handpan world",
            "bl.p4.meta": "Pedro Araújo · 20 Feb 2026 · 9 min",
            "bl.p5.ti": "How to choose your first handpan: scale, quality, and price",
            "bl.p5.meta": "Mikhail Volkov · 15 Feb 2026 · 10 min",
            "bl.p6.ti": "Improvisation on the handpan: finding your musical voice",
            "bl.p6.meta": "Pedro Araújo · 10 Feb 2026 · 7 min",
            "bl.p7.ti": "How to practice handpan at home: routines and essential tips",
            "bl.p7.meta": "Sofia Lima · 5 Feb 2026 · 5 min",
            "bl.p8.ti": "Handpan and Meditation: 5 mindfulness exercises with the instrument",
            "bl.p8.meta": "Ana Costa · 1 Feb 2026 · 6 min",
            "bl.p9.ti": "The history of the handpan: from PANArt to the global instrument revolution",
            "bl.p9.meta": "Pedro Araújo · 25 Jan 2026 · 12 min",
            "bl.btn.load": "Load more articles",
            "evt.mon.mai": "May",
            "evt.l5.ti": "Beginners Workshop",
            "bk.s1.ti": "Choose the studio",
            "bk.s1.sub": "Select the most convenient location for you.",
            "bk.l1.sub": "Wednesdays · 18:30",
            "bk.l2.sub": "Fridays · 17:00 & 18:30",
            "bk.l3.sub": "Mondays · 17:00 & 18:30",
            "bk.btn.next": "Continue →",
            "bk.s2.ti": "Class type & Date",
            "bk.s2.sub": "Choose the class type and your preferred day.",
            "bk.t1.name": "Individual",
            "bk.t1.pr": "€50/hour",
            "bk.t2.name": "Group",
            "bk.t2.pr": "€20/person",
            "bk.t3.name": "Introductory",
            "bk.t3.pr": "€20",
            "bk.t4.name": "Online",
            "bk.t4.pr": "€35/hour",
            "bk.dow.su": "Sun",
            "bk.dow.mo": "Mon",
            "bk.dow.tu": "Tue",
            "bk.dow.we": "Wed",
            "bk.dow.th": "Thu",
            "bk.dow.fr": "Fri",
            "bk.dow.sa": "Sat",
            "bk.time.sel": "Choose the time:",
            "bk.btn.back": "← Back",
            "bk.s3.ti": "Your details",
            "bk.s3.sub": "Almost done! We need your contact details.",
            "bk.test.1.q": "\"The best decision of my life!\"",
            "bk.test.2.q": "\"I learned in 1 month what I expected...\"",
            "bk.test.3.q": "\"The teacher has incredible patience!\"",
            "bk.f.name": "Full name *",
            "bk.f.name.ph": "Your name",
            "bk.f.phone": "Phone / WhatsApp *",
            "bk.f.email": "Email *",
            "bk.f.note": "Note (optional)",
            "bk.f.note.ph": "Ex: I've never played handpan, prefer afternoon",
            "bk.btn.sum": "View summary →",
            "bk.s4.ti": "Confirm booking",
            "bk.s4.sub": "Check the details before confirming.",
            "bk.sum.l": "Location",
            "bk.sum.t": "Class Type",
            "bk.sum.d": "Date & Time",
            "bk.sum.n": "Name",
            "bk.sum.tot": "Total",
            "bk.pay.sec": "Secure payment with:",
            "bk.btn.conf": "✅ Confirm Booking",
            "bk.pay.gua": "🔒 100% secure payment · Cancel up to 24h before",
            "bk.btn.edit": "← Edit details",
            "bk.s5.ti": "Booking Confirmed!",
            "bk.s5.sub": "You will receive a confirmation via SMS and email. See you soon at <strong>handpan.pt</strong>!",
            "bk.btn.wa": "Talk via WhatsApp",
            "bk.btn.home": "Back to home",
            "prod.specs": "Specifications",
            "prod.back": "← Back to Shop",
            "p1.tag": "Premium Collection",
            "p1.title": "Handpan Master Series",
            "p1.desc1": "Experience the pinnacle of handpan craftsmanship with our Master Series. Each instrument is meticulously handcrafted in Spain using premium nitrided steel, ensuring exceptional sound quality and durability.",
            "p1.desc2": "This handpan features a rich, resonant tone with perfect harmonic balance. The nitrided steel construction provides superior sustain and a warm, meditative sound that's ideal for both performance and personal practice.",
            "p1.sp1": "Handmade in Spain",
            "p1.sp2": "Nitrided Steel Construction",
            "p1.sp3": "Professional Grade Quality",
            "p1.sp4": "Includes Protective Case",
            "p1.btn": "Add to Cart - €1,800",
            "p2.tag": "Traditional Craft",
            "p2.title": "Shamanic Drum",
            "p2.desc1": "Connect with ancient rhythms through our authentic Shamanic Drum. Handcrafted in Spain using traditional methods, this drum produces deep, resonant tones perfect for meditation, healing ceremonies, and spiritual practices.",
            "p2.desc2": "Each drum is unique, made with natural materials and blessed with intention. The authentic sound creates powerful vibrations that facilitate deep meditative states and spiritual journeys.",
            "p2.sp2": "Natural Materials",
            "p2.sp3": "Authentic Sound",
            "p2.sp4": "Includes Beater",
            "p2.btn": "Add to Cart - €250",
            "p3.tag": "Healing Frequencies",
            "p3.title": "Crystal Singing Bowl",
            "p3.desc1": "Experience the pure, ethereal tones of our Crystal Singing Bowl. Handcrafted in Spain from 99.9% pure quartz crystal, this bowl produces healing frequencies that resonate with the body's energy centers.",
            "p3.desc2": "The crystal bowl creates powerful vibrations that promote deep relaxation, meditation, and energy healing. Each bowl is tuned to specific frequencies that correspond to different chakras, making it an essential tool for sound therapy and spiritual practice.",
            "p3.sp2": "99.9% Pure Quartz Crystal",
            "p3.sp3": "Chakra-Tuned Frequencies",
            "p3.sp4": "Includes Mallet and Ring",
            "p3.btn": "Add to Cart - €350",
            "ft.desc": "Awakening through sound.<br>Join our community in Portugal.",
            "ft.loc": "Locations",
            "ft.con": "Connect",
            "ft.news": "Newsletter",
            "ft.email": "Your email",
            "ft.sub": "Subscribe",
            "ft.copy": "© 2026 Ding Handpan School Lisboa. All rights reserved."
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
            "btn.shop": "Відвідати магазин",
            "sec.shop": "Інструменти та Послуги",
            "sec.test": "Що кажуть наші учні",
            "sec.test.tag": "Відгуки",
            "test.1.q": "\"Змінило моє життя. Хендпан приніс мир, якого я не знав.\"",
            "test.1.a": "— Ана С., Лісабон",
            "test.2.q": "\"Вчитель неймовірний. Я навчився за 3 місяці тому, що очікував вивчати рік.\"",
            "test.2.a": "— Міхаїл В., Кашкайш",
            "test.3.q": "\"Атмосфера чарівна. Рекомендую всім, хто хоче відкрити для себе музику.\"",
            "test.3.a": "— Софія Л., Ерісейра",
            "test.4.q": "\"Найкраще рішення, яке я прийняв. Навчаюся вже 6 місяців і насолоджуюся кожною миттю.\"",
            "test.4.a": "— Жуан М., Лісабон",
            "sec.cta": "Відчуйте магію<br>хендпану самі!",
            "sec.cta.sub": "Безкоштовний 30-хвилинний вступний урок. Без зобов'язань.",
            "sec.cta.note": "Без кредитної картки • Без зобов'язань • Скасувати будь-коли",
            "btn.free_class": "🎵 Записатися зараз — Безкоштовно",
            "footer.desc": "Пробудження через звук.<br>Школа хендпану в Португалії з 2015 року.",
            "footer.pages": "Сторінки",
            "footer.loc": "Локація",
            "loc.lisboa": "📍 Лісабон",
            "loc.ericeira": "📍 Ерісейра",
            "loc.cascais": "📍 Кашкайш",
            "footer.contact": "Контакти",
            "footer.tel": "Телефон",
            "footer.wa": "Швидке повідомлення",
            "footer.copy": "© 2026 handpan.pt — Всі права захищені.",
            "footer.priv": "Політика конфіденційності",
            "footer.sitemap": "Карта сайту",
            "nav.home": "Головна",
            "nav.school": "Школа",
            "nav.book": "Записатись",
            "nav.events": "Події",
            "nav.shop": "Магазин",
            "nav.about": "Про нас",
            "nav.blog": "Блог",
            "nav.contact": "Контакти",
            "esc.hero": "Уроки <span class=\"grad-text\">Хендпану</span>",
            "esc.hero.sub": "Для початківців та досвідчених музикантів. Навчайтесь у найкращих у Португалії.",
            "esc.hero.btn": "🎵 Забронювати урок (Безкоштовно)",
            "esc.tab.all": "Всі",
            "esc.tab.beg": "Початківець",
            "esc.tab.int": "Середній",
            "esc.tab.adv": "Просунутий",
            "esc.tab.grp": "Група",
            "esc.card.btn": "Забронювати",
            "esc.card.intro.sub": "Перший досвід. 30 безкоштовних хвилин.",
            "esc.card.indiv.sub": "Персональна 1-на-1 сесія на 60 хвилин.",
            "esc.card.grp.sub": "Максимум 6 студентів на сесію 90 хв.",
            "esc.card.pack5": "Пакет з 5 уроків",
            "esc.card.pack5.sub": "Швидкий прогрес з 5 індивідуальними сесіями.",
            "esc.card.pack10": "Інтенсивний пакет",
            "esc.card.pack10.sub": "10 уроків для трансформації вашої техніки.",
            "esc.card.online": "Онлайн урок",
            "esc.card.online.sub": "Навчайтесь з будь-якої точки світу.",
            "esc.prog": "Програма",
            "esc.prog.title": "Чому ви навчитесь",
            "esc.faq": "FAQ",
            "esc.faq.title": "Часті запитання",
            "loja.hero": "Інструменти <span class=\"grad-text\">&amp; Послуги</span>",
            "loja.hero.sub": "Купуйте, орендуйте, налаштовуйте або ремонтуйте свій інструмент.",
            "loja.tab.handpan": "Хендпан",
            "loja.tab.outros": "Інші",
            "loja.tab.serv": "Послуги",
            "loja.p1.cat": "Хендпан · Азотована сталь",
            "loja.p1.sub": "Зроблено в Іспанії · 9 нот · D Minor",
            "loja.btn.det": "Деталі",
            "loja.p2.cat": "Хендпан · Для початківців",
            "loja.p2.name": "Хендпан для початківців",
            "loja.p2.sub": "Ідеально для початківців · 8 нот",
            "loja.p3.cat": "Перкусія",
            "loja.p3.name": "Шаманський бубон",
            "loja.p3.sub": "Ручна робота · Автентичний звук",
            "loja.p4.cat": "Терапевтичний звук",
            "loja.p4.name": "Кришталева чаша",
            "loja.p4.sub": "Чистий кварц · Цілющі частоти",
            "loja.p5.cat": "Послуга",
            "loja.p5.name": "Оренда хендпану",
            "loja.p5.sub": "Щомісяця з правом викупу",
            "loja.p6.name": "Професійне налаштування",
            "loja.p6.sub": "Відновлення оригінального звуку",
            "loja.btn.orc": "Запросити ціну",
            "loja.p6.price": "Від €80",
            "loja.serv.title": "Спеціалізовані послуги",
            "loja.s1.ti": "🔧 Ремонт та налаштування",
            "loja.s1.desc": "Ваш хендпан втратив стрій або був пом'ятий? Наші спеціалізовані техніки відновлюють кожну ноту з точністю до цента.",
            "loja.s1.i1.n": "Повне налаштування",
            "loja.s1.i1.d": "Всі ноти переналаштовано з точністю до сотої частки півтону.",
            "loja.s1.i2.n": "Ремонт вм'ятин",
            "loja.s1.i2.d": "Відновлення структури та звуку.",
            "loja.s1.i3.n": "Очищення та захист",
            "loja.s1.i3.d": "Антикорозійна обробка та полірування.",
            "loja.s1.i4.n": "Безкоштовна оцінка",
            "loja.s1.i4.d": "Діагностика стану вашого інструменту.",
            "loja.free": "Безкоштовно",
            "loja.s2.ti": "🎸 Оренда інструменту",
            "loja.s2.desc": "Спробуйте хендпан перед інвестуванням. Орендуйте щомісяця з усім комплектуючим.",
            "loja.s2.i1.n": "Базовий план",
            "loja.s2.i1.d": "1 хендпан · Чохол включено",
            "loja.s2.i2.n": "Плюс план",
            "loja.s2.i2.d": "1 преміум хендпан + аксесуари",
            "loja.s2.i3.n": "Майбутня покупка",
            "loja.s2.i3.d": "50% оренди віднімається від кінцевої ціни",
            "loja.inc": "Включено",
            "loja.btn.orc2": "Запросити ціну",
            "loja.btn.res2": "Забронювати послугу",
            "sobre.hero": "Наша <span class=\"grad-text\">історія</span>",
            "sobre.p1": "<strong>handpan.pt</strong> народився у 2015 році з пристрасті до хендпану та бажання принести цей унікальний інструмент у серце Португалії. Ми більше, ніж школа — ми спільнота любителів звуку.",
            "sobre.p2": "Ми віримо в трансформаційну силу музики. Кожна нота хендпану — це можливість для внутрішнього зв'язку — із собою та з іншими.",
            "sobre.stat.1": "Учні",
            "sobre.stat.2": "Студії",
            "sobre.stat.3": "Роки",
            "sobre.stat.4": "Мови",
            "sobre.phil.tag": "Філософія",
            "sobre.phil.ti": "Що нами рухає",
            "sobre.v1.ti": "Пристрасть до звуку",
            "sobre.v1.p": "Кожний урок — це подорож відкриттів. Хендпан є духовним інструментом, і ми ставимося до нього відповідно.",
            "sobre.v2.ti": "Культурна різноманітність",
            "sobre.v2.p": "Ми викладаємо PT, EN, UA та RU — музика об'єднує культури та людей з усього світу.",
            "sobre.v3.ti": "Постійний розвиток",
            "sobre.v3.p": "Ми супроводжуємо кожного учня з терпінням, святкуючи кожен прогрес як перемогу.",
            "sobre.v4.ti": "Спільнота",
            "sobre.v4.p": "Ми будуємо міцні зв'язки між музикантами через джеми, події та обмін досвідом.",
            "evt.hero": "Концерти та <span class=\"grad-text\">Майстер-класи</span>",
            "evt.hero.sub": "Відчуйте унікальний досвід з живим хендпаном в Португалії.",
            "evt.filter.c": "Концерти",
            "evt.filter.w": "Майстер-класи",
            "evt.filter.s": "Звукові ванни",
            "evt.filter.j": "Джем-сейшн",
            "evt.feat.ti": "Майбутні рекомендовані події",
            "evt.badge.hot": "🔥 Рекомендовані",
            "evt.badge.new": "Майстер-клас",
            "evt.badge.sb": "🛁 Звукові ванни",
            "evt.f1.ti": "Hang Massive — Живий концерт",
            "evt.f2.ti": "Гонг-ванна та зцілення звуком",
            "evt.f3.ti": "Майстер-клас з Педру Араужо",
            "evt.f2.pr": "€30/особа",
            "evt.f3.pr": "€45/особа",
            "evt.list.ti": "Повний розклад",
            "evt.mon.mar": "Бер",
            "evt.mon.abr": "Квіт",
            "evt.mon.mai": "Трав",
            "evt.l1.ti": "Просунутий майстер-клас",
            "evt.l2.ti": "Відкритий Джем-сейшн",
            "evt.l3.ti": "Весняний концерт · handpan.pt",
            "evt.l4.ti": "Медитація та Звукова ванна",
            "evt.l5.ti": "Майстер-клас для початківців",
            "evt.news.ti": "Не пропустіть жодної події",
            "evt.news.sub": "Отримуйте сповіщення про майбутні події безпосередньо на ваш email.",
            "evt.news.ph": "Ваш email",
            "evt.news.btn": "Підписатися",
            "ct.hero": "Зв'яжіться з <span class=\"grad-text\">нами</span>",
            "ct.hero.sub": "Швидка відповідь гарантована. Ми знаходимося в 3 локаціях Португалії.",
            "ct.btn.call": "Зателефонувати",
            "ct.btn.wa": "WhatsApp",
            "ct.btn.wa.v": "Швидке повідомлення",
            "ct.btn.em": "Email",
            "ct.loc.tag": "Студії",
            "ct.loc.ti": "Наші локації",
            "ct.tab.eri": "📍 Ерісейра",
            "ct.tab.cas": "⛵ Кашкайш",
            "ct.tab.lis": "🏙️ Лісабон",
            "ct.i.addr": "📍 Адреса",
            "ct.i.time": "🕐 Години роботи",
            "ct.eri.dir": "🚌 Як дістатися",
            "ct.cas.dir": "🚆 Як дістатися",
            "ct.lis.dir": "🚇 Як дістатися",
            "ct.i.serv": "🎵 Послуги",
            "ct.eri.addr": "Rua das Pescas 12<br>2655 Ericeira<br>Португалія",
            "ct.eri.time": "Середи<br>18:30<br>(уроки тільки в сер.)",
            "ct.eri.route": "Автобусна лінія 0423 · 8 хв пішки від Головної площі",
            "ct.eri.serv": "Індивідуальні уроки<br>Звукова ванна<br>Налаштування та Ремонт",
            "ct.cas.addr": "Avenida do Mar 45<br>2750 Cascais<br>Португалія",
            "ct.cas.time": "П'ятниці<br>17:00 & 18:30<br>(уроки тільки в пт)",
            "ct.cas.route": "Лінія Кашкайш — Станція Кашкайш, 10 хв пішки",
            "ct.cas.serv": "Індивідуальні та групові уроки<br>Онлайн<br>Майстер-клас",
            "ct.lis.addr": "Rua da Madalena 88<br>1100 Лісабон<br>Португалія",
            "ct.lis.time": "Понеділки<br>17:00 & 18:30<br>(уроки тільки в пн)",
            "ct.lis.route": "Метро Rossio (Зелена лінія) · 5 хв пішки",
            "ct.lis.serv": "Всі послуги<br>Фізичний магазин<br>Події та Майстер-класи",
            "ct.form.tag": "Повідомлення",
            "ct.form.ti": "Надішліть нам повідомлення",
            "ct.form.n": "Ім'я *",
            "ct.form.n.ph": "Ваше ім'я",
            "ct.form.t": "Телефон",
            "ct.form.loc": "Кого цікавить",
            "ct.form.msg": "Повідомлення *",
            "ct.form.msg.ph": "Як ми можемо допомогти?",
            "ct.form.btn": "✉️ Надіслати",
            "ct.form.ok": "✅ Повідомлення надіслано! Ми незабаром відповімо.",
            "nav.blog": "Блог",
            "bl.hero": "Блог про <span style=\"color:var(--cta-color);\">Handpan</span>",
            "bl.hero.sub": "Статті, поради та гіди для любителів хандпану.",
            "bl.search.ph": "Пошук статей...",
            "bl.cat.all": "Всі",
            "bl.cat.guide": "Посібники",
            "bl.cat.tech": "Техніка",
            "bl.cat.inst": "Інструмент",
            "bl.cat.cult": "Культура",
            "bl.cat.ter": "Звукотерапія",
            "bl.read": "Читати далі →",
            "bl.p0.ti": "Анатомія хандпану: повний посібник для початківців",
            "bl.p0.meta": "Pedro Araújo · 10 Бер 2026 · 8 хв читання",
            "bl.p1.ti": "Мистецтво налаштування — як зберегти ваш хандпан ідеальним",
            "bl.p1.meta": "Ana Costa · 5 Бер 2026 · 5 хв",
            "bl.p2.ti": "Керівництво для початківця: Ваші перші 30 днів з хандпаном",
            "bl.p2.meta": "Sofia Lima · 1 Бер 2026 · 6 хв",
            "bl.p3.ti": "Sound Bath: цілюща сила вібрацій хандпану",
            "bl.p3.meta": "Sofia Lima · 25 Лют 2026 · 7 хв",
            "bl.p4.ti": "Hang Massive: як два брати змінили світ хандпану",
            "bl.p4.meta": "Pedro Araújo · 20 Лют 2026 · 9 хв",
            "bl.p5.ti": "Як вибрати свій перший хандпан: лад, якість та ціна",
            "bl.p5.meta": "Mikhail Volkov · 15 Лют 2026 · 10 хв",
            "bl.p6.ti": "Імпровізація на хандпані: як знайти свій музичний голос",
            "bl.p6.meta": "Pedro Araújo · 10 Лют 2026 · 7 хв",
            "bl.p7.ti": "Як практикувати хандпан вдома: режими та важливі поради",
            "bl.p7.meta": "Sofia Lima · 5 Лют 2026 · 5 хв",
            "bl.p8.ti": "Хандпан та Медитація: 5 вправ з усвідомленості з інструментом",
            "bl.p8.meta": "Ana Costa · 1 Лют 2026 · 6 хв",
            "bl.p9.ti": "Історія хандпану: від PANArt до глобальної революції інструменту",
            "bl.p9.meta": "Pedro Araújo · 25 Січ 2026 · 12 хв",
            "bl.btn.load": "Завантажити більше статей",
            "evt.mon.mai": "Трав",
            "evt.l5.ti": "Вступний семінар",
            "bk.s1.ti": "Виберіть студію",
            "bk.s1.sub": "Виберіть найбільш зручну для вас локацію.",
            "bk.l1.sub": "Середи · 18:30",
            "bk.l2.sub": "П'ятниці · 17:00 & 18:30",
            "bk.l3.sub": "Понеділки · 17:00 & 18:30",
            "bk.btn.next": "Продовжити →",
            "bk.s2.ti": "Тип уроку та Дата",
            "bk.s2.sub": "Виберіть тип уроку та бажаний день.",
            "bk.t1.name": "Індивідуальний",
            "bk.t1.pr": "€50/година",
            "bk.t2.name": "Груповий",
            "bk.t2.pr": "€20/особа",
            "bk.t3.name": "Вступний",
            "bk.t3.pr": "€20",
            "bk.t4.name": "Онлайн",
            "bk.t4.pr": "€35/година",
            "bk.dow.su": "Нд",
            "bk.dow.mo": "Пн",
            "bk.dow.tu": "Вт",
            "bk.dow.we": "Ср",
            "bk.dow.th": "Чт",
            "bk.dow.fr": "Пт",
            "bk.dow.sa": "Сб",
            "bk.time.sel": "Виберіть час:",
            "bk.btn.back": "← Назад",
            "bk.s3.ti": "Ваші дані",
            "bk.s3.sub": "Майже готово! Нам потрібні ваші контактні дані.",
            "bk.test.1.q": "\"Найкраще рішення у моєму житті!\"",
            "bk.test.2.q": "\"Я навчився за 1 місяць тому, на що розраховував...\"",
            "bk.test.3.q": "\"Викладач має неймовірне терпіння!\"",
            "bk.f.name": "Повне ім'я *",
            "bk.f.name.ph": "Ваше ім'я",
            "bk.f.phone": "Телефон / WhatsApp *",
            "bk.f.email": "Email *",
            "bk.f.note": "Примітка (необов'язково)",
            "bk.f.note.ph": "Напр.: ніколи не грав на хандпані, віддаю перевагу вечору",
            "bk.btn.sum": "Переглянути підсумок →",
            "bk.s4.ti": "Підтвердити бронювання",
            "bk.s4.sub": "Перевірте деталі перед підтвердженням.",
            "bk.sum.l": "Локація",
            "bk.sum.t": "Тип уроку",
            "bk.sum.d": "Дата і Час",
            "bk.sum.n": "Ім'я",
            "bk.sum.tot": "Разом",
            "bk.pay.sec": "Безпечний платіж через:",
            "bk.btn.conf": "✅ Підтвердити бронювання",
            "bk.pay.gua": "🔒 100% безпечний платіж · Скасування до 24 год",
            "bk.btn.edit": "← Редагувати дані",
            "bk.s5.ti": "Бронювання підтверджено!",
            "bk.s5.sub": "Ви отримаєте підтвердження через SMS та email. До зустрічі на <strong>handpan.pt</strong>!",
            "bk.btn.wa": "Зв'язатися через WhatsApp",
            "bk.btn.home": "Повернутися на головну",
            "prod.specs": "Характеристики",
            "prod.back": "← Повернутися до магазину",
            "p1.tag": "Преміум Колекція",
            "p1.title": "Handpan Master Series",
            "p1.desc1": "Відчуйте вершину майстерності хендпану з нашою Master Series. Кожен інструмент ретельно виготовлений вручну в Іспанії з преміальної азотованої сталі, що забезпечує виняткову якість звуку та довговічність.",
            "p1.desc2": "Цей хендпан має багатий, резонансний тон із ідеальним гармонічним балансом. Конструкція з азотованої сталі забезпечує чудовий сустейн і теплий, медитативний звук, ідеальний як для виступів, так і для особистої практики.",
            "p1.sp1": "Виготовлено вручну в Іспанії",
            "p1.sp2": "Конструкція з азотованої сталі",
            "p1.sp3": "Якість професійного рівня",
            "p1.sp4": "Включає захисний кейс",
            "p1.btn": "Додати до кошика - €1,800",
            "p2.tag": "Традиційне Ремесло",
            "p2.title": "Шаманський Бубон",
            "p2.desc1": "Торкніться стародавніх ритмів через наш автентичний Шаманський Бубон. Виготовлений вручну в Іспанії традиційними методами, цей бубон видає глибокі, резонансні тони, ідеальні для медитації, ритуалів зцілення та духовних практик.",
            "p2.desc2": "Кожен бубон унікальний, виготовлений з природних матеріалів та наповнений намірами. Автентичний звук створює потужні вібрації, які сприяють глибоким медитативним станам та духовним подорожам.",
            "p2.sp2": "Природні матеріали",
            "p2.sp3": "Автентичний звук",
            "p2.sp4": "Включає колотушку",
            "p2.btn": "Додати до кошика - €250",
            "p3.tag": "Частоти Зцілення",
            "p3.title": "Кришталева Співоча Чаша",
            "p3.desc1": "Відчуйте чисті, ефірні тони нашої Кришталевої Співочої Чаші. Виготовлена вручну в Іспанії з 99,9% чистого кришталю кварцу, ця чаша виробляє цілющі частоти, які резонують з енергетичними центрами тіла.",
            "p3.desc2": "Кришталева чаша створює потужні вібрації, що сприяють глибокому розслабленню, медитації та енергетичному зціленню. Кожна чаша налаштована на певні частоти, що відповідають різним чакрам.",
            "p3.sp2": "99,9% чистий кришталь кварцу",
            "p3.sp3": "Частоти, налаштовані по чакрам",
            "p3.sp4": "Включає мушель та кільце",
            "p3.btn": "Додати до кошика - €350",
            "ft.desc": "Пробудження через звук.<br>Приєднуйтесь до нашої спільноти в Португалії.",
            "ft.loc": "Локації",
            "ft.con": "Зв'язатися",
            "ft.news": "Розсилка",
            "ft.email": "Ваш email",
            "ft.sub": "Підписатися",
            "ft.copy": "© 2026 Ding Handpan School Lisboa. Всі права захищені."
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
        
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if(dict[key]) {
                el.placeholder = dict[key];
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
        btn.innerHTML = `${current.flag} ${current.code.toUpperCase()} <span style="font-size:10px;margin-left:4px;">▼</span>`;
        
        // Ensure nav has relative positioning context if needed, but we'll use fixed or relative wrapper
        const parent = btn.parentElement;
        parent.style.position = 'relative';

        const drop = document.createElement('div');
        drop.className = 'lang-dropdown desktop-lang-dropdown';
        // Add absolute positioning under the button
        drop.style.cssText = `
            position: absolute;
            top: calc(100% + 10px);
            right: 2rem;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            border: 1px solid var(--border-glass);
            border-radius: 14px;
            padding: 8px;
            display: none;
            flex-direction: column;
            gap: 4px;
            min-width: 140px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            z-index: 1000;
        `;

        LANGS.forEach(l => {
            const opt = document.createElement('div');
            opt.className = 'lang-option';
            opt.style.cssText = `
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px 14px;
                border-radius: 10px;
                cursor: pointer;
                transition: background 0.15s;
                font-size: 0.9rem;
                font-weight: 500;
                color: var(--text-secondary);
            `;
            opt.innerHTML = `<span class="flag" style="font-size:18px;">${l.flag}</span><span class="label">${l.label}</span>`;
            
            if(l.code === current.code) {
                opt.style.background = 'rgba(59, 130, 246, 0.1)';
                opt.style.color = '#3b82f6';
            }

            opt.addEventListener('mouseover', () => {
                if(l.code !== current.code) {
                    opt.style.background = 'rgba(0, 0, 0, 0.04)';
                    opt.style.color = '#3b82f6';
                }
            });
            opt.addEventListener('mouseout', () => {
                if(l.code !== current.code) {
                    opt.style.background = 'transparent';
                    opt.style.color = 'var(--text-secondary)';
                }
            });

            opt.addEventListener('click', (e) => {
                e.stopPropagation();
                localStorage.setItem('lang', l.code);
                location.reload();
            });
            drop.appendChild(opt);
        });

        parent.appendChild(drop);

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = drop.style.display === 'flex';
            drop.style.display = isOpen ? 'none' : 'flex';
        });

        document.addEventListener('click', () => {
            drop.style.display = 'none';
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
