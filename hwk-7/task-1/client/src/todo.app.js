const BASE_URL = `http://localhost:3000/api/v1/todos`;
const ADD_TODO_ITEM = `${BASE_URL}/create`;
const EDIT_TODO_ITEM = `${BASE_URL}/update`;
const DELETE_TODO_ITEM = `${BASE_URL}/delete`;
const GET_TODO_LIST = `${BASE_URL}/fetch`;

class TodoApp {
    constructor() {
        this.state = {
            input: '',
            todoList: [],
            buttonText : 'Add',
            currentItemId: ''
        };
    }

    getRoot = () => {
        return document.getElementById('root');
    };

    getTodoList = () => {
        return fetch(GET_TODO_LIST)
            .then(response => {
                return response.json();
            })
            .then(todoList => {
                return todoList;
            })
            .catch(err => {
                console.log(err);
            })
    };

    setState = (data) => {
        this.state.buttonText = data.buttonText ? data.buttonText : this.state.buttonText;
        this.state.currentItemId = data.currentItemId ? data.currentItemId : this.state.currentItemId;
        this.state.todoList = data.todoList ? data.todoList : this.state.todoList;
        this.state.input = !(data.input === null || data.input === undefined) ? data.input : this.state.input;
        this.render(data);
    };

    handleSubmit = () => {
        const data = {
          text: this.state.input,
          key: this.state.todoList.length
        };

        if (data.text.replace(/\s/g, '').length) {
            fetch(ADD_TODO_ITEM, {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then(() => {
                this.setState({
                    todoList: [...this.state.todoList, data],
                    input: '',
                    buttonText: 'Add'
                });
            })
            .catch(err => {
                alert(err);
            });
        } else {
            alert('Please provide a valid input')
        }

    };

    handleInput = (event) => {
        this.state.input = event.target.value;
    };

    renderEdit = (key) => {
        const newState = {
            todoList: [],
            buttonText: 'Edit',
            currentItemId: key
        };
        this.state.todoList.map((listItem, index) => {
            if (listItem.key === key) {
                key = index;
                newState.input = this.state.todoList[key].text
            }
        });

        this.setState(newState);
    };

    handleEdit = (key) => {
        const data = {
            text: this.state.input,
            key:  this.state.currentItemId
        };

        if (data.text.replace(/\s/g, '').length) {
            fetch(`${EDIT_TODO_ITEM}/${key}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(data)
            })
                .then(()=> {
                    this.getTodoList()
                        .then(response => {
                            this.setState({todoList: response, buttonText: 'Add'});
                        });
                })
                .catch(err => {
                    alert(err);
                })
        } else {
            alert('Please provide a valid input')
        }

    };

    handleDelete = (key) => {
        fetch(`${DELETE_TODO_ITEM}/${key}`, {
            method: 'DELETE',
        })
        .then(()=> {
            this.getTodoList()
                .then(response => {
                    this.setState({
                        todoList: response,
                        buttonText: 'Add',
                        input: '',
                        currentItemId: ''
                    });
                });
        })
        .catch(err => {
            console.log(err)
        })
    };

    componentDidMount = (mounted) => {
        this.getTodoList()
            .then(response => {
                this.state.todoList = response;
                mounted();
            });
    };

    render = (data = this.state, target = this.getRoot()) => {
        this.componentDidMount(() => {
            const todoList = new TodoList({
                renderEdit: this.renderEdit,
                handleDelete: this.handleDelete
            })
            .renderList(data);

            const todoInput = new TodoInput({
                handleSubmit: this.handleSubmit,
                handleInput: this.handleInput,
                handleEdit: this.handleEdit,
            })
            .renderInputContainer(data);

            target.innerHTML = `
                                 ${todoList}
                                 ${todoInput}
                               `;
        });
    };
}

class TodoInput extends TodoApp {
    constructor(props) {
        super();
        this.props = props;
    }

    renderInputContainer = (data) => {
        window.handleSubmit = data.buttonText === 'Add' ? this.props.handleSubmit : this.props.handleEdit;
        window.handleInput = this.props.handleInput;
        return `
                    <div class="todo__list">
                            <div class="todo__list__header">
                                    <input
                                           placeholder="Task"
                                           value="${data.input ? data.input : ''}"
                                           oninput="handleInput(event)" 
                                    />
                                    <button type="submit" onclick="handleSubmit(${data.currentItemId})">${data.buttonText}</button>
                            </div>
                    </div>
                `
    };
}

class TodoItem extends TodoApp {
    constructor(props) {
        super();
        this.props = props;
    }

    renderItem(itemData) {
        window.renderEdit = this.props.renderEdit;
        window.handleDelete = this.props.handleDelete;

        return `
                    <li id="${itemData.key}">
                        ${itemData.text}
                        <span class="todo__item__button" style="margin-left: 15px">
                            <button onclick="renderEdit(${itemData.key})">edit</button>
                        </span>
                        <span class="todo__item__button" style="margin-left: 15px">
                            <button onclick="handleDelete(${itemData.key})">delete</button>
                        </span>
                    </li>
                `;
    }
}

class TodoList extends TodoApp {
    constructor(props) {
        super();
        this.props = props;
    }

    renderList(data) {
        const list = data.todoList.map((itemData, id) => new TodoItem(this.props).renderItem(itemData, id));
        return `<ul>${list.join('')}</ul>`;
    }
}


const todoApp = new TodoApp();
todoApp.render();
