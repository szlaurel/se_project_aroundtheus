/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import "./index.css";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { openPopUp, closePopUp, addClickOutListener } from "../utils/utils.js";

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
/*                  Validation settings and the form element                  */
/* -------------------------------------------------------------------------- */

const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const formElement = document.querySelector(validationSettings.formSelector);

/* -------------------------------------------------------------------------- */
/*                    Form validators from FormValidator.js                   */
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
/*                                Card selector                               */
/* -------------------------------------------------------------------------- */

const cardSelector = "#card-template";
const cardListSelector = ".cards__list";
/* -------------------------------------------------------------------------- */
/*                             Click out listeners                            */
/* -------------------------------------------------------------------------- */

addClickOutListener(profileEditModal);
addClickOutListener(previewImageModal);
// addClickOutListener(addCardModal);

/* -------------------------------------------------------------------------- */
/*                           Function to RenderCard                           */
/* -------------------------------------------------------------------------- */

const sectionRenderer = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = renderCard(cardData);
      sectionRenderer.addItem(card);
    },
  },
  cardListSelector
);
sectionRenderer.renderItems();

const imagePreviewPopup = new PopupWithImage("#preview-image-modal");

function handleCardClick(name, link) {
  imagePreviewPopup.open(name, link);
}

function renderCard(cardData, wrapper) {
  const card = new Card(cardData, cardSelector, handleCardClick);
  return card.getView();
}

/* -------------------------------------------------------------------------- */
/*                     Functions to deal with profile form                    */
/* -------------------------------------------------------------------------- */

// these functions are located in the UserInfo.js file with updated keyvalue information.
// this is where the UserInfo stuff should be located at.

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

// function updateProfileValues() {
//   profileTitle.textContent = profileTitleInput.value;
//   profileDescription.textContent = profileDescriptionInput.value;
// }

/* -------------------------------------------------------------------------- */
/*                          function for form submit                          */
/* -------------------------------------------------------------------------- */

// function handleProfileSubmit(evt) {
//   evt.preventDefault();
//   updateProfileValues();
//   closePopUp(profileEditModal);
// }

//took all the code for down below and put it destructuring function

// function handleAddCardFormSubmit(evt) {
//   evt.preventDefault();
//   const name = cardTitleInput.value;
//   const link = cardUrlInput.value;
//   renderCard({ name, link }, cardsWrap);
//   closePopUp(addCardModal);
//   addCardForm.reset();
// }

// added the toggleButtonState from validation.js

/* -------------------------------------------------------------------------- */
/*                        profile-edit-button OLD CODE                        */
/* -------------------------------------------------------------------------- */

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

// userInfo.setUserInfo({
//   name: profileTitle,
//   job: profileDescription,
// });

profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  openPopUp(profileEditModal);
});

// profileModalCloseButton.addEventListener("click", () => {
//   closePopUp(profileEditModal);
// });
// profileEditForm.addEventListener("submit", handleProfileSubmit);

/* -------------------------------------------------------------------------- */
/*                            add-new-card OLD CODE                           */
/* -------------------------------------------------------------------------- */

addNewCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  openPopUp(addCardModal);
});
// addCardModalCloseButton.addEventListener("click", () => {
//   closePopUp(addCardModal);
// });

// old event listener regarding the add card form VVVV This needs to be erased
// addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// addCardForm.addEventListener("submit", () => {
//   newCard.setEventListeners();
// });

//
/* -------------------------------------------------------------------------- */
/*                          //Preview modal listeners                         */
/* -------------------------------------------------------------------------- */
previewImageCloseButton.addEventListener("click", () => {
  imagePreviewPopup.close();
});

/* -------------------------------------------------------------------------- */
/*                           profileCard instantiate                          */
/* -------------------------------------------------------------------------- */

const profileCard = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: (inputValues) => {
    profileTitle.textContent = inputValues.title;
    profileDescription.textContent = inputValues.description;
    profileCard.close();
  },
});

profileCard.setEventListeners();

profileCard.open();
profileCard.close();

// profileCard._getInputValues({
//   name: profileTitle,
//   job: profileDescription,
// });

/* -------------------------------------------------------------------------- */
/*                             newCard instantiate                            */
/* -------------------------------------------------------------------------- */

const newCard = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (inputValues) => {
    console.log(inputValues);
    const card = renderCard(inputValues);
    sectionRenderer.addItem(card);
    const name = cardTitleInput.value;
    const link = cardUrlInput.value;
    closePopUp(addCardModal);
    addCardForm.reset();
  },
});

newCard.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                                    TASKS                                   */
/* -------------------------------------------------------------------------- */
// need to fix the stuff within the right files
// index.js
// UserInfo.js
// PopupWithForm.js