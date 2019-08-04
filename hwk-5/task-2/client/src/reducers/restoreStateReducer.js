import { initialStatePattern } from '../helper';
import { STORE_DATA_FROM_SERVER } from '../helper/constants';

const initialState = {
    items: initialStatePattern().items,
    inputObj: initialStatePattern().inputObj
};

function restoreStateReducer(state = initialState, action) {
    if (action.type === STORE_DATA_FROM_SERVER) {
        return {
            ...state,
            items: action.items,
        }
    }

    return state;
}

export default restoreStateReducer;