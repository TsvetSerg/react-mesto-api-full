class Api {
  constructor(options) {
      this._url = options.baseUrl
      this._headers = options.headers
  }


  _checked(res) {     // Проверяем чтоо все ок
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInfoUser () {     // Делаем запрос для получения данных поользоователя
    return fetch(this._url + '/users/me', {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checked)
  }

  getInitialCards() {     // Делаем запрос для получения данных карточек
    return fetch(this._url + '/cards', {
        method: 'GET',
        headers: this._headers
      })
      .then(this._checked)
    }

  patchInfoUser(input) {     // Отправляем новые данные из инпутов на сервер
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: input.name,
        about: input.about
      })
    })
    .then(this._checked)
  }

  postNewCard(input) {     // отправлем данные новой картоочки на сервер
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: input.name,
        link: input.link
      })
    })
    .then(this._checked)
  }

  deleteCard(cardId) {     // Удаляем карточку с сервера
    return fetch(this._url + `/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checked)
  }

  putLikeCard(cardId) {     // ООтправляем данные что пооставилии лайк
    return fetch(this._url + `/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._checked)
  }

  deleteLikeCard(cardId) {     // Удаляем данные о лайке с сервера
    return fetch(this._url + `/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checked)
  }

  patchNewAvatar(input) {     // Отправляем новые данные из инпутов на сервер
    return fetch(this._url + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: input.avatar // html: <img name="avatarInpur">
      })
    })
    .then(this._checked)
  }

  setToken(token) {
    this._headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }
}

const apiClass = new Api({                             // записываем стартовый экземпляп
  baseUrl: 'https://api.mestoproject.students.nomoredomains.xyz',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
});

export default apiClass;
