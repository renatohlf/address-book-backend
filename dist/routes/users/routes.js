'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function User(app) {
	var controller = app.routes.users.controller;
	var bcrypt = app.services.bcrypt;
	var verifytoken = app.services.authManager.verifyToken;

	app.get('/api/users', verifytoken, function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
			var users;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.prev = 0;
							_context.next = 3;
							return controller.getUsers();

						case 3:
							users = _context.sent;

							res.status(200).send({ users: users });
							_context.next = 10;
							break;

						case 7:
							_context.prev = 7;
							_context.t0 = _context['catch'](0);

							res.status(400).send(_context.t0.message);

						case 10:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this, [[0, 7]]);
		}));

		return function (_x, _x2) {
			return _ref.apply(this, arguments);
		};
	}());

	app.post('/api/users', function () {
		var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
			var name, email, password, hashedPassword, result, created;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							name = req.body.name;
							email = req.body.email;
							password = req.body.password;
							_context2.next = 5;
							return bcrypt.hash(password, 8);

						case 5:
							hashedPassword = _context2.sent;
							_context2.prev = 6;
							_context2.next = 9;
							return controller.createUser(name, email, hashedPassword);

						case 9:
							result = _context2.sent;
							created = result[1];

							if (created) {
								res.status(200).send('User created');
							} else {
								res.status(409).send('User already exists');
							}
							_context2.next = 17;
							break;

						case 14:
							_context2.prev = 14;
							_context2.t0 = _context2['catch'](6);

							res.status(400).send(_context2.t0.message);

						case 17:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, this, [[6, 14]]);
		}));

		return function (_x3, _x4) {
			return _ref2.apply(this, arguments);
		};
	}());

	app.put('/api/users/:userId', verifytoken, function () {
		var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
			var name, email, id, result;
			return regeneratorRuntime.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							name = req.body.name;
							email = req.body.email;
							id = req.params.userId;
							_context3.prev = 3;
							_context3.next = 6;
							return controller.updateUser(id, name, email);

						case 6:
							result = _context3.sent;

							if (result) {
								res.status(200).send('User updated');
							} else {
								res.status(400).send('User can not be updated');
							}
							_context3.next = 13;
							break;

						case 10:
							_context3.prev = 10;
							_context3.t0 = _context3['catch'](3);

							res.status(400).send(_context3.t0.message);

						case 13:
						case 'end':
							return _context3.stop();
					}
				}
			}, _callee3, this, [[3, 10]]);
		}));

		return function (_x5, _x6) {
			return _ref3.apply(this, arguments);
		};
	}());

	app.delete('/api/users/:userId', verifytoken, function () {
		var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
			var id, result;
			return regeneratorRuntime.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							id = req.params.userId;
							_context4.prev = 1;
							_context4.next = 4;
							return controller.deleteUserById(id);

						case 4:
							result = _context4.sent;

							if (result) {
								res.status(200).send('User deleted');
							} else {
								res.status(400).send('No user deleted');
							}
							_context4.next = 11;
							break;

						case 8:
							_context4.prev = 8;
							_context4.t0 = _context4['catch'](1);

							res.status(400).send(_context4.t0.message);

						case 11:
						case 'end':
							return _context4.stop();
					}
				}
			}, _callee4, this, [[1, 8]]);
		}));

		return function (_x7, _x8) {
			return _ref4.apply(this, arguments);
		};
	}());

	app.delete('/api/users/', verifytoken, function () {
		var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
			var email, result;
			return regeneratorRuntime.wrap(function _callee5$(_context5) {
				while (1) {
					switch (_context5.prev = _context5.next) {
						case 0:
							email = req.body.email;
							_context5.prev = 1;
							_context5.next = 4;
							return controller.deleteUserByEmail(email);

						case 4:
							result = _context5.sent;

							if (result) {
								res.status(200).send('User deleted');
							} else {
								res.status(400).send('No user deleted');
							}
							_context5.next = 11;
							break;

						case 8:
							_context5.prev = 8;
							_context5.t0 = _context5['catch'](1);

							res.status(400).send(_context5.t0.message);

						case 11:
						case 'end':
							return _context5.stop();
					}
				}
			}, _callee5, this, [[1, 8]]);
		}));

		return function (_x9, _x10) {
			return _ref5.apply(this, arguments);
		};
	}());
}

module.exports = User;
//# sourceMappingURL=routes.js.map