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
      break;

    case 'Update Employee Role':
      // 1.Display Employee as inquirer choices 2.Display current Role 3. Select available role to add
      console.log('Selected Update Employee Role');
      mainMenu();
      break;

    case 'View All Roles':
      // Select all data from role table and display
      // console.log('Selected View All Roles');
      viewAll('role');
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
};

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
};

// return the an Array of department name as promise
getAllDepartmentName = () => {

  return dbConnection
  .promise()
  .query(`SELECT name FROM department`)
  .then((row) => {
    const depName = row[0].map(row => row.name);
    // console.log(depName);
    return depName;
  });
};

// take departmentName as parameter and return the correspondence department ID
getDepartmentId = (departmentName) => {

  return dbConnection
  .promise()
  .query(`SELECT id FROM department WHERE name = ?`, 
  [departmentName],
  (err, results, fields) => {
    console.log(err);
    console.log(results);
  })
  .then((row) => {
    const departmentId = row[0][0].id;
    return departmentId;
  });
};

// get all the role name and return as Array
getAllRolename = () => {

  return dbConnection
  .promise()
  .query(`SELECT title FROM role`)
  .then((rows) => {
    const roleName = rows[0].map(row => row.title);
    // console.log(depName);
    return roleName;
  })
  .catch((err) => {
    console.log(err);
  });
};

// take role name as parameter and return the correspondence role ID
getRoleId = (roleName) => {

  return dbConnection
  .promise()
  .query(`SELECT id FROM role WHERE title = (?)`, [roleName])
  .then((row) => {
    const roleId = row[0][0].id;
    return roleId;
  })
  .catch((err) => {
    console.log(err);
  });
}

// get all the manager's full name and return as Array
getAllManagerFullName = () => {
  return dbConnection
  .promise()
  .query(`SELECT * FROM employee WHERE manager_id is null`)
  .then((rows) => {
    const managerFullName = rows[0].map(row => (row.first_name + ' ' + row.last_name));
    console.log(managerFullName);
    return (managerFullName);
  })
  .catch((err) => {
    console.log(err);
  });
};

// take manager name as parameter and return the correspondence manager ID
getManagerId = (managerFullName) => {

  const managerName = managerFullName.split(' ');
  const managerFirstName = managerName[0];
  const managerLastName = managerName[1];

  return dbConnection
  .promise()
  .query('SELECT * FROM employee WHERE first_name = ? AND last_name = ?',
  [managerFirstName, managerLastName],
  (err,results, fields) => {
    console.log(err);
    console.log(results);
  })
  .then((row) => {
    console.log(row);
    const managerId = row[0][0].id;
    return managerId;
  })
  .catch((err) => {
    console.log(err);
  });
};

// Function to add an employee
async function addEmployee() {

  const roleNameArray = await getAllRolename();
  const managerFullNameArray = await getAllManagerFullName();

  console.log(roleNameArray);
  console.log(managerFullNameArray);

  let { firstName, lastName, roleChoice, managerChoice } = await inquirer.prompt([ 
    {
      type: 'input',
      message: 'What is the employee\'s first name?',
      name: 'firstName',
    },
    {
      type: 'input',
      message: 'What is the employee\'s last name?',
      name: 'lastName',
    },
    {
      type: 'list',
      message: 'What\'s the employee\'s role?',
      name: 'roleChoice',
      choices: roleNameArray,
    },
    {
      type: 'list',
      message: 'Who\'s the employee\'s manager?',
      name: 'managerChoice',
      choices: managerFullNameArray,
    },
  ]);

  const roleId = await getRoleId(roleChoice);
  const managerId = await getManagerId(managerChoice);

  // using execute helper to prepare and query the statement
  dbConnection
  .execute(
    `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, 
    [firstName, lastName, roleId, managerId],
    function(err, results, fields) {
      console.log(err);
      console.log(results);
    }
  );

  console.log(`Employee: ${firstName} ${lastName}, role_id: ${roleId}, manager_id: ${managerId} added to role.`)

  mainMenu();
}

// Function to add a role
async function addRole() {
  
  const departmentNameArray = await getAllDepartmentName();

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
      choices: departmentNameArray,
    }
  ]);

  const departmentId = await getDepartmentId(roleDepChoice);
  // roleSalary = parseFloat(roleSalary);
  // console.log( roleName, roleSalary, typeof(roleSalary), roleDepChoice, departmentId, typeof(departmentId));

  // using execute helper to prepare and query the statement
  dbConnection
  .execute(
    `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, 
    [roleName, roleSalary, departmentId],
    (err, results, fields) => {
      console.log(err);
      console.log(results);
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
    'INSERT INTO department (name) VALUES (?)',
    [newDepartment],
    (err, results, fields) => {
      console.log(err);
      console.log(results);
    }
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


module.exports = {
  mainMenu,
};