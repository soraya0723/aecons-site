// ==================== HERO SWIPER ====================
if (document.querySelector('.hero-swiper')) {
  new Swiper('.hero-swiper', {
    loop: true,
    autoplay: { delay: 4000, disableOnInteraction: false },
    speed: 1200,
    effect: 'slide',   // clean slide
    parallax: true,    // depth effect
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



// ==================== PROTECTION (robust) ====================
document.addEventListener('DOMContentLoaded', () => {

  // ---- Guard Swiper init (prevent errors stopping later scripts) ----
  try {
    if (typeof Swiper !== 'undefined' && document.querySelector('.hero-swiper')) {
      new Swiper('.hero-swiper', {
        loop: true,
        autoplay: { delay: 4000, disableOnInteraction: false },
        speed: 1200,
        effect: 'slide',
        parallax: true,
        grabCursor: true,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      });
    }
  } catch (err) {
    console.warn('Swiper init skipped or failed (continuing):', err);
  }

  // ---- Create container + CSS ----
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
      background: rgba(255,0,0,0.85); /* 🔴 strong red bg */
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.08s linear;
      z-index: 2147483647;
      overflow: hidden;
    }
    .watermarkOverlay {
      position: absolute;
      font-size: 3rem;
      font-weight: 900;
      color: rgba(0,0,0,0.85); /* ⚫ dark black watermark */
      -webkit-user-select: none;
      user-select: none;
      pointer-events: none;
      white-space: nowrap;
      transform-origin: center center;
      animation: wmJitter 0.18s infinite;
    }
    @keyframes wmJitter {
      0%   { transform: translate(0,0) rotate(0deg); }
      25%  { transform: translate(4px,-4px) rotate(2deg); }
      50%  { transform: translate(-4px,4px) rotate(-2deg); }
      75%  { transform: translate(4px,4px) rotate(2deg); }
      100% { transform: translate(-4px,-4px) rotate(-2deg); }
    }
  `;
  document.head.appendChild(style);

  // ---- Jumpscare generator ----
  function triggerJumpscare({count = 30, duration = 3000} = {}) {
    if (watermarkContainer.dataset.active === '1') return;
    watermarkContainer.dataset.active = '1';
    watermarkContainer.style.opacity = '1';

    for (let i = 0; i < count; i++) {
      const wm = document.createElement('div');
      wm.className = 'watermarkOverlay';
      wm.innerText = '© Aecons Architecture'; 
      const top = Math.random() * 92;
      const left = Math.random() * 92;
      const size = (Math.random() * 3 + 1.5).toFixed(2); 
      const rot = Math.random() * 60 - 30;
      wm.style.top = `${top}%`;
      wm.style.left = `${left}%`;
      wm.style.fontSize = `${size}rem`;
      wm.style.transform = `rotate(${rot}deg)`;
      watermarkContainer.appendChild(wm);
    }

    setTimeout(() => {
      watermarkContainer.style.opacity = '0';
      watermarkContainer.innerHTML = '';
      watermarkContainer.dataset.active = '0';
    }, duration);
    console.info('Protection: jumpscare triggered');
  }

  window.triggerJumpscare = triggerJumpscare;

  // ---- print-screen detection helpers ----
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
    try { if (isPrintKeyEvent(e)) triggerJumpscare(); } catch {}
  });
  window.addEventListener('keyup', (e) => {
    try { if (isPrintKeyEvent(e)) triggerJumpscare(); } catch {}
  });

  // ---- blur/focus heuristic ----
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
                  triggerJumpscare();
                  return;
                }
              }
            }
          } catch {}
        }
        if (dt < 1500) triggerJumpscare();
      }
    } catch {}
  });

});





// ==================== DISABLE RIGHT-CLICK ON IMAGES ====================
document.addEventListener("contextmenu", e => {
  if (e.target.tagName === "IMG") e.preventDefault();
});

// ==================== DISABLE IMAGE DRAGGING (Cross-Browser) ====================
document.addEventListener("dragstart", e => {
  if (e.target.tagName === "IMG") e.preventDefault();
});

// ==================== DISABLE CTRL+P (Print) ====================
document.addEventListener("keydown", e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
    e.preventDefault();
    alert("🚫 Printing is disabled on this website.");
  }
});

// ==================== DISABLE DEV TOOLS ====================
document.addEventListener("keydown", e => {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && ["I","J","C"].includes(e.key.toUpperCase())) ||
    (e.ctrlKey && e.key.toLowerCase() === "u")
  ) {
    e.preventDefault();
    alert("🚫 Dev Tools are disabled on this website.");
  }
});







