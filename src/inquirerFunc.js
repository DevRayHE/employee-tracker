const inquirer = require('inquirer');
const dbConnection = require('../config/connection');

// original promise version
// const mainMenu = () => {
  
//   inquirer
//   .prompt([
//     {
//       type: 'list',
//       message: 'What would you like to do?\n',
//       name: 'selection',
//       choices: 
//       [
//         'View All Employees', 
//         'Add Employee', 
//         'Update Employee Role',
//         'View All Roles',
//         'Add Role',
//         'View All Departments',
//         'Add Department',
//       ],
//     }
//   ])
//   .then((data) => {
//     const { selection } = data;
    
//     switch (selection) {

//       case 'View All Employees':
//         // Select all data from employee table and display
//         console.log('Selected View All Employees');
//         mainMenu();
//         break;

//       case 'Add Employee':
//         // link to another inquirer prompt with employee Info input - id, FN, LN, roleID, ManagerID(can be null)
//         console.log('Selected Add Employee');
//         mainMenu();
//         break;

//       case 'Update Employee Role':
//         // 1.Display Employee as inquirer choices 2.Display current Role 3. Select available role to add
//         console.log('Selected Update Employee Role');
//         mainMenu();
//         break;

//       case 'View All Roles':
//         // Select all data from role table and display
//         console.log('Selected View All Roles');
//         mainMenu();
//         break;

//       case 'Add Role':
//         // Display current roles, userinput new role (Erro check with current role data to avoid duplicate roles?)
//         console.log('Selected Add Role');
//         mainMenu();
//         break;

//       case 'View All Departments':
//         // Select all data from department table and display
//         console.log('Selected View All Departments');
//         mainMenu();
//         break;

//       case 'Add Department':
//         // Display current departments, userinput new department (Erro check with current department data to avoid duplicate roles?)
//         console.log('Selected Add Department');
//         mainMenu();
//         break;
//     }
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// };

// async-await function version -
async function mainMenu()  {

  const {selection} = await inquirer.prompt([
    {
      type: 'list',
      message: 'What would you like to do?\n',
      name: 'selection',
      choices: 
      [
        'View All Employees', 
        'Add Employee', 
        'Update Employee Role',
        'View All Roles',
        'Add Role',
        'View All Departments',
        'Add Department',
      ],
    }
  ]);

  switch (selection) {

    case 'View All Employees':
      // Select all data from employee table and display
      console.log('Selected View All Employees');
      viewAllEmployees();
      mainMenu();
      break;

    case 'Add Employee':
      // link to another inquirer prompt with employee Info input - id, FN, LN, roleID, ManagerID(can be null)
      console.log('Selected Add Employee');
      mainMenu();
      break;

    case 'Update Employee Role':
      // 1.Display Employee as inquirer choices 2.Display current Role 3. Select available role to add
      console.log('Selected Update Employee Role');
      mainMenu();
      break;

    case 'View All Roles':
      // Select all data from role table and display
      console.log('Selected View All Roles');
      viewAllRoles();
      mainMenu();
      break;

    case 'Add Role':
      // Display current roles, userinput new role (Erro check with current role data to avoid duplicate roles?)
      console.log('Selected Add Role');
      mainMenu();
      break;

    case 'View All Departments':
      // Select all data from department table and display
      console.log('Selected View All Departments');
      viewAllDepartments();
      mainMenu();
      break;

    case 'Add Department':
      // Display current departments, userinput new department (Erro check with current department data to avoid duplicate roles?)
      console.log('Selected Add Department');
      mainMenu();
      break;
  }
}

function viewAllEmployees() {
  dbConnection
  .promise()
  .query('SELECT * FROM employee')
  .then(([rows]) => console.table(rows));
}

// async function viewAllEmployees() {
//   const [allEmployee] = await dbConnection.promisePool.query('SELECT * FROM employee');

//   console.table(allEmployee);

//   // const [allEmployee, fields] = await connection.promisePool.query('SELECT * FROM employee');
//   // console.table(allEmployee);
//   mainMenu();
// }

function viewAllRoles() {
  dbConnection
  .promise()
  .query('SELECT * FROM role')
  .then(([rows]) => console.table(rows));
}

function viewAllDepartments() {
  dbConnection
  .promise()
  .query('SELECT * FROM department')
  .then(([rows]) => {
    console.log('\n\n -- Showing all departments -- \n');
    console.table(rows)
  });
}



module.exports = {
  mainMenu,
};