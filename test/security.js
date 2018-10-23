/* global describe it */
import { expect } from 'chai';
import Request from 'supertest';
import app from './../src/index';


describe('Server', () => {
	const request = Request(app);
  
	describe('/api', () => {
		it('Should return a 404 when invalid route', done => {
			request
				.post('/api/notfound')
				.expect(404)
				.end(done);
		});
	});
});

describe('Login', () => {
	const request = Request(app);
  
	describe('/api/login', () => {
		it('Should return a token', done => {
			request
				.post('/api/login')
				.set('username', 'user@user.com')
				.set('password', 'user')
				.expect(200)
				.end(done);
		});
	});
});
