INSERT INTO customers (first_name, last_name, email, phone, address) VALUES
                                                                         ('John', 'Doe', 'john.doe@example.com', '+48 111 222 001', 'Customer Address 1'),
                                                                         ('Jane', 'Smith', 'jane.smith@example.com', '+48 111 222 002', 'Customer Address 2'),
                                                                         ('Alice', 'Johnson', 'alice.johnson@example.com', '+48 111 222 003', 'Customer Address 3'),
                                                                         ('Bob', 'Brown', 'bob.brown@example.com', '+48 111 222 004', 'Customer Address 4'),
                                                                         ('Charlie', 'Davis', 'charlie.davis@example.com', '+48 111 222 005', 'Customer Address 5'),
                                                                         ('Diana', 'Miller', 'diana.miller@example.com', '+48 111 222 006', 'Customer Address 6'),
                                                                         ('Edward', 'Wilson', 'edward.wilson@example.com', '+48 111 222 007', 'Customer Address 7');


INSERT INTO orders (order_number, order_date, order_amount, order_status, customer_id)
VALUES
    ('ORDER-1', '2024-11-10 10:15:30', 499.99, 'NEW', 1),
    ('ORDER-2', '2024-12-11 11:20:45', 299.99, 'SHIPPED', 2),
    ('ORDER-3', '2024-12-12 12:25:50', 799.99, 'DELIVERED', 3),
    ('ORDER-4', '2024-12-13 13:30:55', 199.99, 'NEW', 4),
    ('ORDER-5', '2024-12-14 14:35:00', 649.99, 'CANCELLED', 5),
    ('ORDER-6', '2024-11-15 15:40:05', 349.99, 'SHIPPED', 6),
    ('ORDER-7', '2025-01-16 16:45:10', 549.99, 'DELIVERED', 7),
    ('ORDER-8', '2025-01-17 17:50:15', 449.99, 'NEW', 1),
    ('ORDER-9', '2025-01-15 15:40:05', 349.99, 'SHIPPED', 6),
    ('ORDER-10', '2025-02-04 16:45:10', 549.99, 'DELIVERED', 7),
    ('ORDER-11', '2025-02-07 12:50:15', 449.99, 'NEW', 1),
    ('ORDER-12', '2025-02-07 13:50:15', 449.99, 'NEW', 1),
    ('ORDER-13', '2025-02-07 14:50:15', 449.99, 'NEW', 1);

INSERT INTO suppliers (name, email, phone, address)
VALUES
    ('Supplier 1', 'supplier1@example.com', '+48 000 111 001', 'Supplier Address 1'),
    ('Supplier 2', 'supplier2@example.com', '+48 000 111 002', 'Supplier Address 2'),
    ('Supplier 3', 'supplier3@example.com', '+48 000 111 003', 'Supplier Address 3'),
    ('Supplier 4', 'supplier4@example.com', '+48 000 111 004', 'Supplier Address 4'),
    ('Supplier 5', 'supplier5@example.com', '+48 000 111 005', 'Supplier Address 5'),
    ('Supplier 6', 'supplier6@example.com', '+48 000 111 006', 'Supplier Address 6'),
    ('Supplier 7', 'supplier7@example.com', '+48 000 111 007', 'Supplier Address 7'),
    ('Supplier 8', 'supplier8@example.com', '+48 000 111 008', 'Supplier Address 8'),
    ('Supplier 9', 'supplier9@example.com', '+48 000 111 009', 'Supplier Address 9'),
    ('Supplier 10', 'supplier10@example.com', '+48 000 111 010', 'Supplier Address 10'),
    ('Supplier 11', 'supplier11@example.com', '+48 000 111 011', 'Supplier Address 11'),
    ('Supplier 12', 'supplier12@example.com', '+48 000 111 012', 'Supplier Address 12'),
    ('Supplier 13', 'supplier13@example.com', '+48 000 111 013', 'Supplier Address 13'),
    ('Supplier 14', 'supplier14@example.com', '+48 000 111 014', 'Supplier Address 14'),
    ('Supplier 15', 'supplier15@example.com', '+48 000 111 015', 'Supplier Address 15'),
    ('Supplier 16', 'supplier16@example.com', '+48 000 111 016', 'Supplier Address 16'),
    ('Supplier 17', 'supplier17@example.com', '+48 000 111 017', 'Supplier Address 17'),
    ('Supplier 18', 'supplier18@example.com', '+48 000 111 018', 'Supplier Address 18'),
    ('Supplier 19', 'supplier19@example.com', '+48 000 111 019', 'Supplier Address 19'),
    ('Supplier 20', 'supplier20@example.com', '+48 000 111 020', 'Supplier Address 20'),
    ('Supplier 21', 'supplier21@example.com', '+48 000 111 021', 'Supplier Address 21');

