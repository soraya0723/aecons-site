document.addEventListener("DOMContentLoaded", () => {
  const rows = document.querySelectorAll(".service-row");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show"); // animate again when scrolling up
        }
      });
    },
    { threshold: 0.2 } // triggers when 20% is visible
  );

  rows.forEach(row => observer.observe(row));
});
