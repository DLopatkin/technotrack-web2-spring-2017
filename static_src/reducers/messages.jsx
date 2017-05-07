import {LOAD_MESSAGES, LOAD_MESSAGES_SUCCESS, LOAD_MESSAGES_ERROR} from './../actions/messages';
import update from 'react-addons-update';

const initialState = {
  messageList: [],
  messages: {},
  isLoading: false,
}


export default function messages(store = initialState, action) {
  switch (action.type) {
    case LOAD_MESSAGES:
      return update(store, {isloading: { $set: true } });
    case LOAD_MESSAGES_SUCCESS:
      return update(store, {
        messageList: { $set: action.apiResponse.messageList},
        isloading: { $set: false },
        messages: {
            $merge: action.apiResponse.messages
        }
      });
    case LOAD_MESSAGES_ERROR:
      console.log("Messages not loaded.");
      return update(store, {isloading: { $set: false } });
    default:
      return store;
  }
}
