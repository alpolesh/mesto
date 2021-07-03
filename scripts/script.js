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

// Открытие формы редактирования профиля
editButton.addEventListener('click', () => {
  popupEdit.classList.add('popup_opened');
  formNameEdit.value = profileName.textContent;
  formDescriptionEdit.value = profileDescription.textContent;
});

// Закрытие формы редактирования профиля при нажатии на крестик
closeButtonEdit.addEventListener('click', () => {
  popupEdit.classList.remove('popup_opened');
  formNameEdit.value = '';
  formDescriptionEdit.value = '';
})

// Submit формы редактирования профиля
formEdit.addEventListener('submit', handleSubmitEdit)

function handleSubmitEdit(evt) {
  evt.preventDefault();
  profileName.textContent = formNameEdit.value;
  profileDescription.textContent = formDescriptionEdit.value;
  popupEdit.classList.remove('popup_opened');
}

// изначальный массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

//рендер карточек
function renderCards(initialCards) {
  initialCards.forEach((card) => {
    const element = cardElement.cloneNode(true);
    element.querySelector('.elements__image').src = card.link;
    element.querySelector('.elements__image').alt = card.name;
    element.querySelector('.elements__name').textContent = card.name;
    elementsList.prepend(element);
  })
  
}

renderCards(initialCards)

//открытие формы добавления карточки
addButton.addEventListener('click', () => {
  popupAddCard.classList.add('popup_opened');
})

//закрытие формы добавления карточки
closeButtonAddCard.addEventListener('click', () => {
  popupAddCard.classList.remove('popup_opened');
  formNameCard.value = '';
  formSourceCard.value = '';
})

//Submit формы добавления карточки
formAddCard.addEventListener('submit', handleSubmitAddCard)

function handleSubmitAddCard(evt) {
  evt.preventDefault();
  const element = cardElement.cloneNode(true);
  element.querySelector('.elements__image').src = formSourceCard.value;
  element.querySelector('.elements__image').alt = formNameCard.value;
  element.querySelector('.elements__name').textContent = formNameCard.value;
  elementsList.prepend(element);
  formNameCard.value = '';
  formSourceCard.value = '';
  popupAddCard.classList.remove('popup_opened');
}

//Лайк карточки
elementsList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('elements__heart')) {
    evt.target.classList.toggle('elements__heart_active');
  }
})

//Удаление карточки
elementsList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('elements__trash')) {
    evt.target.closest('.elements__element').remove();
  }
})





