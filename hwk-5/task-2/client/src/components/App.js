import React, { Component } from 'react'
import TodoList from './TodoList';
import TodoItem from './TodoItem';
import todoItemValidator from '../../../utils/todo.item.validator';
import appEndpoints from '../api-endpoints/app.endpoints';


export default class App extends Component {
    constructor() {
        super();
        this.inputObj = { ref: '' };
        this.state = {
            items: [],
            currentItem: {
                _id: '',
                completed: false
            },
            buttonType: 'Add'
        };
    }

    componentDidMount = () => {
        this.fetchTodoList()
            .then(todoList => { this.setState({ items: todoList }); })
            .catch(err => console.log(err));
    };


    //store's initial state
    fetchTodoList() {
        return fetch(appEndpoints().GET_TODO_LIST)
            .then((response) => {
               return response.json();
            });
    }

    addItem = (e) => {
        e.preventDefault();
        const reqOptions = {
            method: 'POST',
            body: JSON.stringify({ text: this.inputObj.ref.value, completed: false }),
            headers:{
                'Content-Type': 'application/json'
            }
        };

        fetch(appEndpoints().ADD_TODO_ITEM, reqOptions)
            .then(() => this.fetchTodoList())
            .then((newTodoList) => {
                this.inputObj.ref.value = '';
                this.setState({
                    items: newTodoList,
                    currentItem: {
                        ...this.state.currentItem,
                        _id: ''
                    },
                })
            });
    };

    updateItem = (e, newItem) => {
        if (e) {
            e.preventDefault();
            newItem = {
                _id: this.state.currentItem._id,
                text: this.inputObj.ref.value
            };
        }

        const reqOptions = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(newItem)
        };
        fetch( `${appEndpoints().EDIT_TODO_ITEM}/${newItem._id}`,reqOptions)
            .then(() => this.fetchTodoList())
            .then(newTodoList => {
                this.setState({
                    items: newTodoList,
                    currentItem: {
                        _id: ''
                    },
                    buttonType : 'Add'
                });
            })
            .catch(err => console.log(err));
    };

    deleteItem = (_id) => {
        const reqOptions = {
            method: 'DELETE'
        };
        fetch(`${appEndpoints().DELETE_TODO_ITEM}/${_id}`, reqOptions)
            .then(() => this.fetchTodoList())
            .then(newTodoList => { this.setState({items: newTodoList}); })
            .catch(err => console.log(err));
    };

    setAppModeToEdit = (_id, text) => {
        this.inputObj.ref.value = text;
        this.setState({
            currentItem: {
                completed: false,
                _id: _id
            },
            buttonType: 'Edit'
        });
    };

    render() {
        return (
            <div className="App">
                <TodoList addItem     = {this.addItem}
                          updateItem  = {this.updateItem}
                          buttonType  = {this.state.buttonType}
                          input       = {this.inputObj}
                />
                {
                    this.state.buttonType === 'Add' ?
                        <TodoItem entries          = {this.state.items}
                                  setAppModeToEdit = {this.setAppModeToEdit}
                                  deleteItem       = {this.deleteItem}
                                  updateItem       = {this.updateItem }
                        /> : ''
                }
            </div>
        )
    }
}