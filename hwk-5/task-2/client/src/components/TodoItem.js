import React, { Component } from 'react';

export default class TodoItem extends Component {
    render() {
        return (
            <li className='todo__list__item' style={{textDecoration: this.props.item.completed ? 'line-through' : 'none' }}>
                {this.props.item.text}
                <span className="todo__list__item__button edit" style={{marginLeft: '15px'}}>
                    <button onClick={() => { this.props.setAppModeToEdit(this.props.item._id, this.props.item.text, this.props.input.ref) }}>Edit</button>
                </span>
                <span className="todo__list__item__button change-status" style={{marginLeft: '15px'}}>
                    <button onClick={
                        () => {
                            const newItem = {
                                _id: this.props.item._id,
                                completed: !this.props.item.completed
                            };

                            this.props.updateItem(null, newItem)
                        }
                    }>
                        { this.props.item.completed ? 'Undo' : 'Complete' }
                    </button>
                </span>
                <span className="todo__list__item__button delete" style={{marginLeft: '15px'}}>
                    <button onClick={() => { this.props.deleteItem(this.props.item._id) }}>Delete</button>
                </span>
            </li>
        )
    }
}