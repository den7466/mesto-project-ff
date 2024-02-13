function openModal(evt, modal, form, handleFormSubmit, profile){
  modal.classList.add('popup_is-opened');
  modal.addEventListener('click', closeModal);
  document.addEventListener('keydown', closeModal);
  if(modal.classList.contains('popup_type_image')){
    showImage(evt, modal);
  }else{
    form.addEventListener('submit', handleFormSubmit);
  }
  if(modal.classList.contains('popup_type_edit')){
    showProfile(form, profile);
  }
}

function closeModal(evt){
  if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup') || evt.key === 'Escape'){
    const openedModal = document.querySelector('.popup_is-opened');
    openedModal.classList.remove('popup_is-opened');
    this.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', closeModal);
  }
}

function showProfile(form, profile){
  const profileTitle = profile.querySelector('.profile__title');
  const profileDescription = profile.querySelector('.profile__description');
  if(profileTitle.textContent !== '' || profileDescription.textContent !== ''){
    form.elements.profile_name.value = profileTitle.textContent;
    form.elements.description.value = profileDescription.textContent;
  }
}

function showImage(evt, modal){
    const imagePopup = modal.querySelector('.popup__image');
    const descriptionPopup = modal.querySelector('.popup__caption');
    imagePopup.src = evt.currentTarget.src;
    imagePopup.alt = evt.currentTarget.alt;
    descriptionPopup.textContent = evt.currentTarget.alt;
  }

export {openModal};