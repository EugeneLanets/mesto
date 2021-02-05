//CARDS
const cards = [
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

const createCard = ({name, link}) => {
  const card = cardTemplate.content.cloneNode(true);
  const image = card.querySelector(".card__image");
  const title = card.querySelector(".card__text");
  image.src = link;
  image.alt = name;
  title.textContent = name;

  return card;
}

gallery.append(...cards.map(createCard));





// POPUP
const formTemplate = document.querySelector("#modal-form");
const popup = document.querySelector(".popup");

const profileEditButton = document.querySelector(".profile__button_type_edit");
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const cardAddButton = document.querySelector(".profile__button_type_add");

const updateProfile = (profileInfo) => {
  profileName.textContent = profileInfo.name;
  profileStatus.textContent = profileInfo.secondary;
}

const addCard = (cardData) => {
  const newCard = {
    name: cardData.name,
    link: cardData.secondary
  }
  gallery.prepend(createCard(newCard));
  cards.unshift(newCard);
}

const modalFormSubmitCallbacks = {
  "profile": updateProfile,
  "add-card": addCard
}

const createModalForm = formData => {
  const modalForm = formTemplate.content.cloneNode(true);

  const form = modalForm.querySelector(".modal-form");
  const title = modalForm.querySelector(".modal-form__title");
  const inputs = modalForm.querySelectorAll("input[type=text]");
  const submitButton = modalForm.querySelector(".modal-form__submit");
  const closeButton = modalForm.querySelector(".modal-form__close");
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

  closeButton.addEventListener("click", closePopup);
  form.addEventListener("submit", handleFormSubmit);
  
  return modalForm;
}

const renderModalForm = formData => {
  popup.append(createModalForm(formData));
}

const removeModalForm = () => {
  popup.querySelector(".modal-form").remove();
}

const handleFormSubmit = evt => {
  evt.preventDefault();
  const modalForm = evt.target;
  const [nameField, secondaryField] = modalForm.querySelectorAll("input[type=text");
  modalFormSubmitCallbacks[evt.target.name]({name: nameField.value, secondary: secondaryField.value})

  closePopup()
}

const openPopup = formData => {
  renderModalForm(formData);
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscPress);
}

const closePopup = () => {
  popup.classList.remove("popup_opened");
  removeModalForm();
  document.removeEventListener("keydown", handleEscPress);
}

const handleEscPress = evt => {
  if (evt.key === "Escape") {
    closePopup();
  }
}

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

profileEditButton.addEventListener("click", () => {
  openPopup(profileFormData);
});

cardAddButton.addEventListener("click", () => {
  openPopup(cardFormData);
});

