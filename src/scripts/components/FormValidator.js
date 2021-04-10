class FormValidator {
  constructor(options, formElement) {
    this._options = options;
    this._formElement = formElement;
    this._inputsList = [...this._formElement.querySelectorAll(this._options.inputSelector)];
    this._submitButton = this._formElement.querySelector(this._options.submitButtonSelector);
  }


  _hasInvalidInput() {
    return this._inputsList.some(inputElement => !inputElement.validity.valid);
  }

  _toggleButtonState({inactiveButtonClass}) {
    if (this._hasInvalidInput(this._inputsList)) {
      this._submitButton.classList.add(inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _showError(inputElement, {inputErrorClass, errorClass}) {
    const errorMessageElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  
    errorMessageElement.classList.add(errorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
  
    inputElement.classList.add(inputErrorClass);
  }
  
  _hideError(inputElement, {inputErrorClass, errorClass}) {
    const errorMessageElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    
    if (errorMessageElement) {
      errorMessageElement.classList.remove(errorClass);
      errorMessageElement.textContent = "";
    
      inputElement.classList.remove(inputErrorClass);
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, this._options);
    } else {
      this._hideError(inputElement, this._options);
    }
  }



  _setEventListeners() {
    this._toggleButtonState(this._options);
    this._inputsList.forEach(inputElement => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement, this._options);
        this._toggleButtonState(this._options);
      });      
    });

    this._formElement.addEventListener("reset", () => {
      this._inputsList.forEach(inputElement => {
        this._hideError(inputElement, this._options);
        inputElement.value = ""
      });
      this._toggleButtonState(this._options);
    })
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export default FormValidator;