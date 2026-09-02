"use strict";

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

const closeMobileMenu = () => {
  if (!menuButton || !mobileMenu) return;
  menuButton.classList.remove("open");
  mobileMenu.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation menu");
  mobileMenu.setAttribute("aria-hidden", "true");
};

const openMobileMenu = () => {
  if (!menuButton || !mobileMenu) return;
  menuButton.classList.add("open");
  mobileMenu.classList.add("open");
  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Close navigation menu");
  mobileMenu.setAttribute("aria-hidden", "false");
};

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", function(e) {
    e.stopPropagation();
    const isOpen = mobileMenu.classList.contains("open");
    isOpen ? closeMobileMenu() : openMobileMenu();
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function(e) {
      closeMobileMenu();
    });
  });

  document.addEventListener("click", function(e) {
    if (!mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
      closeMobileMenu();
    }
  });

  window.addEventListener("resize", function() {
    if (window.innerWidth > 850) {
      closeMobileMenu();
    }
  });
}

const videos = document.querySelectorAll(".project-video");
const videoObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.15 }
);

videos.forEach((video) => {
  videoObserver.observe(video);
  video.addEventListener("mouseenter", () => {
    video.play().catch(() => {});
  });
  video.addEventListener("mouseleave", () => {
    if (!video.closest(".card")?.matches(":hover")) {
      video.pause();
    }
  });
  video.addEventListener("touchstart", () => {
    video.play().catch(() => {});
  }, { passive: true });
});

const carouselTracks = document.querySelectorAll(".carousel-track");
carouselTracks.forEach((track) => {
  const originalCards = Array.from(track.children);
  if (!originalCards.length) return;
  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clone.querySelectorAll("a, button").forEach((el) => el.setAttribute("tabindex", "-1"));
    track.appendChild(clone);
  });
});

const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
let lastFocusedElement = null;

const projectData = {
  "vanilla-01": {
    title: "Modern Landing Page",
    description: "A clean responsive landing page created with semantic HTML and raw CSS. The project focuses on typography, spacing, responsive behavior and modern visual details.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=85"
  },
  "vanilla-02": {
    title: "Glass Interface",
    description: "A lightweight interface built without external UI frameworks. The design combines responsive CSS layouts with modern visual hierarchy.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=85"
  },
  "vanilla-03": {
    title: "Portfolio UI",
    description: "A personal portfolio interface designed around accessibility, readability, responsive layouts and reusable components.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85"
  },
  "vanilla-04": {
    title: "Responsive Dashboard",
    description: "A responsive dashboard concept with reusable cards, content hierarchy and device-friendly spacing.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=85"
  },
  "bootstrap-01": {
    title: "Business Website",
    description: "A professional business website using Bootstrap's responsive grid, utilities and component system.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85"
  },
  "bootstrap-02": {
    title: "Admin Panel",
    description: "A dashboard concept developed with Bootstrap components and a responsive grid system for different screen sizes.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85"
  },
  "tailwind-01": {
    title: "SaaS Landing Page",
    description: "A modern SaaS landing page using Tailwind utility classes to create a flexible responsive visual system.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=85"
  },
  "tailwind-02": {
    title: "Creative Agency",
    description: "A creative agency concept focused on strong visual hierarchy, responsive cards and utility-first styling.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=85"
  },
  "javascript-01": {
    title: "Interactive App",
    description: "A native JavaScript project demonstrating DOM manipulation, user interactions and dynamic interface behavior.",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=85"
  },
  "javascript-02": {
    title: "Dynamic Dashboard",
    description: "An interactive dashboard concept using JavaScript for dynamic interface behavior and API-oriented architecture.",
    image: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=85"
  },
  "gsap-01": {
    title: "Motion Experience",
    description: "A motion-focused interface combining CSS effects with GSAP-powered animation sequences.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85"
  },
  "gsap-02": {
    title: "Animated Portfolio",
    description: "An immersive portfolio concept featuring smooth transitions, motion choreography and responsive visual interactions.",
    image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?auto=format&fit=crop&w=1200&q=85"
  }
};

function openModal(projectId, trigger) {
  const project = projectData[projectId];
  if (!project || !modal || !modalTitle || !modalBody) return;
  lastFocusedElement = trigger || document.activeElement;
  modalTitle.textContent = project.title;
  modalBody.innerHTML = `
    <div class="modal-feature"><p>${project.description}</p></div>
    <img src="${project.image}" alt="${project.title} project preview" loading="lazy">
    <div class="modal-feature"><p>This project focuses on responsive design, accessibility, readability, maintainable structure and a user-friendly experience across modern devices.</p></div>
  `;
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modal.querySelector(".project-modal").scrollTop = 0;
  requestAnimationFrame(() => modalClose?.focus());
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

document.addEventListener("click", (event) => {
  const btn = event.target.closest(".details-button");
  if (!btn) return;
  event.preventDefault();
  openModal(btn.dataset.modal, btn);
});

modalClose?.addEventListener("click", closeModal);
modal?.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal?.classList.contains("active")) closeModal();
});

modal?.addEventListener("keydown", (event) => {
  if (event.key !== "Tab") return;
  const focusable = modal.querySelectorAll(
    'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

if (typeof gsap !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.from(".portfolio-hero .eyebrow", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: "power3.out"
  });
  gsap.from(".portfolio-hero h1", {
    opacity: 0,
    y: 35,
    duration: 1,
    delay: 0.15,
    ease: "power3.out"
  });
  gsap.from(".portfolio-hero p", {
    opacity: 0,
    y: 25,
    duration: 0.8,
    delay: 0.3,
    ease: "power3.out"
  });
  gsap.utils.toArray(".section-heading").forEach((section) => {
    gsap.from(section, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: undefined
    });
  });
}

document.addEventListener("DOMContentLoaded", function() {
  const yearElements = document.querySelectorAll("#year, [data-current-year]");
  yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const handleReducedMotion = () => {
    if (reducedMotionQuery.matches) {
      document.documentElement.classList.add("reduce-motion");
    } else {
      document.documentElement.classList.remove("reduce-motion");
    }
  };
  handleReducedMotion();
  if (reducedMotionQuery.addEventListener) {
    reducedMotionQuery.addEventListener("change", handleReducedMotion);
  }
});