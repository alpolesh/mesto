// Функция отображения ошибки под инпутом
function showInputError(formElement, inputElement, errorMessage, config) {
  const {inputErrorClass, errorClass} = config;
  const inputError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  inputError.textContent = errorMessage;
  inputError.classList.add(errorClass);
}

// Функция удаления ошибки под инпутом
function hideInputError(formElement, inputElement, config) {
  const {inputErrorClass, errorClass} = config;
  const inputError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  inputError.classList.remove(errorClass);
  inputError.textContent = '';
}

// Коллбэк для проверки валидности инпута
function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

// Функция проверки хотя бы одного невалидного поля
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

// Функция активации и дезактивации кнопки Submit
function toggleButtonState(inputList, buttonElement, config) {
  const {inactiveButtonClass} = config;
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

// Функция навешивания слушателей на все инпуты формы
function setEventListeners(formElement, config) {
  const {inputSelector, submitButtonSelector} = config;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  })
}

// Включение валидации для всех форм
function enableValidation({formSelector, ...config}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
})