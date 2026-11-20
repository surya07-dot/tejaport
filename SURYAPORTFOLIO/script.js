const nav = document.querySelector("#nav");
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");
const modal = document.querySelector(".project-modal");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 40);
});

menuButton.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const sections = [...document.querySelectorAll("main section[id]")];
const desktopLinks = [...document.querySelectorAll(".nav-links a")];
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      desktopLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55%", threshold: 0 });
sections.forEach((section) => observer.observe(section));

const projectRow = document.querySelector(".project-row");
document.querySelector(".slider-next").addEventListener("click", () => {
  projectRow.scrollBy({ left: 360, behavior: "smooth" });
});
document.querySelector(".slider-prev").addEventListener("click", () => {
  projectRow.scrollBy({ left: -360, behavior: "smooth" });
});

const projects = {
  blood: {
    title: "Blood Bank Management System",
    description: "A full-stack platform that streamlines blood donor management, secure authentication, recipient matching and operational analytics for faster decision-making.",
    tags: ["Python", "Flask", "PostgreSQL", "React"],
    art: "linear-gradient(135deg,#270607,#941019 75%,#dd1e29)"
  },
  fatigue: {
    title: "Cognitive Fatigue Detection",
    description: "An Android application using real-time typing-pattern analysis to identify cognitive fatigue and present performance trends through clear monitoring visuals.",
    tags: ["Java", "Firebase", "Android", "Data Analytics"],
    art: "radial-gradient(circle at 52% 50%,#2b3139,#12151a 45%,#090a0c)"
  },
  salesforce: {
    title: "Salesforce CRM Solutions",
    description: "CRM experience focused on automation, user management, data quality, reports and dashboards. Built to simplify business workflows and improve operational visibility.",
    tags: ["Salesforce", "CRM", "Flows", "Dashboards"],
    art: "linear-gradient(145deg,#082c4c,#0b72af 62%,#32aee8)"
  }
};

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    const project = projects[card.dataset.project];
    modal.querySelector(".modal-art").style.background = project.art;
    modal.querySelector("h2").textContent = project.title;
    modal.querySelector(".modal-description").textContent = project.description;
    modal.querySelector(".modal-tags").innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join("");
    modal.showModal();
  });
});

document.querySelector(".modal-close").addEventListener("click", () => modal.close());
modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.close();
});
