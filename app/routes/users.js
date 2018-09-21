function c (app){
	console.log(app);
	const jwt = app.services.jwt;
	const infra = app.infra;
	const bcrypt = app.services.bcrypt;
    const secretKey = app.config.config.secretKey;

	// Register user endpoint
	app.post('/api/users', function (req, res) {
		let username = req.body.username;
		let password = req.body.password;
        let confirmPassword = req.body.conf_password;
    
		console.log(req);
	});


	// Login endpoint
	app.post('/api/login', function (req, res) {
		let username = req.get('username');
		let password = req.get('password');

		// Validate if fields are empty, return error if assert true
		fieldsValidation(req, function (validationErrors) {
			if (validationErrors) {
				res.status(400).send(validationErrors);
			} else {
				// Use bcrypt to encript password to ensure security
				let hashedPassword = bcrypt.hashSync(password, 8);

				const user = {
					username: username,
					password: hashedPassword
				};

				// Validate if user exists in database 
				validateUser(username, password, function (err, result) {
					if (err) {
						res.status(err.status).send(err.message);
					} else {
						if (result != undefined) {
							// Use jwt to generate token based on valid user returned from database
							jwt.sign({ user }, secretKey, { expiresIn: '1h' }, (err, token) => {
								res.json({
									token
								});
							});
						} else {
							res.status(404).send("User not found.");
						}
					}
				});
			}

		});


	});


	// Function to validate if user exists in database 
	function validateUser(username, password, callback) {
		infra.dbConnection.connection(function (err, connection) {
			let UsersDao = new infra.UsersDao(connection);

			// Execute query using username to verify if user exists.
			UsersDao.getUser(username, function (err, result) {
				connection.release();
				if (err) {
					callback(err, null);
				} else {
					let dbUser;
					for (let i = 0; i < result.length; i++) {
						dbUser = result[i];
					}
					if (dbUser != undefined) {
						// Use bcrypt function to compare if password typed in login is equals to the hashed password stored in database
						if (bcrypt.compareSync(password, dbUser.password)) {
							callback(null, dbUser);
						} else {
							callback({ message: "Invalid user", status: 404 });
						}
					} else {
						callback({ message: "Invalid user", status: 404 }, null);
					}

				}
			});

		});


	}

	// Function to validate if fields are empty, return error if assert true
	function fieldsValidation(req, callback) {
		req.assert('username', 'Username is required').notEmpty();
		req.assert('password', 'Password is required').notEmpty();

		callback(req.validationErrors());

	}

};

export default c;