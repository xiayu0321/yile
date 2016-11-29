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
const User = mongoose.model('User', userSchema);
const Courses = mongoose.model('Courses',coursesSchema);

export {
    User,
    Courses
};
