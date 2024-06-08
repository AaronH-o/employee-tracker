const mysql = require("mysql2");
const inquirer = require("inquirer");
require("dotenv").config();

const db = mysql.createConnection(
    {
        host: "127.0.0.1",
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    console.log(`Connected to the ${process.env.DB_NAME} database.`),
);

function menu() {
    inquirer.prompt(
        [
            {
                type: "list",
                message: "What would you like to do?",
                name: "menuInput",
                choices: [
                    "View all deparments",
                    "View all roles",
                    "View all employees",
                    "Add a department",
                    "Add a role",
                    "Add an employee",
                    "Update an employee's role",
                    "Exit",
                ]
            }
        ]
    ).then((answers) => {
        switch(answers.menuInput) {
            case "View all deparments":
                return displayAllDepartments();
            case "View all roles":
                return displayAllRoles();
            case "View all employees":
                return displayAllEmployees();
            case "Add a department":
                return addDepartment();
            case "Add a role":
                return addRole();
            case "Add an employee":
                return addEmployee();
            case "Update an employee's role":
                return updateEmployee();
            case "Exit":
                process.exit();
        }
    });
}

function displayAllDepartments() {
    return db
        .promise()
        .query("SELECT id, name FROM department")
        .then((data) => {
            console.log(data[0]);
            menu();
        })
        .catch((err) => {
            console.error(err);
        });
}

function displayAllRoles() {
    return db
        .promise()
        .query("SELECT id, title, salary, department_id FROM role")
        .then((data) => {
            console.log(data[0]);
            menu();
        })
        .catch((err) => {
            console.error(err);
        });
}

function displayAllEmployees() {
    return db
        .promise()
        .query("SELECT id, first_name, last_name, role_id, manager_id FROM employee")
        .then((data) => {
            console.log(data[0]);
            menu();
        })
        .catch((err) => {
            console.error(err);
        });
}

function addDepartment() {
    inquirer.prompt(
        [
            {
                type: "input",
                message: "What is the name of the department?",
                name: "departmentName",
            },
        ]
    ).then((answers) => {
        db
            .promise()
            .query(`INSERT INTO department (name) VALUES ('${answers.departmentName}')`)
            .then(() => {
                menu();
            })
            .catch((err) => {
                console.error(err);
            });
    });
}



async function addRole() {
    const departmentArray = await db
        .promise()
        .query("SELECT id AS value, name FROM department")
        .then(([results]) => results);
    inquirer.prompt(
        [
            {
                type: "input",
                message: "What is the name of the role?",
                name: "roleTitle",
            },
            {
                type: "input",
                message: "What is the salary of the role?",
                name: "roleSalary",
            },
            {
                type: "list",
                message: "Wich department does this role belong to?",
                name: "roleDepartmentId",
                choices: departmentArray,
            }
        ]
    ).then((answers) => {
        db
            .promise()
            .query(`INSERT INTO role (title, salary, department_id) VALUES ('${answers.roleTitle}', ${answers.roleSalary}, ${answers.roleDepartmentId})`)
            .then(() => {
                menu();
            })
            .catch((err) => {
                console.error(err);
            });
    });
}

async function addEmployee() {
    const roleArray = await db
        .promise()
        .query("SELECT id AS value, title FROM role")
        .then(([results]) => results);
    const employeeArray = await db
        .promise()
        .query("SELECT id AS value, first_name, last_name FROM employee")
        .then(([results]) => results);
    employeeArray.push("None");
    inquirer.prompt(
        [
            {
                type: "input",
                message: "What is the employee's first name?",
                name: "firstName",
            },
            {
                type: "input",
                message: "What is the employee's last name?",
                name: "lastName",
            },
            {
                type: "list",
                message: "Which role does this employee have?",
                name: "employeeRole",
                choices: roleArray,
            },
            {
                type: "list",
                message: "Who is the manager for this employee?",
                name: "employeeManager",
                choices: employeeArray,
            }
        ]
    ).then((answers) => {
        console.log(answers.employeeManager);
        (answers.employeeManager == "None") ? 
        db
            .promise()
            .query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ('${answers.firstName}', '${answers.lastName}', ${answers.employeeRole})`)
            .then(() => {
                menu();
            })
            .catch((err) => {
                console.error(err);
            })
        :
        db
            .promise()
            .query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.firstName}', '${answers.lastName}', ${answers.employeeRole}, ${answers.employeeManager})`)
            .then(() => {
                menu();
            })
            .catch((err) => {
                console.error(err);
            });
    });
}

menu();