import {Api} from "../modules/Api.js";
export const api = new Api({
  baseUrl:'http://95.216.175.5/cohort2',
  headers: {
    authorization: '99409180-52be-48fe-83e5-acb0bdc1ccd1',
    'Content-Type': 'application/json' 
  }
});