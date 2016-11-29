import express from 'express';
import courseData from '../allcourses.json';
import {Courses} from '../db/schema';
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

export default router;