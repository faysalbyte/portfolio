(function () {
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
    "#566574",
    "#6b7280",
    "#64748b",
    "#5f6b78",
    "#6b7280",
    "#596572",
    "#5b6875",
    "#607080",
    "#65717e",
    "#5f6b78",
    "#697582",
    "#5e6b78",
    "#66727e",
    "#5b6875",
  ];
  let wordIndex = 0,
    charIndex = 0,
    deleting = false;
  function typeWriter() {
    if (!typing) return;
    const word = words[wordIndex],
      color = colors[wordIndex % colors.length];
    typing.style.color = color;
    if (!deleting) {
      charIndex++;
      typing.textContent = word.substring(0, charIndex);
      if (charIndex >= word.length) {
        deleting = true;
        setTimeout(typeWriter, 1800);
        return;
      }
      setTimeout(typeWriter, 70);
      return;
    }
    charIndex--;
    typing.textContent = word.substring(0, charIndex);
    if (charIndex <= 0) {
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
    const first = portrait.querySelector(".image-first"),
      second = portrait.querySelector(".image-second");
    const particles = document.getElementById("particles");
    let showingSecond = false,
      animRunning = false,
      returnTimer = null;
    function createParticles() {
      if (!particles) return;
      particles.innerHTML = "";
      const isMobile = window.innerWidth <= 600;
      const count = isMobile ? 30 : 55;
      for (let i = 0; i < count; i++) {
        const p = document.createElement("span");
        p.className = "particle";
        const x = (Math.random() - 0.5) * (isMobile ? 300 : 480),
          y = (Math.random() - 0.5) * (isMobile ? 400 : 620);
        const size = Math.random() * 5 + 2;
        p.style.width = size + "px";
        p.style.height = size + "px";
        p.style.left = Math.random() * 100 + "%";
        p.style.top = Math.random() * 100 + "%";
        p.style.setProperty("--x", x + "px");
        p.style.setProperty("--y", y + "px");
        p.style.animationDelay = Math.random() * 0.25 + "s";
        particles.appendChild(p);
      }
    }
    function burnToSecond() {
      if (animRunning || showingSecond) return;
      animRunning = true;
      clearTimeout(returnTimer);
      createParticles();
      portrait.classList.add("burning");
      setTimeout(() => {
        if (first) first.style.opacity = "0";
        if (second) second.style.opacity = "1";
        showingSecond = true;
      }, 650);
      setTimeout(() => {
        portrait.classList.remove("burning");
        if (particles) particles.innerHTML = "";
        animRunning = false;
      }, 1300);
      returnTimer = setTimeout(() => {
        burnToFirst();
      }, 3000);
    }
    function burnToFirst() {
      if (animRunning || !showingSecond) return;
      animRunning = true;
      createParticles();
      portrait.classList.add("burning");
      setTimeout(() => {
        if (second) second.style.opacity = "0";
        if (first) first.style.opacity = "1";
        showingSecond = false;
      }, 650);
      setTimeout(() => {
        portrait.classList.remove("burning");
        if (particles) particles.innerHTML = "";
        animRunning = false;
      }, 1300);
    }
    function activatePortrait(e) {
      if (e) e.preventDefault();
      if (showingSecond) return;
      burnToSecond();
    }
    portrait.addEventListener("mouseenter", activatePortrait);
    portrait.addEventListener("touchstart", activatePortrait, {
      passive: false,
    });
    portrait.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") activatePortrait(e);
    });
  }
  const menuBtn = document.getElementById("menuButton"),
    mobileMenu = document.getElementById("mobileMenu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
      menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu",
      );
    });
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open navigation menu");
      });
    });
    document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        mobileMenu.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open navigation menu");
      }
    });
  }
  const bg = document.querySelector(".background"),
    scene = document.querySelector(".portrait-scene");
  let targetX = 0,
    targetY = 0,
    curX = 0,
    curY = 0;
  const canHover = window.matchMedia("(hover:hover) and (pointer:fine)");
  if (canHover.matches && scene) {
    window.addEventListener(
      "mousemove",
      (e) => {
        targetX = (e.clientX / window.innerWidth - 0.5) * 20;
        targetY = (e.clientY / window.innerHeight - 0.5) * 20;
      },
      { passive: true },
    );
    function pageMotion() {
      curX += (targetX - curX) * 0.04;
      curY += (targetY - curY) * 0.04;
      if (bg)
        bg.style.transform = `translate3d(${curX * 0.2}px,${curY * 0.2}px,0)`;
      scene.style.setProperty("--move-x", curX * 0.04 + "px");
      scene.style.setProperty("--move-y", curY * 0.04 + "px");
      requestAnimationFrame(pageMotion);
    }
    pageMotion();
  }

  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth > 800 && mobileMenu && menuBtn) {
        mobileMenu.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open navigation menu");
      }
    },
    { passive: true },
  );
})();
