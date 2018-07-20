module.exports = app => {

    const verifyToken = app.services.AuthManager.verifyToken;
    const jwt = app.services.jwt;
    const infra = app.infra;
    const bcrypt = app.services.bcrypt;

    app.post('/api/users', verifyToken, function (req, res) {

        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if (err) {
                res.status(403).send(err.message);
            } else {
                var username = req.body.username;
                var password = req.body.password;

                fieldsValidation(req, function (validationErrors) {
                    if (validationErrors) {
                        res.status(400).send(validationErrors);
                    } else {

                        var hashedPassword = bcrypt.hashSync(password, 8);
                        var connection = infra.dbConnection();
                        var userDAO = new infra.UsersDAO(connection);


                        userDAO.save(username, hashedPassword, function (err, result) {
                            if (err) {
                                res.status(500).send(err.sqlMessage);
                            } else {
                                res.json({
                                   message: "Success registration"
                                });
                            }
                        });

                        connection.end();
                    }
                });

            }
        });
    });


    //List users - Not necessary
    app.get('/api/users', verifyToken, function (req, res) {
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if (err) {
                res.status(403).send(err.message);
            } else {
                var connection = infra.dbConnection();
                var usersDAO = new infra.UsersDAO(connection);

                usersDAO.list(function (err, result) {
                    if (err) {
                        res.status(500).send("There was a problem listing users.");
                    } else {
                        res.json({
                            result: result
                        });
                    }
                });

                connection.end();

            }
        })
    });


    app.post('/api/login', function (req, res) {
        var username = req.get('username');
        var password = req.get('password');

        fieldsValidation(req, function (validationErrors) {
            if (validationErrors) {
                res.status(400).send(validationErrors);
            } else {
                var hashedPassword = bcrypt.hashSync(password, 8);

                const user = {
                    email: username,
                    password: hashedPassword
                };

                authUser(username, password, function (err, result) {
                    if (err) {
                        res.status(err.status).send(err.message);
                    } else {
                        if (result != undefined) {
                            jwt.sign({ user }, 'secretkey', { expiresIn: '1h' }, (err, token) => {
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

    function authUser(username, password, callback) {
        var connection = infra.dbConnection();
        var usersDAO = new infra.UsersDAO(connection);

        usersDAO.getUser(username, function (err, result) {
            if (err) {
                callback(err, null);
            } else {
                let dbRow;
                for (let i = 0; i < result.length; i++) {
                    dbRow = result[i];
                }
                if (dbRow != undefined) {
                    if (bcrypt.compareSync(password, dbRow.password)) {
                        callback(null, dbRow);
                    } else {
                        callback({ message: "Invalid user", status: 404 })
                    }
                } else {
                    callback({ message: "Invalid user", status: 404 }, null)
                }

            }
        })

    }

    function fieldsValidation(req, callback) {
        req.assert('username', 'Username is required').notEmpty();
        req.assert('password', 'Password is required').notEmpty();

        callback(req.validationErrors());

    }

};

