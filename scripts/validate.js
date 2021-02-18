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



const checkInputValidity = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, {inputErrorClass, errorClass});
  } else {
    hideError(formElement, inputElement, {inputErrorClass, errorClass});
  }
}

const setEventListeners = (formElement, {inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass}) => {
  const inputsList = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector(submitButtonSelector);

  inputsList.forEach(inputElement => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, {inputErrorClass, errorClass});
      toggleButtonState(inputsList, submitButton, {inactiveButtonClass});
    });
      
  });
}

const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  console.log("Forms validation enabled");
  const formsList = [...document.querySelectorAll(formSelector)];
  
  formsList.forEach(formElement => {
    formElement.addEventListener("submit", evt => {
      evt.preventDefault();
    })
    setEventListeners(formElement, {inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass});
  })
}

enableValidation({
  formSelector: ".modal-form", 
  inputSelector: ".modal-form__field", 
  submitButtonSelector: ".modal-form__submit", 
  inactiveButtonClass: "modal-form__submit_disabled", 
  inputErrorClass: "modal-form__field_invalid", 
  errorClass: "modal-form__error_visible"
});