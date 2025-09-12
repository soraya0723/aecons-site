document.addEventListener("DOMContentLoaded", () => {
  const swiperThumbs = new Swiper(".swiper-thumbs", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });

  const swiperMain = new Swiper(".swiper-main", {
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 3000,              // ⏱ change image every 3 seconds
      disableOnInteraction: false, // keeps autoplay even after user clicks
    },
    thumbs: {
      swiper: swiperThumbs,
    },
  });
});
