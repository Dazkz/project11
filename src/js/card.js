export default class Card {
    constructor (name,link) {
      this.name = name;
      this.link = link;
    }
    like(event) {
      event.target.classList.toggle('place-card__like-icon_liked');
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