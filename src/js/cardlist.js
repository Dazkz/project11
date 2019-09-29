import Card from './card.js'
export default class CardList {
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
    remove(event) {
        this.container.removeChild(event.target.parentElement.parentElement);
      }
  }