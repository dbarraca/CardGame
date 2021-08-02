import { FETCH_USERS, UPDATE_USER } from '../actions/types.js';

const initialState = {
    items: [],
    item: {}
}

export default function userReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_USERS:
            return {
                ...state,
                items: action.payload
            };
        case UPDATE_USER:
            return {
                ...state,
                item: action.payload
            };
        default :
            return state;
    } 
};