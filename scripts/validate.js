// Валидация формы "Редактировать профиль"

const popupEdit = document.querySelector('.popup-edit');
const formEdit = popupEdit.querySelector('.popup__form');
const inputElement = formEdit.querySelector('.popup__input_type_name');

// Функция отображения ошибки под инпутом
function showInputError(inputElement) {
  inputElement.classList.add('popup__input_type_error');
}

// Функция удаления ошибки под инпутом
function hideInputError(inputElement) {
  inputElement.classList.remove('popup__input_type_error');
}

// Коллбэк для проверки валидности инпута
function isValid() {
  if (!inputElement.validity.valid) {
    showInputError(inputElement);
  } else {
    hideInputError(inputElement);
  }
}

inputElement.addEventListener('input', isValid);