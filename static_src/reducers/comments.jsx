import {LOAD_COMMENTS, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_ERROR} from './../actions/comments';
import update from 'react-addons-update';

const initialState = {
  commentList: [],
  comments: {},
  isLoading: false,
}


export default function comments(store = initialState, action) {
  switch (action.type) {
    case LOAD_COMMENTS:
      return update(store, {isloading: { $set: true } });
    case LOAD_COMMENTS_SUCCESS:
      return update(store, {
        commentList: { $set: action.apiResponse.commentList},
        isloading: { $set: false },
        comments: {
            $merge: action.apiResponse.comments
        }
      });
    case LOAD_COMMENTS_ERROR:
      console.log("Comments not loaded.");
      return update(store, {isloading: { $set: false } });
    default:
      return store;
  }
}
