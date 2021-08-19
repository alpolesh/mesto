class FormValidator {
  constructor(configSelectors, formElement) {
    this.inputSelector = configSelectors.inputSelector;
    this.submitButtonSelector = configSelectors.submitButtonSelector;
    this.inactiveButtonClass = configSelectors.inactiveButtonClass;
    this.inputErrorClass = configSelectors.inputErrorClass;
    this.errorClass = configSelectors.errorClass;
    this.inputError = configSelectors.inputError;
    this.formElement = formElement;
  }

  // Функция отображения ошибки под инпутом
  _showInputError(formElement, inputElement, errorMessage) {
    const inputErrorClass = this.inputErrorClass;
    const errorClass = this.errorClass;
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    inputError.textContent = errorMessage;
    inputError.classList.add(errorClass);
  }

  // Функция удаления ошибки под инпутом
  _hideInputError(formElement, inputElement) {
    const inputErrorClass = this.inputErrorClass;
    const errorClass = this.errorClass;
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
    const inactiveButtonClass = this.inactiveButtonClass;
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
    }
  }

  // Функция навешивания слушателей на все инпуты формы
  _setEventListeners() {
    const inputSelector = this.inputSelector;
    const submitButtonSelector = this.submitButtonSelector;
    const formElement = this.formElement;
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
    const errorsList = Array.from(this.formElement.querySelectorAll(this.inputError));
    const inputsList = Array.from(this.formElement.querySelectorAll(this.inputSelector))
    this.formElement.reset();
    errorsList.forEach((inputError) => {
      inputError.textContent = '';
      inputError.classList.remove(this.errorClass);
    })
    inputsList.forEach((inputElement) => {
      inputElement.classList.remove(this.inputErrorClass);
    })
  }

  enableSubmitButton() {
    this.formElement.querySelector(this.submitButtonSelector).classList.remove(this.inactiveButtonClass);
  } 

  disableSubmitButton() {
    this.formElement.querySelector(this.submitButtonSelector).classList.add(this.inactiveButtonClass); 
  } 

  enableValidation() {
    this._setEventListeners();
  }
}

export default FormValidator;