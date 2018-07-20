var mysql  = require('mysql');

function createConnection() {
    
    if(!process.env.NODE_ENV) {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'hckrlynx',
            database: 'addressbook_dev'
        });
    }

    if(process.env.NODE_ENV == 'test') {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'addressbook_test'
        });
    }
}

module.exports = function() {
    return createConnection;
}