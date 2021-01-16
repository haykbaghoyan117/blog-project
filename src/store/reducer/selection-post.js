const initialState = {
    selectionPost: null
};

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case 'SELECTION_POST': {
        return {selectionPost: payload};
    }
    default:
        return state
    }
}
