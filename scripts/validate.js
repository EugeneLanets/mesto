const enableValidation = ({formSelector, inputSelector, submitButtonsSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  console.log("hi");
}

enableValidation({
  formSelector: ".modal-form", 
  inputSelector: ".modal-form__field", 
  submitButtonsSelector: "modal-form__submit", 
  inactiveButtonClass: "modal-form__submit_disabled", 
  inputErrorClass: "modal-form__field_invalid", 
  errorClass: "modal-form__error_visible"
});