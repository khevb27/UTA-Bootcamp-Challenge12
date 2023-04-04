const inquirer = require('inquirer');
const mysql = require('mysql2');
// const { allowedNodeEnvironmentFlags } = require('process');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Beach m@yor t3ar',
    database: 'company_db'
  },
  console.log(`--Welcome to your company's employee tracker!--`),
  chooseAction()
);

const utils = require("util");
db.query = utils.promisify(db.query)

const departments = db.query("SELECT * FROM departments ORDER BY name ASC")
const roles = db.query('SELECT * FROM roles ORDER BY department_id ASC')
const employees = db.query('SELECT * FROM employees ORDER BY last_name ASC')

function chooseAction () {
inquirer.prompt([
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['View all departments',
        'View all roles',
        'View all employees',
        'View employees by manager',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Quit'],
    }
]).then((res) => {
    switch (res.action) {
        case 'View all departments':
            viewDepts();
            break;
        case 'View all roles':
            viewRoles();
            break;
        case 'View all employees':
            viewEmps();
            break;
        case 'View employees by manager':
            viewEmpsByManager();
            break;
        case 'Add a department':
            addDept();
            break;
        case 'Add a role':
            addRole();
            break;
        case 'Add an employee':
            addEmp();
            break;
        case 'Update an employee role':
            updateEmpRole();
            break;
        default:
            console.log("All Set! \n (press ctrl + C to close)")
}})
}

async function viewDepts() {
    const departments = await db.query(`SELECT name AS Departments, id as ID FROM departments ORDER BY name ASC`)
    console.table(departments);
    chooseAction();
  }
async function viewRoles() {
    const roles = await db.query(`SELECT id AS ID, title AS Title, salary AS Salary FROM roles ORDER BY department_id ASC;`)
    console.table(roles)
    chooseAction();
  }

  async function viewEmps() {
    const employees = await db.query(`SELECT employees.id, employees.first_name AS "First Name", 
    employees.last_name AS "Last Name",
    roles.title AS Title, 
    departments.name AS Department,
    roles.salary AS Salary,
    CONCAT(manager.first_name, " ", manager.last_name) AS "Manager"
    FROM employees
    LEFT JOIN roles
    ON employees.role_id = roles.id
    LEFT JOIN departments
    ON roles.department_id = departments.id
    LEFT OUTER JOIN employees AS manager
    ON employees.manager_id = manager.id ORDER BY employees.last_name ASC;`)
    console.table(employees);
    chooseAction();
  }

  async function viewEmpsByManager() {
    const employees = await db.query(`SELECT employees.id, employees.first_name AS "First Name", 
    employees.last_name AS "Last Name",
    roles.title AS Title, 
    departments.name AS Department,
    roles.salary AS Salary,
    CONCAT(manager.first_name, " ", manager.last_name) AS "Manager"
    FROM employees
    LEFT JOIN roles
    ON employees.role_id = roles.id
    LEFT JOIN departments
    ON roles.department_id = departments.id
    LEFT OUTER JOIN employees AS manager
    ON employees.manager_id = manager.id ORDER BY manager.last_name ASC;`)
    console.table(employees);
    chooseAction();
  }
async function addDept() {
   const res = await inquirer.prompt([
        {
            type: 'input',
            name: 'newDept',
            message: 'What is the new department name?',
        }]);
    const newDeptTable = await db.query(`INSERT INTO departments(name) VALUES ("${res.newDept}")`);
    console.log("New department successfully added!")
    chooseAction()
}

async function addRole() {

const callDepts = await db.query(`SELECT * FROM departments`)
let deptsList = callDepts.map(({id, name}) => ({
value: id,
name: name,
}
));
  const res = await inquirer.prompt([
        {
            type: 'input',
            name: 'newRole',
            message: 'What is the new role?',
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the SALARY for this role?',
        },
        {
            type: 'list',
            name: 'roleDept',
            message: 'What DEPARTMENT is this role under?',
            choices: deptsList
        }])

    const newRole = await db.query(`INSERT INTO roles(title, salary, department_id) VALUES ("${res.newRole}",${res.roleSalary},${res.roleDept});`);
    console.table("New role successfully added!")
    chooseAction()
}

async function addEmp() {

const callRoles = await db.query(`SELECT * FROM roles`)
let rolesList = callRoles.map(({id, title}) => ({
value: id,
name: title,
}
));

const callEmps = await db.query(`SELECT * FROM employees`)
let empsList = callEmps.map(({id, first_name, last_name}) => ({
value: id,
name: first_name + " " + last_name,
}
));
const res = await inquirer.prompt([
        {
            type: 'input',
            name: 'newFirst',
            message: `What is the new employee's FIRST name?`,
        },
        {
            type: 'input',
            name: 'newLast',
            message: `What is the new employee's LAST name?`,
        },
        {
            type: 'list',
            name: 'empRole',
            message: `What the employee's ROLE?`,
            choices: rolesList
        },
        {
            type: 'list',
            name: 'empMan',
            message: `Who is the employee's MANAGER?`,
            choices: empsList
        }    
    ])
    const newEmp = await db.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("${res.newFirst}", "${res.newLast}",${res.empRole},${res.empMan});`);
    console.log("New employee successfully added!")
    chooseAction()
}

async function updateEmpRole() {
    const callRoles = await db.query(`SELECT * FROM roles`)
    let rolesList = callRoles.map(({id, title}) => ({
    value: id,
    name: title,
    }
    ));
    
    const callEmps = await db.query(`SELECT * FROM employees`)
    let empsList = callEmps.map(({id, first_name, last_name}) => ({
    value: id,
    name: first_name + " " + last_name,
    }
    ));
    const res = await inquirer.prompt([
        {
            type: 'list',
            name: 'empUpdate',
            message: `Which employee do you want to update?`,
            choices: empsList
        },
        {
            type: 'list',
            name: 'updatedRole',
            message: `what is the employee's new ROLE?`,
            choices: rolesList
        },
        {
            type: 'list',
            name: 'empMan',
            message: `Who is the employee's new MANAGER?`,
            choices: empsList
        }
    ])
    const updatedEmp = await db.query(`UPDATE employees SET role_id = ${res.updatedRole}, manager_id = ${res.empMan} WHERE id = ${res.empUpdate};`);
    console.log("Employee successfully updated!")
    chooseAction()
}