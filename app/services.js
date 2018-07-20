var jwt = require('jsonwebtoken');
var AuthManager = require('./controllers/auth-manager');
var bcrypt = require('bcryptjs');
//...Other services

module.exports = function() {
    var services = {
        jwt,
        AuthManager,
        bcrypt
    }

    return services;
}