import {initialCards} from './initial-cards.js';

const popupEdit = document.querySelector('.popup-edit');
const formElementEdit = popupEdit.querySelector('.popup__popup-container');
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
}

//Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//Функция очистки формы
function cleanForm(form) {
  form.reset();
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
  element.querySelector('.elements__image').src = imageLink;
  element.querySelector('.elements__image').alt = imageName;
  element.querySelector('.elements__name').textContent = imageName;
  //обработчик лайка карточки
  element.querySelector('.elements__heart').addEventListener('click', (evt) => {
    evt.target.classList.toggle('elements__heart_active');
  })
  //обработчик удаления карточки
  element.querySelector('.elements__trash').addEventListener('click', (evt) => {
    evt.target.closest('.elements__element').remove();
  })
  //обработчик открытия попапа с картинкой
  element.querySelector('.elements__image').addEventListener('click', (evt) => {
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





