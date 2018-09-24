'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (sequelize, DataType) {
	var Contact = sequelize.define('Contact', {
		id: {
			type: DataType.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true
		},
		first_name: {
			type: DataType.STRING(250),
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		last_name: {
			type: DataType.STRING(250),
			allowNull: true
		},
		email: {
			type: DataType.STRING(100),
			allowNull: true
		},
		phone: {
			type: DataType.STRING(15),
			allowNull: true,
			validate: {
				notEmpty: true
			}
		}
	}, {
		name: {
			plural: 'contacts',
			singular: 'contact'
		},
		timestamps: false,
		updatedAt: false,
		tableName: 'contact'
	});

	return Contact;
};
//# sourceMappingURL=contacts.js.map