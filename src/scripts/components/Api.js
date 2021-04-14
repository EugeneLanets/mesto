class Api {
  constructor({
    baseUrl, 
    headers
  }) {
    this._baseUrl = baseUrl;
    this._headers = headers;

  }

  _handleResponse(response) {
    if (response.ok) {
      return response.json()
    }

    return Promise.reject(`Ошибка: ${response.status}`);
  }

  _get(urlOptions) {
    return fetch(`${this._baseUrl}/${urlOptions}`, {
      headers: {
        authorization: this._headers.authorization
      }
    })
    .then(this._handleResponse);
  }

  getUserInfo() {
    return this._get("users/me ");
  }

  getInitialCards() {
    return this._get("cards");
  }

  _update(urlOptions, newData) {
    return fetch(`${this._baseUrl}/${urlOptions}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(newData)
    })
    .then(this._handleResponse);
  }

  updateUserInfo(newData) {
    return this._update("users/me", newData);
  }

  updateAvatar(newData) {
    return this._update("users/me/avatar", newData)
  }

  addCard({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({name, link})
    })
    .then(this._handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._headers.authorization
      }
    })
    .then(this._handleResponse);
  }

  toggleLike(id, method) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method,
      headers: {
        authorization: this._headers.authorization
      }
    })
    .then(this._handleResponse);
  }
}

export default Api;