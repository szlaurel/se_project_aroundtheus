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

  open() {
    super.open();
  }

  //testing out code to see if this is right VVVV

  _getInputValues({ name, job }) {
    (this._name.input = name.input), (this._job.input = job.input);
  }

  setEventListeners() {
    super.setEventListeners();
    this._handleFormSubmit.addEventListener("submit", () => {});
  }
}

export default PopupWithForm;
