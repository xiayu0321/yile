import App from './app.jsx';
import PersonalPage from './component/personal-page.jsx';
import Register from './component/register.jsx';
import LoginAndRegister from './component/login-and-register-nav.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
require('jquery');
require("bootstrap-webpack");

const router = <Router history={hashHistory}>
  <Route path="/" component={App}>
    <IndexRoute component={LoginAndRegister}/>
    <Route path='/register' component={Register}/>
    <Route path='/personalPage' component={PersonalPage}/>
  </Route>
</Router>;

ReactDOM.render(
  router,
  document.getElementById("content")
);

console.log($('#content').text());

if (module.hot) {
  module.hot.accept();
}
