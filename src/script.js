/*
Токен: 29d14465-8192-42d7-b8a9-321684888aa5
Идентификатор группы: cohort2
*/
import "./style.css"
import {formsValidation} from './js/validate.js';
import Api from './js/api.js';
import PopUp from './js/popupClass.js'
import Card from './js/card.js'
import CardList from "./js/cardlist";

const serverUrl = (NODE_ENV == 'development') ? 'http://praktikum.tk/cohort2' : 'https://praktikum.tk/cohort2';




const initialCards = [];
const cardList = new CardList(document.querySelector('.places-list'), initialCards);
const card = new Card();
const popUpContainer = document.querySelector('.popup');
const userInfoButton = document.querySelector(".user-info__button");
const editInfoButton = document.querySelector('.edit-info__button');
//const userName = document.querySelector(".user-info__name");
//const userJob = document.querySelector('.user-info__job');

export const api = new Api({
  baseUrl: serverUrl,
  headers: {
    authorization: '29d14465-8192-42d7-b8a9-321684888aa5',
    'Content-Type': 'application/json'
  },
  cardList: cardList
});
let popup = '';
// Можно лучше: переименовать в renderButton


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
    cardList.remove(event);
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