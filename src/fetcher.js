import axios from "axios";

const BASE_URL = 'http://localhost:8000/'

const client = axios.create({baseURL: BASE_URL});


const PostMethod = async (url, body, headers) => {
    let responseObject = {errorMessage: '', data: [] }
    try{
        const response = await client.post(url, body, { headers, withCredentials: true });
        if(!response.statusText === 'OK'){
            throw new Error(`HTTP Error ${response.status}`);
        }
        responseObject.data = response.data;
    }
    catch(err){
        responseObject.errorMessage = err.message;
    }
    return responseObject;
}

const GetMethod = async (url, headers) => {
    let responseObject = {errorMessage: '', data: []}
    try{
        const response = await client.get(url, { headers, withCredentials: true })
        if(!response.statusText === 'OK'){
            throw new Error(`HTTP Error ${response.status}`);
        }
        responseObject.data = response.data;
    }
    catch(err){
        responseObject.errorMessage = err.response.message;
    }
    return responseObject;
}

export const loginApi = (email, password) =>{
    const headers = {
        'Content-Type': 'application/json'
    }
    const body = JSON.stringify({email, password});
    return PostMethod('auth/jwt/create/', body, headers);
}

export const getUserDetailsApi = (Token) => {
    const headers = {
        'Authorization': `JWT ${Token}`
    };
    return GetMethod('auth/users/me/', headers);
}

export const registerUserApi = (first_name, last_name, email, password, re_password) => {
    const headers = {
        'Content-Type': 'application/json'
    }
    const body = JSON.stringify({first_name, last_name, email, password, re_password});
    console.log(body);
    return PostMethod('auth/users/', body, headers);
}

export const sendPWDResetLinkOnEmailApi = (email) => {
    const headers = {
        'Content-Type': 'application/json'
    }
    const body = JSON.stringify({email});
    console.log(body);
    return PostMethod('auth/users/reset_password/', body, headers);
}

export const changePasswordApi = (uid, token, new_password, re_new_password) =>{
    const headers = {
        'Content-Type': 'application/json'
    }
    const body = JSON.stringify({uid: uid, token: token, new_password, re_new_password});
    return PostMethod('auth/users/reset_password_confirm/', body, headers);
}

export const activateAccountApi = (uid, token) => {
    const headers = {
        'Content-Type': 'application/json'
    }
    const body = JSON.stringify({uid: uid, token: token});
    return PostMethod('auth/users/activation/', body, headers);
}

export const googleLoginApi = async () => {
    return await axios.get(`http://localhost:8000/auth/o/google-oauth2/?redirect_uri=http://localhost:8000/google`, { withCredentials: true });
}

export const facebookLoginApi = async () => {
    return await axios.get(`http://localhost:8000/auth/o/facebook/?redirect_uri=http://localhost:8000/facebook`, { withCredentials: true })
}

export const googleAuthenticateApi = async (state, code) =>{
    let responseObject = {errorMessage: '', data: [] }
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const detials = {
        'state': state,
        'code': code
    }
    const body = Object.keys(detials).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(detials[key])).join('&');
    try{
        const response = await axios.post(`${BASE_URL}auth/o/google-oauth2/?${body}`, config);
        if(!response.statusText === 'OK'){
            throw new Error(`HTTP Error ${response.status}`);
        }
        responseObject.data = response.data;
    }
    catch(err) {
        responseObject.errorMessage = err.message;
    }
    return responseObject;
}

export const facebookAuthenticateApi = async (state, code) =>{
    let responseObject = {errorMessage: '', data: [] }
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const detials = {
        'state': state,
        'code': code
    }
    const body = Object.keys(detials).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(detials[key])).join('&');
    try{
        const response = await axios.post(`${BASE_URL}auth/o/facebook/?${body}`, config);
        if(!response.statusText === 'OK'){
            throw new Error(`HTTP Error ${response.status}`);
        }
        responseObject.data = response.data;
    }
    catch(err) {
        responseObject.errorMessage = err.message;
    }
    return responseObject;
}

export const verifyUserIsAuthenticatedOrNotApi = async (token) => {
    const headers = {
        'Content-Type': 'application/json'
    }
    const body = JSON.stringify({ token: token });
    return PostMethod('auth/jwt/verify/', body, headers);
}