class Card{
  constructor({name, link, likes, owner, _id}, templateSelector, {myUserId, handleCardClick, handleTrashClick, handleHeartClick}) {
    this._likes = likes;
    this._imageName = name;
    this._imageLink = link;
    this._cardId = _id;
    this._ownerId = owner._id;
    this._myUserId = myUserId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleHeartClick = handleHeartClick;
    this._isLiked = false;
    this._elementTemplate = document.querySelector(this._templateSelector).content;
    this._cardElement = this._elementTemplate.querySelector('.elements__element');
    this._element = this._cardElement.cloneNode(true);
    this._elementImage = this._element.querySelector('.elements__image');
    this._elementName = this._element.querySelector('.elements__name');
    this._elementHeart = this._element.querySelector('.elements__heart');
    this._elementLikesNumber = this._element.querySelector('.elements__like-counter');
    this._elementTrash = this._element.querySelector('.elements__trash');
  }

  updateLikes(likesNumber) {
    this._elementLikesNumber.textContent = likesNumber;
  }

  toggleLike() {
    if(this._elementHeart.classList.contains('elements__heart_active')) {
      this._elementHeart.classList.remove('elements__heart_active');
      this._isLiked = false;
    } else {
      this._elementHeart.classList.add('elements__heart_active');
      this._isLiked = true;
    }
  }

  _checkLikeOwner() {
    const isLikedByMyself = this._likes.find((item) => item._id === this._myUserId) ? true : false;
    if (isLikedByMyself) {
      this._isLiked = true;
      this._elementHeart.classList.add('elements__heart_active');
    }
  }

  _setEventListeners() {
    //обработчик лайка карточки
    this._elementHeart.addEventListener('click', (evt) => {
      this._handleHeartClick(this._cardId, this._isLiked);      
    });
    //обработчик удаления карточки
    this._elementTrash.addEventListener('click', () => {
      this._handleTrashClick(this._cardId, this._element);
    });
    //обработчик открытия попапа с картинкой
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._imageLink, this._imageName);
    });
  }
  
  generateCard() {
    this._elementImage.src = this._imageLink;
    this._elementImage.alt = this._imageName;
    this._elementName.textContent = this._imageName;
    this._elementLikesNumber.textContent = this._likes.length;
    if (this._myUserId != this._ownerId) {
      this._elementTrash.remove();
    } 
    this._checkLikeOwner();
    this._setEventListeners();

    return this._element;
  }
}

export default Card;