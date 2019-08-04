import { connect } from 'react-redux';
import TodoList from '../components/TodoList';

const mapStateToProps = ({restoreInitialState}) => {
    return {
        entries: restoreInitialState.items
    };
};

export default connect(
    mapStateToProps,
    null
)(TodoList);
