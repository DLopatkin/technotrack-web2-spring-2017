import {LOAD_POSTS, LOAD_POSTS_SUCCESS, LOAD_POSTS_ERROR} from './../actions/posts';
import update from 'react-addons-update';

const initialState = {
  postList: [],
  posts: {},
  isLoading: false,
}


export default function posts(store = initialState, action) {
  switch (action.type) {
    case LOAD_POSTS:
      return update(store, {isloading: { $set: true } });
    case LOAD_POSTS_SUCCESS:
      return update(store, {
        postList: { $set: action.apiResponse.postList},
        isloading: { $set: false },
        posts: {
            $merge: action.apiResponse.posts
        }
      });
    case LOAD_POSTS_ERROR:
      console.log("Posts not loaded.");
      return update(store, {isloading: { $set: false } });
    default:
      return store;
  }
}
