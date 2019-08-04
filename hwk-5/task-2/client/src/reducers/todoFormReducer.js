import { initialStatePattern } from '../helper';
import {
    ADD_ITEM,
    SET_APP_MODE_TO_EDIT,
    SET_APP_MODE_TO_ADD
} from '../helper/constants';

function todoFormReducer(state = initialStatePattern(), action) {
    switch (action.type) {
        case ADD_ITEM: {
            action.ref.value = '';
            return {
                ...state,
                inputObj: {ref: action.ref},
            };
        }
        case SET_APP_MODE_TO_EDIT: {
            action.ref.value = action.text;
            return {
                ...state,
                currentItem: {
                    _id: action._id,
                },
                buttonType : 'Edit'
            };
        }
        case SET_APP_MODE_TO_ADD: {
            action.ref.value = '';
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