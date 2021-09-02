class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._method = options.method;
    this._authorization = options.headers.authorization;
    this._contentType = options.headers['Content-Type'];
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();    
    }
    return Promise.reject(`Ошибка: ${res.status}`); 
  }

  getInitialCards() {
    return (
      fetch(`${this._baseUrl}/cards`, {
        headers: {
          authorization: this._authorization
        }
      })
      .then(res => this._getResponseData(res))
    )
  }

  getUserInfo() {
    return (
      fetch(`${this._baseUrl}/users/me`, {
        headers: {
          authorization: this._authorization
        }
      })
      .then(res => this._getResponseData(res))
    )
  }

  updateUserInfo(name, about) {
    return (
      fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this._authorization,
          'Content-Type': this._contentType
        },
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
      .then(res => this._getResponseData(res))             
    )
  }

  addNewCard(name, link) {
    return (
      fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: {
          authorization: this._authorization,
          'Content-Type': this._contentType
        },
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .then(res => this._getResponseData(res))       
    )    
  }

  deleteCard(cardId) {
    return (
      fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._authorization
        }
      })
      .then(res => this._getResponseData(res)) 
    )    
  }

  toggleLike(cardId, method) {
    return (
      fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: method,
        headers: {
          authorization: this._authorization
        }
      })
      .then(res => this._getResponseData(res))
    )      
  }

  changeAvatar(link) {
    return (
      fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this._authorization,
          'Content-Type': this._contentType
        },
        body: JSON.stringify({
          avatar: link,
        })
      })
      .then(res => this._getResponseData(res))       
    )    
  }
}

export default Api;
