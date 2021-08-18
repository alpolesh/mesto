import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(imageSrc, imageDescription, popupSelector) {
    super(popupSelector);
    this._imageSrc = imageSrc;
    this._imageDescription = imageDescription;
  }

  _insertFullImage() {
    const fullImage = this._popup.querySelector('.image-viewer__image');
    const fullImageDescription = this._popup.querySelector('.image-viewer__description');
    fullImage.src = this._imageSrc;
    fullImage.alt = this._imageDescription;
    fullImageDescription.textContent = this._imageDescription;
  }

  open() {
    super.open();
    this._insertFullImage();
  }
}