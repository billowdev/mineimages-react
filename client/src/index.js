import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';

import App from './views';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

