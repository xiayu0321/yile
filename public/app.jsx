import React from 'react';
import TabsNavs from './component/navs.jsx';
import './images/nav/nav.jpg';

export default class Index extends React.Component {
    render() {
        return (
            <div className="app">
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
            </div>
        );
    }
}
