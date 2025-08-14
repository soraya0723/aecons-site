document.addEventListener('DOMContentLoaded', async () => {
  // 🔹 Navbar Injection (Single Load)
  if (!document.querySelector('.navbar')) {
    const res = await fetch('components/navbar.html');
    const html = await res.text();
    document.body.insertAdjacentHTML('afterbegin', html);

    const navbar = document.querySelector('.navbar');

    // Optional: Hide menu on link click (mobile)
    document.querySelectorAll('.nav-links a').forEach(link =>
      link.addEventListener('click', () => {
        document.getElementById('nav-menu')?.classList.remove('show');
      })
    );

    // ✅ Always glassy fade effect
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      let opacity = Math.min(scrollTop / 80, 1); // smoother transition

      // Start slightly white (0.3) and get a bit more solid as we scroll
      navbar.style.backgroundColor = `rgba(255, 255, 255, ${0.3 + opacity * 0.4})`;

      // Keep blur effect at all times
      navbar.style.backdropFilter = 'blur(10px)';
      navbar.style.webkitBackdropFilter = 'blur(10px)';

      // Add subtle shadow after scrolling a little
      navbar.style.boxShadow = opacity > 0.1
        ? '0 2px 8px rgba(0,0,0,0.1)'
        : 'none';
    });
  }
   // Auto-generate blurred background layers per slide
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".hero-swiper .swiper-slide").forEach(slide => {
    const img = slide.querySelector("img");
    if (img && !slide.querySelector(".slide-blur")) {
      const blurDiv = document.createElement("div");
      blurDiv.className = "slide-blur";
      blurDiv.style.backgroundImage = `url('${img.src}')`;
      slide.prepend(blurDiv);
    }
  });

  // Init Swiper
  new Swiper(".hero-swiper", {
    effect: "fade",
    fadeEffect: { crossFade: true },
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 800
  });
});














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
});
