import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Apply various close techniques to close window by script
// These needs to be window global object in order to work
window.CloseWindow = function () {
  window.close();
};

window.CloseOpenerWindow = function () {
  window.opener = window;
  window.close();
};

window.CloseOpenerHikks = function () {
  window.opener = 'HikksNotAtHome';
  window.close();
};

window.CloseWithWindowOpenTrick = function () {
  // eslint-disable-next-line no-restricted-globals
  var objWindow = window.open(location.href, '_self');
  objWindow.close();
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
