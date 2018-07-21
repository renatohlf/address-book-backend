module.exports = app => {

    const verifyToken = app.services.AuthManager.verifyToken;
    const jwt = app.services.jwt;
    const infra = app.infra;
    const bcrypt = app.services.bcrypt;
    const secretKey = app.config.config.secretKey;

    app.get('/', function (req, res) {
        res.send("AddressBook");
        
    });

    // Register user endpoint
    app.post('/api/users', verifyToken, function (req, res) {
        // Use jwt to verify if token is valid
        jwt.verify(req.token, secretKey, (err, authData) => {
            if (err) {
                res.status(403).send(err.message);
            } else {
                var username = req.body.username;
                var password = req.body.password;

                // Validate if fields are empty, return error if assert true
                fieldsValidation(req, function (validationErrors) {
                    if (validationErrors) {
                        res.status(400).send(validationErrors);
                    } else {
                        // Use bcrypt to encript password to ensure security
                        var hashedPassword = bcrypt.hashSync(password, 8);
                        // Database connection
                        infra.dbConnection().getConnection(function (err, connection) {
                            var userDAO = new infra.UsersDAO(connection);

                            // If fields are valid, save user in database
                            userDAO.save(username, hashedPassword, function (err, result) {
                                connection.release();
                                if (err) {
                                    res.status(500).send(err.sqlMessage);
                                } else {
                                    res.json({
                                        message: "Registration Successful"
                                    });
                                }
                            });

                        });
                    }
                });

            }
        });
    });

    // Login endpoint
    app.post('/api/login', function (req, res) {
        var username = req.get('username');
        var password = req.get('password');

        // Validate if fields are empty, return error if assert true
        fieldsValidation(req, function (validationErrors) {
            if (validationErrors) {
                res.status(400).send(validationErrors);
            } else {
                // Use bcrypt to encript password to ensure security
                var hashedPassword = bcrypt.hashSync(password, 8);

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
        infra.dbConnection().getConnection(function (err, connection) {
            var usersDAO = new infra.UsersDAO(connection);

            // Execute query using username to verify if user exists.
            usersDAO.getUser(username, function (err, result) {
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
                            callback({ message: "Invalid user", status: 404 })
                        }
                    } else {
                        callback({ message: "Invalid user", status: 404 }, null)
                    }

                }
            })

        });


    }

    // Function to validate if fields are empty, return error if assert true
    function fieldsValidation(req, callback) {
        req.assert('username', 'Username is required').notEmpty();
        req.assert('password', 'Password is required').notEmpty();

        callback(req.validationErrors());

    }

};

