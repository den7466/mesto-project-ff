import '../pages/index.css';
import {createCard, removeCard} from '../components/card.js';
import {openModal, closeModal, closeWithOverlay} from '../components/modal.js';
import {clearValidation, enableValidation} from '../components/validation.js';
import {getDataProfile, getDataCards, updateDataProfile, postCard, deleteCard, addLike, delLike, updateDataAvatar} from '../components/api.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupViewImage = document.querySelector('.popup_type_image');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupConfirmDelCard = document.querySelector('.popup_type_del-card');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const buttonCloseEditAvatar = popupEditAvatar.querySelector('.popup__close');
const buttonEditAvatar = document. querySelector('.profile__image');
const buttonCloseDelCard = popupConfirmDelCard.querySelector('.popup__close');
const formEditAvatar = document.forms.edit_avatar;
const formConfirmDelCard = document.forms.del_card;
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
const inputLinkAvatar = formEditAvatar.elements.link;
const buttonEditProfileSubmit = popupEditProfile.querySelector('.popup__button');
const buttonNewCardSubmit = popupNewCard.querySelector('.popup__button');
const buttonEditAvatarSubmit = popupEditAvatar.querySelector('.popup__button');
const buttonDeleteCardSubmit = popupConfirmDelCard.querySelector('.popup__button');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
const autorizationConfig = {
  token: '4beae149-dbca-4748-9357-2aff8b55b5f4',
  cohort: 'wff-cohort-8',
  baseUrl: 'https://nomoreparties.co/v1/'
};
const isLikedCards = [];
let userId = '',
    cardIdDel = '',
    cardItemDel = '';

buttonCloseEditProfile.addEventListener('click', () => closeModal(popupEditProfile));
buttonCloseNewPlace.addEventListener('click', () => closeModal(popupNewCard));
buttonCloseViewImage.addEventListener('click', () => closeModal(popupViewImage));
buttonCloseDelCard.addEventListener('click', () => closeModal(popupConfirmDelCard));
buttonCloseEditAvatar.addEventListener('click', () => closeModal(popupEditAvatar));

popupEditProfile.addEventListener('click', (evt) => closeWithOverlay(evt, popupEditProfile));
popupNewCard.addEventListener('click', (evt) => closeWithOverlay(evt, popupNewCard));
popupViewImage.addEventListener('click', (evt) => closeWithOverlay(evt, popupViewImage));
popupConfirmDelCard.addEventListener('click', (evt) => closeWithOverlay(evt, popupConfirmDelCard));
popupEditAvatar.addEventListener('click', (evt) => closeWithOverlay(evt, popupEditAvatar));

formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);
formNewPlace.addEventListener('submit', handleNewCardFormSubmit);
formConfirmDelCard.addEventListener('submit', (evt) => handleDeleteCardFormSubmit(evt));
formEditAvatar.addEventListener('submit', handleEditAvatarFormSubmit);

buttonEdit.addEventListener('click', () => openModal(popupEditProfile));
buttonEdit.addEventListener('click', showDataInEditProfileModal);
buttonEdit.addEventListener('click', () => clearValidation(formEditProfile, validationConfig));
buttonAdd.addEventListener('click', () => openModal(popupNewCard));
buttonAdd.addEventListener('click', () => clearValidation(formNewPlace, validationConfig));
buttonEditAvatar.addEventListener('click', () => openModal(popupEditAvatar));
buttonEditAvatar.addEventListener('click', () => clearValidation(formEditAvatar, validationConfig));

/*
** Функция-обработчик кнопки добавления новой карточки handleNewCardFormSubmit()
** Параметры: evt - объект эвент
*/
function handleNewCardFormSubmit(evt){
  evt.preventDefault();
  const form = evt.currentTarget;
  dataLoading(buttonNewCardSubmit, true);
  const data = {};
  data.name = inputNameCard.value;
  data.link = inputLinkCard.value;
  postCard(autorizationConfig, '/cards', data)
  .then((data) => {
    addCard(data);
    clearValidation(formNewPlace, validationConfig);
    closeModal(popupNewCard);
    form.reset();
  })
  .catch((err) => console.log(err))
  .finally(() => dataLoading(buttonNewCardSubmit, false));
}

/*
** Функция-обработчик кнопки обновления информации профиля handleEditProfileFormSubmit()
** Параметры: evt - объект эвент
*/
function handleEditProfileFormSubmit(evt){
  evt.preventDefault();
  const form = evt.currentTarget;
  dataLoading(buttonEditProfileSubmit, true);
  const data = {};
  data.name = inputNameProfile.value;
  data.about = inputDescriptionProfile.value;
  updateDataProfile(autorizationConfig, '/users/me', data)
  .then((data) => {
    insertDataProfile(data);
    clearValidation(formEditProfile, validationConfig);
    closeModal(popupEditProfile);
    form.reset();
  })
  .catch((err) => console.log(err))
  .finally(() => dataLoading(buttonEditProfileSubmit, false));
}

