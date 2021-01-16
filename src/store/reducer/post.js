const initialState = {
    post: null
};

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case 'SET_POST': {
        return {post: payload};
    }
    default:
        return state
    }
}
