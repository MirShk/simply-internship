import appEndpoints from "../api-endpoints/appEndpoints";

export const fetchTodoList = () => {
    return fetch(appEndpoints().GET_TODO_LIST)
        .then((response) => {
            return response.json();
        });
};

export const initialStatePattern = () => {
    return  {
        inputObj : { ref: '' },
        items: [],
        currentItem: {
            text: '',
            _id: '',
            completed: false
        },
        buttonType: 'Add'
    };
};