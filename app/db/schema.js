import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    account: String,
    password: String,
    identity: String
});
const User = mongoose.model('User', userSchema);

export {
    User
};
