import { initialStatePattern } from '../helper';
import {
    ADD_ITEM,
    STORE_DATA_FROM_SERVER
} from '../helper/constants';

const initialState = {
    items: initialStatePattern().items,
    inputObj: initialStatePattern().inputObj
};

function restoreStateReducer(state = initialState, action) {
    switch (action.type) {
        case STORE_DATA_FROM_SERVER: {
            return {
                ...state,
                items: action.items,
            }
        }
        case ADD_ITEM: {
            return {
                ...state,
                items: [...state.items, action.newItem]
            };
        }
        default:
            return state;
    }
}

export default restoreStateReducer;