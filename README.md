# UTA-Bootcamp-Challenge12
## SQL Challenge: Employee Tracker
----------------------------------------------------------------------
## Description

This is a command-line application that serves as a Content Management System (CMS) and enables business owners to efficiently manage their company's departments, roles, and employees. It provides a structured approach to organizing and planning a business.

----------------------------------------------------------------------

## User Story

```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```
* "User Story" & "Acceptance Criteria" listed above have been provided by the UTA Bootcamp Program 2022.
----------------------------------------------------------------------

## Table of Contents

- [Installation](#installation)
- [Built Using](#built-using)
- [Preview](#preview)
- [Links](#links)
- [License](#license)

----------------------------------------------------------------------

## Installation

1. Clone/download git repository.
2. Run command "npm i"
3. Run command "node index.js" to run the application.
4. Follow the prompts to create your company database.

#

## Built Using

- Node.js
- Inquirer
- console.table
- mysql2

#

## Preview

<img src= "assets/images/title.jpg"/>

#

## Links

- Video Submission Link:
- GitHub Repository Link: https://github.com/khevb27/UTA-Bootcamp-Challenge12 

----------------------------------------------------------------------
## License

Please refer to licensing documentation in the project repository.

<img src="https://img.shields.io/badge/license-MIT License-blue.svg" alt="GitHub License">

----------------------------------------------------------------------