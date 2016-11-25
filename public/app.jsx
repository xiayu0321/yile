import React from 'react';
import LoginAndRegisterNavs from './component/login-and-register-nav.jsx';
import TabsNavs from './component/navs.jsx';


export default class Index extends React.Component {
    render() {
        return (
            <div>
                <div className="container-fluid ">
                    <div className="container-fluid">
                        <div>
                            <div className="conta">
                                <TabsNavs/>
                            </div>
                        </div>
                    </div>
                    <div>
                        {this.props.children}
                    </div>
                </div>
                {/*<div>*/}
                    {/*<LoginAndRegisterNavs/>*/}
                {/*</div>*/}
            </div>
        );
    }
}
