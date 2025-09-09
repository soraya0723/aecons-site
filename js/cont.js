// One-time entrance on page load
  document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".contact-card");

    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("show");
      }, index * 300); // stagger: 0ms, 300ms, 600ms
    });
  });