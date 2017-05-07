import {LOAD_USERS, LOAD_USERS_ERROR, FETCH_USERS} from './../actions/users';
import update from 'react-addons-update';

const initialState = {
  users: {},
  isFetching: false,
}


export default function users(store = initialState, action) {
  switch (action.type) {
    case LOAD_USERS:
      console.log(LOAD_USERS);
      return update(store, {
        isFetching: { $set: true },
      });
    case FETCH_USERS:
      return update(store, {
        isFetching: { $set: false },
        users: {
            $merge: action.apiResponse,
        }
      });
    case LOAD_USERS_ERROR:
      console.log("Users not loaded.");
      return update(store, {
        isFetching: { $set: false },
      });
    default:
      return store;
  }
}
