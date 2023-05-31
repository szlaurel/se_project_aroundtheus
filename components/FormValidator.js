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

  _showInputError(input) {
    const errorSpan = this._formElement.querySelector(`#${input.id}-error`);
    const modalInputError = this._formElement.querySelector(
      `#${input.id}-input`
    );
    // add error messsage/class
    console.log(input.validationMessage);
    errorSpan.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
    errorSpan.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    const errorSpan = this._formElement.querySelector(`#${input.id}-error`);
    // add error messsage/class
    errorSpan.textContent = "";
    input.classList.remove(this._inputErrorClass);
    input.classList.remove(this._errorClass);
  }

  _disableButton(submitButton) {
    this._submitButton.disabled = true;
    this._submitButton.classList.add(this._inactiveButtonClass);
  }

  _enableButton(submitButton) {
    this._submitButton.disabled = false;
    this._submitButton.classList.remove(this._inactiveButtonClass);
  }

  _toggleButtonState(inputList, submitButton) {
    if (!this._hasValidInputs(inputList)) {
      this._disableButton(submitButton);
    } else {
      this._enableButton(submitButton);
    }
  }

  resetValidation() {
    this._formElement.reset();
    this._disableButton();
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }

  _hasValidInputs = (inputList) => {
    return this._inputList.every((input) => input.validity.valid === true);
  };

  _checkInputValidity = (input) => {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
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
        this._checkInputValidity(input);
        this._toggleButtonState(this._inputList, this._submitButton);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => evt.preventDefault());
    this._setEventListeners();
    console.log(this);
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
