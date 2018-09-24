function User(app) {
	const controller = app.routes.users.controller;

	app.get('/api/users', async function (req, res) {
		try {
			let users = await controller.getUsers();
			res.status(200).send({ users: users });
		} catch (err) {
			res.status(400).send(err);
		}

	});

	app.post('/api/users', function (req, res) {

	});

	app.put('/api/users', function (req, res) {

	});

}

module.exports = User;

