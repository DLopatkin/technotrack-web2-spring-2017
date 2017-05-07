export const LOAD_CHATS = 'LOAD_CHATS';
export const LOAD_CHATS_SUCCESS = 'LOAD_CHATS_SUCCESS';
export const LOAD_CHATS_ERROR = 'LOAD_CHATS_ERROR';

export function loadChats() {
  return {
    type: LOAD_CHATS,
  };
}

export function loadChatsSuccess(apiResponse) {
  return {
    type: LOAD_CHATS_SUCCESS,
    apiResponse,
  };
}

export function loadChatsError(chats) {
    return {
      type: LOAD_CHATS_ERROR,
      chats,
    }
}
