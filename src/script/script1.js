/*!!!!!!!!!!!!!!!!
Добавил решение доп.заданий, просьба их тоже проверить
*/



/* consts */

const imageList=document.querySelector('.places-list');
const popupImage = document.querySelector('.popup');
const popupEdit = document.querySelector('.popupEdit');
const popupPhoto=document.querySelector('.popupPhoto')
const buttonPopup = document.querySelector('.button-add');
const buttonPopupPlus = document.querySelector('.button-add_plus')
const buttonPopupEdit = document.querySelector('.button-edit');
const buttonAvatarPhoto= document.querySelector('.button-avatar__Photo');
const popupClosed = document.querySelector('.popup__close');
const popupEditClosed = document.querySelector('.popupEdit__close');
const formEdit = document.forms.newNameJob;
const userName = document.querySelector('.user-info__name');
const userJob = document.querySelector('.user-info__job');
const userPhoto = document.querySelector('.user-info__photo')
const newImage = document.querySelector('.place-card');
const popupButton = document.querySelector('.popup__button')
const buttonEditName = document.querySelector('.button-edit_Name')
const errorSecondName = document.querySelector('.errorSecondName')
const errorJob = document.querySelector('.errorJob')
const formValidationCard = document.forms.newImagefu;
const errorAvatar=document.querySelector('.errorAvatarPhoto');
const formValidationNameJob = document.forms.newNameJob;
const imageOpen = document.querySelector('.imageOpen');
const imageOpenSrc = document.querySelector('.imageOpen__img');
const formAvatarUrl= document.forms.newPhoto;





/* classes */
class Card {
  constructor (name, link, cer) {
    this.cardElement = this.createCard(name, link);
    this.cardElement.querySelector('.place-card__like-icon').addEventListener('click',this.like);
    this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click',this.remove);
    this.cardElement.querySelector('.place-card__image').addEventListener('click',this.openImage);


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

  like(event){

    event.target.classList.toggle('place-card__like-icon_liked');
  };
  /* big image */
  openImage(){
    imageOpen.setAttribute('style', 'background-image:' + event.target.style.backgroundImage);
    imageOpen.classList.add('active');
    const closeImage=document.querySelector('.imageOpen__close').addEventListener('click',function()
    {
      imageOpen.classList.remove('active');
    });
  };

  remove(){
   const imageChild = event.target.closest(`.place-card`);

   function   removeChild (parent,child) {
    parent.removeChild(child);
  }

  api.removeCard(imageChild.getAttribute('id'))
    .then(() =>{
      removeChild(imageList,imageChild)
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });


  event.stopPropagation();
  }
}

/* container images */
class CardList {
  constructor(cardContainer,arr) {
    this.cardContainer = cardContainer;
    this.cards=[];
  }
  /* user add card */
  addCard(name,link,id) {
    const { cardElement } = new Card(name,link);
    this.cards.push(cardElement);
    this.cardContainer.appendChild(cardElement);
    cardElement.setAttribute('id',id);
    
  }
  
  
}
class AvatarPhoto{
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

class PopupName{
  constructor(popupImage){
    this.popupImage = popupImage;
    this.popupImage.addEventListener('click',this.open);
    this.bit = document.querySelector('.popup__close').addEventListener('click',this.close
      )  }
    open(){
      popupImage.classList.add('popup_is-opened');

    }
    close(){
     popupImage.classList.remove('popup_is-opened');
   }

 }
 class PopupJob{
  constructor(popupEdit){
    this.popupEdit = popupEdit;
    this.popupEdit.addEventListener('click',this.open);
    this.bil = document.querySelector('.popupEdit__close').addEventListener('click',this.close);
    const userDefaultName = document.querySelector('.popup__input_type_userName');
    const userDefaultJob = document.querySelector('.popup__input_type_userJob');
    userDefaultName.value=userName.textContent;
    userDefaultJob.value=userJob.textContent;
  }
  open(){
   const userDefaultName = document.querySelector('.popup__input_type_userName');
   const userDefaultJob = document.querySelector('.popup__input_type_userJob');
   userDefaultName.value=userName.textContent;
   userDefaultJob.value=userJob.textContent;
   popupEdit.classList.add('popupEdit_is-opened');

 }
 close(){
   const userDefaultName = document.querySelector('.popup__input_type_userName');
   const userDefaultJob = document.querySelector('.popup__input_type_userJob');
   userDefaultName.value=userName.textContent;
   userDefaultJob.value=userJob.textContent;
   popupEdit.classList.remove('popupEdit_is-opened');
 }

}

