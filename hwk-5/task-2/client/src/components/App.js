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
            currentItem: {text:'', key:''},
            buttonType : 'Add'
        };
    }

    componentDidMount = () => {
        this.fetchTodoList()
            .then(todoList => {
                this.setState({
                    items: todoList
                });
            })
            .catch(err => {
                console.log(err);
            })
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
                key: this.state.currentItem.key
            }
        })
    };

    addItem = (e) => {
        e.preventDefault();
        const newItem = this.state.currentItem;
        if (todoItemValidator.validate(newItem.text)) {
            newItem.key = this.state.items.reduce((prev, current) => (prev.key > current.key) ? prev.key : current.key) + 1;
            const reqOptions = {
                method: 'POST',
                body: JSON.stringify(newItem),
                headers:{
                    'Content-Type': 'application/json'
                }
            };

            fetch(appEndpoints().ADD_TODO_ITEM, reqOptions)
                .then(() => {
                    const items = [...this.state.items, newItem];
                    this.setState({
                        items: items,
                        currentItem: { text: '', key: '' },
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

            fetch( `${appEndpoints().EDIT_TODO_ITEM}/${newItem.key}`,reqOptions)
                .then(() => {
                    return this.fetchTodoList();
                })
                .then((todoList) => {
                    this.setState({
                        items: todoList,
                        currentItem: {text: '', key: ''},
                        buttonType : 'Add'
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            alert('Please provide valid input');
        }
    };

    deleteItem = (key) => {
        const reqOptions = {
            method: 'DELETE'
        };

        fetch(`${appEndpoints().DELETE_TODO_ITEM}/${key}`, reqOptions)
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
    };

    setAppModeToEdit = (key, text) => {
        this.setState({
            currentItem: {
                text: text,
                key: key
            },
            buttonType: 'Edit'
        });
    };

    render() {
        return (
            <div className="App">
                <TodoList addItem={this.addItem}
                          inputElement={this.inputElement}
                          handleInput={this.handleInput}
                          currentItem={this.state.currentItem}
                          editItem={this.editItem}
                          buttonType={this.state.buttonType}
                />
                {
                    this.state.buttonType === 'Add' ?
                        <TodoItems entries={this.state.items}
                                   deleteItem={this.deleteItem}
                                   setAppModeToEdit={this.setAppModeToEdit}
                        /> : ''
                }
            </div>
        )
    }
}
export default App