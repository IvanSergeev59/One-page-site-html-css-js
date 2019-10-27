
import { imageOpen } from "../modules/consts.js"
import { api } from "../modules/apiUrl.js"
export class Card {
  constructor(name, link, cer) {
    this.cardElement = this.createCard(name, link);
    this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
    this.cardElement.querySelector('.place-card__image').addEventListener('click', this.openImage);


  }
  createCard(nameValue, linkValue) {

    const newImage = document.createElement('div');
    const newCardImage = document.createElement('div');
    const newButtonDel = document.createElement('button-add');
    const newCardDescription = document.createElement('div');
    const newCardName = document.createElement('h3');
    const newButtonLike = document.createElement('button-add');
    newImage.classList.add('place-card');
    newImage.appendChild(newCardImage);
    newCardImage.classList.add('place-card__image');
    newCardImage.setAttribute('style', 'background-image: url(' + linkValue + ')');

    newCardImage.appendChild(newButtonDel);
    newButtonDel.classList.add('place-card__delete-icon');

    newImage.appendChild(newCardDescription);
    newCardDescription.classList.add('place-card__description');

    newCardDescription.appendChild(newCardName);
    newCardName.classList.add('place-card__name');
    newCardName.textContent = nameValue;

    newCardDescription.appendChild(newButtonLike);
    newButtonLike.classList.add('place-card__like-icon');

    return newImage;

  };

  like(event) {

    event.target.classList.toggle('place-card__like-icon_liked');
  };
  /* big image */
  openImage() {
    imageOpen.setAttribute('style', 'background-image:' + event.target.style.backgroundImage);
    imageOpen.classList.add('active');
    const closeImage = document.querySelector('.imageOpen__close').addEventListener('click', function () {
      imageOpen.classList.remove('active');
    });
  };

  remove() {
    const imageChild = event.target.closest(`.place-card`);

    function removeChild(parent, child) {
      parent.removeChild(child);
    }

    api.removeCard(imageChild.getAttribute('id'))
      .then(() => {
        removeChild(imageList, imageChild)
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });


    event.stopPropagation();
  }
}