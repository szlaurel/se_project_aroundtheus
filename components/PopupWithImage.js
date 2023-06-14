import Popup from "./Popup.js";
import Card from "./Card.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  open(name, link) {
    const previewImage = this._popupElement.querySelector(".modal__image");
    const previewImageName =
      this._popupElement.querySelector(".modal__image-name");

    previewImage.src = link;
    previewImage.alt = name;
    previewImageName.textContent = name;
    super.open();
  }
}

export default PopupWithImage;
