/*
Токен: 29d14465-8192-42d7-b8a9-321684888aa5
Идентификатор группы: cohort2
*/
class Api {
  constructor(options) {
     this.baseUrl = options.baseUrl;
     this.headers = options.headers;
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
      api.getUserData()
      .then((obj) => {
        userName.textContent = obj.name;
        userJob.textContent = obj.about;
      })
      .catch((err) => console.log(err));  // <-- обработка ошибок здесь, в самом конце цепочки then
    }
  */

  getUserData() {
    fetch(`${this.baseUrl}/users/me`,{
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
      userName.textContent = obj.name;
      userJob.textContent = obj.about;
    })
    .catch((err) => console.log(err));
  }
  getCards() {
    fetch(`${this.baseUrl}/cards`,{
      headers: this.headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .then((cards) => {
      cardList.render(cards);
    })
    .catch((err) => console.log(err));
  }
  patchUserData(name,job) {
    const button = document.querySelector('.popup__button')
    button.textContent = 'Загрузка...'
    fetch(`${this.baseUrl}/users/me`,{
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: `${name}`,
        about: `${job}`  
      })
    })
    .then ((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`); 
    })
    .then ((data) => {
      userName.textContent = data.name;
      userJob.textContent = data.about;
    })
    .catch((err) => console.log(err))
  }
  loadNewCard(name,link) {
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
    .then ((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.respond}`);
    })
    .then ((obj) => {
      cardList.addCard(obj.name,obj.link);
  })
  .catch((err) => console.log(err));
  }
}
class Card {
  constructor (name,link) {
    this.name = name;
    this.link = link;
  }
  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }
  remove(event) {
    cardList.container.removeChild(event.target.parentElement.parentElement);
  }
  create(container) {
    /**
     * Нужно избавиться от подобной интерполяции, так как позволяет провести
     * инжекцию.
     * 
     * Куда-то поехало форматирование и потерялась точка с запятой.
     * 
     * Исправлено
     */
    this.newCard = document.createElement('div');
    this.newCard.classList.add('place-card');
    this.newCard.innerHTML += (`
      <div class="place-card__image" style="">
        <button class="place-card__delete-icon"></button>
      </div>
      <div class="place-card__description">
        <h3 class="place-card__name"></h3>
          <button class="place-card__like-icon"></button>
      </div>`);
    this.newCard.querySelector('h3').textContent = this.name;
    this.newCard.querySelector('.place-card__image').setAttribute('style',`background-image:url(${this.link})`);
    container.appendChild(this.newCard);
  }
}
class CardList {
  constructor(container) {
    this.container = container;
  }
  addCard(name,link) {
    /**
     * Давай поправим здесь логику - контейнер должен добавлять карточку в себя,
     * а не карточка должна добавлять себя в контейнер:
     * 
     * const card = new Card(name, link);
     * this.container.appendChild(card.render());
     */
    new Card(name,link).create(this.container);
  }
  render(initialCards) {
    /**
     * Совет: используя стрелочные функции можно не сохранять 'this' ;)
     * 
     * this.cards.forEach((card) => this.addCard(card.name, card.link));
     * 
     * Исправлено
     */
    initialCards.forEach((current) => {
     this.addCard(current.name,current.link);
   }); 
  }
}
class PopUp {
  constructor(button,container) {
  this.container = container;
  this.button = button;
  }
  /**
   * Какой-то совершенно огромный метод инициализации. Было бы хорошо разнести его
   * на отдельные методы, в зависимости от того, для чего попап открывается.
   * 
   * Исправлено, хотя бы так )
   */
  open() {
    const edit = () => {
      this.container.innerHTML = `<div class="popup__content">
        <img src="./images/close.svg" alt="" class="popup__close">
        <h3 class="popup__title">Редактировать место</h3>
        <form class="popup__form" name="edit">
            <input type="text" name="name" class="popup__input popup__input_type_name" placeholder='Имя'>
            <span class='popup__error' id='your-name-error' aria-live="polite"></span>
            <input type="text" name="job" class="popup__input popup__input_type_job" placeholder='О себе'>
            <span class='popup__error' id='job-error' aria-live="polite"></span>
            <button type  class="button popup__button popup__button_edit">Сохранить</button>
        </form>
      </div>`
    this.nameInput = document.forms.edit.name;
    this.jobInput = document.forms.edit.job;
    this.nameInput.value = userName.textContent;
    this.jobInput.value = userJob.textContent;
    this.nameInput.addEventListener('input',formsValidation);
    this.jobInput.addEventListener('input',formsValidation);
    }
    const newCard = () => {
      this.container.innerHTML = `<div class="popup__content">
        <img src="./images/close.svg" alt="" class="popup__close">
        <h3 class="popup__title">Новое место</h3>
        <form class="popup__form" name="new">
            <input type="text" name="name" class="popup__input popup__input_type_name" placeholder="Название">
            <span class='popup__error' id='name-error' aria-live="polite"></span>
            <input type="text" name="link" class="popup__input popup__input_type_link-url" placeholder="Ссылка на картинку">
            <span class='popup__error' id='link-error' aria-live="polite"></span>
            <button type  class="button popup__button" disabled>+</button>
        </form>
      </div>`
      this.nameInput = document.forms.new.name;
      this.linkInput = document.forms.new.link;
      this.nameInput.addEventListener('input',formsValidation);
      this.linkInput.addEventListener('input',formsValidation);
    }
    const image = () => {
      const bgLink = event.target.getAttribute('style');
      const link = bgLink.substr(bgLink.indexOf('(')+1,bgLink.indexOf(')') - bgLink.indexOf('(') - 1);
      /**
       * Ещё одно потенциальное место для инжекции.
       * 
       * Исправлено
       */
      this.container.innerHTML = `<div class="image-window">
        <img class="image-window__image" src="">
        <img src="./images/close.svg" alt="" class="popup__close">
      </div>`
      this.container.querySelector('.image-window__image').setAttribute('src',link);
    }
    this.container.classList.add('popup_is-opened');
    return {edit, newCard, image};
  } 
  close() {
      this.container.classList.remove('popup_is-opened');
      this.container.innerHTML = '';
      this.button = '';
  }
}

