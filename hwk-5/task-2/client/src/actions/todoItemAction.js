import appEndpoints from '../api-endpoints/appEndpoints';
import {
    STORE_DATA_FROM_SERVER,
    SET_APP_MODE_TO_ADD
} from '../helper/constants';
import { fetchTodoList } from '../helper';

export const deleteItem = () => {
    return (dispatch, _id) => {
        const reqOptions = {
            method: 'DELETE'
        };
        return fetch(`${appEndpoints().DELETE_TODO_ITEM}/${_id}`, reqOptions)
            .then(() => fetchTodoList())
            .then(newTodoList => {
                dispatch({ type: STORE_DATA_FROM_SERVER, items: newTodoList});
            })
            .catch(err => console.log(err));
    }
};

export const updateItem = () => {
    return (dispatch, e, refactoredItem) => {
        let ref;
        if (e) {
            e.preventDefault();
            ref = refactoredItem.inputObj.ref;
            if (!ref.value.replace(/\s/g, '').length) return;
            refactoredItem = {
                _id: refactoredItem.currentItem._id,
                text: refactoredItem.inputObj.ref.value
            };
        }

        const reqOptions = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(refactoredItem)
        };
        return fetch( `${appEndpoints().EDIT_TODO_ITEM}/${refactoredItem._id}`, reqOptions)
            .then(() => {
                return fetchTodoList();
            })
            .then(newTodoList => {
                if (e) {
                    ref.value = '';
                    dispatch({ type: SET_APP_MODE_TO_ADD, ref });
                }
                dispatch({ type: STORE_DATA_FROM_SERVER, items: newTodoList});
            })
            .catch(err => console.log(err));
    }
};