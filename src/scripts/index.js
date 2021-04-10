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
  deleteCardPopupSelector,
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

const profilePopup = new PopupWithForm(profilePopupSelector, ({name, about}) => {
  api.updateUserInfo({name, about})
    .then(({name, about}) => {
      userInfo.setUserInfo({name, about});
    })
    .catch(err => {
      console.log(err);
    })
  profilePopup.close();
});

const addCardPopup = new PopupWithForm(addCardPopupSelector, ({name, info}) => {
  api.addCard({name, link: info})
    .then((cardData) => {
      const card = createCard(cardData);
      gallery.addItem(card);
    })
    .catch(err => {
      console.log(err);
    })
  addCardPopup.close();
});

const deleteCardPopup = new PopupWithForm(
  deleteCardPopupSelector,
  (item) => {
    api.deleteCard(item.getId())
      .then(() => {
        item.remove()
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        deleteCardPopup.close();
      })
  }
)

const api = new Api(apiParams);

const createCard = (cardData) => {
  const card = new Card(
    cardData, 
    cardTemplateSelector, 
    () => {imagePopup.open(cardData.name, cardData.link)}, 
    () => {
      deleteCardPopup.open(card);
    },
    userInfo.getUserId()
  );

  return card.generateCard();
}

const getInitialData = () => {
  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, initialCards]) => {
      userInfo.setUserInfo(userData);
      avatarElement.setAvatar(userData.avatar);
      
      gallery = new Section({
        items: initialCards,
        renderer: 
          createCard
        }, 
        gallerySelector);
  
      gallery.renderItems();
    })
    .catch(err => {
      console.log(err);
    })  
} 

const pageInit = () => {
  getInitialData();

  imagePopup.setEventListeners();
  profilePopup.setEventListeners();
  addCardPopup.setEventListeners();
  deleteCardPopup.setEventListeners();

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