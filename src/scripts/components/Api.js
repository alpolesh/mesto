class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._method = options.method;
    this._authorization = options.headers.authorization;
    this._contentType = options.headers['Content-Type'];
  }

  getInitialCards() {
    return (
      fetch(`${this._baseUrl}/cards`, {
        headers: {
          authorization: this._authorization
        }
      })
    )
  }

  getUserInfo() {
    return (
      fetch(`${this._baseUrl}/users/me`, {
        headers: {
          authorization: this._authorization
        }
      })
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
    )      
  }

  // removeLike(cardId) {
  //   return (
  //     fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
  //       method: 'DELETE',
  //       headers: {
  //         authorization: this._authorization
  //       }
  //     })
  //   )      
  // }

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
    )    
  }
}

export default Api;
