
const dbConnection = require('../config/connection');

// Function to take in 1 parameter and view all data (Employees, Roles or Departments)
viewAll = (content) => {
  dbConnection
  .promise()
  .query(`SELECT * FROM ${content}`)
  .then(([rows]) => {
    // const transformed = rows.reduce((acc, {id, ...x}) => { acc[id] = x; return acc}, {})
    console.log(`
    
    -- Showing all ${content} -- 
    `);
    console.table(rows)
  });

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
getEmployeeId = (employeeFullName) => {

  if (employeeFullName === 'None') {
    return null;
  }

  const employeeName = employeeFullName.split(' ');
  const firstName = employeeName[0];
  const lastName = employeeName[1];

  return dbConnection
  .promise()
  .query('SELECT * FROM employee WHERE first_name = ? AND last_name = ?',
  [firstName, lastName],
  (err,results, fields) => {
    console.log(err);
  })
  .then((row) => {
    const employeeId = row[0][0].id;
    return employeeId;
  })
  .catch((err) => {
    console.log(err);
  });
};

// get all the employee's full name and return as Array
getAllEmployeeFullName = () => {
  return dbConnection
  .promise()
  .query(`SELECT * FROM employee`)
  .then((rows) => {
    const EmployeeFullName = rows[0].map(row => (row.first_name + ' ' + row.last_name));
    return (EmployeeFullName);
  })
  .catch((err) => {
    console.log(err);
  });
};

module.exports = {
  viewAll,
  getAllDepartmentName,
  getDepartmentId,
  getAllRolename,
  getRoleId,
  getAllManagerFullName,
  getEmployeeId,
  getAllEmployeeFullName
};