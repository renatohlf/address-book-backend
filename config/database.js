
module.exports = {
    test: {
      username: '',
      password: '',
      database: 'testproject',
      host: '',
      dialect: 'mysql'
    },
    development: {

      username: 'root',
      password: '',
      database: 'testproject',
      host: 'localhost',
      dialect: 'mysql'
    },
    production: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_HOST,
      host: '',
      dialect: 'mysql'
    }
  }
  