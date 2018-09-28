function security(app) {
	const controller = app.routes.security.controller;

	app.post('/api/login', async function (req, res) {

		let username = req.get('username');
		let password = req.get('password');
	

		const user = {
			username: username,
			password: password
		};

		try{
			const validUser = await controller.verifyUser(user);
			if(validUser != null){
				const token = await controller.login(validUser);
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