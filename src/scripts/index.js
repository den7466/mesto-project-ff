import '../pages/index.css';
import {initialCards} from './cards.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupViewImage = document.querySelector('.popup_type_image');
const popupEditProfile = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfileForm = document.forms.edit_profile;
const newPlaceForm = document.forms.new_place;

// popUp
function initButton(button, action, f, modal){
  button.addEventListener(action, (evt) => {f(evt, modal)});
}

initButton(editButton, 'click', openModal, popupEditProfile);
initButton(addButton, 'click', openModal, popupNewCard);

// editButton.addEventListener('click', (evt) => {openModal(evt, popupEditProfile)});
// addButton.addEventListener('click', (evt) => {openModal(evt, popupNewCard)});


function editProfile(){
  if(profileTitle.textContent !== '' || profileDescription.textContent !== ''){
    editProfileForm.elements.name.value = profileTitle.textContent;
    editProfileForm.elements.description.value = profileDescription.textContent;
  }
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = editProfileForm.elements.name.value;
  profileDescription.textContent = editProfileForm.elements.description.value;
  this.classList.remove('popup_is-opened');
  this.removeEventListener('submit', handleFormSubmit);
}

function showImage(evt, modal){
  // console.log(evt, modal);
  const imagePopup = modal.querySelector('.popup__image');
  const descriptionPopup = modal.querySelector('.popup__caption');
  const image = evt.querySelector('.card__image');
  const description = evt.querySelector('.card__title');
  imagePopup.src = image.src;
  imagePopup.alt = image.alt;
  descriptionPopup.textContent = description.textContent;
}

function openModal(evt, modal){
  modal.classList.add('popup_is-opened');
  bindCloseModal(modal);
  if(modal.classList.contains('popup_type_edit')){
    editProfile();
    modal.addEventListener('submit', handleFormSubmit);
  }else if(modal.classList.contains('popup_type_new-card')){
    modal.addEventListener('submit', createCard);
  }else if(modal.classList.contains('popup_type_image')){
    showImage(evt, modal)
  };
}

function bindCloseModal(modal){
  const button = modal.querySelector('.popup__close');
  function closeModal(evt){
    if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup') || evt.key === 'Escape'){
      modal.classList.remove('popup_is-opened');
      button.removeEventListener('click', closeModal);
      document.removeEventListener('click', closeModal);
      document.removeEventListener('keydown', closeModal);
    }
  }
  button.addEventListener('click', closeModal);
  document.addEventListener('click', closeModal);
  document.addEventListener('keydown', closeModal);
}

function createCard(evt){
  evt.preventDefault();
  let name = newPlaceForm.elements.place_name.value,
      link = newPlaceForm.elements.link.value;
  cardList.prepend(addCard(link, name, delCard, likeCard, openModal));
  newPlaceForm.reset();
  this.classList.remove('popup_is-opened');
  this.removeEventListener('submit', createCard);
}

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(link, name, delCard, likeCard, openModal){
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = name;
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => delCard(cardElement));
    cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
    cardImage.addEventListener('click', () => {openModal(cardElement, popupViewImage)});
    return cardElement;
}

function likeCard(){
  this.classList.toggle('card__like-button_is-active');
}

// @todo: Функция удаления карточки
function delCard(cardItem){
  cardItem.remove();
}

// @todo: Вывести карточки на страницу
function showCards(data){
  data.forEach(element => {
    cardList.append(addCard(element.link, element.name, delCard, likeCard, openModal));
  });
}


showCards(initialCards);