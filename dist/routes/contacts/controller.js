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

		this.Contact = app.connection.models.Contact;
	}

	_createClass(Controller, [{
		key: "getContacts",
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
				var contacts, listContacts, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, user;

				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								contacts = [];
								listContacts = [];
								_context.prev = 2;
								_context.next = 5;
								return this.Contact.findAll();

							case 5:
								contacts = _context.sent;
								_iteratorNormalCompletion = true;
								_didIteratorError = false;
								_iteratorError = undefined;
								_context.prev = 9;

								for (_iterator = contacts[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
									user = _step.value;

									listContacts.push(user);
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
								return _context.abrupt("return", listContacts);

							case 31:
							case "end":
								return _context.stop();
						}
					}
				}, _callee, this, [[2, 27], [9, 13, 17, 25], [18,, 20, 24]]);
			}));

			function getContacts() {
				return _ref.apply(this, arguments);
			}

			return getContacts;
		}()
	}, {
		key: "updateContact",
		value: function () {
			var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id, first_name, last_name, email, phone) {
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.prev = 0;
								return _context2.abrupt("return", this.Contact.update({
									first_name: first_name,
									last_name: last_name,
									email: email,
									phone: phone
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

			function updateContact(_x, _x2, _x3, _x4, _x5) {
				return _ref2.apply(this, arguments);
			}

			return updateContact;
		}()
	}, {
		key: "createContact",
		value: function () {
			var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(first_name, last_name, email, phone) {
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								_context3.prev = 0;
								return _context3.abrupt("return", this.Contact.findOrCreate({ where: { phone: phone }, defaults: { first_name: first_name, last_name: last_name, email: email, phone: phone } }));

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

			function createContact(_x6, _x7, _x8, _x9) {
				return _ref3.apply(this, arguments);
			}

			return createContact;
		}()
	}, {
		key: "deleteContact",
		value: function () {
			var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id) {
				return regeneratorRuntime.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								_context4.prev = 0;
								return _context4.abrupt("return", this.Contact.destroy({
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

			function deleteContact(_x10) {
				return _ref4.apply(this, arguments);
			}

			return deleteContact;
		}()
	}]);

	return Controller;
}();

module.exports = initializer;
//# sourceMappingURL=controller.js.map