import axios from 'axios';
import { FETCH_USERS, UPDATE_USER, AUTH_ERROR } from './types.js';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const fetchUsers = () => async (dispatch, getState) => {
    // const API = process.env.NODE_ENV === 'production' ? 'https://heart-of-the-cards.herokuapp.com' : 'http://localhost:5000';

    // const res = await fetch(`${API}/users/ai`, {
    /*const res = await fetch('/users/ai', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        } 
    });*/

    const { data }  = await axios.get('/users/ai', tokenConfig(getState))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

    const users = await data;

    dispatch({
        type: FETCH_USERS,
        payload: users
    });
};

export const addUserAIWin = (playerID) => async (dispatch, getState) => {
    // Request body
    const body = JSON.stringify({playerID});

    await axios.put(`/users/ai/win/${playerID}`, body, tokenConfig(getState))
    .then(res => dispatch({
        type: UPDATE_USER,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'AUTH_ERROR'));

        dispatch({ type: AUTH_ERROR });
    });
}