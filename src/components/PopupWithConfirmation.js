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

  open() {
    super.open();
  }

  close() {
    super.close();
  }

  _handleEscClose() {
    super._handleEscClose();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("click", () => {
      console.log("click");
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
