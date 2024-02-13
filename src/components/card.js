function createCard(template, link, name, openModal, modal){
  const cardElement = template.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => delCard(cardElement));
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
  cardImage.addEventListener('click', (evt) => openModal(evt, modal, '', '', ''));
  return cardElement;
}

function addCard(template, form, list, openModal){
  let name = form.elements.place_name.value,
      link = form.elements.link.value;
  list.prepend(createCard(template, link, name, delCard, likeCard, openModal));
  form.reset();
}

function likeCard(){
  this.classList.toggle('card__like-button_is-active');
}

function delCard(cardItem){
  cardItem.remove();
}

export {createCard, addCard};