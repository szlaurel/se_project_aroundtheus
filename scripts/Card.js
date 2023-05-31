// We left off at 41:46 in the project 7 coding session

//Class Card should only be in charge of anything that has to deal with the card itself.

// We need to use arrow functions when using them in the setEventListeners so that theres no error.

/* -------------------------------------------------------------------------- */
/*                     Tasks requiring for the Card Class                     */
/* -------------------------------------------------------------------------- */

// 1. need to copy over the code regarding the anything that has to deal with the modal like opening, closing, escape button and the click out event.
// 2. need to add the code from the set event listener and combine it with its respective handlers within the card class
// 3. need to wire everything to the index.js file and make sure that everything works
//
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
      .addEventListener("click", () => this._handleLikeIcon);
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteCard);
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handlePreviewPicture);
    //We can shorten out the cardImageEl by making a function within this class and passing it through for simplicity sakes, but focus on making the rough end of the code.
  }

  _handleLikeIcon() {
    likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    cardElement.remove();
  }

  _handlePreviewPicture() {
    this._element.querySelector(".card__image").classList.add("modal__opened");
    previewImage.src = this._link;
    previewImage.alt = this._name;
    previewImageName.textContent = this._name;
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
    this._element.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._link})`;
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
