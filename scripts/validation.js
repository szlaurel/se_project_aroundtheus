// enabling validation by calling enableValidation()
// pass all the settings on call

const showInputError = (input, formEl, { errorClass }) => {
  const errorSpan = formEl.querySelector(`#${input.id}-error`);
  // add error messsage/class
  console.log(input.validationMessage);
  errorSpan.textContent = input.validationMessage;
  input.classList.add(errorClass);
};

const hideInputError = (input, formEl, { errorClass }) => {
  const errorSpan = formEl.querySelector(`#${input.id}-error`);
  // add error messsage/class
  errorSpan.textContent = " ";
  input.classList.remove(errorClass);
};

const checkInputValidity = (formEl, input, options) => {
  if (input.validity.valid) {
    hideInputError(input, formEl, options);
  } else {
    showInputError(input, formEl, options);
  }
};

const setEventListeners = (formEl, options) => {
  const inputs = [...formEl.querySelectorAll(options.inputSelector)];
  inputs.forEach((input) => {
    input.addEventListener("input", (evt) => {
      // check validity
      checkInputValidity(formEl, input, options);
      // add error message/class

      // toggle the button
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

enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
});

// forms
// inputs forms
// input ===

// tasks
// all thats left to do is to code the button toggle state
