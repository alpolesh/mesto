import './index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import {initialCards} from '../scripts/utils/initial-cards.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import * as constants from '../scripts/utils/constants.js';

const fullSizeImage = new PopupWithImage(constants.imageViewerSelector); 
fullSizeImage.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: constants.profileNameSelector,
  descriptionSelector: constants.profileDescriptionSelector,
})

function createCard(item) {
  const card = new Card(
    item, 
    constants.templateSelectorCard, 
    (imageSrc, imageDescription) => fullSizeImage.open(imageSrc, imageDescription)
  );
  return card.generateCard()
}

// Рендер изначального набора карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    cardList.addItem(card);
  }
}, constants.elementsListSelector);

cardList.renderItems();

//Запуск валидации для всех форм
const editFormValidator = new FormValidator(constants.configSelectors, constants.formEdit);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(constants.configSelectors, constants.formAddCard);
addCardFormValidator.enableValidation();

// форма редактирования профиля
const popupEditForm = new PopupWithForm(
  constants.popupEditSelector,
  (evt, formValues) => {
    evt.preventDefault();
    userInfo.setUserInfo(formValues['popup-name'], formValues['popup-description']);
    popupEditForm.close();
  },
  () => {
    editFormValidator.cleanForm();
  }
);
popupEditForm.setEventListeners();

// Открытие формы редактирования профиля
constants.editButton.addEventListener('click', () => {
  popupEditForm.open();
  editFormValidator.enableSubmitButton();
  constants.formNameEdit.value = userInfo.getUserInfo().name;
  constants.formDescriptionEdit.value = userInfo.getUserInfo().description;
});

// форма добавления карточки
const popupAddForm = new PopupWithForm(
  constants.popupAddCardSelector,
  (evt, formValues) => {
    evt.preventDefault();
    const cardData = {name: formValues['popup-name'], link: formValues['popup-description']};
    const newCard = createCard(cardData);
    cardList.addItem(newCard);
    popupAddForm.close();
  },
  () => {
    addCardFormValidator.cleanForm();
  }
)

popupAddForm.setEventListeners();

//открытие формы добавления карточки
constants.addButton.addEventListener('click', () => {
  popupAddForm.open();
  addCardFormValidator.disableSubmitButton();
})












