import { apiLink } from './global';
export default class BackendApi{
    obj = {};
    constructor(is_auth = false){
        this.obj = {
            headers: {
                'Access-Control-Allow-Origin': '*',
              'Accept': 'application/json'
            }
          }
          if(is_auth){
              this.obj.Authorization = 'bearer '
          }
    }
    get(target){
        this.obj.method = 'GET';
        return fetch(apiLink+target, {
            
            headers: {
              'Accept': 'application/json'
            }
          });
    }

    post(target, data){
      this.obj.method = 'POST';
      console.log(data);
      return fetch(apiLink+target, {
          method: this.obj.method,
          
          headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
          },
          body: JSON.stringify(data)
        });
  }
}