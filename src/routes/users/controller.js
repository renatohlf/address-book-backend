function initializer(app) {
	return new Controller(app);
}

class Controller {
	constructor(app) {
		this.User = app.connection.models.User;
	}
	async getUsers() {
		let users;
		let listUsers = [];
		let userModel;
		try {
			users = await this.User.findAll();
			for (let user of users) {
				userModel = {
					id: user.id,
					name: user.name,
					email: user.email
				}
				listUsers.push(userModel);
			}
		}
		catch (error) {
			throw error;
		}
		return listUsers;
	}
	async updateUser(id, name, email) {
		try {
			return this.User.update({
				name: name,
				email: email
			}, {
				where: {
					id: id
				}
			}).then(function (result) {
				if (result[0] > 0) {
					return true;
				}
				else {
					return false;
				}
			});
		}
		catch (err) {
			throw err;
		}
	}
	async createUser(name, email, password) {
		try {
			return this.User.findOrCreate({ where: { email: email }, defaults: { name: name, email: email, password: password } });
		}
		catch (err) {
			throw err;
		}
	}
	async deleteUser(id) {
		try {
			return this.User.destroy({
				where: {
					id: id
				}
			}).then((result) => {
				if (result > 0) {
					return true;
				}
				else {
					return false;
				}
			});
		}
		catch (err) {
			throw err;
		}
	}
}





module.exports = initializer;

