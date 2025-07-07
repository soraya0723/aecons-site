document.addEventListener('DOMContentLoaded', async () => {
  // 🔹 Navbar Injection & Toggle
  if (!document.querySelector('.navbar')) {
    const res = await fetch('components/navbar.html');
    const html = await res.text();
    document.body.insertAdjacentHTML('afterbegin', html);
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');

    toggle?.addEventListener('click', e => {
      e.stopPropagation();
      links.classList.toggle('show');
    });

    document.querySelectorAll('.nav-links a').forEach(link =>
      link.addEventListener('click', () => links.classList.remove('show'))
    );

    document.addEventListener('click', e => {
      if (links?.classList.contains('show') &&
          !links.contains(e.target) &&
          !toggle.contains(e.target)) {
        links.classList.remove('show');
      }
    });

    window.addEventListener('scroll', () => {
      document.querySelector('.navbar')
        .classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // 🔹 Scroll-triggered Reveal Animations
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('reveal');
    });
  });
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
  
  const form = document.getElementById('aecons-form');
  const status = document.getElementById('form-response');

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
});