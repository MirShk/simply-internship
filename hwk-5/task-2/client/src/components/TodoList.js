import React, { Component } from 'react';
import TodoItem from '../containers/todoItemContainer';

class TodoList extends Component {

    render() {
        const todoEntries = this.props.entries;
        const listItems = todoEntries.map(item => {
            return <TodoItem item = {item} key = {item._id} />;
        });

        return <ul className="todo__list">{listItems}</ul>
    }
}
export default TodoList