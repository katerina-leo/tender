
    const modalElem = document.querySelector('.modal');

    const btnClose = document.querySelector('.modal__close');
    const time = 10000000;
    const tariffButtons = document.querySelectorAll('.tariff__button');
    const formRequest = document.querySelector('.form--request');
    const modalContainer = document.querySelector('.modal__container')
    console.log(modalContainer)


  //   modalElem.style.cssText = `
  //   display: flex;
  //   visibility: hidden;
  //   opacity: 0;
  //   transition: opacity ${time}ms ease-in-out;
  // `;


const toggleMenu = () => {
  const navMain = document.querySelector('.main-nav');
  const navToggle = document.querySelector('.main-nav__toggle');

  navMain.classList.remove('main-nav--no-js');

  navToggle.addEventListener('click', () => {
    if (navMain.classList.contains('main-nav--closed')) {
      navMain.classList.remove('main-nav--closed');
      navMain.classList.add('main-nav--opened');
    } else {
      navMain.classList.add('main-nav--closed');
      navMain.classList.remove('main-nav--opened');
    }
  });

}



//  const closeModal = (e) => {
//     const target = e.target;

//     if (
//         target === modalElem ||
//         (btnClose && target.closest(btnClose)) ||
//         e.code === 'Escape' ||
//         e.type === 'submit'
//         ) {

//         modalElem.style.opacity = '0';

//         setTimeout(() => {
//         modalElem.style.visibility = 'hidden';
//         // data.handlerCloseModal(modalElem);
//         }, time);

//             // window.removeEventListener('keydown', data.closeModal);
//           }
//         }

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

formRequest.addEventListener('submit', (evt) => {
    evt.preventDefault();
    fetch('https://639333d911ed187986ae657a.mockapi.io/order', {
      method: 'post',
      // body: JSON.stringify(data),
    }).then(response => response.json())
      .then(response => {
        // clearCart();

        modalContainer.innerHTML = `
        <h2>Вы отправили заявку</h2>
        <h3>С вами в ближайшее время свяжется наш менеджер</h3>
        `
      });
  })

const init = () => {
  toggleMenu();
}

init();
