class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._method = options.method;
    this._authorization = options.headers.authorization;
    this._contentType = options.headers['Content-Type'];
  }

  getInitialCards() {
    return (
      fetch(this._baseUrl, {
        headers: {
          authorization: this._authorization
        }
      })
    )
  }

  getUserInfo() {
    return (
      fetch(this._baseUrl, {
        headers: {
          authorization: this._authorization
        }
      })
    )
  }

  updateUserInfo(name, about) {
    return (
      fetch(this._baseUrl, {
        method: this._method,
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
      fetch(this._baseUrl, {
        method: this._method,
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

  deleteCard() {
    return (
      fetch(this._baseUrl, {
        method: this._method,
        headers: {
          authorization: this._authorization
        }
      })
    )    
  }

  toggleLike() {
    return (
      fetch(this._baseUrl, {
        method: this._method,
        headers: {
          authorization: this._authorization
        }
      })
    )      
  }

  // removeLike() {
  //   return (
  //     fetch(this._baseUrl, {
  //       method: this._method,
  //       headers: {
  //         authorization: this._authorization
  //       }
  //     })
  //   )      
  // }
}

export default Api;
