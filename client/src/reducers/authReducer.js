import {
USER_LOADING,
USER_LOADED,
LOGIN_SUCCESS,
LOGIN_FAIL,
LOGOUT_SUCCESS,
REGISTER_SUCCESS,
REGISTER_FAIL,
AUTH_ERROR
} from '../actions/types.js';

const initialState = {
    // how does our Local storage know about token, I think Brad forgot to actually send it in reducer
    token: localStorage.getItem('token'),
    // token: null,
    isAuthenticated: null,
    isLoading: false,
    user: null
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case USER_LOADING :
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED :
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        case LOGIN_SUCCESS :
        case REGISTER_SUCCESS :
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');

            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
        default:
            return state;
    }
}