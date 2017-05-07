import {LOAD_CHATS, LOAD_CHATS_SUCCESS, LOAD_CHATS_ERROR} from './../actions/chats';
import update from 'react-addons-update';

const initialState = {
  chatList: [],
  chats: {},
  isLoading: false,
}


export default function chats(store = initialState, action) {
  switch (action.type) {
    case LOAD_CHATS:
      return update(store, {isloading: { $set: true } });
    case LOAD_CHATS_SUCCESS:
      return update(store, {
        chatList: { $set: action.apiResponse.chatList},
        isloading: { $set: false },
        chats: {
            $merge: action.apiResponse.chats
        }
      });
    case LOAD_CHATS_ERROR:
      console.log("Chats not loaded.");
      return update(store, {isloading: { $set: false } });
    default:
      return store;
  }
}
