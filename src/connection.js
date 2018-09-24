import { readdirSync } from 'fs';
import { join } from 'path';
import Sequelize from 'sequelize';

let conn = null;

function connection(app) {
	const env = process.env.NODE_ENV;
	const config = env ? app.config.database[env] : app.config.database['development'];


	var sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		{
			host: config.host,
			dialect: config.dialect,
			logging: config.logging,
			storage: config.storage,
			define: config.define,
			operatorsAliases: false,
			logging: false
		}
	);
	conn = {
		sequelize,
		Sequelize,
		models: {}
	};
	var dir = join(__dirname, 'models/');
	readdirSync(dir).forEach(file => {
		var modelDir = join(dir, file);
		var model = sequelize.import(modelDir);
		conn.models[model.name] = model;
	});
	Object.keys(conn.models).forEach(key => {
		if (conn.models[key].hasOwnProperty('associate')) {
			conn.models[key].associate(conn.models);
		}
	});

	return conn;
}

module.exports = connection;