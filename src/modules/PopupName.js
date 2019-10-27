import { popupImage } from "../modules/consts.js"
export class PopupName {
  constructor(popupImage) {
    this.popupImage = popupImage;
    this.popupImage.addEventListener('click', this.open);
    this.bit = document.querySelector('.popup__close').addEventListener('click', this.close
    )
  }
  open() {
    popupImage.classList.add('popup_is-opened');

  }
  close() {
    popupImage.classList.remove('popup_is-opened');
  }

}