const hasInvalidInput = inputsList => inputsList.some(inputElement => !inputElement.validity.valid);

const toggleButtonState = (inputsList, buttonElement, {inactiveButtonClass}) => {
  if (hasInvalidInput(inputsList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

const showError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const errorMessageElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorMessageElement.classList.add(errorClass);
  errorMessageElement.textContent = inputElement.validationMessage;

  inputElement.classList.add(inputErrorClass);
}

const hideError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const errorMessageElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorMessageElement.classList.remove(errorClass);
  errorMessageElement.textContent = "";

  inputElement.classList.remove(inputErrorClass);
}



const checkInputValidity = (formElement, inputElement, options) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, options);
  } else {
    hideError(formElement, inputElement, options);
  }
}

const setEventListeners = (formElement, options) => {
  const inputsList = [...formElement.querySelectorAll(options.inputSelector)];
  const submitButton = formElement.querySelector(options.submitButtonSelector);

  toggleButtonState(inputsList, submitButton, options);
  inputsList.forEach(inputElement => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputsList, submitButton, options);
    });
      
  });
}

const enableValidation = (options) => {
  const formsList = [...document.querySelectorAll(options.formSelector)];
  
  formsList.forEach(formElement => {
    setEventListeners(formElement, options);
  })
}

const validationParams = {
  formSelector: ".modal-form", 
  inputSelector: ".modal-form__field", 
  submitButtonSelector: ".modal-form__submit", 
  inactiveButtonClass: "modal-form__submit_disabled", 
  inputErrorClass: "modal-form__field_invalid", 
  errorClass: "modal-form__error_visible"
};

enableValidation(validationParams);