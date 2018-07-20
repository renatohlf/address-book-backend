var request = require('supertest')('http://localhost:3000');
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoicmVuYXRvaGxmQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JDRpTURFVEVzTEZCNXB4RmFyc0RmM090d0c1MkRSMllodlNEN0ZJN2JDRzNOWFdIcFNIM3FpIn0sImlhdCI6MTUzMjEwMTA4MywiZXhwIjoxNTMyMTA0NjgzfQ.DpgdKYB5q5dhAPEHWOyXJmvXcSeafBvULetn7oX8-SU';
describe('#UserController', function () {

    beforeEach(function (done) {
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
            .set('username', 'renatohlf@gmail.com')
            .set('password', 'hckrlynx')
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

    it('#Register user duplicated', function (done) {
        request.post('/api/users')
            .set('Authorization', 'Bearer ' + token)
            .set('Content-Type', 'application/json')
            .send({ username: "teste@teste.com", password: "1" })
            .expect(500, done);
    });


    it('#List users', function (done) {
        request.get('/api/users')
            .set('Authorization', 'Bearer ' + token)
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
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