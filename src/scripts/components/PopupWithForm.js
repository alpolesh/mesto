import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, cleanForm) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit.bind(this);
    this._cleanForm = cleanForm;
    this._inputList = Array.from(this._popup.querySelectorAll('input')); 
    this._formValues = {};
    this._formElement = this._popup.querySelector('.popup__form');
    this._submitElement = this._popup.querySelector('.popup__submit');
  }

  _getInputValues() {
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    })
  }

  close() {
    super.close();
    this._cleanForm();
  }

  spin(text) {
    this._submitElement.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      this._getInputValues.bind(this)();
      this._handleFormSubmit(evt, this._formValues);
    });
  }
}