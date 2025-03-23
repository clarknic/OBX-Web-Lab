/******/ (() => { // webpackBootstrap
/*!************************************!*\
  !*** ./src/blocks/contact/view.js ***!
  \************************************/
/**
 * Frontend JavaScript for Contact form handling
 */
document.addEventListener('DOMContentLoaded', () => {
  const contactForms = document.querySelectorAll('.obx-contact__form');
  contactForms.forEach(form => {
    form.addEventListener('submit', handleFormSubmit);
  });

  /**
   * Handle form submission
   * @param {Event} event 
   */
  function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const submitButton = form.querySelector('.obx-contact__form-submit');
    const successMessage = form.querySelector('.obx-contact__message--success');
    const errorMessage = form.querySelector('.obx-contact__message--error');

    // Hide previous messages
    if (successMessage) successMessage.style.display = 'none';
    if (errorMessage) errorMessage.style.display = 'none';

    // Disable submit button
    if (submitButton) submitButton.disabled = true;

    // Collect form data
    const formData = new FormData(form);
    formData.append('action', 'obx_contact_form');

    // Send AJAX request
    fetch(obxContact.ajaxUrl, {
      method: 'POST',
      body: formData,
      credentials: 'same-origin'
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then(data => {
      if (data.success) {
        if (successMessage) {
          successMessage.textContent = data.message;
          successMessage.style.display = 'block';
        }
        form.reset();
      } else {
        if (errorMessage) {
          errorMessage.textContent = data.message;
          errorMessage.style.display = 'block';
        }
      }
    }).catch(error => {
      if (errorMessage) {
        errorMessage.textContent = 'An unexpected error occurred. Please try again.';
        errorMessage.style.display = 'block';
      }
      console.error('Error:', error);
    }).finally(() => {
      // Re-enable submit button
      if (submitButton) submitButton.disabled = false;
    });
  }
});
/******/ })()
;
//# sourceMappingURL=view.js.map