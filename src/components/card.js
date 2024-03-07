/*
** Функция создания карточки createCard()
** Параметры: template - шаблон карточки
**            link - ссылка на изображение
**            name - наименование карточки (так же используется в alt)
**            openImageModal - функция открытия модального окна изображения
*/
function createCard(template, link, name, likes, userId, ownerId, cardId, openImageModal, handleDeleteCardSubmit, handleToggleLike){
  const cardElement = template.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  let isLiked = false;
  cardImage.src = link;
  cardImage.alt = name;
  likeCounter.textContent = likes.length;
  cardElement.querySelector('.card__title').textContent = name;
  if(userId === ownerId){
    deleteButton.classList.add('card__delete-button_active');
    deleteButton.addEventListener('click', () => handleDeleteCardSubmit(cardId, cardElement));
  }
  if(likes.some((element) => element._id === userId)){
    likeButton.classList.add('card__like-button_is-active');
    isLiked = true;
  }
  likeButton.addEventListener('click', (evt) => handleToggleLike(evt, cardId, isLiked, likeCounter));
  cardImage.addEventListener('click', openImageModal);
  return cardElement;
}

/*
** Функция лайкнуть карточку likeCard()
** Параметры: evt - объект эвент
*/
// function activeLike(likes, userId){

// }

/*
** Функция удалить карточку delCard()
** Параметры: cardItem - объект карточки
*/
function delCard(cardItem){
  cardItem.remove();
}

export {createCard, delCard};