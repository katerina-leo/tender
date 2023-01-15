
import { modalBody, modalElem } from "./elements.js";
import { showErrorMessage, showSuccessMessage } from "./util.js";

export const formSend = async (evt) => {
    evt.preventDefault();

    const formData = new FormData(form);

    if (form.checkValidity()) {
      modalBody.classList.add('modal__body--sending')

      let response = await fetch('/requests', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        showSuccessMessage();
        form.reset();
        modalBody.classList.remove('modal__body--sending');
        modalElem.classList.remove('modal--open');
      } else {
        showErrorMessage();
        modalBody.classList.remove('modal__body--sending');
      }
    }
    form.classList.add('form--validated')
  }
