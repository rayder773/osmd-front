import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import ErrorBoundary from 'react-error-boundary';
import { Router } from 'react-router-dom';

import MyFallbackComponent from './components/errorBoundry';

import history from './history';

import reducer from './store/reducers';
import * as serviceWorker from './serviceWorker';

import './index.css';
import App from './App';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <ErrorBoundary FallbackComponent={MyFallbackComponent}>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);
serviceWorker.unregister();
