function initializer(app) {
	return new Controller(app);
}

class Controller {
	constructor(app) {
		this.jwt = app.services.jwt;
		this.secretKey = app.config.config.secretKey;
		this.User = app.connection.models.User;
		this.bcrypt = app.services.bcrypt;
	}
	async login(user) {
		// Use jwt to generate token based on valid user returned from database
		const token = await this.jwt.sign({ user }, this.secretKey, { expiresIn: '1h' });
		return token;
	}
	async verifyUser(user) {

		try {
			return this.User.findOne({ where: { email: user.username } }).then(async _user => {

				if (_user != null) {
					const match = await this.bcrypt.compare(user.password, _user.password);
					const payload = {
						name: _user.name,
						username: _user.email
					}

					if (match) {
						return payload;
					} else {
						return null;
					}
				}
				else {
					return null;
				}
			});
		} catch (err) {
			throw err;
		}
	}
}



module.exports = initializer;