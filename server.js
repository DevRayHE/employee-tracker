
// const connection = require('./config/connection');
const mainFunc = require('./src/mainFunc');

function init() {

  const title = 
`

/---------------------------/
|                           | 
|     Employee Manager      |
|                           |
/---------------------------/

`;

  console.log(title);
  // Initialize user interface main menu
  mainFunc.mainMenu();
};

init();

