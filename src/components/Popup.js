class Popup {
  constructor({ popupSelector }) {
    console.log(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal__opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal__opened");
    // this._handleEscClose();
    document.addEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      console.log(evt.key);
      // search for an opened modal
      const openedModal = document.querySelector(".modal__opened");
      // close it
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton = this._popupElement.querySelector(".modal__close");
    this._closeButton.addEventListener("click", () => {
      console.log("click");
      this.close();
    });
    this._popupElement.addEventListener("click", function (evt) {
      console.log(evt.target.classList);
      if (evt.target.classList.contains("modal")) {
        this.close;
      }
    });
  }
}

export default Popup;
