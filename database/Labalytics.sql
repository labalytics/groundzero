-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: labalytics
-- ------------------------------------------------------
-- Server version	5.7.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookings` (
  `booking_id` int(11) NOT NULL AUTO_INCREMENT,
  `equipmentId` int(11) DEFAULT NULL,
  `equipmentUnitId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `userLabId` int(11) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `status` varchar(45) NOT NULL,
  `workingRate` decimal(6,2) NOT NULL,
  `nonWorkingRate` decimal(6,2) NOT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `usk_idx` (`userId`),
  KEY `lky_idx` (`userLabId`),
  KEY `eky_idx` (`equipmentId`),
  KEY `uky_idx` (`equipmentUnitId`),
  CONSTRAINT `FK2rgb3wqoda92euxecb2agubec` FOREIGN KEY (`userId`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FK4p5yn27hipcmu1wot8wssamqr` FOREIGN KEY (`equipmentId`) REFERENCES `equipments` (`id`),
  CONSTRAINT `FKq4hua60t6bvanflshtdmdr9w4` FOREIGN KEY (`equipmentUnitId`) REFERENCES `equipment_units` (`id`),
  CONSTRAINT `FKq7ixvf5lgtxw9uegajhpk7xcq` FOREIGN KEY (`userLabId`) REFERENCES `labs` (`lab_id`),
  CONSTRAINT `eky` FOREIGN KEY (`equipmentId`) REFERENCES `equipments` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `lky` FOREIGN KEY (`userLabId`) REFERENCES `labs` (`lab_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `uky` FOREIGN KEY (`equipmentUnitId`) REFERENCES `equipment_units` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `usk` FOREIGN KEY (`userId`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,93,94,46,47,'2017-03-10 18:00:00','2017-03-10 19:00:00','Active',1.00,2.00),(102,NULL,98,46,63,'2017-04-29 15:00:00','2017-04-29 16:00:00','Active',12.00,34.00),(103,NULL,94,46,47,'2017-04-29 15:00:00','2017-04-29 16:00:00','Active',12.00,123.00),(104,NULL,94,46,47,'2017-04-28 15:00:00','2017-04-28 16:00:00','Active',12.00,123.00),(105,NULL,72,69,47,'2017-04-30 11:00:00','2017-04-30 11:59:00','Active',12.00,13.00),(106,NULL,72,69,47,'2017-04-30 03:01:00','2017-04-30 04:00:00','Active',12.00,13.00);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipment_units`
--

DROP TABLE IF EXISTS `equipment_units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipment_units` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `equipment_id` int(11) NOT NULL,
  `units_count` int(11) NOT NULL,
  `available_count` int(11) NOT NULL,
  `parent_equip` int(11) DEFAULT NULL,
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `eid_idx` (`equipment_id`),
  KEY `pid_idx` (`parent_equip`),
  CONSTRAINT `FKinqjj4jxcqixj9naplag0vqws` FOREIGN KEY (`equipment_id`) REFERENCES `equipments` (`id`),
  CONSTRAINT `FKktfptwnx0h5dt1h8lho4qyyvr` FOREIGN KEY (`parent_equip`) REFERENCES `equipments` (`id`),
  CONSTRAINT `eid` FOREIGN KEY (`equipment_id`) REFERENCES `equipments` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `pid` FOREIGN KEY (`parent_equip`) REFERENCES `equipments` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment_units`
--

LOCK TABLES `equipment_units` WRITE;
/*!40000 ALTER TABLE `equipment_units` DISABLE KEYS */;
INSERT INTO `equipment_units` VALUES (72,71,2,2,NULL,'Active'),(74,73,12,12,NULL,'Active'),(94,93,240,240,NULL,'Active'),(95,93,240,240,NULL,'Active'),(96,93,240,240,NULL,'Active'),(98,97,123,123,NULL,'Active'),(99,97,123,123,NULL,'Active');
/*!40000 ALTER TABLE `equipment_units` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipments`
--

DROP TABLE IF EXISTS `equipments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `nonworking_rate` double NOT NULL,
  `status` varchar(255) NOT NULL,
  `usage_notification` bigint(20) NOT NULL,
  `working_rate` double NOT NULL,
  `labid` int(11) NOT NULL,
  `equipmentType` varchar(15) NOT NULL,
  `parent_equip` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `labPK_idx` (`labid`),
  KEY `fk_idx` (`labid`),
  KEY `FKt6lxhd3yw5gm2y60xc4hlbj1y` (`parent_equip`),
  CONSTRAINT `FK2tttc3ltermet8vwittciqv4b` FOREIGN KEY (`labid`) REFERENCES `labs` (`lab_id`),
  CONSTRAINT `FKt6lxhd3yw5gm2y60xc4hlbj1y` FOREIGN KEY (`parent_equip`) REFERENCES `equipments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipments`
--

LOCK TABLES `equipments` WRITE;
/*!40000 ALTER TABLE `equipments` DISABLE KEYS */;
INSERT INTO `equipments` VALUES (71,'Router','Router','Non-Reusable',13,'Active',80,12,47,'',NULL),(73,'Cables','Cables','Non-Reusable',3,'Active',50,1,47,'',NULL),(93,'New','Telescope','Reusable',123,'Active',80,12,47,'Equipment',NULL),(97,'Direct Motor','DC Engine','Reusable',34,'Active',70,12,76,'Equipment',NULL);
/*!40000 ALTER TABLE `equipments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (108),(108),(108),(108),(108);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lab_permissions`
--

DROP TABLE IF EXISTS `lab_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lab_permissions` (
  `lab_permissions_id` int(11) NOT NULL AUTO_INCREMENT,
  `current_lab_id` int(11) NOT NULL,
  `requested_lab_id` int(11) NOT NULL,
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`lab_permissions_id`),
  KEY `labId_idx` (`current_lab_id`),
  KEY `forif_idx` (`requested_lab_id`),
  CONSTRAINT `FK2a55n24ls0fa6feii59wlcp9q` FOREIGN KEY (`requested_lab_id`) REFERENCES `labs` (`lab_id`),
  CONSTRAINT `FK5yf09xlw46jtynwdp5ndo0g8o` FOREIGN KEY (`current_lab_id`) REFERENCES `labs` (`lab_id`),
  CONSTRAINT `foreignid` FOREIGN KEY (`current_lab_id`) REFERENCES `labs` (`lab_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `forif` FOREIGN KEY (`requested_lab_id`) REFERENCES `labs` (`lab_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lab_permissions`
--

LOCK TABLES `lab_permissions` WRITE;
/*!40000 ALTER TABLE `lab_permissions` DISABLE KEYS */;
INSERT INTO `lab_permissions` VALUES (80,63,76,'Active'),(85,76,47,'Active'),(88,76,63,'Active');
/*!40000 ALTER TABLE `lab_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labs`
--

DROP TABLE IF EXISTS `labs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `labs` (
  `lab_id` int(11) NOT NULL AUTO_INCREMENT,
  `lab_name` varchar(45) NOT NULL,
  `lab_pi` varchar(45) DEFAULT NULL,
  `description` varchar(20) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`lab_id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labs`
--

LOCK TABLES `labs` WRITE;
/*!40000 ALTER TABLE `labs` DISABLE KEYS */;
INSERT INTO `labs` VALUES (47,'Networks','Kalyan',NULL,'Active'),(63,'Algorithms','Sriram',NULL,'Active'),(76,'Machines','Sai',NULL,'Active');
/*!40000 ALTER TABLE `labs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_access`
--

DROP TABLE IF EXISTS `role_access`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_access` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_menu_id` int(11) NOT NULL,
  `menu_name` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKn4kfy7i55cucsytjftqb3kj5d` (`role_menu_id`),
  CONSTRAINT `FKn4kfy7i55cucsytjftqb3kj5d` FOREIGN KEY (`role_menu_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_access`
--

LOCK TABLES `role_access` WRITE;
/*!40000 ALTER TABLE `role_access` DISABLE KEYS */;
INSERT INTO `role_access` VALUES (1,1,'Dashboard','Active'),(2,1,'Labs','Active'),(3,1,'Students','Active'),(4,1,'Equipments','Active'),(5,1,'Schedule','Active'),(6,2,'Dashboard','Active'),(7,2,'Labs','Active'),(8,2,'Equipments','Active'),(9,2,'Schedule','Active'),(10,3,'Dashboard','Active'),(11,3,'Labs','Active'),(12,3,'Students','Active'),(13,1,'Billing','Active'),(14,1,'Equipment Usage','Active'),(15,1,'Lab Usage','Active');
/*!40000 ALTER TABLE `role_access` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(45) NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `roleName_UNIQUE` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Manager','Active'),(2,'Stutent','Active'),(3,'Admin',NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_lab_roles`
--

DROP TABLE IF EXISTS `user_lab_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_lab_roles` (
  `user_lab_role_id` bigint(20) NOT NULL,
  `lab_id` int(11) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`user_lab_role_id`),
  KEY `roleId_idx` (`role_id`),
  KEY `labId_idx` (`lab_id`),
  KEY `FKhlnibwx9jv3oo8curmoi8ykxr` (`user_id`),
  CONSTRAINT `FKae7ek0qm5m5pis7uorq4w8dn3` FOREIGN KEY (`lab_id`) REFERENCES `labs` (`lab_id`),
  CONSTRAINT `FKfw6ydbegobjkkudsumu40mal` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`),
  CONSTRAINT `FKhlnibwx9jv3oo8curmoi8ykxr` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `lab_id` FOREIGN KEY (`lab_id`) REFERENCES `labs` (`lab_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_lab_roles`
--

LOCK TABLES `user_lab_roles` WRITE;
/*!40000 ALTER TABLE `user_lab_roles` DISABLE KEYS */;
INSERT INTO `user_lab_roles` VALUES (1,NULL,3,1,'Active'),(48,47,1,46,'Active'),(64,63,1,46,'Active'),(70,47,2,69,'Active'),(77,76,1,75,'Active'),(87,63,2,86,'Active');
/*!40000 ALTER TABLE `user_lab_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email_id` varchar(45) NOT NULL,
  `password_hash` varchar(256) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `phone_no` varchar(45) DEFAULT NULL,
  `confirmations_token` varchar(45) DEFAULT NULL,
  `confirmation_token` varchar(255) DEFAULT NULL,
  `date_creation` datetime DEFAULT NULL,
  `validated` bit(1) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `emailId_UNIQUE` (`email_id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'labalytics@gmail.com','$2a$10$77QChMXNyBalHVJgql/WsebV0ITlfIY8iL9.3/8XqYG3nkV3tqGXi','Admin','Kalyan Moguloju',NULL,NULL,'1487515e-c2dd-4ddc-a16b-4298e2bd3577','2017-03-10 18:54:14','\0','Active'),(46,'kalyansaim@gmail.com','$2a$10$F7A02rb.yKwvcw85CT8wNOhsK7Qau1cEOj5keUc1PcFcj0e7./NrS','Manager','Kalyan Moguloju',NULL,NULL,NULL,'2017-04-05 23:06:09','','Active'),(69,'sai-kalyanmoguloju@uiowa.edu','$2a$10$OyeI/T79OaO1oIFAXRDej.BA.2y0S4arwpXATsGFzhyIcXlLwJS16','Student','Moguloju',NULL,NULL,NULL,'2017-04-06 00:04:03','','Active'),(75,'msaikalyan@yahoo.com','$2a$10$gwg/9MNX7o6gJAmejqLSdeYcSexVV4fE/CNwUMuDNbiM0ifIZoGYq','Test','Manager',NULL,NULL,NULL,'2017-04-07 01:08:13','','Active'),(86,'kalyankanna32@gmail.com','$2a$10$lSHlloiUsKpXSFLiMXpzT.uyqmpgTLBZ5ZCIW1Mjwmu9Q8mDkdFwq','Sai','Kalyan Moguloju',NULL,NULL,'bffcf8b4-b1c0-4f74-82a5-0f1acc3753ec','2017-04-17 21:14:07','','Active');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-01 22:23:44
