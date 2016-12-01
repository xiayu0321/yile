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

const User = mongoose.model('User', userSchema);
const Courses = mongoose.model('Courses',coursesSchema);
const ChosenCourses = mongoose.model('ChosenCourses',chosenCourseSchema);

export {
    User,
    Courses,
    ChosenCourses
};
