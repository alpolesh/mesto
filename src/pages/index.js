import './index.css';
import Api from '../scripts/components/Api.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';
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
    userInfo.setUserId(result._id);
  })
  .catch((err) => {
    console.log(err);
  });  

// Удаление карточки
function deleteCardApi(cardId) {
  return new Api({
    baseUrl: `https://mesto.nomoreparties.co/v1/cohort-27/cards/${cardId}`,
    method: 'DELETE',
    headers: {
      authorization: 'eff72599-eace-4e02-87e0-163764f5ab3c',
      'Content-Type': 'application/json'
    }
  }); 
}

const popupDeleteCardConfirmation = new PopupWithConfirmation(
  constants.popupDeleteConfirmationSelector,
  (cardId) => {
    deleteCardApi(cardId).deleteCard()
      .then((res) => {
        if (res.ok) {
          popupDeleteCardConfirmation.deleteCardLocal();
          return res.json();
        } 
        return Promise.reject(`Ошибка: ${res.status}`)
      })
      .catch((err) => console.log(err))
      .finally(() => popupDeleteCardConfirmation.close())
  }
)

popupDeleteCardConfirmation.setEventListeners();

// Добавление/удаление лайка
function switchLikeApi(cardId, method) {
  return new Api({
    baseUrl: `https://mesto.nomoreparties.co/v1/cohort-27/cards/likes/${cardId}`,
    method: method,
    headers: {
      authorization: 'eff72599-eace-4e02-87e0-163764f5ab3c',
      'Content-Type': 'application/json'
    }
  }); 
}

// Функция генерации карточки
function createCard(item) {
  const card = new Card(
    item, 
    constants.templateSelectorCard, 
    {
      myUserId: userInfo.getUserId(),
      handleCardClick: (imageSrc, imageDescription) => fullSizeImage.open(imageSrc, imageDescription),
      handleTrashClick: (cardId, cardElement) => {
        popupDeleteCardConfirmation.open();
        popupDeleteCardConfirmation.setCardId(cardId);
        popupDeleteCardConfirmation.setCardElement(cardElement);
      },
      handleHeartClick: (cardId, isLiked) => {
          switchLikeApi(cardId, isLiked ? 'DELETE' : 'PUT').toggleLike()
          .then((res) => {
            if (res.ok) return res.json();
            return Promise.reject(`Ошибка: ${res.status}`)
          })
          .then((result) => {
            card.updateLikes(result.likes.length);
            card.toggleLike();
          })
          .catch((err) => console.log(err))
      }
    }
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

// Форма изменения информации об юзере
const apiUpdateUserInfo = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27/users/me',
  method: 'PATCH',
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

// Форма добавления карточки
const apiAddNewCard = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27/cards',
  method: 'POST',
  headers: {
    authorization: 'eff72599-eace-4e02-87e0-163764f5ab3c',
    'Content-Type': 'application/json'
  }
}); 

const popupAddForm = new PopupWithForm(
  constants.popupAddCardSelector,
  (evt, formValues) => {
    evt.preventDefault();
    apiAddNewCard.addNewCard(formValues['popup-name'], formValues['popup-description'])
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((card) => {
        const newCard = createCard(card);
        cardList.addNewItem(newCard);
      })
      .catch((err) => console.log(err))
      .finally(() => popupAddForm.close())
  },
  () => {
    addCardFormValidator.cleanForm();
  }
)

popupAddForm.setEventListeners();

// Открытие формы добавления карточки
constants.addButton.addEventListener('click', () => {
  popupAddForm.open();
  addCardFormValidator.disableSubmitButton();
})













