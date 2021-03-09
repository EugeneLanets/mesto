import Card from "./card.js";
import initialCards from "./initial-cards.js";

const cardTemplateSelector = ".card-template";
const gallery = document.querySelector(".gallery");

const renderGallery = (cards, cardTemplate) => {
  gallery.append(...cards.map(
    ({name, link}) => {
      const card = new Card({name, link}, cardTemplate);
      return card.generateCard();
    })
  );
}

renderGallery(initialCards, cardTemplateSelector);