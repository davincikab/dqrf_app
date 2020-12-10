
import axios from 'axios';
const API_URL = 'https://202f6cf355c6.ngrok.io'
const LOGIN_URL = API_URL + '/api/v1/rest-auth/login/';
const REGISTER_URL = API_URL + '/api/v1/rest-auth/registration/';
const ALERTS_URL = API_URL + '/api/v1/';
// const UPDATE_PROFILE = 

export default class Authentication {
    constructor() {
        // this.
    }

    login = (username, password) => {
        return axios.post(LOGIN_URL, {username:username, password:password}).then(response => {
            console.log(response);
            return response;
        })
        .catch(error => {
            return error.response;
        })
    }

    register = (user) => {
        console.log("Registering user: " + JSON.stringify(user));
        console.log(REGISTER_URL);

        return axios.post(REGISTER_URL, user).then(response => {
            console.log(response);
            return response;
        })
        .catch(error => {
            // failed registration
            return error.response;
        });
    }



}

// 'username',
// 'email',
// 'password',
// 'password2',
// 'residence',
// 'mobile_no',
// 'first_name',
// 'last_name'