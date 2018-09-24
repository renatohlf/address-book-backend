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
			type: DataType.BOOLEAN,
			allowNull: false
		},
		password: {
			type: DataType.BOOLEAN,
			allowNull: false
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