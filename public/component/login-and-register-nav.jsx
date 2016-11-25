import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';
import {hashHistory} from 'react-router';
import '../css/login-and-register-nav.css';


class LoginAndRegisterNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'unknown',
        }
    }

    componentWillMount() {
        const self = this;
        request
            .get('/api/personal')
            .end((err, res) => {
                console.log(err);
                if (err) {
                    if (res.statusCode === 401) {
                    } else {
                        return alert('请先登录!');
                    }
                }
                console.log("statusCode:" + res.statusCode);
                const {username} = res.body;
                self.setState({username});
            })
    }

    render() {
        return <div>
            <div className="login-frame">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="input-group">
                            <div className="input-group-btn">
                                <label className="btn btn-default" type="button">用户名</label>
                            </div>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="input-group">
                            <div className="input-group-btn">
                                <label className="btn btn-default" type="button">密 码</label>
                            </div>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                </div>
                {/*<div>*/}
                    {/*<ul className="nav nav-pills">*/}
                        {/*<li role="presentation" className="active"><Link to="login">登录</Link></li>*/}
                        {/*<li role="presentation"><Link to="/register">注册</Link></li>*/}
                    {/*</ul>*/}
                {/*</div>*/}
                <div className="btn-group btn-group-justified but-group">
                    <div className="btn-group">
                        <button type="button" className="btn btn-default"><Link to="login">登录</Link></button>
                    </div>
                    <div className="btn-group">
                        <button type="button" className="btn btn-default"><Link to="/register">注册</Link></button>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default LoginAndRegisterNav;
