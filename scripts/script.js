import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards} from './initial-cards.js';
import {openPopup, closePopup, cleanForm} from './utils/utils.js';

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

const templateSelectorCard = '#element-template';
const elementsList = document.querySelector('.elements__list');

const imageViewer = document.querySelector('.image-viewer');
const closeImageViewer = imageViewer.querySelector('.image-viewer__close');

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

// Submit формы редактирования профиля
function handleSubmitEdit(evt) {
  evt.preventDefault();
  profileName.textContent = formNameEdit.value;
  profileDescription.textContent = formDescriptionEdit.value;
  closePopup(popupEdit);
}

formEdit.addEventListener('submit', handleSubmitEdit)

// Рендер карточек
function renderCards(initialCards) {
  initialCards.forEach((data) => {
    const card = new Card(data, templateSelectorCard);
    elementsList.prepend(card.createCard());
  })
}

renderCards(initialCards);

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
function handleSubmitAddCard(evt) {
  evt.preventDefault();
  const cardData = {name: formNameCard.value, link: formSourceCard.value};
  const newCard = new Card(cardData, templateSelectorCard);
  elementsList.prepend(newCard.createCard());
  cleanForm(formAddCard);
  closePopup(popupAddCard);
}

formAddCard.addEventListener('submit', handleSubmitAddCard)

//Закрытие попапа с картинкой
closeImageViewer.addEventListener('click', () => {
  closePopup(imageViewer);
})

//Запуск валидации для всех форм
const configSelectors = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
}

const formList = Array.from(document.querySelectorAll('.popup__form'));
formList.forEach((formElement) => {
  const newFormValidator = new FormValidator(configSelectors, formElement);
  newFormValidator.enableValidation();
})







