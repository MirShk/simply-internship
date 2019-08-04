import React, { Component } from 'react';

export default class TodoForm extends Component {
    render() {
        return (
            <div className="todo__form">
                <form onSubmit={
                    this.props.buttonType === 'Edit' ?
                        () => this.props.updateItem(event, this.props) :
                        () => this.props.addItem(event, this.props.inputObj.ref)}
                >
                    <input placeholder  = "Task"
                           defaultValue = {this.props.inputObj.ref.value}
                           ref          = {input => { this.props.inputObj.ref = input; }}
                    />
                    <button type="submit"> {this.props.buttonType} </button>
                </form>
            </div>
        )
    }
}