import { createPool } from 'mysql';

function createConnection() {

    return createPool({
        connectionLimit : 10,
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

}


export default function () {
    return createConnection;
}