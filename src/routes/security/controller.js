function initializer(app) {
	return new Controller(app);
}

function Controller(app) {
	this.jwt = app.services.jwt;
	this.secretKey = app.config.config.secretKey;
	this.User = app.connection.models.User;
}

Controller.prototype.login = async function (user) {

	// Use jwt to generate token based on valid user returned from database
	const token =  await this.jwt.sign({ user }, this.secretKey, { expiresIn: '1h' });

	return token;

};

Controller.prototype.getUser = async function (user) {
	return this.User.findOne({ where: { email: user.username } }).then(user => {
		if (user != null) {
			return true;
		} else {
			return false;
		}
	});
};

module.exports = initializer;