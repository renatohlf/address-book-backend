function createUser(username, password, confirmPassword) {


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
						callback({ message: 'Invalid user', status: 404 });
					}
				} else {
					callback({ message: 'Invalid user', status: 404 }, null);
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

export { fieldsValidation, createUser };