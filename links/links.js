// Generar partículas doradas (se omite si el usuario pidió menos movimiento)
    (function () {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const container = document.getElementById('particles');
      if (!container) return;
      const count = 30;
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        const size = Math.random() * 4 + 2;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = (Math.random() * 100) + '%';
        p.style.top = (Math.random() * 100) + '%';
        p.style.animationDelay = (Math.random() * 6) + 's';
        p.style.animationDuration = (4 + Math.random() * 4) + 's';
        p.style.opacity = 0.2 + Math.random() * 0.5;
        fragment.appendChild(p);
      }
      container.appendChild(fragment);
    })();