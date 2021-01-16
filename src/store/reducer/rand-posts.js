const initialState = {
    randPosts: null
};

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case 'RAND_POSTS': {
        return {randPosts: payload};
    }
    default:
        return state
    }
}
