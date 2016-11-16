import React from 'react';
import {Link} from 'react-router';
import request from 'superagent';
import {hashHistory} from 'react-router';


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
            // alert('please login!');
            // return hashHistory.push('/login');
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
      <div id="div1">
        <ul className="nav nav-pills pull-right">
          <li role="presentation" className="active"><Link to="login">登录</Link></li>
          <li role="presentation"><Link to="/register">注册</Link></li>
        </ul>
      </div>
    </div>
  }
}

export default LoginAndRegisterNav;
