const initialState = {
    inputObj : { ref: '' },
    items: [],
        currentItem: {
            _id: '',
            completed: false
    },
    buttonType: 'Add'
};

function restoreInitialState(state = initialState, action) {
    if (action.type === 'STORE_DATA_FROM_SERVER') {
        return {
            ...state,
            items: action.items,
        }
    }

    return state;
}

export default restoreInitialState;