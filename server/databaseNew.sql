-- created the database 
DROP DATABASE alumniDatabase;
CREATE DATABASE alumniDatabase;

-- use the database 
USE alumniDatabase;

CREATE TABLE users (
    id char(36) NOT NULL DEFAULT (UUID()),
    email varchar(50) NOT NULL UNIQUE,
    password varchar(100) NOT NULL,
    role set('admin', 'user') default 'user',
    primary key(id)
);

CREATE TABLE profiles (
    userId char(36) NOT NULL,    
    title SET('mr', 'mrs', 'ms', 'dr') NOT NULL,
    firstName varchar(64) NOT NULL,
    lastName varchar(64),
    dob varchar(10) NOT NULL,
    sex SET('male', 'female', 'others') NOT NULL,
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
    altEmail varchar(255),
    linkedin varchar(50),
    github varchar(50),

    registrationNo varchar(20) NOT NULL,
    rollNo varchar(16),

    sign  varchar(255) DEFAULT NULL,
    passport varchar(255) DEFAULT NULL,

    PRIMARY KEY(userId),
    FOREIGN KEY(userId) REFERENCES users(id)
);

-- create table for storing academics details of users, having foreign key as userId from profile table
CREATE TABLE academics (
    id varchar(50) NOT NULL,
    userId char(36) NOT NULL,
    type SET('part-time', 'full-time') DEFAULT 'full-time',
    institute varchar(50) NOT NULL,
    degree varchar(50) NOT NULL,
    discipline varchar(50) NOT NULL,
    startDate varchar(10) NOT NULL,
    endDate varchar(10) DEFAULT 'present',
    description varchar(255) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(userId) REFERENCES profiles(userId)
);

-- create table for storing experience (job and internship) details of users having foreign key as userId from profile table
CREATE TABLE experiences (
    id varchar(50) NOT NULL,
    userId char(36) NOT NULL,
    type SET('job', 'internship') DEFAULT 'job',
    organisation varchar(50) NOT NULL,
    designation varchar(50) NOT NULL,
    startDate varchar(10) NOT NULL,
    endDate varchar(10) DEFAULT 'present',
    ctc decimal(10,2),
    description varchar(255) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(userId) REFERENCES profiles(userId)
);

-- CREATE TABLE alumnilist (
--     id varchar(50) NOT NULL,
--     userId varchar(50) NOT NULL,

--     currentStatus SET('working', 'higher-education', 'preparing') DEFAULT 'preparing',
--     preparingfor varchar(100) DEFAULT NULL,
--     occupation varchar(30) DEFAULT NULL,
--     organisation varchar(50) DEFAULT NULL,
--     ctc decimal(10,2),
--     ongoingCourseDetails varchar(40),
--     ongoingCourseDiscipline varchar(40),
--     ongoingCourseGradYear varchar(10),

--     isApproved  SET('0', '-1', '1') DEFAULT '0',
--     PRIMARY KEY(id)
-- );

CREATE TABLE organisationDetails 
(
    organisation  varchar(100) 
);