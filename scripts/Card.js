import {openPopup} from './utils/utils.js';

const imageViewer = document.querySelector('.image-viewer');
const fullImage = imageViewer.querySelector('.image-viewer__image');
const fullImageDescription = imageViewer.querySelector('.image-viewer__description');

class Card{
  constructor({name, link}, templateSelector) {
    this.imageName = name;
    this.imageLink = link;
    this.templateSelector = templateSelector;
  }

  _handleClickHeart(evt) {
    evt.target.classList.toggle('elements__heart_active');
  }

  _handleRemoveCard(evt) {
    evt.target.closest('.elements__element').remove();
  }

  _handleOpenFullImage(evt) {
    fullImage.src = evt.target.src;
    fullImage.alt = evt.target.alt;
    fullImageDescription.textContent = evt.target.alt;
    openPopup(imageViewer);
  }

  _setEventListeners(listenableElements) {
    //обработчик лайка карточки
    listenableElements.elementHeartSelector.addEventListener('click', this._handleClickHeart);
    //обработчик удаления карточки
    listenableElements.elementTrashSelector.addEventListener('click', this._handleRemoveCard);
    //обработчик открытия попапа с картинкой
    listenableElements.elementImageSelector.addEventListener('click', this._handleOpenFullImage);
  }
  
  createCard() {
    const elementTemplate = document.querySelector(this.templateSelector).content;
    const cardElement = elementTemplate.querySelector('.elements__element');
    const element = cardElement.cloneNode(true);
    const elementImageSelector = element.querySelector('.elements__image');
    const elementNameSelector = element.querySelector('.elements__name');
    const elementHeartSelector = element.querySelector('.elements__heart');
    const elementTrashSelector = element.querySelector('.elements__trash');
    elementImageSelector.src = this.imageLink;
    elementImageSelector.alt = this.imageName;
    elementNameSelector.textContent = this.imageName;

    this._setEventListeners({elementHeartSelector, elementTrashSelector, elementImageSelector});

    return element;
  }
}

export default Card;