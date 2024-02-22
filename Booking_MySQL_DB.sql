DROP TABLE IF EXISTS appointment;
DROP TABLE IF EXISTS dentist;
DROP TABLE IF EXISTS registered_user;

CREATE TABLE registered_user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    telephone VARCHAR(20),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100)
);

CREATE TABLE dentist (
    dentist_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    specialty VARCHAR(100),
    available_days VARCHAR(100),
    start_time TIME,
    end_time TIME
);

CREATE TABLE appointment (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    dentist_id INT,
    appointment_date DATE,
    appointment_time TIME,
    FOREIGN KEY (user_id) REFERENCES registered_user(user_id),
    FOREIGN KEY (dentist_id) REFERENCES dentist(dentist_id)
);

INSERT INTO registered_user (name, telephone, email, password) VALUES
('John Doe', '123-456-7890', 'john@example.com', 'password123'),
('Jane Smith', '987-654-3210', 'jane@example.com', 'password456'),
('Alice Johnson', '123-456-7890', 'alice@example.com', 'password123'),
('Bob Smith', '987-654-3210', 'bob@example.com', 'securepass'),
('Emily Davis', '555-555-5555', 'emily@example.com', 'password123');

INSERT INTO dentist (name, specialty, available_days, start_time, end_time) VALUES
('Dr. Smith', 'Orthodontist', 'Monday,Wednesday,Friday', '09:00:00', '17:00:00'),
('Dr. Johnson', 'Pediatric Dentist', 'Tuesday,Thursday', '08:00:00', '16:00:00'),
('Dr. Sarah Lee', 'Orthodontist', 'Monday,Wednesday,Friday', '09:00:00', '17:00:00'),
('Dr. Michael Johnson', 'Pediatric Dentist', 'Tuesday,Thursday', '08:00:00', '16:00:00'),
('Dr. David Chen', 'Endodontist', 'Monday,Wednesday', '10:00:00', '18:00:00'),
('Dr. Jennifer Adams', 'Periodontist', 'Tuesday,Thursday', '09:00:00', '17:00:00');

INSERT INTO appointment (user_id, dentist_id, appointment_date, appointment_time) VALUES
(1, 1, '2024-02-23', '10:00:00'),
(2, 2, '2024-02-24', '08:30:00'),
(3, 3, '2024-02-25', '10:00:00'),
(4, 4, '2024-02-27', '11:30:00'),
(2, 5, '2024-02-28', '14:00:00'),
(1, 6, '2024-03-01', '09:00:00');
