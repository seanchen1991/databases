CREATE DATABASE chat;

USE chat;



CREATE TABLE users (
  `usernames` varchar(20),
  `userID` int(10) NOT NULL auto_increment,
  PRIMARY KEY (userID)
);

CREATE TABLE messages (
  `content` varchar(256),
  `roomnames` varchar(20),
  `userID` int(10),
  FOREIGN KEY (userID) REFERENCES users(userID)
);


/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/




