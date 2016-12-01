import React, {Component} from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router';

export default class PersonalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'unknown',
    }
  }

  componentWillMount() {
      request
        .post('/api/personal')
          .set('X-API-Key', 'foobar')
          .set('Accept', 'application/json')
        .end((err, res) => {
          console.log(err);
          if (err) {
            if (res.statusCode === 401) {
                alert('请先登录!');
                return hashHistory.push('/');
            } else {
                return alert('请先登录!');
            }
          }
          console.log("statusCode:" + res.statusCode);
          const {userAccount} = res.body;
          this.setState({userAccount});
        })
  }

  render() {
    return <div>
      <div>Personal Page</div>
      <div>Username: {this.state.userAccount}</div>
      <div>Greeting:</div>
    </div>;
  }
}
