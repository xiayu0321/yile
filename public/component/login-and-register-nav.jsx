import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';
import {hashHistory} from 'react-router';
import '../css/login-and-register-nav.css';

class LoginAndRegisterNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: ''
        }
    }

    render() {
        return (
            <div className="login-frame">
                <div id="entirety">
                <form className="form-horizontal layout-style" role="form" onSubmit={this._onSubmit.bind(this)}>
                    <div className="form-group">
                        <label for="account" className="col-sm-3 label-name">账号</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" placeholder="请输入账号" id="account"
                                   value={this.state.account}
                                   onChange={this._onAccountChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="password" className="col-sm-3 label-name">密码</label>
                        <div className="col-sm-9">
                            <input type="password" className="form-control" id="password" placeholder="请输入密码"
                                   value={this.state.password}
                                   onChange={this._onPasswordChange.bind(this)}/>
                        </div>
                    </div>

                    <div id="div1">
                        <ul className="nav nav-pills">
                            <li role="presentation"><button type="submit" className="btn btn-default">登录</button></li>
                            <li role="presentation"><button className="btn btn-default"><Link className="but-register" to="/register">注册</Link></button></li>
                        </ul>
                    </div>
                </form>
            </div>
            </div>
        )
    }

    _onAccountChange(event) {
        this.setState({
            account: event.target.value
        });
    }

    _onPasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    _onSubmit(event) {
        event.preventDefault();
        request.post('/api/sessions')
            .send({
                account: this.state.account,
                password: this.state.password
            })
            .end((err, res) => {
                if (res.statusCode === 201) {
                    alert('login success');
                    hashHistory.push('/');
                    $(".login-frame").html('欢迎' + '<p>'+'<a href="/#/personalPage">' + this.state.account + '</a>'+'用户</p>'+'<p>'+'进入答题系统</p>');
                } else if (res.statusCode === 400 && res.text == 'account and password can not be null') {
                    alert(res.text);
                }
                else if (res.statusCode === 401 && res.text === 'account or password is wrong') {
                    alert(res.text);
                }
            })
    }
}

export default LoginAndRegisterNav;
