class Api {
  constructor({ url, headers }) {
    this._url = url
    this._headers = headers
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }
  getInitialCards() {
    return fetch(this._url + "/cards", {
      method: "GET",
      credentials: 'include',
      // headers: {
      //   authorization: `Bearer ${localStorage.getItem("token")}`,
      //   "content-type": "application/json"
      // }
      headers: this._headers
    }).then((res) => this._getResponse(res))
  }
  getInitialUser() {
    return fetch(this._url + "/users/me", {
      method: "GET",
      credentials: 'include',
      headers: this._headers
    }).then((res) => this._getResponse(res))
  }
  getEditUser(data) {
    return fetch(this._url + "/users/me", {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then((res) => this._getResponse(res))
  }
  getEditAvatar(link) {
    return fetch(this._url + "/users/me/avatar", {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link.avatar
      })
    }).then((res) => this._getResponse(res))
  }
  getAddCard(data) {
    return fetch(this._url + "/cards", {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then((res) => this._getResponse(res))
  }
  deleteCards(cardId) {
    return fetch(this._url + "/cards/" + cardId, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers
    }).then((res) => this._getResponse(res))
  }
  deleteLike(cardId) {
    return fetch(this._url + "/cards/" + cardId + "/likes", {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers
    }).then((res) => this._getResponse(res))
  }
  addLike(cardId) {
    return fetch(this._url + "/cards/" + cardId + "/likes", {
      method: "PUT",
      credentials: 'include',
      headers: this._headers
    }).then((res) => this._getResponse(res))
  }
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.addLike(cardId)
    } else {
      return this.deleteLike(cardId)
    }
  }
}

export const api = new Api({
  url: 'https://another.domainname.studen.nomoreparties.co',
   //url: "http://localhost:3000",
  headers: {
    authorization: ` Bearer ${localStorage.getItem("token")}`,
    "content-type": "application/json",
  },
});