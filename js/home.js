document.addEventListener("DOMContentLoaded", () => {
  const aboutImg = document.querySelector(".about-card img");

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
      const x = e.clientX - rect.left; // mouse X within image
      const y = e.clientY - rect.top;  // mouse Y within image

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt (max 10deg)
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
