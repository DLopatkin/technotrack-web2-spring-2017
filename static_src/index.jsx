import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import initStore from './store';
import AppComponent from './components/AppComponent';

ReactDOM.render(
  <Provider store={ initStore() }>
    <AppComponent />
  </Provider>,
  document.getElementById('root'),
);
