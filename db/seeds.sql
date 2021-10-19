INSERT INTO department (dep_id, dep_name)
VALUES (1, "Sales"), (2, "Engineering"), (3, "Legal"), (4, "Finance");


INSERT INTO roles (id, title, salary, department_id)
VALUES (001, "Sales Lead", 80000, 1), (002, "Salesperson", 50000, 1), (003, "Lead Engineer", 120000, 2), 
(004, "Software Engineer", 95000, 2), (005, "Legal Team Lead", 150000, 3), (006, "Lawyer", 100000, 3),
(007, "Account Mangager", 105000, 4), (008, "Accountant", 75000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Nick", "Laramee", 003, 001), ("Joe", "Schmoe", 004, null), ("Fred", "Flint", 001, 002), 
("John", "Doe", 002, null), ("Susie", "Q", 005, 003), ("Hors", "D'oeuvre", 006, null), ("Craig", "Smith", 007, 004), ("Anotha", "One", 008, null);