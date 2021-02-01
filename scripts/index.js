//initial cards
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

const cardTemplate = document.querySelector("#card-template").content;

// Popup 
const popup = document.querySelector(".popup");
const editForm = popup.querySelector(".profile-form");
const popupCloseButton = popup.querySelector(".popup__button");
const nameField = editForm.querySelector("[name='name'");
const statusField = editForm.querySelector("[name='status'");

const editButton = document.querySelector(".profile__button_type_edit");
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");

const handlePopupClose = () => {
  popup.classList.remove("popup_opened");
  popupCloseButton.removeEventListener("click", handlePopupClose);
  editForm.removeEventListener("submit", handleFormSubmit);
  document.removeEventListener("keydown", handleEscKeyDown);
}

const handleFormSubmit = evt => {
  evt.preventDefault();
  profileName.textContent = nameField.value;
  profileStatus.textContent = statusField.value;
  handlePopupClose();
}

const handleEscKeyDown = evt => {
  if (evt.key === "Escape") {
    handlePopupClose();
  }
}

const handleEditButtonClick = () => {
  popup.classList.add("popup_opened");
  popupCloseButton.addEventListener("click", handlePopupClose);
  editForm.addEventListener("submit", handleFormSubmit);
  document.addEventListener("keydown", handleEscKeyDown);
  nameField.focus(); 
  nameField.value = profileName.textContent;
  statusField.value = profileStatus.textContent;
}



editButton.addEventListener("click", handleEditButtonClick);
