import forms from "./modules/forms";
import modals from "./modules/modal";
import sliders from "./modules/sliders";
window.addEventListener("DOMContentLoaded", () => {
  "use strict";
  // modals();
  sliders(".feedback-slider-item", "", ".main-prev-btn", ".main-next-btn");
  sliders(".main-slider-item", "vertical");
  forms();
});
