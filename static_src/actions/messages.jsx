export const LOAD_MESSAGES = 'LOAD_MESSAGES';
export const LOAD_MESSAGES_SUCCESS = 'LOAD_MESSAGES_SUCCESS';
export const LOAD_MESSAGES_ERROR = 'LOAD_MESSAGES_ERROR';

export function loadMessages() {
  return {
    type: LOAD_MESSAGES,
  };
}

export function loadMessagesSuccess(apiResponse) {
  return {
    type: LOAD_MESSAGES_SUCCESS,
    apiResponse,
  };
}

export function loadMessagesError(messages) {
    return {
      type: LOAD_MESSAGES_ERROR,
      messages,
    }
}
