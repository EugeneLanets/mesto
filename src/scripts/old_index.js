import '../pages/index.css';

import FormValidator from "./components/FormValidator.js";
import {validationParams } from "./utils/constants.js";

const modalForms = document.querySelectorAll(validationParams.formSelector);

// profile
const profileEditButton = document.querySelector(".profile__button_type_edit");

const [profileNameField, profileStatusField] = profileEditForm.querySelectorAll("input");

const fillProfileEditFormFields = () => {
  profileNameField.value = profileName.textContent;
  profileStatusField.value = profileStatus.textContent;
}

const updateProfile = () => {
  profileName.textContent = profileNameField.value;
  profileStatus.textContent = profileStatusField.value;
}

const handleProfileEditFormSubmit = (evt) => {
  evt.preventDefault();
  updateProfile();
  closePopup(profileEditPopup);
}

const handleProfileEditOpen = () => {
  openPopup(profileEditPopup);
  fillProfileEditFormFields();
}

// add-card
const cardAddButton = document.querySelector(".profile__button_type_add");

const cardAddPopup = document.querySelector(".popup_type_card-add");
const cardAddForm = cardAddPopup.querySelector(".modal-form");
const [cardNameField, cardLinkField] = cardAddForm.querySelectorAll("input");

const handleCardAddFormSubmit = (evt) => {
  evt.preventDefault();
  const newCard = {
    name: cardNameField.value,
    link: cardLinkField.value
  };
  renderCard(newCard, cardTemplateSelector);
  clearForm(cardAddForm);
  closePopup(cardAddPopup);
  console.log(evt.target);
}

const handleCardAddOpen = () => {
  openPopup(cardAddPopup);
}

//MAIN



const pageInit = () => {
  fillProfileEditFormFields();

  profileEditButton.addEventListener("click", handleProfileEditOpen);
  cardAddButton.addEventListener("click", handleCardAddOpen);

  profileEditForm.addEventListener("submit", handleProfileEditFormSubmit);
  cardAddForm.addEventListener("submit", handleCardAddFormSubmit);

  modalForms.forEach(modalForm => {
    const modalFormValidator = new FormValidator(validationParams, modalForm);
    modalFormValidator.enableValidation();
  })
  
}

pageInit();



