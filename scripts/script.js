let formElement = document.querySelector('.popup__popup-container');
let profileElement = document.querySelector('.profile');
let editButton = profileElement.querySelector('.profile__edit-button-container');
let closeButton = formElement.querySelector('.popup__close-icon');
let popup = document.querySelector('.popup');
let formName = formElement.querySelector('.popup__input_type_name');
let formDescription = formElement.querySelector('.popup__input_type_description');
let profileName = profileElement.querySelector('.profile__name');
let profileDescription = profileElement.querySelector('.profile__description');
let saveButton = formElement.querySelector('.popup__submit');
// Submit в форме по кнопке Enter
let enterListener = function(evt) {
  if (evt.code == 'Enter') {
    saveButton.click();
  }
}

// Открытие формы
editButton.addEventListener('click', () => {
  popup.classList.add('popup_opened');
  formName.value = profileName.textContent;
  formDescription.value = profileDescription.textContent;
  document.addEventListener('keydown', enterListener);
});

// Закрытие формы при нажатии на крестик
closeButton.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
  formName.value = '';
  formDescription.value = '';
})

// Submit формы 
formElement.addEventListener('submit', handleSubmit)

function handleSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileDescription.textContent = formDescription.value;
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', enterListener, false);
}

