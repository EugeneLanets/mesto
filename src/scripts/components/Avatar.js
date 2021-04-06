export default class Avatar {
  constructor(avatarSelector) {
    this._element = document.querySelector(avatarSelector);
  }

  setAvatar(url) {
    this._element.src = url;
  }
}