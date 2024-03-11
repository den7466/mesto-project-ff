import '../pages/index.css';
import {createCard, removeCard, addLikeStatus, removeLikeStatus, setLikeCounter} from '../components/card.js';
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
const cardHandlers = {
  openImageModal,
  openDeleteConfirmModal,
  handleAddLike,
  handleDelLike
};
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
  loadingData(buttonNewCardSubmit, true, 'Сохранение...', 'Сохранить');
  const data = {};
  data.name = inputNameCard.value;
  data.link = inputLinkCard.value;
  postCard('/cards', data)
  .then((data) => {
    addCard(data);
    clearValidation(formNewPlace, validationConfig);
    closeModal(popupNewCard);
    form.reset();
  })
  .catch((err) => console.log(err))
  .finally(() => loadingData(buttonNewCardSubmit, false, 'Сохранение...', 'Сохранить'));
}

/*
** Функция-обработчик кнопки обновления информации профиля handleEditProfileFormSubmit()
** Параметры: evt - объект эвент
*/
function handleEditProfileFormSubmit(evt){
  evt.preventDefault();
  const form = evt.currentTarget;
  loadingData(buttonEditProfileSubmit, true, 'Сохранение...', 'Сохранить');
  const data = {};
  data.name = inputNameProfile.value;
  data.about = inputDescriptionProfile.value;
  updateDataProfile('/users/me', data)
  .then((data) => {
    insertDataProfile(data);
    clearValidation(formEditProfile, validationConfig);
    closeModal(popupEditProfile);
    form.reset();
  })
  .catch((err) => console.log(err))
  .finally(() => loadingData(buttonEditProfileSubmit, false, 'Сохранение...', 'Сохранить'));
}

/*
** Функция-обработчик кнопки обновления аватара handleEditAvatarFormSubmit()
** Параметры: evt - объект эвент
*/
function handleEditAvatarFormSubmit(evt){
  evt.preventDefault();
  const form = evt.currentTarget;
  loadingData(buttonEditAvatarSubmit, true, 'Сохранение...', 'Сохранить');
  const data = {};
  data.avatar = inputLinkAvatar.value;
  updateDataAvatar('/users/me/avatar', data)
  .then((data) => {
    profileImage.style.backgroundImage = `url(${data.avatar})`;
    clearValidation(formEditAvatar, validationConfig);
    closeModal(popupEditAvatar);
    form.reset();
  })
  .catch((err) => console.log(err))
  .finally(() => loadingData(buttonEditAvatarSubmit, false, 'Сохранение...', 'Сохранить'));
}

/*
** Функция-обработчик отображения информации профиля в форме showDataInEditProfileModal()
** Параметры: нет
*/
function showDataInEditProfileModal(){
  if(popupEditProfile.classList.contains('popup_is-opened'))
   showProfile();
}

/*
** Функция вставки карточек из объекта данных в разметку insertDataCards()
** Параметры: data - объект данных карточек
*/
function insertDataCards(data){
  data.forEach(dataElement => {
    dataElement.userId = userId;
    cardList.append(createCard(cardTemplate, dataElement, cardHandlers));
  });
}

/*
** Функция-обработчик отображения изображения в модальном окне openImageModal()
** Параметры: evt - объект эвент
*/
function openImageModal(evt){
  openModal(popupViewImage);
  showImage(evt.currentTarget);
}

/*
** Функция добавления новой карточки в разметку addCard()
** Параметры: data - объект данных карточек
*/
function addCard(data){
  data.userId = userId;
  cardList.prepend(createCard(cardTemplate, data, cardHandlers));
}

/*
** Функция отображения информации профиля showProfile()
** Параметры: нет
*/
function showProfile(){
  inputNameProfile.value = profileTitle.textContent;
  inputDescriptionProfile.value = profileDescription.textContent;
}

/*
** Функция отображения изображения showImage()
** Параметры: imageTarget - объект изображения из обработчика
*/
function showImage(imageTarget){
  imageViewImage.src = imageTarget.src;
  imageViewImage.alt = imageTarget.alt;
  descriptionViewImage.textContent = imageTarget.alt;
}

/*
** Функция-обработчик удаления карточки с сервера handleDeleteCardFormSubmit()
** Параметры: evt - объект эвент
*/
function handleDeleteCardFormSubmit(evt){
  evt.preventDefault();
  const form = evt.currentTarget;
  loadingData(buttonDeleteCardSubmit, true, 'Удаление...', 'Да');
  deleteCard('/cards/', cardIdDel)
  .then(() => {
    closeModal(popupConfirmDelCard);
    removeCard(cardItemDel);
  })
  .catch((err) => console.log(err))
  .finally(() => loadingData(buttonDeleteCardSubmit, false, 'Удаление...', 'Да'));
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
  Promise.all([getDataProfile('/users/me'), getDataCards('/cards')])
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
** Параметры: cardId - id карточки
              likeButton - элемент кнопки лайка
              counterElement - элемент счетчика лайков
*/
function handleAddLike(cardId, likeButton, counterElement){
  addLike('/cards/likes/', cardId)
  .then((data) => {
    addLikeStatus(likeButton, cardId);
    setLikeCounter(counterElement, data.likes);
  })
  .catch((err) => console.log(err));
}

/*
** Функция-обработчик удаления лайка handleDelLike()
** Параметры: cardId - id карточки
              likeButton - элемент кнопки лайка
              counterElement - элемент счетчика лайков
*/
function handleDelLike(cardId, likeButton, counterElement){
  delLike('/cards/likes/', cardId)
  .then((data) => {
    removeLikeStatus(likeButton, cardId);
    setLikeCounter(counterElement, data.likes);
  })
  .catch((err) => console.log(err));
}

/*
** Функция лоадер сохранения данных loadingData()
** Параметры: element - элемент кнопки сохранения
**            isLoading - переменная включен ли лоадер
**            textLoading - текст при отправке данных
**            textDefault - текст по умолчанию
*/
function loadingData(element, isLoading, textLoading, textDefault){
  if(isLoading){
    element.textContent = textLoading;
  }else{
    element.textContent = textDefault;
  }
}

initData();
enableValidation(validationConfig);