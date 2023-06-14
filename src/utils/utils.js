/* -------------------------------------------------------------------------- */
/*                                Modal utility                               */
/* -------------------------------------------------------------------------- */

export function openPopUp(modal) {
  modal.classList.add("modal__opened");
  document.addEventListener("keydown", closeModalByEscape);
}

export function closePopUp(modal) {
  modal.classList.remove("modal__opened");
  document.removeEventListener("keydown", closeModalByEscape);
}

// function for keydown event
export function closeModalByEscape(evt) {
  if (evt.key === "Escape") {
    // search for an opened modal
    const openedModal = document.querySelector(".modal__opened");
    // close it
    closePopUp(openedModal);
  }
}

export function addClickOutListener(formEl) {
  formEl.addEventListener("mousedown", function (evt) {
    console.log(evt.target.classList);
    if (evt.target.classList.contains("modal")) {
      closePopUp(formEl);
    }
  });
}
