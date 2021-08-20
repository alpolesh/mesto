import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._fullImage = this._popup.querySelector('.image-viewer__image');
    this._fullImageDescription = this._popup.querySelector('.image-viewer__description');
  }

  _insertFullImage(imageSrc, imageDescription) {
    this._fullImage.src = imageSrc;
    this._fullImage.alt = imageDescription;
    this._fullImageDescription.textContent = imageDescription;
  }

  open(imageSrc, imageDescription) {
    super.open();
    this._insertFullImage(imageSrc, imageDescription);
  }
}