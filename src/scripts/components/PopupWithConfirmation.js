import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit.bind(this);
    this._formElement = this._popup.querySelector('.popup__form');
    this._cardId;
    this._cardElement;
  }

  setCardId(cardId) {
    this._cardId = cardId;
  }

  setCardElement(cardElement) {
    this._cardElement = cardElement;
  }

  deleteCardLocal() {
    this._cardElement.remove();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._cardId);
    });
  }
}