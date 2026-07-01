-- Fee Management System Database Schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'student') NOT NULL DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Students table
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    roll_number VARCHAR(50) UNIQUE NOT NULL,
    branch VARCHAR(100) NOT NULL,
    semester INT NOT NULL,
    year INT NOT NULL,
    contact_number VARCHAR(15),
    address TEXT,
    hostel_resident BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Fee Structures table
CREATE TABLE IF NOT EXISTS fee_structures (
    id INT AUTO_INCREMENT PRIMARY KEY,
    branch VARCHAR(100) NOT NULL,
    semester INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_branch_semester (branch, semester)
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    fee_structure_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'Credit Card',
    transaction_id VARCHAR(100) UNIQUE NOT NULL,
    status ENUM('Pending', 'Completed', 'Failed') DEFAULT 'Pending',
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (fee_structure_id) REFERENCES fee_structures(id) ON DELETE CASCADE,
    INDEX idx_student_id (student_id),
    INDEX idx_transaction_id (transaction_id)
);

-- Sample data
INSERT INTO users (name, email, password_hash, role) VALUES
('Admin User', 'admin@gmail.com', '$2b$10$sample_hash_admin', 'admin'),
('Rahul Kumar', 'rahul.kumar@gmail.com', '$2b$10$sample_hash_rahul', 'student'),
('Priya Sharma', 'priya.sharma@gmail.com', '$2b$10$sample_hash_priya', 'student'),
('Arjun Patel', 'arjun.patel@gmail.com', '$2b$10$sample_hash_arjun', 'student')
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;

INSERT INTO fee_structures (branch, semester, amount, description) VALUES
('Computer Science Engineering', 5, 133000, 'Full semester fees for CSE Sem 5'),
('Electronics & Communication', 3, 130000, 'Full semester fees for ECE Sem 3'),
('Mechanical Engineering', 7, 128000, 'Full semester fees for ME Sem 7'),
('Civil Engineering', 1, 125000, 'Full semester fees for CE Sem 1')
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;
