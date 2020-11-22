import { combineReducers } from 'redux'
import authReducer from './auth.Reducer'
import errReducer from './err.Reducer'
import tutorReducer from './search.Reducer'

export default combineReducers({
    auth: authReducer,
    errors: errReducer,
    tutor: tutorReducer
})