import axios from 'axios';
import { FETCH_USERS, UPDATE_USER } from './types.js';
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

    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    // }

    // , config

    //

    const { data }  = await axios.get('/users/ai', tokenConfig(getState)).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

    const users = await data;

    dispatch({
        type: FETCH_USERS,
        payload: users
    });
}