import express from 'express';
import sha1 from 'sha1';
import {User} from '../db/schema';
import {ExamResult} from '../db/schema';
import {Courses} from '../db/schema';
import _ from 'lodash';

const router = express.Router();

router.post('/', function (req, res, next) {
    const token = req.cookies['token'];

    if (_.isEmpty(token) || token === 'undefined') {
        return res.sendStatus(401);
    }
    else {
        validateToken(token, next, function (err, isValidateToken) {
            if (err) return next(err);
            if (isValidateToken) {
                const userAccount = getUsernameFromToken(token);
                ExamResult.find({account: userAccount}, function (err, docs) {
                    find_Courses(docs, function (detail) {
                        if (detail === null) {
                            return res.json({userAccount});
                        }
                        else {
                            return res.json({userAccount: userAccount, detail: detail});
                        }
                    })
                });
            }
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

function find_Courses(docs, callback) {
    let i = 0, detail = [];

    if (docs.length === 0)
        return callback(null, false);

    else {
        _.map(docs, function(doc){
            Courses.findOne({courseId: doc.courseId}, function (err, info) {
                console.log("name:"+info.name);
                detail.push({
                    courseId: info.courseId,
                    name: info.name,
                    teacher: info.teacher,
                    score: doc.score
                });
                 i++;
                if (i === docs.length) {
                    return callback(detail, null);
                }
            });
        })
        }
    }

    export default router;
