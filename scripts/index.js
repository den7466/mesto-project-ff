// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(link, name, delCard){
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = name;
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => delCard(cardElement));
    return cardElement;
}

// @todo: Функция удаления карточки
function delCard(cardItem){
  cardItem.remove();
}

// @todo: Вывести карточки на страницу
function showCards(data){
  data.forEach(element => {
    cardList.append(addCard(element.link, element.name, delCard));
  });
}

showCards(initialCards);