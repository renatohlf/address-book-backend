

module.exports = app => {

    const verifyToken = app.services.AuthManager.verifyToken;
    const jwt = app.services.jwt;
    const infra = app.infra;
    const firebase = infra.firebase;

    //Create a new Contact
    app.post('/api/contacts', verifyToken, function (req, res) {
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if (err) {
                res.status(403).send(err.message);
            } else {
                var name = req.body.name;
                var address = req.body.address;

                fieldsValidation(req, function (validationErrors) {
                    if (validationErrors) {
                        res.status(400).send(validationErrors);
                    } else {
                        getUser(authData.user.email, (error, result) => {
                            if (error) {
                                console.log(error);
                                res.status(500).send(error);
                            } else {
                                var ref = firebase.database().ref().child('contacts');
                                var contactRef = ref.child(result.id);
                                var contact = { name: name, address: address }
                                contactRef.push(contact);

                                res.json(contact);
                            }

                        });
                    }
                });
            }
        });
    });

    function getUser(user_email, callback) {
        var connection = infra.dbConnection();
        var userDAO = new infra.UsersDAO(connection);

        userDAO.getUser(user_email, function (error, result) {
            if (error) {
                callback(err, null);
            } else {
                let dbRow;
                for (let i = 0; i < result.length; i++) {
                    dbRow = result[i];
                }
                if (dbRow != undefined) {
                    callback(null, dbRow);

                } else {
                    callback('User not found.', null);
                }
            }
        });
        connection.end();
    }

    function fieldsValidation(req, callback) {
        req.assert('name', 'Name cannot be empty').notEmpty();
        req.assert('address', 'Address cannot be empty').notEmpty();

        callback(req.validationErrors());

    }
}