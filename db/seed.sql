-- Seed data created by chatgpt
-- Departments
INSERT INTO department (name) VALUES 
('Human Resources'),
('Finance'),
('Marketing'),
('Engineering'),
('Sales');

-- Roles
INSERT INTO role (department_id, title, salary) VALUES
(1, 'HR Manager', 80000.00),
(1, 'HR Assistant', 50000.00),
(2, 'Finance Manager', 90000.00),
(2, 'Accountant', 60000.00),
(3, 'Marketing Director', 100000.00),
(3, 'Marketing Specialist', 70000.00),
(4, 'Software Engineer', 95000.00),
(4, 'Systems Analyst', 80000.00),
(5, 'Sales Manager', 85000.00),
(5, 'Sales Representative', 60000.00);

-- Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL), -- HR Manager
('Jane', 'Smith', 2, 1),    -- HR Assistant
('Michael', 'Johnson', 3, NULL), -- Finance Manager
('Emily', 'Williams', 4, 3), -- Accountant
('David', 'Brown', 5, NULL), -- Marketing Director
('Sarah', 'Jones', 6, 5), -- Marketing Specialist
('Robert', 'Miller', 7, NULL), -- Software Engineer
('Laura', 'Davis', 8, 7), -- Systems Analyst
('Christopher', 'Wilson', 9, NULL), -- Sales Manager
('Amanda', 'Martinez', 10, 9); -- Sales Representative
