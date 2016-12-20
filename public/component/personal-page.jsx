import React, {Component} from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router';

export default class PersonalPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userAccount: 'unknown',
            Detail:[]
        }
    }

    componentWillMount() {
        request
            .post('/api/personal')
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
                const {userAccount} = res.body;
                let detail = res.body.detail;
                this.setState({userAccount:userAccount,Detail:detail});
    })
    }

    render() {
        const {Detail}  = this.state;
        return (<div className="allstyle">
                <form className="form-horizontal wordstyle" role="form">
                    <table className="table table-bordered">
                        <caption className="choose-title"><h2>成绩单</h2></caption>
                        <thead>
                        <tr>
                            <th>序号</th>
                            <th>课程名称</th>
                            <th>老师</th>
                            <th>成绩</th>
                        </tr>
                        </thead>
                        {Detail.filter(item => item.courseId.toLowerCase()).map(i =>
                            <tbody>
                            <tr>
                                <td>{i.courseId}</td>
                                <td>{i.name}</td>
                                <td>{i.teacher}</td>
                                <td>{i.score}</td>
                            </tr>
                            </tbody>
                        )}
                    </table>
                </form>
            </div>
        )
    }
}
