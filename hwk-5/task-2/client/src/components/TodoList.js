import React, { Component } from 'react';

class TodoList extends Component {
    render() {
        return (
            <div className="todo__list">
                <div className="todo__list__header">
                    <form onSubmit={this.props.buttonType === 'Edit' ? this.props.editItem : this.props.addItem}>
                        <input placeholder="Task"
                               ref={this.props.inputElement}
                               value={this.props.currentItem.text}
                               onChange={this.props.handleInput}
                        />
                        <button type="submit"> {this.props.buttonType} </button>
                    </form>
                </div>
            </div>
        )
    }
}
export default TodoList