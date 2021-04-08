export default class UserInfo {
  constructor(userNameSelector, userInfoSelector) {
    this._name = document.querySelector(userNameSelector);
    this._info = document.querySelector(userInfoSelector);
    this._id = null;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._info.textContent
    }
  }

  setUserInfo({name, about, _id}) {
    this._name.textContent = name;
    this._info.textContent = about;
    this._id = _id;
  }

  getUserId() {
    return this._id;
  }
}