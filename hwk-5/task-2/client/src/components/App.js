import React, { Component } from 'react'
import TodoList from './TodoList';
import TodoItem from './TodoItem';
import todoItemValidator from '../../../utils/todo.item.validator'
import appEndpoints from '../api-endpoints/app.endpoints';

class App extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            currentItem: { text: '', _id: '', completed: false },
            buttonType : 'Add'
        };
    }

    componentDidMount = () => {
        this.fetchTodoList()
            .then(todoList => { this.setState({ items: todoList }); })
            .catch(err => console.log(err));
    };

    fetchTodoList() {
        return fetch(appEndpoints().GET_TODO_LIST)
            .then((response) => {
               return response.json();
            });
    }



    handleInput = (e) => {
        const itemText = e.target.value;
        this.setState({
            currentItem: {
                ...this.state.currentItem,
                text: itemText,
                _id: this.state.currentItem._id
            }
        })
    };

    addItem = (e) => {
        e.preventDefault();
        const newItem = this.state.currentItem;
        //todo :: validate
        const reqOptions = {
            method: 'POST',
            body: JSON.stringify({ text: newItem.text, completed: newItem.completed }),
            headers:{
                'Content-Type': 'application/json'
            }
        };

        fetch(appEndpoints().ADD_TODO_ITEM, reqOptions)
            .then(() => this.fetchTodoList())
            .then((todoList) => {
                this.setState({
                    items: todoList,
                    currentItem: {
                        ...this.state.currentItem,
                        text: '',
                        _id: ''
                    },
                })
            });
    };

    editItem = (e, newItem) => {
        if (newItem === undefined) {
            e.preventDefault();
            newItem = this.state.currentItem;
        }

        //todo :: validate
        const reqOptions = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(newItem)
        };
        fetch( `${appEndpoints().EDIT_TODO_ITEM}/${newItem._id}`,reqOptions)
            .then(() => this.fetchTodoList())
            .then(todoList => {
                this.setState({
                    items: todoList,
                    currentItem: {
                        ...this.state.currentItem,
                        text: '',
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
        this.setState({
            currentItem: {
                ...this.state.currentItem,
                text: text,
                _id: _id
            },
            buttonType: 'Edit'
        });
    };

    render() {
        return (
            <div className="App">
                <TodoList addItem     = {this.addItem}
                          handleInput = {this.handleInput}
                          currentItem = {this.state.currentItem}
                          editItem    = {this.editItem}
                          buttonType  = {this.state.buttonType}
                />
                {
                    this.state.buttonType === 'Add' ?
                        <TodoItem entries          = {this.state.items}
                                  setAppModeToEdit = {this.setAppModeToEdit}
                                  deleteItem       = {this.deleteItem}
                                  editItem         = {this.editItem}
                        /> : ''
                }
            </div>
        )
    }
}
export default App