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
import { initialCards } from "../utils/constants.js";

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
/*                        profile-edit-button OLD CODE                        */
/* -------------------------------------------------------------------------- */

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

profileEditButton.addEventListener("click", () => {
  const getInfo = userInfo.getUserInfo();
  profileTitleInput.value = getInfo.name;
  profileDescriptionInput.value = getInfo.job;
  profileCard.open();
});

/* -------------------------------------------------------------------------- */
/*                            add-new-card OLD CODE                           */
/* -------------------------------------------------------------------------- */

addNewCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  newCard.open();
});
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
    userInfo.setUserInfo({
      name: inputValues.title,
      job: inputValues.description,
    });
    profileCard.close();
  },
});

profileCard.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                             newCard instantiate                            */
/* -------------------------------------------------------------------------- */

const newCard = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (inputValues) => {
    console.log(inputValues);
    const card = renderCard(inputValues);
    sectionRenderer.addItem(card);
    // const name = cardTitleInput.value;
    // const link = cardUrlInput.value;
    newCard.close();
    addCardForm.reset();
  },
});

newCard.setEventListeners();
