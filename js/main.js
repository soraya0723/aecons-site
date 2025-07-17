document.addEventListener('DOMContentLoaded', async () => {
  // 🔹 Navbar Injection
  if (!document.querySelector('.navbar')) {
    const res = await fetch('components/navbar.html');
    const html = await res.text();
    document.body.insertAdjacentHTML('afterbegin', html);

    const toggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Toggle menu when logo is clicked
    toggle?.addEventListener('click', e => {
      e.stopPropagation();
      navMenu?.classList.toggle('show');
    });

    // Hide menu when nav link is clicked
    document.querySelectorAll('.nav-links a').forEach(link =>
      link.addEventListener('click', () => {
        navMenu?.classList.remove('show');
      })
    );

    // Hide on outside click
    document.addEventListener('click', e => {
      if (navMenu?.classList.contains('show') &&
          !navMenu.contains(e.target) &&
          !toggle.contains(e.target)) {
        navMenu.classList.remove('show');
      }
    });

    // Add scrolled class to navbar
    window.addEventListener('scroll', () => {
      document.querySelector('.navbar')
        .classList.toggle('scrolled', window.scrollY > 50);
    });
  }

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

  // 🔹 Hero Swiper Initialization
  if (document.querySelector('.hero-swiper')) {
    new Swiper('.hero-swiper', {
      loop: true,
      autoplay: { delay: 4000, disableOnInteraction: false },
      effect: 'fade',
      fadeEffect: { crossFade: true }
    });
  }

  // 🔹 Form Submission Handler
  const form = document.getElementById('aecons-form');
  const status = document.getElementById('form-response');

  form?.addEventListener('submit', async (e) => {
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

  // 🔹 Gallery Filter
  const filterButtons = document.querySelectorAll('.filter-buttons button');
  const galleryItems = document.querySelectorAll('.gallery-item');

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

  // 🔹 Swiper Modal Logic
  const modal = document.getElementById('swiperModal');
  const closeModalBtn = document.getElementById('closeModal');
  const mainWrapper = modal?.querySelector('#swiperMainWrapper');
  const thumbWrapper = modal?.querySelector('#swiperThumbWrapper');

  let swiperMain, swiperThumbs;

  closeModalBtn?.addEventListener('click', () => {
    modal.style.display = 'none';
    swiperMain?.destroy(true, true);
    swiperThumbs?.destroy(true, true);
  });

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const images = JSON.parse(item.dataset.images || '[]');
      if (!images.length) return;

      mainWrapper.innerHTML = '';
      thumbWrapper.innerHTML = '';

      images.forEach(src => {
        const mainSlide = `<div class="swiper-slide"><img src="${src}" alt="Project Image"></div>`;
        const thumbSlide = `<div class="swiper-slide"><img src="${src}" alt="Thumbnail"></div>`;
        mainWrapper.insertAdjacentHTML('beforeend', mainSlide);
        thumbWrapper.insertAdjacentHTML('beforeend', thumbSlide);
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
});
