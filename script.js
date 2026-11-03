const menuToggle = document.querySelector(".menu-toggle");
const navigationLinks = document.querySelector(".navigation-links");

function closeMenu() {
  if (!menuToggle || !navigationLinks) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  navigationLinks.classList.remove("is-open");
}

if (menuToggle && navigationLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    navigationLinks.classList.toggle("is-open", !isOpen);
  });

  navigationLinks.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (event.target instanceof Node && !menuToggle.contains(event.target) && !navigationLinks.contains(event.target)) {
      closeMenu();
    }
  });
}

const year = document.querySelector("#current-year");
if (year) year.textContent = String(new Date().getFullYear());

const revealElements = document.querySelectorAll(
  ".section-heading, .section-content, .skill-list li, .project-card, .education-card, .github-content, .contact-copy, .contact-email",
);

if ("IntersectionObserver" in window && revealElements.length > 0) {
  document.documentElement.classList.add("reveal-ready");
  revealElements.forEach((element) => element.classList.add("reveal"));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
}
