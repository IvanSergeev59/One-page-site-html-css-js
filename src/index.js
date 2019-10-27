/* import {AvatarPhoto} from "./modules/avataPhoto.js" */

/*!!!!!!!!!!!!!!!!
Добавил решение доп.заданий, просьба их тоже проверить
*/


/* consts */
import "./index.css";
import { AvatarPhoto } from "./modules/avatarPhoto.js"
import { PopupJob } from "./modules/PopupJob.js"
import { PopupName } from "./modules/PopupName.js"
import { CardList } from "./modules/CardList.js"
import { api } from "./modules/apiUrl.js"
const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort2' : 'https://praktikum.tk/cohort2'
const popupImage = document.querySelector('.popup');
const popupEdit = document.querySelector('.popupEdit');
const popupPhoto = document.querySelector('.popupPhoto')
const buttonPopup = document.querySelector('.button-add');
const buttonPopupPlus = document.querySelector('.button-add_plus')
const buttonPopupEdit = document.querySelector('.button-edit');
const buttonAvatarPhoto = document.querySelector('.button-avatar__Photo');
const formEdit = document.forms.newNameJob;
const userName = document.querySelector('.user-info__name');
const userJob = document.querySelector('.user-info__job');
const userPhoto = document.querySelector('.user-info__photo')
const buttonEditName = document.querySelector('.button-edit_Name')
const errorSecondName = document.querySelector('.errorSecondName')
const errorJob = document.querySelector('.errorJob')
const formValidationCard = document.forms.newImagefu;
const errorAvatar = document.querySelector('.errorAvatarPhoto');
const formValidationNameJob = document.forms.newNameJob;
const formAvatarUrl = document.forms.newPhoto;


api.getInitialCards()
  .then((date) => {
    date.forEach(function (item, i, arr, id) {
      cardList.addCard(date[i].name, date[i].link, date[i]._id);
    })
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
api.getProfile()
  .then((date) => {
    userName.textContent = date.name;
    userJob.textContent = date.about;
    userPhoto.setAttribute('style', 'background-image: url(' + date.avatar + ')');
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
//User addCard 

function additionalCard(event) {
  event.preventDefault();

  /* Надо исправить: карточка добавляется на страницу до ответа сервера,  */
  api.addServerCard(formName.elements.name.value, formName.elements.link.value);
  cardList.addCard(formName.elements.name.value, formName.elements.link.value);
  buttonPopupPlus.textContent = 'Загрузка..'
  popupImage.classList.remove('popup_is-opened');
  formName.reset();
  buttonPopupPlus.textContent = '+'
}
const formName = document.forms.newImagefu;
const cardList = new CardList(document.querySelector('.places-list'))


function buttonLoading() {

  buttonEditName.textContent = 'Загрузка..';
}

//User change name/job
function editNameJob(event) {
  event.preventDefault();

  const form = document.forms.newNameJob;
  const secondName = form.elements.secondName;
  const job = form.elements.job;
  const sec = secondName.value;
  const jo = job.value;

  api.sendName(secondName.value, job.value)
    .then(() => {
      userName.textContent = secondName.value;
      userJob.textContent = job.value
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  buttonEditName.setAttribute('disabled', true);
  buttonLoading();
  popupEdit.classList.remove('popupEdit_is-opened');

}
function validationCard(event) {
  popupImage.classList.add('popup_is-opened');
  buttonPopupPlus.setAttribute('disabled', true);

}

function validationCardDisabled(event) {
  const name = formValidationCard.elements.name;
  const link = formValidationCard.elements.link;


  function validateNameField(field) {
    if (field.value.length === 0) {

      buttonPopupPlus.setAttribute('disabled', true);
      buttonPopupPlus.classList.remove('button__disabled');

    }
    else if ((field.value.length > 30) || (field.value.length < 2)) {

      buttonPopupPlus.setAttribute('disabled', true);
      buttonPopupPlus.classList.remove('button__disabled');
    }
    else {
      buttonPopupPlus.removeAttribute('disabled');
      buttonPopupPlus.classList.add('button__disabled');
    }
  }

  validateNameField(name);
  validateNameField(link);
};

// remove popup window


function validationNameJobDefault(event) {

  const secondName = formValidationNameJob.elements.secondName;
  const job = formValidationNameJob.elements.job;
  // Можно лучше: Лучше удалять console.log когда отправляешь на проверку
  errorJob.textContent = '';
  errorSecondName.textContent = '';


  function validateTextField(field, errorElement) {
    if (field.value.length === 0) {

      errorElement.textContent = 'Это обязательное поле';
      buttonEditName.setAttribute('disabled', true);
      buttonEditName.classList.remove('button__disabled');

    }
    else if ((field.value.length > 30) || (field.value.length < 2)) {
      errorElement.textContent = 'Должно быть от 2 до 30 символов';
      buttonEditName.setAttribute('disabled', true);
      buttonEditName.classList.remove('button__disabled');
    }
    else {
      buttonEditName.removeAttribute('disabled');
      buttonEditName.classList.add('button__disabled');
    }

  }

  validateTextField(job, errorJob);
  validateTextField(secondName, errorSecondName);

};

function valadationUrlAvatarDisabled(event) {
  const urlAvatar = formAvatarUrl.elements.avatarPhoto;
  errorAvatar.textContent = '';
  function validateUrlName(field) {
    if (field.value.length === 0) {
      errorAvatar.textContent = 'Должна быть ссылка на аватар';
      buttonAvatarPhoto.setAttribute('disabled', true);
      buttonAvatarPhoto.classList.remove('button__disabled');
    }
    else {
      buttonAvatarPhoto.removeAttribute('disabled');
      buttonAvatarPhoto.classList.add('button__disabled');
    }
  }
  validateUrlName(urlAvatar);
}

function validationNameJob(event) {

  popupEdit.classList.add('popupEdit_is-opened');

  const userDefaultName = document.querySelector('.popup__input_type_userName');
  const userDefaultJob = document.querySelector('.popup__input_type_userJob');

  userDefaultName.value = userName.textContent;
  userDefaultJob.value = userJob.textContent;
};
function editAvatarPhoto(event) {
  event.preventDefault();
  const form = formAvatarUrl.elements.avatarPhoto.value;

  api.editAvatar(form)
    .then(() => {
      popupPhoto.classList.remove('popupAvatar_is-opened')
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });

}
var avatarphoto = new AvatarPhoto(userPhoto);
var popupName = new PopupName(buttonPopup);
var popupJob = new PopupJob(buttonPopupEdit);

/* Слушатели событий */

formName.addEventListener('submit', additionalCard);
formEdit.addEventListener('submit', editNameJob);

formValidationCard.addEventListener('input', validationCardDisabled);
formValidationNameJob.addEventListener('input', validationNameJobDefault);
formAvatarUrl.addEventListener('input', valadationUrlAvatarDisabled);
formAvatarUrl.addEventListener('submit', editAvatarPhoto);

/*
  Теперь код работы с сервером организован правильно и работает без ошибок, хорошая работа.
  Отлично, что реализована часть дополнительного задания, но не стоит забывать, что
  изменять DOM необходимо только после ответа сервера.

  Также почемуто не получается отправить карточку, когда введена длинная ссылка, 
  кнопка неактивна - http://prntscr.com/ouyhbj, возможно на поле есть проверка по 
  длинне текста, этого быть не должно.
  
*/

export { serverUrl }