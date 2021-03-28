const handlePopupCloseAnimationEnd = (evt) => {
  evt.target.classList.remove('popup_opened');
  evt.target.removeEventListener("animationend", handlePopupCloseAnimationEnd);
  evt.target.classList.remove("popup_animation-type_disappear");
}

const handleEscKeyPress = evt => {
  if (evt.key === "Escape") { 
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

const openPopup = popup => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscKeyPress);
}

const closePopup = popup => {
  popup.classList.add("popup_animation-type_disappear");
  popup.addEventListener("animationend", handlePopupCloseAnimationEnd);
  document.removeEventListener("keydown", handleEscKeyPress);
}

export {openPopup, closePopup};