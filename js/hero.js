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

// ==================== DISABLE RIGHT-CLICK ON IMAGES ====================
document.addEventListener("contextmenu", (e) => {
  if (e.target.tagName === "IMG") {
    e.preventDefault();
  }
});