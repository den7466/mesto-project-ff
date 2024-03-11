const isLikedCards = [];

/*
** Функция создания карточки createCard()
** Параметры: template - шаблон карточки
**            data - объект с данными карточки
**            handlers - объект с обработчиками
** Возвращает: элемент карточки
*/
function createCard(template, data, handlers){
  const cardElement = template.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  cardImage.src = data.link;
  cardImage.alt = data.name;
  setLikeCounter(likeCounter, data.likes);
  cardElement.querySelector('.card__title').textContent = data.name;
  if(data.userId === data.owner._id){
    deleteButton.classList.add('card__delete-button_active');
    deleteButton.addEventListener('click', () => handlers.openDeleteConfirmModal(data._id, cardElement));
  }
  if(data.likes.some((element) => element._id === data.userId)){
    addLikeStatus(likeButton, data._id);
  }
  likeButton.addEventListener('click', (evt) => toggleLikeCard(evt, data._id, likeCounter, handlers.handleAddLike, handlers.handleDelLike));
  cardImage.addEventListener('click', handlers.openImageModal);
  return cardElement;
}

/*
** Функция удаления карточки из разметки removeCard()
** Параметры: cardItem - объект карточки
*/
function removeCard(cardItem){
  cardItem.remove();
}

/*
** Функция-обработчик добавления-удаления лайка по условию toggleLikeCard()
** Параметры: evt - объект эвент
**            cardId - id карточки
**            counterElement - элемент счетчика лайков
**            handleAddLike - функция обработчик добавления лайка
**            handleDelLike - - функция обработчик удаления лайка
*/
function toggleLikeCard(evt, cardId, counterElement, handleAddLike, handleDelLike){
  const likeButton = evt.currentTarget;
  if(!isLikedCards[cardId]){
    handleAddLike(cardId, likeButton, counterElement);
  }else{
    handleDelLike(cardId, likeButton, counterElement);
  }
}

/*
** Функция добавления активного состояния лайка addLikeStatus()
** Параметры: element - элемент кнопки лайка
**            cardId - id карточки
*/
function addLikeStatus(element, cardId){
  element.classList.add('card__like-button_is-active');
  isLikedCards[cardId] = true;
}

/*
** Функция удаления активного состояния лайка removeLikeStatus()
** Параметры: element - лемент кнопки лайка
**            cardId - id карточки
*/
function removeLikeStatus(element, cardId){
  element.classList.remove('card__like-button_is-active');
  isLikedCards[cardId] = false;
}

/*
** Функция установки количества лайков setLikeCounter()
** Параметры: element - элемент счетчика лайков
**            likes - массив лайков
*/
function setLikeCounter(element, likes){
  element.textContent = likes.length;
}

export {createCard, removeCard, addLikeStatus, removeLikeStatus, setLikeCounter};