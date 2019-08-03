import React, { Component } from 'react'
import TodoList from './TodoList';
import TodoItems from './TodoItems';
import todoItemValidator from '../../../utils/todo.item.validator'
import appEndpoints from '../api-endpoints/app.endpoints';

class App extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            currentItem: { text: '', _id: '' },
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
                text: itemText,
                _id: this.state.currentItem._id
            }
        })
    };

    addItem = (e) => {
        e.preventDefault();
        const newItemValue = this.state.currentItem.text;
        if (todoItemValidator.validate(newItemValue)) {
            const reqOptions = {
                method: 'POST',
                body: JSON.stringify({text: newItemValue}),
                headers:{
                    'Content-Type': 'application/json'
                }
            };

            fetch(appEndpoints().ADD_TODO_ITEM, reqOptions)
                .then(() => this.fetchTodoList())
                .then((todoList) => {
                    this.setState({
                        items: todoList,
                        currentItem: { text: '', _id: '' },
                    })
                });
        } else {
            alert('Please provide valid input');
       }
    };

    editItem = (e) => {
        e.preventDefault();
        const newItem = this.state.currentItem;
        if (todoItemValidator.validate(newItem.text)) {
            const reqOptions = {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(newItem)
            };

            fetch( `${appEndpoints().EDIT_TODO_ITEM}/${newItem._id}`,reqOptions)
                .then(() => this.fetchTodoList())
                .then((todoList) => {
                    this.setState({
                        items: todoList,
                        currentItem: {text: '', _id: ''},
                        buttonType : 'Add'
                    });
                })
                .catch(err => console.log(err));
        } else {
            alert('Please provide valid input');
        }
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
                        <TodoItems entries          = {this.state.items}
                                   setAppModeToEdit = {this.setAppModeToEdit}
                                   deleteItem       = {this.deleteItem}
                        /> : ''
                }
            </div>
        )
    }
}
export default App