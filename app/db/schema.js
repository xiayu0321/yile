import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    account: String,
    password: String,
    identity: String
});

const coursesSchema = new Schema({
    courseId:String,
    name:String,
    teacher:String,
    information:String,
    isChosen:Boolean
});

const chosenCourseSchema = new Schema({
    account:String,
    chosenCourses:String
});

const questionsSchema = new Schema({
    courseId:String,
    questionId:String,
    question:String,
    A:String,
    B:String,
    C:String,
    D:String,
    rightAnswer:String
});

const examResultSchema = new Schema({
    courseId:String,
    myAnswer:String,
    score:Number
});

const User = mongoose.model('User', userSchema);
const Courses = mongoose.model('Courses',coursesSchema);
const ChosenCourses = mongoose.model('ChosenCourses',chosenCourseSchema);
const Questions = mongoose.model('questions',questionsSchema);
const ExamResult = mongoose.model('ExamResult',examResultSchema);

export {
    User,
    Courses,
    ChosenCourses,
    Questions,
    ExamResult
};
