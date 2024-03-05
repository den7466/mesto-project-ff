import '../pages/index.css';
import {initialCards} from './cards.js';
import {createCard} from '../components/card.js';
import {openModal, closeModal, closeWithOverlay} from '../components/modal.js';
import {clearValidation, enableValidation} from '../components/validation.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupViewImage = document.querySelector('.popup_type_image');
const popupEditProfile = document.querySelector('.popup_type_edit');
const formEditProfile = document.forms.edit_profile;
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close');
const formNewPlace = document.forms.new_place;
const buttonCloseNewPlace = popupNewCard.querySelector('.popup__close');
const buttonCloseViewImage = popupViewImage.querySelector('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileImage = document.querySelector('.profile__image');
const profileDescription = document.querySelector('.profile__description');
const imageViewImage = popupViewImage.querySelector('.popup__image');
const descriptionViewImage = popupViewImage.querySelector('.popup__caption');
const inputNameProfile = formEditProfile.elements.profile_name;
const inputDescriptionProfile = formEditProfile.elements.description;
const inputNameCard = formNewPlace.elements.place_name;
const inputLinkCard = formNewPlace.elements.link;
let userId = '';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

buttonCloseEditProfile.addEventListener('click', () => closeModal(popupEditProfile));
buttonCloseNewPlace.addEventListener('click', () => closeModal(popupNewCard));
buttonCloseViewImage.addEventListener('click', () => closeModal(popupViewImage));

popupEditProfile.addEventListener('click', (evt) => closeWithOverlay(evt, popupEditProfile));
popupNewCard.addEventListener('click', (evt) => closeWithOverlay(evt, popupNewCard));
popupViewImage.addEventListener('click', (evt) => closeWithOverlay(evt, popupViewImage));

formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);
formNewPlace.addEventListener('submit', handleNewCardFormSubmit);

buttonEdit.addEventListener('click', () => openModal(popupEditProfile));
buttonEdit.addEventListener('click', showDataInEditProfileModal);
buttonEdit.addEventListener('click', () => clearValidation(formEditProfile, validationConfig));
buttonAdd.addEventListener('click', () => openModal(popupNewCard));
buttonAdd.addEventListener('click', () => clearValidation(formNewPlace, validationConfig));

/*
** Функция-обработчик кнопки добавления новой карточки handleNewCardFormSubmit()
** Параметры: evt - объект эвент
*/
function handleNewCardFormSubmit(evt){
  evt.preventDefault();
  const data = {};
  data.name = inputNameCard.value;
  data.link = inputLinkCard.value;
  postNewCard(autorizationConfig, data);
  //createCard(cardTemplate, link.value, name.value, openImageModal)
  //addCard(inputNameCard, inputLinkCard);
  evt.currentTarget.reset();
  clearValidation(formNewPlace, validationConfig);
  closeModal(popupNewCard);
}

/*
** Функция-обработчик кнопки добавления новой карточки handleEditProfileFormSubmit()
** Параметры: evt - объект эвент
*/
function handleEditProfileFormSubmit(evt){
  evt.preventDefault();
  const data = {};
  data.name = inputNameProfile.value;
  data.about = inputDescriptionProfile.value;
  updateDataProfile(autorizationConfig, data);
  clearValidation(formEditProfile, validationConfig)
  closeModal(popupEditProfile);
}

/*
** Функция-обработчик отображения информации профиля в форме showDataInEditProfileModal()
** Параметры: нет
*/
function showDataInEditProfileModal(){
  if(popupEditProfile.classList.contains('popup_is-opened'))
   showProfile(inputNameProfile, inputDescriptionProfile, profileTitle, profileDescription)
}

/*
** Функция отображения карточек из объекта данных showCards()
** Параметры: data - объект данных карточек
*/
function showCards(data){
  data.forEach(element => {
    cardList.append(createCard(cardTemplate, element.link, element.name, openImageModal, element.likes.length, userId, element.owner._id));
  });
}

/*
** Функция-обработчик отображения изображения в модальном окне openImageModal()
** Параметры: evt - объект эвент
*/
function openImageModal(evt){
  openModal(popupViewImage);
  showImage(imageViewImage, descriptionViewImage, evt.currentTarget);
}

/*
** Функция добавления новой карточки addCard()
** Параметры: нет
*/
function addCard(name, link, likes){
  cardList.prepend(createCard(cardTemplate, link, name, openImageModal, likes));
}

/*
** Функция отображения информации профиля showProfile()
** Параметры: form - объект формы
**            profileTitle - имя профиля
**            profileDescription - описание профиля
*/
function showProfile(inputNameProfile, inputDescriptionProfile, profileTitle, profileDescription){
  inputNameProfile.value = profileTitle.textContent;
  inputDescriptionProfile.value = profileDescription.textContent;
}

/*
** Функция отображения изображения showImage()
** Параметры: imagePopup - объект изображения модального окна изображения
**            descriptionPopup - объект описания модального окна изображения
**            imageTarget - объект изображения из обработчика
*/
function showImage(imagePopup, descriptionPopup, imageTarget){
  imagePopup.src = imageTarget.src;
  imagePopup.alt = imageTarget.alt;
  descriptionPopup.textContent = imageTarget.alt;
}

enableValidation(validationConfig);



// API
const autorizationConfig = {
  token: '4beae149-dbca-4748-9357-2aff8b55b5f4',
  cohort: 'wff-cohort-8',
  url: 'https://nomoreparties.co/v1'
};

function getDataProfile(autorizationConfig){
  return fetch(`${autorizationConfig.url}/${autorizationConfig.cohort}/users/me`, {
    headers: {
      authorization: autorizationConfig.token
    }
  })
}

function getDataCards(autorizationConfig){
  return fetch(`${autorizationConfig.url}/${autorizationConfig.cohort}/cards`, {
    headers: {
      authorization: autorizationConfig.token
    }
  })
}

function initialDataProfile(){
  getDataProfile(autorizationConfig)
  .then((res) => {if(res.ok) return res.json()})
  .then((data) => {
    console.log(data);
    insertDataProfile(data);
  })
  .catch((err) => console.log('Что-то пошло не так: '+err));
}

function initialDataCards(){
  getDataCards(autorizationConfig)
  .then((res) => {if(res.ok) return res.json()})
  .then((data) => {
    console.log(data);
    showCards(data);
  })
  .catch((err) => console.log('Что-то пошло не так: '+err));
}

function updateDataProfile(autorizationConfig, data){
  fetch(`${autorizationConfig.url}/${autorizationConfig.cohort}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: autorizationConfig.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })
  .then((res) => {if(res.ok) return res.json()})
  .then((data) => insertDataProfile(data))
  .catch((err) => console.log('Что-то пошло не так: '+err));

}

function insertDataProfile(data){
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  profileImage.style.backgroundImage = `url(${data.avatar})`;
  userId = data._id;
}

function postNewCard(autorizationConfig, data){
  fetch(`${autorizationConfig.url}/${autorizationConfig.cohort}/cards`, {
    method: 'POST',
    headers: {
      authorization: autorizationConfig.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  })
  .then((res) => {if(res.ok) return res.json()})
  .then((data) => {
    addCard(data.name, data.link, data.likes.length);
    console.log(data);
  })
  .catch((err) => console.log('Что-то пошло не так: '+err));
}

initialDataProfile();

initialDataCards();



// https://kartinki.pics/pics/uploads/posts/2022-07/1657156698_3-kartinkin-net-p-yenot-art-v-ochkakh-i-kofte-krasivo-3.jpg
// https://kartinki.pics/pics/2320-enot-art-v-ochkah-i-kofte.html