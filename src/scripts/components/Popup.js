export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._setEventListeners();
  }

  _handleEscKeyPress(evt) {
    if (evt.key === "Escape") { 
      this.close()
    }
  }

  _setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
  
      if (evt.target.classList.contains("popup__close-button")) {
        this.close();
      }
    })
  }

  open() {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscKeyPress);
  }

  close() {
    this._popup.classList.add("popup_animation-type_disappear");
    this._popup.addEventListener("animationend", handlePopupCloseAnimationEnd);
    document.removeEventListener("keydown", this._handleEscKeyPress);
  }
}