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


// Async Await version:
// async function dbConnection() {
//   // get the client
//   const mysql = require('mysql2');
//   // create the pool
//   const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//   });

//   const promisePool = pool.promise();
//   await inquirerFunc.mainMenu(promisePool);
//   //query database using promises
//   // const [rows, fields] = await promisePool.query('SELECT * FROM department');
//   // console.table(rows);
// }

// dbConnection();

module.exports = dbConnection;
