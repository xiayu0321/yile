import React from 'react';
import request from 'superagent';
import _ from 'lodash';
import '../css/exam.css'

class Exam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId:'',
            questions: [],
            myAnswer: []
        }
    }

    componentDidMount() {
        request
            .post('/api/exam')
            .end((err, res) => {
                console.log(res.statusCode);

                request
                    .post('/api/exam/content')
                    .send({courseId: this.props.params.id})
                    .end((err, data) => {
                        this.setState({
                            questions: data.body
                        });
                    });
            })
    }

    render() {
        const {questions}  = this.state;

        return (<div className="allstyle">
                <form className="form-horizontal wordstyle" role="form" onSubmit={this._onSubmit.bind(this)}>
                    <table className="table table-bordered">
                        <caption className="choose-title"><h2>试题</h2></caption>
                        <tbody>
                        {questions.filter(item => item.questionId.toLowerCase()).map(i =>
                            <div className="con">
                                <div>{i.question}</div>
                                <tr>
                                    <div>
                                    <label className="checkbox-inline input">
                                        <input type="radio" name={i.questionId} id="A"
                                               value={this.state.myAnswer}
                                               onClick={this._onAnswerClick.bind(this)}/>{i.A}
                                    </label>
                                    <label className="checkbox-inline">
                                        <input type="radio" name={i.questionId} id="B"
                                               value={this.state.myAnswer}
                                               onClick={this._onAnswerClick.bind(this)}/>{i.B}
                                    </label>
                                    <label className="checkbox-inline">
                                        <input type="radio" name={i.questionId} id="C"
                                               value={this.state.myAnswer}
                                               onClick={this._onAnswerClick.bind(this)}/>{i.C}
                                    </label>
                                    <label className="checkbox-inline">
                                        <input type="radio" name={i.questionId} id="D"
                                               value={this.state.myAnswer}
                                               onClick={this._onAnswerClick.bind(this)}/>{i.D}
                                    </label>
                                    </div>
                                </tr>
                            </div>

                        )}
                        </tbody>
                    </table>
                    <input type="submit" value="提交试卷" className="btn btn-primary"/>
                </form>
            </div>
        )
    }

    _onAnswerClick(event) {
        if (event.target.checked) {
            var newArray = this.state.myAnswer;
            newArray[event.target.name] = event.target.id;
        }
        this.setState({myAnswer: newArray});
    }

    _onSubmit(event) {
        event.preventDefault();
        request
            .post('/api/result')
            .send({
                courseId:this.props.params.id,
                myAnswer: this.state.myAnswer
            })
            .end((err, res) => {
                alert("fvnskjdsjmfn" + res.body);
            });
    }
}

export default Exam;
