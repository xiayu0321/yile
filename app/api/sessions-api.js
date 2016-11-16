import express from 'express';
import {User} from '../db/schema';
import _ from 'lodash';
import sha1 from 'sha1';

const router = express.Router();
router.post('/', (req, res, next) => {
    const account = req.body.account;
    const password = req.body.password;

    if (_.isEmpty(account) || _.isEmpty(password)) {
        return res.status(400).send('account and password can not be null');
    }
    else {
        User.findOne({account}, (err, userData) => {
            if (err) return next(err);
            if (userData === null || userData.password !== password) {
                return res.status(401).send('account or password is wrong');
            }
            else if (userData.password === password) {
                res.cookie('token', generateInfo(account, password), {maxAge: 10 * 1000});
                return res.status(201).send('login success');
            }
        });
    }
    function generateInfo(userId, password) {
        return userId + ':' + sha1(password);
    }
});
export default router;
