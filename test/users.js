/* global describe it */
import Request from 'supertest';
import app from './../src/index';

const jwt = app.services.jwt;
const secretKey = process.env.SECRET_KEY;

async function getToken() {
	const token = await jwt.sign({ username: 'teste@teste.com', password: '123' }, secretKey, { expiresIn: '1h' });
	return token;
}

let token = getToken();

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


describe('Register User', () => {
	const request = Request(app);
  
	describe('/api/users', () => {
		it('It should register a user', done => {
			request
				.post('/api/users')
				.send({
					name:'Teste',
					email:'teste@teste.com',
					password: '123'
				})
				.expect(200)
				.end(done);
		});
	});
});

describe('Get Users', () => {
	const request = Request(app);
  
	describe('/api/users', () => {
		it('Should return a 200 and return all the users', done => {
			request
				.get('/api/users')
				.set('Authorization', token)
				.expect(200)
				.end(done);
		});
	});
});

// describe('Update User', () => { 
// 	const request = Request(app);

// 	describe('/api/users', () => {
// 		it('Should return a 200 and update the selected user', done => {
// 			request
// 				.put('/api/users')
// 				.query({userId: 1})
// 				.set('Authorization', token)
// 				.send({
// 					email:'teste@teste.com'
// 				})
// 				.expect(200)
// 				.end(done);
// 		});
// 	});
// });

describe('Delete User', () => { 
	const request = Request(app);

	describe('/api/users', () => {
		it('Should return a 200 and delete the selected user', done => {
			request
				.delete('/api/users')
				.set('Authorization', token)
				.send({
					email:'teste@teste.com'
				})
				.expect(200)
				.end(done);
		});
	});
});
