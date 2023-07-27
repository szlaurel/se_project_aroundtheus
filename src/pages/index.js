/* -------------------------------------------------------------------------- */
/*                          temporary fetch requests                          */
/* -------------------------------------------------------------------------- */

//needs to go in the api class, just running tests to see if it properly works

// fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
//   method: "GET",
//   headers: {
//     authorization: "7209809d-78d6-4fba-8d62-afbf889fcee0",
//   },
// });

// fetch("https://around-api.en.tripleten-services.com/v1/cards", {
//   method: "GET",
//   headers: {
//     authorization: "7209809d-78d6-4fba-8d62-afbf889fcee0",
//   },
// });

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
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

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
/*              variables that belong to the confirm delete popup             */
/* -------------------------------------------------------------------------- */

const confirmDeleteModal = document.querySelector("#confirm-delete-modal");
const confirmDeleteModalContainer =
  confirmDeleteModal.querySelector(".modal__container");
const confirmDeleteModalForm = confirmDeleteModal.querySelector(".modal__form");
const confirmDeleteModalCloseButton =
  confirmDeleteModal.querySelector(".modal__close");
const confirmDeleteModalSubmit =
  confirmDeleteModal.querySelector(".modal__button");

/* -------------------------------------------------------------------------- */
/*                              card template div                             */
/* -------------------------------------------------------------------------- */

const cardSelector = "#card-template";
const cardListSelector = ".cards__list";
const cardTemplateSelector = document.querySelector("#card-template");
const deleteButton = cardTemplateSelector.querySelector(".card__delete-button");

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
/*                           Function to RenderCard                           */
/* -------------------------------------------------------------------------- */

const imagePreviewPopup = new PopupWithImage("#preview-image-modal");
imagePreviewPopup.setEventListeners();
function handleCardClick(name, link) {
  imagePreviewPopup.open(name, link);
}

function renderCard(cardData, wrapper) {
  const card = new Card(cardData, cardSelector, handleCardClick);
  return card.getView();
}

/* -------------------------------------------------------------------------- */
/*                        profile edit button new code                        */
/* -------------------------------------------------------------------------- */

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

profileEditButton.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  profileTitleInput.value = info.name;
  profileDescriptionInput.value = info.job;
  profileCard.open();
});

/* -------------------------------------------------------------------------- */
/*                            add-new-card new code                           */
/* -------------------------------------------------------------------------- */

addNewCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  newCard.open();
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

// const newCard = new PopupWithForm({
//   popupSelector: "#add-card-modal",
//   handleFormSubmit: (inputValues) => {
//     console.log(inputValues);
//     const card = renderCard(inputValues);
//     sectionRenderer.addItem(card);
//     // const name = cardTitleInput.value;
//     // const link = cardUrlInput.value;
//     newCard.close();
//   },
// });

/* -------------------------------------------------------------------------- */
/*                             confirmation popup                             */
/* -------------------------------------------------------------------------- */

// const popupConfirm = new PopupWithConfirmation("#confirm-delete-modal");

/* -------------------------------------------------------------------------- */
/*                                  Api calls                                 */
/* -------------------------------------------------------------------------- */
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "7209809d-78d6-4fba-8d62-afbf889fcee0",
    "Content-type": "application/json",
  },
});

/* -------------------------------------------------------------------------- */
/*                   api call for the section card renderer                   */
/* -------------------------------------------------------------------------- */

let sectionRenderer;

api
  .getInitialCards()
  .then((initialCards) => {
    sectionRenderer = new Section(
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
  })
  .catch((err) => {
    console.error("An error was found", err);
  });

/* -------------------------------------------------------------------------- */
/*                          regular get fetch request                         */
/* -------------------------------------------------------------------------- */

api
  .getFetchRequest()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error("an error has occurred", err);
  })
  .finally(() => {
    console.log("done");
  });

/* -------------------------------------------------------------------------- */
/*                               profile request                              */
/* -------------------------------------------------------------------------- */

//where the "then" is thats where i need to plug in the respective code in order to see the information from the server on the website.

api
  .editProfileRequest()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error("an error has occurred", err);
  })
  .finally(() => {
    console.log("done");
  });

/* -------------------------------------------------------------------------- */
/*                                card requests                               */
/* -------------------------------------------------------------------------- */

let newCard;

api
  .addNewCards()
  .then((popupSelector) => {
    newCard = new PopupWithForm({
      popupSelector: "#add-card-modal",
      handleFormSubmit: (inputValues) => {
        console.log(inputValues);
        const card = renderCard(inputValues);
        sectionRenderer.addItem(card);
        newCard.close();
        newCard.setEventListeners();
      },
    });
  })
  .catch((err) => {
    console.error("an error has occurred", err);
  })
  .finally(() => {
    console.log("done");
  });

api
  .confirmDeleteButton()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error("an error has occurred", err);
  })
  .finally(() => {
    console.log("done");
  });

api
  .deleteButtonRequest()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error("an error has occurred", err);
  })
  .finally(() => {
    console.log("done");
  });

api
  .likeButtonRequest()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error("an error has occurred", err);
  })
  .finally(() => {
    console.log("done");
  });

/* -------------------------------------------------------------------------- */
/*                            profile card request                            */
/* -------------------------------------------------------------------------- */

api
  .updateProfilePictureRequest()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error("an error has occurred", err);
  })
  .finally(() => {
    console.log("done");
  });
