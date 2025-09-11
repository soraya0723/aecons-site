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

// Create watermark container
const watermarkContainer = document.createElement("div");
watermarkContainer.id = "watermarkContainer";
document.body.appendChild(watermarkContainer);

// ==================== OVERLAY CSS ====================
const style = document.createElement("style");
style.innerHTML = `
  #watermarkContainer {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(255,0,0,0.05); /* faint red tint */
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.1s ease;
    z-index: 999999;
    overflow: hidden;
  }

  .watermarkOverlay {
    position: absolute;
    font-size: 3rem;
    font-weight: 900;
    color: rgba(255, 0, 0, 0.35);
    user-select: none;
    pointer-events: none;
    white-space: nowrap;
    animation: jitter 0.2s infinite;
  }

  @keyframes jitter {
    0%   { transform: translate(0, 0) rotate(0deg); }
    25%  { transform: translate(5px, -5px) rotate(2deg); }
    50%  { transform: translate(-5px, 5px) rotate(-2deg); }
    75%  { transform: translate(5px, 5px) rotate(2deg); }
    100% { transform: translate(-5px, -5px) rotate(-2deg); }
  }
`;
document.head.appendChild(style);

// ==================== JUMPSCARE FUNCTION ====================
function triggerJumpscare() {
  watermarkContainer.style.opacity = "1";

  for (let i = 0; i < 25; i++) {   // a few more for full spam
    const wm = document.createElement("div");
    wm.className = "watermarkOverlay";
    wm.innerText = "© Aecons Architecture"; // brand only ✅
    wm.style.top = Math.random() * 100 + "%";
    wm.style.left = Math.random() * 100 + "%";
    wm.style.fontSize = `${Math.random() * 4 + 2}rem`;
    wm.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;
    watermarkContainer.appendChild(wm);
  }

  setTimeout(() => {
    watermarkContainer.style.opacity = "0";
    watermarkContainer.innerHTML = "";
  }, 3000);

  alert("🚫 Screenshots are not allowed.");
}

// ==================== DETECT PRINTSCREEN ====================
// Works in Firefox
document.addEventListener("keyup", e => {
  if (e.key === "PrintScreen") triggerJumpscare();
});

// Works in Chrome/Edge: monitor clipboard
window.addEventListener("focus", async () => {
  try {
    const clipboard = await navigator.clipboard.readText();
    if (clipboard === "") {
      triggerJumpscare();
    }
  } catch (err) {
    // Clipboard API may be blocked, ignore silently
  }
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







