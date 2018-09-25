function security(app) {
	const bcrypt = app.services.bcrypt;
	const controller = app.routes.security.controller;

	app.post('/api/login', async function (req, res) {

		let username = req.get('username');
		let password = req.get('password');

		let hashedPassword = await bcrypt.hash(password, 8);

		const user = {
			username: username,
			password: hashedPassword
		};

		try{
			const userExists = await controller.getUser(user);
			if(userExists){
				const token = await controller.login(user);
				res.status(200).send({token});
			} else {
				res.status(400).send('Invalid user');
			}
		} catch (err) {
			res.status(400).send(err.message);
		}

	});
}

module.exports = security;