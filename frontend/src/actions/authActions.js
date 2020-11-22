import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setToken from '../utils/setToken'
import { SET_USER, SET_TEACHER, GET_ERRORS } from './types'
import { backendURL } from '../utils/backURL'

export const register = (userData, history) => dispatch => {
    axios
        .post(`${backendURL}/users/register`, userData)
        .then(res => history.push('/'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
};

export const login = userData => dispatch => {
    axios
        .post(`${backendURL}/users/login`, userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setToken(token);
            const decode = jwt_decode(token);
            dispatch(setUser(decode));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}
export const registerTeacher = (userData, history) => dispatch => {
    axios
        .post(`${backendURL}/orgs/register`, userData)
        .then(res => history.push('/'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
};
export const loginTeacher = userData => dispatch => {
    axios
        .post(`${backendURL}/orgs/login`, userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setToken(token);
            const decode = jwt_decode(token);
            dispatch(setTeacher(decode));
        })
        .catch(err => {
            // dispatch({
            //     type: GET_ERRORS,
            //     payload: err.response.data
            // })
            console.log(err)
        })
}


export const setUser = decode => {
    return {
        type: SET_USER,
        payload: decode
    }
}
export const setTeacher = decode => {
    return {
        type: SET_TEACHER,
        payload: decode
    }
}

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setToken(false);
    dispatch(setUser({}));
}