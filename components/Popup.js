import { closePopUp } from "../utils/utils.js";

class Popup {
  constructor({ popupSelector }) {
    console.log(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal__opened");
  }

  close() {
    this._popupElement.classList.remove("modal__opened");
  }

  _handleEscClose() {
    if (evt.key === "Escape") {
      // search for an opened modal
      const openedModal = document.querySelector(".modal__opened");
      // close it
      closePopUp(openedModal);
    }
  }

  setEventListeners() {
    this._closeButton = this._popupElement.querySelector(".modal__close");
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
    this._popupElement.addEventListener("click", function (evt) {
      console.log(evt.target.classList);
      if (evt.target.classList.contains("modal")) {
        this.close();
      }
    });
  }
}

export default Popup;
