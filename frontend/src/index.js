// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // Ensure the path is correct
import { BrowserRouter } from 'react-router-dom'; // Only import BrowserRouter, not Router

// import { Provider } from 'react-redux';
// import store from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <BrowserRouter> {/* Use only BrowserRouter to wrap the App */}
      <App /> {/* No need to use Router or Route here */}
    </BrowserRouter>
    {/* </Provider> */}
  </React.StrictMode>
);
