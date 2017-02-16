import express from 'express';
import {ChosenCourses} from '../db/schema';
import _ from 'lodash';

const router = express.Router();
router.post('/', (req, res, next) => {
     const account = req.body.account;

    if (_.isEmpty(account)) {
        return res.status(400).send('用户还未登录');
    }
    else {
        ChosenCourses.findOne({account}, (err, userData) => {
            if (err) return next(err);
            if (userData === null) {
                return res.status(401).send('没有该选课信息');
            }
            else{
                const chosenCoursesArr = divideCourses(userData.chosenCourses);
                return res.status(200).send(chosenCoursesArr);
            }
        });
    }
    function divideCourses(chosenCourses) {
        return chosenCourses.split(',');
    }
});
export default router;