import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector(".modal-form");
    [this._nameField, this._infoField] = this._form.querySelectorAll(".modal-form__field");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const name = this._nameField.value;
    const info = this._infoField.value;
    return {name, info};
  }

  setInputValues({name, info}) {
    this._nameField.value = name;
    this._infoField.value = info;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}