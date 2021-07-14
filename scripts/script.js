import {initialCards} from './initial-cards.js';

const popupEdit = document.querySelector('.popup-edit');
const closeButtonEdit = popupEdit.querySelector('.popup__close-icon');
const formNameEdit = popupEdit.querySelector('.popup__input_type_name');
const formDescriptionEdit = popupEdit.querySelector('.popup__input_type_description');
const saveButtonEdit = popupEdit.querySelector('.popup__submit');
const formEdit = popupEdit.querySelector('.popup__form');

const popupAddCard = document.querySelector('.popup-add-card');
const formAddCard = popupAddCard.querySelector('.popup__form');
const saveButtonAddCard = popupAddCard.querySelector('.popup__submit');
const closeButtonAddCard = popupAddCard.querySelector('.popup__close-icon');
const formNameCard = popupAddCard.querySelector('.popup__input_type_name');
const formSourceCard = popupAddCard.querySelector('.popup__input_type_description');

const profileElement = document.querySelector('.profile');
const editButton = profileElement.querySelector('.profile__edit-button-container');
const profileName = profileElement.querySelector('.profile__name');
const profileDescription = profileElement.querySelector('.profile__description');
const addButton = profileElement.querySelector('.profile__add-button-container');

const elementTemplate = document.querySelector('#element-template').content;
const elementsList = document.querySelector('.elements__list');
const cardElement = elementTemplate.querySelector('.elements__element');

const imageViewer = document.querySelector('.image-viewer');
const closeImageViewer = imageViewer.querySelector('.image-viewer__close');
const fullImage = imageViewer.querySelector('.image-viewer__image');
const fullImageDescription = imageViewer.querySelector('.image-viewer__description');

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

// Открытие формы редактирования профиля
editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  formNameEdit.value = profileName.textContent;
  formDescriptionEdit.value = profileDescription.textContent;
});

// Закрытие формы редактирования профиля при нажатии на крестик
closeButtonEdit.addEventListener('click', () => {
  closePopup(popupEdit);
  cleanForm(formEdit);
})

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

// Submit формы редактирования профиля
formEdit.addEventListener('submit', handleSubmitEdit)

function handleSubmitEdit(evt) {
  evt.preventDefault();
  profileName.textContent = formNameEdit.value;
  profileDescription.textContent = formDescriptionEdit.value;
  closePopup(popupEdit);
}

//функция создания карточки
function createCard(imageLink, imageName) {
  const element = cardElement.cloneNode(true);
  const elementImageSelector = element.querySelector('.elements__image');
  const elementNameSelector = element.querySelector('.elements__name');
  const elementHeartSelector = element.querySelector('.elements__heart');
  const elementTrashSelector = element.querySelector('.elements__trash');
  elementImageSelector.src = imageLink;
  elementImageSelector.alt = imageName;
  elementNameSelector.textContent = imageName;
  //обработчик лайка карточки
  elementHeartSelector.addEventListener('click', (evt) => {
    evt.target.classList.toggle('elements__heart_active');
  })
  //обработчик удаления карточки
  elementTrashSelector.addEventListener('click', (evt) => {
    evt.target.closest('.elements__element').remove();
  })
  //обработчик открытия попапа с картинкой
  elementImageSelector.addEventListener('click', (evt) => {
    fullImage.src = evt.target.src;
    fullImage.alt = evt.target.alt;
    fullImageDescription.textContent = evt.target.alt;
    openPopup(imageViewer);
  })
  return element;
}

//рендер карточек
function renderCards(initialCards) {
  initialCards.forEach((card) => {
    elementsList.prepend(createCard(card.link, card.name));
  })
}

renderCards(initialCards)

//открытие формы добавления карточки
addButton.addEventListener('click', () => {
  openPopup(popupAddCard);
})

//закрытие формы добавления карточки
closeButtonAddCard.addEventListener('click', () => {
  closePopup(popupAddCard);
  cleanForm(formAddCard);
})

//Submit формы добавления карточки
formAddCard.addEventListener('submit', handleSubmitAddCard)

function handleSubmitAddCard(evt) {
  evt.preventDefault();
  elementsList.prepend(createCard(formSourceCard.value, formNameCard.value));
  cleanForm(formAddCard);
  closePopup(popupAddCard);
}

//Закрытие попапа с картинкой
closeImageViewer.addEventListener('click', () => {
  closePopup(imageViewer);
})






