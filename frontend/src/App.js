import React from 'react';
import Routes from './routes';

global.jQuery = require('jquery');
require('bootstrap/dist/js/bootstrap');
require('./assets/js/main');

function App() {
  return (
    <Routes />
  );
}

export default App;