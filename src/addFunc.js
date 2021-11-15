const inquirer = require('inquirer');
const dbConnection = require('../config/connection');

// Function to add a department
async function addDepartment() {
  
  const { newDepartment } = await inquirer.prompt([ 
    {
      type: 'input',
      message: 'What is the name of the department?',
      name: 'newDepartment',
      validate: (input) => {
        if (!input) {
          console.log("\nPlease enter department name!");
          return false;
        }
        return true;
      },
    }
  ]);

  // using execute helper to prepare and query the statement
  dbConnection
  .execute(
    'INSERT INTO department (name) VALUES (?)',
    [newDepartment],
    (err, results, fields) => {
      console.log(err);
      console.log(`${newDepartment} added to departments.`)
    }
  );

};

// Function to add a role
async function addRole() {
  
  const departmentNameArray = await getAllDepartmentName();

  const { roleName, roleSalary, roleDepChoice } = await inquirer.prompt([ 
    {
      type: 'input',
      message: 'What is the name of the role?',
      name: 'roleName',
      validate: (input) => {
        if (!input) {
          console.log("\nPlease enter role name!");
          return false;
        }
        return true;
      },
    },
    {
      type: 'input',
      message: 'What is the salary of the role?',
      name: 'roleSalary',
      validate: (input) => {
        if (!input || isNaN(input)) {
          console.log("\nPlease input valid role salary!");
          return false;
        }
        return true;
      },
    },
    {
      type: 'list',
      message: 'Which department does the role belong to?',
      name: 'roleDepChoice',
      choices: departmentNameArray,
    }
  ]);

  const departmentId = await getDepartmentId(roleDepChoice);

  // using execute helper to prepare and query the statement
  dbConnection
  .execute(
    `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, 
    [roleName, roleSalary, departmentId],
    (err, results, fields) => {
      console.log(err);
      console.log(`Role: ${roleName}, salary: ${roleSalary}, department_id: ${departmentId} added to role.`)
    }
  );

};

// Function to add an employee
async function addEmployee() {

  const roleNameArray = await getAllRolename();
  const managerFullNameArray = await getAllManagerFullName();
  const managerChoices = ['None'].concat(managerFullNameArray);


  const { firstName, lastName, roleChoice, managerChoice } = await inquirer.prompt([ 
    {
      type: 'input',
      message: 'What is the employee\'s first name?',
      name: 'firstName',
      validate: (input) => {
        if (!input) {
          console.log("\nPlease enter first name!");
          return false;
        }
        return true;
      },
    },
    {
      type: 'input',
      message: 'What is the employee\'s last name?',
      name: 'lastName',
      validate: (input) => {
        if (!input) {
          console.log("\nPlease enter last name!");
          return false;
        }
        return true;
      },
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
      choices: managerChoices,
    },
  ]);

  const roleId = await getRoleId(roleChoice);
  const managerId = await getEmployeeId(managerChoice);

  // using execute helper to prepare and query the statement
  dbConnection
  .execute(
    `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, 
    [firstName, lastName, roleId, managerId],
    function(err, results, fields) {
      console.log(err);
      console.log(`Employee: ${firstName} ${lastName}, role_id: ${roleId}, manager_id: ${managerId} added to role.`)
    }
  );

}

// Function to update an employee's new role
async function updateRole() {

  const employeeNameArray = await getAllEmployeeFullName();
  const roleNameArray = await getAllRolename();

  const { employee, roleChoice } = await inquirer.prompt([
    {
      type: 'list',
      message: 'Which employee\'s role do you want to update?',
      name: 'employee',
      choices: employeeNameArray,
    },
    {
      type: 'list',
      message: 'Which role do you want to assign the selected employee?',
      name: 'roleChoice',
      choices: roleNameArray,
    },
  ]);

  const employeeId = await getEmployeeId(employee);
  const roleId = await getRoleId(roleChoice);

  dbConnection
  .execute(
    `UPDATE employee SET role_id = ? WHERE id = ?`,
    [roleId, employeeId],
    (err, results, fields) => {
      console.log(err);
      console.log(`${employee}'s role updated.`);
    }
  );

}

// Function to update employee managers
async function updateManager() {
  const employeeNameArray = await getAllEmployeeFullName();
  const managerFullNameArray = await getAllManagerFullName();
  const managerChoices = ['None'].concat(managerFullNameArray);

  const { employee, manager } = await inquirer.prompt([
    {
      type: 'list',
      message: 'Which employee\'s manager do you want to update?',
      name: 'employee',
      choices: employeeNameArray,
    },
    {
      type: 'list',
      message: 'Who is now the selected employee\'s manager?',
      name: 'manager',
      choices: managerChoices,
    },
  ]);

  const employeeId = await getEmployeeId(employee);
  const managerId = await getEmployeeId(manager);

  dbConnection
  .execute(
    `UPDATE employee SET manager_id = ? WHERE id = ?`,
    [managerId, employeeId],
    (err, results, fields) => {
      console.log(err);
      console.log(`${employee}'s manager is now updated.`);
    }
  );

}


module.exports = {
  addDepartment,
  addRole,
  addEmployee,
  updateRole,
  updateManager,
};