const config = {
  token: '4beae149-dbca-4748-9357-2aff8b55b5f4',
  cohort: 'wff-cohort-8',
  baseUrl: 'https://nomoreparties.co/v1/'
};

/*
** Функция получения данных с сервера getData()
** Параметры: url - адрес запроса
** Возвращает: promise
*/
function getData(url){
  return fetch(`${config.baseUrl}${config.cohort}${url}`, {
    headers: {
      authorization: config.token
    }
  });
}

/*
** Функция обновления данных на сервере updateData()
** Параметры: url - адрес запроса
**            data - объект с данными
** Возвращает: promise
*/
function updateData(url, data){
  return fetch(`${config.baseUrl}${config.cohort}${url}`, {
    method: 'PATCH',
    headers: {
      authorization: config.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

/*
** Функция добавления данных на сервер postData()
** Параметры: url - адрес запроса
**            data - объект с данными
** Возвращает: promise
*/
function postData(url, data){
  return fetch(`${config.baseUrl}${config.cohort}${url}`, {
    method: 'POST',
    headers: {
      authorization: config.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

/*
** Функция удаления данных с сервера deleteData()
** Параметры: url - адрес запроса
**            id - id элемента
** Возвращает: promise
*/
function deleteData(url, id){
  return fetch(`${config.baseUrl}${config.cohort}${url}${id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.token
    }
  });
}

/*
** Функция перезаписи данных на сервере putData()
** Параметры: url - адрес запроса
**            id - id элемента
** Возвращает: promise
*/
function putData(url, id){
  return fetch(`${config.baseUrl}${config.cohort}${url}${id}`, {
    method: 'PUT',
    headers: {
      authorization: config.token
    }
  });
}

/*
** Функция запроса данных профиля с сервера getDataProfile()
** Параметры: url - адрес запроса данных профиля
** Возвращает: promise
*/
function getDataProfile(url){
  return getData(url)
  .then(handleResponse);
}

/*
** Функция запроса данных карточек с сервера getDataCards()
** Параметры: url - адрес запроса данных карточек
** Возвращает: promise
*/
function getDataCards(url){
  return getData(url)
  .then(handleResponse);
}

/*
** Функция обновления данных профиля на сервере updateDataProfile()
** Параметры: url - адрес запроса на обновление данных профиля
**            data - объект с данными профиля для обновления {name: 'name', about: 'job'}
** Возвращает: promise
*/
function updateDataProfile(url, data){
  return updateData(url, data)
  .then(handleResponse);
}

/*
** Функция добавления карточки на сервер postCard()
** Параметры: url - адрес запроса на добавление новой карточки
**            data - объект с данными карточки для добавления {name: 'name', link: 'url'}
** Возвращает: promise
*/
function postCard(url, data){
  return postData(url, data)
  .then(handleResponse);
}

/*
** Функция удаления карточки с сервера deleteCard()
** Параметры: url - адрес запроса на удаление карточки
**            cardId - id карточки
** Возвращает: promise
*/
function deleteCard(url, cardId){
  return deleteData(url, cardId)
  .then(handleResponse);
}

/*
** Функция добавления лайка addLike()
** Параметры: url - адрес запроса добаление лайка
**            id - id карточки
** Возвращает: promise
*/
function addLike(url, id){
  return putData(url, id)
  .then(handleResponse);
}

/*
** Функция удаления лайка delLike()
** Параметры: url - адрес запроса добаление лайка
**            id - id карточки
** Возвращает: promise
*/
function delLike(url, id){
  return deleteData(url, id)
  .then(handleResponse);
}

/*
** Функция обновления аватара на сервере updateDataAvatar()
** Параметры: url - адрес запроса на обновление аватара
**            data - объект с данными аватара {avatar: 'url'}
** Возвращает: promise
*/
function updateDataAvatar(url, data){
  return updateData(url, data)
  .then(handleResponse);
}

/*
** Функция обработки ответа от сервера handleResponse()
** Параметры: response - ответ от сервера
** Возвращает: promise
*/
function handleResponse(response){
  if(response.ok){
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
}

export {getDataProfile, getDataCards, updateDataProfile, postCard, deleteCard, addLike, delLike, updateDataAvatar};