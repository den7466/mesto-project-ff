/*
** Функция открытия модального окна openModal()
** Параметры: evt - объект эвент
**            modal - объект модального окна
*/
function openModal(evt, modal){
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', (evt) => closeWithEsc(evt, modal));
}

/*
** Функция закрытия модального окна closeModal()
** Параметры: evt - объект эвент
**            modal - объект модального окна
*/
function closeModal(evt, modal){
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
    closeModal(evt, modal);
}

/*
** Функция закрытия модального окна по нажатию на Escape closeWithEsc()
** Параметры: evt - объект эвент
**            modal - объект модального окна
*/
function closeWithEsc(evt, modal){
  if(evt.key === 'Escape')
    closeModal(evt, modal);
}

export {openModal, closeModal, closeWithOverlay};