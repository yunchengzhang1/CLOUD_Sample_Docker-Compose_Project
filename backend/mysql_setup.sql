CREATE DATABASE db;
USE db;
CREATE TABLE users (
	userID varchar(255),
	username varchar(255),
	userEmail varchar(255),
	password varchar(255),
	role varchar(255)
	);

CREATE TABLE friends (
	userID1 varchar(255),
	userID2 varchar(255)
	);


CREATE TABLE battles (
	battleID varchar(255),
	battleTopic varchar(255),
    battleDescription varchar(1024),
	user1 varchar(255),
	user2 varchar(255),
	timeCreated datetime,
	timeClosed datetime
	);

CREATE TABLE messages (
	messageID varchar(255),
	battleID varchar(255),
	message varchar(1024),
	senderName varchar(255),
	senderID int(11),
	timestamp datetime
	);
	
