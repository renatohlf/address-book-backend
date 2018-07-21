function UsersDAO(connection) {
    this._connection = connection;
}

//List users from database
UsersDAO.prototype.list = function(callback) {
    this._connection.query('select * from user', callback);
}


//Get existing user from database
UsersDAO.prototype.getUser = function(email,callback) {
    this._connection.query('select * from user where email = ? limit 1',  email, callback);
}

//Saving user in database
UsersDAO.prototype.save = function(email, password, callback) {
    this._connection.query('insert into user (email, password) values (?,?)', [ email, password ], callback);
}

module.exports = function() {
    return UsersDAO;
};
