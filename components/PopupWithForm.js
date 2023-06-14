import Popup from "./Popup.js";
import UserInfo from "./UserInfo.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this.popupForm = this._popupElement.querySelector("#add-card-form");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupForm.reset();
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
}

// Need to add the new instantiates to the index.js file and uncomment the imports for them at the top of the said file

// Note: where the handleFormSubmit for the PopupWithForm. You need to use it with the instantiate from the UserInfo from UserInfo.js when you call it in index.js

const setUserInfo = setUserInfo();

/* -------------------------------------------------------------------------- */
/*                           profileCard instantiate                          */
/* -------------------------------------------------------------------------- */

//this is just a test run to see if this works

const profileCard = new PopupWithForm("#profile-add-modal", setUserInfo());

profileCard.open();

profileCard.close();

/* -------------------------------------------------------------------------- */
/*                             newCard instantiate                            */
/* -------------------------------------------------------------------------- */

const newCard = new PopupWithForm("#add-card-modal", setUserInfo());

newCard.open();

newCard.close();
