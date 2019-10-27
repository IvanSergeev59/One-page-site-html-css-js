import { serverUrl } from "../index.js";
export class Api {
  constructor(options) {
    this.options = options;
  }
  /* add 10 images */
  getInitialCards() {
    return fetch(serverUrl + `/cards`, {
      headers: {
        authorization: this.options.headers.authorization
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        else {

          return Promise.reject(`Ошибка: ${res.status}`)

        }
      })
  }

  addServerCard(name, link) {
    return fetch(serverUrl + `/cards`, {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then((res) => {
        if (res.ok) {
          res.json()
        }
        else {
          return Promise.reject(`Ошибка: ${res.status}`)
        }
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  sendName(sec, jo) {
    return fetch(serverUrl + `/users/me`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        name: sec,
        about: jo
      })
    })
      .then((res) => {
        if (res.ok) {
          res.json()
        }
        else {
          return Promise.reject(`Ошибка: ${res.status}`)
        }
      })


  }
  removeCard(id) {
    return fetch(serverUrl + `/cards/` + id, {
      method: 'DELETE',
      headers: this.options.headers
    })


      .then((res) => {
        if (res.ok) {
          res.json()
        }
        else {
          return Promise.reject(`Ошибка: ${res.status}`)
        }
      })

  }

  getProfile() {
    return fetch(serverUrl + `/users/me`, {
      headers: {
        authorization: '99409180-52be-48fe-83e5-acb0bdc1ccd1'
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        else {
          return Promise.reject(`Ошибка: ${res.status}`)
        }
      })

  }
  editAvatar(url) {

    fetch(serverUrl + `/users/me/avatar`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        avatar: url
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        else {
          return Promise.reject(`Ошибка: ${res.status}`)
        }
      })

    userPhoto.setAttribute('style', 'background-image: url(' + url + ')');
  }
}