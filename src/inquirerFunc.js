const inquirer = require('inquirer');
const dbConnection = require('../config/connection');

const title = 
`

/---------------------------/
|                           | 
|     Employee Manager      |
|                           |
/---------------------------/

`;

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

  console.log(title);

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
      // console.log('Selected View All Employees');
      viewAll('employee');
      break;

    case 'Add Employee':
      // link to another inquirer prompt with employee Info input - id, FN, LN, roleID, ManagerID(can be null)
      addEmployee();
      mainMenu();
      break;

    case 'Update Employee Role':
      // 1.Display Employee as inquirer choices 2.Display current Role 3. Select available role to add
      console.log('Selected Update Employee Role');
      mainMenu();
      break;

    case 'View All Roles':
      // Select all data from role table and display
      // console.log('Selected View All Roles');
      viewAll('roles');
      break;

    case 'Add Role':
      // Display current roles, userinput new role (Erro check with current role data to avoid duplicate roles?)
      console.log('Selected Add Role');
      addRole();
      break;

    case 'View All Departments':
      // Select all data from department table and display
      // console.log('Selected View All Departments');
      viewAll('department');
      break;

    case 'Add Department':
      // Display current departments, userinput new department (Erro check with current department data to avoid duplicate roles?)
      console.log('Selected ADD Departments');
      addDepartment();
      break;
  }
}

// Function to take in 1 parameter and view all data (Employees, Roles or Departments)
viewAll = (content) => {
  dbConnection
  .promise()
  .query(`SELECT * FROM ${content}`)
  .then(([rows]) => {
    console.log(`
    
    -- Showing all ${content} -- 
    `);
    console.table(rows)
  });

  mainMenu();
}

// return the an Array of department name as promise
getDepartmentName = () => {

  return dbConnection
  .promise()
  .query(`SELECT name FROM department`)
  .then((row) => {
    const depName = row[0].map(row => row.name);
    // console.log(depName);
    return depName;
  });
}

// return the correspondence department ID as per parameter
getDepartmentId = (departmentName) => {

  let depName = departmentName;

  return dbConnection
  .promise()
  .query(`SELECT id FROM department WHERE name = ?`, [depName])
  .then((row) => {
    const departmentId = row[0][0].id;
    return departmentId;
  });
}

// Function to add a role
async function addRole() {
  
  const departmentChoices = await getDepartmentName();

  let { roleName, roleSalary, roleDepChoice } = await inquirer.prompt([ 
    {
      type: 'input',
      message: 'What is the name of the role?',
      name: 'roleName',
    },
    {
      type: 'input',
      message: 'What is the salary of the role?',
      name: 'roleSalary',
    },
    {
      type: 'list',
      message: 'Which department does the role belong to?',
      name: 'roleDepChoice',
      choices: departmentChoices,
    }
  ]);

  const departmentId = await getDepartmentId(roleDepChoice);
  roleSalary = parseFloat(roleSalary);
  console.log( roleName, roleSalary, typeof(roleSalary), roleDepChoice, departmentId, typeof(departmentId));

  // using execute helper to prepare and query the statement
  dbConnection
  .execute(
    `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, 
    [roleName, roleSalary, departmentId],
    function(err, results, fields) {
      console.log(err);
      console.log(results);
      console.log(fields);
    }
  );

  console.log(`Role: ${roleName}, salary: ${roleSalary}, department_id: ${departmentId} added to role.`)

  mainMenu();
};

// Function to add a department
async function addDepartment() {
  
  const { newDepartment } = await inquirer.prompt([ 
    {
      type: 'input',
      message: 'What is the name of the department?',
      name: 'newDepartment',
    }
  ]);

  // using execute helper to prepare and query the statement
  dbConnection
  .execute(
    'INSERT INTO department (name) VALUES ?',
    [newDepartment]
  );

  console.log(`${newDepartment} added to departments.`)

  mainMenu();
};

// Function to delete department.
// async function deleteDepartment() {

//   const { deleteDepartment } = await inquirer.prompt([ 
//     {
//       type: 'input',
//       message: 'What is the name of the department to be deleted?',
//       name: 'deleteDepartment',
//     }
//   ]);

// }

// function viewAllDepartments() {
//   dbConnection
//   .promise()
//   .query('SELECT * FROM department')
//   .then(([rows]) => {
//     console.log('\n\n -- Showing all departments -- \n');
//     console.table(rows)
//   });
// }

// async function viewAllEmployees() {
//   const [allEmployee] = await dbConnection.promisePool.query('SELECT * FROM employee');

//   console.table(allEmployee);

//   // const [allEmployee, fields] = await connection.promisePool.query('SELECT * FROM employee');
//   // console.table(allEmployee);
//   mainMenu();
// }

module.exports = {
  mainMenu,
};