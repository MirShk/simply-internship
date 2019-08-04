import { connect } from 'react-redux';
import TodoItem from '../components/TodoItem';
import { deleteItem, updateItem } from '../actions/todoItemAction';

const SET_APP_MODE_TO_EDIT = 'SET_APP_MODE_TO_EDIT';

const mapDispatchToProps = dispatch => ({
    setAppModeToEdit: (_id, text, ref) => dispatch({type: SET_APP_MODE_TO_EDIT, _id, text, ref}),
    updateItem: (e = null, newItem) => updateItem()(dispatch, e, newItem),
    deleteItem: _id => deleteItem()(dispatch, _id)
});

const mapStateToProps = ({restoreInitialState}) => {
    return {
        entries: restoreInitialState.items,
        input: restoreInitialState.inputObj
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoItem);

