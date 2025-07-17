document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('swiperModal');
  const closeModalBtn = document.getElementById('closeModal');
  const mainWrapper = document.getElementById('swiperMainWrapper');
  const thumbWrapper = document.getElementById('swiperThumbWrapper');

  let mainSwiper;
  let thumbSwiper;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const images = JSON.parse(item.getAttribute('data-images'));
      mainWrapper.innerHTML = '';
      thumbWrapper.innerHTML = '';

      images.forEach(src => {
        mainWrapper.innerHTML += `<div class="swiper-slide"><img src="${src}" alt=""></div>`;
        thumbWrapper.innerHTML += `<div class="swiper-slide"><img src="${src}" alt=""></div>`;
      });

      modal.style.display = 'flex';

      thumbSwiper = new Swiper('.swiper-thumbs', {
        spaceBetween: 10,
        slidesPerView: 5,
        freeMode: true,
        watchSlidesProgress: true,
      });

      mainSwiper = new Swiper('.swiper-main', {
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
        },
        thumbs: {
          swiper: thumbSwiper,
        },
      });
    });
  });

  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    mainSwiper?.destroy();
    thumbSwiper?.destroy();
  });
});
