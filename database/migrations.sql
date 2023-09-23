CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY ,
    name VARCHAR(40),
    phone_number VARCHAR(15),
    password VARCHAR(64)
);

CREATE TABLE conversations(
    id INT AUTO_INCREMENT PRIMARY KEY ,
    member_1 INT REFERENCES users(id) ON DELETE SET NULL ,
    member_2 INT REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE messages(
    id INT AUTO_INCREMENT PRIMARY KEY ,
    content longtext,
    conversation_id INT REFERENCES conversations(id) ON DELETE cascade ,
    sent_by INT REFERENCES users(id) ON DELETE set null
);