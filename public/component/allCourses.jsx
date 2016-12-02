import React from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router';

require('../css/allCourses.css');

class AllCourses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userAccount:'',
            courses: [],
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

                        return hashHistory.push('/');
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
            .post('/api/courses')
            .end((err, data) => {
                this.setState({
                    courses: data.body
                });
            });
    }

    render() {
        const {courses}  = this.state;
        return (<div className="allstyle">
                    <form className="form-horizontal wordstyle" role="form" onSubmit={this._onSubmit.bind(this)}>
                           <table className="table table-bordered">
                               <caption className="choose-title"><h2>全部课表<span>(最多选5门)</span></h2></caption>
                              <thead>
                                 <tr>
                                     <th>序号</th>
                                     <th>课程名称</th>
                                     <th>任课老师</th>
                                     <th>课程简介</th>
                                     <th>状态</th>
                                 </tr>
                              </thead>
                               {courses.filter(item => item.courseId.toLowerCase()).map(i =>
                                       <tbody>
                                       <tr>
                                           <td>{i.courseId}</td>
                                           <td>{i.name}</td>
                                           <td>{i.teacher}</td>
                                           <td>{i.information}</td>
                                           <td>
                                               <div className="checkbox">
                                               <label>
                                                   <input type="checkbox" name="courseChoose" id="thisCourse" value={i.courseId}
                                                          onClick={this._onCourseClick.bind(this)}/>
                                               </label>
                                           </div>
                                           </td>
                                       </tr>
                                       </tbody>
                                )}
                               </table>
                        <input type="submit" value="提交" className="btn btn-primary"/>
                    </form>
            </div>
        )
    }

    _onCourseClick(event) {
        if (event.target.checked) {
            var newArray = this.state.chosenCourses;
            newArray.push(event.target.value);
    }
        this.setState({chosenCourses: newArray});
    }

    _onSubmit(event) {
        event.preventDefault();
            request.post('/api/chosenCourse')
                .send({
                    account: this.state.userAccount,
                    chosenCourses:String(this.state.chosenCourses)
                })
                .end((err, res) => {
                    if (res.statusCode === 400 && res.text === '该用户已经选过课') {
                        alert("该用户已经选过课");
                    }
                    if (res.statusCode === 409) {
                        alert("该用户已经选过课！！！！！");
                    }
                    if (res.statusCode === 201) {
                        alert("选课成功!");
                        hashHistory.push('/');
                        $(".login-frame").html('欢迎' + '<p>'+'<a href="/#/personalPage">' + this.state.userAccount + '</a>'+'用户</p>'+'<p>'+'进入答题系统</p>');
                    }
                });
        }
}

export default AllCourses;