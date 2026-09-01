"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");

  const form = document.getElementById("contactForm");
  const submitButton = document.getElementById("submitButton");
  const formStatus = document.getElementById("formStatus");

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const currentYear = document.querySelector("[data-current-year]");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  if (menuButton && mobileMenu) {
    const menuLinks = mobileMenu.querySelectorAll("a");

    const openMenu = () => {
      menuButton.classList.add("open");
      menuButton.classList.add("active");

      mobileMenu.classList.add("open");

      menuButton.setAttribute("aria-expanded", "true");
      menuButton.setAttribute("aria-label", "Close navigation menu");

      document.body.classList.add("menu-open");
    };

    const closeMenu = () => {
      menuButton.classList.remove("open");
      menuButton.classList.remove("active");

      mobileMenu.classList.remove("open");

      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");

      document.body.classList.remove("menu-open");
    };

    menuButton.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.contains("open");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && mobileMenu.classList.contains("open")) {
        closeMenu();
        menuButton.focus();
      }
    });

    document.addEventListener(
      "pointerdown",
      (event) => {
        if (!mobileMenu.classList.contains("open")) {
          return;
        }

        if (
          !mobileMenu.contains(event.target) &&
          !menuButton.contains(event.target)
        ) {
          closeMenu();
        }
      },
      {
        passive: true,
      },
    );

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        closeMenu();
      }
    });
  }

  const fields = {
    name: {
      element: document.getElementById("name"),
      error: document.getElementById("nameError"),
      message: "Please enter your name.",
    },

    email: {
      element: document.getElementById("email"),
      error: document.getElementById("emailError"),
      message: "Please enter a valid email address.",
    },

    country: {
      element: document.getElementById("country"),
      error: document.getElementById("countryError"),
      message: "Please select your country.",
    },

    message: {
      element: document.getElementById("message"),
      error: document.getElementById("messageError"),
      message: "Please write at least 10 characters.",
    },
  };

  const getFieldWrapper = (element) => {
    return element ? element.closest(".field") : null;
  };

  const setError = (field, message) => {
    if (!field.element) {
      return;
    }

    const wrapper = getFieldWrapper(field.element);

    if (field.error) {
      field.error.textContent = message;
    }

    field.element.setAttribute("aria-invalid", "true");

    if (wrapper) {
      wrapper.classList.add("invalid");
    }
  };

  const clearError = (field) => {
    if (!field.element) {
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
    });

    field.element.addEventListener("change", () => {
      validateField(fieldName);
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

  const whatsappBox = document.getElementById("whatsappBox");

  const openWhatsApp = () => {
    window.open("https://wa.me/8801595530901", "_blank", "noopener,noreferrer");
  };

  if (whatsappBox) {
    whatsappBox.addEventListener("click", openWhatsApp);

    whatsappBox.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openWhatsApp();
      }
    });
  }

  if (form && submitButton) {
    form.addEventListener("submit", (event) => {
      let isValid = true;

      Object.keys(fields).forEach((fieldName) => {
        const valid = validateField(fieldName);

        if (!valid) {
          isValid = false;
        }
      });

      if (!isValid) {
        event.preventDefault();

        const firstInvalid = Object.values(fields).find(
          (field) =>
            field.element &&
            field.element.getAttribute("aria-invalid") === "true",
        );

        if (firstInvalid) {
          firstInvalid.element.focus();
        }

        if (formStatus) {
          formStatus.textContent = "Please correct the highlighted fields.";

          formStatus.className = "form-status error";
        }

        return;
      }

      submitButton.classList.add("loading");

      submitButton.setAttribute("aria-disabled", "true");
      submitButton.setAttribute("aria-label", "Sending message");

      if (formStatus) {
        formStatus.textContent = "Sending your message...";
        formStatus.className = "form-status sending";
      }
    });
  }

  if (form) {
    form.addEventListener("keydown", (event) => {
      if (
        event.key === "Enter" &&
        event.target.tagName === "INPUT" &&
        event.target.type !== "submit"
      ) {
        return;
      }
    });
  }
});
