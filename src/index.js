import './pages/index.css';
import Card from './scripts/Card.js';
import FormValidator from './scripts/FormValidator.js';
import {initialCards} from './scripts/initial-cards.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import Section from './scripts/Section.js';
import UserInfo from './scripts/UserInfo.js';

const popupEdit = document.querySelector('.popup-edit');
const formNameEdit = popupEdit.querySelector('.popup__input_type_name');
const formDescriptionEdit = popupEdit.querySelector('.popup__input_type_description');
const formEdit = popupEdit.querySelector('.popup__form');

const popupAddCard = document.querySelector('.popup-add-card');
const formAddCard = popupAddCard.querySelector('.popup__form');
const formNameCard = popupAddCard.querySelector('.popup__input_type_name');
const formSourceCard = popupAddCard.querySelector('.popup__input_type_description');

const profileElement = document.querySelector('.profile');
const editButton = profileElement.querySelector('.profile__edit-button-container');
const addButton = profileElement.querySelector('.profile__add-button-container');
const profileNameSelector = '.profile__name';
const profileDescriptionSelector = '.profile__description';

const templateSelectorCard = '#element-template';

const imageViewer = document.querySelector('.image-viewer');

// Колбэк-функция рендерер для класса Section
const handleCardClick = (imageSrc, imageDescription) => {
  const FullSizeImage = new PopupWithImage(imageSrc, imageDescription, '.image-viewer'); 
  FullSizeImage.open();
  FullSizeImage.setEventListeners();  
}

const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  descriptionSelector: profileDescriptionSelector,
})

// Рендер изначального набора карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(
      item, 
      templateSelectorCard, 
      handleCardClick,
    );
    cardList.addItem(card.createCard());
  }
}, '.elements__list');

cardList.renderItems();

//Запуск валидации для всех форм
const configSelectors = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  inputError: '.popup__input-error',
}

const editFormValidator = new FormValidator(configSelectors, formEdit);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(configSelectors, formAddCard);
addCardFormValidator.enableValidation();

// форма редактирования профиля
const popupEditForm = new PopupWithForm(
  '.popup-edit',
  (evt) => {
    evt.preventDefault();
    userInfo.setUserInfo(formNameEdit.value, formDescriptionEdit.value)
    popupEditForm.close();
  },
  () => {
    editFormValidator.cleanForm();
  }
);
popupEditForm.setEventListeners();

// Открытие формы редактирования профиля
editButton.addEventListener('click', () => {
  popupEditForm.open();
  editFormValidator.enableSubmitButton();
  formNameEdit.value = userInfo.getUserInfo().name;
  formDescriptionEdit.value = userInfo.getUserInfo().description;
});

// форма добавления карточки
const popupAddForm = new PopupWithForm(
  '.popup-add-card',
  (evt) => {
    evt.preventDefault();
    const cardData = {name: formNameCard.value, link: formSourceCard.value};
    const newCard = new Card(cardData, templateSelectorCard, handleCardClick);
    cardList.addItem(newCard.createCard());
    popupAddForm.close();
  },
  () => {
    addCardFormValidator.cleanForm();
  }
)

popupAddForm.setEventListeners();

//открытие формы добавления карточки
addButton.addEventListener('click', () => {
  popupAddForm.open();
  addCardFormValidator.disableSubmitButton();
})












