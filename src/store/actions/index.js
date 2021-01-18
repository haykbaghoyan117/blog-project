export const setUser = (user) => ({ type: 'SET_USER', payload: user });
export const setPosts = (posts) => ({ type: 'SET_POSTS', payload: posts });
export const setPost = (post) => ({ type: 'SET_POST', payload: post });
export const setSelectionPost = (post) => ({ type: 'SELECTION_POST', payload: post });
export const randPosts = (posts) => ({ type: 'RAND_POSTS', payload: posts });