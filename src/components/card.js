/*
** Функция создания карточки createCard()
** Параметры: template - шаблон карточки
**            link - ссылка на изображение
**            name - наименование карточки (так же используется в alt)
**            openModal - функция открытия модального окна
**            modal - объект модального окна
*/
function createCard(template, link, name, openModal, modal){
  const cardElement = template.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => delCard(cardElement));
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
  cardImage.addEventListener('click', (evt) => openModal(evt, modal));
  return cardElement;
}

/*
** Функция добавления карточки addCard()
** Параметры: template - шаблон карточки
**            form - объект формы
**            list - объект списка, куда добавлять карточку
**            openModal - функция открытия модального окна
*/
function addCard(template, form, list, openModal){
  let name = form.elements.place_name.value,
      link = form.elements.link.value;
  list.prepend(createCard(template, link, name, delCard, likeCard, openModal));
  form.reset();
}

/*
** Функция лайкнуть карточку likeCard()
** Параметры: нет
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

function showCards(template, data, list, openModal, modalImage){
  data.forEach(element => {
    list.append(createCard(template, element.link, element.name, openModal, modalImage));
  });
}

export {addCard, showCards};