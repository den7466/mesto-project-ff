/*
** Функция получения данных с сервера getData()
** Параметры: config - объект конфигурации работы с сервером
**            url - адрес запроса
** Возвращает: promise
*/
function getData(config, url){
  return fetch(`${config.baseUrl}${config.cohort}${url}`, {
    headers: {
      authorization: config.token
    }
  });
}

/*
** Функция обновления данных на сервере updateData()
** Параметры: config - объект конфигурации работы с сервером
**            url - адрес запроса
**            data - объект с данными
** Возвращает: promise
*/
function updateData(config, url, data){
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
** Параметры: config - объект конфигурации работы с сервером
**            url - адрес запроса
**            data - объект с данными
** Возвращает: promise
*/
function postData(config, url, data){
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
** Параметры: config - объект конфигурации работы с сервером
**            url - адрес запроса
**            id - id элемента
** Возвращает: promise
*/
function deleteData(config, url, id){
  return fetch(`${config.baseUrl}${config.cohort}${url}${id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.token
    }
  });
}

/*
** Функция перезаписи данных на сервере putData()
** Параметры: config - объект конфигурации работы с сервером
**            url - адрес запроса
**            id - id элемента
** Возвращает: promise
*/
function putData(config, url, id){
  return fetch(`${config.baseUrl}${config.cohort}${url}${id}`, {
    method: 'PUT',
    headers: {
      authorization: config.token
    }
  });
}

/*
** Функция запроса данных профиля с сервера getDataProfile()
** Параметры: config - объект конфигурации работы с сервером
**            url - адрес запроса данных профиля
** Возвращает: promise
*/
function getDataProfile(config, url){
  return getData(config, url)
  .then(handleResponse);
}

/*
** Функция запроса данных карточек с сервера getDataCards()
** Параметры: config - объект конфигурации работы с сервером
**            url - адрес запроса данных карточек
** Возвращает: promise
*/
function getDataCards(config, url){
  return getData(config, url)
  .then(handleResponse);
}

/*
** Функция обновления данных профиля на сервере updateDataProfile()
** Параметры: config - объект конфигурации работы с сервером
**            url - адрес запроса на обновление данных профиля
**            data - объект с данными профиля для обновления {name: 'name', about: 'job'}
** Возвращает: promise
*/
function updateDataProfile(config, url, data){
  return updateData(config, url, data)
  .then(handleResponse);
}

/*
** Функция добавления карточки на сервер postCard()
** Параметры: config - объект конфигурации работы с сервером
**            url - адрес запроса на добавление новой карточки
**            data - объект с данными карточки для добавления {name: 'name', link: 'url'}
** Возвращает: promise
*/
function postCard(config, url, data){
  return postData(config, url, data)
  .then(handleResponse);
}

/*
** Функция удаления карточки с сервера deleteCard()
** Параметры: config - объект конфигурации работы с сервером
**            url - адрес запроса на удаление карточки
**            cardId - id карточки
** Возвращает: promise
*/
function deleteCard(config, url, cardId){
  return deleteData(config, url, cardId)
  .then(handleResponse);
}

/*
** Функция добавления лайка addLike()
** Параметры: config - объект конфигурации работы с сервером
**            url - адрес запроса добаление лайка
**            id - id карточки
** Возвращает: promise
*/
function addLike(config, url, id){
  return putData(config, url, id)
  .then(handleResponse);
}

/*
** Функция удаления лайка delLike()
** Параметры: config - объект конфигурации работы с сервером
**            url - адрес запроса добаление лайка
**            id - id карточки
** Возвращает: promise
*/
function delLike(config, url, id){
  return deleteData(config, url, id)
  .then(handleResponse);
}

/*
** Функция обновления аватара на сервере updateDataAvatar()
** Параметры: config - объект конфигурации работы с сервером
**            url - адрес запроса на обновление аватара
**            data - объект с данными аватара {avatar: 'url'}
** Возвращает: promise
*/
function updateDataAvatar(config, url, data){
  return updateData(config, url, data)
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