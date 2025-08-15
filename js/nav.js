document.addEventListener('DOMContentLoaded', async () => {
  // Load navbar if not already in DOM
  if (!document.querySelector('.navbar')) {
    const res = await fetch('components/navbar.html');
    const html = await res.text();
    document.body.insertAdjacentHTML('afterbegin', html);

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link =>
      link.addEventListener('click', () => {
        document.getElementById('nav-menu')?.classList.remove('show');
      })
    );
  }

  // Initialize Swiper
  new Swiper(".hero-swiper", {
    effect: "fade",
    fadeEffect: { crossFade: true },
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    speed: 800
  });
});
