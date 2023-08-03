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

/* ------------------------------------------------------------------------- */
/*                           class regarding the api                          */
/* -------------------------------------------------------------------------- */

export default class Api {
  constructor({ baseUrl, headers, cardID }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._cardID = cardID;
  }

  userProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return new Promise.reject(`Error : ${res.status}`);
    });
  }

  editProfileRequest({ title, description }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        about: description,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return new Promise.reject(`Error : ${res.status}`);
    });
  }

  //need to find a way to plug the data that i get from the add card form and push it into the addnewcards api call

  addNewCards({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return new Promise.reject(`Error : ${res.status}`);
    });
  }

  confirmDeleteButton(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  //cardId in the like button request and the delete button request need to be updated with the cards id that comes from the server, so in order to do that we need so the request the id that comes from the server and imbed it into the requests when the action happens

  /**
   *
   * @param {String} cardId needs to be replaced with the id that comes from the cards
   */

  likeButtonRequest(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return new Promise.reject(`Error : ${res.status}`);
    });
  }

  removeLikeButtonRequest(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return new Promise.reject(`Error : ${res.status}`);
    });
  }

  updateProfilePictureRequest({ linkInput }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: linkInput,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return new Promise.reject(`Error : ${res.status}`);
    });
  }

  async cardRenderer() {
    await Promise.all([
      this.getInitialCards(),
      this.editProfileRequest(),
      this.updateProfilePictureRequest(),
    ]);
  }
}

/* -------------------------------------------------------------------------- */
/*                              end of api class                              */
/* -------------------------------------------------------------------------- */

// still need to fix this code and see how this works

// async function cardRenderer(cards) {
//   await promise.all([
//     getInitialCards()

//   ]);
// }

//link to read up on everything about promise.all
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

/* -------------------------------------------------------------------------- */
/*                                 Api object                                 */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                               calling the api                              */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    tasks                                   */
/* -------------------------------------------------------------------------- */

//very important, i need to plug in the editprofileapi into the profilecard instantiate i think, the data from that needs to come from the server and be plugged into their respective places.

// i need to take the information that the api gives me when i call it and plug it into the necessary places in the code to make stuff render and work. Cause now were working with the servers information not my hardcoded info
