function User(app) {
	const controller = app.routes.users.controller;
	const bcrypt = app.services.bcrypt;

	app.get('/api/users', async function (req, res) {
		try {
			let users = await controller.getUsers();
			res.status(200).send({ users: users });
		} catch (err) {
			res.status(400).send(err.message);
		}

	});

	app.post('/api/users', async function (req, res) {
		const name = req.body.name;
		const email = req.body.email;
		const password = req.body.password;

		let hashedPassword = await bcrypt.hash(password, 8);

		try {
			
			const result = await controller.createUser(name, email, hashedPassword);
			let created = result[1];
			if (created) {
				res.status(200).send('User created');
			} else {
				res.status(400).send('User already exists');
			}
		} catch (err) {
			res.status(400).send(err.message);
		}

	});

	app.put('/api/users/:userId', async function (req, res) {
		const name = req.body.name;
		const email = req.body.email;
		const id = req.params.userId;
		
		try {
			const result = await controller.updateUser(id, name, email);
			if (result) {
				res.status(200).send('User updated');
			} else {
				res.status(400).send('User can not be updated');
			}
		} catch(err) {
			res.status(400).send(err.message);
		}

	});

	app.delete('/api/users/:userId', async function (req,res) {
		const id = req.params.userId;
		try {
			//TODO: Find user first, after try to delete.
			const result = await controller.deleteUser(id);
			if(result) {
				res.status(200).send('User deleted');
			} else {
				res.status(400).send('No user deleted');
			}
		} catch(err) {
			res.status(400).send(err.message);
		}
	});

}

module.exports = User;

