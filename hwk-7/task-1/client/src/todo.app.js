const BASE_URL = `http://localhost:3000/api/v1/todos`;
const ADD_TODO_ITEM = `${BASE_URL}/create`;
const EDIT_TODO_ITEM = `${BASE_URL}/edit`;
const DELETE_TODO_ITEM = `${BASE_URL}/delete`;
const GET_TODO_LIST = `${BASE_URL}/fetch`;

class TodoApp {
    constructor() {
        this.state = {
            input: '',
            todoList: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    getRoot() {
        return document.getElementById('root');
    }

    getTodoList() {
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
    }

    handleSubmit() {
        console.log(this.state.input);
        const data = {
          text: this.state.input,
          key: this.state.todoList.length
        };

        fetch(ADD_TODO_ITEM, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            this.state.todoList.push(data);
            this.state.input = '';
            this.render(this.state.todoList);
        })
    }

    handleInput(event) {
        console.log(event.target.value);
        this.state.input = event.target.value;
    }

    componentDidMount(cb) {
        this.getTodoList()
            .then(response => {
                this.state.todoList = response;
                cb(this);
            });
    }

    render(data, target = this.getRoot()) {
        const props = {
            handleSubmit: this.handleSubmit,
            handleInput: this.handleInput
        };

        target.innerHTML = `${new TodoList().renderList(data)}`;
        target.appendChild(new TodoInput(props).renderForm());
    }
}




class TodoInput extends TodoApp {
    constructor(props) {
        super(props);
        this.props = props;
        this.renderForm = this.renderForm.bind(this);
    }

    renderForm() {
        const container = document.createElement("DIV");
        const button = document.createElement("BUTTON");
        const input = document.createElement("INPUT");
        input.addEventListener('input', this.props.handleInput);
        input.setAttribute('type', 'text');
        container.className = "todo__input__container";
        this.getRoot().appendChild(container);
        button.innerHTML = "Add";
        button.addEventListener('click', this.props.handleSubmit);
        document.getElementsByClassName('todo__input__container')[0].appendChild(input);
        document.getElementsByClassName('todo__input__container')[0].appendChild(button);

        return container;
    }
}

class TodoItem {
    constructor() {}//todo props

    static renderItem(itemData) {
        return `
                    <li>
                        ${itemData}
                        <span class="todo__item__button" style="margin-left: 15px">
                            <button>edit</button>
                        </span>
                        <span class="todo__item__button" style="margin-left: 15px">
                            <button>delete</button>
                        </span>
                    </li>
                `;
    }
}

class TodoList extends TodoApp {
    renderList(todoData) {
        const list = todoData.map(itemData => TodoItem.renderItem(itemData.text));
        return `<ul>${list.join('')}</ul>`;
    }
}

const todoApp = new TodoApp();

todoApp
    .componentDidMount(component => {
        component.render(component.state.todoList);
    });
