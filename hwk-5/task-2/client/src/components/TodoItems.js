import React, { Component } from 'react';

class TodoItems extends Component {
    createTodoItem = (item) => {
        return (
            <li key={item._id}>
                {item.text}
                <span className="todo__item__button" style={{marginLeft: '15px'}}>
                    <button onClick={() => { this.props.setAppModeToEdit(item._id, item.text) }}>edit</button>
                </span>
                <span className="todo__item__button" style={{marginLeft: '15px'}}>
                    <button onClick={() => { this.props.deleteItem(item._id) }}>delete</button>
                </span>
            </li>
        )
    };

    render() {
        const todoEntries = this.props.entries;
        const listItems = todoEntries.map(this.createTodoItem);
        return <ul className="todo__list__items">{listItems}</ul>
    }
}
export default TodoItems