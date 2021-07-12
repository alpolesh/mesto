// Валидация формы "Редактировать профиль"
const popupEdit = document.querySelector('.popup-edit');
const formElement = popupEdit.querySelector('.popup__form');

// Функция отображения ошибки под инпутом
function showInputError(formElement, inputElement, errorMessage) {
  const inputError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  inputError.textContent = errorMessage;
  inputError.classList.add('popup__input-error_active');
}

// Функция удаления ошибки под инпутом
function hideInputError(formElement, inputElement) {
  const inputError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  inputError.classList.remove('popup__input-error_active');
  inputError.textContent = '';
}

// Коллбэк для проверки валидности инпута
function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

// Функция проверки хотя бы одного невалидного поля
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

// Функция активации и дезактивации кнопки Submit
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit_inactive');
  } else {
    buttonElement.classList.remove('popup__submit_inactive');
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  })
}

setEventListeners(formElement);

