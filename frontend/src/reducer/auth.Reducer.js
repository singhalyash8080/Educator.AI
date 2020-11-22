import { SET_USER, SET_TEACHER } from '../actions/types';
const isEmpty = require('is-empty');
const initialState = {
    isAuth: false,
    user: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                isAuth: !isEmpty(action.payload),
                user: action.payload
            }
        case SET_TEACHER:
            return {
                ...state,
                isAuth: !isEmpty(action.payload),
                user: action.payload
            }
        default:
            return state;
    }
}