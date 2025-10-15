// ==================== HERO SWIPER ====================
document.addEventListener('DOMContentLoaded', () => {
  try {
    if (typeof Swiper !== 'undefined' && document.querySelector('.hero-swiper')) {
      new Swiper('.hero-swiper', {
        loop: true,
        autoplay: { delay: 4000, disableOnInteraction: false },
        speed: 1200,
        effect: 'slide',
        parallax: true,
        grabCursor: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
  } catch (err) {
    console.warn('⚠️ Swiper init skipped or failed:', err);
  }

  // ==================== PROTECTION OVERLAY ====================
  const watermarkContainer = document.createElement('div');
  watermarkContainer.id = 'watermarkContainer';
  document.body.appendChild(watermarkContainer);

  const style = document.createElement('style');
  style.textContent = `
    #watermarkContainer {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      background: #fff; /* ⚪ white background */
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.1s linear;
      z-index: 2147483647;
    }
    #watermarkContainer img {
      width: 220px; /* adjust as needed */
      opacity: 0.95;
      user-select: none;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);

  // ---- Trigger logo overlay ----
  function triggerLogoOverlay({ duration = 3000 } = {}) {
    if (watermarkContainer.dataset.active === '1') return;
    watermarkContainer.dataset.active = '1';
    watermarkContainer.style.opacity = '1';
    watermarkContainer.style.pointerEvents = 'auto';

    // Show logo
    watermarkContainer.innerHTML = '';
    const logo = document.createElement('img');
    logo.src = 'assets/icon/viber_logo.svg'; // ⚠️ change to your actual logo path
    logo.alt = 'Aecons Architecture';
    watermarkContainer.appendChild(logo);

    // Hide after delay
    setTimeout(() => {
      watermarkContainer.style.opacity = '0';
      watermarkContainer.innerHTML = '';
      watermarkContainer.style.pointerEvents = 'none';
      watermarkContainer.dataset.active = '0';
    }, duration);

    console.info('🛡️ Protection: logo overlay triggered');
  }

  window.triggerLogoOverlay = triggerLogoOverlay;

  // ---- Print Screen detection ----
  function isPrintKeyEvent(e) {
    return (
      e.key === 'PrintScreen' ||
      e.code === 'PrintScreen' ||
      e.key === 'Print' ||
      e.key === 'PrtSc' ||
      e.keyCode === 44 ||
      e.which === 44
    );
  }

  window.addEventListener('keydown', (e) => {
    try { if (isPrintKeyEvent(e)) triggerLogoOverlay(); } catch {}
  });
  window.addEventListener('keyup', (e) => {
    try { if (isPrintKeyEvent(e)) triggerLogoOverlay(); } catch {}
  });

  // ---- Blur/focus clipboard heuristic ----
  let lastBlur = 0;
  window.addEventListener('blur', () => { lastBlur = Date.now(); });

  window.addEventListener('focus', async () => {
    try {
      const dt = Date.now() - lastBlur;
      if (lastBlur && dt > 50 && dt < 2000) {
        if (navigator.clipboard && typeof navigator.clipboard.read === 'function') {
          try {
            const items = await navigator.clipboard.read();
            for (const item of items) {
              for (const t of item.types) {
                if (t.startsWith('image/')) {
                  triggerLogoOverlay();
                  return;
                }
              }
            }
          } catch {}
        }
        if (dt < 1500) triggerLogoOverlay();
      }
    } catch {}
  });

  // ==================== DISABLE IMAGE ACTIONS ====================
  document.addEventListener('contextmenu', e => {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });

  document.addEventListener('dragstart', e => {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });

  // ==================== DISABLE PRINT (CTRL+P) ====================
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
      e.preventDefault();
      alert('🚫 Printing is disabled on this website.');
    }
  });

  // ==================== DISABLE DEV TOOLS ====================
  document.addEventListener('keydown', e => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key.toUpperCase())) ||
      (e.ctrlKey && e.key.toLowerCase() === 'u')
    ) {
      e.preventDefault();
      alert('🚫 Dev Tools are disabled on this website.');
    }
  });
});
