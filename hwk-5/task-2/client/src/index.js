import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import Wrapper from './components/Wrapper';
import indexReducer from './reducers';
import appEndpoints from './api-endpoints/app.endpoints';

const store = createStore(indexReducer, applyMiddleware(thunk));
fetch(appEndpoints().GET_TODO_LIST)
    .then((response) => {
        return response.json();
    })
    .then(items => {
        store.dispatch({type: 'STORE_DATA_FROM_SERVER', items});
        ReactDOM.render(
            <Provider store={store}>
                <Wrapper/>
            </Provider>,
            document.getElementById('root')
        );
    })
    .catch(err => console.log(err));

