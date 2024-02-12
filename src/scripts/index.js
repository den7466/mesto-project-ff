import '../pages/index.css';
import {initialCards} from './cards.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const viewAvatar = document.querySelector('.profile__image');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupViewAvatar = document.querySelector('.popup_type_image');
const popupEditProfile = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupInputName = popupEditProfile.querySelector('.popup__input_type_name');
const popupInputDescription = popupEditProfile.querySelector('.popup__input_type_description');


function editProfile(){
  if(profileTitle.textContent !== '' || profileDescription.textContent !== ''){
    popupInputName.value = profileTitle.textContent;
    popupInputDescription.value = profileDescription.textContent;
  }
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileDescription.textContent = popupInputDescription.value;
  this.classList.remove('popup_is-opened');
  this.removeEventListener('submit', handleFormSubmit);
}

function openModal(button, modal){
  button.addEventListener('click', () => {
    modal.classList.add('popup_is-opened');
    bindCloseModal(modal);
    if(modal.classList.contains('popup_type_edit'))
      editProfile();
      modal.addEventListener('submit', handleFormSubmit);
  });
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

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(link, name, delCard){
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = name;
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => delCard(cardElement));
    return cardElement;
}

// @todo: Функция удаления карточки
function delCard(cardItem){
  cardItem.remove();
}

// @todo: Вывести карточки на страницу
function showCards(data){
  data.forEach(element => {
    cardList.append(addCard(element.link, element.name, delCard));
  });
}

openModal(addButton, popupNewCard);
openModal(editButton, popupEditProfile);
openModal(viewAvatar, popupViewAvatar);

showCards(initialCards);