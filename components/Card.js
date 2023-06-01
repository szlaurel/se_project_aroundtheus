import { openPopUp } from "../utils/utils.js";

// We left off at 41:46 in the project 7 coding session

//Class Card should only be in charge of anything that has to deal with the card itself.

// We need to use arrow functions when using them in the setEventListeners so that theres no error.

/* -------------------------------------------------------------------------- */
/*                     Tasks requiring for the Card Class                     */
/* -------------------------------------------------------------------------- */

// 1. need to fix the handles for likeicon, deletecard, and preview picture to make sure they work

/* -------------------------------------------------------------------------- */
/*                           Card Class and its code                          */
/* -------------------------------------------------------------------------- */

// I think that the cardSelector is supposed to be the card template

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeIcon());
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteCard());
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handlePreviewPicture());
    //We can shorten out the cardImageEl by making a function within this class and passing it through for simplicity sakes, but focus on making the rough end of the code.
  }

  _handleLikeIcon() {
    const likeButton = this._element.querySelector(".card__like-button");
    likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handlePreviewPicture() {
    const previewImageModal = document.querySelector("#preview-image-modal");
    const previewImage = previewImageModal.querySelector(".modal__image");
    const previewImageName =
      previewImageModal.querySelector(".modal__image-name");
    previewImage.src = this._link;
    previewImage.alt = this._name;
    previewImageName.textContent = this._name;
    openPopUp(previewImageModal);
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__like-button");
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__title").textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  testMethod() {
    console.log(this._link);
    console.log(this._name);
    console.log(this._getTemplate());
  }
}

export default Card;