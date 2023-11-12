# Assistant to the Regional Manager (Employee Tracker App)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Description

The Assistant to the Regional Manager application helps end users to better track their employees and related information in a database.  Users are presented with multiple options to manage the departemnts, roles, and employees within their organization.  The application uses `SQL` queries in conjunction with `inquirer` prompts to provide the necessary data to complete the requested tasks.

![Assistant to the Regional Manager](./assets/images/RegionalMgr.gif)

## Table of Contents 

- [Installation](#installation)  
- [Usage](#usage)  
- [License](#license)
- [Questions](#questions)  
      
    
## Installation

The Employee Tracker application can be installed by cloning the repository to your local machine.  Please note, Node.js is required in order to run this application and will need to be installed before attempting to run the program.  The package dependencies, inquirer, are included within the package.json file and can be installed through a simple `npm i` command once the repository has been successfully cloned on the local computer.  The `inquirer` module is required for this application to work correctly and must be installed prior to running the program.  NPM will also install the `dotenv` and `mysql2` packages used to query the local database.  It is also critical to create the local database and seed it with data.  The `schema.sql` and `seeds.sql` files are included to provide the data structure and populate the tables.

## Usage

The application is initialized by running the `node index.js` command through the terminal.  When the `index.js` file is called it runs the inquirer prompts to retrieve input from the end user related to tasks they would like to take to manage their employees and company data.  All prompts can be navigated by using the arrow keys.  Inquirer will provide a main menu of prompts that first allows a user to view the data and queries the database to retrieve tables and display the information.  A user can view the existing departments, roles, and employees within the database.  The prompts that follow these options allow users to interact with and change the data.  Departments, roles, and employees can all be added to the database.  Each of these options uses inquirer to prompt for additional information required to complete the SQL queries.  The final prompt will update an existing employee's record.

A link to the video demonstrating the application's use can be found here: [Walkthrough Video](https://drive.google.com/file/d/1zwY5U-kabXLhem7mRgz2VSYvtfnLHA5b/view)

## License

This application is covered under the license linked below.  For further information regarding the license and its terms, please consult the official licensing documentation using the provided link.

[License: MIT](https://opensource.org/licenses/MIT)

## Contributions

No additional contributions were received from other sources for the completion of this project.

## Questions
  
GitHub: [chilejay7](https://github.com/chilejay7?tab=repositories)  
Email: codyburk7@gmail.com

