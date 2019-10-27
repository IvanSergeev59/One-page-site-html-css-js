import { Card } from "../modules/Card.js"
export class CardList {
  constructor(cardContainer, arr) {
    this.cardContainer = cardContainer;
    this.cards = [];
  }
  /* user add card */
  addCard(name, link, id) {
    const { cardElement } = new Card(name, link);
    this.cards.push(cardElement);
    this.cardContainer.appendChild(cardElement);
    cardElement.setAttribute('id', id);

  }


}
