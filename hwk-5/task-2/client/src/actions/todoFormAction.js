import appEndpoints from "../api-endpoints/app.endpoints";
import {fetchTodoList} from "../helper";

export const addItem = () => {
    return function (dispatch, e, newItemRef) {
        e.preventDefault();
        console.log(newItemRef.value);

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
                dispatch({ type: 'ADD_ITEM', ref: newItemRef});
                dispatch({ type: 'STORE_DATA_FROM_SERVER', items: newTodoList });
            });
    }
};


