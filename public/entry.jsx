import App from './app.jsx';
import PersonalPage from './component/personal-page.jsx';
import Register from './component/register.jsx';
import Index from './index.jsx';
import AllCourses from './component/allCourses.jsx';
import CheckCourses from './component/checkCourses.jsx';
import Exam from './component/exam.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
require('jquery');
require("bootstrap-webpack");

const router = <Router history={hashHistory}>
    <Route path="/" component={App}>
        <IndexRoute component={Index}/>
        <Route path='/register' component={Register}/>
        <Route path='/allCourses' component={AllCourses}/>
        <Route path='/CheckCourses' component={CheckCourses}/>
        <Route path='/personalPage' component={PersonalPage}/>
        <Route path='/exam/:id' component={Exam}/>
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
