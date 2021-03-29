export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscPress = this._onEscKeyPress.bind(this);
    this._handleAnimationEnd = this._onPopupCloseAnimationEnd.bind(this);
  }

  _onEscKeyPress(evt) {
    if (evt.key === "Escape") { 
      this.close()
    }
  }

  _onPopupCloseAnimationEnd() {
    this._popup.classList.remove('popup_opened');
    this._popup.removeEventListener("animationend", this._handleAnimationEnd);
    this._popup.classList.remove("popup_animation-type_disappear");
  }

  setEventListeners() {
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
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscPress);
  }

  close() {
    this._popup.classList.add("popup_animation-type_disappear");
    this._popup.addEventListener("animationend", this._handleAnimationEnd);
    document.removeEventListener("keydown", this._handleEscPress);
  }
}