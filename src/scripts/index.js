import '../pages/index.css';
import {initialCards} from './cards.js';
import {createCard} from '../components/card.js';
import {openModal, closeModal, closeWithOverlay} from '../components/modal.js'

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

buttonCloseEditProfile.addEventListener('click', (evt) => closeModal(evt, popupEditProfile));
buttonCloseNewPlace.addEventListener('click', (evt) => closeModal(evt, popupNewCard));
buttonCloseViewImage.addEventListener('click', (evt) => closeModal(evt, popupViewImage));

popupEditProfile.addEventListener('click', (evt) => closeWithOverlay(evt, popupEditProfile));
popupNewCard.addEventListener('click', (evt) => closeWithOverlay(evt, popupNewCard));
popupViewImage.addEventListener('click', (evt) => closeWithOverlay(evt, popupViewImage));

formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);
formNewPlace.addEventListener('submit', handleNewCardFormSubmit);

buttonEdit.addEventListener('click', (evt) => openModal(evt, popupEditProfile));
buttonEdit.addEventListener('click', showDataInEditProfileModal);
buttonAdd.addEventListener('click', (evt) => openModal(evt, popupNewCard));

/*
** Функция-обработчик кнопки добавления новой карточки handleNewCardFormSubmit()
** Параметры: evt - объект эвент
*/
function handleNewCardFormSubmit(evt){
  evt.preventDefault();
  addCard();
  evt.currentTarget.reset();
  closeModal(evt, popupNewCard);
}

/*
** Функция-обработчик кнопки добавления новой карточки handleEditProfileFormSubmit()
** Параметры: evt - объект эвент
*/
function handleEditProfileFormSubmit(evt){
  evt.preventDefault();
  profileTitle.textContent = formEditProfile.elements.profile_name.value;
  profileDescription.textContent = formEditProfile.elements.description.value;
  closeModal(evt, popupEditProfile);
}

/*
** Функция-обработчик отображения информации профиля в форме showDataInEditProfileModal()
** Параметры: нет
*/
function showDataInEditProfileModal(){
  if(popupEditProfile.classList.contains('popup_is-opened'))
   showProfile(formEditProfile, profileTitle, profileDescription)
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
  openModal(evt, popupViewImage);
  showImage(imageViewImage, descriptionViewImage, evt.currentTarget);
}

/*
** Функция добавления новой карточки addCard()
** Параметры: нет
*/
function addCard(){
  const name = formNewPlace.elements.place_name.value;
  const link = formNewPlace.elements.link.value;
  cardList.prepend(createCard(cardTemplate, link, name, openImageModal));
}

/*
** Функция отображения информации профиля showProfile()
** Параметры: form - объект формы
**            profileTitle - имя профиля
**            profileDescription - описание профиля
*/
function showProfile(form, profileTitle, profileDescription){
  if(profileTitle.textContent !== '' || profileDescription.textContent !== ''){
    form.elements.profile_name.value = profileTitle.textContent;
    form.elements.description.value = profileDescription.textContent;
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