const inquirer = require('inquirer');
const dbConnection = require('../config/connection');

// Function to delete department.
async function deleteDepartment() {

  // Get all department name as Array
  const departmentNameArray = await getAllDepartmentName();

  // Retrieve whih department to delete from user choice
  const { departmentToDelete } = await inquirer.prompt([ 
    {
      type: 'list',
      message: 'What is the name of the department to be deleted?',
      name: 'departmentToDelete',
      choices: departmentNameArray,
    }
  ]);

  // Execute query to delete the selected department
  dbConnection
  .execute(
    `DELETE FROM department WHERE name = ?`,
    [departmentToDelete],
    (err, results, fields) => {
      console.log(err);
      console.log(`${departmentToDelete} is now deleted.`);
    }
  );
}

// Function to delete department.
async function deleteRole() {

  const roleNameArray = await getAllRolename();

  const { roleToDelete } = await inquirer.prompt([ 
    {
      type: 'list',
      message: 'Which role to be deleted?',
      name: 'roleToDelete',
      choices: roleNameArray,
    }
  ]);

  dbConnection
  .execute(
    `DELETE FROM role WHERE title = ?`,
    [roleToDelete],
    (err, results, fields) => {
      console.log(err);
      console.log(`${roleToDelete} is now deleted.`);
    }
  );
}

// Function to delete department.
async function deleteEmployee() {

  const employeeNameArray = await getAllEmployeeFullName();

  const { employeeToDelete } = await inquirer.prompt([ 
    {
      type: 'list',
      message: 'What is the name of the employee record to be deleted?',
      name: 'employeeToDelete',
      choices: employeeNameArray,
    }
  ]);

  const employeeId = await getEmployeeId(employeeToDelete);

  dbConnection
  .execute(
    `DELETE FROM employee WHERE id = ?`,
    [employeeId],
    (err, results, fields) => {
      console.log(err);
      console.log(`${employeeToDelete} is now deleted.`);
    }
  );
}

module.exports = {
  deleteDepartment,
  deleteRole,
  deleteEmployee
};