/*
** Функция-обработчик кнопки обновления аватара handleEditAvatarFormSubmit()
** Параметры: evt - объект эвент
*/
function handleEditAvatarFormSubmit(evt){
  evt.preventDefault();
  const form = evt.currentTarget;
  dataLoading(buttonEditAvatarSubmit, true);
  const data = {};
  data.avatar = inputLinkAvatar.value;
  updateDataAvatar(autorizationConfig, '/users/me/avatar', data)
  .then((data) => {
    profileImage.style.backgroundImage = `url(${data.avatar})`;
    clearValidation(formEditAvatar, validationConfig);
    closeModal(popupEditAvatar);
    form.reset();
  })
  .catch((err) => console.log(err))
  .finally(() => dataLoading(buttonEditAvatarSubmit, false));
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
** Функция вставки карточек из объекта данных в разметку insertDataCards()
** Параметры: data - объект данных карточек
*/
function insertDataCards(data){
  data.forEach(element => {
    cardList.append(createCard(cardTemplate, element.link, element.name, element.likes, userId, element.owner._id, element._id, openImageModal, openDeleteConfirmModal, handleToggleLike));
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
** Функция добавления новой карточки в разметку addCard()
** Параметры: data - объект данных карточек
*/
function addCard(data){
  cardList.prepend(createCard(cardTemplate, data.link, data.name, data.likes, userId, data.owner._id, data._id, openImageModal, openDeleteConfirmModal, handleToggleLike));
}

/*
** Функция отображения информации профиля showProfile()
** Параметры: inputNameProfile - поле ввода имени
**            inputDescriptionProfile - поле ввода описания
**            profileTitle - елемент отображения имени в разметке
**            profileDescription - елемент отображения описания в разметке
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

/*
** Функция-обработчик удаления карточки с сервера handleDeleteCardFormSubmit()
** Параметры: evt - объект эвент
*/
function handleDeleteCardFormSubmit(evt){
  evt.preventDefault();
  const form = evt.currentTarget;
  dataDeliteLoading(buttonDeleteCardSubmit, true);
  deleteCard(autorizationConfig, '/cards/', cardIdDel)
  .then(() => {
    closeModal(popupConfirmDelCard);
    removeCard(cardItemDel);
  })
  .catch((err) => console.log(err))
  .finally(() => dataDeliteLoading(buttonDeleteCardSubmit, false));
}

/*
** Функция открытия модального окна для удаления карточки openDeleteConfirmModal()
** Параметры: id - id карточки
**            item - элемент карточки
*/
function openDeleteConfirmModal(id, item){
  cardIdDel = id;
  cardItemDel = item;
  openModal(popupConfirmDelCard);
}

/*
** Функция инициализации данных initData()
** Параметры: нет
*/
function initData(){
  Promise.all([getDataProfile(autorizationConfig, '/users/me'), getDataCards(autorizationConfig, '/cards')])
  .then(([resDataProfile, resDataCards]) => {
    insertDataProfile(resDataProfile);
    insertDataCards(resDataCards);
  })
  .catch((err) => console.log(err));
}

/*
** Функция вставки данных профиля в разметку insertDataProfile()
** Параметры: data
*/
function insertDataProfile(data){
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  profileImage.style.backgroundImage = `url(${data.avatar})`;
  userId = data._id;
}

/*
** Функция-обработчик добавления лайка handleAddLike()
** Параметры: config - объект конфигурации работы с сервером
              url - адрес запроса на добавление лайка
              cardId - id карточки
              likeButton - элемент кнопки лайка
              counterElement - элемент счетчика лайков
*/
function handleAddLike(config, url, cardId, likeButton, counterElement){
  addLike(config, url, cardId)
  .then((data) => {
    likeButton.classList.add('card__like-button_is-active');
    counterElement.textContent = data.likes.length;
    isLikedCards[cardId] = true;
  })
  .catch((err) => console.log(err));
}

/*
** Функция-обработчик удаления лайка handleDelLike()
** Параметры: config - объект конфигурации работы с сервером
              url - адрес запроса на удаление лайка
              cardId - id карточки
              likeButton - элемент кнопки лайка
              counterElement - элемент счетчика лайков
*/
function handleDelLike(config, url, cardId, likeButton, counterElement){
  delLike(config, url, cardId)
  .then((data) => {
    likeButton.classList.remove('card__like-button_is-active');
    counterElement.textContent = data.likes.length;
    isLikedCards[cardId] = false;
  })
  .catch((err) => console.log(err));
}

/*
** Функция-обработчик добавления-удаления лайка по условию handleToggleLike()
** Параметры: evt - объект эвент
**            cardId - id карточки
**            isLiked - переменная была ли лайкнута карточка
**            counterElement - элемент счетчика лайков
*/
function handleToggleLike(evt, cardId, isLiked, counterElement){
  const likeButton = evt.currentTarget;
  if(!(cardId in isLikedCards)){
    if(!isLiked){
      handleAddLike(autorizationConfig, '/cards/likes/', cardId, likeButton, counterElement);
    }else{
      handleDelLike(autorizationConfig, '/cards/likes/', cardId, likeButton, counterElement);
    }
  }else{
    if(!isLikedCards[cardId]){
      handleAddLike(autorizationConfig, '/cards/likes/', cardId, likeButton, counterElement);
    }else{
      handleDelLike(autorizationConfig, '/cards/likes/', cardId, likeButton, counterElement);
    }
  }
}

/*
** Функция лоадер удаления карточки dataDeliteLoading()
** Параметры: element - элемент кнопки удаления
**            isDelete - переменная включен ли лоадер
*/
function dataDeliteLoading(element, isDelete){
  if(isDelete){
    element.textContent = 'Удаление...';
  }else{
    element.textContent = 'Да';
  }
}

/*
** Функция лоадер сохранения данных dataLoading()
** Параметры: element - элемент кнопки сохранения
**            isLoading - переменная включен ли лоадер
*/
function dataLoading(element, isLoading){
  if(isLoading){
    element.textContent = 'Сохранение...';
  }else{
    element.textContent = 'Сохранить';
  }
}

initData();
enableValidation(validationConfig);