
import axios from 'axios';

const LOGIN_URL = 'https://f61af668aa92.ngrok.io/api/v1/rest-auth/login/';
const REGISTER_URL = 'https://f61af668aa92.ngrok.io/api/v1/rest-auth/registration/';
const ALERTS_URL = 'https://f61af668aa92.ngrok.io/api/v1/';
// const UPDATE_PROFILE = 

export default class Authentication{
    constructor() {
        // this.
    }

    login = (username, password) => {
        return axios.post(LOGIN_URL, {username:username, password:password}).then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    }

    register = (user) => {
        console.log("Registering user");

        return axios.post(REGISTER_URL, user).then(response => {
            console.log(response.data);
            // get keys or errors
            if(response.data.keys) {
                // save the key to async storage

            } else {
                // render the errors on the user interface

            }

            return response;
        })
        .catch(error => {
            console.log(error);

            // failed registration
            return {error:'Failed Registration'};
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