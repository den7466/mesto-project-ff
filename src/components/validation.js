/*
** Функция отображения ошибки showInputError()
** Параметры: formElement - элемент формы
**            inputElement - элемент поля ввода
**            inputErrorClass - класс отображения ошибки поля ввода
**            errorClass - класс отображения ошибки
**            errorMessage - текст ошибки
*/
function showInputError(formElement, inputElement, inputErrorClass, errorClass, errorMessage){
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

/*
** Функция скрытия ошибки hideInputError()
** Параметры: formElement - элемент формы
**            inputElement - элемент поля ввода
**            inputErrorClass - класс отображения ошибки поля ввода
**            errorClass - класс отображения ошибки
*/
function hideInputError(formElement, inputElement, inputErrorClass, errorClass){
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

/*
** Функция-обработчик валидности полей checkInputValidity()
** Параметры: formElement - элемент формы
**            inputElement - элемент поля ввода
**            inputErrorClass - класс отображения ошибки поля ввода
**            errorClass - класс отображения ошибки
*/
function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass){
  if(inputElement.validity.patternMismatch){
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }else{
    inputElement.setCustomValidity('');
  }
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputErrorClass, errorClass, inputElement.validationMessage);
  }else{
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

/*
** Функция установки слушателя на поля ввода setEventListeners()
** Параметры: formElement - элемент формы
**            inputElement - элемент поля ввода
**            submitButtonSelector - кнопка отправки формы
**            inactiveButtonClass - класс неактивной кнопки
**            inputErrorClass - класс отображения ошибки поля ввода
**            errorClass - класс отображения ошибки
*/
function setEventListeners(formElement, inputElement, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass){
  const inputList = Array.from(formElement.querySelectorAll(inputElement));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
}

/*
** Функция проверки на валидность hasInvalidInput()
** Параметры: inputList - массим полей ввода формы
** Возвращает: true или false
*/
function hasInvalidInput(inputList){
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

/*
** Функция активации-дезактивации кнопки отправки формы toggleButtonState()
** Параметры: inputList - массим полей ввода формы
**            buttonElement - элемент кнопки отправки формы
**            inactiveButtonClass - класс неактивной кнопки
*/
function toggleButtonState(inputList, buttonElement, inactiveButtonClass){
  if(hasInvalidInput(inputList)){
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  }else{
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

/*
** Функция сброса ошибок валидации clearValidation()
** Параметры: formElement - элемент формы
**            validationConfig - объект концигурации валидации
*/
function clearValidation(formElement, validationConfig){
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
  });
}

/*
** Функция включения валидации enableValidation()
** Параметры: validationConfig - объект концигурации валидации
*/
function enableValidation(validationConfig){
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig.inputSelector, validationConfig.submitButtonSelector, validationConfig.inactiveButtonClass, validationConfig.inputErrorClass, validationConfig.errorClass);
  });
}

export {clearValidation, enableValidation};