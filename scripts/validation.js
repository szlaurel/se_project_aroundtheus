// enabling validation by calling enableValidation()
// pass all the settings on call

// shows the input error if the input doesn't pass validation

const showInputError = (input, formEl, { inputErrorClass, errorClass }) => {
  const errorSpan = formEl.querySelector(`#${input.id}-error`);
  const modalInputError = formEl.querySelector(`#${input.id}-input`);
  // add error messsage/class
  console.log(input.validationMessage);
  errorSpan.textContent = input.validationMessage;
  input.classList.add(inputErrorClass);
  errorSpan.classList.add(errorClass);
};

//hides the input error

const hideInputError = (input, formEl, { inputErrorClass, errorClass }) => {
  const errorSpan = formEl.querySelector(`#${input.id}-error`);
  // add error messsage/class
  errorSpan.textContent = " ";
  input.classList.remove(inputErrorClass);
  input.classList.remove(errorClass);
};

//checks to see if the inputs are valid and if their not they'll show error signs
const checkInputValidity = (formEl, input, options) => {
  if (input.validity.valid) {
    hideInputError(input, formEl, options);
  } else {
    showInputError(input, formEl, options);
  }
};

// looks to see if all the inputs are valid
const hasValidInputs = (inputList) => {
  return inputList.every((input) => input.validity.valid === true);
};

function disableButton(submitButton, options) {
  submitButton.disabled = true;
  submitButton.classList.add(options.inactiveButtonClass);
}
function enableButton(submitButton, options) {
  submitButton.disabled = false;
  submitButton.classList.remove(options.inactiveButtonClass);
}

const toggleButtonState = (inputList, submitButton, options) => {
  // console.log("hasValid", hasValidInputs(inputList));
  // if all inputs are valid
  if (!hasValidInputs(inputList)) {
    disableButton(submitButton, options);
    // make button disabled
  } else {
    enableButton(submitButton, options);
    // make button enabled
  }
};

const setEventListeners = (formEl, options) => {
  const inputList = [...formEl.querySelectorAll(options.inputSelector)];
  const submitButton = formEl.querySelector(options.submitButtonSelector);
  inputList.forEach((input) => {
    toggleButtonState(inputList, submitButton, options);
    input.addEventListener("input", (evt) => {
      // check validity
      checkInputValidity(formEl, input, options);
      // add error message/class
      // toggle the button
      toggleButtonState(inputList, submitButton, options);
    });
  });
};

const enableValidation = (options) => {
  const formElements = [...document.querySelectorAll(options.formSelector)];
  formElements.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => evt.preventDefault());
    setEventListeners(formEl, options);
  });
};

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);

// forms
// inputs forms
// input ===

// tasks:
