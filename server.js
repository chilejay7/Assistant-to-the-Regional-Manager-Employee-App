const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection (
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employees_db'
    }
);

db.query('SELECT * FROM employee', (err, results) => {
    console.log(results)
});