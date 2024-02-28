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
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    FACEBOOK_AUTH_FAIL,
    FACEBOOK_AUTH_SUCCESS
} from '../action/type';


const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' ? true: false,
    user: localStorage.getItem('user')
}



export default function(state=initialState, action){
    const { type, payload } = action;
    
    switch(type){
        case LOGIN_SUCCESS:
        case GOOGLE_AUTH_SUCCESS:
        case FACEBOOK_AUTH_SUCCESS:
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);
            localStorage.setItem('isAuthenticated', true);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case LOGIN_FAIL:
        case LOGOUT:
        case SIGNUP_FAIL:
        case GOOGLE_AUTH_FAIL:
        case FACEBOOK_AUTH_FAIL:
            localStorage.setItem('access', null)
            localStorage.setItem('refresh', null);
            localStorage.setItem('isAuthenticated', false)
            localStorage.setItem('user', null)
            localStorage.setItem('id', null)
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            }
        case AUTHENTICATED_SUCCESS:
            localStorage.setItem('isAuthenticated', true);
            return {
                ...state,
                isAuthenticated: true
            }
        case AUTHENTICATED_FAIL:
            localStorage.setItem('isAuthenticated', false);
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_SUCCESS:
            localStorage.setItem('name', payload.first_name);
            localStorage.setItem('id', payload.id);
            return {
                ...state,
                user: payload
            }
        case USER_LOADED_FAIL:
            localStorage.setItem('user', null);
            localStorage.setItem('id', null)
            return {
                ...state,
                user: null
            }
        case SIGNUP_SUCCESS:
            localStorage.setItem('isAuthenticated', false);
            return {
                ...state,
                isAuthenticated: false
            }
        case ACTIVATION_FAIL:
        case ACTIVATION_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_SUCCESS:
            return {
                ...state
            }
        default:
            return state
    }
}