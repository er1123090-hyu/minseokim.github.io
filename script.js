const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const navLinks = [...document.querySelectorAll(".nav-links a")];
const sections = [...document.querySelectorAll("main section[id]")];
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const publications = [...document.querySelectorAll("[data-publications] .publication-card")];
const copyEmailButton = document.querySelector("[data-copy-email]");
const copyStatus = document.querySelector("[data-copy-status]");
const email = "er1123090@hanyang.ac.kr";

document.querySelector("[data-year]").textContent = new Date().getFullYear();

const closeMenu = () => {
  navMenu?.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
};

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    publications.forEach((publication) => {
      const tags = publication.dataset.tags.split(" ");
      publication.hidden = filter !== "all" && !tags.includes(filter);
    });
  });
});

copyEmailButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = "Email copied.";
  } catch {
    copyStatus.textContent = email;
  }
});

const setActiveLink = () => {
  const offset = window.scrollY + 140;
  const current = sections.findLast((section) => section.offsetTop <= offset);

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", current && link.getAttribute("href") === `#${current.id}`);
  });

  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

setActiveLink();
window.addEventListener("scroll", setActiveLink, { passive: true });
