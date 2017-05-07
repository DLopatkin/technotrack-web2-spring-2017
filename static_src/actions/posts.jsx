export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_ERROR = 'LOAD_POSTS_ERROR';

export function loadPosts() {
  return {
    type: LOAD_POSTS,
  };
}

export function loadPostsSuccess(apiResponse) {
  return {
    type: LOAD_POSTS_SUCCESS,
    apiResponse,
  };
}

export function loadPostsError(posts) {
    return {
      type: LOAD_POSTS_ERROR,
      posts,
    }
}
