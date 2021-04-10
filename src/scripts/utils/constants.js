export const gallerySelector = ".gallery";
export const cardTemplateSelector = ".card-template";

export const imagePopupSelector = ".popup_type_card-picture";
export const profilePopupSelector = ".popup_type_profile-edit";
export const addCardPopupSelector = ".popup_type_card-add";
export const deleteCardPopupSelector = ".popup_type_card-delete";
export const updateAvatarPopupSelector =".popup_type_avatar-update";

export const profileEditButtonSelector = ".profile__button_type_edit";
export const profileNameSelector = ".profile__name";
export const profileStatusSelector = ".profile__status";

export const avatarBlockSelector = ".profile__avatar";
export const avatarImgSelector = ".profile__avatar-image";

export const addCardButtonSelector = ".profile__button_type_add";


export const apiParams = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-22',
  headers: {
    authorization: '7117bd29-bed2-418b-8dab-8abdf3e6fab4',
    'Content-Type': 'application/json'
  }

}

export const validationParams = {
  formSelector: ".modal-form", 
  inputSelector: ".modal-form__field", 
  submitButtonSelector: ".modal-form__submit", 
  inactiveButtonClass: "modal-form__submit_disabled", 
  inputErrorClass: "modal-form__field_invalid", 
  errorClass: "modal-form__error_visible"
};