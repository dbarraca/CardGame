import axios from 'axios'

import { returnErrors } from './errorActions';

import {
    USER_LOADING,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_ERROR
} from './types.js';

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
    console.log("load user");
    
    // User loading
    dispatch({ type: USER_LOADING });

    axios.get('/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));

            dispatch({ type: AUTH_ERROR });
        });
}

//Register User
export const register = ({ username, password }) => dispatch => {

    // Header
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // Request body
    const body = JSON.stringify({username, password});

    console.log(body)

    axios.post('/users', body, config)
    // axios.post('/auth/user', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));

            dispatch({
                type: REGISTER_FAIL
            })
        });
}

// Set Up config/header in token
export const tokenConfig = getState => {
    // Get Token from local storage
    const token = getState().auth.token;

    // Header
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // If token, add to headers
    if(token) {
        config.headers['x-auth-token'] = token;
    }

    return config
}

