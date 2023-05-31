import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import {
  openPopUp,
  closePopUp,
  closeModalByEscape,
  addClickOutListener,
} from "./utils.js";

/* -------------------------------------------------------------------------- */
/*                            Object with card info                           */
/* -------------------------------------------------------------------------- */

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* -------------------------------------------------------------------------- */
/*                Variables that belong to profile-edit-modal               */
/* -------------------------------------------------------------------------- */
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileContainer = document.querySelector("#profile-container");

/* -------------------------------------------------------------------------- */
/*                Variables that belong to the add-card-modal               */
/* -------------------------------------------------------------------------- */
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector(".modal__form");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardContainer = addCardModal.querySelector("#add-card-container");
const addCardSubmitButton = addCardModal.querySelector(".modal__button");

/* -------------------------------------------------------------------------- */
/*             Wrappers aka div wrappers from the html document             */
/* -------------------------------------------------------------------------- */
const cardsWrap = document.querySelector(".cards__list");
const previewImageModal = document.querySelector("#preview-image-modal");

//Buttons and other DOM nodes (Document Object Model)

//We'll be able to target the image src by using the preview image variable here VVVVV
const previewImage = previewImageModal.querySelector(".modal__image");
const previewImageName = previewImageModal.querySelector(".modal__image-name");
const previewImageCloseButton =
  previewImageModal.querySelector(".modal__close");
//place previewImageModal here and you need to write some code in the html document

/* -------------------------------------------------------------------------- */
/*                                 Form Data                                */
/* -------------------------------------------------------------------------- */
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = addCardModal.querySelector(".modal__input_type_title");
const cardUrlInput = addCardModal.querySelector(".modal__input_type_url");

/* -------------------------------------------------------------------------- */
/*                             Validation settings                            */
/* -------------------------------------------------------------------------- */

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

/* -------------------------------------------------------------------------- */
/*                                Card selector                               */
/* -------------------------------------------------------------------------- */

const cardSelector = "#card-template";

/* -------------------------------------------------------------------------- */
/*                              Form Validators                             */
/* -------------------------------------------------------------------------- */

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);

const addFormValidator = new FormValidator(validationSettings, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* -------------------------------------------------------------------------- */
/*                             Click out listeners                            */
/* -------------------------------------------------------------------------- */

addClickOutListener(profileEditModal);
addClickOutListener(previewImageModal);
addClickOutListener(addCardModal);

/* -------------------------------------------------------------------------- */
/*                           Function to RenderCard                           */
/* -------------------------------------------------------------------------- */

function renderCard(cardData, wrapper) {
  const card = new Card(cardData, cardSelector);
  // const cardElement = getCardElement(cardData);
  wrapper.prepend(card.getView());
}

/* -------------------------------------------------------------------------- */
/*                     Functions to deal with profile form                    */
/* -------------------------------------------------------------------------- */

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function updateProfileValues() {
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
}

/* -------------------------------------------------------------------------- */
/*                          function for form submit                          */
/* -------------------------------------------------------------------------- */

function handleProfileSubmit(evt) {
  evt.preventDefault();
  updateProfileValues();
  closePopUp(profileEditModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;

  renderCard({ name, link }, cardsWrap);
  closePopUp(addCardModal);
  addCardForm.reset();
  // added the toggleButtonState from validation.js
}

/* -------------------------------------------------------------------------- */
/*                               Form Listeners                               */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  openPopUp(profileEditModal);
});

profileModalCloseButton.addEventListener("click", () => {
  closePopUp(profileEditModal);
});
profileEditForm.addEventListener("submit", handleProfileSubmit);

/* -------------------------------------------------------------------------- */
/*                             Add new card button                            */
/* -------------------------------------------------------------------------- */

addNewCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  openPopUp(addCardModal);
});
addCardModalCloseButton.addEventListener("click", () => {
  closePopUp(addCardModal);
});
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

/* -------------------------------------------------------------------------- */
/*                          //Preview modal listeners                         */
/* -------------------------------------------------------------------------- */
previewImageCloseButton.addEventListener("click", () => {
  closePopUp(previewImageModal);
});

/* -------------------------------------------------------------------------- */
/*                             //Render the cards                             */
/* -------------------------------------------------------------------------- */
initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
