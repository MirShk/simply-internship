import React, { Component } from 'react';

class TodoItem extends Component {
    createTodoItem = (item) => {
        return (
            <li key={item._id} style={{textDecoration: item.completed ? 'line-through' : 'none' }}>
                {item.text}
                <span className="todo__item__button" style={{marginLeft: '15px'}}>
                    <button onClick={() => { this.props.setAppModeToEdit(item._id, item.text) }}>edit</button>
                </span>
                <span className="todo__item__button" style={{marginLeft: '15px'}}>
                    <button onClick={() => { this.props.deleteItem(item._id) }}>delete</button>
                </span>
                <span className="todo__item__button" style={{marginLeft: '15px'}}>
                    <button onClick={
                        () => {
                            const newItem = {
                                _id: item._id,
                                completed: !item.completed
                            };

                            this.props.editItem(null, newItem)
                        }
                    }>
                        {item.completed ? 'Undo' : 'Complete' }
                    </button>
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
export default TodoItem