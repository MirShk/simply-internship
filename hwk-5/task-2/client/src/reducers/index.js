import { combineReducers } from 'redux'
import restoreInitialState from './restoreInitialState';
import todoForm from './todoForm';

export default combineReducers({
    restoreInitialState,
    todoForm
});