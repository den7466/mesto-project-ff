// TODO: @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// TODO: @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// TODO: @todo: Функция создания карточки
function addCards(){

}

// TODO: @todo: Функция удаления карточки
function delCards(){

}

// TODO: @todo: Вывести карточки на страницу
function showCards(cards){
  cards.forEach(element => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').setAttribute('src', element.link);
    cardElement.querySelector('.card__title').textContent = element.name;
    cardList.append(cardElement);
  });
}

showCards(initialCards);