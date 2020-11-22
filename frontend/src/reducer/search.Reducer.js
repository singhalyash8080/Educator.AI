import { SET_PREFERRED_TEACHER, SET_MY_PREFERRED_TEACHER } from '../actions/types';
const isEmpty = require('is-empty');
const initialState = {
    top3Result: { _id: '', org1Name: '', org1Score: '', org2Name: '', org2Score: '', org3Name: '', org3Score: '' },
    OtherResults: {},
    myTutor: {},
    isTeachSelect: false


}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PREFERRED_TEACHER:
            return {
                ...state,
                top3Result: action.payload.top3Result,
                OtherResults: action.payload.OtherResults
            }
        case SET_MY_PREFERRED_TEACHER:
            return {
                ...state,
                myTutor: action.payload,
                isTeachSelect: !isEmpty(action.payload)
            }
        default:
            return state;
    }
}