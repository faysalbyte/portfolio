const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
    });
    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
        });
    });
}
const heroSlide = document.querySelector(".hero-slide");
const heroNext = document.querySelector(".hero-next");
const heroPrev = document.querySelector(".hero-prev");
let heroInterval;

function nextHero() {
    const items = heroSlide.querySelectorAll(".hero-item");
    heroSlide.appendChild(items[0]);
    restartHeroAnimation();
}

function prevHero() {
    const items = heroSlide.querySelectorAll(".hero-item");
    heroSlide.prepend(items[items.length - 1]);
    restartHeroAnimation();
}
function restartHeroAnimation() {
    const content = heroSlide.querySelectorAll(".hero-content");

    content.forEach(item => {
        item.style.animation = "none";
        item.offsetHeight;
        item.style.animation = "";
    });
}

function startHeroAutoSlide() {
    clearInterval(heroInterval);
    heroInterval = setInterval(() => {
        nextHero();
    }, 2000);
}
if (heroNext && heroPrev && heroSlide) {
    heroNext.addEventListener("click", () => {
        nextHero();
        startHeroAutoSlide();
    });
    heroPrev.addEventListener("click", () => {
        prevHero();
        startHeroAutoSlide();
    });
    startHeroAutoSlide();
}

const activityBoxes =
    document.querySelectorAll(".activity-box");
const activityBackground =
    document.querySelector(".activity-background");
const activityTitle =
    document.querySelector(".activity-title");
const activityText =
    document.querySelector(".activity-text");
const activityNumber =
    document.querySelector(".activity-number");
const activityNext =
    document.querySelector(".activity-next");
const activityPrev =
    document.querySelector(".activity-prev");

const activities = [

    {
        title: "Fire Safety, Emergency Response and Rescue Training and Drill Completion Certificate",
        text: "Fundamentals of Fire ,Responsibility of a Fire Fighter ,Electrical and Chemical Safety Principles, Use of Personal Protective Equipment (PPE), Operate Fire Fighting Equipment & Carry Out Fire Drills, Perform First Aid and Rescue Management",
        image: "./personal-img/Fire-Safety-Emergency-Response-and-Rescue-Training-and-Drill-Completion-Certificate.jpeg"
    },

    {
        title: "CCTV INSTALLATION, SERVICING & MAINTENANCE",
          image: "./personal-img/CCTV-INSTALLATION-SERVICING-&-MAINTENANCE.jpeg"
    },

    {
        title: "VDP Training- Armed",
          image: "./personal-img/vdp.jpeg"
    },

    {
        title: "LAPTOP MOTHERBOARD REPAIR & SERVICING",
        image: "./personal-img/LAPTOP-MOTHERBOARD-REPAIR-&-SERVICING.jpeg"
    },

    {
        title: "Fundamental Training on Self-Defense For Youths",
        image: "./personal-img/Fundamental-Training-on-Self-Defense-For-Youths.jpeg"
    },

    {
        title: "Entrepreneurship Development Training.",
         image: "./personal-img/Entrepreneurship-Development-Training.jpeg"
    }
];

let currentActivity = 0;
let activityInterval;

function updateActivity(index) {
    currentActivity = index;
    const activity = activities[currentActivity];
    activityBoxes.forEach(box => {
        box.classList.remove("active");
    });

    if (activityBoxes[currentActivity]) {
        activityBoxes[currentActivity].classList.add("active");
    }

    if (activityBackground) {
        activityBackground.style.backgroundImage =
            `url("${activity.image}")`;
    }

 if (activityTitle) {
        activityTitle.textContent = activity.title;
    }
    if (activityText) {
        activityText.textContent = activity.text;
    }
    if (activityNumber) {
        activityNumber.textContent =
            String(currentActivity + 1).padStart(2, "0");
    }
}

function nextActivity() {
    currentActivity =
        (currentActivity + 1) % activities.length;
    updateActivity(currentActivity);
    startActivityAutoSlide();
}

