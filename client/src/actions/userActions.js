import { FETCH_USERS, UPDATE_USER } from './types.js';

export const fetchUsers = () => async dispatch => {
    // const API = process.env.NODE_ENV === 'production' ? 'https://heart-of-the-cards.herokuapp.com' : 'http://localhost:5000';

    // const res = await fetch(`${API}/users/ai`, {
    const res = await fetch('/users/ai', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        } 
    });

    const users = await res.json();


    dispatch({
        type: FETCH_USERS,
        payload: users
    });
}