INSERT INTO products (name, category, brand, price, quantity, supplier_id) VALUES
   ('Product 1', 'Electronics', 'BrandA1', 199.99, 100, 1),
   ('Product 2', 'Electronics', 'BrandB1', 299.99, 50, 2),
   ('Product 3', 'Electronics', 'BrandC1', 99.99, 200, 3),
   ('Product 4', 'Electronics', 'BrandD1', 149.99, 150, 4),
   ('Product 5', 'Garden', 'BrandE1', 79.99, 120, 5),
   ('Product 6', 'Garden', 'BrandF1', 89.99, 80, 1),
   ('Product 7', 'Garden', 'BrandG1', 59.99, 300, 2),
   ('Product 8', 'Garden', 'BrandH1', 39.99, 500, 3),
   ('Product 9', 'Garden', 'BrandI1', 129.99, 75, 4),
   ('Product 10', 'Sports', 'BrandJ1', 159.99, 60, 5),
   ('Product 11', 'Sports', 'BrandA2', 199.99, 100, 1),
   ('Product 12', 'Sports', 'BrandB2', 299.99, 50, 2),
   ('Product 13', 'Sports', 'BrandC2', 99.99, 200, 3),
   ('Product 14', 'Sports', 'BrandD2', 149.99, 150, 4),
   ('Product 15', 'Sports', 'BrandE2', 79.99, 120, 5),
   ('Product 16', 'Toys', 'BrandF2', 89.99, 80, 1),
   ('Product 17', 'Toys', 'BrandG2', 59.99, 300, 2),
   ('Product 18', 'Toys', 'BrandH2', 39.99, 500, 3),
   ('Product 19', 'Toys', 'BrandI2', 129.99, 75, 4),
   ('Product 20', 'Toys', 'BrandJ2', 159.99, 60, 5),
   ('Product 21', 'Toys', 'BrandA3', 199.99, 100, 1),
   ('Product 22', 'Toys', 'BrandB3', 299.99, 50, 2),
   ('Product 23', 'Home', 'BrandC3', 99.99, 200, 3),
   ('Product 24', 'Home', 'BrandD3', 149.99, 150, 4),
   ('Product 25', 'Home', 'BrandE3', 79.99, 120, 5),
   ('Product 26', 'Home', 'BrandF3', 89.99, 80, 1),
   ('Product 27', 'Home', 'BrandG3', 59.99, 300, 2),
   ('Product 28', 'Home', 'BrandH3', 39.99, 500, 3),
   ('Product 29', 'Home', 'BrandI3', 129.99, 75, 4),
   ('Product 30', 'Home', 'BrandJ3', 159.99, 60, 5);

INSERT INTO order_items (order_id, product_id, quantity, unit_price)
VALUES
    (1, 1, 2, 199.99),
    (1, 3, 1, 99.99),
    (2, 2, 1, 299.99),
    (2, 5, 2, 79.99),
    (3, 4, 3, 149.99),
    (3, 6, 1, 89.99),
    (4, 7, 4, 59.99),
    (5, 8, 2, 39.99),
    (6, 9, 1, 129.99),
    (7, 10, 1, 159.99),
    (8, 1, 2, 199.99),
    (6, 9, 1, 129.99),
    (7, 10, 1, 159.99),
    (8, 1, 2, 199.99),
    (8, 2, 1, 299.99);


INSERT INTO users (username, password, email, first_name, last_name) VALUES
    ('admin',	'$2a$10$ZH4EhUc4j2G9y9JJgNviBuKSI4ZdqRzT63O7fCyPanjyoVPGd7NfO',	'admin@gmail.com',	'admin',	'admin');