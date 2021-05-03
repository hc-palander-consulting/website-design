function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

docReady(function() {

  // VARIABLES
  // Common Vars
  const scrollHeight = 100;
  // Mobile Elements
  const toggles = document.querySelectorAll(".toggle");
  const menuButton = document.getElementById("menu-button");
  const mobileNav = document.getElementById("mobile-navigation");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLanguage = document.getElementById("mobile-language");
  // Desktop Elements
  const header = document.getElementById("header");
  const menu = document.getElementById("menu");
  const language = document.getElementById("language");
  // Device Sizes
  const smallDevices = "screen and (max-width: 320px)";
  const mediumDevices = "screen and (min-width: 321px) and (max-width: 767px)";
  const largeDevices = "screen and (min-width: 768px) and (max-width: 991px)";
  const extraLargeDevices = "screen and (min-width: 992px) and (max-width: 1199px)";
  const highDefDevices = "screen and (min-width: 1200px)";

  // FUNCTIONS
  // Show/Hide functions
  const show = element => element.classList.remove("hidden");
  const hide = element => element.classList.add("hidden");
  const visible = element => element.classList.remove("invisible");
  const invisible = element => element.classList.add("invisible");

  // Move Elements from one container to another
  const moveItems = (initial_container, target_container) => {
    const elements = Array.from(initial_container.children);
    elements.forEach(element => target_container.appendChild(element));
  }

  // Fade Header on Scroll
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > scrollHeight) {
      header.classList.add("active");
    } else {
      header.classList.remove("active");
    }
  });

  // Toggle Mobile Navigation
  toggles.forEach(button =>
    button.addEventListener("click", () => {
      // If mobile navigation is hidden and the menu button is visible
      if (mobileNav.classList.contains("hidden") && !menuButton.classList.contains("hidden")) {
        // 1. Move Menu Items into the Mobile Navigation
        moveItems(menu, mobileMenu);
        moveItems(language, mobileLanguage);
        // 2. Show Mobile Navigation
        show(mobileNav);
      } else {
        // 1. Move Menu Items into the Desktop Navigation
        moveItems(mobileMenu, menu);
        moveItems(mobileLanguage, language);
        // 2. Toggle menu visibility
        collapseMenu();
        // 3. Hide Mobile Navigation
        hide(mobileNav);
      }
    })
  );

  // Toggle Menu and Language visibility
  const collapseMenu = () => {
    // 1. Get Current Menu Height
    //const menuHeight = menu.getBoundingClientRect().height;
    const menuHeightRounded = menu.offsetHeight;

    // 2. Calculate Initial Menu Height
    const body = document.querySelector("body");
    const docFontSize = window.getComputedStyle(body).getPropertyValue('font-size');
    const fontSize = parseFloat(docFontSize);
    const minMenuHeight = fontSize * 3.75; // minimum header height = 3.75rem or 60px when font is 16px
    const minMenuHeightRounded = Math.round(minMenuHeight) + 1; // add 1 px extra to be safe because the browser gives a slightly different height

    // 3. Hide menu and language if menu is taller than it's initial height and it's not hidden, show menu button instead
    if (menuHeightRounded > minMenuHeightRounded || menuHeightRounded === 0) {
      //
      invisible(menu);
      invisible(language);
      // Show Menu Button
      show(menuButton);

    } else {
      //
      visible(menu);
      visible(language);
      // Hide Menu Button
      hide(menuButton);
    }
  }

  // Add/Remove Event Listeners for Toggle Menu and Language visibility on window resize
  const addCollapseMenuListener = () => {
    window.addEventListener("resize", collapseMenu, true);
  }
  const removeCollapseMenuListener = () => {
    window.removeEventListener("resize", collapseMenu, true);
  }

  // Media Queries
  enquire.register(smallDevices, function () {
    // Hide Menu and Language containers
    hide(menu);
    hide(language);
    // Show Menu Button
    show(menuButton);
  });

  enquire.register(mediumDevices, function () {
    // Hide Menu and Language containers
    hide(menu);
    hide(language);
    // Show Menu Button
    show(menuButton);
  });

  enquire.register(largeDevices, function () {
    // Hide Menu and Language containers
    hide(menu);
    hide(language);
    // Show Menu Button
    show(menuButton);
  });

  enquire.register(extraLargeDevices, function () {
    removeCollapseMenuListener();
    // Show Menu and Language containers
    show(menu);
    show(language);
    // Check if the Menu can fit in the Navigation container and make visible
    collapseMenu();
  });

  enquire.register(highDefDevices, function () {
    addCollapseMenuListener();
    // Show Menu and Language containers
    show(menu);
    show(language);
    // Check if the Menu can fit in the Navigation container and make visible
    collapseMenu();
  });
});




