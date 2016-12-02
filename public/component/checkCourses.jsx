import React from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router';

class CheckCourses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userAccount:'',
            chosenCourses:[]
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
                    } else {
                        return alert('请先登录!');
                    }
                }
                console.log("statusCode:" + res.statusCode);
                const {userAccount} = res.body;
                this.setState({userAccount});
            })

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
                            chosenCourses: res.body.chosenCourses
                        });
                        alert("刷新成功!");
                    }
                });
            // .end((err, data) => {
            //     this.setState({
            //         chosenCourses: data.body
            // });
    }

    render() {
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
                    </table>
                </form>
            </div>
        )
    }
}

export default CheckCourses;