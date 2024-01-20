// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCards(link, name, delCards){
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').setAttribute('src', link);
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => delCards(cardElement));
    return cardElement;
}

// @todo: Функция удаления карточки
function delCards(cardItem){
  cardItem.remove();
}

// @todo: Вывести карточки на страницу
function showCards(data){
  data.forEach(element => {
    cardList.append(addCards(element.link, element.name, delCards));
  });
}

showCards(initialCards);