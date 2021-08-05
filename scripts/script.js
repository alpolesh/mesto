import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards} from './initial-cards.js';
import {openPopup, closePopup} from './utils/utils.js';

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

// Рендер карточек
function renderCards(initialCards) {
  initialCards.forEach((data) => {
    const card = new Card(data, templateSelectorCard);
    elementsList.prepend(card.createCard());
  })
}

renderCards(initialCards);

//Запуск валидации для всех форм
const configSelectors = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  inputError: 'popup__input-error',
}

const editFormValidator = new FormValidator(configSelectors, formEdit);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(configSelectors, formAddCard);
addCardFormValidator.enableValidation();

// Открытие формы редактирования профиля
editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  editFormValidator.enableSubmitButton();
  formNameEdit.value = profileName.textContent;
  formDescriptionEdit.value = profileDescription.textContent;
});

// Закрытие формы редактирования профиля при нажатии на крестик
closeButtonEdit.addEventListener('click', () => {
  closePopup(popupEdit);
  editFormValidator.cleanForm();
})

// Submit формы редактирования профиля
function handleSubmitEdit(evt) {
  evt.preventDefault();
  profileName.textContent = formNameEdit.value;
  profileDescription.textContent = formDescriptionEdit.value;
  closePopup(popupEdit);
}

formEdit.addEventListener('submit', handleSubmitEdit)

//открытие формы добавления карточки
addButton.addEventListener('click', () => {
  openPopup(popupAddCard);
  addCardFormValidator.disableSubmitButton();
})

//закрытие формы добавления карточки
closeButtonAddCard.addEventListener('click', () => {
  closePopup(popupAddCard);
  addCardFormValidator.cleanForm();
})

//Submit формы добавления карточки
function handleSubmitAddCard(evt) {
  evt.preventDefault();
  const cardData = {name: formNameCard.value, link: formSourceCard.value};
  const newCard = new Card(cardData, templateSelectorCard);
  elementsList.prepend(newCard.createCard());
  addCardFormValidator.cleanForm();
  closePopup(popupAddCard);
}

formAddCard.addEventListener('submit', handleSubmitAddCard)

//Закрытие попапа с картинкой
closeImageViewer.addEventListener('click', () => {
  closePopup(imageViewer);
})











