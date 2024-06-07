const mysql = require("mysql2");
const inquirer = require("inquirer");
require("dotenv").config();

const db = mysql.createConnection(
    {
        host: "localhost",
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
                    "Add a deparment",
                    "Add a role",
                    "Add an employee",
                    "Update an employee's role",
                    "Exit",
                ]
            }
        ]
    )
}
