import { initialStatePattern } from '../helper';
import { STORE_DATA_FROM_SERVER } from '../helper/constants';

function restoreStateReducer(state = initialStatePattern(), action) {
    if (action.type === STORE_DATA_FROM_SERVER) {
        return {
            ...state,
            items: action.items,
        }
    }

    return state;
}

export default restoreStateReducer;