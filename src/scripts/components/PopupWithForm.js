import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector(".modal-form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    return [...this._form.querySelectorAll(".modal-form__field")].map(item => item.value);
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener("submit", this._handleFormSubmit);
  }

  close() {
    super.close();
    this._form.reset();
  }
}