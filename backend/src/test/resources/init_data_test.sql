-- 2 user test
-- password = 123 hashing by bcrypt
Insert into users(username, password)
    values ('test', '$2a$10$EjcLvQWFyd2eVibyHHNIx.duFhsEZ0b9Q1gO/f1wYbt.l5llFXx3y'),
    ('test1', '$2a$10$uke0eygxBW1gbZy.Qolreuj/I7ug7KDfnu39PARl/Zbnxz6gMQyp2');
-- 11 product test
Insert into product (name, description, quantity, created_by, created_at)
    values ('product1', 'description1', 123, 'test1', '2022-02-02'),
    ('product2', 'description2', 0, 'test1', '2022-01-12'),
    ('product3', 'description3', 32, 'test1', '2023-02-22'),
    ('product4', 'description4', 43, 'test1', '2023-03-11'),
    ('product5', 'description5', 54, 'test1', '2023-04-12'),
    ('product6', 'description6', 21, 'test1', '2023-05-23'),
    ('product7', 'description7', 54, 'test1', '2023-06-01'),
    ('product8', 'description8', 76, 'test1', '2023-07-05'),
    ('product9', 'description9', 22, 'test1', '2023-08-07'),
    ('product10', 'description10', 55, 'test1', '2023-09-05'),
    ('product11', 'description11', 25, 'test1', '2023-10-09');