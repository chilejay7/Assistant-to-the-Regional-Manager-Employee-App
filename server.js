const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection (
    {
        host: 'localhost',
        user: 'root',
        password: 'pass',
        database: 'employees_db'
    }
);

db.promise().query('SELECT * FROM employee')
.then(([rows, fields]) => {
    console.log(rows);
    return rows;
})
.then((rows) => {
    rows.forEach((r) => {
        const { id, first_name, last_name, role_id, manager_id } = r;
        console.log(first_name);
    })
    console.log(rows[3]);
});