import { initialStatePattern } from '../helper';
import {
    SET_APP_MODE_TO_EDIT,
    SET_APP_MODE_TO_ADD,
} from '../helper/constants';

const initialState = {
    currentItem: initialStatePattern().currentItem,
    buttonType: initialStatePattern().buttonType
};

function todoFormReducer(state = initialState, action) {
    switch (action.type) {
        case SET_APP_MODE_TO_EDIT: {
            return {
                ...state,
                currentItem: {
                    _id: action._id,
                },
                buttonType : 'Edit'
            };
        }
        case SET_APP_MODE_TO_ADD: {
            return {
                ...state,
                buttonType: 'Add'
            };
        }
        default:
            return state;
    }
}

export default todoFormReducer;