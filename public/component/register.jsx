import React, {Component} from "react";
import request from 'superagent';
import {hashHistory} from 'react-router'
require("../css/register.css");

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            account: '',
            password: '',
            confirmPassword: '',
            identity: ''
        }
    }

    render() {
        return <form onSubmit={this._onSubmit.bind(this)}>
            <div className="register">
                <div className="title"><h3>欢迎注册</h3></div>
                <div className="form-group">
                    <label>用户名</label>
                    <input type="name" className="form-control" id="name"
                           placeholder="请设置用户名" required
                           value={this.state.name}
                           onChange={this._onNameChange.bind(this)}/>
                </div>
                <div className="form-group">
                    <label>账号</label>
                    <input type="account" className="form-control" id="account"
                           placeholder="请输入账号" required
                           value={this.state.account}
                           onChange={this._onAccountChange.bind(this)}/>
                </div>
                < div className="form-group">
                    <label>设置密码</label>
                    <input type="password" className="form-control" id="password"
                           placeholder="请输入密码(至少六位)" required pattern="^.{6,18}$"
                           value={this.state.password}
                           onChange={this._onPasswordChange.bind(this)}/>
                </div>
                <div className="form-group">
                    <label>确认密码</label>
                    <input type="password" className="form-control" id="confirm-password"
                           placeholder="请确认密码(至少六位)" required pattern="^.{6,18}$"
                           value={this.state.confirmPassword}
                           onChange={this._onConfirmPasswordChange.bind(this)}/>
                </div>
                <div className="form-group">
                    <label className="checkbox-inline">
                        <input type="radio" name="optionsRadiosinline" id="teacher" value={this.state.identity}
                               onClick={this._onIdentityClick.bind(this)}/> 教师
                    </label>
                    <label className="checkbox-inline">
                        <input type="radio" name="optionsRadiosinline" id="student" value={this.state.identity}
                               onClick={this._onIdentityClick.bind(this)}/> 学生
                    </label>
                    <label className="checkbox-inline">
                        <input type="radio" name="optionsRadiosinline" id="manager" value={this.state.identity}
                               onClick={this._onIdentityClick.bind(this)}/>管理员
                    </label>
                </div>
                <input type="submit" value="注册" className="btn btn-primary"/>
                <span>有账号?<a className="to-register">登陆 </a></span>
            </div>
        </form>
    }

    _onNameChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    _onAccountChange(event) {
        this.setState({
            account: event.target.value
        })
    }

    _onPasswordChange(event) {
        this.setState({
            password: event.target.value
        })
    }

    _onConfirmPasswordChange(event) {
        this.setState({
            confirmPassword: event.target.value
        })
    }

    _onIdentityClick(event) {
        if (event.target.checked)
            this.setState({identity: event.target.id});
    }

    _onSubmit(event) {
        event.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            alert('密码不一致,请重新输入密码!');
        }
        else {
            request.post('/api/users')
                .send({
                    name: this.state.name,
                    account: this.state.account,
                    password: this.state.password,
                    identity: this.state.identity
                })
                .end((err, res) => {
                    if (res.statusCode === 400 && res.text === 'Please finish the form') {
                        alert("请填完该表单!");
                    }
                    if (res.statusCode === 409) {
                        alert("该账号已存在!");
                    }
                    if (res.statusCode === 201) {
                        alert("注册成功!");
                        hashHistory.push('/');
                    }
                });
        }
    }
}


