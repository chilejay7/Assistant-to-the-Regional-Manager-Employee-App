const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection (
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    }
);

// These functions are exported and called in the ternary operator of the index.js file based on the user's selection.  
// They display all data from a given table.
const showDeptQuery = () => {
   db.query(`SELECT * FROM department`, (err, result) => {
    console.table(result);
   });
};

const showRoleQuery = () => {
    db.query(`SELECT role.id, role.title, role.salary, department.department_name FROM role JOIN department ON role.department_id = department.id`, 
    (err, result) => console.table(result));
};

const showEmployeesQuery = () => {
    db.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, role_id, department.department_name, role.salary, employee.manager_id
        FROM employee 
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id`, 
    (err, result) => console.table(result));
};

// The argument defined in this function will use the destructured value from the main menu prompts.
const addDeptQuery = (deptName) => {
    db.query(
        `INSERT INTO department (department_name)
            VALUES ('${deptName}')`
    );
};

// The arguments defined in this function will use the destructured values from the menu prompts.
const addEmployeeQuery = (firstName, lastName, role_id, manager_id ) => {
    db.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES ('${firstName}', '${lastName}', ${role_id}, ${manager_id})`
    );
};

// The arguments defined in this function will use the destructured values from the menu prompts.
const addRoleQuery = (roleName, roleSalary, roleDept) => {
    db.query(
        `INSERT INTO role (title, salary, department_id)
            VALUES ('${roleName}', ${roleSalary}, ${roleDept})`
    );
};

// The arguments defined in this function will use the destructured values from the menu prompts.
const updateRoleQuery = (role_id, firstName, lastName) => {
    db.query(
        `UPDATE employee
            SET role_id=${role_id}
            WHERE first_name='${firstName}' AND last_name='${lastName}'`
    );
};

// The functions are all exported as an object that is destructured in the index.js file when they are required.
module.exports = { showDeptQuery, showRoleQuery, showEmployeesQuery, 
    addDeptQuery, addRoleQuery, addEmployeeQuery, updateRoleQuery };
