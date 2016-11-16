import request from 'supertest';
import app from '../app/server';
import finish from './finish';
import {User} from '../app/db/schema';
import db from '../app/db/db';
import async from 'async';

describe('sessions-api-spec', ()=> {
  beforeEach((done)=> {
    db.connect('test', (err) => {
      if (err) return done.fail(err);
      User.find().remove(finish(done));
    });
  });

  afterEach((done) => {
    db.close(finish(done));
  });

  it('input right name and password', (done)=> {
    async.series([
      (cb) =>new User({
        name: '123',
        password: '111111'
      }).save((err) => {
        if (err) return done.fail(err);
        request(app).post('/api/sessions').send({
          name: '123',
          password: '111111'
        }).expect(201, 'login success', cb);
      })
    ], finish(done));
  });
  it('wrong password', (done)=> {
    async.series([
      (cb) =>new User({
        name: '123',
        password: '111111'
      }).save((err) => {
        if (err) return done.fail(err);
        request(app).post('/api/sessions').send({
          name: '123',
          password: 'wrong password'
        }).expect(401, 'name or password is wrong', cb);
      })
    ], finish(done));
  });
  it('wrong name', (done)=> {
    async.series([
      (cb) =>new User({
        name: '123',
        password: '111111'
      }).save((err) => {
        if (err) return done.fail(err);
        request(app).post('/api/sessions').send({
          name: 'wrong name',
          password: '111111'
        }).expect(401, 'name or password is wrong', cb);
      })
    ], finish(done));
  });
  it('name is null', (done)=> {
    async.series([
      (cb) =>new User({
        name: '123',
        password: '111111'
      }).save((err) => {
        if (err) return done.fail(err);
        request(app).post('/api/sessions').send({
          name: '',
          password: '12'
        }).expect(400, 'name and password can not be null', cb);
      })
    ], finish(done));
  });
  it('password is null', (done)=> {
    async.series([
      (cb) =>new User({
        name: '123',
        password: '111111'
      }).save((err) => {
        if (err) return done.fail(err);
        request(app).post('/api/sessions').send({
          name: '123',
          password: ''
        }).expect(400, 'name and password can not be null', cb);
      })
    ], finish(done));
  });
  it('name is not exist', (done)=> {
    async.series([
      (cb) =>new User({
        name: '123',
        password: '111111'
      }).save((err) => {
        if (err) return done.fail(err);
        request(app).post('/api/sessions').send({
          password: '123'
        }).expect(400, 'name and password can not be null', cb);
      })
    ], finish(done));
  });
  it('password is not exist', (done)=> {
    async.series([
      (cb) =>new User({
        name: '123',
        password: '111111'
      }).save((err) => {
        if (err) return done.fail(err);
        request(app).post('/api/sessions').send({
          name: '123'
        }).expect(400, 'name and password can not be null', cb);
      })
    ], finish(done));
  });
});
