function createUser(username, password, confirmPassword){


	// Validate if fields are empty, return error if assert true
	fieldsValidation(req, function (validationErrors) {
		if (validationErrors) {
			res.status(400).send(validationErrors);
		} else {
			if (password === confirmPassword) {
				// Use bcrypt to encript password to ensure security
				let hashedPassword = bcrypt.hashSync(password, 8);
				// Database connection
				infra.dbConnection.connection(function (err, connection) {
					let userDAO = new infra.UsersDao(connection);

					// If fields are valid, save user in database
					userDAO.save(username, hashedPassword, function (err, result) {
						connection.release();
						if (err) {
							res.status(500).send(err.sqlMessage);
						} else {
							res.json({
								message: 'Registration Successful'
							});
						}
					});

				});
			}
		}
	});
}