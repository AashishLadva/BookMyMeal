create database Project;

USE Project;

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    employee_id VARCHAR(100) UNIQUE,
    role VARCHAR(50),
    DOJ date,
    password VARCHAR(255)
);

INSERT INTO employee (name, email, employee_id, role, DOJ, password) 
VALUES ('Aashish', 'aashish@example.com', 'emp102', 'Software Engineer', '2024-02-02', 'Aas@12345');

update employee set name = "AashishLadva" where id=3;

SELECT * FROM employee;
