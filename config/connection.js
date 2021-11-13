require('dotenv').config();
const mysql = require('mysql2');

//Create the conenction pool
const connection = mysql.createPool ({
  host: 'localhost',
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

});

const testDepart = connection.query(
  'SELECT * FROM department',
  function(err, results, fields) {
    console.log(err);
    console.log(results);
  }
);

module.exports = connection;
