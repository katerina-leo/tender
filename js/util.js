

export const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
export const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

//шаблон сообщения при успешной отправке формы
export const createSuccessTemplate = () =>{
  const successMessageElement = successMessageTemplate.cloneNode(true);
  return successMessageElement;
};

//шаблон сообщения об отправке формы с ошибкой
export const createErrorTemplate = () =>{
  const errorMessageElement = errorMessageTemplate.cloneNode(true);
  return errorMessageElement;
};

//удаляет сообщение об успешной отправке кнопкой esk
export const onSuccessPopupEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    document.querySelector('.success').remove();//удаляет сообщение
    document.removeEventListener('keydown', onSuccessPopupEscKeydown);//удаляет слушатель
  }
};

//показ сообщения об успешной отправке
export const showSuccessMessage = (createMessageTemplate) => {
  const template = createMessageTemplate();
  document.body.appendChild(template);

  document.querySelector('.success').addEventListener('click', (evt) => {
    evt.preventDefault();
    document.querySelector('.success').remove();
    document.removeEventListener('keydown', onSuccessPopupEscKeydown);//удаляет слушатель
  });
  document.addEventListener('keydown', onSuccessPopupEscKeydown);
};

//удаляет сообщение об отправке с ошибкой кнопкой esk
export const onErrorPopupEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    document.querySelector('.error').remove();
    document.removeEventListener('keydown', onErrorPopupEscKeydown);
  }
};

//показ сообщения об  отправке с ошибкой
export const showErrorMessage = (createErrorTemplate) => {
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
