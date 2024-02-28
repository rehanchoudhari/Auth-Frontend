import { 
    loginApi,
    verifyUserIsAuthenticatedOrNotApi,
    getUserDetailsApi,
    registerUserApi,
    activateAccountApi,
    sendPWDResetLinkOnEmailApi,
    changePasswordApi,
    googleAuthenticateApi,
    facebookAuthenticateApi
} from '../fetcher';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    LOGOUT,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    FACEBOOK_AUTH_SUCCESS,
    FACEBOOK_AUTH_FAIL
} from './type';


export const loadUserDetails = () => async dispatch =>{
    if(localStorage.getItem('access') !== 'null'){
        const response = await getUserDetailsApi(localStorage.getItem('access'));
        if(!response.errorMessage){
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: response.data
            })
        }else{
            dispatch({
                type: USER_LOADED_FAIL
            })
        }
    }else{
        dispatch({
            type: USER_LOADED_FAIL
        })
    }
}

export const login = (email, password) => async dispatch =>{
    const response = await loginApi(email, password);
    if (!response.errorMessage){
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        });
        dispatch(loadUserDetails());
    }else{
        dispatch({
            type: LOGIN_FAIL
        });
    }
}

export const checkIsAuthenticated = () => async dispatch =>{
    if(localStorage.getItem('access') !== 'null'){
        const response = await verifyUserIsAuthenticatedOrNotApi(localStorage.getItem('access'));
        if(!response.errorMessage){
            dispatch({
                type: AUTHENTICATED_SUCCESS
            })
            dispatch(loadUserDetails())
        }else{
            dispatch({
                type: AUTHENTICATED_FAIL
            })
        }
    }else{
        dispatch({
            type: AUTHENTICATED_FAIL
        })
    }
}



export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}

export const signup = (first_name, last_name, email, password, re_password) => async dispatch => {
    const response = await registerUserApi(first_name, last_name, email, password, re_password);
    if(!response.errorMessage){
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: response.data
        })
    }else{
        dispatch({
            type: SIGNUP_FAIL
        })
    }
}

export const activateAccountThroughEmail = (uid, token) => async dispatch => {
    const response = await activateAccountApi(uid, token);
    if(!response.errorMessage){
        dispatch({
            type: ACTIVATION_SUCCESS
        })
    }else{
        dispatch({
            type: ACTIVATION_FAIL
        })
    }
}

export const resetPassword = (email) => async dispatch => {
    const response = await sendPWDResetLinkOnEmailApi(email);
    if(!response.errorMessage){
        dispatch({
            type: PASSWORD_RESET_SUCCESS
        })
    }else{
        dispatch({
            type: PASSWORD_RESET_FAIL
        })
    }
}

export const resetConfirmPassword = (uid, token, new_password, re_new_password) => async dispatch =>{
    const response = await changePasswordApi(uid, token, new_password, re_new_password);
    if(!response.errorMessage){
        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        })
    }else{
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        })
    }
}

export const googleAuthenticate = (state, code) => async dispatch => {
    const response = await googleAuthenticateApi(state, code);
    console.log(response, 'to check data');
    // console.log(response.data.access, 'inside auth');
    if(!response.errorMessage){
        dispatch({
            type: GOOGLE_AUTH_SUCCESS,
            payload: response.data
        })
        dispatch(loadUserDetails())
    }else{
        dispatch({
            type: GOOGLE_AUTH_FAIL
        })
    }
}

export const facebookAuthenticate = (state, code) => async dispatch => {
    const response = await facebookAuthenticateApi(state, code);
    if(!response.errorMessage){
        dispatch({
            type: FACEBOOK_AUTH_SUCCESS,
            payload: response.data
        })
        dispatch(loadUserDetails())
    }else{
        dispatch({
            type: FACEBOOK_AUTH_FAIL
        })
    }
}