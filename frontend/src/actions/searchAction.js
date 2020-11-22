import axios from 'axios';
import { SET_PREFERRED_TEACHER, GET_ERRORS, SET_MY_PREFERRED_TEACHER } from './types'
import { backendURL } from './../utils/backURL'

export const setPreferred = (data) => dispatch => {
    axios
        .post(`${backendURL}/test/users/search`, data)
        .then(res => {
            console.log(res.data)
            // const { teacherId } = res.data;
            dispatch(setTutor(res.data))
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}
export const setMyTutor = (data) => dispatch => {
    console.log(data)
    // localStorage.setItem('myTutor', data.myTutor)
    // localStorage.setItem('testId', JSON.stringify(data.testCreated))
    dispatch(SetMyTutor(data))
}

export const setTutor = teacherId => {
    return {
        type: SET_PREFERRED_TEACHER,
        payload: teacherId
    }
}

export const SetMyTutor = data => {
    return {
        type: SET_MY_PREFERRED_TEACHER,
        payload: data
    }
}