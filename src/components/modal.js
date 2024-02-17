/*
** Функция открытия модального окна openModal()
** Параметры: evt - объект эвент
**            modal - объект модального окна
*/
function openModal(modal){
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeWithEsc);
}

/*
** Функция закрытия модального окна closeModal()
** Параметры: evt - объект эвент
**            modal - объект модального окна
*/
function closeModal(modal){
  document.removeEventListener('keydown', closeWithEsc);
  modal.classList.remove('popup_is-opened');
}

/*
** Функция закрытия модального окна по нажатию на оверлей closeWithOverlay()
** Параметры: evt - объект эвент
**            modal - объект модального окна
*/
function closeWithOverlay(evt, modal){
  if(evt.target.classList.contains('popup'))
    closeModal(modal);
}

/*
** Функция закрытия модального окна по нажатию на Escape closeWithEsc()
** Параметры: evt - объект эвент
**            modal - объект модального окна
*/
function closeWithEsc(evt){
  if(evt.key === 'Escape'){
    const openedModal = document.querySelector('.popup_is-opened');
    closeModal(openedModal);
  }
}

export {openModal, closeModal, closeWithOverlay};