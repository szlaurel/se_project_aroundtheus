/* -------------------------------------------------------------------------- */
/*                            sample fetch request                            */
/* -------------------------------------------------------------------------- */

// fetch("https://around-api.en.tripleten-services.com/v1", {
//   headers: {
//     authorization: "7209809d-78d6-4fba-8d62-afbf889fcee0",
//   },
// })
//   .then((res) => res.json())
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log("Oops there was an error", err);
//   })
//   .finally(() => {
//     console.log("the end");
//   });

/* -------------------------------------------------------------------------- */
/*                                    tasks                                   */
/* -------------------------------------------------------------------------- */

// I need to put everything regarding the api within the Api class down below.
// this means putting stuff that has to deal with the cards, the profile, and the new user info and so on and so forth.

/* -------------------------------------------------------------------------- */
/*                           class regarding the api                          */
/* -------------------------------------------------------------------------- */

export default class Api {
  constructor(options) {}

  getFetchRequest() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "GET",
      headers: {
        authorization: "7209809d-78d6-4fba-8d62-afbf889fcee0",
      },
    });
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "GET",
      headers: {
        authorization: "7209809d-78d6-4fba-8d62-afbf889fcee0",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return new Promise.reject(`Error : ${res.status}`);
    });
  }

  editProfileRequest() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: "7209809d-78d6-4fba-8d62-afbf889fcee0",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Marie Skłodowska Curie",
        about: "Physicist and Chemist",
      }),
    });
  }

  addNewCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "POST",
      headers: {
        authorization: "7209809d-78d6-4fba-8d62-afbf889fcee0",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
      }),
    });
  }

  confirmDeleteButton() {
    return fetch(
      "https://around-api.en.tripleten-services.com/v1/cards/64c08c313ea403001adf7d65",
      {
        method: "DELETE",
        headers: {
          authorization: "7209809d-78d6-4fba-8d62-afbf889fcee0",
        },
      }
    );
  }
}

/* -------------------------------------------------------------------------- */
/*                              end of api class                              */
/* -------------------------------------------------------------------------- */

// still need to fix this code and see how this works

function cardRenderer(cards) {
  promise.all(cards);
}

/* -------------------------------------------------------------------------- */
/*                                 Api object                                 */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                               calling the api                              */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    tasks                                   */
/* -------------------------------------------------------------------------- */

// i need to take the information that the api gives me when i call it and plug it into the necessary places in the code to make stuff render and work. Cause now were working with the servers information not my hardcoded info
