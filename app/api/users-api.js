import express from 'express';
import {User} from '../db/schema';
const router = express.Router();

function existEmpty(userData) {
    return !(userData.name === '' || userData.password === '' || userData.account === '' || userData.identity === '');
}

function isUserInformationLegal(userData) {
    const isEmpty = existEmpty(userData);

    if (isEmpty === false) {
        return {type: false, message: 'Please finish the form'};
    }
    return {type: true, message: 'type is true'};
}


function isExist(userData, next, callback) {
    User.findOne({account: userData.account}, function (err, doc) {
        if (err) return next(err);

        callback(null, doc);
    });
}

router.post('/', function (req, res, next) {
    const userData = req.body;
    const legal = isUserInformationLegal(userData);


    if (legal.type === true) {

        isExist(userData, next, function (err, doc) {
            if (err) return next(err);
            if (doc === null) {
                var user = new User({
                    name: userData.name,
                    account: userData.account,
                    password: userData.password,
                    identity: userData.identity
                });
                user.save(function (err) {
                    if (err) return next(err);
                    console.log('save status:', err ? 'failed' : 'success');
                    res.status(201).send('register success');
                });
            }
            else if (doc !== null) {
                res.status(409).send('the name is exist');
            }
        });


    }
    else {
        res.status(400).send(legal.message);
    }
});

export default router;
