import CardList from './cardlist.js';

export default class Api {
    constructor(options) {
        this.cardList = options.cardList;
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
        this.userName = document.querySelector(".user-info__name");
        this.userJob = document.querySelector('.user-info__job');
    }

    /*
      Можно лучше: лучше вынести из всех методов класса Api работу со страницей и DOM,
      оставив здесь только запросы к серверу и возвращать из методов промисы с данными:
  
      Например, метод getUserData: 
      getUserData() {
        return fetch(`${this.baseUrl}/users/me`,{ // <-- возвращаем промис с данными
          headers: this.headers
        })
        .then((res) => {
          if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
        })
      }
  
      Использование метода:
        apicls.getUserData()
        .then((obj) => {
          userName.textContent = obj.name;
          userJob.textContent = obj.about;
        })
        .catch((err) => console.log(err));  // <-- обработка ошибок здесь, в самом конце цепочки then
      }
    */

    getUserData() {
        fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
            .then((res) => {
                /*
                  Можно лучше: проверка ответа сервера и преобразование из json
                  дублируется во всех методах класса Api, лучше вынести в отдельный метод:
                  getResponseData(res) {
                    if (res.ok) {
                      return res.json();
                    }
                    return Promise.reject(`Ошибка: ${res.status}`);
                  }
            
                */

                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((obj) => {
                this.userName.textContent = obj.name;
                this.userJob.textContent = obj.about;
            })
            .catch((err) => console.log(err));
    }
    getCards() {
        fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
            .then((cards) => {
                this.cardList.render(cards);
            })
            .catch((err) => console.log(err));
    }
    patchUserData(name, job) {
        const button = document.querySelector('.popup__button')
        button.textContent = 'Загрузка...'
        fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: `${name}`,
                about: `${job}`
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then((data) => {
                this.userName.textContent = data.name;
                this.userJob.textContent = data.about;
            })
            .catch((err) => console.log(err))
    }
    loadNewCard(name, link) {
        const button = document.querySelector('.popup__button');
        button.textContent = 'Загрузка...'
        fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                'name': `${name}`,
                'link': `${link}`
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.respond}`);
            })
            .then((obj) => {
                this.cardList.addCard(obj.name, obj.link);
            })
            .catch((err) => console.log(err));
    }
}