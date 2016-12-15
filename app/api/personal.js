import express from 'express';
import sha1 from 'sha1';
import {User} from '../db/schema';
import {ExamResult} from '../db/schema';
import {Courses} from '../db/schema';
import _ from 'lodash';

const router = express.Router();

router.post('/', function (req, res, next) {
    const token = req.cookies['token'];
    let  score ;
    let detail;

    if (_.isEmpty(token) || token === 'undefined') {
        return res.sendStatus(401);
    }
    else {
        validateToken(token, next, function (err, isValidateToken) {
            if (err) return next(err);
            if (isValidateToken) {
                const userAccount = getUsernameFromToken(token);

                ExamResult.find({account:userAccount},function(err,docs){
                     console.log("11323214521621"+docs[0].score);
                    score = docs[0].score;
                    Courses.find({courseId:docs[0].courseId},function(err,info){
                        console.log("ifweinfiwfn"+info[0].name);
                        detail = info[0];

                    });
                });
                return res.json({userAccount});
            }
            return res.sendStatus(401);
        });
    }
});

function generateToken(account, password) {
    return account + ':' + sha1(password);
}

function getUsernameFromToken(token) {
    const separatorIndex = _.lastIndexOf(token, ':');
    return token.substring(0, separatorIndex);
}

function validateToken(token, next, callback) {
    if (token === null || token.length === 0 || !token.includes(':')) {
        callback(null, false);
    }
    const account = getUsernameFromToken(token);
    findUser(account, next, function (err, user) {
        if (err) return next(err);
        if (user) {
            const {account, password} = user;
            callback(null, generateToken(account, password) === token);
        }
    });
}

function findUser(account, next, callback) {
    User.findOne({account}, (err, userData) => {
        if (err) return next(err);
        callback(null, userData);
    });
}
export default router;


