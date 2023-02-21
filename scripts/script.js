const profileEditButton = document.querySelector(".profile__edit-button");
const modalClose = document.querySelector(".modal__close");
const modal = document.querySelector(".modal");

function toggleModal() {
  modal.classList.toggle("modal__opened");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

profileEditButton.addEventListener("click", toggleModal);
modalClose.addEventListener("click", toggleModal);
modal.addEventListener("click", windowOnClick);

profileEditButton.addEventListener("click", function () {
  console.log("button has been pressed");
  profileEditButton.setAttribute;
});
