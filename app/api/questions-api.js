import express from 'express';
import questionsData from '../allquestions.json';
import {Questions} from '../db/schema';
const router = express.Router();

router.post('/', function (req, res, next) {
    Questions.find().remove(function (err) {
        if (err) return next(err);

        Questions.create(questionsData, (err) => {
            if (err) return next(err);
            console.log('Questions is in db --success');
            res.sendStatus(200);
        });
    });
});

router.post('/content', function (req, res, next) {
    const courseId = req.body.courseId;
    Questions.find({courseId:courseId}, (err, data) => {
        if (err) return next(err);
        res.json(data);
    });
});

export default router;
