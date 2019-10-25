    export let Api =class Api {
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