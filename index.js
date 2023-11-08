const inquirer = require('inquirer');
const updateName = require('./scripts/query');

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

const questions = [
    {
        type: 'list',
        message: 'Please select the operation you would like to complete',
        name: 'Menu Options',
        choices: menuOptions,
    },
];

inquirer.prompt(questions);