import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

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

function openPopUp(modal) {
  modal.classList.add("modal__opened");
  document.addEventListener("keydown", closeModalByEscape);
}

function closePopUp(modal) {
  modal.classList.remove("modal__opened");
  document.removeEventListener("keydown", closeModalByEscape);
}

// function for keydown event
function closeModalByEscape(evt) {
  if (evt.key === "Escape") {
    // search for an opened modal
    const openedModal = document.querySelector(".modal__opened");
    // close it
    closePopUp(openedModal);
  }
}

function addClickOutListener(formEl) {
  formEl.addEventListener("mousedown", function (evt) {
    console.log(evt.target.classList);
    if (evt.target.classList.contains("modal")) {
      closePopUp(formEl);
    }
  });
}

addClickOutListener(profileEditModal);

addClickOutListener(previewImageModal);

addClickOutListener(addCardModal);

function renderCard(cardData, wrapper) {
  const card = new Card(cardData, cardSelector);
  // const cardElement = getCardElement(cardData);
  wrapper.prepend(card.getView());
}

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function updateProfileValues() {
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
}

/* -------------------------------------------------------------------------- */
/*                          Function for the cards                          */
/* -------------------------------------------------------------------------- */
//all the variables inside the getCardElement are only local scope which means you can't pull them out of the function and use them anywhere else

// function getCardElement(cardData) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImageEl = cardElement.querySelector(".card__image");
//   const cardTitleEl = cardElement.querySelector(".card__title");
//   const likeButton = cardElement.querySelector(".card__like-button");
//   const deleteButton = cardElement.querySelector(".card__delete-button");
//   deleteButton.addEventListener("click", () => {
//     cardElement.remove();
//   });

//   //this is where the code for the preview image modal is supposed to be VVV
//   //this is also where the card data lies because this is where it pulls the information from within the array
//   cardImageEl.addEventListener("click", () => {
//     previewImage.src = cardData.link;
//     previewImage.alt = cardData.name;
//     previewImageName.textContent = cardData.name;
//     openPopUp(previewImageModal);
//   });

//   likeButton.addEventListener("click", () => {
//     likeButton.classList.toggle("card__like-button_active");
//   });

//   cardImageEl.src = cardData.link;
//   cardImageEl.alt = cardData.name;
//   cardTitleEl.textContent = cardData.name;
//   return cardElement;
// }

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

  console.log(inputList);
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
  const inputList = [
    ...addCardForm.querySelectorAll(validationSettings.inputSelector),
  ];
  const submitButton = addCardForm.querySelector(
    validationSettings.submitButtonSelector
  );
  toggleButtonState(inputList, submitButton, validationSettings);
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
