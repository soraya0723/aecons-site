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
const galleryWrappers = document.querySelectorAll('.gallery-wrapper');

if (filterButtons.length && galleryWrappers.length) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // reset active state
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      galleryWrappers.forEach(wrapper => {
        const category = wrapper.dataset.category;

        if (filter === "all" || category === filter) {
          wrapper.classList.remove("hidden"); // show
        } else {
          wrapper.classList.add("hidden"); // hide
        }
      });
    });
  });
}
