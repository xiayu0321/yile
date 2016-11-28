import React from "react";
import CheckPic from "../images/xuankeinfor/check.png";
import ChoosePic from "../images/xuankeinfor/choose.png";
import PersonPic from '../images/xuankeinfor/person.png';
import {Link} from 'react-router';
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
        // const self = this;
        // request
        //     .get('/api/personal')
        //     .end((err, res) => {
        //         console.log(err);
        //         if (err) {
        //             if (res.statusCode === 401) {
        //             } else {
        //                 return alert('请先登录!');
        //             }
        //         }
        //         console.log("statusCode:" + res.statusCode);
        //         const {account} = res.body;
        //         self.setState({account});
        //     })
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
                            {/*<p><link className="btn btn-default" to="/" role="button">选择课程</link></p>*/}
                        </div>
                        <div className="col-sm-4">
                            <img className="pic" src={PersonPic}/>
                            {/*<p><link className="btn btn-default" to="/" role="button">个人中心</link></p>*/}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default xuankeinfor;
