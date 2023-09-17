import React from 'react';
import ReactDOM from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';
import { Provider } from 'react-redux'
import loginReducer from './features/Login'
import tokenReducer from './features/Token'
import App from './App';
import { BrowserRouter as Router} from "react-router-dom";

//redux logic

import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {

    //I called my reducer login gence why im accessing in nav like that
    login: loginReducer,
    token:  tokenReducer
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Provider store={store}>
    <App />
  </Provider>
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
