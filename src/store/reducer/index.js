import { combineReducers } from 'redux';
import user from './user';
import posts from './posts';
import post from './post';
import selectionPost from './selection-post';
import randPosts from './rand-posts';

export default combineReducers ({
    user,
    posts,
    post,
    selectionPost,
    randPosts
})
