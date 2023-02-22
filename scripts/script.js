const profileEditButton = document.querySelector("#profile-edit-button");
const modalClose = document.querySelector(".modal__close");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = document.querySelector(".modal__form");

function closePopUp() {
  profileEditModal.classList.remove("modal__opened");
}

function handleProfileSubmit(e) {
  e.preventDefault();
  console.log("form submitted");
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp();
}

profileEditButton.addEventListener("click", () => {
  profileEditModal.classList.add("modal__opened");
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  console.log("Edit button has been pressed");
});

modalClose.addEventListener("click", closePopUp);

profileEditForm.addEventListener("submit", handleProfileSubmit);

//Old code for the modal to open and close VVVVVVV

// function toggleModal() {
//   modal.classList.toggle("modal__opened");
// }

// function windowOnClick(event) {
//   if (event.target === modal) {
//     toggleModal();
//   }
// }

// profileEditButton.addEventListener("click", toggleModal);
// modalClose.addEventListener("click", toggleModal);
// modal.addEventListener("click", windowOnClick);

// profileEditButton.addEventListener("click", function () {
//   console.log("button has been pressed");
// });

// profileEditButton.addEventListener("click", () => {
//   profileTitleInput.value = profileTitle.textContent;
//   profileDescriptionInput.value = profileDescription.textContent;
// });
