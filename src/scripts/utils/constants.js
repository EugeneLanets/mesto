export const gallerySelector = ".gallery";
export const cardTemplateSelector = ".card-template";

export const imagePopupSelector = ".popup_type_card-picture";
export const profilePopupSelector = ".popup_type_profile-edit";

export const profileEditButtonSelector = ".profile__button_type_edit";
export const profileNameSelector = ".profile__name";
export const profileStatusSelector = ".profile__status";


export const initialCards = [
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

export const validationParams = {
  formSelector: ".modal-form", 
  inputSelector: ".modal-form__field", 
  submitButtonSelector: ".modal-form__submit", 
  inactiveButtonClass: "modal-form__submit_disabled", 
  inputErrorClass: "modal-form__field_invalid", 
  errorClass: "modal-form__error_visible"
};