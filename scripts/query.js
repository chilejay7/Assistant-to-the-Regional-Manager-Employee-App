const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection (
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    }
);

let testArray = [];

const updateName = (name) => {
    db.promise().query(`SELECT * FROM employee WHERE first_name='${name}'`)
    .then(([rows, fields]) => {
        console.log(rows);
        return rows;
    })
    .then((rows) => {
        rows.forEach((r) => {
            const { id, first_name, last_name, role_id, manager_id } = r;
            testArray.push(`${last_name}, ${first_name}`);
        })
        console.log(testArray);
    });
};

// These functions are exported and called in the ternary operator of the index.js file based on the user's selection.  They display all data from a given table.
const showDept = () => {
   db.query(`SELECT * FROM department`, (err, result) => console.table(result));
};

const showRole = () => {
    db.query(`SELECT role.id, role.title, role.salary, department.name FROM role JOIN department ON role.department_id = department.id`, 
    (err, result) => console.table(result));
}

const showEmployees = () => {
    db.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title, role_id, role.salary, department.name, employee.manager_id
    FROM employee 
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id`, (err, result) => console.table(result));
}

module.exports = { updateName, showDept, showRole, showEmployees };