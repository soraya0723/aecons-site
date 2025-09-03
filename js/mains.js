// 🔹 Loader overlay + Scroll reveal
window.addEventListener("load", () => {
  // Handle loader only if it exists
  const loader = document.getElementById("loader");
  if (loader) {
    loader.classList.add("hidden");
    console.log("✅ Loader hidden");
  } else {
    console.log("ℹ️ No loader found, skipping...");
  }

  // Grab all sections
  const sections = document.querySelectorAll("section, main");

  const revealOnScroll = () => {
    sections.forEach((sec, i) => {
      if (!sec.classList.contains("visible")) { // prevent re-trigger
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          setTimeout(() => {
            sec.classList.add("visible");
            console.log("✨ Revealed section:", i);
          }, i * 200); // stagger effect
        }
      }
    });
  };

  // Run on scroll and on load
  window.addEventListener("scroll", revealOnScroll, { passive: true });
  revealOnScroll(); // reveal hero section immediately
});
