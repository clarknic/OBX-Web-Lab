/******/ (() => { // webpackBootstrap
/*!**************************************!*\
  !*** ./src/blocks/portfolio/view.js ***!
  \**************************************/
document.addEventListener('DOMContentLoaded', function () {
  const projectItems = document.querySelectorAll('.obx-portfolio__project-item');
  const projectContents = document.querySelectorAll('.obx-portfolio__project-content');
  projectItems.forEach(item => {
    item.addEventListener('click', function () {
      const index = this.getAttribute('data-project-index');

      // Remove active class from all items
      projectItems.forEach(pi => pi.classList.remove('active'));
      projectContents.forEach(pc => pc.classList.remove('active'));

      // Add active class to clicked item and corresponding content
      this.classList.add('active');
      document.querySelector(`.obx-portfolio__project-content[data-project-index="${index}"]`).classList.add('active');
    });
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map