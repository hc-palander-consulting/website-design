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
  // Desktop Elements
  const header = document.getElementById("header");
  // Fade Header on Scroll
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > scrollHeight) {
      header.classList.add("active");
    } else {
      header.classList.remove("active");
    }
  });
