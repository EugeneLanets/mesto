//CARDS
let cards = [...initialCards]; 

const cardTemplate = document.querySelector("#card-template");

const gallery = document.querySelector(".gallery");
const cardsCollection = gallery.children;

const updateBigPicture = ({name, link}) => {
  bigPictureImage.src = link;
  bigPictureImage.alt = name;
  bigPictureCaption.textContent = name;
}

const handleImageClick = (evt) => {
  evt.preventDefault();
  const card = evt.target.closest(".card");
  const cardIdx = [...cardsCollection].findIndex(item => item === card);
  handlePopupInnerOpen(bigPicture);
  updateBigPicture(cards[cardIdx]);
  popup.classList.add("popup_type_dark");
}

const createCard = ({name, link}) => {
  const card = cardTemplate.content.querySelector(".card").cloneNode(true);
  const image = card.querySelector(".card__image");
  const title = card.querySelector(".card__text");
  const likeButton = card.querySelector(".card__like");
  const deleteButton = card.querySelector(".card__delete");

  image.src = link;
  image.alt = name;
  title.textContent = name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like_active");
    likeButton.blur();
  });

  deleteButton.addEventListener("click", (evt) => {
    const removingIdx = [...cardsCollection].findIndex(item => item === card);
    cards = cards.filter((item, idx) => idx !== removingIdx);
    card.remove();
  });

  image.addEventListener("click", handleImageClick);

  return card;
}

const addCard = (newCard) => {
  gallery.prepend(createCard(newCard));
  cards = [newCard].concat(cards);
}

const renderGallery = cards => {
  gallery.append(...cards.map(createCard))
}

// POPUP
const popup = document.querySelector(".popup");
const popupInnerElements = popup.querySelectorAll(".popup__inner");

const handleEscPress = evt => {
  if (evt.key === "Escape") {
    closePopup();
  }
};

const handleOverlayClick = (evt) => {
  if (evt.target === evt.currentTarget) closePopup();
}

const openPopup = () => {
  popup.classList.add("popup_opened");
  popup.classList.remove("popup_animation-type_disappear");
  document.addEventListener("keydown", handleEscPress);
  popup.querySelector(".popup__close-button").addEventListener("click", closePopup);
  popup.addEventListener("click", handleOverlayClick);
}

const closePopup = () => {
  popup.classList.add("popup_animation-type_disappear");  
  popup.addEventListener("animationend", onPopupCloseAnimationEnd);
  popup.removeEventListener("click", handleOverlayClick);
  document.removeEventListener("keydown", handleEscPress);
  clearForm(cardAddForm);
}

const onPopupCloseAnimationEnd = () => {
  popup.classList.remove("popup_opened");
  popup.classList.remove("popup_type_dark");
  popupInnerElements.forEach(elem => {
    elem.classList.remove("popup__inner_visible");
  })
  popup.removeEventListener("animationend", onPopupCloseAnimationEnd);
}

const handlePopupInnerOpen = (inner) => {
  openPopup();
  inner.classList.add("popup__inner_visible");
}

// MODAL
const bigPicture = popup.querySelector(".big-picture");
const bigPictureImage = bigPicture.querySelector(".big-picture__image");
const bigPictureCaption = bigPicture.querySelector(".big-picture__caption");

const profileEditButton = document.querySelector(".profile__button_type_edit");
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");

const profileEditForm = popup.querySelector('.modal-form_type_profile-edit');
const [profileNameField, profileStatusField] = profileEditForm.querySelectorAll(".modal-form__field");

const clearForm = (form) => {
  form.reset();
};

const fillProfileEditForm = () => {
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
  closePopup();
}



const cardAddButton = document.querySelector(".profile__button_type_add");
const cardAddForm = popup.querySelector(".modal-form_type_card-add");
const [newCardName, newCardLink] = cardAddForm.querySelectorAll(".modal-form__field");

const handleCardAddFormSubmit = (evt) => {
  evt.preventDefault();
  addCard({name: newCardName.value, link: newCardLink.value});
  clearForm(evt.target);
  closePopup();
}

//MAIN
profileEditButton.addEventListener("click", () => {
  handlePopupInnerOpen(profileEditForm);
  fillProfileEditForm();
});
profileEditForm.addEventListener("submit", handleProfileEditFormSubmit);

cardAddButton.addEventListener("click", () => {
  handlePopupInnerOpen(cardAddForm);
})
cardAddForm.addEventListener("submit", handleCardAddFormSubmit);

renderGallery(initialCards);

