-- created the database 
DROP DATABASE alumniDatabase;
CREATE DATABASE alumniDatabase;

-- use the database 
USE alumniDatabase;

-- create tables for storing users information 

CREATE TABLE users (
    id BINARY(16),
    id_text varchar(36) generated always as
        (insert(
            insert(
            insert(
                insert(hex(id),9,0,'-'),
                14,0,'-'),
            19,0,'-'),
            24,0,'-')
        ) virtual,
    email varchar(50) NOT NULL,
    password varchar(100) NOT NULL,
    admin BOOLEAN DEFAULT false,
    primary key(id) 
);

CREATE TABLE profile (
    userId varchar(50),
    
    sex SET('male', 'female', 'others') DEFAULT 'male',

    firstName varchar(64) NOT NULL,
    lastName varchar(64),
    dob varchar(10) NOT NULL,
    category  varchar(10),
    nationality varchar(15) NOT NULL,
    religion varchar(16),
    address varchar(128) NOT NULL,
    pincode varchar(10) NOT NULL,
    state  varchar(64) NOT NULL,
    city varchar(64) NOT NULL,
    country  varchar(64) NOT NULL,

    phone varchar(15), 
    altPhone varchar(14),

    email varchar(50) NOT NULL,
    altEmail varchar(255),
    
    linkedin varchar(50),
    github varchar(50),
    
    courseCompleted  varchar(255) NOT NULL,
    registrationNo varchar(20) NOT NULL,
    rollNo varchar(16),
    discipline  varchar(30),
    gradYear varchar(10),

    sign  varchar(255) DEFAULT NULL,
    passport varchar(255) DEFAULT NULL,

    PRIMARY KEY(userId)
);

CREATE TABLE alumnilist (
    id varchar(50) NOT NULL,
    userId varchar(50) NOT NULL,
    

    currentStatus SET('working', 'higher-education', 'preparing') DEFAULT 'preparing',
    preparingfor varchar(100) DEFAULT NULL,
    occupation varchar(30) DEFAULT NULL,
    organisation varchar(50) DEFAULT NULL,
    ctc decimal(10,2),
    ongoingCourseDetails varchar(40),
    ongoingCourseDiscipline varchar(40),
    ongoingCourseGradYear varchar(10),

    isApproved  SET('0', '-1', '1') DEFAULT '0',
    PRIMARY KEY(id)
);

CREATE TABLE organisationDetails 
(
    organisation  varchar(100) 
);