class FormValidator {
  constructor(configSelectors, formElement) {
    this._inputSelector = configSelectors.inputSelector;
    this._submitButtonSelector = configSelectors.submitButtonSelector;
    this._submitButtonElement = formElement.querySelector(this._submitButtonSelector);
    this._submitButtonText = this._submitButtonElement.textContent;
    this._inactiveButtonClass = configSelectors.inactiveButtonClass;
    this._inputErrorClass = configSelectors.inputErrorClass;
    this._errorClass = configSelectors.errorClass;
    this._inputError = configSelectors.inputError;
    this._formElement = formElement;
  }

  // Функция отображения ошибки под инпутом
  _showInputError(formElement, inputElement, errorMessage) {
    const inputErrorClass = this._inputErrorClass;
    const errorClass = this._errorClass;
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    inputError.textContent = errorMessage;
    inputError.classList.add(errorClass);
  }

  // Функция удаления ошибки под инпутом
  _hideInputError(formElement, inputElement) {
    const inputErrorClass = this._inputErrorClass;
    const errorClass = this._errorClass;
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    inputError.classList.remove(errorClass);
    inputError.textContent = '';
  }

  // Функция для проверки валидности инпута
  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  // Функция проверки хотя бы одного невалидного поля
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  // Функция активации и деактивации кнопки Submit
  _toggleButtonState(inputList, buttonElement) {
    const inactiveButtonClass = this._inactiveButtonClass;
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
    }
  }

  // Функция навешивания слушателей на все инпуты формы
  _setEventListeners() {
    const inputSelector = this._inputSelector;
    const submitButtonSelector = this._submitButtonSelector;
    const formElement = this._formElement;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    })
  }

  //Функция очистки формы
  cleanForm() {
    const errorsList = Array.from(this._formElement.querySelectorAll(this._inputError));
    const inputsList = Array.from(this._formElement.querySelectorAll(this._inputSelector))
    this._formElement.reset();
    errorsList.forEach((inputError) => {
      inputError.textContent = '';
      inputError.classList.remove(this._errorClass);
    })
    inputsList.forEach((inputElement) => {
      inputElement.classList.remove(this._inputErrorClass);
    })
    this._submitButtonElement.textContent = this._submitButtonText;
  }

  enableSubmitButton() {
    this._formElement.querySelector(this._submitButtonSelector).classList.remove(this._inactiveButtonClass);
  } 

  disableSubmitButton() {
    this._formElement.querySelector(this._submitButtonSelector).classList.add(this._inactiveButtonClass); 
  } 

  enableValidation() {
    this._setEventListeners();
  }
}

export default FormValidator;