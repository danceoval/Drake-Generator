import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger'; 
import thunk from 'redux-thunk';

import App from './components/app';
import rootReducer from './reducers';

const appStore = createStore(rootReducer, applyMiddleware(thunk, createLogger()))
	

//const createStoreWithMiddleware = applyMiddleware(thunk, createLogger())(createStore);

ReactDOM.render(
  <Provider store={appStore}>
    <App />
  </Provider>
  , document.querySelector('.container'));
