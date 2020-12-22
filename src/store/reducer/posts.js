const initialState = {
    posts: null
};

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case 'SET_POSTS': {
        return {posts: payload};
    }
    default:
        return state
    }
}
