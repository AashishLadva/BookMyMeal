create database Project;

USE Project;

CREATE TABLE employee (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    role VARCHAR(50),
    doj DATE,
    password VARCHAR(255)
);

-- Meals Table
CREATE TABLE meals (
    id integer AUTO_INCREMENT PRIMARY KEY,
    meal_type ENUM('LUNCH', 'DINNER') NOT NULL
);

-- Meal Bookings 
CREATE TABLE meal_bookings (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT NOT NULL,
    meal_id INTEGER NOT NULL,
    booking_date DATE NOT NULL,
    coupon_code VARCHAR(255) UNIQUE NOT NULL,
    status ENUM('BOOKED', 'CANCELLED') DEFAULT 'BOOKED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE CASCADE,
    FOREIGN KEY (meal_id) REFERENCES meals(id) ON DELETE CASCADE,
    UNIQUE (employee_id, meal_id, booking_date)
);

CREATE TABLE Holidays (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL
);

CREATE TABLE Menu (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    day_of_week VARCHAR(255) NOT NULL,
    meal_type ENUM('LUNCH', 'DINNER') NOT NULL,
    dish_name VARCHAR(255) NOT NULL
);

-- drop table Menu;

INSERT INTO Menu (day_of_week, meal_type, dish_name) VALUES
-- Monday
('Monday', 'LUNCH', 'Thepla'),
('Monday', 'LUNCH', 'Gathiya nu Shaak'),
('Monday', 'LUNCH', 'Khichdi'),
('Monday', 'LUNCH', 'Achar'),
('Monday', 'DINNER', 'Dhokli nu Shaak'),
('Monday', 'DINNER', 'Jeera Rice'),
('Monday', 'DINNER', 'Papad'),
-- Tuesday
('Tuesday', 'LUNCH', 'Methi na Thepla'),
('Tuesday', 'LUNCH', 'Lasaniya Bataka'),
('Tuesday', 'LUNCH', 'Rajwadi Kadhi'),
('Tuesday', 'LUNCH', 'Chutney'),
('Tuesday', 'DINNER', 'Undhiyu'),
('Tuesday', 'DINNER', 'Puri'),
('Tuesday', 'DINNER', 'Sweet Jalebi'),
-- Wednesday
('Wednesday', 'LUNCH', 'Bajra Rotla'),
('Wednesday', 'LUNCH', 'Ringan no Olo'),
('Wednesday', 'LUNCH', 'Chaas'),
('Wednesday', 'LUNCH', 'Gujarati Kadhi'),
('Wednesday', 'DINNER', 'Sev Tameta nu Shaak'),
('Wednesday', 'DINNER', 'Bhakhri'),
('Wednesday', 'DINNER', 'Kachumber Salad'),
-- Thursday
('Thursday', 'LUNCH', 'Masala Rotla'),
('Thursday', 'LUNCH', 'Val ni Dal'),
('Thursday', 'LUNCH', 'Chaash'),
('Thursday', 'DINNER', 'Patra'),
('Thursday', 'DINNER', 'Pulao with Cashew Nuts'),
('Thursday', 'DINNER', 'Tomato Chutney'),
-- Friday
('Friday', 'LUNCH', 'Makai no Chevdo'),
('Friday', 'LUNCH', 'Bhinda nu Shaak'),
('Friday', 'LUNCH', 'Bajra Rotla'),
('Friday', 'LUNCH', 'Jaggery and White Butter'),
('Friday', 'DINNER', 'Dhokla'),
('Friday', 'DINNER', 'Lasaniya Chutney'),
('Friday', 'DINNER', 'Kadhi Khichdi');

INSERT INTO Holidays (date) VALUES
    ('2024-01-26'),
    ('2024-08-15'),
    ('2024-11-02'),
    ('2024-12-25'),
    ('2024-11-12'),
    ('2024-03-29'),
    ('2024-01-01'),
    ('2024-10-23'),
    ('2024-01-14');

-- drop table holidays; 
-- drop table meal_bookings; 
-- drop table meal_booking_dates;
-- drop table meals;
-- drop table employee;

use project;

select * from meals;	
select * from meal_booking_dates;
select * from meal_bookings;
select * from employee;
select * from menu;
select * from Holidays;
