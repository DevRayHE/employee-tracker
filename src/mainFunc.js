const inquirer = require('inquirer');
const getFunc = require('./getFunc');
const addFunc = require('./addFunc');
const delFunc = require('./delFunc');

// Function to display main menu
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
        'Update Employee Managers',
        'Delete Department',
        'Delete Role',
        'Delete Employee'
      ],
    }
  ]);

  switch (selection) {

    case 'View All Employees':
      // Select all data from employee table and display
      await getFunc.viewAll('employee');
      mainMenu();
      break;

    case 'Add Employee':
      // Gather user input to add a new employee to database
      await addFunc.addEmployee();
      mainMenu();
      break;

    case 'Update Employee Role':
      // Display Employee as inquirer choices and Select available role to add
      await addFunc.updateRole();
      mainMenu();
      break;

    case 'View All Roles':
      // Select all data from role table and display
      await getFunc.viewAll('role');
      mainMenu();
      break;

    case 'Add Role':
      // Display current roles, userinput new role
      await addFunc.addRole();
      mainMenu();
      break;

    case 'View All Departments':
      // Select all data from department table and display
      await getFunc.viewAll('department');
      mainMenu();
      break;

    case 'Add Department':
      // Add userinput department into database
      await addFunc.addDepartment(mainMenu);
      mainMenu();
      break;

    case 'Update Employee Managers':
      // Display current employee list, select employee and select manager, employee's manager updated in database
      await addFunc.updateManager();
      mainMenu();
      break;

    case 'Delete Department':
      // Select the department from list and delete the record from database
      await delFunc.deleteDepartment();
      mainMenu();
      break;

    case 'Delete Role':
    // Select the role from list and delete the record from database
    await delFunc.deleteRole();
    mainMenu();
    break;

    case 'Delete Employee':
    // Select the employee from list and delete the record from database
    await delFunc.deleteEmployee();
    mainMenu();
    break;
  }
};

module.exports = {mainMenu};