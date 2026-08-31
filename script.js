const typing = document.getElementById("typing");

const words = [
  "INDUSTRIAL CERTIFIED MERN STACK DEVELOPER",
  "WEB DESIGN & WEB DEVELOPMENT FOR FREELANCING TRAINER",
  "National Skills Development Authority (NSDA) Level-3 & Level-5 CERTIFIED WEB DESIGN & WEB DEVELOPER FOR FREELANCING",
  "National Skills Development Authority (NSDA) Level-4 ANDROID APP DEVELOPMENT WITH KOTLIN",
  "National Skills Development Authority (NSDA) Level-3 & Level-4 DIGITAL MARKETING FOR FREELANCING (SEO)",
  "SEO EXPERT..",
  "Full STACK WEB DEVELOPER..",
  "Frontend Developer..",
  "Backend Developer..",
  "CMS DEVELOPER..",
  "CMS EXPERT..",
  "Shopify EXPERT..",
  "eCOMMERCE DEVELOPER..",
  "WordPress DEVELOPER..",
  "Webflow DEVELOPER..",
  "Wix DEVELOPER..",
  "Squarespace DEVELOPER..",
  "Certified Software Quality Assurance National Skills Development Authority (NSDA) Level-3",
  "Certified Software Quality Assurance",
  "Knowledge UI/UX..",
  "Knowledge DevOps ..",
];

const colors = [
  "#00E5FF",

  "#FF6B35",

  "#A855F7",

  "#22C55E",

  "#FACC15",

  "#FF2D55",

  "#3B82F6",

  "#06B6D4",

  "#F97316",

  "#8B5CF6",

  "#EC4899",

  "#14B8A6",

  "#EF4444",

  "#D946EF",
];

let wordIndex = 0;

let characterIndex = 0;

let deleting = false;

function typeWriter() {
  if (!typing) {
    return;
  }

  const word = words[wordIndex];

  const color = colors[wordIndex];

  typing.style.color = color;

  typing.style.textShadow = `
        0 0 8px ${color}66,
        0 0 20px ${color}33
    `;

  if (!deleting) {
    characterIndex++;

    typing.textContent = word.substring(0, characterIndex);

    if (characterIndex >= word.length) {
      deleting = true;

      setTimeout(typeWriter, 1800);

      return;
    }

    setTimeout(typeWriter, 70);

    return;
  }


  characterIndex--;

  typing.textContent = word.substring(0, characterIndex);

  if (characterIndex <= 0) {
    deleting = false;

    wordIndex = (wordIndex + 1) % words.length;

    setTimeout(typeWriter, 350);

    return;
  }

  setTimeout(typeWriter, 35);
}

typeWriter();
const portrait = document.getElementById("portrait");

