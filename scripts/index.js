//CARDS

const cardTemplate = document.querySelector("#card-template");

const gallery = document.querySelector(".gallery");

const bigPicture = document.querySelector(".popup_type_card-picture");
const bigPictureImage = bigPicture.querySelector(".big-picture__image");
const bigPictureCaption = bigPicture.querySelector(".big-picture__caption");

const updateBigPicture = ({name, link}) => {
  bigPictureImage.src = link;
  bigPictureImage.alt = name;
  bigPictureCaption.textContent = name;
}

const handleImageClick = (evt) => {
  updateBigPicture({name: evt.target.alt, link: evt.target.src});
  openPopup(bigPicture);
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

  deleteButton.addEventListener("click", () => {
    card.remove();
  });

  image.addEventListener("click", handleImageClick);

  return card;
}

const renderCard = (newCard) => {
  gallery.prepend(createCard(newCard));
}

const renderGallery = cards => {
  gallery.append(...cards.map(createCard))
}

// POPUP

const openPopup = popup => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscKeyPress);
}

const closePopup = popup => {
  popup.classList.add("popup_animation-type_disappear");
  popup.addEventListener("animationend", handlePopupCloseAnimationEnd);
  document.removeEventListener("keydown", handleEscKeyPress);
}

const handlePopupCloseAnimationEnd = (evt) => {
  evt.target.classList.remove('popup_opened');
  evt.target.removeEventListener("animationend", handlePopupCloseAnimationEnd);
  evt.target.classList.remove("popup_animation-type_disappear");
}

const handleEscKeyPress = evt => {
  if (evt.key === "Escape") closePopup();
}

// MODAL
const popups = document.querySelectorAll(".popup");

const clearForm = form => {
  form.reset();
}

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }

    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  })
})

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
  renderCard(newCard);
  clearForm(cardAddForm);
  closePopup(cardAddPopup);
}

const handleCardAddOpen = () => {
  openPopup(cardAddPopup);
}

//MAIN
fillProfileEditFormFields();

profileEditButton.addEventListener("click", handleProfileEditOpen);
cardAddButton.addEventListener("click", handleCardAddOpen);

profileEditForm.addEventListener("submit", handleProfileEditFormSubmit);
cardAddForm.addEventListener("submit", handleCardAddFormSubmit);

renderGallery(initialCards);