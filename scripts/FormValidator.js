//left off at 30 mins in the video

//In order for the code to work you need to implement its use by importing it into the index.js document and calling upon the FormValidator by using new FormValidator and making it belong to an object

//From researching and watching the video again, the old code is below the formValidator.enableValidation VVVV

/* -------------------------------------------------------------------------- */
/*                      Class FormValidator and its code                      */
/* -------------------------------------------------------------------------- */

class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._formElement = formElement;
    console.log(this);
  }

  _showInputError(input, formEl) {
    const errorSpan = formEl.querySelector(`#${input.id}-error`);
    const modalInputError = formEl.querySelector(`#${input.id}-input`);
    // add error messsage/class
    console.log(input.validationMessage);
    errorSpan.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
    errorSpan.classList.add(this._errorClass);
  }

  _hideInputError(input, formEl) {
    const errorSpan = formEl.querySelector(`#${input.id}-error`);
    // add error messsage/class
    errorSpan.textContent = "";
    input.classList.remove(this._inputErrorClass);
    input.classList.remove(this._errorClass);
  }

  disableButton(submitButton) {
    submitButton.disabled = true;
    submitButton.classList.add(this._inactiveButtonClass);
  }

  enableButton(submitButton) {
    submitButton.disabled = false;
    submitButton.classList.remove(this._inactiveButtonClass);
  }

  toggleButtonState(inputList, submitButton) {
    if (!this._hasValidInputs(inputList)) {
      this.disableButton(submitButton);
    } else {
      this.enableButton(submitButton);
    }
  }

  _hasValidInputs = (inputList) => {
    return this._inputList.every((input) => input.validity.valid === true);
  };

  _checkInputValidity = (formEl, input, options) => {
    if (input.validity.valid) {
      hideInputError(input, formEl, options);
    } else {
      showInputError(input, formEl, options);
    }
  };

  _setEventListeners() {
    this._inputList = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input, this._formElement);
        this._toggleButtonState(this._inputList, this._submitButton);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => evt.preventDefault());
    this._setEventListeners();
  }
}

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const formElement = document.querySelector(settings.formSelector);
const formValidator = new FormValidator(settings, formElement);
formValidator.enableValidation();

export default FormValidator;
