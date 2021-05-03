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
  const menuButton = document.getElementById("menu-button");
  // Desktop Elements
  const header = document.getElementById("header");
  const menu = document.getElementById("menu");
  const language = document.getElementById("language");

  // FUNCTIONS
  // Show/Hide functions
  const show = element => element.classList.remove("hidden");
  const hide = element => element.classList.add("hidden");
  const visible = element => element.classList.remove("invisible");
  const invisible = element => element.classList.add("invisible");

  // Fade Header on Scroll
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > scrollHeight) {
      header.classList.add("active");
    } else {
      header.classList.remove("active");
    }
  });

  // Toggle Menu and Language visibility
  const toggleMenuVisibility = () => {
    // 1. Get Current Menu Height
    //const menuHeight = menu.getBoundingClientRect().height;
    const menuHeightRounded = menu.offsetHeight;

    // 2. Calculate Initial Menu Height
    const docFontSize = window.getComputedStyle(body).getPropertyValue('font-size');
    const fontSize = parseFloat(docFontSize);
    const minMenuHeight = fontSize * 3.75; // initial header height is 3.75rem or 60px when font is 16px
    const minMenuHeightRounded = Math.round(minMenuHeight) + 1; // add 1 px because the browser calculates slightly differently

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

});
