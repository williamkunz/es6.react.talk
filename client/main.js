'use strict';

import React from 'react';
import { render } from 'react-dom';

// Router
import { Router, Route, browserHistory } from 'react-router';

// Handlers
import App from './components/App.js';

// declare our routes and their hierarchy
render((
  <Router history={browserHistory}>
    <Route path="/" component={App}/>
  </Router>
), document.getElementById('app'));
