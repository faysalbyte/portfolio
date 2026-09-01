"use strict";

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

  const form = document.getElementById("contactForm");
  const submitButton = document.getElementById("submitButton");
  const formStatus = document.getElementById("formStatus");

  const fields = {
    name: {
      element: document.getElementById("name"),
      error: document.getElementById("nameError"),
    },

    email: {
      element: document.getElementById("email"),
      error: document.getElementById("emailError"),
    },

    country: {
      element: document.getElementById("country"),
      error: document.getElementById("countryError"),
    },

    message: {
      element: document.getElementById("message"),
      error: document.getElementById("messageError"),
    },
  };

  const getFieldWrapper = (element) => {
    if (!element) {
      return null;
    }

    return (
      element.closest(".form-row") ||
      element.closest(".field") ||
      element.parentElement
    );
  };

  const setError = (field, message) => {
    if (!field || !field.element) {
      return;
    }

    const wrapper = getFieldWrapper(field.element);

    if (field.error) {
      field.error.textContent = message;
    }

    field.element.setAttribute("aria-invalid", "true");

    if (field.error) {
      field.element.setAttribute("aria-describedby", field.error.id);
    }

    if (wrapper) {
      wrapper.classList.add("invalid");
    }
  };

  const clearError = (field) => {
    if (!field || !field.element) {
      return;
    }

    const wrapper = getFieldWrapper(field.element);

    if (field.error) {
      field.error.textContent = "";
    }

    field.element.removeAttribute("aria-invalid");

    if (wrapper) {
      wrapper.classList.remove("invalid");
    }
  };

  const validateField = (fieldName) => {
    const field = fields[fieldName];

    if (!field || !field.element) {
      return true;
    }

    const value = field.element.value.trim();

    if (fieldName === "name") {
      if (value.length < 2) {
        setError(field, "Please enter your name.");

        return false;
      }
    }

    if (fieldName === "email") {
      if (value.length === 0 || !field.element.validity.valid) {
        setError(field, "Please enter a valid email address.");

        return false;
      }
    }

    if (fieldName === "country") {
      if (!value) {
        setError(field, "Please select your country.");

        return false;
      }
    }

    if (fieldName === "message") {
      if (value.length < 10) {
        setError(field, "Please write at least 10 characters.");

        return false;
      }
    }

    clearError(field);

    return true;
  };

  Object.keys(fields).forEach((fieldName) => {
    const field = fields[fieldName];

    if (!field.element) {
      return;
    }

    field.element.addEventListener("blur", () => {
      validateField(fieldName);
    });

    field.element.addEventListener("input", () => {
      if (field.element.value.trim()) {
        clearError(field);
      }
      updateTypingPlaceholderForField(field.element);
    });

    field.element.addEventListener("change", () => {
      validateField(fieldName);
      updateTypingPlaceholderForField(field.element);
    });
  });
  const updateTypingPlaceholder = (input, placeholder) => {
    if (!input || !placeholder) {
      return;
    }

    const update = () => {
      const hasValue = input.value.length > 0;

      placeholder.classList.toggle("hidden", hasValue);
    };

    input.addEventListener("input", update);
    input.addEventListener("focus", update);
    input.addEventListener("blur", update);

    update();
  };

  const updateTypingPlaceholderForField = (input) => {
    if (!input) {
      return;
    }

    let placeholder = null;

    if (input.id === "name") {
      placeholder = document.querySelector(".name-placeholder");
    }

    if (input.id === "subject") {
      placeholder = document.querySelector(".subject-placeholder");
    }

    if (input.id === "message") {
      placeholder = document.querySelector(".message-placeholder");
    }

    if (placeholder) {
      placeholder.classList.toggle("hidden", input.value.length > 0);
    }
  };

  updateTypingPlaceholder(
    document.getElementById("name"),
    document.querySelector(".name-placeholder"),
  );

  updateTypingPlaceholder(
    document.getElementById("subject"),
    document.querySelector(".subject-placeholder"),
  );

  updateTypingPlaceholder(
    document.getElementById("message"),
    document.querySelector(".message-placeholder"),
  );

  const whatsapp = document.getElementById("whatsapp");

  if (whatsapp) {
    whatsapp.addEventListener("input", () => {
      whatsapp.value = whatsapp.value.replace(/[^\d+\s()-]/g, "");
    });
  }

  const whatsappBox = document.getElementById("whatsappBox");

  const openWhatsApp = () => {
    window.open("https://wa.me/8801595530901", "_blank", "noopener,noreferrer");
  };

  if (whatsappBox) {
    if (whatsappBox.tagName !== "A" && whatsappBox.tagName !== "BUTTON") {
      whatsappBox.setAttribute("role", "link");
      whatsappBox.setAttribute("tabindex", "0");
    }

    whatsappBox.addEventListener("click", openWhatsApp);

    whatsappBox.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openWhatsApp();
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

  if (form && submitButton) {
    form.addEventListener("submit", (event) => {
      let isValid = true;
      let firstInvalid = null;

      Object.keys(fields).forEach((fieldName) => {
        const valid = validateField(fieldName);

        if (!valid) {
          isValid = false;

          if (!firstInvalid) {
            firstInvalid = fields[fieldName].element;
          }
        }
      });

      if (!isValid) {
        event.preventDefault();

        if (firstInvalid) {
          firstInvalid.focus({
            preventScroll: false,
          });
        }

        if (formStatus) {
          formStatus.textContent = "Please correct the highlighted fields.";

          formStatus.className = "form-status error";

          formStatus.setAttribute("role", "alert");
        }

        return;
      }

      submitButton.classList.add("loading");

      submitButton.setAttribute("aria-disabled", "true");

      submitButton.setAttribute("aria-label", "Sending message");

      if (formStatus) {
        formStatus.textContent = "Sending your message...";

        formStatus.className = "form-status sending";

        formStatus.setAttribute("role", "status");
      }
    });
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
