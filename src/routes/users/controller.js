function initializer(app) {
	return new Controller(app);
}

function Controller(app) {
	this.User = app.connection.models.User;
}

Controller.prototype.getUsers = async function () {
	let users = [];
	let listUsers = [];

	try {
		users = await this.User.findAll();

		for (let user of users) {
			listUsers.push(user);
		}

	} catch (error) {
		throw error;
	}
	return listUsers;
}

Controller.prototype.updateUser = async function () {

}

Controller.prototype.createUser = async function () {

}

module.exports = initializer;

