const inquirer = require('inquirer');
const dotenv = require('dotenv');
const fs = require('fs');
const { showDeptQuery, showRoleQuery, showEmployeesQuery, addDeptQuery, 
    addRoleQuery, addEmployeeQuery, updateRoleQuery } = require('./scripts/query');

const mysql = require('mysql2');
dotenv.config();

const db = mysql.createConnection (
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    }
);

// This array is used to present the main menu options through inquirer on start.
const menuOptions = [
'View all departments', 
'View all roles', 
'View all employees', 
'Add a department', 
'Add a role', 
'Add an employee', 
'Update an employee role',
];

// The main menu prompts are presented to user's through this menu.
const questions = [
    {
        type: 'list',
        message: 'Please select the operation you would like to complete',
        name: 'menuSelection',
        choices: menuOptions,
    },
];

const deptQuestions = [
    {
        type: 'input',
        message: "What is the name of the department you would like to add?",
        name: 'newDeptName',
    }
];

const roleQuestions = [
    {
        type: 'input',
        message: "What is the name of the role you would like to add?",
        name: 'newRoleName',
    },
    {
        type: 'input',
        message: "What is the salary for this role?",
        name: 'newRoleSalary',
    },
    {
        type: 'input',
        message: "Which department does this role belong to?",
        name: 'newRoleDept',
    },
];

const newEmployeeQuestions = [
    {
        type: 'input',
        message: "What is the first name of the employee?",
        name: 'firstName',
    },
    {
        type: 'input',
        message: "What is the last name of the employee?",
        name: 'lastName',
    },
    {
        type: 'input',
        message: "What is the id of the role of the employee?",
        name: 'roleId',
    },
    {
        type: 'input',
        message: "What is the id of this employee's manager?",
        name: 'managerId',
    },
];

const menuPrompt = async () => {
    const answers = await inquirer.prompt(questions);
    const { menuSelection } = answers;
    selectQuery(menuSelection);
}

const displayBanner = (fileName) => {
    const banner = fs.readFileSync(fileName, 'ascii');
    console.log(banner);
}

const newDept = async () => {
    const deptName = await inquirer.prompt(deptQuestions);
    const { newDeptName } = deptName;
    addDeptQuery(newDeptName);
    showDeptQuery();
};

const addRole = async () => {
    const newRole = await inquirer.prompt(roleQuestions);
    const { newRoleName, newRoleSalary, newRoleDept } = newRole;
    addRoleQuery(newRoleName, newRoleSalary, newRoleDept);
    showRoleQuery();
};

const addEmployee = async () => {
    const newEmployee = await inquirer.prompt(newEmployeeQuestions);
    const { firstName, lastName, roleId, managerId } = newEmployee;
    addEmployeeQuery(firstName, lastName, roleId, managerId);
    showEmployeesQuery();
};

const updateEmployeeRole = async () => {
    const newRole = await inquirer.prompt(newEmployeeQuestions);
    const { firstName, lastName, roleId } = newRole;
    updateRoleQuery(roleId, firstName, lastName);
    showEmployeesQuery();
};

const mainMenuRecall = async () => {
    const menuReturnQuestion = await inquirer.prompt(questions);
    // const answers = await inquirer.prompt(questions);
    // const { menuSelection } = answers;
    // selectQuery(menuSelection);
};

// Ternary operator built into a function used to evaluate the response in the menu.  The selection parameter will be passed as an argument from the
// destructured object specified in the init function.
const selectQuery = (selection) => {
    selection === 'View all departments' ? showDeptQuery()
        : selection === 'View all roles' ? showRoleQuery()
        : selection === 'View all employees' ? showEmployeesQuery()
        : selection === 'Add a department' ? newDept()
        : selection === 'Add a role' ? addRole()
        : selection === 'Add an employee' ? addEmployee()
        : selection === 'Update an employee role' ? updateEmployeeRole()
        : console.log('Try again.')
};

// This initializes the application and runs the prompts.  The answers object returned from the user's menu selection is destructured.
const init = async () => {
    displayBanner('banner.txt');
    // await menuPrompt();
    const answers = await inquirer.prompt(questions);
    const { menuSelection } = answers;
    selectQuery(menuSelection);
};

init();