      class Api {
        constructor(options) {
          this.options = options;
        }
        /* add 10 images */
        getInitialCards(){
         return fetch(this.options.baseUrl+`/cards`, {
            headers: {
              authorization:this.options.headers.authorization
            },
          })
          .then((res) => {
            if (res.ok){
              return res.json()
            }
            else {

              return Promise.reject(`Ошибка: ${res.status}`)

            }
          })
        }

        addServerCard(name, link){
          return fetch(this.options.baseUrl+`/cards`, {
            method:'POST',
            headers: this.options.headers,
            body: JSON.stringify({
              name: name,
              link: link
            })
          })
          .then ((res) => {
              if (res.ok) {
              res.json()
            }
            else {
              return Promise.reject(`Ошибка: ${res.status}`)
            }
          })
          .catch((err) => {  
            console.log(err); // выведем ошибку в консоль
          }); 
        }

        sendName(sec,jo) {
          return fetch(this.options.baseUrl+`/users/me`, {
            method: 'PATCH',
            headers: this.options.headers,
            body: JSON.stringify({
              name: sec,
              about: jo
            })
          })
          .then ((res) => {
           if (res.ok) {
             res.json()
           }
           else {
            return Promise.reject(`Ошибка: ${res.status}`)
          }
          })
          

        }
        removeCard(id){
          return fetch(this.options.baseUrl+`/cards/`+id, {
            method:'DELETE',
            headers: this.options.headers
          })


          .then ((res) => {
            if (res.ok) {
             res.json()
            }
            else {
            return Promise.reject(`Ошибка: ${res.status}`)
            }
          })
           
        }

