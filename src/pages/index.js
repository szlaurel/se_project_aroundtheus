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
import {
  initialCards,
  cardListSelector,
  cardSelector,
  validationSettings,
} from "../utils/constants.js";
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

/* -------------------------------------------------------------------------- */
/*              variables that belong to the change avatar popup              */
/* -------------------------------------------------------------------------- */
const changeAvatarModal = document.querySelector("#change-avatar-modal");

const changeAvatarModalForm = changeAvatarModal.querySelector(
  "#change-avatar-form"
);

/* -------------------------------------------------------------------------- */
/*                              card template div                             */
/* -------------------------------------------------------------------------- */

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

// const validationSettings = {
//   formSelector: ".modal__form",
//   inputSelector: ".modal__input",
//   submitButtonSelector: ".modal__button",
//   inactiveButtonClass: "modal__button_disabled",
//   inputErrorClass: "modal__input_type_error",
//   errorClass: "modal__error_visible",
// };

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
//need to make the avatar selector work upon the setuser info with the api calls

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

// the userProfileInfo api call has to go here i think.

profileEditButton.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  profileTitleInput.value = info.name;
  profileDescriptionInput.value = info.job;
  profileCardPopup.open();
});

/* -------------------------------------------------------------------------- */
/*                            add-new-card new code                           */
/* -------------------------------------------------------------------------- */

addNewCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  newCardPopup.open();
});

/* -------------------------------------------------------------------------- */
/*                           profileCard instantiate                          */
/* -------------------------------------------------------------------------- */

// the editProfileRequest api has to go here

const profileCardPopup = new PopupWithForm({
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
      })
      .then(() => {
        profileCardPopup.close();
      })
      .catch((err) => {
        console.error("an error has occurred", err);
      })
      .finally(() => {
        profileCardPopup.revertSaveButtonListener();
        console.log("done");
      });
  },
});

profileCardPopup.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                             newCard instantiate                            */
/* -------------------------------------------------------------------------- */

//plugged the code for the api into the handleformsubmit to be able to show any card that gets

//template for the code update profile picture
//essentially the code to update the avatar is the same code as the newcard

const newCardPopup = new PopupWithForm({
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
      })
      .then(() => {
        newCardPopup.close();
      })
      .catch((err) => {
        console.error("an error has occurred", err);
      })
      .finally(() => {
        newCardPopup.revertSaveButtonListener();
        console.log("done");
      });
  },
});

newCardPopup.setEventListeners();

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
      .then(() => {
        popupConfirm.close();
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

// Promise.all([api.getInitialCards(), api.editProfileRequest()]).then(
//   ([userData, cards]) => {
//     console.log(userData, cards);
//   }
// );

api
  .getAppInfo()
  .then(([initialCards, info]) => {
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
    userInfo.setUserInfo({
      name: info.name,
      job: info.about,
    });
    userInfo.setAvatarProfile({ avatar: info.avatar });
  })
  .catch((err) => {
    console.error("An error was found", err);
  });

//need to figure out a way to take the ids and plug them into the url. Do i use an event listener of every card and everytime i click a specific one i get the id for it i do i just listen for every time?

/* -------------------------------------------------------------------------- */
/*                                card requests                               */
/* -------------------------------------------------------------------------- */

function handleLikeButton(card) {
  if (card.isliked) {
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

// the problem with the code right now is that when you update the profile picture the name and the description disappear and i need to find out why it does that and the same happens vice versa.

const updateProfilePicture = new PopupWithForm({
  popupSelector: "#change-avatar-modal",
  handleFormSubmit: (inputValues) => {
    const linkInput = inputValues.link;
    console.log(linkInput);
    api
      .updateProfilePictureRequest({ linkInput: linkInput })
      .then((res) => {
        console.log(res);
        userInfo.setAvatarProfile({ avatar: linkInput });

        // this is where the pushing of the link goes through to the src on the img
      })
      .then(() => {
        updateProfilePicture.close();
      })
      .catch((err) => {
        console.error("an error has occurred", err);
      })
      .finally(() => {
        updateProfilePicture.revertSaveButtonListener();
        console.log("done");
      });
  },
});

profileImageContainer.addEventListener("mousedown", () => {
  avatarImageFormValidator.resetValidation();
  updateProfilePicture.open();
});

//have to remove the function for the down below VVVVV but before i do i need to study how and why its working without it

updateProfilePicture.setEventListeners();

//take a look at the first api userProfileInfo call i commented out the .then res res.json() need to review this more
