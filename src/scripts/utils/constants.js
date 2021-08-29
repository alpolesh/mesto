export const popupEditSelector = '.popup-edit';
export const popupEdit = document.querySelector(popupEditSelector);
export const formNameEdit = popupEdit.querySelector('.popup__input_type_name');
export const formDescriptionEdit = popupEdit.querySelector('.popup__input_type_description');
export const formEdit = popupEdit.querySelector('.popup__form');

export const popupAddCardSelector = '.popup-add-card';
export const popupAddCard = document.querySelector(popupAddCardSelector);
export const formAddCard = popupAddCard.querySelector('.popup__form');
export const formNameCard = popupAddCard.querySelector('.popup__input_type_name');
export const formSourceCard = popupAddCard.querySelector('.popup__input_type_description');

export const popupDeleteConfirmationSelector = '.popup-delete';
export const popupDeleteConfirmation = document.querySelector(popupDeleteConfirmationSelector);

export const profileElement = document.querySelector('.profile');
export const editButton = profileElement.querySelector('.profile__edit-button-container');
export const addButton = profileElement.querySelector('.profile__add-button-container');
export const profileNameSelector = '.profile__name';
export const profileDescriptionSelector = '.profile__description';
export const profileAvatarSelector = '.profile__avatar';

export const elementsListSelector = '.elements__list';
export const templateSelectorCard = '#element-template';
export const imageViewerSelector = '.image-viewer';

export const configSelectors = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  inputError: '.popup__input-error',
}