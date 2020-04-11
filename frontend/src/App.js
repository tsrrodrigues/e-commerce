import React from 'react';
import Routes from './routes';

global.jQuery = require('jquery');
require('bootstrap/dist/js/bootstrap');
require('./assets/js/script.js');

require('bootstrap/dist/css/bootstrap.min.css');

function App() {
  return (
    <Routes />
  );
}

export default App;