function prevActivity() {
    currentActivity =
        (currentActivity - 1 + activities.length) %
        activities.length;
    updateActivity(currentActivity);
    startActivityAutoSlide();
}

function startActivityAutoSlide() {
    clearInterval(activityInterval);
    activityInterval =
        setInterval(() => {
            currentActivity =
                (currentActivity + 1) %
                activities.length;
            updateActivity(currentActivity);
        }, 2500);
}
activityBoxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        updateActivity(index);
        startActivityAutoSlide();
    });
});
if (activityNext) {
    activityNext.addEventListener(
        "click",
        nextActivity
    );
}
if (activityPrev) {
    activityPrev.addEventListener(
        "click",
        prevActivity
    );
}

if (activityBoxes.length) {
    updateActivity(0);
    startActivityAutoSlide();
}
document.addEventListener(
    "visibilitychange",
    () => {
        if (document.hidden) {
            clearInterval(heroInterval);
            clearInterval(activityInterval);
        } else {
          startHeroAutoSlide();
            startActivityAutoSlide();
        }
    }
);

document.addEventListener("DOMContentLoaded", () => {
  const currentYearElements = document.querySelectorAll(
    "#year, [data-current-year]",
  );
  currentYearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMobileMenu = () => {
    if (!menuButton || !mobileMenu) {
      return;
    }
    menuButton.classList.remove("open");
    mobileMenu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
    mobileMenu.setAttribute("aria-hidden", "true");
  };
  const openMobileMenu = () => {
    if (!menuButton || !mobileMenu) {
      return;
    }
    menuButton.classList.add("open");
    mobileMenu.classList.add("open");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close navigation menu");
    mobileMenu.setAttribute("aria-hidden", "false");
  };
  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMobileMenu();
      });
    });
    document.addEventListener("click", (event) => {
      if (
        !mobileMenu.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        closeMobileMenu();
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMobileMenu();
        if (window.innerWidth <= 850 && menuButton.matches(":focus")) {
          menuButton.focus();
        }
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 850) {
        closeMobileMenu();
      }
    });
  }
  const softTouchLayer = document.getElementById("softTouchLayer");
  if (softTouchLayer) {
    let touchTimer;
    const showSoftColor = (x, y) => {
      softTouchLayer.style.left = `${x}px`;
      softTouchLayer.style.top = `${y}px`;
      softTouchLayer.classList.remove("active");
      void softTouchLayer.offsetWidth;
      softTouchLayer.classList.add("active");
      clearTimeout(touchTimer);
      touchTimer = setTimeout(() => {
        softTouchLayer.classList.remove("active");
      }, 1400);
    };
    document.addEventListener(
      "pointerdown",
      (event) => {
        showSoftColor(event.clientX, event.clientY);
      },
      {
        passive: true,
      },
    );
  }
  const reducedMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
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
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");
  if (!menuButton || !mobileMenu) {
    return;
  }

  const mobileLinks = mobileMenu.querySelectorAll("a");
  const setMenuState = (isOpen) => {
    menuButton.classList.toggle("open", isOpen);
    mobileMenu.classList.toggle("open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    mobileLinks.forEach((link) => {
      if (isOpen) {
        link.removeAttribute("tabindex");
      } else {
        link.setAttribute("tabindex", "-1");
      }
    });
  };

  setMenuState(false);
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const isOpen =
        menuButton.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        setMenuState(false);
        menuButton.focus();
      }
    }
  });
  document.addEventListener("click", (event) => {
    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";
    if (!isOpen) {
      return;
    }
    if (
      !menuButton.contains(event.target) &&
      !mobileMenu.contains(event.target)
    ) {
      setMenuState(false);
    }
  });
  const desktopMediaQuery = window.matchMedia("(min-width: 801px)");

  const handleDesktopChange = (event) => {
    if (event.matches) {
      setMenuState(false);
    }
  };
  desktopMediaQuery.addEventListener(
    "change",
    handleDesktopChange,
  );
});
