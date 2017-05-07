export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
export const LOAD_COMMENTS_ERROR = 'LOAD_COMMENTS_ERROR';

export function loadComments() {
  return {
    type: LOAD_COMMENTS,
  };
}

export function loadCommentsSuccess(apiResponse) {
  return {
    type: LOAD_COMMENTS_SUCCESS,
    apiResponse,
  };
}

export function loadCommentsError(comments) {
    return {
      type: LOAD_COMMENTS_ERROR,
      comments,
    }
}
