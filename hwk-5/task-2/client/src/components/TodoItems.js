import React, { Component } from 'react'
class TodoItems extends Component {
    constructor() {
        super();
        this.createTodoItem = this.createTodoItem.bind(this);
    }

    createTodoItem(item) {
        console.log(this);

        return (
            <li key={item.key}>
                {item.text}
                <span className="todo__item__button" style={{marginLeft: '15px'}}>
                    <button onClick={() => { this.props.renderEdit(item.key) }}>edit</button>
                </span>
                <span className="todo__item__button" style={{marginLeft: '15px'}}>
                    <button onClick={() => { this.props.deleteItem(item.key) }}>delete</button>
                </span>
            </li>
        )
    }

    render() {
        const todoEntries = this.props.entries;
        const listItems = todoEntries.map(this.createTodoItem);
        return <ul className="todo__list__items">{listItems}</ul>
    }
}
export default TodoItems