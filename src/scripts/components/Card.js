class Card{
  constructor({name, link, likes, owner, _id}, templateSelector, {handleCardClick, handleTrashClick}) {
    this._likesNumber = likes.length;
    this._imageName = name;
    this._imageLink = link;
    this._cardId = _id;
    this._ownerId = owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._elementTemplate = document.querySelector(this._templateSelector).content;
    this._cardElement = this._elementTemplate.querySelector('.elements__element');
    this._element = this._cardElement.cloneNode(true);
    this._elementImage = this._element.querySelector('.elements__image');
    this._elementName = this._element.querySelector('.elements__name');
    this._elementHeart = this._element.querySelector('.elements__heart');
    this._elementLikesNumber = this._element.querySelector('.elements__like-counter');
    this._elementTrash = this._element.querySelector('.elements__trash');
  }

  _handleClickHeart(evt) {
    evt.target.classList.toggle('elements__heart_active');
  }

  _setEventListeners() {
    //обработчик лайка карточки
    this._elementHeart.addEventListener('click', this._handleClickHeart);
    //обработчик удаления карточки
    this._elementTrash.addEventListener('click', () => {
      this._handleTrashClick(this._cardId, this._element);
    });
    //обработчик открытия попапа с картинкой
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._imageLink, this._imageName);
    });
  }
  
  generateCard(myUserId) {
    this._elementImage.src = this._imageLink;
    this._elementImage.alt = this._imageName;
    this._elementName.textContent = this._imageName;
    this._elementLikesNumber.textContent = this._likesNumber;
    if (myUserId != this._ownerId) {
      this._elementTrash.remove();
    } 

    this._setEventListeners();

    return this._element;
  }
}

export default Card;