if (document.querySelector('.hero-swiper')) {
  new Swiper('.hero-swiper', {
    loop: true,
    autoplay: { delay: 8000, disableOnInteraction: false }, // matches zoom-out duration
    effect: 'fade',
    fadeEffect: { crossFade: true }
  });
}
