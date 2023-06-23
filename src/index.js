import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { Provider } from "react-redux"
import { applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import { legacy_createStore as createStore } from 'redux';


const store = createStore(reducers, compose(applyMiddleware(thunk)))


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,

);


