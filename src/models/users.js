export default (sequelize, DataType) => {
	const User = sequelize.define('User', {
		id: {
			type: DataType.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataType.STRING(250),
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		email: {
			type: DataType.STRING(100),
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		password: {
			type: DataType.STRING(4000),
			allowNull: false,
			validate: {
				notEmpty: true
			}
		}
	}, {
		name: {
			plural: 'users',
			singular: 'user'
		},
		timestamps: false,
		updatedAt: false,
		tableName: 'user'
	});

	return User;
};