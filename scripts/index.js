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
