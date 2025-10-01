document.addEventListener("DOMContentLoaded", () => {
  const aboutImg = document.querySelector(".about-img"); // updated selector ✅

  if (aboutImg) {
    // Scroll reveal animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          aboutImg.classList.add("visible");
        } else {
          aboutImg.classList.remove("visible");
        }
      });
    }, { threshold: 0.3 });

    observer.observe(aboutImg);

    // Hover 3D tilt effect
    aboutImg.addEventListener("mousemove", (e) => {
      const rect = aboutImg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * -10;

      aboutImg.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.02)
      `;
    });

    aboutImg.addEventListener("mouseleave", () => {
      aboutImg.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    });
  }
});
