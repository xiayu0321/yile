import express from 'express';
import courseData from '../allcourses.json';
import {Courses} from '../db/schema';
import  _ from 'lodash';
const router = express.Router();

router.post('/', function (req, res, next) {
    Courses.find().remove(function (err) {
        if (err) return next(err);

        Courses.create(courseData, (err, all) => {
            if (err) return next(err);
            console.log('courseData is in db --success');

            res.json(all);
        });
    });
});

router.post('/check', function (req, res) {
    let chosenCourse = [];
    let chosenCoursesDetail = [];

    Courses.find({}, function (err, docs) {
        chosenCourse = docs;

        const coursesID = req.body.chosenCourses;

        chosenCoursesDetail = _.filter(chosenCourse, function (course) {
             return (_.includes(coursesID, course.courseId) === true);
         })
        res.json(chosenCoursesDetail);
    });
})


export default router;