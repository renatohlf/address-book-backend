"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function initializer(app) {
	return new Controller(app);
}

function Controller(app) {
	this.User = app.connection.models.User;
}

Controller.prototype.getUsers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
	var users, listUsers, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, user;

	return regeneratorRuntime.wrap(function _callee$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					users = [];
					listUsers = [];
					_context.prev = 2;
					_context.next = 5;
					return this.User.findAll();

				case 5:
					users = _context.sent;
					_iteratorNormalCompletion = true;
					_didIteratorError = false;
					_iteratorError = undefined;
					_context.prev = 9;


					for (_iterator = users[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						user = _step.value;

						listUsers.push(user);
					}

					_context.next = 17;
					break;

				case 13:
					_context.prev = 13;
					_context.t0 = _context["catch"](9);
					_didIteratorError = true;
					_iteratorError = _context.t0;

				case 17:
					_context.prev = 17;
					_context.prev = 18;

					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}

				case 20:
					_context.prev = 20;

					if (!_didIteratorError) {
						_context.next = 23;
						break;
					}

					throw _iteratorError;

				case 23:
					return _context.finish(20);

				case 24:
					return _context.finish(17);

				case 25:
					_context.next = 30;
					break;

				case 27:
					_context.prev = 27;
					_context.t1 = _context["catch"](2);
					throw _context.t1;

				case 30:
					return _context.abrupt("return", listUsers);

				case 31:
				case "end":
					return _context.stop();
			}
		}
	}, _callee, this, [[2, 27], [9, 13, 17, 25], [18,, 20, 24]]);
}));

Controller.prototype.updateUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
	return regeneratorRuntime.wrap(function _callee2$(_context2) {
		while (1) {
			switch (_context2.prev = _context2.next) {
				case 0:
				case "end":
					return _context2.stop();
			}
		}
	}, _callee2, this);
}));

Controller.prototype.createUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
	return regeneratorRuntime.wrap(function _callee3$(_context3) {
		while (1) {
			switch (_context3.prev = _context3.next) {
				case 0:
				case "end":
					return _context3.stop();
			}
		}
	}, _callee3, this);
}));

module.exports = initializer;
//# sourceMappingURL=controller.js.map