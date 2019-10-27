import { userName, userJob, popupEdit } from "../modules/consts.js"
export class PopupJob {
  constructor(popupEdit) {
    this.popupEdit = popupEdit;
    this.popupEdit.addEventListener('click', this.open);
    this.bil = document.querySelector('.popupEdit__close').addEventListener('click', this.close);
    const userDefaultName = document.querySelector('.popup__input_type_userName');
    const userDefaultJob = document.querySelector('.popup__input_type_userJob');
    userDefaultName.value = userName.textContent;
    userDefaultJob.value = userJob.textContent;
  }
  open() {
    const userDefaultName = document.querySelector('.popup__input_type_userName');
    const userDefaultJob = document.querySelector('.popup__input_type_userJob');
    userDefaultName.value = userName.textContent;
    userDefaultJob.value = userJob.textContent;
    popupEdit.classList.add('popupEdit_is-opened');

  }
  close() {
    const userDefaultName = document.querySelector('.popup__input_type_userName');
    const userDefaultJob = document.querySelector('.popup__input_type_userJob');
    userDefaultName.value = userName.textContent;
    userDefaultJob.value = userJob.textContent;
    popupEdit.classList.remove('popupEdit_is-opened');
  }

}