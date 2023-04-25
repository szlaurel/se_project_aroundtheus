/* task left for me to
1. I have to be able to click the outside of the overlay to close it and should be able to press the ESCAPE key to leave it too
2. I have to match the styles to the classes within the config const and change them accordingly as i go along
3. Have to test the errorMessageEl after i assign the classes

Classes I need to change still and add their respective styles VVVVVV:

inactiveButtonClass: "popup__button_disabled",
inputErrorClass: "popup__input_type_error",
errorClass: "popup__error_visible",

*/

// enabling validation by calling enableValidation()
// pass all the settings on call

// at 1:03:53 you'll see what i mean for sprint 6 live coding i still have to define errorMessageEl using const, cause if you don't if you use it, it'll just be null

// VVVVV shows the input error if the input doesn't pass the validation test
// if function showInputError is still showing problems then go back to 1:04:00 to take a look at the code again
// theory: its the errorMessageEl not working because nothing has been properly passed through the formEl parameter maybe?
// add the spans to the showInputError and the hideInputError as well

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const { inputErrorClass } = options;
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

// VVVVV hides the input error if the input does pass the validation test

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const { inputErrorClass } = options;
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

// My task to complete this!!!!! you need to add this to the classList.remove(inactiveButtonClass) within the toggleButtonState function
/* function (disableButton) {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
}
*/

//you need to add this to the classList.add(inactiveButtonClass) within the toggleButtonState function
/* function (enableButton) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
    return;
}

*/

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  if (hasInvalidInput(inputEls)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
    return;
  }
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, options);
  }
  hideInputError(formEl, inputEl, options);
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(".modal__button");
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (evt) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton);
    });
  });
}

// VVVVV Allows the submit button to be clicked VVVV

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options);
    // look for all inputs inside of form
    // loop through all the inputs to see if all are valid
    // if input is not valid
    // get the validation message
    // add error class to input (makes it red)
    // display error message
    // disable button
    // if all inputs are valid
    // enable button
    // reset error messages
  });
}

// VVVVV Just a list of objects thats easy to access around the document and its D.R.Y. (don't repeat yourself)

// VVVV need to assign the classes that have popup to them to the specific styles they've been given.

// need to fix inactiveButtonClass, inputErrorClass, errorClass and put them with the write class names and styles they've given on figma and practicum

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(config);
