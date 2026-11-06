const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const header = document.querySelector(".site-header");
const progress = document.querySelector("#scrollProgress");

// Mobile navigation
menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

// Header effect and reading progress
function updateScrollUI() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${percentage}%`;
  header.classList.toggle("scrolled", window.scrollY > 20);
}
window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

// Reveal sections as they enter the viewport
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

// Highlight the current navigation section
const sections = document.querySelectorAll("main section[id]");
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const current = entry.target.id;
      navLinks.querySelectorAll("a").forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => sectionObserver.observe(section));

// Show the uploaded portrait only if the image path exists
const profileImage = document.querySelector("#profileImage");
const profileFrame = document.querySelector(".profile-frame");
profileImage.addEventListener("load", () => profileFrame.classList.add("has-image"));
profileImage.addEventListener("error", () => profileFrame.classList.remove("has-image"));
if (profileImage.complete && profileImage.naturalWidth > 0) {
  profileFrame.classList.add("has-image");
}
