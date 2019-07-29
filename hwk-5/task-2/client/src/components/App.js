import React, { Component } from 'react'
import TodoList from './TodoList';
import TodoItems from './TodoItems';
import axios from 'axios';
import indexRouterEndpoint from '../api-endpoints/index.router.endpoints';

class App extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            currentItem: {text:'', key:''},
        };

        this.handleInput = this.handleInput.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.editItem = this.editItem.bind(this);
    }

    componentDidMount() {
        axios.get(indexRouterEndpoint('v1').GET_TODO_LIST)
            .then(todoList => {
                this.setState({
                   items: todoList.data.length ? todoList.data : []
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleInput (e) {
        const itemText = e.target.value;
        const currentItem = { text: itemText, key: ''};
        this.setState({
            currentItem,
        })
    }

    addItem (e) {
        e.preventDefault();
        const newItem = this.state.currentItem;
        if (newItem.text !== '') {
            newItem.key = this.state.items.length + 1;
            axios.post(indexRouterEndpoint('v1').ADD_TODO_ITEM, this.state.currentItem)
                .then(() => {
                    const items = [...this.state.items, newItem];
                    this.setState({
                        items: items,
                        currentItem: { text: '', key: '' },
                    })
                });
        }
    };

    deleteItem (key) {
        axios.delete(`${indexRouterEndpoint('v1').DELETE_TODO_ITEM}/${key}`)
            .then(() => {
                const filteredItems = this.state.items.filter(item => {
                    return item.key !== key
                });

                this.setState({
                    items: filteredItems,
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    renderEdit(key) {
        window.location = `${indexRouterEndpoint('v1').EDIT}/${key}`;
    }

    editItem(e) {
        e.preventDefault();
        const newItem = this.state.currentItem;
        axios.put(window.location, {
            text: newItem.text
        })
        .then(() => {
            window.location = indexRouterEndpoint('v1').baseUrl;
        })
    }

    render() {
        return (
            <div className="App">
                <TodoList
                            addItem={this.addItem}
                            inputElement={this.inputElement}
                            handleInput={this.handleInput}
                            currentItem={this.state.currentItem}
                            editItem={this.editItem}
                />
                {
                    window.location.href.indexOf('/edit/') === -1 ?
                        <TodoItems
                            entries={this.state.items}
                            deleteItem={this.deleteItem}
                            renderEdit={this.renderEdit}
                        /> : ''
                }
            </div>
        )
    }
}
export default App