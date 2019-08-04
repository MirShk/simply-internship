import { connect } from 'react-redux';
import App from '../components/App';

const mapStateToProps = ({todoForm}) => {
    return todoForm;
};

export default connect(
    mapStateToProps,
    null,
    null,
    { forwardRef: true }
)(App);

