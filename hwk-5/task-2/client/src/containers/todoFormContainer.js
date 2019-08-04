import { connect } from 'react-redux';
import { addItem } from '../actions/todoFormAction';
import { updateItem } from '../actions/todoItemAction';
import TodoForm from '../components/TodoForm';

const mapDispatchToProps = dispatch => ({
    updateItem: (e, refactoredItem) => updateItem()(dispatch, e, refactoredItem),
    addItem: (e, ref) => addItem()(dispatch, e, ref)
});

const mapStateToProps = (state) => {
    return {
        ...state.restoreInitialState,
        buttonType: state.todoForm.buttonType,
        currentItem: state.todoForm.currentItem
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true }
)(TodoForm);

