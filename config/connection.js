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

// // Async Await version:
// async function connection() {
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
//   //query database using promises
//   const [rows, fields] = await promisePool.query('SELECT * FROM department');
// }

module.exports = connection;
