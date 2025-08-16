document.addEventListener('DOMContentLoaded', async () => {
  // Load navbar if not already in DOM
  if (!document.querySelector('.navbar')) {
    try {
      const res = await fetch('components/navbar.html');
      const html = await res.text();
      document.body.insertAdjacentHTML('afterbegin', html);

      // Close mobile menu when clicking a link
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
          document.getElementById('nav-menu')?.classList.remove('show');
        });
      });
    } catch (err) {
      console.error('Failed to load navbar:', err);
    }
  }
});
