"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function initializer(app) {
	return new Controller(app);
}

var Controller = function () {
	function Controller(app) {
		_classCallCheck(this, Controller);

		this.User = app.connection.models.User;
	}

	_createClass(Controller, [{
		key: "getUsers",
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
				var users, listUsers, userModel, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, user;

				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								users = void 0;
								listUsers = [];
								userModel = void 0;
								_context.prev = 3;
								_context.next = 6;
								return this.User.findAll();

							case 6:
								users = _context.sent;
								_iteratorNormalCompletion = true;
								_didIteratorError = false;
								_iteratorError = undefined;
								_context.prev = 10;

								for (_iterator = users[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
									user = _step.value;

									userModel = {
										id: user.id,
										name: user.name,
										email: user.email
									};
									listUsers.push(userModel);
								}
								_context.next = 18;
								break;

							case 14:
								_context.prev = 14;
								_context.t0 = _context["catch"](10);
								_didIteratorError = true;
								_iteratorError = _context.t0;

							case 18:
								_context.prev = 18;
								_context.prev = 19;

								if (!_iteratorNormalCompletion && _iterator.return) {
									_iterator.return();
								}

							case 21:
								_context.prev = 21;

								if (!_didIteratorError) {
									_context.next = 24;
									break;
								}

								throw _iteratorError;

							case 24:
								return _context.finish(21);

							case 25:
								return _context.finish(18);

							case 26:
								_context.next = 31;
								break;

							case 28:
								_context.prev = 28;
								_context.t1 = _context["catch"](3);
								throw _context.t1;

							case 31:
								return _context.abrupt("return", listUsers);

							case 32:
							case "end":
								return _context.stop();
						}
					}
				}, _callee, this, [[3, 28], [10, 14, 18, 26], [19,, 21, 25]]);
			}));

			function getUsers() {
				return _ref.apply(this, arguments);
			}

			return getUsers;
		}()
	}, {
		key: "updateUser",
		value: function () {
			var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id, name, email) {
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.prev = 0;
								return _context2.abrupt("return", this.User.update({
									name: name,
									email: email
								}, {
									where: {
										id: id
									}
								}).then(function (result) {
									if (result[0] > 0) {
										return true;
									} else {
										return false;
									}
								}));

							case 4:
								_context2.prev = 4;
								_context2.t0 = _context2["catch"](0);
								throw _context2.t0;

							case 7:
							case "end":
								return _context2.stop();
						}
					}
				}, _callee2, this, [[0, 4]]);
			}));

			function updateUser(_x, _x2, _x3) {
				return _ref2.apply(this, arguments);
			}

			return updateUser;
		}()
	}, {
		key: "createUser",
		value: function () {
			var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(name, email, password) {
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								_context3.prev = 0;
								return _context3.abrupt("return", this.User.findOrCreate({ where: { email: email }, defaults: { name: name, email: email, password: password } }));

							case 4:
								_context3.prev = 4;
								_context3.t0 = _context3["catch"](0);
								throw _context3.t0;

							case 7:
							case "end":
								return _context3.stop();
						}
					}
				}, _callee3, this, [[0, 4]]);
			}));

			function createUser(_x4, _x5, _x6) {
				return _ref3.apply(this, arguments);
			}

			return createUser;
		}()
	}, {
		key: "deleteUserById",
		value: function () {
			var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id) {
				return regeneratorRuntime.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								_context4.prev = 0;
								return _context4.abrupt("return", this.User.destroy({
									where: {
										id: id
									}
								}).then(function (result) {
									if (result > 0) {
										return true;
									} else {
										return false;
									}
								}));

							case 4:
								_context4.prev = 4;
								_context4.t0 = _context4["catch"](0);
								throw _context4.t0;

							case 7:
							case "end":
								return _context4.stop();
						}
					}
				}, _callee4, this, [[0, 4]]);
			}));

			function deleteUserById(_x7) {
				return _ref4.apply(this, arguments);
			}

			return deleteUserById;
		}()
	}, {
		key: "deleteUserByEmail",
		value: function () {
			var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(email) {
				return regeneratorRuntime.wrap(function _callee5$(_context5) {
					while (1) {
						switch (_context5.prev = _context5.next) {
							case 0:
								_context5.prev = 0;
								return _context5.abrupt("return", this.User.destroy({
									where: {
										email: email
									}
								}).then(function (result) {
									if (result > 0) {
										return true;
									} else {
										return false;
									}
								}));

							case 4:
								_context5.prev = 4;
								_context5.t0 = _context5["catch"](0);
								throw _context5.t0;

							case 7:
							case "end":
								return _context5.stop();
						}
					}
				}, _callee5, this, [[0, 4]]);
			}));

			function deleteUserByEmail(_x8) {
				return _ref5.apply(this, arguments);
			}

			return deleteUserByEmail;
		}()
	}]);

	return Controller;
}();

module.exports = initializer;
//# sourceMappingURL=controller.js.map