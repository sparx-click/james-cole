function initButtonCharacterStagger() {
  const offsetIncrement = 0.01; // Transition offset increment in seconds
  const buttons = document.querySelectorAll("[data-button-animate-chars]");

  buttons.forEach((button) => {
    const text = button.textContent; // Get the button's text content
    button.innerHTML = ""; // Clear the original content

    [...text].forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.transitionDelay = `${index * offsetIncrement}s`;

      // Handle spaces explicitly
      if (char === " ") {
        span.style.whiteSpace = "pre"; // Preserve space width
      }

      button.appendChild(span);
    });
  });
}

function navShowInit() {
  const topTrigger = document.querySelector(".navbar_top-trigger");
  const bottomTrigger = document.querySelector("[nav-bottom-trigger]");
  const target = document.querySelector(".navbar_component");

  if (topTrigger && bottomTrigger && target) {
    gsap.set(target, { opacity: 0 });

    ScrollTrigger.create({
      trigger: topTrigger,
      start: "top top",
      onEnter: () => gsap.to(target, { opacity: 1, duration: 0.3 }),
      onLeaveBack: () => gsap.to(target, { opacity: 0, duration: 0.3 }),
    });

    ScrollTrigger.create({
      trigger: bottomTrigger,
      start: "top 80%",
      onEnter: () => gsap.to(target, { opacity: 0, duration: 0.3 }),
      onLeaveBack: () => gsap.to(target, { opacity: 1, duration: 0.3 }),
    });
  }
}

function navbarMenuBtnInit() {
  const menuOpenBtn = document.querySelector("[menu-open-btn]");
  const menuCloseBtn = document.querySelector("[menu-close-btn]");
  const menuContainer = document.querySelector("[menu-container]");
  const menuLinks = document.querySelectorAll("[menu-container] a");

  // Function to close menu (used multiple times)
  function closeMenu() {
    menuContainer.classList.remove("active");
    menuOpenBtn.setAttribute("aria-expanded", "false");
    menuContainer.setAttribute("aria-hidden", "true");
  }

  // Open menu button
  menuOpenBtn.addEventListener("click", () => {
    menuContainer.classList.add("active");
    menuOpenBtn.setAttribute("aria-expanded", "true");
    menuContainer.setAttribute("aria-hidden", "false");
  });

  // Close menu button
  menuCloseBtn.addEventListener("click", closeMenu);

  // Close when clicking menu links
  menuLinks.forEach((link) => link.addEventListener("click", closeMenu));

  // Close when clicking outside
  document.addEventListener("click", (event) => {
    const isActive = menuContainer.classList.contains("active");
    const isOutside = !menuContainer.contains(event.target) && !menuOpenBtn.contains(event.target);

    if (isActive && isOutside) {
      closeMenu();
    }
  });

  // Close menu when pressing Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuContainer.classList.contains("active")) {
      closeMenu();
    }
  });
}

function testimonialsSliderInit() {
  const swiper = new Swiper(".swiper", {
    // Optional parameters
    loop: true,

    // Add fade effect
    effect: "fade",
    fadeEffect: {
      crossFade: true, // This enables a smooth crossfade effect
    },

    // If we need pagination
    pagination: {
      el: ".testimonial_pagination",
      bulletActiveClass: "active", // Remove dot
      bulletClass: "testimonial_bullet", // Remove dot
    },

    // Navigation arrows
    navigation: {
      nextEl: ".testimonial_slider-btn.next",
      prevEl: ".testimonial_slider-btn.prev",
    },
  });
}

function initDynamicCurrentTime() {
  const defaultTimezone = "Europe/Amsterdam";

  // Helper function to format numbers with leading zero
  const formatNumber = (number) => number.toString().padStart(2, "0");

  // Function to create a time formatter with the correct timezone
  const createFormatter = (timezone) => {
    return new Intl.DateTimeFormat([], {
      timeZone: timezone,
      timeZoneName: "short",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Optional: Remove to match your simpler script
    });
  };

  // Function to parse the formatted string into parts
  const parseFormattedTime = (formattedDateTime) => {
    const match = formattedDateTime.match(/(\d+):(\d+):(\d+)\s*([\w+]+)/);
    if (match) {
      return {
        hours: match[1],
        minutes: match[2],
        seconds: match[3],
        timezone: match[4], // Handles both GMT+X and CET cases
      };
    }
    return null;
  };

  // Function to update the time for all elements
  const updateTime = () => {
    document.querySelectorAll("[data-current-time]").forEach((element) => {
      const timezone = element.getAttribute("data-current-time") || defaultTimezone;
      const formatter = createFormatter(timezone);
      const now = new Date();
      const formattedDateTime = formatter.format(now);

      const timeParts = parseFormattedTime(formattedDateTime);
      if (timeParts) {
        const { hours, minutes, seconds, timezone } = timeParts;

        // Update child elements if they exist
        const hoursElem = element.querySelector("[data-current-time-hours]");
        const minutesElem = element.querySelector("[data-current-time-minutes]");
        const secondsElem = element.querySelector("[data-current-time-seconds]");
        const timezoneElem = element.querySelector("[data-current-time-timezone]");

        if (hoursElem) hoursElem.textContent = hours;
        if (minutesElem) minutesElem.textContent = minutes;
        if (secondsElem) secondsElem.textContent = seconds;
        if (timezoneElem) timezoneElem.textContent = timezone;
      }
    });
  };

  // Initial update and interval for subsequent updates
  updateTime();
  setInterval(updateTime, 1000);
}

function footerYearUpdateinit() {
  const YEAR_SELECTOR = '[footer="year"]';
  const yearSpan = document.querySelector(YEAR_SELECTOR);
  if (!yearSpan) return;
  const currentYear = new Date().getFullYear();
  yearSpan.innerText = currentYear.toString();
}

function initScript() {
  initButtonCharacterStagger();
  navShowInit();
  navbarMenuBtnInit();
  testimonialsSliderInit();
  initDynamicCurrentTime();
  footerYearUpdateinit();
}