        getProfile(){
          return fetch(this.options.baseUrl+`/users/me`, {
            headers: {
              authorization: '99409180-52be-48fe-83e5-acb0bdc1ccd1'
            }
          })
          .then ((res) => {
            if (res.ok) {
              return res.json()
            }
            else {
              return Promise.reject(`Ошибка: ${res.status}`)
            }
          })
          
        }
        editAvatar(url){

          fetch(this.options.baseUrl+`/users/me/avatar`, {
           method: 'PATCH',
           headers: this.options.headers,
           body: JSON.stringify({
            avatar:url
          })
         })
          .then ((res) => {
            if (res.ok) {
              return res.json()
            }
            else {
              return Promise.reject(`Ошибка: ${res.status}`)
            }
          })
       
          userPhoto.setAttribute('style', 'background-image: url(' + url + ')');
        }
      }
// add popup window
const api = new Api({
  baseUrl:'http://95.216.175.5/cohort2',
  headers: {
    authorization: '99409180-52be-48fe-83e5-acb0bdc1ccd1',
    'Content-Type': 'application/json' 
  }
});


api.getInitialCards()
  .then ((date) => {
  date.forEach(function(item, i, arr,id){
    cardList.addCard(date[i].name, date[i].link,date[i]._id);
    })
  })
  .catch((err) => {
  console.log(err); // выведем ошибку в консоль
}); 


api.getProfile()
  .then ((date) => {
    userName.textContent=date.name;
    userJob.textContent=date.about;
    userPhoto.setAttribute('style', 'background-image: url(' + date.avatar + ')');
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
});
//User addCard 

function additionalCard(event) {
  event.preventDefault();
  
  /* Надо исправить: карточка добавляется на страницу до ответа сервера,  */
  api.addServerCard(formName.elements.name.value,formName.elements.link.value);
  cardList.addCard(formName.elements.name.value, formName.elements.link.value);
  buttonPopupPlus.textContent ='Загрузка..'
  popupImage.classList.remove('popup_is-opened');
  formName.reset();
  buttonPopupPlus.textContent='+'
}
const formName = document.forms.newImagefu;
const cardList = new CardList(document.querySelector('.places-list'))




function buttonLoading() {

  buttonEditName.textContent = 'Загрузка..';
}




//User change name/job
function editNameJob (event) {
  event.preventDefault();

  const form = document.forms.newNameJob;
  const secondName = form.elements.secondName;
  const job = form.elements.job;
  const sec=secondName.value;
  const jo=job.value;

  api.sendName(secondName.value,job.value)
    .then(()=> {
       userName.textContent = secondName.value;
        userJob.textContent = job.value
     })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  buttonEditName.setAttribute('disabled',true);
  buttonLoading();
  popupEdit.classList.remove('popupEdit_is-opened');
  
}
function validationCard (event) {
  popupImage.classList.add('popup_is-opened');
  buttonPopupPlus.setAttribute('disabled',true);
  
}

function validationCardDisabled (event) {
  const name = formValidationCard.elements.name;
  const link = formValidationCard.elements.link;


  function validateNameField(field) {
   if (field.value.length === 0 ) {

    buttonPopupPlus.setAttribute('disabled',true);
    buttonPopupPlus.classList.remove('button__disabled');

  }
  else if ((field.value.length>30 ) || (field.value.length<2)) {

    buttonPopupPlus.setAttribute('disabled',true);
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


function validationNameJobDefault (event) {

  const secondName = formValidationNameJob.elements.secondName;
  const job = formValidationNameJob.elements.job;
  // Можно лучше: Лучше удалять console.log когда отправляешь на проверку
  errorJob.textContent = '';
  errorSecondName.textContent = '';


  function validateTextField(field, errorElement) {
   if (field.value.length === 0 ) {

     errorElement.textContent = 'Это обязательное поле';
     buttonEditName.setAttribute('disabled',true);
     buttonEditName.classList.remove('button__disabled');

   }
   else if ((field.value.length>30 ) || (field.value.length<2)) {
     errorElement.textContent = 'Должно быть от 2 до 30 символов'; 
     buttonEditName.setAttribute('disabled',true);
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

function valadationUrlAvatarDisabled(event){
  const urlAvatar = formAvatarUrl.elements.avatarPhoto;
  errorAvatar.textContent='';
  function validateUrlName(field){
    if(field.value.length ===0){
      errorAvatar.textContent='Должна быть ссылка на аватар';
      buttonAvatarPhoto.setAttribute('disabled',true);
      buttonAvatarPhoto.classList.remove('button__disabled');
    }
    else {
      buttonAvatarPhoto.removeAttribute('disabled');
      buttonAvatarPhoto.classList.add('button__disabled');
    }
  }
  validateUrlName(urlAvatar);
}

function validationNameJob (event) {

  popupEdit.classList.add('popupEdit_is-opened');

  const userDefaultName = document.querySelector('.popup__input_type_userName');
  const userDefaultJob = document.querySelector('.popup__input_type_userJob');

  userDefaultName.value=userName.textContent;
  userDefaultJob.value=userJob.textContent;
};
function editAvatarPhoto(event){
  event.preventDefault();
  const form=formAvatarUrl.elements.avatarPhoto.value;

  api.editAvatar(form)
    .then(() => {
  popupPhoto.classList.remove('popupAvatar_is-opened')
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }); 

}
avatarphoto = new AvatarPhoto(userPhoto);
popupName = new PopupName (buttonPopup);
popupJob = new PopupJob(buttonPopupEdit);

/* Слушатели событий */

formName.addEventListener('submit', additionalCard);
formEdit.addEventListener('submit', editNameJob);

formValidationCard.addEventListener('input', validationCardDisabled);
formValidationNameJob.addEventListener('input', validationNameJobDefault);
formAvatarUrl.addEventListener('input',valadationUrlAvatarDisabled);
formAvatarUrl.addEventListener('submit', editAvatarPhoto);

/*
  Теперь код работы с сервером организован правильно и работает без ошибок, хорошая работа.
  Отлично, что реализована часть дополнительного задания, но не стоит забывать, что
  изменять DOM необходимо только после ответа сервера.

  Также почемуто не получается отправить карточку, когда введена длинная ссылка, 
  кнопка неактивна - http://prntscr.com/ouyhbj, возможно на поле есть проверка по 
  длинне текста, этого быть не должно.
  
*/