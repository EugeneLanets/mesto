import '../pages/index.css';

import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithImage from './components/PopupWiithImage';
import Section from './components/Section';

import { 
  gallerySelector, 
  cardTemplateSelector, 
  initialCards, 
  validationParams, 
  imagePopupSelector
} from "./utils/constants.js";

const imagePopup = new PopupWithImage(imagePopupSelector);

const gallery = new Section({
  items: initialCards,
  renderer: 
    ({name, link}) => {
      const card = new Card({name, link}, cardTemplateSelector, () => {imagePopup.open(name, link)});
      return card.generateCard();
    }
  }, gallerySelector);



gallery.renderItems();