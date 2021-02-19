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
  const closeButton = popup.querySelector(".popup__close-button");
  popup.classList.add("popup_opened");
  closeButton.addEventListener("click", closePopup);
  document.addEventListener("keydown", handleEscKeyPress);
  popup.addEventListener("click", handleOverlayClick);
}

const closePopup = () => {
  const openedPopup = document.querySelector(".popup_opened");
  openedPopup.classList.add("popup_animation-type_disappear");
  openedPopup.addEventListener("animationend", handlePopupCloseAnimationEnd);
  document.removeEventListener("keydown", handleEscKeyPress);
  openedPopup.removeEventListener("click", handleOverlayClick);
}

const handlePopupCloseAnimationEnd = (evt) => {
  evt.target.classList.remove('popup_opened');
  evt.target.removeEventListener("animationend", handlePopupCloseAnimationEnd);
  evt.target.classList.remove("popup_animation-type_disappear");
}

const handleEscKeyPress = evt => {
  if (evt.key === "Escape") closePopup();
}

const handleOverlayClick = evt => {
  if (evt.target === evt.currentTarget) closePopup();
}

// MODAL
const clearForm = form => {
  form.reset();
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
  closePopup();
  profileEditPopup.removeEventListener("submit", handleProfileEditFormSubmit);
}

const handleProfileEditOpen = () => {
  openPopup(profileEditPopup);
  fillProfileEditFormFields();
  profileEditForm.addEventListener("submit", handleProfileEditFormSubmit);
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
  closePopup();
}

const handleCardAddOpen = () => {
  openPopup(cardAddPopup);
  cardAddForm.addEventListener("submit", handleCardAddFormSubmit);
}

//MAIN
fillProfileEditFormFields();

profileEditButton.addEventListener("click", handleProfileEditOpen);
cardAddButton.addEventListener("click", handleCardAddOpen);

renderGallery(initialCards);