let initialCards = [];
const cardList = new CardList(document.querySelector('.places-list'),initialCards);
const card = new Card();
const popUpContainer = document.querySelector('.popup');
const userInfoButton = document.querySelector(".user-info__button");
const editInfoButton = document.querySelector('.edit-info__button');
const userName = document.querySelector(".user-info__name");
const userJob = document.querySelector('.user-info__job');
const api = new Api({
  baseUrl: 'http://95.216.175.5/cohort2',
  headers: {
    authorization: '29d14465-8192-42d7-b8a9-321684888aa5',
    'Content-Type': 'application/json'
  }
});
let popup = '';

// Можно лучше: переименовать в renderButton
const buttonRender = () => {
  const button = document.querySelector('.popup_is-opened').querySelector('.button');
  const currForm = button.parentElement;
  const errors = currForm.querySelectorAll('.popup__error');
    if ((errors[0].textContent !== '') || (errors[1].textContent !== '')) {
      button.setAttribute('disabled',true);
    // Можно лучше: Там где справляется css лучше использовать его. Мы можем стилизовать кнопку с атрибутом disabled с помощью селектора :disabled в css.
    } else if ((currForm.elements[0].value.length > 0) && (currForm.elements[1].value.length > 0)) {
      button.removeAttribute('disabled');
    }
  }

// Можно лучше: переименовать в validateForm
const formsValidation = (event) => {
  const currentInputName = event.target.getAttribute('name');
  const currentInput = event.target;
  const errorMessage = event.target.nextElementSibling;
  // Интересное использование switch'а - никогда такого не видел :)
  switch (true) {
    case (currentInput.value.length === 0):
      errorMessage.textContent = 'Это обязательное поле';
      break;
    case (currentInputName === 'link'):
      const valid = /^(ftp|http|https):\/\/[^ "]+$/;
      if (!(valid.test(currentInput.value))) {
        errorMessage.textContent = 'Здесь должна быть ссылка';
      } else {
        errorMessage.textContent = '';
      }
      break;
    case (currentInput.value.length < 2) || (currentInput.value.length > 30):
      errorMessage.textContent = 'Должно быть от 2 до 30 символов';
      break;
    case ((currentInput.value.length > 1) && (currentInput.value.length < 31)):
      errorMessage.textContent = '';
      break;
  }
  buttonRender();
}

//Можно лучше: Стоит придерживаться следующей структуры кода
// Переменные
// Функции
// Обработчики
// Вызов функций
// это повысит читаемость кода и сделает его визуально более привлекательным.

// Можно лучше: Вызов функций лучше писать в конце кода. Так сразу будет понятно, с чего программа начинает выполняться.

userInfoButton.addEventListener('click',() => {
  popup = new PopUp(userInfoButton, popUpContainer);
  // Хорошо получилось, молодец
  popup.open().newCard();
});
editInfoButton.addEventListener('click',() => {
  popup = new PopUp(editInfoButton, popUpContainer);
  popup.open().edit();
});
//Можно лучше: Дополнительный обработчик на кнопке не нужен. Клик по кнопке с типом submit вызывает это событие на форме.
document.querySelector('.places-list').addEventListener('click', function (event) {
  if (event.target.classList.contains('place-card__like-icon')) {
    card.like(event);
  }
  if (event.target.classList.contains('place-card__delete-icon')) {
    card.remove(event);
  }
  if (event.target.classList.contains('place-card__image')){
    popup = new PopUp(event.target,popUpContainer);
    popup.open().image();
  }
})
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup__close')) {
    popup.close();
  }
});
document.addEventListener('submit', function() {
  event.preventDefault();
  if (event.target.getAttribute('name') === 'edit') {
    api.patchUserData(document.forms.edit.name.value,document.forms.edit.job.value);
    popup.nameInput.removeEventListener('input', formsValidation);
    popup.jobInput.removeEventListener('input', formsValidation);
  } else {
    api.loadNewCard(document.forms.new.name.value,document.forms.new.link.value);
    popup.nameInput.removeEventListener('input', formsValidation);
    popup.linkInput.removeEventListener('input', formsValidation);
  }
  popup.close();
})
api.getCards();
//cardList.render(initialCards);
api.getUserData();

/*
    Хорошая работа, обязательно задание выполнено, изменение страницы происходит после ответа сервера
    и есть обработка ошибок, но лучше оставить в классе Api только запросы к серверу.

    Для закрепления полученных знаний советую сделать и оставшуюся часть задания.

    Если у Вас будет свободное время попробуйте переписать работу с сервером
    применив async/await для работы с асинхронными запросами.
    https://learn.javascript.ru/async-await
    https://habr.com/ru/company/ruvds/blog/414373/
*/


























/*
* Хорошая работа. Задание принято.
* Оставил несколько комментариев, которые помогут сделать код короче, повысят читаемость и понимание.*/

/**
 * В целом всё хорошо, молодец. Надо только немного поправить логику
 * с добавлением карточки.
 * 
 * Не уверен, что при принятии задания ты получишь этот вариант.
 * Так что поправь,и приму окончательно.
 */