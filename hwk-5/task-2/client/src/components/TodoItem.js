import React, { Component } from 'react';
import appEndpoints from '../api-endpoints/app.endpoints';

class TodoItem extends Component {
    createTodoItem = (item) => {
        return (
            <li className='todo__list__item' key={item._id} style={{textDecoration: item.completed ? 'line-through' : 'none' }}>
                {item.text}
                <span className="todo__list__item__button edit" style={{marginLeft: '15px'}}>
                    <button onClick={() => { this.props.setAppModeToEdit(item._id, item.text) }}>Edit</button>
                </span>
                <span className="todo__list__item__button change-status" style={{marginLeft: '15px'}}>
                    <button onClick={
                        () => {
                            const newItem = {
                                _id: item._id,
                                completed: !item.completed
                            };

                            this.props.updateItem(null, newItem)
                        }
                    }>
                        {item.completed ? 'Undo' : 'Complete' }
                    </button>
                </span>
                <span className="todo__list__item__button delete" style={{marginLeft: '15px'}}>
                    <button onClick={() => { this.props.deleteItem(item._id) }}>Delete</button>
                </span>
            </li>
        )
    };

    render() {
        const todoEntries = this.props.entries;
        const listItems = todoEntries.map(this.createTodoItem);
        return <ul className="todo__list">{listItems}</ul>
    }
}
export default TodoItem