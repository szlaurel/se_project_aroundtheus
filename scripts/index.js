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

//Wrappers
const cardsWrap = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardForm = addCardModal.querySelector(".modal__form");

//Buttons and other DOM nodes
const profileEditButton = document.querySelector("#profile-edit-button");
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");

//Form Data
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = addCardModal.querySelector(".modal__input_type_title");
const cardUrlInput = addCardModal.querySelector(".modal__input_type_url");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

function openPopUp(modal) {
  modal.classList.add("modal__opened");
}

function closePopUp(modal) {
  modal.classList.remove("modal__opened");
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function currentInputValues() {
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

//Form Listeners
profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  openPopUp(profileEditModal);
});
profileModalCloseButton.addEventListener("click", () =>
  closePopUp(profileEditModal)
);
profileEditForm.addEventListener("submit", handleProfileSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

//Functions for form submit
function handleProfileSubmit(e) {
  e.preventDefault();
  currentInputValues();
  closePopUp(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardsWrap);
  closePopUp(addCardModal);
}

//Add new card button
addNewCardButton.addEventListener("click", () => openPopUp(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closePopUp(addCardModal)
);

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

// Save this just in case VVVVV
// initialCards.forEach((cardData) => {
//   const cardElement = getCardElement(cardData);
//   cardsWrap.prepend(cardElement);
// });

// Save this just in case too VVVVV
// profileEditButton.addEventListener("click", () => {
//   openPopUp();
//   fillProfileForm();
// });
