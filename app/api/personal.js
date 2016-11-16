import express from 'express';
import sha1 from 'sha1';
import {User} from '../db/schema';
import _ from 'lodash';

const router = express.Router();

router.get('/', function (req, res,next) {
  const token = req.cookies['token'];

  if (_.isEmpty(token)) {
    return res.sendStatus(401);
  }
  else {
    validateToken(token, next, function (err, isValidateToken) {
      if (err) return next(err);
      if (isValidateToken) {
        const username = getUsernameFromToken(token);
        return res.json({username});
      }
      return res.sendStatus(401);
    });
  }
});

function generateToken(name, password) {
  return name + ':' + sha1(password);
}

function getUsernameFromToken(token) {
  const separatorIndex = _.lastIndexOf(token, ':');
  return token.substring(0, separatorIndex);
}

function validateToken(token, next, callback) {
  if (token === null || token.length === 0 || !token.includes(':')) {
    callback(null, false);
  }
  const name = getUsernameFromToken(token);
  findUser(name, next, function (err, user) {
    if (err) return next(err);
    if (user) {
      const {name, password} = user;
      callback(null, generateToken(name, password) === token);
    }
  });
}

function findUser(name, next, callback) {
  User.findOne({name}, (err, userData) => {
    if (err) return next(err);
    callback(null, userData);
  });
}

export default router;


// router.get('/', function (req, res) {
//     const token = req.cookies['token'];
//
//     if (token === null || token.length === 0 || !token.includes(':')) {
//         return false;
//     }
//     const name = getUserIdFromInfo(token);
//     User.findOne({name: name}, function (err, user, next) {
//         if (err) return next(err);
//         if (user) {
//             const password = user.password;
//             if (generateInfo(name, password) === token) {
//                 return res.status(200).send({name, password});
//             }
//             return res.sendStatus(401);
//         }
//     });
// });
//
// function getUserIdFromInfo(token) {
//     const separatorIndex = _.lastIndexOf(token, ':');
//     return token.substring(0, separatorIndex);
// }
// function generateInfo(name, password) {
//     return name + ':' + sha1(password);
// }
//
// export default router;
//
