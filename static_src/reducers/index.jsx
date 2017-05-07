import { combineReducers } from 'redux';
import router from './routing';
import posts from './posts';
import users from './users';
import comments from './comments';
import chats from './chats';
import messages from './messages';

export default combineReducers({
  router,
  posts,
  users,
  comments,
  messages,
  chats,
});
