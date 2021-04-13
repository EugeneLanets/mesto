import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector(".modal-form");
    [this._nameField, this._infoField] = this._form.querySelectorAll(".modal-form__field");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._form.querySelector("[type='submit']");
    this._submitInitialText = this._submitButton.textContent;
  }

  _getInputValues() {
    const name = this._nameField.value;
    const about = this._infoField.value;
    return {name, about};
  }

  setSubmitText(text) {
    this._submitButton.textContent = text;
  }

  resetSubmitText() {
    this.setSubmitText(this._submitInitialText);
  }

  setInputValues({name, about}) {
    this._nameField.value = name;
    this._infoField.value = about;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._itemToDelete ? this._itemToDelete : this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  open(item) {
    super.open();
    if (item) {
      this._itemToDelete = item;
    }
  }
}