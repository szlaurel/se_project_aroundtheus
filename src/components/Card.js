//might need to import the PopupWithImage from the file in order to connect it probably maybe just in case heres the code, just uncomment
// import PopupWithImage from "./PopupWithImage.js";

export class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleDeleteButton,
    handleLikeButton
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButton = handleDeleteButton;
    this._handleLikeButton = handleLikeButton;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeButton(this));
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteButton(this));
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleCardClick(this._name, this._link)
      );
    //We can shorten out the cardImageEl by making a function within this class and passing it through for simplicity sakes, but focus on making the rough end of the code.
  }

  updateLikes(isLiked) {
    this._isLiked = isLiked;
    this._handleLikeIcon();
  }

  _handleLikeIcon() {
    const likeButton = this._element.querySelector(".card__like-button");
    if (this._isLiked) {
      likeButton.classList.add("card__like-button_active");
    } else {
      likeButton.classList.remove("card__like-button_active");
    }
  }

  handleDeleteCard() {
    this._element.remove();
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;
    this._setEventListeners();
    this._handleLikeIcon();
    return this._element;
  }

  testMethod() {
    console.log(this._link);
    console.log(this._name);
    console.log(this._getTemplate());
  }
}

export default Card;
