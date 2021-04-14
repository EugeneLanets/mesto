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
  avatarImgSelector,
  avatarBlockSelector,
  updateAvatarPopupSelector,
  submitLoadingText,
} from "./utils/constants.js";

let gallery;

const profileEditButton = document.querySelector(profileEditButtonSelector);
const addCardButton = document.querySelector(addCardButtonSelector);
const modalForms = document.querySelectorAll(validationParams.formSelector);
const avatarChangeBlock = document.querySelector(avatarBlockSelector);

const userInfo = new UserInfo(profileNameSelector, profileStatusSelector);
const avatarElement = new Avatar(avatarImgSelector);

const imagePopup = new PopupWithImage(imagePopupSelector);

const profilePopup = new PopupWithForm(profilePopupSelector, ({name, about}) => {
  profilePopup.setSubmitText(submitLoadingText);
  api.updateUserInfo({name, about})
    .then(({name, about}) => {
      userInfo.setUserInfo({name, about});
      profilePopup.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      profilePopup.resetSubmitText();
    })
});

const addCardPopup = new PopupWithForm(addCardPopupSelector, ({name, about}) => {
  addCardPopup.setSubmitText(submitLoadingText);
  
  api.addCard({name, link: about})
    .then((cardData) => {
      const card = createCard(cardData);
      gallery.addItem(card);
      addCardPopup.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      addCardPopup.resetSubmitText();
    })
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

const updateAvatarPopup = new PopupWithForm(
  updateAvatarPopupSelector,
  ({about}) => {
    updateAvatarPopup.setSubmitText(submitLoadingText);
    api.updateAvatar({avatar: about})
      .then(({avatar}) => {
        avatarElement.setAvatar(avatar)
        updateAvatarPopup.close();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        updateAvatarPopup.resetSubmitText();
      })
  }
);

const api = new Api(apiParams);

const createCard = (cardData) => {
  const card = new Card(
    cardData, 
    cardTemplateSelector, 
    // handleImageClick
    () => {imagePopup.open(cardData.name, cardData.link)}, 
    // handleCardDelete
    () => {
      deleteCardPopup.open(card);
    },
    // handleCardLike
    (evt) => {
      const method = 
        evt.target.classList.contains("card__like-button_active")
        ? "DELETE"
        : "PUT";
      return api.toggleLike(card.getId(), method);
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
  updateAvatarPopup.setEventListeners();

  profileEditButton.addEventListener("click", () => {
    profilePopup.setInputValues(userInfo.getUserInfo());
    profilePopup.open()
  });

  addCardButton.addEventListener("click", () => {
    addCardPopup.open();
  });

  avatarChangeBlock.addEventListener("click", () => {
    updateAvatarPopup.open();
  })

  modalForms.forEach(modalForm => {
    const modalFormValidator = new FormValidator(validationParams, modalForm);
    modalFormValidator.enableValidation();
  });
}

pageInit();