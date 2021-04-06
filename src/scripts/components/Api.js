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

}

export default Api;