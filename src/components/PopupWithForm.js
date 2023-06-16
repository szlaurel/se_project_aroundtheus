import Popup from "./Popup.js";
import UserInfo from "./UserInfo.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this.popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this.popupForm.reset();
    super.close();
  }

  open() {
    super.open();
  }

  _getInputValues() {}

  setEventListeners() {
    super.setEventListeners();
    this._handleFormSubmit.addEventListener("submit", () => {});
  }

  setUserInfo() {
    super.setUserInfo();
  }
}

export default PopupWithForm;
