import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import Wrapper from './components/Wrapper';
import indexReducer from './reducers/indexReducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { fetchTodoList } from './helper/index';

const store = createStore(indexReducer, applyMiddleware(thunk));
export async function asyncRenderDOM() {
    const items = await fetchTodoList();
    store.dispatch({type: 'STORE_DATA_FROM_SERVER', items});
    ReactDOM.render(
        <Provider store={store}>
            <Wrapper/>
        </Provider>,
        document.getElementById('root')
    );
}