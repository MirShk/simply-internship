import React, { Component } from 'react'

class TodoList extends Component {
    render() {
        const buttonText = window.location.href.indexOf("edit") > -1 ? 'Edit' : 'Add' ;
        const onSubmitAction = window.location.href.indexOf("/edit/") > -1 ? this.props.editItem : this.props.addItem;
        return (
            <div className="todo__list">
                <div className="todo__list__header">
                    <form onSubmit={onSubmitAction}>
                        <input
                               placeholder="Task"
                               ref={this.props.inputElement}
                               value={this.props.currentItem.text}
                               onChange={this.props.handleInput}
                        />
                        <button type="submit"> {buttonText} </button>
                    </form>
                </div>
            </div>
        )
    }
}
export default TodoList