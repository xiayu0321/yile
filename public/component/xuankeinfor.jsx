import React from "react";
import request from 'superagent';
import CheckPic from "../images/xuankeinfor/check.png";
import ChoosePic from "../images/xuankeinfor/choose.png";
import PersonPic from '../images/xuankeinfor/person.png';
import {Link,hashHistory} from 'react-router';
require('../css/xuankeinfor.css');

class xuankeinfor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: ''
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
                    } else {
                        return alert('请先登录!');
                    }
                }
                console.log("statusCode:" + res.statusCode);
                const {username} = res.body;
                this.setState({username});
            })
    }

    render() {
        return (
            <div className="choosesec">
                <div className="summary">
                    <div className="row" id="summary-container">
                        <div className="col-sm-4">
                            <img className="pic" src={CheckPic}/>
                            <p><Link className="btn btn-default" to="/" role="button">查看选课</Link></p>
                        </div>

                        <div className="col-sm-4">
                            <img className="pic" src={ChoosePic}/>
                         <p><Link className="btn btn-default" to="/allCourses" role="button">选择课程</Link></p>
                        </div>
                        <div className="col-sm-4">
                            <img className="pic" src={PersonPic}/>
                           <p><Link className="btn btn-default" to="/personalPage" role="button">个人中心</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default xuankeinfor;
