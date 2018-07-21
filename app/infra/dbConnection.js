var mysql  = require('mysql');

function createConnection() {
    
    if(!process.env.NODE_ENV) {
        return mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
    }

    if(process.env.NODE_ENV == 'test') {
        return mysql.createConnection({
            host: '',
            user: '',
            password: '',
            database: 'addressbook_test'
        });
    }
}

module.exports = function() {
    return createConnection;
}