DROP DATABASE IF EXISTS `reminder`;
CREATE DATABASE `reminder`;
USE reminder;

CREATE TABLE `Users` (
  `uid` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `emailconfirmed` int NOT NULL,
  `isregistered` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `UserDatas` (
  `uid` varchar(100) NOT NULL,
  `weight` int NOT NULL,
  `height` int NOT NULL,
  `genre` varchar(1) NOT NULL,
  `activity` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  KEY `uid` (`uid`),
  CONSTRAINT `UserDatas_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `Users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `images`(
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `url` varchar(510) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
);

insert into images (name, url, createdAt, updatedAt) Values ('reloj', 'https://cdn-icons-png.flaticon.com/512/3073/3073471.png', NOW(), NOW());
insert into images (name, url, createdAt, updatedAt) Values ('agua', 'https://cdn-icons-png.flaticon.com/512/3248/3248369.png', NOW(), NOW());
insert into images (name, url, createdAt, updatedAt) Values ('actividad', 'https://cdn-icons-png.flaticon.com/512/983/983544.png', NOW(), NOW());

CREATE TABLE `Reminders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `hourBegin` time NOT NULL,
  `hourEnd` time NOT NULL,
  `minutesLapse` int NOT NULL,
  `image` int NOT NULL,
  `isActive` tinyint NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `Reminders_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `Users` (`uid`),
  CONSTRAINT `Reminders_ibfk_2` FOREIGN KEY (`image`) REFERENCES `Images` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Days` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ReminderDays` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dayID` int NOT NULL,
  `reminderId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `dayID` (`dayID`),
  KEY `reminderId` (`reminderId`),
  CONSTRAINT `ReminderDays_ibfk_1` FOREIGN KEY (`dayID`) REFERENCES `Days` (`id`),
  CONSTRAINT `ReminderDays_ibfk_2` FOREIGN KEY (`reminderId`) REFERENCES `Reminders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ReminderWaters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` varchar(100) NOT NULL,
  `hourBegin` time NOT NULL,
  `hourEnd` time NOT NULL,
  `amount` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  CONSTRAINT `ReminderWaters_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `Users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `WaterDays` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idReminder` int NOT NULL,
  `goal` int NOT NULL,
  `consumed` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idReminder` (`idReminder`),
  CONSTRAINT `WaterDays_ibfk_1` FOREIGN KEY (`idReminder`) REFERENCES `ReminderWaters` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO days (name, createdAt, updatedAt) VALUES ('Monday', NOW(), NOW());
INSERT INTO days (name, createdAt, updatedAt) VALUES ('Tuesday', NOW(), NOW());
INSERT INTO days (name, createdAt, updatedAt) VALUES ('Wednesday', NOW(), NOW());
INSERT INTO days (name, createdAt, updatedAt) VALUES ('Thursday', NOW(), NOW());
INSERT INTO days (name, createdAt, updatedAt) VALUES ('Friday', NOW(), NOW());
INSERT INTO days (name, createdAt, updatedAt) VALUES ('Saturday', NOW(), NOW());
INSERT INTO days (name, createdAt, updatedAt) VALUES ('Sunday', NOW(), NOW());

CREATE TABLE `Pins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `value` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Contacts`(
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
);