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
const profileDescription = document.querySelector('.profile__description');
const imageViewImage = popupViewImage.querySelector('.popup__image');
const descriptionViewImage = popupViewImage.querySelector('.popup__caption');
const inputNameProfile = formEditProfile.elements.profile_name;
const inputDescriptionProfile = formEditProfile.elements.description;
const inputNameCard = formNewPlace.elements.place_name;
const inputLinkCard = formNewPlace.elements.link;

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
buttonEdit.addEventListener('click', () => clearValidation(formEditProfile, {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}));
buttonAdd.addEventListener('click', () => openModal(popupNewCard));
buttonAdd.addEventListener('click', () => clearValidation(formNewPlace, {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}));

/*
** Функция-обработчик кнопки добавления новой карточки handleNewCardFormSubmit()
** Параметры: evt - объект эвент
*/
function handleNewCardFormSubmit(evt){
  evt.preventDefault();
  addCard(inputNameCard, inputLinkCard);
  evt.currentTarget.reset();
  clearValidation(formNewPlace, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
  closeModal(popupNewCard);
}

/*
** Функция-обработчик кнопки добавления новой карточки handleEditProfileFormSubmit()
** Параметры: evt - объект эвент
*/
function handleEditProfileFormSubmit(evt){
  evt.preventDefault();
  profileTitle.textContent = inputNameProfile.value;
  profileDescription.textContent = inputDescriptionProfile.value;
  clearValidation(formEditProfile, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  })
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
    cardList.append(createCard(cardTemplate, element.link, element.name, openImageModal));
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
function addCard(name, link){
  cardList.prepend(createCard(cardTemplate, link.value, name.value, openImageModal));
}

/*
** Функция отображения информации профиля showProfile()
** Параметры: form - объект формы
**            profileTitle - имя профиля
**            profileDescription - описание профиля
*/
function showProfile(inputNameProfile, inputDescriptionProfile, profileTitle, profileDescription){
  if(profileTitle.textContent !== '' || profileDescription.textContent !== ''){
    inputNameProfile.value = profileTitle.textContent;
    inputDescriptionProfile.value = profileDescription.textContent;
  }
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

showCards(initialCards);

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});