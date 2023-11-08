INSERT INTO department (name)
VALUES
    ('IT'),
    ('Informatics'),
    ('Finance');

INSERT INTO role (title, salary, department_id)
    ('Junior Accountant', 60000, 0003),500
    ('Informaticist I', 65000, 0002), 501
    ('Technical Analyst', 75000, 0002), 502
    ('Manager', 100000, 0003), 503
    ('Director', 200000, 0001), 504
    ('CEO', 500000, 0001); 505

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    ('Tim', 'Smith', 500, 1003),
    ('John', 'Smith', 501, 1003)
    ('Eric', 'Moody', 502, 1003)
    ('Eric', 'Moody', 503, 1004)
    ('Alli', 'Burkholder', 504, 1005),
    ('Katelyn', 'Schumacher', 505);