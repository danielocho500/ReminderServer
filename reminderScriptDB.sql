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
  `reminderId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reminderId` (`reminderId`),
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
  `uid` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `value` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `Todo_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `Users` (`uid`)
);

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

CREATE TABLE `Todos`(
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `endDate` datetime NOT NULL,
  `isActive` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `Todo_ibfk_6` FOREIGN KEY (`uid`) REFERENCES `Users` (`uid`)
);

CREATE TABLE Stats(
	id int NOT NULL AUTO_INCREMENT,
    uid varchar(100) NOT NULL,
    idReminder int NOT NULL,
    meta int NOT NULL,
    aceptadas int NOT NULL,
    fecha date NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    PRIMARY KEY (id),
    foreign key(idReminder) references reminders(id),
    foreign key(uid) references Users(uid)
);

INSERT INTO USERS (uid, password, username, email,emailconfirmed, isregistered, createdAt, updatedAt) VALUES ('133cb386-1b97-4636-910c-d066d8d825f7', '$2b$10$pb3Sqa9xXxF8orACUEqMOO2nAUg6kLWuDVJy8fWty5fcjDvdQ/Ddy', 'manu', 'danielnochess@gmail.com', '1', '1', NOW(), NOW());
INSERT INTO UserDatas (uid,weight,height,genre,activity,createdAt,updatedAt) VALUES ('133cb386-1b97-4636-910c-d066d8d825f7', '80', '180', 'M', '3', NOW(), NOW());
INSERT INTO Reminders (id,uid,name,hourBegin,hourEnd,minutesLapse,image,isActive, createdAt, updatedAt) VALUES (1, '133cb386-1b97-4636-910c-d066d8d825f7', 'Estirar ', '13:00:00', '15:10:00', '30', '2', '1', '2022-11-12 08:12:20', '2022-9-12 08:12:20');
INSERT INTO Stats (uid, idReminder, meta, aceptadas, fecha, createdAt, updatedAt) Values ('133cb386-1b97-4636-910c-d066d8d825f7',1, 4, 4, '2022-11-10', NOW(), NOW());
INSERT INTO Stats (uid, idReminder, meta, aceptadas, fecha, createdAt, updatedAt) Values ('133cb386-1b97-4636-910c-d066d8d825f7',1, 4, 3, '2022-11-11', NOW(), NOW());
INSERT INTO Stats (uid, idReminder, meta, aceptadas, fecha, createdAt, updatedAt) Values ('133cb386-1b97-4636-910c-d066d8d825f7',1, 4, 2, '2022-11-12', NOW(), NOW());
INSERT INTO Stats (uid, idReminder, meta, aceptadas, fecha, createdAt, updatedAt) Values ('133cb386-1b97-4636-910c-d066d8d825f7',1, 4, 1, '2022-11-13', NOW(), NOW());
INSERT INTO Stats (uid, idReminder, meta, aceptadas, fecha, createdAt, updatedAt) Values ('133cb386-1b97-4636-910c-d066d8d825f7',1, 4, 1, '2022-11-14', NOW(), NOW());
INSERT INTO Stats (uid, idReminder, meta, aceptadas, fecha, createdAt, updatedAt) Values ('133cb386-1b97-4636-910c-d066d8d825f7',1, 4, 2, '2022-11-17', NOW(), NOW());
INSERT INTO Stats (uid, idReminder, meta, aceptadas, fecha, createdAt, updatedAt) Values ('133cb386-1b97-4636-910c-d066d8d825f7',1, 4, 3, '2022-11-18', NOW(), NOW());
INSERT INTO Stats (uid, idReminder, meta, aceptadas, fecha, createdAt, updatedAt) Values ('133cb386-1b97-4636-910c-d066d8d825f7',1, 4, 4, '2022-11-21', NOW(), NOW());
INSERT INTO Stats (uid, idReminder, meta, aceptadas, fecha, createdAt, updatedAt) Values ('133cb386-1b97-4636-910c-d066d8d825f7',1, 4, 1, '2022-11-22', NOW(), NOW());
INSERT INTO Stats (uid, idReminder, meta, aceptadas, fecha, createdAt, updatedAt) Values ('133cb386-1b97-4636-910c-d066d8d825f7',1, 4, 2, '2022-11-23', NOW(), NOW());
INSERT INTO Stats (uid, idReminder, meta, aceptadas, fecha, createdAt, updatedAt) Values ('133cb386-1b97-4636-910c-d066d8d825f7',1, 4, 3, '2022-11-24', NOW(), NOW());
INSERT INTO Stats (uid, idReminder, meta, aceptadas, fecha, createdAt, updatedAt) Values ('133cb386-1b97-4636-910c-d066d8d825f7',1, 4, 1, '2022-11-27', NOW(), NOW());
INSERT INTO Stats (uid, idReminder, meta, aceptadas, fecha, createdAt, updatedAt) Values ('133cb386-1b97-4636-910c-d066d8d825f7',1, 4, 1, '2022-11-28', NOW(), NOW());
INSERT INTO Stats (uid, idReminder, meta, aceptadas, fecha, createdAt, updatedAt) Values ('133cb386-1b97-4636-910c-d066d8d825f7',1, 4, 1, '2022-11-29', NOW(), NOW());
INSERT INTO Stats (uid, idReminder, meta, aceptadas, fecha, createdAt, updatedAt) Values ('133cb386-1b97-4636-910c-d066d8d825f7',1, 4, 2, '2022-11-30', NOW(), NOW());
INSERT INTO Stats (uid, idReminder, meta, aceptadas, fecha, createdAt, updatedAt) Values ('133cb386-1b97-4636-910c-d066d8d825f7',1, 4, 3, '2022-12-2', NOW(), NOW());
INSERT INTO Stats (uid, idReminder, meta, aceptadas, fecha, createdAt, updatedAt) Values ('133cb386-1b97-4636-910c-d066d8d825f7',1, 4, 4, '2022-12-3', NOW(), NOW());
INSERT INTO Stats (uid, idReminder, meta, aceptadas, fecha, createdAt, updatedAt) Values ('133cb386-1b97-4636-910c-d066d8d825f7',1, 4, 2, '2022-12-4', NOW(), NOW());
INSERT INTO Stats (uid, idReminder, meta, aceptadas, fecha, createdAt, updatedAt) Values ('133cb386-1b97-4636-910c-d066d8d825f7',1, 4, 4, '2022-12-10', NOW(), NOW());
INSERT INTO Stats (uid, idReminder, meta, aceptadas, fecha, createdAt, updatedAt) Values ('133cb386-1b97-4636-910c-d066d8d825f7',1, 4, 1, '2022-12-11', NOW(), NOW());
INSERT INTO Stats (uid, idReminder, meta, aceptadas, fecha, createdAt, updatedAt) Values ('133cb386-1b97-4636-910c-d066d8d825f7',1, 4, 2, '2022-12-12', NOW(), NOW());
INSERT INTO Stats (uid, idReminder, meta, aceptadas, fecha, createdAt, updatedAt) Values ('133cb386-1b97-4636-910c-d066d8d825f7',1, 4, 2, '2022-12-13', NOW(), NOW());
INSERT INTO Stats (uid, idReminder, meta, aceptadas, fecha, createdAt, updatedAt) Values ('133cb386-1b97-4636-910c-d066d8d825f7',1, 4, 1, '2022-12-14', NOW(), NOW());


INSERT INTO Reminders (id,uid,name,hourBegin,hourEnd,minutesLapse,image,isActive, createdAt, updatedAt) VALUES (2, '133cb386-1b97-4636-910c-d066d8d825f7', 'Arrglar postura', '12:00:00', '16:10:00', '20', '3', '1', NOW(), NOW());

