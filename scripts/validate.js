// Валидация формы "Редактировать профиль"
const popupEdit = document.querySelector('.popup-edit');
const formElement = popupEdit.querySelector('.popup__form');
// const inputElement = formElement.querySelector('.popup__input_type_name');

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

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement);
    });
  })
}

setEventListeners(formElement);