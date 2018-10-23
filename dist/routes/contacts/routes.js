'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function contact(app) {
	var controller = app.routes.contacts.controller;
	var verifytoken = app.services.authManager.verifyToken;

	app.get('/api/contacts', verifytoken, function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
			var contacts;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.prev = 0;
							_context.next = 3;
							return controller.getContacts();

						case 3:
							contacts = _context.sent;

							res.status(200).send({ contacts: contacts });
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

	app.post('/api/contacts', verifytoken, function () {
		var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
			var first_name, last_name, email, phone, result, created;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							first_name = req.body.first_name;
							last_name = req.body.last_name;
							email = req.body.email;
							phone = req.body.phone;
							_context2.prev = 4;
							_context2.next = 7;
							return controller.createContact(first_name, last_name, email, phone);

						case 7:
							result = _context2.sent;
							created = result[1];

							if (created) {
								res.status(200).send('Contact created');
							} else {
								res.status(409).send('Contact already exists');
							}
							_context2.next = 15;
							break;

						case 12:
							_context2.prev = 12;
							_context2.t0 = _context2['catch'](4);

							res.status(400).send(_context2.t0.message);

						case 15:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, this, [[4, 12]]);
		}));

		return function (_x3, _x4) {
			return _ref2.apply(this, arguments);
		};
	}());

	app.put('/api/contacts/:contactId', verifytoken, function () {
		var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
			var first_name, last_name, email, phone, id, result;
			return regeneratorRuntime.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							first_name = req.body.first_name;
							last_name = req.body.last_name;
							email = req.body.email;
							phone = req.body.phone;
							id = req.params.contactId;
							_context3.prev = 5;
							_context3.next = 8;
							return controller.updateContact(id, first_name, last_name, email, phone);

						case 8:
							result = _context3.sent;

							if (result) {
								res.status(200).send('Contact updated');
							} else {
								res.status(400).send('Contact can not be updated');
							}
							_context3.next = 15;
							break;

						case 12:
							_context3.prev = 12;
							_context3.t0 = _context3['catch'](5);

							res.status(400).send(_context3.t0.message);

						case 15:
						case 'end':
							return _context3.stop();
					}
				}
			}, _callee3, this, [[5, 12]]);
		}));

		return function (_x5, _x6) {
			return _ref3.apply(this, arguments);
		};
	}());

	app.delete('/api/contacts/:contactId', verifytoken, function () {
		var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
			var id, result;
			return regeneratorRuntime.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							id = req.params.contactId;
							_context4.prev = 1;
							_context4.next = 4;
							return controller.deleteContact(id);

						case 4:
							result = _context4.sent;

							if (result) {
								res.status(200).send('Contact deleted');
							} else {
								res.status(400).send('No contact deleted');
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
}

module.exports = contact;
//# sourceMappingURL=routes.js.map