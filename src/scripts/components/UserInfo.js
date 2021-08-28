export default class UserInfo {
  constructor({nameSelector, descriptionSelector, avatarSelector}) {
    this._profileNameElement = document.querySelector(nameSelector);
    this._profileDescriptionElement = document.querySelector(descriptionSelector);
    this._profileAvatarElement = document.querySelector(avatarSelector);
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

  setUserAvatar(newAvatarLink) {
    this._profileAvatarElement.src = newAvatarLink;
  }
}