INSERT INTO department (department_name)
VALUES
    ('IT'),
    ('Informatics'),
    ('Finance');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Junior Accountant', 60000, 0003),
    ('Informaticist I', 65000, 0002),
    ('Technical Analyst', 75000, 0002),
    ('Manager', 100000, 0003),
    ('Director', 200000, 0001),
    ('CEO', 500000, 0001);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Tim', 'Smith', 500, 1003),
    ('John', 'Smith', 501, 1003),
    ('Steve', 'Johnson', 502, 1003),
    ('Eric', 'Moody', 503, 1004),
    ('Alli', 'Burkholder', 504, 1005),
    ('Michael', 'Scott', 503, 1004),
    ('Katelyn', 'Schumacher', 505, 1004);