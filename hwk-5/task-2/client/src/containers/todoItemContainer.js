import { connect } from 'react-redux';
import TodoItem from '../components/TodoItem';
import { SET_APP_MODE_TO_EDIT } from '../helper/constants';
import { deleteItem, updateItem } from '../actions/todoItemAction';


const mapDispatchToProps = dispatch => ({
    setAppModeToEdit: (_id, text, ref) => {
        ref.value = text;
        dispatch({type: SET_APP_MODE_TO_EDIT, _id})
    },
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

