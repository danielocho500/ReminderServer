DROP DATABASE IF EXISTS `reminder`;
CREATE DATABASE `reminder`;
USE reminder;

DROP TABLE IF EXISTS `Days`;
CREATE TABLE `Days` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `ReminderDays`;
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

DROP TABLE IF EXISTS `ReminderWaters`;
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

DROP TABLE IF EXISTS `Reminders`;
CREATE TABLE `Reminders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `hourBegin` time NOT NULL,
  `hourEnd` time NOT NULL,
  `repetitions` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  CONSTRAINT `Reminders_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `Users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `UserDatas`;
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

DROP TABLE IF EXISTS `Users`;
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

DROP TABLE IF EXISTS `WaterDays`;
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