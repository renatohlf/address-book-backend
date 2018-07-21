var jwt = require('jsonwebtoken');
var AuthManager = require('./controllers/auth-manager');
var bcrypt = require('bcryptjs');


module.exports = function() {
    //Load services
    var services = {
        jwt,
        AuthManager,
        bcrypt
    }

    return services;
}