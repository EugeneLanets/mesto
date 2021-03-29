import '../pages/index.css';

import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithImage from './components/PopupWiithImage';
import PopupWithForm from './components/PopupWithForm';
import Section from './components/Section';
import UserInfo from './components/UserInfo';

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
  initialCards, 
  validationParams,
} from "./utils/constants.js";

const profileEditButton = document.querySelector(profileEditButtonSelector);
const addCardButton = document.querySelector(addCardButtonSelector);
const modalForms = document.querySelectorAll(validationParams.formSelector);

const gallery = new Section({
  items: initialCards,
  renderer: 
    ({name, link}) => {
      const card = new Card({name, link}, cardTemplateSelector, () => {imagePopup.open(name, link)});
      return card.generateCard();
    }
  }, 
  gallerySelector);

const userInfo = new UserInfo(profileNameSelector, profileStatusSelector)

const imagePopup = new PopupWithImage(imagePopupSelector);

const profilePopup = new PopupWithForm(profilePopupSelector, (newInfo) => {
  userInfo.setUserInfo(newInfo);
});

const addCardPopup = new PopupWithForm(addCardPopupSelector, ({name, info}) => {
  const card = new Card({name, link: info}, cardTemplateSelector, () => {imagePopup.open(name, link)});
  gallery.addItem(card.generateCard());

});




const pageInit = () => {
  gallery.renderItems();

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