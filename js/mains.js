// Loader overlay + Scroll reveal
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  // Function to hide loader after video ends
  window.hideLoader = () => {
    loader.classList.add("hidden");
    console.log("✅ Loader hidden after video");
  };

  // Safety fallback: hide after 19s if "ended" doesn’t fire
  setTimeout(() => {
    if (loader && !loader.classList.contains("hidden")) {
      loader.classList.add("hidden");
      console.log("⏱️ Fallback: Loader hidden after 19s");
    }
  }, 19000);

  // Scroll reveal logic
  const sections = document.querySelectorAll("section, main");
  const revealOnScroll = () => {
    sections.forEach((sec, i) => {
      if (!sec.classList.contains("visible")) {
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          setTimeout(() => {
            sec.classList.add("visible");
            console.log("✨ Revealed section:", i);
          }, i * 200);
        }
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll, { passive: true });
  revealOnScroll();
});
