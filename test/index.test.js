const supertest = require('supertest');
const chai = require('chai');
const app = require('../app');

const expect = chai.expect;
const request = supertest(app.listen());

describe('test all api', () => {
  it('/api/login role: student', function(done) {
    request
      .post('/api/login')
      .send({
        userName: '1101'
      })
      .expect(200)
      .end(function(err, res) {
        expect(res.body.res.role).to.be.equal('student');
        done();
      })
  });
  it('/api/login role: teacher', function(done) {
    request
      .post('/api/login')
      .send({
        userName: '0101'
      })
      .expect(200)
      .end(function(err, res) {
        expect(res.body.res.role).to.be.equal('teacher');
        done();
      })
  });
  it('/api/login Auth: fail', function(done) {
    request
      .post('/api/login')
      .send({
        userName: '10086'
      })
      .expect(401)
      .end(function(err, res) {
        expect(res.body.res.auth).to.be.equal('fail');
        done();
      })
  });
})