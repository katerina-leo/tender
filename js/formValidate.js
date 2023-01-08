import { EMAIL_REGEXP,PHONE_REGEXP } from "./const.js";


export const formAddError = (input) => {
    input.classList.add('form__input--error')
  };
export const formRemoveError = (input) => {
    input.classList.remove('form__input--error')
};


export const emailTest = (input) => {
    return EMAIL_REGEXP.test(input.value);
}

export const validatePhone = (PHONE_REGEXP, input) => {
    return PHONE_REGEXP.test(input);
}


export const formValidate = (form) => {
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

          } else if (input.classList.contains('form__input--phone')) {
            if(!validatePhone(PHONE_REGEXP, input.value)) {
            formAddError(input);
            error++;

            }
          }

          else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
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
