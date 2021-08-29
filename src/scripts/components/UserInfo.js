export default class UserInfo {
  constructor({nameSelector, descriptionSelector, avatarSelector}) {
    this._profileNameElement = document.querySelector(nameSelector);
    this._profileDescriptionElement = document.querySelector(descriptionSelector);
    this._profileAvatarElement = document.querySelector(avatarSelector);
    this._userId;
  }

  getUserInfo() {
    const userData = {
      name: this._profileNameElement.textContent,
      description: this._profileDescriptionElement.textContent,
    }
    return userData;
  }

  setUserInfo(newName, newDescription) {
    this._profileNameElement.textContent = newName;
    this._profileDescriptionElement.textContent = newDescription;
  }

  setUserId(userId) {
    this._userId = userId;
  }

  getUserId() {
    return this._userId;
  }

  setUserAvatar(newAvatarLink) {
    this._profileAvatarElement.src = newAvatarLink;
  }
}