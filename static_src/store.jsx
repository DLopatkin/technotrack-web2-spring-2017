import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import initReducers from './reducers';
import thunk from 'redux-thunk';


function initStore() {
  const innitialState = {};
  return createStore(
    initReducers,
    innitialState,
    compose(applyMiddleware(thunk))
  );
}

export default initStore;