if (portrait) {
  const firstImage = portrait.querySelector(".image-first");

  const secondImage = portrait.querySelector(".image-second");

  const particles = document.getElementById("particles");

  let showingSecond = false;

  let animationRunning = false;

  let returnTimer = null;

  function createParticles() {
    if (!particles) {
      return;
    }

    particles.innerHTML = "";

    const isMobile = window.innerWidth <= 600;

    const particleCount = isMobile ? 30 : 55;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("span");

      particle.className = "particle";

      const x = (Math.random() - 0.5) * (isMobile ? 300 : 480);

      const y = (Math.random() - 0.5) * (isMobile ? 400 : 620);

      const size = Math.random() * 5 + 2;

      particle.style.width = `${size}px`;

      particle.style.height = `${size}px`;

      particle.style.left = `${Math.random() * 100}%`;

      particle.style.top = `${Math.random() * 100}%`;

      particle.style.setProperty("--x", `${x}px`);

      particle.style.setProperty("--y", `${y}px`);

      particle.style.animationDelay = `${Math.random() * 0.25}s`;

      particles.appendChild(particle);
    }
  }


  function burnToSecond() {
    if (animationRunning || showingSecond) {
      return;
    }

    animationRunning = true;

    clearTimeout(returnTimer);

    createParticles();

    portrait.classList.add("burning");

    setTimeout(() => {
      if (firstImage) {
        firstImage.style.opacity = "0";
      }

      if (secondImage) {
        secondImage.style.opacity = "1";
      }

      showingSecond = true;
    }, 650);

    setTimeout(() => {
      portrait.classList.remove("burning");

      if (particles) {
        particles.innerHTML = "";
      }

      animationRunning = false;
    }, 1300);



    returnTimer = setTimeout(() => {
      burnToFirst();
    }, 3000);
  }

  /* =========================
       BURN TO FIRST
    ========================== */

  function burnToFirst() {
    if (animationRunning || !showingSecond) {
      return;
    }

    animationRunning = true;

    createParticles();

    portrait.classList.add("burning");

    setTimeout(() => {
      if (secondImage) {
        secondImage.style.opacity = "0";
      }

      if (firstImage) {
        firstImage.style.opacity = "1";
      }

      showingSecond = false;
    }, 650);

    setTimeout(() => {
      portrait.classList.remove("burning");

      if (particles) {
        particles.innerHTML = "";
      }

      animationRunning = false;
    }, 1300);
  }

  /* =========================
       ACTIVATE
    ========================== */

  function activatePortrait(event) {
    if (event) {
      event.preventDefault();
    }

    /*
     * Don't restart while
     * already showing second.
     */

    if (showingSecond) {
      return;
    }

    burnToSecond();
  }

  /* =========================
       DESKTOP
    ========================== */

  portrait.addEventListener("mouseenter", activatePortrait);

  /* =========================
       MOBILE TOUCH
    ========================== */

  portrait.addEventListener("touchstart", activatePortrait, {
    passive: false,
  });

  /* =========================
       KEYBOARD
    ========================== */

  portrait.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      activatePortrait(event);
    }
  });
}

/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton = document.getElementById("menuButton");

const mobileMenu = document.getElementById("mobileMenu");

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);
  });

  /*
   * Close menu after
   * clicking a link.
   */

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");

      menuButton.setAttribute("aria-expanded", "false");
    });
  });

  /*
   * Close when clicking
   * outside the menu.
   */

  document.addEventListener("click", (event) => {
    if (
      !mobileMenu.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      mobileMenu.classList.remove("open");

      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

/* =====================================================
   DESKTOP MOUSE PARALLAX
===================================================== */

/*
 * IMPORTANT:
 *
 * We do NOT use deviceorientation.
 *
 * We also don't directly overwrite
 * portraitScene.style.transform.
 *
 * Instead, CSS variables are used.
 *
 * This means mobile CSS remains
 * responsive.
 */

const background = document.querySelector(".background");

const portraitScene = document.querySelector(".portrait-scene");

let targetX = 0;

let targetY = 0;

let currentX = 0;

let currentY = 0;

/*
 * Only activate mouse parallax
 * on devices with a real mouse.
 */

const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");

if (canHover.matches && portraitScene) {
  window.addEventListener(
    "mousemove",
    (event) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 20;

      targetY = (event.clientY / window.innerHeight - 0.5) * 20;
    },
    {
      passive: true,
    },
  );

  function pageMotion() {
    currentX += (targetX - currentX) * 0.04;

    currentY += (targetY - currentY) * 0.04;

    /*
     * Background movement
     */

    if (background) {
      background.style.transform = `translate3d(
                    ${currentX * 0.2}px,
                    ${currentY * 0.2}px,
                    0
                )`;
    }

    /*
     * Portrait movement.
     *
     * CSS handles the actual
     * transform.
     */

    portraitScene.style.setProperty("--move-x", `${currentX * 0.04}px`);

    portraitScene.style.setProperty("--move-y", `${currentY * 0.04}px`);

    requestAnimationFrame(pageMotion);
  }

  pageMotion();
}

/* =====================================================
   RESIZE HANDLING
===================================================== */

window.addEventListener(
  "resize",
  () => {
    /*
     * Close mobile menu when
     * switching to desktop.
     */

    if (window.innerWidth > 800 && mobileMenu && menuButton) {
      mobileMenu.classList.remove("open");

      menuButton.setAttribute("aria-expanded", "false");
    }
  },
  {
    passive: true,
  },
);
