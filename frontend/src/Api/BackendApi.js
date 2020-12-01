import Auth from '../Auth/Auth';
import { apiLink } from './global';
export default class BackendApi{
    obj = {};
    
    constructor(is_auth = false){
        this.obj = {
            headers: {
              "Content-Type": "application/json",
            'Accept': 'application/json'
            }
          }
          if(is_auth){
              this.obj.headers.Authorization = 'bearer ' + Auth.getAuth()
          }
    }
    get(target){
        this.obj.method = 'GET';
        return fetch(apiLink+target, this.obj);
    }

    post(target, data = {}){
      this.obj.method = 'POST';
      this.obj.body = JSON.stringify(data)
      return fetch(apiLink+target, this.obj);
  }
}