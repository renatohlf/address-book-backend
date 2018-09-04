function UsersDao(connection) {
    this._connection = connection;
}

//Get existing user from database
UsersDao.prototype.getUser = function(email,callback) {
    this._connection.query('select * from user where email = ? limit 1',  email, callback);
};

//Saving user in database
UsersDao.prototype.save = function(email, password, callback) {
    this._connection.query('insert into user (email, password) values (?,?)', [ email, password ], callback);
};

export default function() {
    return UsersDao;
}
