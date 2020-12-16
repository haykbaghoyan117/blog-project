const initialState = {
    user: null
};

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case 'SET_USER': {
        return {user: payload};
    }
    case 'CLEAR_USER': {
        return { user: null };
    }
    default:
        return state
    }
}
