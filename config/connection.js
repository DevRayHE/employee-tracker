require('dotenv').config();
// const inquirerFunc = require('../src/inquirerFunc.js');
const mysql = require('mysql2');

// Create the conenction pool
const dbConnection = mysql.createPool ({
  host: 'localhost',
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = dbConnection;
