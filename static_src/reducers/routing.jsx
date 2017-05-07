import { SELECT_PAGE } from './../actions/routing';


export default function router(store = { currentPageName: 'my-page' }, action) {
  switch (action.type) {
    case SELECT_PAGE:
      return { currentPageName: action.page };
    default:
      return store;
  }
}
