
import axios from 'axios';
const API_URL = 'https://f1c9fe108adf.ngrok.io';
const LOGIN_URL = API_URL + '/api/v1/rest-auth/login/';
const REGISTER_URL = API_URL + '/api/v1/rest-auth/registration/';
const ALERTS_URL = API_URL + '/api/v1/';
const ALERTS_IMAGE_URL = API_URL + '/api/v1/alert_image/';
const ALERT_CHATS_URL = API_URL + '/api/v1/messages/';
const USER_URL = API_URL + '/api/v1/users/'
// const UPDATE_PROFILE = 

export default class Authentication {
    constructor(token="") {
        this.token = token;
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
            console.log(response.data);
            return error.response;
        });
    }

    getUser = (token, username) => {
        let headers = {
            "Authorization": `Token ${token}`
        };

        let url = USER_URL + username;
        return axios.get(url, {headers:headers}).then(response => {
            console.log(response);
            return response.data;
        })
        .catch(error => {
            console.log(error.response);
            // failed registration
            return {};
        });   
    }

    getAlerts = (token) => {
        console.log('Fetching alerts: ' + token);
        // 0ca2cf3a88f46bd1fb41823ab8090398ef55f71b
        let headers = {
            "Authorization": `Token ${token}`
        };

        return axios.get(ALERTS_URL,{headers:headers}).then(response => {
            console.log(response);
            return response.data.features;
        })
        .catch(error => {
            console.log(error.response);
            // failed registration
            return [];
        });
    }

    createAlert = (token, alert) => {
        let headers = {
            "Authorization": `Token ${token}`
        };

        // {Authorization: `Bearer ${token)}`};

        console.log("Creating Alert");
        console.log(token);
        return axios.post(
            ALERTS_URL,
            alert,
            {headers:headers}
        ).then(response => {
            console.log(response.data);
            return response;
        })
        .catch(error => {
            console.log(error.response);
            // failed registration
            return [];
        });
    }

    updateAlertImage = (token, alert_id, image) => {
        let headers = {
            "Authorization": `Token ${token}`
        };

        let url = ALERTS_IMAGE_URL + alert_id +'/';

        return axios.post(
            url,
            image,
            { headers:headers }
        ).then(response => {
            console.log(response);
            return response;
        })
        .catch(error => {
            console.log(error.response);
            // failed registration
            return [];
        });   
    }

    getAlertChats = (token, alert_id) => {
        let headers = {
            "Authorization": `Token ${token}`
        };

        let url = ALERT_CHATS_URL + alert_id + '/';
        console.log(url);
        return axios.get(
            url,
            {headers:headers}
        ).then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.log(error.response);
            // failed registration
            return [];
        });
    }


    sendAlertMessage = (token, alert_id, message) => {
        let headers = {
            "Authorization": `Token ${token}`
        };

        let url = ALERT_CHATS_URL + alert_id + '/';
        console.log(url);
        return axios.post(
            url,
            message,
            {headers:headers}
        ).then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.log(error.response);
            // failed registration
            return [];
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