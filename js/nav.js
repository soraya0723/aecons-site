document.addEventListener('DOMContentLoaded', async () => {
  // Load navbar if not already in DOM
  if (!document.querySelector('.navbar')) {
    try {
      const res = await fetch('components/navbar.html');
      const html = await res.text();
      document.body.insertAdjacentHTML('afterbegin', html);

      // Select elements AFTER navbar is inserted
      const hamburger = document.getElementById("hamburger");
      const navLinks = document.getElementById("nav-menu");

      if (hamburger && navLinks) {
        // Toggle menu on hamburger click
        hamburger.addEventListener("click", () => {
          navLinks.classList.toggle("show");
          hamburger.classList.toggle("active");
          console.log("hamburger clicked → classes:", navLinks.className, hamburger.className);
        });

        // Close mobile menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => {
            navLinks.classList.remove('show');
            hamburger.classList.remove('active');
          });
        });
      } else {
        console.error("Navbar elements not found after load");
      }

    } catch (err) {
      console.error('Failed to load navbar:', err);
    }
  }
});