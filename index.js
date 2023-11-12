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

// The main menu prompts are presented to users through this menu.
const mainPrompt = [
    {
        type: 'list',
        message: 'Please select the operation you would like to complete',
        name: 'menuSelection',
        choices: menuOptions,
    },
];

// This prompt is used to add a department.
const deptQuestions = [
    {
        type: 'input',
        message: "What is the name of the department you would like to add?",
        name: 'newDeptName',
    }
];

// This prompt is used when updating an employee's role.
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

// This prompt is used for both the add employee and update employee role menus.
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


// This function uses the ascii image in the banner.txt file to display an iamge on start.
// This function is called in init.
const displayBanner = (fileName) => {
    const banner = fs.readFileSync(fileName, 'ascii');
    console.log(banner);
};

// This prompt is used to call the main menu prompts.  It used with a setTimeout function after each prompt.
// The setTimeout function is used to display the main menu again after the user's selections.
const menuPrompt = async () => {
    const answers = await inquirer.prompt(mainPrompt);
    const { menuSelection } = answers;
    selectQuery(menuSelection);
};

// This is the prompt used to view all departments in the database.
// setTimeout is used to allow the rendering of the table to complete before displaying the menu again.
const viewDepartments = () => {
    showDeptQuery();
    setTimeout(menuPrompt, 500);
};

// This function is used to view the roles table.
const viewRoles = () => {
    showRoleQuery();
    setTimeout(menuPrompt, 500);
};

// This function is used to view the employees table.
const viewEmployees = () => {
    showEmployeesQuery();
    setTimeout(menuPrompt, 500);
};

// This function is used to add a new departemnt.  A new prompt is called to request the information needed for the new department.
// The name given to the input prompts is destrucutred and passed to the query function.
const newDept = async () => {
    const deptName = await inquirer.prompt(deptQuestions);
    const { newDeptName } = deptName;
    addDeptQuery(newDeptName);
    showDeptQuery();
    setTimeout(menuPrompt, 500);
};

// This function is used to add a new role.  A new prompt was added to request the information needed.
// The name given to the input prompts is destrucutred and passed to the query function.
const addRole = async () => {
    const newRole = await inquirer.prompt(roleQuestions);
    const { newRoleName, newRoleSalary, newRoleDept } = newRole;
    addRoleQuery(newRoleName, newRoleSalary, newRoleDept);
    showRoleQuery();
    setTimeout(menuPrompt, 500);
};

// A new employee can be added using this function.
// The names given to the input prompts are destrucutred and passed to the query function.
const addEmployee = async () => {
    const newEmployee = await inquirer.prompt(newEmployeeQuestions);
    const { firstName, lastName, roleId, managerId } = newEmployee;
    addEmployeeQuery(firstName, lastName, roleId, managerId);
    showEmployeesQuery();
    setTimeout(menuPrompt, 500);
};

// An employee's role is updated through this function.
// The names given to the input prompts are destrucutred and passed to the query function.
const updateEmployeeRole = async () => {
    const newRole = await inquirer.prompt(newEmployeeQuestions);
    const { firstName, lastName, roleId } = newRole;
    updateRoleQuery(roleId, firstName, lastName);
    showEmployeesQuery();
    setTimeout(menuPrompt, 500);
};

// A ternary operator is built into a function used to evaluate the response in the main menu.
// Based on the user's reponse, a query function is called to provide a table with the requested data.
// The selection parameter will be passed as an argument from the destructured object specified in the init function.
const selectQuery = (selection) => {
    selection === 'View all departments' ? viewDepartments()
        : selection === 'View all roles' ? viewRoles()
        : selection === 'View all employees' ? viewEmployees()
        : selection === 'Add a department' ? newDept()
        : selection === 'Add a role' ? addRole()
        : selection === 'Add an employee' ? addEmployee()
        : selection === 'Update an employee role' ? updateEmployeeRole()
        : console.log('Try again.')
};

// This initializes the application and runs the prompts.  
// The menuSelection key that is destructured is the name given to the main menu inquirer prompt at the beginning of the script.
const init = async () => {
    displayBanner('banner.txt');
    const answers = await inquirer.prompt(mainPrompt);
    const { menuSelection } = answers;
    selectQuery(menuSelection);
};

init();