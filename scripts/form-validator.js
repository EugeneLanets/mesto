class FormValidator {
  constructor(options, formElement) {
    this._options = options;
    this._formElement = formElement;
  }


  _hasInvalidInput(inputsList) {
    return inputsList.some(inputElement => !inputElement.validity.valid);
  }

  _toggleButtonState(inputsList, buttonElement, {inactiveButtonClass}) {
    if (this._hasInvalidInput(inputsList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _showError(formElement, inputElement, {inputErrorClass, errorClass}) {
    const errorMessageElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    errorMessageElement.classList.add(errorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
  
    inputElement.classList.add(inputErrorClass);
  }
  
  _hideError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
    const errorMessageElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    errorMessageElement.classList.remove(errorClass);
    errorMessageElement.textContent = "";
  
    inputElement.classList.remove(inputErrorClass);
  }

  _checkInputValidity(formElement, inputElement, options) {
    if (!inputElement.validity.valid) {
      this._showError(formElement, inputElement, options);
    } else {
      this._hideError(formElement, inputElement, options);
    }
  }

  _setEventListeners() {
    const inputsList = [...this._formElement.querySelectorAll(this._options.inputSelector)];
    const submitButton = this._formElement.querySelector(this._options.submitButtonSelector);

    this._toggleButtonState(inputsList, submitButton, this._options);
    inputsList.forEach(inputElement => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(this._formElement, inputElement, this._options);
        this._toggleButtonState(inputsList, submitButton, this._options);
      });
      
  });
    
  }

  enableValidation() {
    this._setEventListeners(this._formElement, this._options);
  }
}

export default FormValidator;