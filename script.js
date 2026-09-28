/* ============================================================
   ALQUIMIADEV — Interacciones del portfolio
   ============================================================ */

// ============================================================
// 1. MENÚ HAMBURGUESA (mobile)
// ============================================================
(function initNav() {
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');

  if (!navToggle || !navMobile) return;

  // Abrir/cerrar al hacer clic en el botón
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navMobile.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Cerrar al hacer clic en un link
  navMobile.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  // Cerrar al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (
      navMobile.classList.contains('active') &&
      !navMobile.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      navMobile.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });

  // Cerrar al hacer scroll (opcional, mejora UX)
  window.addEventListener('scroll', () => {
    if (navMobile.classList.contains('active') && window.scrollY > 100) {
      navMobile.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
})();


// ============================================================
// 2. PARTÍCULAS DORADAS
// ============================================================
(function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = 35;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 4 + 2;

    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 6 + 's';
    p.style.animationDuration = 4 + Math.random() * 4 + 's';
    p.style.opacity = 0.2 + Math.random() * 0.5;

    fragment.appendChild(p);
  }

  container.appendChild(fragment);
})();


// ============================================================
// 3. SCROLL REVEAL (fade-in al hacer scroll)
// ============================================================
(function initScrollReveal() {
  const elements = document.querySelectorAll(
    '.section-header, .service-card, .project-card, .step, .sobre-mi-text, .sobre-mi-stats'
  );

  if (!elements.length) return;

  // Si el navegador no soporta IntersectionObserver, mostrar todo
  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  elements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
  });

  // Stagger (retraso escalonado)
  document.querySelectorAll('.service-card').forEach((card, i) => {
    card.style.transitionDelay = i * 0.1 + 's';
  });

  document.querySelectorAll('.project-card').forEach((card, i) => {
    card.style.transitionDelay = i * 0.1 + 's';
  });

  document.querySelectorAll('.step').forEach((step, i) => {
    step.style.transitionDelay = i * 0.1 + 's';
  });
})();


// ============================================================
// 4. NAV — Cambio de fondo al hacer scroll
// ============================================================
(function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let ticking = false;

  function updateNav() {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(26, 10, 40, 0.95)';
      nav.style.borderBottomColor = 'rgba(255, 193, 7, 0.2)';
    } else {
      nav.style.background = 'rgba(26, 10, 40, 0.75)';
      nav.style.borderBottomColor = 'rgba(255, 193, 7, 0.1)';
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  });
})();


// ============================================================
// 5. SMOOTH SCROLL PARA LINKS INTERNOS (fallback)
// ============================================================
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navHeight = 80;
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });
})();