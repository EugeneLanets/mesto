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
  initialCards, 
  validationParams,
  profilePopupSelector,
  profileEditButtonSelector,
} from "./utils/constants.js";

const userInfo = new UserInfo(profileNameSelector, profileStatusSelector)

const imagePopup = new PopupWithImage(imagePopupSelector);
const profilePopup = new PopupWithForm(profilePopupSelector, (newInfo)=>{
  userInfo.setUserInfo(newInfo);
})



const gallery = new Section({
  items: initialCards,
  renderer: 
    ({name, link}) => {
      const card = new Card({name, link}, cardTemplateSelector, () => {imagePopup.open(name, link)});
      return card.generateCard();
    }
  }, 
  gallerySelector);

const profileEditButton = document.querySelector(profileEditButtonSelector);

gallery.renderItems();
imagePopup.setEventListeners();
profilePopup.setEventListeners();
profileEditButton.addEventListener("click", () => {
  profilePopup.setInputValues(userInfo.getUserInfo());
  profilePopup.open()
});