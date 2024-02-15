import '../pages/index.css';
import {initialCards} from './cards.js';
import {addCard, showCards} from '../components/card.js';
import {openModal} from '../components/modal.js'

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupViewImage = document.querySelector('.popup_type_image');
const popupEditProfile = document.querySelector('.popup_type_edit');
const profileObj = document.querySelector('.profile__info');
const editProfileForm = document.forms.edit_profile;
const newPlaceForm = document.forms.new_place;

editButton.addEventListener('click', (evt) => {openModal(evt, popupEditProfile, editProfileForm, handleFormSubmit, profileObj)});
addButton.addEventListener('click', (evt) => {openModal(evt, popupNewCard, newPlaceForm, handleFormSubmit)});

/*
** Функция обработчик submit-ов handleFormSubmit()
** Параметры: evt - объект эвент
*/
function handleFormSubmit(evt){
  evt.preventDefault();
  const openedModal = document.querySelector('.popup_is-opened');
  if(evt.target.name === 'edit_profile'){
    const profileTitle = profileObj.querySelector('.profile__title');
    const profileDescription = profileObj.querySelector('.profile__description');
    profileTitle.textContent = editProfileForm.elements.profile_name.value;
    profileDescription.textContent = editProfileForm.elements.description.value;
  }else if(evt.target.name === 'new_place'){
    addCard(cardTemplate, evt.target, cardList, openModal, popupViewImage);
  }
  openedModal.classList.remove('popup_is-opened');
  evt.target.removeEventListener('submit', handleFormSubmit);
}

showCards(cardTemplate, initialCards, cardList, openModal, popupViewImage);