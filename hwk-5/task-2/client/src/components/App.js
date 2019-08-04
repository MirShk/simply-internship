import React, { Component } from 'react'
import TodoList from '../containers/todoListContainer';
import TodoForm from '../containers/todoFormContainer';

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <TodoForm />
                {
                    this.props.buttonType === 'Add' ?  <TodoList /> : ''
                }
            </div>
        )
    }
}