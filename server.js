const inquirer = require('inquirer');
const consoleTable = require('console.table');
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },
    console.log("You are now connected!")
)

function startPrompt() {
    inquirer.prompt ([
        {
            type: "list",
            name: "startPrompt",
            message: "Select one of the following:",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update Employee Role",
                "Quit",
            ]
        }
    ])
    .then((response) => {
        if (response.startPrompt === "View All Departments") {
            viewAllDeps()
        }
        else if (response.startPrompt === "View All Roles") {
            viewAllRoles()
        }
        else if (response.startPrompt === "View All Employees") {
            viewAllEmployees()
        }
        else if (response.startPrompt === "Add a Department") {
            addADepartment()
        }
        else if (response.startPrompt === "Add a Role") {
            addARole()
        }
        else if (response.startPrompt === "Add an Employee") {
            addAnEmployee()
        }
        else if (response.startPrompt === "Update Employee Role") {
            updateEmpRole()
        }
        else if (response.startPrompt === "Quit") {
            console.log("Bye Bye!")
            return;
        }
        else {
            throw console.error("whoops");
        }
        
    })
}

// Functionality for the above choices

function viewAllDeps() {
    const dbDeps = `SELECT dep_name FROM department`

    db.query(dbDeps, (err, res) => {
        if (err) {
            console.log("hello error")
        }
        else {
            console.table(res);
            startPrompt()
        }
    })
}

function viewAllRoles() {
    const dbRoles = `SELECT title FROM roles`

    db.query(dbRoles, (err, res) => {
        if (err) {
            console.log("hello error")
        }
        else {
            console.table(res);
            startPrompt()
        }
    })
}


startPrompt()