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
	this.jwt.sign({ user }, this.secretKey, { expiresIn: '1h' }, (err, token) => {
		console.log(token);
	});
};

module.exports = initializer;