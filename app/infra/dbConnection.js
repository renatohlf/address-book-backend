var mysql = require('mysql');

function createConnection() {

    return mysql.createPool({
        connectionLimit : 10,
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

}


module.exports = function () {
    return createConnection;
}