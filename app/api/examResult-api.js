import express from 'express';
import {ExamResult} from '../db/schema';
import {Questions} from '../db/schema';
const router = express.Router();

function isExist(userData, next, callback) {
    ExamResult.findOne({courseId: userData.courseId}, function (err, doc) {
        if (err) return next(err);

        callback(null, doc);
    });
}

router.post('/', function (req, res, next) {
    const resultData = req.body;
    let rightAnswers = [];
    let score = 0;

    Questions.find({courseId: resultData.courseId}, function (err, docs) {
        for (let i = 0; i < docs.length; i++) {
            rightAnswers.push(docs[i].rightAnswer);
        }

        const averageScore = 100 / rightAnswers.length;

        for (let i = 0; i < rightAnswers.length; i++) {
            if (resultData.myAnswer[i] == rightAnswers[i]) {
                score += averageScore;
            }
        }

        isExist(resultData, next, function (err, doc) {
            if (err)
                return next(err);
            if (doc === null) {
                var result = new ExamResult({
                    account: resultData.userAccount,
                    courseId: resultData.courseId,
                    myAnswer: resultData.myAnswer,
                    score: score
                });
                result.save((err)=> {
                    if (err) return next(err);
                    console.log('save status:', err ? 'failed' : 'success');
                    res.status(201).send("提交成功");
                });
            } else {
                res.status(409).send('已经考完试');
            }
        });
    })
})

export default router;
