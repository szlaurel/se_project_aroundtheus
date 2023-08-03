/* -------------------------------------------------------------------------- */
/*                                  Api calls                                 */
/* -------------------------------------------------------------------------- */
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "7209809d-78d6-4fba-8d62-afbf889fcee0",
    "Content-type": "application/json",
  },
  // cardID:
});

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
/*                variables that belong to profile image change               */
/* -------------------------------------------------------------------------- */
const profileImageContainer = document.querySelector("#profile-avatar-edit");
const profileImage = profileImageContainer.querySelector("#profile-image");

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
/*              variables that belong to the change avatar popup              */
/* -------------------------------------------------------------------------- */
const changeAvatarModal = document.querySelector("#change-avatar-modal");
const changeAvatarModalContainer = changeAvatarModal.querySelector(
  "#change-avatar-container"
);
const changeAvatarModalForm = changeAvatarModal.querySelector(
  "#change-avatar-form"
);
const changeAvatarModalCloseButton =
  changeAvatarModal.querySelector(".modal__close");
const chagneAvatarModalSubmitButton =
  changeAvatarModal.querySelector(".modal__button");

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

const avatarImageFormValidator = new FormValidator(
  validationSettings,
  changeAvatarModalForm
);

avatarImageFormValidator.enableValidation();

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

//the modal is supposed to popup with the confirmation having the

function renderCard(cardData, wrapper) {
  const card = new Card(
    cardData,
    cardSelector,
    handleCardClick,
    handleDeleteButton,
    handleLikeButton
  );
  return card.getView();
}

/* -------------------------------------------------------------------------- */
/*                        profile edit button new code                        */
/* -------------------------------------------------------------------------- */
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

// the userProfileInfo api call has to go here i think.

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

// the editProfileRequest api has to go here

const profileCard = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: (inputValues) => {
    console.log(inputValues);
    const title = inputValues.title;
    const description = inputValues.description;
    console.log(title, description);
    api
      .editProfileRequest({ title, description })
      .then((inputValues) => {
        console.log(inputValues);
        userInfo.setUserInfo({
          name: title,
          job: description,
        });
        profileCard.close();
      })
      .catch((err) => {
        console.error("an error has occurred", err);
      })
      .finally(() => {
        console.log("done");
      });
  },
});

profileCard.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                             newCard instantiate                            */
/* -------------------------------------------------------------------------- */

//plugged the code for the api into the handleformsubmit to be able to show any card that gets

//template for the code update profile picture
//essentially the code to update the avatar is the same code as the newcard

const newCard = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const link = inputValues.link;
    api
      .addNewCards({ name, link })
      .then((res) => {
        console.log(res);
        console.log(inputValues);
        // "res" in the renderCard parameter takes all the data from the .then("res") and pushes all of the necessary info that the server has to the cards
        const card = renderCard(res);
        sectionRenderer.addItem(card);
        newCard.close();
      })
      .catch((err) => {
        console.error("an error has occurred", err);
      })
      .finally(() => {
        console.log("done");
      });
  },
});

newCard.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                             confirmation popup                             */
/* -------------------------------------------------------------------------- */

const popupConfirm = new PopupWithConfirmation({
  popupSelector: "#confirm-delete-modal",
});

function handleDeleteButton(card) {
  popupConfirm.setSubmitAction(() => {
    api
      .confirmDeleteButton(card._id)
      .then(() => {
        card.handleDeleteCard();
      })
      .catch((err) => {
        console.error("an error has occurred", err);
      })
      .finally(() => {
        console.log("done");
      });
  });
  popupConfirm.open();
}

popupConfirm.setEventListeners();

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
    const cards = initialCards;
  })
  //need to figure out a way to take the ids and plug them into the url. Do i use an event listener of every card and everytime i click a specific one i get the id for it i do i just listen for every time?
  .catch((err) => {
    console.error("An error was found", err);
  });

/* -------------------------------------------------------------------------- */
/*                                fetch request                               */
/* -------------------------------------------------------------------------- */
api
  .userProfileInfo()
  .then((res) => res.json())
  .then((info) => {
    console.log(info);
    userInfo.setUserInfo({
      name: info.name,
      job: info.about,
    });
    console.log(userInfo);
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

function handleLikeButton(card) {
  if (card._isLiked) {
    api
      .removeLikeButtonRequest(card._id)
      .then((res) => {
        card.updateLikes(res.isLiked);
      })
      .catch((err) => {
        console.error("an error has occurred", err);
      })
      .finally(() => {
        console.log("done");
      });
  } else {
    api
      .likeButtonRequest(card._id)
      .then((res) => {
        card.updateLikes(res.isLiked);
      })
      .catch((err) => {
        console.error("an error has occurred", err);
      })
      .finally(() => {
        console.log("done");
      });
  }
}

/* -------------------------------------------------------------------------- */
/*                            profile image request                            */
/* -------------------------------------------------------------------------- */

function setProfilePicture(linkInput) {
  profileImage.src = linkInput;
}

const updateProfilePicture = new PopupWithForm({
  popupSelector: "#change-avatar-modal",
  handleFormSubmit: (inputValues) => {
    const linkInput = inputValues.link;
    console.log(linkInput);
    api
      .updateProfilePictureRequest({ linkInput: linkInput })
      .then((res) => {
        console.log(res);
        setProfilePicture(linkInput);
        updateProfilePicture.close();
        // this is where the pushing of the link goes through to the src on the img
      })
      .catch((err) => {
        console.error("an error has occurred", err);
      })
      .finally(() => {
        console.log("done");
      });
  },
});

profileImageContainer.addEventListener("mousedown", () => {
  updateProfilePicture.open();
});

updateProfilePicture.updateProfileImageEventListeners();

updateProfilePicture.setEventListeners();

api
  .userProfileInfo()
  .then((res) => res.json())
  .then((info) => {
    const avatarImage = info.avatar;
    console.log(avatarImage);
    setProfilePicture(avatarImage);
  });
