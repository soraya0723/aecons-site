// 🔹 Scroll-triggered Reveal
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal', 'animate');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.service-card, .gallery-item')
  .forEach(el => observer.observe(el));


// 🔹 Form Submission Handler
const form = document.getElementById('aecons-form');
const status = document.getElementById('form-response');

if (form && status) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xblybbpj', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        status.textContent = '✅ Message sent successfully!';
        status.className = 'form-status success';
        form.reset();
      } else {
        status.textContent = '❌ Something went wrong. Please try again.';
        status.className = 'form-status error';
      }
    } catch (err) {
      console.error('Submission error:', err);
      status.textContent = '❌ Failed to send. Check your internet connection.';
      status.className = 'form-status error';
    }
  });
}


// 🔹 Gallery Filter
const filterButtons = document.querySelectorAll('.filter-buttons button');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterButtons.length && galleryItems.length) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      galleryItems.forEach(item => {
        const category = item.dataset.category;
        item.style.display = (filter === 'all' || category === filter) ? 'block' : 'none';
      });
    });
  });
}


// 🔹 Swiper Modal Logic
const modal = document.getElementById('swiperModal');
const closeModalBtn = document.getElementById('closeModal');
const mainWrapper = modal?.querySelector('#swiperMainWrapper');
const thumbWrapper = modal?.querySelector('#swiperThumbWrapper');

let swiperMain, swiperThumbs;

if (closeModalBtn && modal) {
  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    swiperMain?.destroy(true, true);
    swiperThumbs?.destroy(true, true);
  });
}

if (mainWrapper && thumbWrapper) {
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const images = JSON.parse(item.dataset.images || '[]');
      if (!images.length) return;

      mainWrapper.innerHTML = '';
      thumbWrapper.innerHTML = '';

      images.forEach(src => {
        mainWrapper.insertAdjacentHTML('beforeend', `<div class="swiper-slide"><img src="${src}" alt="Project Image"></div>`);
        thumbWrapper.insertAdjacentHTML('beforeend', `<div class="swiper-slide"><img src="${src}" alt="Thumbnail"></div>`);
      });

      modal.style.display = 'block';

      swiperThumbs = new Swiper('.swiper-thumbs', {
        spaceBetween: 10,
        slidesPerView: 4,
        watchSlidesProgress: true,
      });

      swiperMain = new Swiper('.swiper-main', {
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        thumbs: {
          swiper: swiperThumbs,
        },
      });
    });
  });
}
