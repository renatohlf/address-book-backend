/**
 * This file is not being used for this sprint.
 * Will be used soon, after databases has been built.
 */
export const test = {
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	dialect: 'mysql',
	storage: 'gertec-one.sqlite',
	logging: false,
	define: {
		underscored: true
	},
	dialectOptions: {
		multipleStatements: true
	},
	migrationStorageTableName: 'sequelize_meta',
	seederStorageTableName: 'sequelize_data',
	seederStorage: 'sequelize'
};
export const development = {
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	dialect: 'mysql',
	storage: 'gertec-one.sqlite',
	logging: false,
	define: {
		underscored: true
	},
	dialectOptions: {
		multipleStatements: true
	},
	migrationStorageTableName: 'sequelize_meta',
	seederStorageTableName: 'sequelize_data',
	seederStorage: 'sequelize'
};
export const production = {
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	dialect: 'mysql',
	logging: false,
	define: { 
		underscored: true
	},
	dialectOptions: {
		multipleStatements: true
	},
	migrationStorageTableName: 'sequelize_meta',
	seederStorageTableName: 'sequelize_data',
	seederStorage: 'sequelize'
};
  