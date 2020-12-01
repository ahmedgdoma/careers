export default class Auth{
    static setAuth(token){
        localStorage.setItem('token', token);
    }
    static unsetAuth(){
        localStorage.removeItem('token');
    }
    static getAuth(){
        return localStorage.getItem('token');
    }
    static valid(){
        let token = this.getAuth();
        if(token !== null){
            return true;
        }
        return false;
    }
}