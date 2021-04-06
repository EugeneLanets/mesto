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

}

export default Api;