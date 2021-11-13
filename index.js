// const dedent = require('dedent');
// const inquirer = require('inquirer');
// const connection = require('./config/connection');
const inquirerFunc = require('./src/inquirerFunc');

function init() {
  // Connect to database
  // connection;
  // Initialize user interface main menu
  inquirerFunc.mainMenu();
};

init();