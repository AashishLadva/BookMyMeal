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

    
select * from Holidays;

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

update meals set meal_type="DINNER" where meal_type="dinner";

insert into meals (meal_type) values ("LUNCH"),("DINNER");

select * from meals;



truncate table meals;

show tables;

select * from meal_booking_dates;

INSERT INTO employee (name, email, role, DOJ, password) 
VALUES ('Aashish', 'aashish@example.com', 'Software Engineer', '2024-02-02', 'Aas@12345');

update employee set email = "aashishladva@gmail.com" where id=1;

SELECT * FROM employee;


-- Meal Bookings Table
CREATE TABLE meal_bookings (
    id integer AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for the booking
    employee_id bigint NOT NULL, -- ID of the employee making the booking
    meal_id integer NOT NULL, -- ID of the meal type (e.g., breakfast, lunch, dinner)
    status ENUM('ACTIVE', 'CANCELLED') DEFAULT 'ACTIVE', -- Booking status
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for creation
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Timestamp for updates
    FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE CASCADE, -- Ensure referential integrity
    FOREIGN KEY (meal_id) REFERENCES meals(id) ON DELETE CASCADE -- Ensure referential integrity
);

CREATE TABLE meal_booking_dates (
    id integer AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for each booking date
    booking_id integer NOT NULL, -- References the meal_bookings table
    booking_date DATE NOT NULL, -- Specific date for the meal
    coupon_code VARCHAR(255) UNIQUE NOT NULL, -- Unique coupon for each date
    status ENUM('BOOKED', 'CANCELLED') DEFAULT 'BOOKED', -- Date-specific booking status
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for creation
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Timestamp for updates
    FOREIGN KEY (booking_id) REFERENCES meal_bookings(id) ON DELETE CASCADE, -- Ensure referential integrity
    UNIQUE (booking_id, booking_date) -- Prevent duplicate dates for the same booking
);

