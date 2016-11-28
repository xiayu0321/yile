import React from 'react';
import LoginAndRegister from './component/login-and-register-nav.jsx';
import CarouselFigure from './component/CarouselFigure.jsx';
import ChooseCourse from './component/xuankeinfor.jsx'
require('./css/index.css');

export default class Hello extends React.Component {
  render() {
    return (
      <div className="index">
        <div className="col-sm-4">
            <LoginAndRegister/>
        </div>
          <div className="col-sm-8">
              <CarouselFigure/>
              <ChooseCourse/>
          </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
