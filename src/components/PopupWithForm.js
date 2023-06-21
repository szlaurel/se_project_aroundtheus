import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this.popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    super.close();
    this.popupForm.reset();
  }

  _getInputValues() {
    this._inputElements = [...this.popupForm.querySelectorAll(".modal__input")];
    const inputValues = {};
    this._inputElements.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.popupForm.addEventListener("submit", () => {
      this._handleFormSubmit(this._getInputValues());
    });
  }
}

export default PopupWithForm;

/* -------------------------------------------------------------------------- */
/*                                    Notes                                   */
/* -------------------------------------------------------------------------- */

// we need to add the open towards the edit profile button since its supposed to listen for the click, not the modal.