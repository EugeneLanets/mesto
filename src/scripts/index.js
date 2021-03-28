import '../pages/index.css';

import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import { initialCards, validationParams } from "./utils/options.js";
import { openPopup, closePopup } from "./components/popup2.js";

const cardTemplateSelector = ".card-template";
const gallery = document.querySelector(".gallery");
const popups = document.querySelectorAll(".popup");
const modalForms = document.querySelectorAll(validationParams.formSelector);

const renderGallery = (cards, cardTemplate) => {
  gallery.append(...cards.map(
    ({name, link}) => {
      const card = new Card({name, link}, cardTemplate, handleImageClick);
      return card.generateCard();
    })
  );
}

const renderCard = (newCard, cardTemplate) => {
  const card = new Card(newCard, cardTemplate, handleImageClick);
  gallery.prepend(card.generateCard());
}



// MODAL

const clearForm = form => {
  form.reset();
}

// CARD POPUP

const bigPicture = document.querySelector(".popup_type_card-picture");
const bigPictureImage = bigPicture.querySelector(".big-picture__image");
const bigPictureCaption = bigPicture.querySelector(".big-picture__caption");

const updateBigPicture = (name, link) => {
  bigPictureImage.src = link;
  bigPictureImage.alt = name;
  bigPictureCaption.textContent = name;
}

const handleImageClick = (name, link) => {
  updateBigPicture(name, link);
  openPopup(bigPicture);
}

// profile
const profileEditButton = document.querySelector(".profile__button_type_edit");
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");

const profileEditPopup = document.querySelector(".popup_type_profile-edit");
const profileEditForm = profileEditPopup.querySelector(".modal-form");
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
  popups.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        closePopup(popup);
      }
  
      if (evt.target.classList.contains("popup__close-button")) {
        closePopup(popup);
      }
    })
  });

  profileEditButton.addEventListener("click", handleProfileEditOpen);
  cardAddButton.addEventListener("click", handleCardAddOpen);

  profileEditForm.addEventListener("submit", handleProfileEditFormSubmit);
  cardAddForm.addEventListener("submit", handleCardAddFormSubmit);

  modalForms.forEach(modalForm => {
    const modalFormValidator = new FormValidator(validationParams, modalForm);
    modalFormValidator.enableValidation();
  })
  
  renderGallery(initialCards, cardTemplateSelector);
}

pageInit();



