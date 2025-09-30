// Loader overlay + Scroll reveal
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  if (loader) {
    // Keep loader for 2s before hiding
    setTimeout(() => {
      loader.classList.add("hidden");
      console.log("✅ Loader hidden with animation");
    }, 2000);
  }

  // Grab all sections
  const sections = document.querySelectorAll("section, main");

  const revealOnScroll = () => {
    sections.forEach((sec, i) => {
      if (!sec.classList.contains("visible")) {
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          // Add staggered animation
          setTimeout(() => {
            sec.classList.add("visible");
            console.log("✨ Revealed section:", i);
          }, i * 200);
        }
      }
    });
  };

  // Run on scroll and load
  window.addEventListener("scroll", revealOnScroll, { passive: true });
  revealOnScroll();
});
