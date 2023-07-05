import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { Provider } from "react-redux"
import { applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import { legacy_createStore as createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import "./index.css";
const store = createStore(reducers, compose(applyMiddleware(thunk)))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
   <BrowserRouter>
    <App />
   </BrowserRouter>
  </Provider>,
);


