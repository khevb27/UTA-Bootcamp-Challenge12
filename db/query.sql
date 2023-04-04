SELECT employees.id, employees.first_name AS "first name", 
    employees.last_name AS "last name",
    roles.title, 
    departments.name AS department,
    roles.salary,
    CONCAT(manager_id.first_name, " ", manager_id.last_name) AS manager
    FROM employees
    LEFT JOIN roles
    ON employees.role_id = roles.id
    LEFT JOIN departments
    ON roles.department_id = departments.id
    LEFT JOIN employees
    ON departments.name = employees.manager_id

SELECT a.id,
    a.first_name AS "First Name",
    a.last_name AS "Last Name",
    roles.title AS "Title",
    department.dept_name AS "Department",
    roles.salary AS "Salary",
    CONCAT(b.first_name, " ", b.last_name) AS "Manager"
    FROM employee AS a
    JOIN roles ON a.role_id = roles.id
    JOIN department ON roles.department_id = department.id
    LEFT OUTER JOIN employee AS b ON a.manager_id = b.id;