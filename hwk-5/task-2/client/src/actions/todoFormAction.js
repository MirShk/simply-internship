import appEndpoints from "../api-endpoints/appEndpoints";
import { fetchTodoList } from "../helper";

export const addItem = () => {
    return function (dispatch, e, newItemRef) {
        e.preventDefault();
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
            .then(() => fetchTodoList())
            .then(newTodoList => {
                newItemRef.value = '';
                dispatch({ type: 'STORE_DATA_FROM_SERVER', items: newTodoList });
            });
    }
};


