import React from 'react';
import '../css/navs.css';
import {Link} from 'react-router';

class Nav extends React.Component {
    render() {
        return (<div>
            <nav>
                <div className="title-name">
                    <Link to='/'><h2>web学习系统</h2></Link>
                </div>
                <div className="bottom-line">
                </div>
            </nav>
        </div>)
    }
}

export default Nav;
