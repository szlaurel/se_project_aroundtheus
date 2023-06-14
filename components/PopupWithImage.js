import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  open() {
    super.open();
  }
}

export default PopupWithImage;
