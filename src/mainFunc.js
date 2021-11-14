const inquirer = require('inquirer');
const getFunc = require('./getFunc');
const addFunc = require('./addFunc');

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
        'Update employee managers'
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
      // 1.Display Employee as inquirer choices 2.Display current Role 3. Select available role to add
      await addFunc.updateRole();
      mainMenu();
      break;

    case 'View All Roles':
      // Select all data from role table and display
      await getFunc.viewAll('role');
      mainMenu();
      break;

    case 'Add Role':
      // Display current roles, userinput new role (Erro check with current role data to avoid duplicate roles?)
      await addFunc.addRole();
      mainMenu();
      break;

    case 'View All Departments':
      // Select all data from department table and display
      await getFunc.viewAll('department');
      mainMenu();
      break;

    case 'Add Department':
      // Display current departments, userinput new department (Erro check with current department data to avoid duplicate roles?)
      await addFunc.addDepartment(mainMenu);
      mainMenu();
      break;

    case 'Update employee managers':
      // Display current employee list, select employee and select manager, employee's manager updated in database
      await addFunc.updateManager();
      mainMenu();
      break;
  }
};

module.exports = {mainMenu};