import { formValidate } from "./formValidate.js";
import { modalBody } from "./elements.js";
import { showErrorMessage, showSuccessMessage } from "./util.js";


export const formSend = async (evt) => {
    evt.preventDefault();

    let error = formValidate(form);

    const formData = new FormData(form);



    if(error === 0) {
      modalBody.classList.add('modal__body--sending')

      let response = await fetch('https://tender.tenke.ru/requests', {
        method: 'POST',
        body: formData
      });
      if(response.ok) {
        await response.json();
        showSuccessMessage();
        form.reset();
        modalBody.classList.remove('modal__body--sending');
      } else {
        showErrorMessage()
        modalBody.classList.remove('modal__body--sending');
      }
    } else {
      showErrorMessage();
    }
  }
