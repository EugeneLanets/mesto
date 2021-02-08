//CARDS
let cards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const cardTemplate = document.querySelector("#card-template");

const gallery = document.querySelector(".gallery");
const cardsCollection = gallery.children;

const handleImageClick = (evt) => {
  evt.preventDefault();
  const card = evt.target.closest(".card");
  const cardIdx = [...cardsCollection].findIndex(item => item === card);
  renderPopupInner(createBigPicture(cards[cardIdx]));
  openPopup();
  popup.classList.add("popup_type_dark");
}

const createBigPicture = ({name, link}) => {
  const bigPicture = bigPictureTemplate.content.querySelector(".big-picture").cloneNode(true);
  const image = bigPicture.querySelector(".big-picture__image");
  const caption = bigPicture.querySelector(".big-picture__caption");

  image.src = link;
  image.alt = name;
  caption.textContent = name;
  
  return bigPicture;
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

const addCard = (cardData) => {
  const newCard = {
    name: cardData.name,
    link: cardData.secondary
  }
  gallery.prepend(createCard(newCard));
  cards = [newCard].concat(cards);
}

const renderGallery = cards => {
  gallery.append(...cards.map(createCard))
}

// POPUP
const popup = document.querySelector(".popup");

const handleEscPress = evt => {
  if (evt.key === "Escape") {
    closePopup();
  }
};

const openPopup = () => {
  popup.classList.add("popup_opened");
  popup.classList.remove("popup_animation-type_disappear");
  
  document.addEventListener("keydown", handleEscPress);
  document.querySelector(".popup__close-button").addEventListener("click", closePopup);
  popup.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) closePopup();
  })
}

const closePopup = () => {
  popup.classList.add("popup_animation-type_disappear");  
  popup.addEventListener("animationend", onPopupCloseAnimationEnd);
  document.removeEventListener("keydown", handleEscPress);
}

const renderPopupInner = elem => {
  popup.append(elem);
}

const onPopupCloseAnimationEnd = () => {
  popup.classList.remove("popup_opened");
  popup.classList.remove("popup_type_dark");
  popup.innerHTML = "";
  popup.removeEventListener("animationend", onPopupCloseAnimationEnd);
}

// MODAL
const formTemplate = document.querySelector("#modal-form");
const bigPictureTemplate = document.querySelector("#big-picture-template");

const profileEditButton = document.querySelector(".profile__button_type_edit");
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");

const cardAddButton = document.querySelector(".profile__button_type_add");

const profileFormData = {
  name: "profile",
  title: "Редактировать профиль",
  inputs: [
    {name: "username", placeholder: "Ваше имя"},
    {name: "status", placeholder: "Пара слов о себе"}
  ],
  buttonName: "Сохранить",
}

const cardFormData = {
  name: "add-card",
  title: "Новое место",
  inputs: [
    {name: "place-name", placeholder: "Название"},
    {name: "link", placeholder: "Ссылка на картинку"}
  ],
  buttonName: "Создать",
}

const handleModalFormSubmit = evt => {
  evt.preventDefault();
  const modalForm = evt.target;
  const [nameField, secondaryField] = modalForm.querySelectorAll("input[type=text");
  modalFormSubmitCallbacks[evt.target.name]({name: nameField.value, secondary: secondaryField.value})

  closePopup()
}

const handleModalFormOpen = (formData) => {
  renderPopupInner(createModalForm(formData));
  openPopup();
}

const createModalForm = formData => {
  const modalForm = formTemplate.content.cloneNode(true);

  const form = modalForm.querySelector(".modal-form");
  const title = modalForm.querySelector(".modal-form__title");
  const inputs = modalForm.querySelectorAll("input[type=text]");
  const submitButton = modalForm.querySelector(".modal-form__submit");

  form.name = formData.name;
  title.textContent = formData.title;

  inputs.forEach((item, idx) => {
    item.name = formData.inputs[idx].name;
    item.placeholder = formData.inputs[idx].placeholder;
    if (formData.name === "profile") {
      item.value = [profileName, profileStatus][idx].textContent;
    }
  });

  submitButton.textContent = formData.buttonName;
  form.addEventListener("submit", handleModalFormSubmit);
  
  return modalForm;
}

const updateProfile = (profileInfo) => {
  profileName.textContent = profileInfo.name;
  profileStatus.textContent = profileInfo.secondary;
}

const modalFormSubmitCallbacks = {
  "profile": updateProfile,
  "add-card": addCard
}

//MAIN
profileEditButton.addEventListener("click", () => {
  handleModalFormOpen(profileFormData);
});

cardAddButton.addEventListener("click", () => {
  handleModalFormOpen(cardFormData);
});

renderGallery(cards);

