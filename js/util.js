

const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');


const createSuccessTemplate = () =>{
  const successMessageElement = successMessageTemplate.cloneNode(true);
  return successMessageElement;
};


const createErrorTemplate = () =>{
  const errorMessageElement = errorMessageTemplate.cloneNode(true);
  return errorMessageElement;
};


const onSuccessPopupEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    document.querySelector('.success').remove();
    document.removeEventListener('keydown', onSuccessPopupEscKeydown);
  }
};


export const showSuccessMessage = () => {
  const template = createSuccessTemplate();
  document.body.appendChild(template);

  document.querySelector('.success').addEventListener('click', (evt) => {
    evt.preventDefault();
    document.querySelector('.success').remove();
    document.removeEventListener('keydown', onSuccessPopupEscKeydown);
  });
  document.addEventListener('keydown', onSuccessPopupEscKeydown);
};


const onErrorPopupEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    document.querySelector('.error').remove();
    document.removeEventListener('keydown', onErrorPopupEscKeydown);
  }
};


export const showErrorMessage = () => {
  const template = createErrorTemplate();
  document.body.appendChild(template);
  const errorButton = document.querySelector('.error__button');

  errorButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    document.querySelector('.error').remove();
    document.removeEventListener('keydown', onErrorPopupEscKeydown);
  });

  document.querySelector('.error').addEventListener('click', (evt) => {
    evt.preventDefault();
    const errorElement = document.querySelector('.error');
    if (errorElement) {
      errorElement.remove();
      document.removeEventListener('keydown', onErrorPopupEscKeydown);
    }
  })}
