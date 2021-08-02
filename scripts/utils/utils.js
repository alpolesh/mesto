const popupAddCard = document.querySelector('.popup-add-card');
const popupEdit = document.querySelector('.popup-edit');
const saveButtonEdit = popupEdit.querySelector('.popup__submit');
const saveButtonAddCard = popupAddCard.querySelector('.popup__submit');

//Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  saveButtonEdit.classList.remove('popup__submit_inactive');
  saveButtonAddCard.classList.add('popup__submit_inactive');
  setEventlistenerPopupOverlay(popup);
  setEventlistenerPopupEscButton(popup);
}

//Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWithESCButton);
  popup.removeEventListener('click', closePopupWithClickOnOverlay);
}

//Функция очистки формы
function cleanForm(form) {
  form.reset();
  Array.from(form.querySelectorAll('.popup__input-error')).forEach((inputEerror) => {
    inputEerror.textContent = '';
    inputEerror.classList.remove('popup__input-error_active');
  })
  Array.from(form.querySelectorAll('.popup__input')).forEach((inputElement) => {
    inputElement.classList.remove('popup__input_type_error');
  })
}

// Функция закрытия попала при клике по оверлею
function closePopupWithClickOnOverlay(evt) {
  const popup = document.querySelector('.popup_opened');
  const form = popup.querySelector('.popup__form');
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(popup);
    if (form) cleanForm(form);
  }
}

// Функция добавления слушателя на попап для закрытия при клике по оверлею
function setEventlistenerPopupOverlay(popup) {
  popup.addEventListener('click', closePopupWithClickOnOverlay)
}

// Функция закрытия попапа при ESC
function closePopupWithESCButton(evt) {
  const popup = document.querySelector('.popup_opened');
  const form = popup.querySelector('.popup__form');
  if (evt.key === 'Escape') {
    closePopup(popup);
    if (form) cleanForm(form);
  }
}

// Функция добавления слушателя на попап для закрытия при ESC
function setEventlistenerPopupEscButton(popup) {
  document.addEventListener('keydown', closePopupWithESCButton)
}


export {openPopup, closePopup, cleanForm};