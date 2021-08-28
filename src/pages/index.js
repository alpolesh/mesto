import './index.css';
import Api from '../scripts/components/Api.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
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
  avatarSelector: constants.profileAvatarSelector,
})

// Получение информации об юзере от сервера
const apiUserInfo = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-27/users/me',
  headers: {
    authorization: 'eff72599-eace-4e02-87e0-163764f5ab3c',
    'Content-Type': 'application/json'
  }
}); 

apiUserInfo.getUserInfo()
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((result) => {
    userInfo.setUserInfo(result.name, result.about);
    userInfo.setUserAvatar(result.avatar);
  })
  .catch((err) => {
    console.log(err);
  });  

function createCard(item) {
  const card = new Card(
    item, 
    constants.templateSelectorCard, 
    (imageSrc, imageDescription) => fullSizeImage.open(imageSrc, imageDescription)
  );
  return card.generateCard()
}

// Рендер изначального набора карточек
const apiInitialCards = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27/cards',
  headers: {
    authorization: 'eff72599-eace-4e02-87e0-163764f5ab3c',
    'Content-Type': 'application/json'
  }
}); 

const cardList = new Section(
  (item) => {
    const card = createCard(item);
    cardList.addItem(card);
  }, 
  constants.elementsListSelector);

apiInitialCards.getInitialCards()
  .then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((cards) => {
    cardList.renderItems(cards);    
  })
  .catch((err) => {
    console.log(err);
  }); 

//Запуск валидации для всех форм
const editFormValidator = new FormValidator(constants.configSelectors, constants.formEdit);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(constants.configSelectors, constants.formAddCard);
addCardFormValidator.enableValidation();

// форма редактирования профиля
const apiUpdateUserInfo = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27/users/me',
  headers: {
    authorization: 'eff72599-eace-4e02-87e0-163764f5ab3c',
    'Content-Type': 'application/json'
  }
}); 

const popupEditForm = new PopupWithForm(
  constants.popupEditSelector,
  (evt, formValues) => {
    evt.preventDefault();
    apiUpdateUserInfo.updateUserInfo(formValues['popup-name'], formValues['popup-description'])
      .then((res) => {
        if(res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        userInfo.setUserInfo(result.name, result.about);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => popupEditForm.close());
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













