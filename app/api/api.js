import express from 'express';
import userApi from './users-api';
import loginApi from './sessions-api';
import personal from './personal';
import coursesApi from './courses-api';
import chosenCourseApi from './chosenCourse-api';
import courseSelection from './courseSelection-api';
import questionsApi from './questions-api';
import examResultApi from './examResult-api';

const router = express.Router();

router.use('/users', userApi);
router.use('/sessions', loginApi);
router.use('/personal', personal);
router.use('/courses', coursesApi);
router.use('/chosenCourse', chosenCourseApi);
router.use('/courseSelection', courseSelection);
router.use('/exam', questionsApi);
router.use('/result',examResultApi);

export default router;
