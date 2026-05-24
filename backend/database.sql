-- database.sql
CREATE DATABASE IF NOT EXISTS mock_interview;
USE mock_interview;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS interview_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS interview_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    type ENUM('technical', 'behavioral', 'coding', 'hr') NOT NULL,
    difficulty ENUM('beginner', 'intermediate', 'advanced') NOT NULL,
    question TEXT NOT NULL,
    expected_answer TEXT,
    FOREIGN KEY (category_id) REFERENCES interview_categories(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS interviews (
    id VARCHAR(50) PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    difficulty ENUM('beginner', 'intermediate', 'advanced') NOT NULL,
    duration INT NOT NULL, -- in minutes
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    score_communication INT DEFAULT 0,
    score_technical INT DEFAULT 0,
    score_confidence INT DEFAULT 0,
    score_overall INT DEFAULT 0,
    feedback TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES interview_categories(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS interview_answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    interview_id VARCHAR(50) NOT NULL,
    question_id INT NOT NULL,
    user_answer TEXT,
    audio_path VARCHAR(255),
    score INT DEFAULT 0,
    FOREIGN KEY (interview_id) REFERENCES interviews(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES interview_questions(id) ON DELETE CASCADE
);

-- Seed Categories
INSERT IGNORE INTO interview_categories (slug, name) VALUES 
('frontend', 'Frontend Development'),
('backend', 'Backend Development'),
('fullstack', 'Full Stack Development'),
('devops', 'DevOps'),
('data-science', 'Data Science'),
('mobile', 'Mobile Development'),
('system-design', 'System Design'),
('behavioral', 'Behavioral'),
('hr', 'HR'),
('database', 'Database'),
('communication', 'Communication'),
('security', 'Security & Networking'),
('web', 'Web Technologies');

-- Seed Questions (A representative subset to start)
-- Technical Questions
INSERT IGNORE INTO interview_questions (category_id, type, difficulty, question, expected_answer) VALUES
(1, 'technical', 'beginner', 'What is the Virtual DOM in React?', 'The Virtual DOM is a lightweight copy of the actual DOM in memory...'),
(1, 'technical', 'intermediate', 'Explain the concept of closures in JavaScript.', 'A closure is the combination of a function bundled together with references to its surrounding state...'),
(1, 'technical', 'advanced', 'How would you optimize the performance of a React application with many re-renders?', 'Use React.memo, useMemo, useCallback, and properly structure the state...'),
(2, 'technical', 'beginner', 'What is a REST API?', 'REST stands for Representational State Transfer, an architectural style for APIs...'),
(2, 'technical', 'intermediate', 'Explain the difference between SQL and NoSQL databases.', 'SQL databases are relational and have a structured schema, while NoSQL databases are non-relational...'),
(2, 'technical', 'advanced', 'How do you prevent SQL injection in PHP?', 'Use prepared statements and parameterized queries (e.g., using PDO)...');

-- HR / Behavioral Questions
INSERT IGNORE INTO interview_questions (category_id, type, difficulty, question, expected_answer) VALUES
(8, 'behavioral', 'beginner', 'Tell me about yourself.', 'Focus on professional background and relevant experience...'),
(8, 'behavioral', 'intermediate', 'Describe a challenging project you worked on and how you overcame obstacles.', 'Use the STAR method (Situation, Task, Action, Result)...'),
(9, 'hr', 'intermediate', 'Where do you see yourself in 5 years?', 'Show ambition but align it with the company goals and role...'),
(9, 'hr', 'advanced', 'How do you handle conflicts with team members?', 'Communicate openly, listen to their perspective, and find a professional compromise...');


-- FRONTEND QUESTIONS
INSERT IGNORE INTO interview_questions (category_id, type, difficulty, question, expected_answer) VALUES
(1, 'technical', 'beginner', 'What is HTML?', 'HTML is the standard markup language for creating web pages.'),
(1, 'technical', 'beginner', 'What is CSS?', 'CSS is used to style HTML elements.'),
(1, 'technical', 'intermediate', 'What is React state?', 'State is used to store dynamic data in React components.'),
(1, 'technical', 'intermediate', 'Difference between let var and const?', 'let and const are block scoped while var is function scoped.'),
(1, 'technical', 'advanced', 'Explain React hooks.', 'Hooks allow functional components to use state and lifecycle methods.'),
(1, 'coding', 'advanced', 'Create a responsive navbar.', 'Use flexbox and media queries.');

-- BACKEND QUESTIONS
INSERT IGNORE INTO interview_questions (category_id, type, difficulty, question, expected_answer) VALUES
(2, 'technical', 'beginner', 'What is PHP?', 'PHP is a server-side scripting language.'),
(2, 'technical', 'beginner', 'What is Node.js?', 'Node.js allows JavaScript to run on the server.'),
(2, 'technical', 'intermediate', 'Explain middleware.', 'Middleware processes requests before response.'),
(2, 'technical', 'intermediate', 'What is authentication?', 'Authentication verifies user identity.'),
(2, 'technical', 'advanced', 'Explain JWT.', 'JWT is used for secure authentication using tokens.'),
(2, 'coding', 'advanced', 'Create a REST API endpoint.', 'Use CRUD operations with database.');

-- FULLSTACK QUESTIONS
INSERT IGNORE INTO interview_questions (category_id, type, difficulty, question, expected_answer) VALUES
(3, 'technical', 'beginner', 'What is Full Stack Development?', 'Frontend + Backend development together.'),
(3, 'technical', 'intermediate', 'Explain MERN stack.', 'MongoDB Express React Node.js'),
(3, 'technical', 'advanced', 'How frontend connects with backend?', 'Using APIs and HTTP requests.');

-- DEVOPS QUESTIONS
INSERT IGNORE INTO interview_questions (category_id, type, difficulty, question, expected_answer) VALUES
(4, 'technical', 'beginner', 'What is DevOps?', 'Combination of development and operations.'),
(4, 'technical', 'intermediate', 'What is Docker?', 'Docker is a containerization platform.'),
(4, 'technical', 'advanced', 'Explain CI/CD.', 'Continuous Integration and Continuous Deployment.');

-- DATA SCIENCE QUESTIONS
INSERT IGNORE INTO interview_questions (category_id, type, difficulty, question, expected_answer) VALUES
(5, 'technical', 'beginner', 'What is Data Science?', 'Analyzing data to extract insights.'),
(5, 'technical', 'intermediate', 'Difference between AI and ML?', 'ML is subset of AI.'),
(5, 'technical', 'advanced', 'Explain overfitting.', 'Model performs well on training but poorly on testing.');

-- MOBILE QUESTIONS
INSERT IGNORE INTO interview_questions (category_id, type, difficulty, question, expected_answer) VALUES
(6, 'technical', 'beginner', 'What is Android?', 'Mobile operating system by Google.'),
(6, 'technical', 'intermediate', 'Difference between React Native and Flutter?', 'React Native uses JS while Flutter uses Dart.'),
(6, 'technical', 'advanced', 'Explain app lifecycle.', 'States through which mobile apps pass.');

-- SYSTEM DESIGN QUESTIONS
INSERT IGNORE INTO interview_questions (category_id, type, difficulty, question, expected_answer) VALUES
(7, 'technical', 'beginner', 'What is system design?', 'Designing scalable systems.'),
(7, 'technical', 'intermediate', 'Explain load balancing.', 'Distributes traffic across servers.'),
(7, 'technical', 'advanced', 'How would you design YouTube?', 'Use distributed storage caching and CDN.');

-- BEHAVIORAL QUESTIONS
INSERT IGNORE INTO interview_questions (category_id, type, difficulty, question, expected_answer) VALUES
(8, 'behavioral', 'beginner', 'What are your strengths?', 'Mention professional strengths.'),
(8, 'behavioral', 'intermediate', 'Describe a failure.', 'Explain lesson learned from failure.'),
(8, 'behavioral', 'advanced', 'How do you work under pressure?', 'Discuss prioritization and calmness.');

-- HR QUESTIONS
INSERT IGNORE INTO interview_questions (category_id, type, difficulty, question, expected_answer) VALUES
(9, 'hr', 'beginner', 'Why should we hire you?', 'Mention skills and value.'),
(9, 'hr', 'intermediate', 'Why do you want this job?', 'Align goals with company mission.'),
(9, 'hr', 'advanced', 'Why are you leaving your current role?', 'Answer professionally.');

-- DATABASE QUESTIONS
INSERT IGNORE INTO interview_questions (category_id, type, difficulty, question, expected_answer) VALUES
(10, 'technical', 'beginner', 'What is a database?', 'Structured collection of data.'),
(10, 'technical', 'intermediate', 'Difference between primary key and foreign key?', 'Primary identifies row foreign links tables.'),
(10, 'technical', 'advanced', 'Explain normalization.', 'Process of reducing redundancy.');

-- COMMUNICATION QUESTIONS
INSERT IGNORE INTO interview_questions (category_id, type, difficulty, question, expected_answer) VALUES
(11, 'behavioral', 'beginner', 'How do you communicate in teams?', 'Use clear and respectful communication.'),
(11, 'behavioral', 'intermediate', 'How do you explain technical topics to non technical people?', 'Use simple examples.'),
(11, 'behavioral', 'advanced', 'How do you handle misunderstandings?', 'Clarify calmly and professionally.');


-- EXTRA QUESTIONS FOR EVERY CATEGORY
INSERT IGNORE INTO interview_questions (category_id, type, difficulty, question, expected_answer) VALUES
(1, 'technical', 'beginner', 'What are React props?', 'Props are arguments passed into React components.'),
(1, 'technical', 'intermediate', 'Explain CSS Grid vs Flexbox.', 'Grid is 2D, Flexbox is 1D layout model.'),
(2, 'technical', 'beginner', 'What is an API?', 'Application Programming Interface allows systems to communicate.'),
(2, 'technical', 'advanced', 'What is database sharding?', 'A type of database partitioning that separates large databases into smaller, faster, more easily managed parts.'),
(3, 'technical', 'intermediate', 'What is a RESTful architecture?', 'An architectural style that defines a set of constraints to be used for creating web services.'),
(4, 'technical', 'beginner', 'What is Git?', 'A distributed version control system.'),
(5, 'technical', 'intermediate', 'What is Python used for in Data Science?', 'Python is used for data analysis, machine learning, and visualization due to its rich ecosystem.'),
(6, 'technical', 'beginner', 'What is iOS?', 'A mobile operating system created and developed by Apple Inc.'),
(7, 'technical', 'advanced', 'Explain caching strategies.', 'Techniques like write-through, read-through, and cache-aside used to improve system performance.'),
(8, 'behavioral', 'intermediate', 'Tell me about a time you disagreed with a colleague.', 'Explain how you handled the situation professionally and reached a resolution.'),
(9, 'hr', 'beginner', 'What are your salary expectations?', 'Be honest and base it on market research and experience.'),
(10, 'technical', 'intermediate', 'What is an index in SQL?', 'A data structure that improves the speed of data retrieval operations.'),
(11, 'behavioral', 'intermediate', 'How do you give constructive feedback?', 'Use the sandwich method or focus on specific behaviors rather than personal attacks.'),
(12, 'technical', 'beginner', 'What is CORS?', 'Cross-Origin Resource Sharing is a mechanism that allows restricted resources on a web page to be requested from another domain.'),
(12, 'technical', 'advanced', 'How do you prevent XSS attacks?', 'Sanitize and encode user inputs, and use Content Security Policy (CSP).'),
(13, 'technical', 'beginner', 'What is HTTP/2?', 'A major revision of the HTTP network protocol used by the World Wide Web.'),
(13, 'technical', 'intermediate', 'What are WebSockets?', 'A computer communications protocol, providing full-duplex communication channels over a single TCP connection.');

-- Note: A dedicated seeder script can be used to insert the full 300+ questions to keep this file manageable.
