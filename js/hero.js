if (document.querySelector('.hero-swiper')) {
  new Swiper('.hero-swiper', {
    loop: true,
    autoplay: { delay: 4000, disableOnInteraction: false },
    effect: 'fade',
    fadeEffect: { crossFade: true }
  });
}
