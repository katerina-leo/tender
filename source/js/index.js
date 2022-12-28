

import { toggleMenu } from "./toggleMenu.js";
import { modalElem, tariffButtons, formRequest, modalContainer, modalSuccess, modalBody } from "./elements.js";


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');


  const formAddError = (input) => {
    input.classList.add('form__input--error')
  };

  const formRemoveError = (input) => {
    input.classList.remove('form__input--error')
  };


  const emailTest = (input) => {
    return !/^\w([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }

  const formValidate = (form) => {
    let error = 0;
    let formReq = document.querySelectorAll('.form__input--req');

      for(let i = 0; i < formReq.length; i++) {
        const input = formReq[i];
        formRemoveError(input);

        if(input.classList.contains('form__input--email')) {
          if(emailTest(input)) {
            formAddError(input);
            error++;

            }
          } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
            formAddError(input);
            error++;
          } else {
            if(input.value === '') {
              formAddError(input);
              error++;
            }
          }
        }

      return error;
  }


  const formSend = async (evt) => {
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
        let result = await response.json();
        alert(result.message);
        form.reset();
        modalBody.classList.remove('modal__body--sending');
      } else {
        alert('Ошибка')
        modalBody.classList.remove('modal__body--sending');
      }
    } else {
      alert("Заполните обязательные поля");
    }
  }

  form.addEventListener('submit', formSend);
});

// const setForm = () => {
//     formRequest.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//       fetch('https://639333d911ed187986ae657a.mockapi.io/order', {
//         method: 'post',
//         // body: JSON.stringify(data),
//       }).then(response => response.json())
//         .then(response => {
//           showSuccessMessage();

//         })
//         .catch((error) => {
//           modalContainer.innerHTML = `
//             <h2>Не удалось </h2>

//             `
//         });

//     })
// }


const init = () => {
  toggleMenu();

  tariffButtons.forEach((tariffButton) => {
    tariffButton.addEventListener('click', () => {
      modalElem.classList.add('modal--open')}
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

}

init();
