
import { toggleMenu } from "./toggleMenu.js";
import { modalElem, tariffButtons, form,request } from "./elements.js";
import { formSend } from "./formSend.js";




// document.addEventListener('DOMContentLoaded', () => {
// });

// const setForm = () => {
//     formRequest.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//       fetch('https://639333d911ed187986ae657a.mockapi.io/order', {
//         method: 'post',
//       }).then(response => response.json())
//         .then(response => {
//           showSuccessMessage();

//         })
//         .catch((error) => {
//           modalContainer.innerHTML = `
//             <h2>Не удалось</h2>

//             `
//         });

//     })
// }


const phoneInput = document.querySelector(".form__input--phone");
    const maskOptions = {
      mask: '+{7}(000)000-00-00'
    };
  const mask = IMask(phoneInput, maskOptions);

const init = () => {
  toggleMenu();

  tariffButtons.forEach((tariffButton) => {
    tariffButton.addEventListener('click', () => {
      modalElem.classList.add('modal--open')
      request.value = tariffButton.dataset.order;
    }

    )
  })

  modalElem.addEventListener('click', (event) => {
    const target = event.target;

    if(target.closest('.modal__close')
      || target === modalElem || event.code === 'Escape' ||
          event.type === 'submit') {
      modalElem.classList.remove('modal--open')
    }
  })

form.addEventListener('submit', formSend);
}

init();
