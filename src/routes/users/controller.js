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

Controller.prototype.updateUser = async function (id, name, email) {
	try {
		return await this.User.update(
			{
				name: name,
				email: email
			},
			{ 
				where: { 
					id: id 
				}
			}).then(function(result){
			if(result[0] > 0){
				return true;
			}else{
				return false;
			}
		});
	} catch (err) {
		throw err;
	}

};

Controller.prototype.createUser = async function (name, email, password) {
	try {
		return await this.User.findOrCreate({ where: { email: email }, defaults: { name: name, email: email, password: password } });
	} catch (err) {
		throw err;
	}
}

Controller.prototype.deleteUser = async function (id) {
	try {
		return await this.User.destroy({ 
			where: { 
				id: id
			}
		}).then((result) => {
			if (result > 0) {
				return true;
			} else {
				return false;
			}
		});
	} catch (err) {
		throw err;
	}
};

module.exports = initializer;

