import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit, handleImageSubmit }) {
    super({ popupSelector });
    this.popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._handleImageSubmit = handleImageSubmit;
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
  //this where the code for changing the save button to say "Saving..." goes

  setEventListeners() {
    super.setEventListeners();
    this.popupForm.addEventListener("submit", () => {
      this._handleFormSubmit(this._getInputValues());
    });
  }

  updateProfileImageEventListeners() {
    this.submitPicture = document.querySelector(".profile__image");
    this.popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}

export default PopupWithForm;

/* -------------------------------------------------------------------------- */
/*                                    Notes                                   */
/* -------------------------------------------------------------------------- */

// we need to add the open towards the edit profile button since its supposed to listen for the click, not the modal.

// need to add the code functionality for the update profile card here
