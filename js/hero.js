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



// ==================== PROTECTION.JS ====================

// Create overlays dynamically
const blurOverlay = document.createElement("div");
blurOverlay.id = "antiScreenshotOverlay";
document.body.appendChild(blurOverlay);

const watermarkOverlay = document.createElement("div");
watermarkOverlay.id = "watermarkOverlay";
watermarkOverlay.innerText = "© Aecons Architecture";
document.body.appendChild(watermarkOverlay);

// ==================== OVERLAY CSS ====================
const style = document.createElement("style");
style.innerHTML = `
  #antiScreenshotOverlay {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(25px);
    background: rgba(255,255,255,0.15);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease;
    z-index: 999998;
  }

  #watermarkOverlay {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-30deg);
    font-size: 3rem;
    color: rgba(255,255,255,0.25);
    pointer-events: none;
    user-select: none;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.25s ease;
    z-index: 999999;
  }

  img {
    -webkit-user-drag: none;
    user-drag: none;
    user-select: none;
  }
`;
document.head.appendChild(style);

// ==================== DISABLE RIGHT-CLICK ON IMAGES ====================
document.addEventListener("contextmenu", e => {
  if (e.target.tagName === "IMG") e.preventDefault();
});

// ==================== BLUR + JITTERING WATERMARK ON PRINT SCREEN ====================
let jitterInterval;

document.addEventListener("keyup", e => {
  if (e.key === "PrintScreen") {
    blurOverlay.style.opacity = "1";
    watermarkOverlay.style.opacity = "1";

    // Start jitter effect
    jitterInterval = setInterval(() => {
      const x = Math.random() * 30 - 15; // -15px to +15px
      const y = Math.random() * 30 - 15;
      const rotate = Math.random() * 20 - 10; // -10deg to +10deg
      watermarkOverlay.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rotate}deg)`;
    }, 50); // every 50ms

    // Stop after 0.8s
    setTimeout(() => {
      blurOverlay.style.opacity = "0";
      watermarkOverlay.style.opacity = "0";
      clearInterval(jitterInterval);
      watermarkOverlay.style.transform = "translate(-50%, -50%) rotate(-30deg)";
    }, 1000);

    alert("🚫 Screenshots are not allowed.");
  }
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






