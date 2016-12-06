import React from 'react';
import request from 'superagent';
import {Link} from 'react-router';
import {hashHistory} from 'react-router';

class CheckCourses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userAccount:'',
            chosenCourses:[],
            chosenCoursesDetail:[]
        }
    }

    componentDidMount() {
        request
            .post('/api/personal')
            .set('X-API-Key', 'foobar')
            .set('Accept', 'application/json')
            .end((err, res) => {
                console.log(err);
                if (err) {
                    if (res.statusCode === 401) {
                        alert('请先登录!');
                        hashHistory.push('/');
                    } else {
                        return alert('请先登录!');
                    }
                }
                console.log("statusCode:" + res.statusCode);
                const {userAccount} = res.body;
                this.setState({userAccount})

                 request
                     .post('/api/courseSelection')
                     .send({
                        account: this.state.userAccount
                     })
                     .end((err, res) => {
                        if (res.statusCode === 400) {
                            alert("无该用户");
                        }
                        if (res.statusCode === 200) {
                            this.setState({
                                chosenCourses: res.body
                            });

                            request
                                .post('/api/courses/check')
                                .send({
                                    chosenCourses: this.state.chosenCourses
                                })
                                .end((err, data) => {
                                    this.setState({
                                        chosenCoursesDetail: data.body
                                    });
                                });
                        }
                    });
            });
    }

    render() {
        const {chosenCoursesDetail}  = this.state;
        return (<div className="allstyle">
                <form className="form-horizontal wordstyle" role="form">
                    <table className="table table-bordered">
                        <caption className="choose-title"><h2>选课课表<span>(最多选5门)</span></h2></caption>
                        <thead>
                        <tr>
                            <th>序号</th>
                            <th>课程名称</th>
                            <th>任课老师</th>
                            <th>状态</th>
                        </tr>
                        </thead>
                        {chosenCoursesDetail.filter(item => item.courseId.toLowerCase()).map(i =>
                            <tbody>
                            <tr>
                                <td>{i.courseId}</td>
                                <td>{i.name}</td>
                                <td>{i.teacher}</td>
                                <td>
                                    <div>
                                    <ul className="nav nav-pills">
                                       <button className="btn btn-default"><Link className="but-register" to="/">未考试</Link></button>
                                    </ul>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        )}
                    </table>
                </form>
            </div>
        )
    }
}

export default CheckCourses;