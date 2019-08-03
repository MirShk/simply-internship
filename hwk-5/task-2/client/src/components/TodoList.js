import React, { Component } from 'react';

export default class TodoList extends Component {
    render() {
        return (
            <div className="todo__form">
                <form onSubmit={this.props.buttonType === 'Edit' ? this.props.updateItem : this.props.addItem}>
                    <input placeholder  = "Task"
                           defaultValue = {this.props.input.ref.value}
                           ref          = {input => this.props.input.ref = input}
                    />
                    <button type="submit"> {this.props.buttonType} </button>
                </form>
            </div>
        )
    }
}