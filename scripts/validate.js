const showError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorMessageElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorMessageElement.classList.add(errorClass);
  errorMessageElement.textContent = inputElement.validationMessage;

  inputElement.classList.add(inputErrorClass);
}

const hideError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorMessageElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorMessageElement.classList.remove(errorClass);
  errorMessageElement.textContent = "";

  inputElement.classList.remove(inputErrorClass);
}



const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputErrorClass, errorClass);
  } else {
    hideError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

const setEventListeners = (formElement, inputSelector, inputErrorClass, errorClass) => {
  const inputsList = formElement.querySelectorAll(inputSelector);
  inputsList.forEach(inputElement => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass)});
  });
}

const enableValidation = ({formSelector, inputSelector, submitButtonsSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  console.log("Forms validation enabled");
  const formsList = document.querySelectorAll(formSelector);
  
  formsList.forEach(formElement => {
    setEventListeners(formElement, inputSelector, inputErrorClass, errorClass);
  })
}

enableValidation({
  formSelector: ".modal-form", 
  inputSelector: ".modal-form__field", 
  submitButtonsSelector: "modal-form__submit", 
  inactiveButtonClass: "modal-form__submit_disabled", 
  inputErrorClass: "modal-form__field_invalid", 
  errorClass: "modal-form__error_visible"
});