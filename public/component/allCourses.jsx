import React from 'react';
import request from 'superagent';

require('../css/allCourses.css');

class AllCourses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        }
    }

    componentDidMount() {
        request.post('/api/courses')
            .end((err, data) => {
                this.setState({
                    courses: data.body
                });
            });
    }

    render() {
        const {courses}  = this.state;
        return (<div className="allstyle">
                    <form className="form-horizontal wordstyle" role="form">
                           <table className="table table-bordered">
                               <caption className="choose-title"><h2>选课课表</h2></caption>
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
                                           <td>{i.isChosen}</td>
                                       </tr>
                                       </tbody>
                               )}
                               </table>
                    </form>
            </div>
        )
    }
}

export default AllCourses;