//CARDS
const initialCards = [
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

gallery.append(...initialCards.map(createCard));


// POPUP
const formTemplate = document.querySelector("#modal-form");
const popup = document.querySelector(".popup");

const profileEditButton = document.querySelector(".profile__button_type_edit");
const cardAddButton = document.querySelector(".profile__button_type_add");

const profileFormData = {
  name: "profile",
  title: "Редактировать профиль",
  inputs: [
    {name: "name", placeholder: "Ваше имя"},
    {name: "status", placeholder: "Пара слов о себе"}
  ],
  buttonName: "Сохранить",
  submitCallback
}

const cardFormData = {
  name: "add-card",
  title: "Новое место",
  inputs: [
    {name: "name", placeholder: "Название"},
    {name: "status", placeholder: "Ссылка на картинку"}
  ],
  buttonName: "Создать",
  submitCallback
}


const createForm = formData => {
  const modalForm = formTemplate.content.cloneNode(true);

  const title = modalForm.querySelector(".modal-form__title");
  const inputs = modalForm.querySelectorAll("input[type=text]");
  const submitButton = modalForm.querySelector(".modal-form__submit");
  const closeButton = modalForm.querySelector(".modal-form__close");

  title.textContent = formData.title;
  inputs.forEach((item, idx) => {
    item.name = formData.inputs[idx].name;
    item.placeholder = formData.inputs[idx].placeholder
  });
  submitButton.textContent = formData.buttonName;

  closeButton.addEventListener("click", closePopup);
  submitButton.addEventListener("submit", )

  return modalForm;
}

const openPopup = formData => {
  popup.append(createForm(formData));
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscPress);
}

const closePopup = () => {
  popup.classList.remove("popup_opened");
  popup.querySelector(".modal-form").remove();
  document.removeEventListener("keydown", handleEscPress);
}

const handleEscPress = evt => {
  if (evt.key === "Escape") {
    closePopup();
  }
}

profileEditButton.addEventListener("click", () => {
  openPopup(profileFormData);
});

cardAddButton.addEventListener("click", () => {
  openPopup(cardFormData);
});

