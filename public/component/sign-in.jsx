import React from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router'
import '../css/sign-in.css';

export default class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: ''
        }
    }

    render() {
        return (<form onSubmit={this._onSubmit.bind(this)}>
            <div className="content">
                <p className="username">
                    <span className="user-logo"></span>
                    <input className="input-field" type="text" placeholder="请输入账号" id="account"
                           value={this.state.account}
                           onChange={this._onAccountChange.bind(this)}/>
                </p>
                <p className="password">
                    <span className="password-logo"></span>
                    <input className="input-field" id="password" type="password" placeholder="请输入密码"
                           value={this.state.password}
                           onChange={this._onPasswordChange.bind(this)}/>
                </p>
                <div className="down-footer">
                    <p className="footer-text">
                        <span className="pull-right">
                            <a className="setTextColor">忘记密码?</a>
                        </span>
                        <span className="pull-right">
                            <a className="setTextColor">注册</a>
                            <input type="submit" value="登录" className="btn btn-primary"/>
                        </span>
                    </p>
                </div>
            </div>
        </form>)
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
                    $("#div1").html('Welcome:' + '<a href="/#/personalPage">' + this.state.account + '</a>');
                    hashHistory.push('/index-rent');
                } else if (res.statusCode === 400 && res.text == 'account and password can not be null') {
                    alert(res.text);
                }
                else if (res.statusCode === 401 && res.text === 'account or password is wrong') {
                    alert(res.text);
                }
            })
    }
}

