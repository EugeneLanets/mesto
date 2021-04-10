class Api {
  constructor({
    baseUrl, 
    headers
  }) {
    this._baseUrl = baseUrl;
    this._headers = headers;

  }

  _get(urlOptions) {
    return fetch(`${this._baseUrl}/${urlOptions}`, {
      headers: {
        authorization: this._headers.authorization
      }
    })
    .then(response => {
      if (response.ok) { 
        return response.json();
      }

      return Promise.reject(`Ошибка: ${response.status}`);
    })
  }

  getUserInfo() {
    return this._get("users/me ");
  }

  getInitialCards() {
    return this._get("cards");
  }

  updateUserInfo({name, about}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({name, about})
    })
    .then(response => {
      if (response.ok) { 
        return response.json();
      }

      return Promise.reject(`Ошибка: ${response.status}`);
    })
  }

  addCard({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({name, link})
    })
    .then(response => {
      if (response.ok) { 
        return response.json();
      }

      return Promise.reject(`Ошибка: ${response.status}`);
    })
  }

  _delete(urlOptions, id) {
    return fetch(`${this._baseUrl}/${urlOptions}/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._headers.authorization
      }
    })
    .then(response => {
      if (response.ok) { 
        return Promise.resolve(`Удалено успешно: ${response.status}`)
      }

      return Promise.reject(`Ошибка: ${response.status}`);
    })
  }

  deleteCard(id) {
    return this._delete("cards", id);
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "PUT",
      headers: {
        authorization: this._headers.authorization
      }
    })
    .then(response => {
      if (response.ok) { 
        return response.json();
      }

      return Promise.reject(`Ошибка: ${response.status}`);
    })
  }
}

export default Api;