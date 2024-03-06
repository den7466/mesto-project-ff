/*
** Функция создания карточки createCard()
** Параметры: template - шаблон карточки
**            link - ссылка на изображение
**            name - наименование карточки (так же используется в alt)
**            openImageModal - функция открытия модального окна изображения
*/
function createCard(template, link, name, openImageModal, likes, userId, ownerId, cardId, handleDeleteCardSubmit){
  const cardElement = template.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector('.card__like-counter').textContent = likes;
  cardElement.querySelector('.card__title').textContent = name;
  if(userId === ownerId){
    deleteButton.classList.add('card__delete-button_active');
    deleteButton.addEventListener('click', () => handleDeleteCardSubmit(cardId, cardElement));
  }
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
  cardImage.addEventListener('click', openImageModal);
  return cardElement;
}

/*
** Функция лайкнуть карточку likeCard()
** Параметры: evt - объект эвент
*/
function likeCard(evt){
  evt.currentTarget.classList.toggle('card__like-button_is-active');
}

/*
** Функция удалить карточку delCard()
** Параметры: cardItem - объект карточки
*/
function delCard(cardItem){
  cardItem.remove();
}

export {createCard, delCard};