import '../pages/index.css';
import Api from './components/Api.js';
import Avatar from './components/Avatar.js';

import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithImage from './components/PopupWiithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import Section from './components/Section.js';
import UserInfo from './components/UserInfo.js';

import { 
  gallerySelector, 
  cardTemplateSelector,  
  imagePopupSelector,
  profileNameSelector, 
  profileStatusSelector,
  profilePopupSelector,
  profileEditButtonSelector,
  addCardPopupSelector,
  addCardButtonSelector,
  validationParams,
  apiParams,
} from "./utils/constants.js";

let gallery;

const profileEditButton = document.querySelector(profileEditButtonSelector);
const addCardButton = document.querySelector(addCardButtonSelector);
const modalForms = document.querySelectorAll(validationParams.formSelector);

const userInfo = new UserInfo(profileNameSelector, profileStatusSelector);
const avatarElement = new Avatar(".profile__avatar");

const imagePopup = new PopupWithImage(imagePopupSelector);

const profilePopup = new PopupWithForm(profilePopupSelector, ({name, info}) => {
  api.updateUserInfo({name, about: info})
    .then(({name, about}) => {
      userInfo.setUserInfo({name, info: about});
    })
    .catch(err => {
      console.log(err);
    })

});

const addCardPopup = new PopupWithForm(addCardPopupSelector, ({name, info}) => {
  const card = new Card({name, link: info}, cardTemplateSelector, () => {imagePopup.open(name, link)});
  gallery.addItem(card.generateCard());

});

const api = new Api(apiParams);

const getDataFromServer = () => {
  api.getInitialCards()
  .then(initialCards => {
    gallery = new Section({
      items: initialCards,
      renderer: 
        ({name, link}) => {
          const card = new Card({name, link}, cardTemplateSelector, () => {imagePopup.open(name, link)});
          return card.generateCard();
        }
      }, 
      gallerySelector);

    gallery.renderItems();
  })
  .catch(err => {
    console.log(err);
  });

  api.getUserInfo()
    .then(({name, about, avatar}) => {
      userInfo.setUserInfo({name, info: about});
      avatarElement.setAvatar(avatar);
    })
    .catch(err => {
      console.log(err);
    })
} 

const pageInit = () => {
  getDataFromServer();

  imagePopup.setEventListeners();
  profilePopup.setEventListeners();
  addCardPopup.setEventListeners();

  profileEditButton.addEventListener("click", () => {
    profilePopup.setInputValues(userInfo.getUserInfo());
    profilePopup.open()
  });

  addCardButton.addEventListener("click", () => {
    addCardPopup.open();
  });

  modalForms.forEach(modalForm => {
    const modalFormValidator = new FormValidator(validationParams, modalForm);
    modalFormValidator.enableValidation();
  });
}

pageInit();