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

function viewAllEmployees() {
    const dbEmployees = `SELECT first_name, last_name FROM employee`

    db.query(dbEmployees, (err, res) => {
        if (err) {
            console.log("hello error")
        }
        else {
            console.table(res);
            startPrompt()
        }
    })
}

function addADepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "newDepartment",
            message: "What is the name of the new Department?",
        }
    ])
    .then((response) => {
        console.log(response.newDepartment)
        let dbDepartment = response.newDepartment;

        db.query(`INSERT INTO department (dep_name) VALUES (?)`, [dbDepartment], (err, res) => {
            if (err) {
                console.error(err)
            }
            else {
                viewAllDeps();
            }
        })
    })
};


function addARole() {

    let allDeps = []
    const dbDeps = `SELECT dep_name FROM department` 

    db.query(dbDeps, (err, res) => {
        if (err) {
            console.log("hello error")
        }
        else {
            res.forEach((department) => {
                allDeps.push(department.dep_name)
            })
            console.log(allDeps)
        }
    })

    inquirer.prompt([
        {
            type: "input",
            name: "newRole",
            message: "What is the name of the new role?",
        },
        {
            type: "input",
            name: "newSalary",
            message: "How much does this position make?",
        },
        {
            type: "list",
            name: "placePosition",
            message: "What department does this position belong to?",
            choices: allDeps,
        }
    ])
    .then((response) => {
        let newRole = response.newRole;
        let newSalary = response.newSalary;
        let placePosition = response.placePosition;
        var placePositionid;
        
        db.query(`SELECT dep_id FROM department WHERE dep_name = (?)`, [placePosition], (err, res) => {
            console.log(placePosition)
            if (err) {
                console.log(err)
            }
            else {
                placePositionid = res[0].dep_id
            }
            console.log(placePositionid)
        })

        db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, [newRole, newSalary, placePositionid], (err, res) => {
            if (err) {
                console.error(err)
            }
            else {
                viewAllRoles();
            }
        })
    })
}

function addAnEmployee() {

    var roleId;
    var managerId;
    var newFirstName;  
    var newLastName;  
    var newRole;
    var isManager;

    let allRoles = []
    const dbRoles = `SELECT title FROM roles` 

    db.query(dbRoles, (err, res) => {
        if (err) {
            console.log("hello error")
        }
        else {
            res.forEach((roles) => {
                allRoles.push(roles.title)
            })
        }
    })

    let allManagers = []
    const dbManagers = `SELECT first_name, last_name FROM employee WHERE manager_id is null` 

    db.query(dbManagers, (err, res) => {
        if (err) {
            console.log(err)
        }
        else {
            res.forEach((employee) => {
                allManagers.push(employee.first_name + " " + employee.last_name)
            })
        }
    })


    inquirer.prompt([
        {
            type: "input",
            name: "newFirstName",
            message: "What is the employee's first name?",
        },
        {
            type: "input",
            name: "newLastName",
            message: "What is the employee's last name?",
        },
        {
            type: "list",
            name: "newRole",
            message: "What is this employee's role?",
            choices: allRoles
        },
        {
            type: "list",
            name: "isManager",
            message: "Who is this employee's manager?",
            choices: allManagers
        }
    ])

    .then((response) => {
         newFirstName = response.newFirstName;
         newLastName = response.newLastName;
         newRole = response.newRole;
         isManager = response.isManager;

        var chosenManager = isManager.split(" ")

        db.query(`SELECT id FROM roles WHERE title = (?)`, [newRole], (err, res) => {
            if (err) {
                console.log(err)
            }
            else {
                roleId = res[0].id
                console.log(roleId, "yooooo")
            }
        })

        db.query(`SELECT id FROM employee WHERE first_name = (?) AND last_name = (?)`, [chosenManager[0], chosenManager[1]], (err, res) => {
            if (err) {
                console.log(err)
            }
            else {
                managerId = res[0].id
                console.log(managerId, "brooooo")
            }
        })
        
        console.log(managerId)
        console.log(roleId)


        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [newFirstName, newLastName, roleId, managerId], (err, res) => {
            if (err) {
                console.log(err)
            }
            else {
                console.table(res)
                viewAllEmployees()
            }
        })
    })
}

async function updateEmpRole() {
    let allEmps = []
    const dbEmployees = `SELECT first_name, last_name FROM employee`

    db.query(dbEmployees, (err, res) => {
        if (err) {
            console.log("hello error")
        }
        else {
            res.forEach((employee) => {
                allEmps.push(employee.first_name + " " + employee.last_name)
            })
            console.log(allEmps)
        }
    })

    let allRoles = []
    const dbRoles = `SELECT title FROM roles` 

    db.query(dbRoles, (err, res) => {
        if (err) {
            console.log("hello error")
        }
        else {
            res.forEach((roles) => {
                allRoles.push(roles.title)
            })
        }

    inquirer.prompt([
        {
            type: "confirm",
            name: "stop",
            message: "Are you sure you would like to update an employee's role?",
        },
        {
            type: "list",
            name: "chooseEmp",
            message: "Which Employee's role would you like to change?",
            choices: allEmps,
        },
        {
            type: "list",
            name: "chooseRole",
            message: "What will the employee's new role be?",
            choices: allRoles,
        },
    ])

    .then((response) => {
        let empId;
        let roleId;

        res.forEach((roles) => {
            if (response.chooseRole === roles.title) {
                roleId = roles.id;
            }
        })


        res.forEach((employee) => {
            if(response.chooseEmp === employee.first_name + employee.last_name) {
                empId === employee.id;
            }
        })

        db.query(`UPDATE employee SET employee.role_id = ? WHERE employee.id = ?`, [roleId, empId], (err) => {
            if (err) {
                console.log(err)
            }
})
    })

})

}



startPrompt()