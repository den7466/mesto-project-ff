import '../pages/index.css';
import {initialCards} from './cards.js';
import {createCard, addCard} from '../components/card.js';
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

function handleFormSubmit(evt){
  evt.preventDefault();
  const openedModal = document.querySelector('.popup_is-opened');
  if(evt.target.name === 'edit_profile'){
    const profileTitle = profileObj.querySelector('.profile__title');
    const profileDescription = profileObj.querySelector('.profile__description');
    profileTitle.textContent = editProfileForm.elements.profile_name.value;
    profileDescription.textContent = editProfileForm.elements.description.value;
  }else if(evt.target.name === 'new_place'){
    addCard(cardTemplate, evt.target, cardList, openModal);
  }
  openedModal.classList.remove('popup_is-opened');
  evt.target.removeEventListener('submit', handleFormSubmit);
}

function showCards(data){
  data.forEach(element => {
    cardList.append(createCard(cardTemplate, element.link, element.name, openModal, popupViewImage));
  });
}

showCards(initialCards);