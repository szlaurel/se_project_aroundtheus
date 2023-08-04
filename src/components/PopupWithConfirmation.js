/* -------------------------------------------------------------------------- */
/*                                   imports                                  */
/* -------------------------------------------------------------------------- */
import Popup from "./Popup.js";

/* -------------------------------------------------------------------------- */
/*                         PopupWithConfirmation class                        */
/* -------------------------------------------------------------------------- */

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
  }

  setSubmitAction(action) {
    this._submitButton = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton = this._popupElement.querySelector(".modal__button");
    this._confirmButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      console.log(evt);
      console.log("this button is listening");
      this._submitButton();
    });
  }
}

/* -------------------------------------------------------------------------- */
/*                          the way it needs to work                          */
/* -------------------------------------------------------------------------- */
// the delete button on the cards needs to listen for the click event when it gets pressed.
// upon being clicked it needs to open the confirm modal
// when the "yes" button is clicked it needs to close the form and remove the card from the page.

// need to define the this element in the class
