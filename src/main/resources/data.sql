INSERT INTO flash_card
(category, question, answer, create_at, last_answered_at,
 last_answered_status, on_cooldown, cool_down_end_time)
VALUES

-- ==================== JAVA ====================

('Java',
 'What is a class in Java?',
 'A blueprint used to create objects.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Java',
 'What is an object?',
 'An instance of a class.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Java',
 'What is inheritance?',
 'A mechanism that allows a class to inherit fields and methods from another class.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Java',
 'What is polymorphism?',
 'The ability for the same interface or method call to behave differently depending on the object.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Java',
 'What is encapsulation?',
 'The practice of bundling data and methods together while restricting direct access to internal state.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Java',
 'What is an interface?',
 'A contract that defines methods a class can implement.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Java',
 'What is a constructor?',
 'A special method used to initialize an object when it is created.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Java',
 'What does final mean when used on a variable?',
 'The variable can only be assigned once.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Java',
 'What is an exception?',
 'An event that occurs during program execution that disrupts the normal flow of the program.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Java',
 'What is an ArrayList?',
 'A resizable array implementation provided by the Java Collections Framework.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),


-- ==================== SPRING BOOT ====================

('Spring Boot',
 'What is Spring Boot?',
 'A framework that simplifies building and configuring Spring applications.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Spring Boot',
 'What does @RestController do?',
 'It marks a class as a controller whose methods typically return data directly as HTTP responses.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Spring Boot',
 'What does @GetMapping do?',
 'It maps HTTP GET requests to a controller method.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Spring Boot',
 'What does @PostMapping do?',
 'It maps HTTP POST requests to a controller method.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Spring Boot',
 'What does @RequestBody do?',
 'It maps the HTTP request body to a Java object.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Spring Boot',
 'What is dependency injection?',
 'A design pattern where dependencies are provided to a class instead of the class creating them itself.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Spring Boot',
 'What does @Entity mean?',
 'It marks a Java class as a JPA entity that can be mapped to a database table.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Spring Boot',
 'What is JpaRepository?',
 'A Spring Data interface that provides common database operations for an entity.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Spring Boot',
 'What is application.properties used for?',
 'It stores Spring Boot application configuration such as database and server settings.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Spring Boot',
 'What is an API endpoint?',
 'A specific URL and HTTP method through which a client can interact with a backend.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),


-- ==================== ANGULAR ====================

('Angular',
 'What is Angular?',
 'A TypeScript-based framework for building web applications.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Angular',
 'What is a component?',
 'A building block of an Angular application containing a template, logic, and styling.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Angular',
 'What is a service?',
 'A class used to provide reusable logic or data to Angular components.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Angular',
 'What is dependency injection in Angular?',
 'A system that provides required services or dependencies to components and other classes.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Angular',
 'What is an Observable?',
 'A mechanism for handling asynchronous streams of data over time.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Angular',
 'What does HttpClient do?',
 'It allows Angular applications to send HTTP requests to backend services.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Angular',
 'What is ngModel used for?',
 'It provides two-way data binding between a form control and a component property.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Angular',
 'What is a pipe?',
 'A feature used to transform data for display in an Angular template.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Angular',
 'What is routing?',
 'The mechanism used to navigate between different views or URLs in an Angular application.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Angular',
 'What is a signal?',
 'A reactive value that lets Angular track changes and update dependent parts of the UI.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),


-- ==================== SQL ====================

('SQL',
 'What does SQL stand for?',
 'Structured Query Language.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('SQL',
 'What is a database table?',
 'A structure that stores data in rows and columns.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('SQL',
 'What does SELECT do?',
 'It retrieves data from one or more database tables.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('SQL',
 'What does INSERT do?',
 'It adds new rows to a database table.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('SQL',
 'What does UPDATE do?',
 'It modifies existing rows in a database table.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('SQL',
 'What does DELETE do?',
 'It removes rows from a database table.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('SQL',
 'What is a primary key?',
 'A column or set of columns that uniquely identifies each row in a table.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('SQL',
 'What is a foreign key?',
 'A column that references a key in another table to establish a relationship.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('SQL',
 'What does WHERE do?',
 'It filters rows based on a specified condition.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('SQL',
 'What does JOIN do?',
 'It combines related rows from multiple tables.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),


-- ==================== GIT ====================

('Git',
 'What is Git?',
 'A distributed version control system used to track changes to files.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Git',
 'What does git init do?',
 'It creates a new Git repository in the current directory.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Git',
 'What does git clone do?',
 'It creates a local copy of an existing Git repository.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Git',
 'What does git status do?',
 'It shows the current state of the working directory and staging area.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Git',
 'What does git add do?',
 'It stages changes so they can be included in the next commit.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Git',
 'What does git commit do?',
 'It records staged changes in the repository history.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Git',
 'What does git push do?',
 'It uploads local commits to a remote repository.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Git',
 'What does git pull do?',
 'It fetches changes from a remote repository and integrates them into the current branch.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Git',
 'What is a branch?',
 'An independent line of development within a Git repository.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL),

('Git',
 'What is a merge?',
 'The process of combining changes from different branches.',
 CURRENT_TIMESTAMP, NULL, NULL, FALSE, NULL);