export const LOAD_USERS = 'LOAD_USERS';
export const LOAD_USERS_ERROR = 'LOAD_USERS_ERROR';
export const FETCH_USERS = 'FETCH_USERS';


export function loadUsers() {
  return {
    type: LOAD_USERS,
  };
}

export function fetchUsers(apiResponse) {
  return {
    type: FETCH_USERS,
    apiResponse,
  };
}

export function loadUsersError() {
    return {
      type: LOAD_USERS_ERROR,
    };
}
