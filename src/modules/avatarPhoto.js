import {popupPhoto} from "../modules/consts.js"
export let AvatarPhoto= class AvatarPhoto{
  constructor(avatarUrl){
    this.avatarUrl=avatarUrl;
    this.avatarUrl.addEventListener('click',this.open);
    this.avatarClose= document.querySelector('.popupPhoto__close').addEventListener('click',this.close)
  }
  open(){
    popupPhoto.classList.add('popupAvatar_is-opened');
  }
  close(){
    popupPhoto.classList.remove('popupAvatar_is-opened');
  }
}