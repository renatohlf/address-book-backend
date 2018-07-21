

module.exports = app => {

    const verifyToken = app.services.AuthManager.verifyToken;
    const jwt = app.services.jwt;
    const infra = app.infra;
    const firebase = infra.firebase;
    const secretKey = app.config.config.secretKey;

    // Endpoint to create a new contact for the user logged in
    app.post('/api/contacts', verifyToken, function (req, res) {
        // Use jwt to verify if token is valid
        jwt.verify(req.token, secretKey, (err, authData) => {
            if (err) {
                res.status(403).send(err.message);
            } else {
                var name = req.body.name;
                var address = req.body.address;

                // Validate if fields are empty, return error if assert true
                fieldsValidation(req, function (validationErrors) {
                    if (validationErrors) {
                        res.status(400).send(validationErrors);
                    } else {
                        // Get existing user in database.
                        getUser(authData.user.username, (error, user) => {
                            if (error) {
                                res.status(500).send(error);
                            } else {
                                // Root node named contacts to store contacts data
                                var ref = firebase.database().ref().child('contacts');
                                // Create a node to the logged in user id
                                var contactRef = ref.child(user.id);
                                // Contact to be stored
                                var contact = { name: name, address: address }
                                // Create a contact object to the current user node.
                                contactRef.push(contact);

                                res.json({
                                    message: "Registration Successful"
                                });
                            }

                        });

                    }
                });
            }
        });
    });

    //Function to get existing user in database.
    function getUser(username, callback) {
        var connection = infra.dbConnection();
        var userDAO = new infra.UsersDAO(connection);

        // Execute query using username to verify if user exists.
        userDAO.getUser(username, function (error, result) {
            if (error) {
                callback(error, null);
            } else {
                let dbUser;
                for (let i = 0; i < result.length; i++) {
                    dbUser = result[i];
                }

                if (dbUser != undefined) {
                    // Return user if exists
                    callback(null, dbUser);

                } else {
                    // Return error if user doesn't exists
                    callback('User not found.', null);
                }
            }
        });
        connection.release();
    }

    // Function to validate if fields are empty, return error if assert true
    function fieldsValidation(req, callback) {
        req.assert('name', 'Name cannot be empty').notEmpty();
        req.assert('address', 'Address cannot be empty').notEmpty();

        callback(req.validationErrors());

    }
}