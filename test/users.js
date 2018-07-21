var request = require('supertest')('https://floating-citadel-16549.herokuapp.com');
var jwt = require('jsonwebtoken');
require('dotenv').config({ path: './../.env' });
var config = require('./../app/config/config');
var secretKey = config.secretKey;
var token = '';

describe('#UserController', function () {
    beforeEach(function (done) {
        var user = { username: "55h5j@teste.com", password: "1" };
        token = jwt.sign({ user }, { expires: '1h' } ,secretKey);
        done();
    });

    /****               LOGIN                   ****/

    it('#Login with invalid fields', function (done) {
        request.post('/api/login')
            .set('Content-Type', 'application/json')
            .set('username', '')
            .set('password', '')
            .expect(400, done);
    });

    it('#Login with valid fields', function (done) {
        request.post('/api/login')
            .set('Content-Type', 'application/json')
            .set('username', '55h5j@teste.com')
            .set('password', '1')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('#Login with invalid user', function (done) {
        request.post('/api/login')
            .set('Content-Type', 'application/json')
            .set('username', 'user@teste.com')
            .set('password', '1')
            .expect(404, done);
    });

    /****                 END                  ****/


    /****               USER                   ****/

    it('#Register user with valid fields', function (done) {
        request.post('/api/users')
            .set('Authorization', 'Bearer ' + token)
            .set('Content-Type', 'application/json')
            .send({ username: [...Array(5)].map(() => Math.random().toString(26)[3]).join('') + "@teste.com", password: "1" })
            .expect(200, done);
    });

    it('#Register user with invalid fields', function (done) {
        request.post('/api/users')
            .set('Authorization', 'Bearer ' + token)
            .set('Content-Type', 'application/json')
            .send({ username: "", password: "" })
            .expect(400, done);
    });

    it('#Register duplicate user', function (done) {
        request.post('/api/users')
            .set('Authorization', 'Bearer ' + token)
            .set('Content-Type', 'application/json')
            .send({ username: "teste@teste.com", password: "1" })
            .expect(500, done);
    });

    /****                 END                  ****/


    /****               CONTACTS               ****/

    it('#Create a new contact', function (done) {
        var randomName = [...Array(5)].map(() => Math.random().toString(26)[3]).join('');
        var randomValue = [...Array(5)].map(() => Math.random().toString(26)[3]).join('');
        request.post('/api/contacts')
            .set('Authorization', 'Bearer ' + token)
            .set('Content-Type', 'application/json')
            .send({ name: randomName, address: randomValue })
            .expect(200, done);
    });

    /****                 END                  ****/

});