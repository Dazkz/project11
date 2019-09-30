import {formsValidation} from './validate.js'
export default class PopUp {
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
          <h3 class="popup__title">Редактировать место</h3>
          <img src="${require('../images/close.svg')}" alt="" class="popup__close">
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
      this.nameInput.value = document.querySelector(".user-info__name").textContent;
      this.jobInput.value = document.querySelector('.user-info__job').textContent;
      this.nameInput.addEventListener('input',formsValidation);
      this.jobInput.addEventListener('input',formsValidation);
      }
      const newCard = () => {
        this.container.innerHTML = `<div class="popup__content">
          <h3 class="popup__title">Новое место</h3>
          <img src="${require('../images/close.svg')}" alt="" class="popup__close">
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
          <img src="${require('../images/close.svg')}" alt="" class="popup__close">
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