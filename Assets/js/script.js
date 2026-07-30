
// const mainSwitch = document.getElementById('main-switch');
// const switchBtn = document.getElementById('switch-btn');
// const bodyElement = document.body;
// const heroTitle = document.getElementById('hero-title');
// const heroSubtitle = document.getElementById('hero-subtitle');
// const btnPortal = document.getElementById('btn-portal');
// const headerEl = document.getElementById('site-header');
// const headerCta = document.getElementById('header-cta');
// const modeChip = document.getElementById('mode-chip');
// const modeChipMobile = document.getElementById('mode-chip-mobile');
// const navToggle = document.getElementById('nav-toggle');
// const navSignal = document.getElementById('nav-signal');
// const headerNav = document.getElementById('header-nav');
// const navLinks = Array.from(document.querySelectorAll('[data-nav]'));
// const sections = [
//     { id: 'topo', el: document.getElementById('topo') },
//     { id: 'ferramentas', el: document.getElementById('ferramentas') },
//     { id: 'trilha', el: document.getElementById('trilha') },
//     { id: 'suporte', el: document.getElementById('suporte') }
// ].filter(s => s.el);

// function syncModeChips(isOff) {
//     const label = isOff ? 'OFF' : 'ON';
//     if (modeChip) modeChip.textContent = label;
//     if (modeChipMobile) modeChipMobile.textContent = label;
// }

function updateInterface(isOff) {
    if (isOff) {
        bodyElement.classList.add('mode-off');
        switchBtn.textContent = 'OFF';
        if (heroTitle) heroTitle.innerHTML = 'A paz começa no <span><span class="brand-power" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M13 3h-2v10h2V3zm4.83 2.17-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/></svg></span>ff.</span>';
        if (heroSubtitle) heroSubtitle.textContent = 'O ambiente clinico agora está sincronizado com a desconexão 					saudável. Conecte sua prática e amplie sua visão sobre o sono saudável e a saúde integral';
        if (btnPortal) btnPortal.textContent = 'Acessar Portal';
        if (headerCta) headerCta.textContent = 'Acessar';
    } else {
        bodyElement.classList.remove('mode-off');
        switchBtn.textContent = 'ON';
        if (heroTitle) heroTitle.innerHTML = 'Convide seu paciente a se <span>desligar.</span>';
        if (heroSubtitle) heroSubtitle.textContent = 'Aqui você encontra ciência validada por especialistas, ferramentas que cabem na consulta e o caminho para o seu paciente tratar de verdade. Entre para acessar o seu espaço.';
        if (btnPortal) btnPortal.textContent = 'Entrar';
        if (headerCta) headerCta.textContent = 'Entrar';
    }
    syncModeChips(isOff);
}

mainSwitch.addEventListener('click', () => {
    const currentInitialState = bodyElement.classList.contains('mode-off');
    updateInterface(!currentInitialState);
});

window.addEventListener('load', () => {
    setTimeout(() => {
        if (!bodyElement.classList.contains('mode-off')) {
            updateInterface(true);
        }
    }, 1500);
});

function setMenuOpen(open) {
    headerEl.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    bodyElement.style.overflow = open ? 'hidden' : '';
}

navToggle.addEventListener('click', () => {
    setMenuOpen(!headerEl.classList.contains('is-open'));
});

function moveSignal(activeLink) {
    if (!navSignal || !headerNav || !activeLink || !headerNav.contains(activeLink)) return;
    const navRect = headerNav.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    navSignal.style.width = linkRect.width + 'px';
    navSignal.style.transform = `translateX(${linkRect.left - navRect.left}px)`;
    navSignal.classList.add('is-ready');
}

function setActiveSection(id) {
    let desktopActive = null;
    navLinks.forEach(link => {
        const match = link.getAttribute('href') === '#' + id;
        link.classList.toggle('is-active', match);
        if (match && headerNav.contains(link)) desktopActive = link;
    });
    if (desktopActive) moveSignal(desktopActive);
}

function onScroll() {
    headerEl.classList.toggle('is-scrolled', window.scrollY > 24);
    const probe = window.scrollY + window.innerHeight * 0.28;
    let current = sections[0]?.id || 'topo';
    for (const section of sections) {
        if (section.el.offsetTop <= probe) current = section.id;
    }
    setActiveSection(current);
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const hash = link.getAttribute('href');
        const target = document.querySelector(hash);
        if (!target) return;
        e.preventDefault();
        setMenuOpen(false);
        const offset = 88;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        history.replaceState(null, '', hash);
    });
});

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', () => {
    if (window.innerWidth > 900) setMenuOpen(false);
    const active = headerNav.querySelector('a.is-active');
    if (active) moveSignal(active);
});
onScroll();
