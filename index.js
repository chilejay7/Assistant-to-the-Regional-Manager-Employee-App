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
        name: 'menu',
        choices: menuOptions,
    },
];

const selectQuery = (selection) => {
    selection === 'View all departments' ? console.log('Here are your departments')
        : selection === 'View all roles' ? console.log('Here are your roles')
        : selection === 'View all employees' ? console.log('Here are your employees')
        : selection === 'Add a department' ? console.log('Adding a department')
        : selection === 'Add a role' ? console.log('Adding a role')
        : selection === 'Add an employee' ? console.log('Adding employee')
        : selection === 'Update an employee role' ? console.log(`Updating employee's role`)
        : console.log('Try again.')
};

// This initializes the application and runs the prompts.
const init = async () => {
    const answers = await inquirer.prompt(questions);
    const { menu } = answers
    console.log(menu);

    selectQuery(menu);
};

init();