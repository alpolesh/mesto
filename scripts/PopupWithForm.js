import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, cleanForm) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._cleanForm = cleanForm;
  }

  _getInputValues() {
    this._formFields = this._popup.querySelectorAll('input');
    return this._formFields;
  }

  close() {
    super.close();
    this._cleanForm();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.popup__form').addEventListener('submit', this._handleFormSubmit.bind(this));
  }
}