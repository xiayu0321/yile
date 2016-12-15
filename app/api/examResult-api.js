import express from 'express';
import {ExamResult} from '../db/schema';
import {Questions} from '../db/schema';
import _ from 'lodash';
const router = express.Router();

// function existEmpty(userData) {
//     return !(userData.account === '' || userData.account === undefined);
// }
//
// function isUserInformationLegal(userData) {
//     const isEmpty = existEmpty(userData);
//
//     if (isEmpty === false) {
//         return {type: false, message: '该用户已经选过课'};
//     }
//     return {type: true, message: '可以选课'};
// }
//
// function isExist(userData, next, callback) {
//     ExamResult.findOne({account: userData.account}, function (err, doc) {
//         if (err) return next(err);
//
//         callback(null, doc);
//     });
// }

router.post('/', function (req, res, next) {
    const resultData = req.body;
    let rightAnswers = [];

    //console.log(resultData.courseId+"lsdfjcmsdld"+resultData.myAnswer);

    Questions.find({courseId:resultData.courseId},function (err,docs) {
        rightAnswers = _.filter(docs , doc => {
            return doc.rightAnswer
        })
    })

    console.log("uhininini"+rightAnswers);

    // const legal = isUserInformationLegal(userData);
    //
    // if (legal.type === true) {
    //     isExist(userData, next, function (err, doc) {
    //         if (err) return next(err);
    //         if (doc === null) {
    //             var examResult = new ExamResult({
    //                 account: userData.account,
    //                 chosenCourses: userData.chosenCourses
    //             });
    //
    //             examResult.save(function (err) {
    //                 if (err) return next(err);
    //                 console.log('save status:', err ? 'failed' : 'success');
    //                 res.status(201).send('save success');
    //             });
    //         }
    //         else if (doc !== null) {
    //             res.status(409).send('该用户已经选过课啦！！！！！！');
    //         }
    //     });
    // }
    // else {
    //     res.status(400).send(legal.message);
    // }
});

export default router;
