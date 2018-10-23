'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function initializer(app) {
	return new Controller(app);
}

var Controller = function () {
	function Controller(app) {
		_classCallCheck(this, Controller);

		this.jwt = app.services.jwt;
		this.secretKey = app.config.config.secretKey;
		this.User = app.connection.models.User;
		this.bcrypt = app.services.bcrypt;
	}

	_createClass(Controller, [{
		key: 'login',
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user) {
				var token;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return this.jwt.sign({ user: user }, this.secretKey, { expiresIn: '1h' });

							case 2:
								token = _context.sent;
								return _context.abrupt('return', token);

							case 4:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function login(_x) {
				return _ref.apply(this, arguments);
			}

			return login;
		}()
	}, {
		key: 'verifyUser',
		value: function () {
			var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(user) {
				var _this = this;

				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								_context3.prev = 0;
								return _context3.abrupt('return', this.User.findOne({ where: { email: user.username } }).then(function () {
									var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_user) {
										var match;
										return regeneratorRuntime.wrap(function _callee2$(_context2) {
											while (1) {
												switch (_context2.prev = _context2.next) {
													case 0:
														if (!(_user != null)) {
															_context2.next = 11;
															break;
														}

														_context2.next = 3;
														return _this.bcrypt.compare(user.password, _user.password);

													case 3:
														match = _context2.sent;

														if (!match) {
															_context2.next = 8;
															break;
														}

														return _context2.abrupt('return', true);

													case 8:
														return _context2.abrupt('return', false);

													case 9:
														_context2.next = 12;
														break;

													case 11:
														return _context2.abrupt('return', false);

													case 12:
													case 'end':
														return _context2.stop();
												}
											}
										}, _callee2, _this);
									}));

									return function (_x3) {
										return _ref3.apply(this, arguments);
									};
								}()));

							case 4:
								_context3.prev = 4;
								_context3.t0 = _context3['catch'](0);
								throw _context3.t0;

							case 7:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this, [[0, 4]]);
			}));

			function verifyUser(_x2) {
				return _ref2.apply(this, arguments);
			}

			return verifyUser;
		}()
	}]);

	return Controller;
}();

module.exports = initializer;
//# sourceMappingURL=controller.js.map