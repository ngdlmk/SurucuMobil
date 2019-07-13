import Host from '../config/host';
import LoginModel from '../models/LoginModel';

export default class LoginService {
    host = new Host();

    login(userName, password) {
        let loginModel = new LoginModel();
        loginModel.UserEmail = userName;
        loginModel.UserPass = password;

        return fetch(this.host.ServiceUrl + 'Login/LoginUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginModel),
        }).then(function (result) {
            return result.json();
        });
    }
}


