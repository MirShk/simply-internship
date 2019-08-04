import { combineReducers } from 'redux'
import restoreStateReducer from './restoreStateReducer';
import todoForm from './todoFormReducer';

export default combineReducers({
    restoreInitialState: restoreStateReducer,
    todoForm
});