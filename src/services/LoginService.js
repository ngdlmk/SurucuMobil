import Host from '../config/host';
import {LoginModel,OtpSmsModel} from '../models';

export default class LoginService {
    host = new Host();

    login(userName, password) {
        let loginModel = new LoginModel();
        loginModel.MailAddress = userName;
        loginModel.Password = password;

        return fetch(this.host.ServiceUrl + 'Login/LoginUserMobile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginModel),
        }).then(function (result) {
            return result.json();
        });
    }

    sendOtpSms(gsmNumber, message) {
        let otpSmsModel = new OtpSmsModel();
        otpSmsModel.GsmNumber = gsmNumber;
        otpSmsModel.Message = message;

        return fetch(this.host.ServiceUrl + 'Login/SendOtpSms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(otpSmsModel),
        }).then(function (result) {
            return result.json();
        });
    }

    createPasswordMobile(createPasswordMobileModel) {
        return fetch(this.host.ServiceUrl + 'Login/CreatePasswordMobile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(createPasswordMobileModel),
        }).then(function (result) {
            return result.json();
        });
    }

    updatePasswordMobile(updatePasswordMobileModel) {
        return fetch(this.host.ServiceUrl + 'Login/UpdatePasswordMobile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatePasswordMobileModel),
        }).then(function (result) {
            return result.json();
        });
    }
}


