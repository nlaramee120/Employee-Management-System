INSERT INTO department (dep_id, dep_name)
VALUES (1, "Sales"), (2, "Engineering"), (3, "Legal"), (4, "Finance");


INSERT INTO roles (id, title, salary, department_id)
VALUES (001, "Sales Lead", 80000, 1), (002, "Salesperson", 50000, 1), (003, "Lead Engineer", 120000, 2), 
(004, "Software Engineer", 95000, 2), (005, "Legal Team Lead", 150000, 3), (006, "Lawyer", 100000, 3),
(007, "Account Mangager", 105000, 4), (008, "Accountant", 75000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Nick", "Laramee", 003, null), ("Joe", "Schmoe", 004, 001), ("Fred", "Flint", 001, null), 
("John", "Doe", 002, 003), ("Susie", "Q", 005, null), ("Hors", "D'oeuvre", 006, 005), ("Craig", "Smith", 007, null), ("Anotha", "One", 008, 007);