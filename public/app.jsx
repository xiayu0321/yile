import React from 'react';
import LoginAndRegisterNavs from './component/login-and-register-nav.jsx';
import TabsNavs from './component/navs.jsx';


export default class Index extends React.Component {
  render() {
    return (
      <div className="container-fluid ">
        <div className="container-fluid">
          <div>
            {/*<div className="conta">*/}
              {/*<TabsNavs/>*/}
            {/*</div>*/}
            <div className="pull-left loginNavs">
              <LoginAndRegisterNavs/>
            </div>
          </div>
        </div>

        <div>
          {this.props.children}
        </div>


      </div>
    );
  }
}
