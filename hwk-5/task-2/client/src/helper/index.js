import appEndpoints from "../api-endpoints/app.endpoints";

export const fetchTodoList = () => {
    return fetch(appEndpoints().GET_TODO_LIST)
        .then((response) => {
            return response.json();
        });
};
