'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function security(app) {
	var controller = app.routes.security.controller;

	app.post('/api/login', function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
			var username, password, user, validUser, token;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							username = req.get('username');
							password = req.get('password');
							user = {
								username: username,
								password: password
							};
							_context.prev = 3;
							_context.next = 6;
							return controller.verifyUser(user);

						case 6:
							validUser = _context.sent;

							if (!(validUser != null)) {
								_context.next = 14;
								break;
							}

							_context.next = 10;
							return controller.login(validUser);

						case 10:
							token = _context.sent;

							res.status(200).send({ token: token });
							_context.next = 15;
							break;

						case 14:
							res.status(400).send('Invalid user');

						case 15:
							_context.next = 20;
							break;

						case 17:
							_context.prev = 17;
							_context.t0 = _context['catch'](3);

							res.status(400).send(_context.t0.message);

						case 20:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this, [[3, 17]]);
		}));

		return function (_x, _x2) {
			return _ref.apply(this, arguments);
		};
	}());
}

module.exports = security;
//# sourceMappingURL=routes.js.map