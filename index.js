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

menu();