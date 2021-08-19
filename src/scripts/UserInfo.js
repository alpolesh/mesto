export default class UserInfo {
  constructor({nameSelector, descriptionSelector}) {
    this._profileNameElement = document.querySelector(nameSelector);
    this._profileDescriptionElement = document.querySelector(descriptionSelector);
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
}