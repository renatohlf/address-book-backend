function UsersDAO(connection) {
    this._connection = connection;
}

UsersDAO.prototype.list = function(callback) {
    this._connection.query('select * from user', callback);
}

UsersDAO.prototype.getUser = function(email,callback) {
    this._connection.query('select * from user where email = ? limit 1',  email, callback);
}

UsersDAO.prototype.save = function(email, password, callback) {
    this._connection.query('insert into user (email, password) values (?,?)', [ email, password ], callback);
}

module.exports = function() {
    return UsersDAO;
};
