'use strict';

var _fs = require('fs');

var _path = require('path');

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var conn = null;

function connection(app) {
	var env = process.env.NODE_ENV;
	var config = env ? app.config.database[env] : app.config.database['development'];

	var sequelize = new _sequelize2.default(config.database, config.username, config.password, _defineProperty({
		host: config.host,
		dialect: config.dialect,
		logging: config.logging,
		storage: config.storage,
		define: config.define,
		operatorsAliases: false
	}, 'logging', false));
	conn = {
		sequelize: sequelize,
		Sequelize: _sequelize2.default,
		models: {}
	};
	var dir = (0, _path.join)(__dirname, 'models/');
	(0, _fs.readdirSync)(dir).forEach(function (file) {
		var modelDir = (0, _path.join)(dir, file);
		var model = sequelize.import(modelDir);
		conn.models[model.name] = model;
	});
	Object.keys(conn.models).forEach(function (key) {
		if (conn.models[key].hasOwnProperty('associate')) {
			conn.models[key].associate(conn.models);
		}
	});

	return conn;
}

module.exports = connection;
//# sourceMappingURL=connection.js.map