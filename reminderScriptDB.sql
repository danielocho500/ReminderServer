-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)
--
-- Host: localhost    Database: reminder
-- ------------------------------------------------------
-- Server version	8.0.31-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Days`
--

DROP TABLE IF EXISTS `Days`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Days` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Days`
--

LOCK TABLES `Days` WRITE;
/*!40000 ALTER TABLE `Days` DISABLE KEYS */;
INSERT INTO `Days` VALUES (2,'Monday','2022-11-02 22:45:14','2022-11-02 22:45:14'),(3,'Tuesday','2022-11-02 22:45:14','2022-11-02 22:45:14'),(4,'Wednesday','2022-11-02 22:45:14','2022-11-02 22:45:14'),(5,'Thursday','2022-11-02 22:45:14','2022-11-02 22:45:14'),(6,'Friday','2022-11-02 22:45:15','2022-11-02 22:45:15'),(7,'Saturday','2022-11-02 22:45:15','2022-11-02 22:45:15'),(8,'Sunday','2022-11-02 22:45:15','2022-11-02 22:45:15');
/*!40000 ALTER TABLE `Days` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ReminderDays`
--

DROP TABLE IF EXISTS `ReminderDays`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ReminderDays`
--

LOCK TABLES `ReminderDays` WRITE;
/*!40000 ALTER TABLE `ReminderDays` DISABLE KEYS */;
/*!40000 ALTER TABLE `ReminderDays` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ReminderWaters`
--

DROP TABLE IF EXISTS `ReminderWaters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ReminderWaters`
--

LOCK TABLES `ReminderWaters` WRITE;
/*!40000 ALTER TABLE `ReminderWaters` DISABLE KEYS */;
/*!40000 ALTER TABLE `ReminderWaters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reminders`
--

DROP TABLE IF EXISTS `Reminders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reminders`
--

LOCK TABLES `Reminders` WRITE;
/*!40000 ALTER TABLE `Reminders` DISABLE KEYS */;
/*!40000 ALTER TABLE `Reminders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserDatas`
--

DROP TABLE IF EXISTS `UserDatas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserDatas`
--

LOCK TABLES `UserDatas` WRITE;
/*!40000 ALTER TABLE `UserDatas` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserDatas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WaterDays`
--

DROP TABLE IF EXISTS `WaterDays`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WaterDays`
--

LOCK TABLES `WaterDays` WRITE;
/*!40000 ALTER TABLE `WaterDays` DISABLE KEYS */;
/*!40000 ALTER TABLE `WaterDays` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-02 22:48:39
