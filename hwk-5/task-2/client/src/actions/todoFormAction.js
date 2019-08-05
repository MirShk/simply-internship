import appEndpoints from "../api-endpoints/appEndpoints";
import {
    ADD_ITEM,
} from '../helper/constants';

export const addItem = () => {
    return function (dispatch, e, newItemRef) {
        e.preventDefault();
        if (newItemRef.value.replace(/\s/g, '').length) {
            const reqOptions = {
                method: 'POST',
                body: JSON.stringify({
                    text: newItemRef.value,
                    completed: false
                }),
                headers:{
                    'Content-Type': 'application/json'
                }
            };

            return fetch(appEndpoints().ADD_TODO_ITEM, reqOptions)
                .then(response => {
                    return response.json();
                })
                .then(newItem => {
                    newItemRef.value = '';
                    dispatch({ type: ADD_ITEM, newItem});
                })
        }
    }
};


