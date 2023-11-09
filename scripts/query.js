const mysql = require('mysql2');

const db = mysql.createConnection (
    {
        host: 'localhost',
        user: 'root',
        password: 'pass',
        database: 'employees_db'
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
    db.query(`SELECT * FROM role`, (err, result) => console.table(result));
}

const showEmployees = () => {
    db.query(`SELECT * FROM employee`, (err, result) => console.table(result));
}

module.exports = { updateName, showDept, showRole, showEmployees };