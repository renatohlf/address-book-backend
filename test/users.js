const request = require('supertest')('https://floating-citadel-16549.herokuapp.com');
import { sign } from 'jsonwebtoken';
import { secretKey as _secretKey } from './../app/config/config';
require('dotenv').config({ path: './../.env' });
const secretKey = _secretKey;
let token = '';

describe('#UserController', function () {
	beforeEach(function (done) {
		let user = { username: 'user@user.com', password: '123' };
		token = sign({ user } ,secretKey, { expiresIn: '1h' });
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
			.set('username', 'user@user.com')
			.set('password', '123')
			.expect('Content-Type', /json/)
			.expect(200, done);
	});

	it('#Login with invalid user', function (done) {
		request.post('/api/login')
			.set('Content-Type', 'application/json')
			.set('username', 't')
			.set('password', '123')
			.expect(404, done);
	});

	/****                 END                  ****/


	/****               USER                   ****/

	it('#Register user with valid fields', function (done) {
		request.post('/api/users')
			.set('Authorization', 'Bearer ' + token)
			.set('Content-Type', 'application/json')
			.send({ username: [...Array(5)].map(() => Math.random().toString(26)[3]).join('') + '@teste.com', password: '1' })
			.expect(200, done);
	});

	it('#Register user with invalid fields', function (done) {
		request.post('/api/users')
			.set('Authorization', 'Bearer ' + token)
			.set('Content-Type', 'application/json')
			.send({ username: '', password: '' })
			.expect(400, done);
	});

	it('#Register duplicate user', function (done) {
		request.post('/api/users')
			.set('Authorization', 'Bearer ' + token)
			.set('Content-Type', 'application/json')
			.send({ username: 'teste@teste.com', password: '1' })
			.expect(500, done);
	});

	/****                 END                  ****/


	/****               CONTACTS               ****/

	it('#Create a new contact', function (done) {
		let randomName = [...Array(5)].map(() => Math.random().toString(26)[3]).join('');
		let randomValue = [...Array(5)].map(() => Math.random().toString(26)[3]).join('');
		request.post('/api/contacts')
			.set('Authorization', 'Bearer ' + token)
			.set('Content-Type', 'application/json')
			.send({ name: randomName, address: randomValue })
			.expect(200, done);
	});

	/****                 END                  ****/

});