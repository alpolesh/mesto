//Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  setEventlistenerPopupOverlay(popup);
  setEventlistenerPopupEscButton(popup);
}

//Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWithESCButton);
  popup.removeEventListener('click', closePopupWithClickOnOverlay);
}

// Функция закрытия попала при клике по оверлею
function closePopupWithClickOnOverlay(evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(popup);
  }
}

// Функция добавления слушателя на попап для закрытия при клике по оверлею
function setEventlistenerPopupOverlay(popup) {
  popup.addEventListener('click', closePopupWithClickOnOverlay)
}

// Функция закрытия попапа при ESC
function closePopupWithESCButton(evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

// Функция добавления слушателя на попап для закрытия при ESC
function setEventlistenerPopupEscButton(popup) {
  document.addEventListener('keydown', closePopupWithESCButton)
}


export {openPopup, closePopup};