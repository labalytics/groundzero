CREATE DATABASE  IF NOT EXISTS `labalytics` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `labalytics`;
-- MySQL dump 10.13  Distrib 5.7.9, for osx10.9 (x86_64)
--
-- Host: 127.0.0.1    Database: labalytics
-- ------------------------------------------------------
-- Server version	5.7.9

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
  `type` varchar(15) NOT NULL,
  `parent_equip` int(11) DEFAULT NULL,
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `eid_idx` (`equipment_id`),
  KEY `pid_idx` (`parent_equip`),
  CONSTRAINT `FKinqjj4jxcqixj9naplag0vqws` FOREIGN KEY (`equipment_id`) REFERENCES `equipments` (`id`),
  CONSTRAINT `FKktfptwnx0h5dt1h8lho4qyyvr` FOREIGN KEY (`parent_equip`) REFERENCES `equipments` (`id`),
  CONSTRAINT `eid` FOREIGN KEY (`equipment_id`) REFERENCES `equipments` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `pid` FOREIGN KEY (`parent_equip`) REFERENCES `equipments` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment_units`
--

LOCK TABLES `equipment_units` WRITE;
/*!40000 ALTER TABLE `equipment_units` DISABLE KEYS */;
INSERT INTO `equipment_units` VALUES (1,1,11,11,'Equipment',NULL,'Active'),(2,2,11,1,'Equipment',NULL,'Active'),(21,20,123,123,'Equipment',NULL,'Active'),(23,22,1234,1234,'Equipment',NULL,'Active'),(24,22,1234,1234,'Equipment',NULL,'Active');
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
  PRIMARY KEY (`id`),
  KEY `labPK_idx` (`labid`),
  KEY `fk_idx` (`labid`),
  CONSTRAINT `FK2tttc3ltermet8vwittciqv4b` FOREIGN KEY (`labid`) REFERENCES `labs` (`lab_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipments`
--

LOCK TABLES `equipments` WRITE;
/*!40000 ALTER TABLE `equipments` DISABLE KEYS */;
INSERT INTO `equipments` VALUES (1,'Test','Test','Re-usable',12,'Active',90,11,5),(2,'Test','Test','Re-usable',12,'Active',90,11,11),(20,'Test123','Testtubes','Non-Reusable',11,'Active',60,13,5),(22,'Test12345','Testtubes','Reusable',11,'Active',60,13,5);
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
INSERT INTO `hibernate_sequence` VALUES (25),(25),(25),(25),(25);
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
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`lab_permissions_id`),
  KEY `labId_idx` (`current_lab_id`),
  KEY `forif_idx` (`requested_lab_id`),
  CONSTRAINT `FK2a55n24ls0fa6feii59wlcp9q` FOREIGN KEY (`requested_lab_id`) REFERENCES `labs` (`lab_id`),
  CONSTRAINT `FK5yf09xlw46jtynwdp5ndo0g8o` FOREIGN KEY (`current_lab_id`) REFERENCES `labs` (`lab_id`),
  CONSTRAINT `foreignid` FOREIGN KEY (`current_lab_id`) REFERENCES `labs` (`lab_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `forif` FOREIGN KEY (`requested_lab_id`) REFERENCES `labs` (`lab_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lab_permissions`
--

LOCK TABLES `lab_permissions` WRITE;
/*!40000 ALTER TABLE `lab_permissions` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labs`
--

LOCK TABLES `labs` WRITE;
/*!40000 ALTER TABLE `labs` DISABLE KEYS */;
INSERT INTO `labs` VALUES (5,'Testing','Kalyan',NULL,NULL),(9,'h','k',NULL,NULL),(11,'Manager','Sai Kalyan Moguloju',NULL,NULL),(14,'NEW','Sai Kalyan Moguloju',NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_access`
--

LOCK TABLES `role_access` WRITE;
/*!40000 ALTER TABLE `role_access` DISABLE KEYS */;
INSERT INTO `role_access` VALUES (1,1,'Labs','Active'),(2,1,'Students','Active'),(3,1,'Equipments','Active');
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
  `lab_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` int(11) DEFAULT NULL,
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
INSERT INTO `user_lab_roles` VALUES (7,5,1,4,NULL),(8,5,1,5,NULL),(9,5,1,6,NULL),(11,5,1,8,NULL),(12,11,2,4,NULL),(15,14,1,13,NULL),(17,5,2,16,NULL),(19,5,2,18,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'msaikalyan@yahoo.com','kkkkk','Sai','Kalyan',NULL,NULL,NULL,NULL,NULL,NULL),(4,'kalyansaim@gmail.com','$2a$10$77QChMXNyBalHVJgql/WsebV0ITlfIY8iL9.3/8XqYG3nkV3tqGXi','Sai','Kalyan Moguloju',NULL,NULL,'1487515e-c2dd-4ddc-a16b-4298e2bd3577','2017-03-10 18:54:14','\0',NULL),(5,'abc.gmal.com','$2a$10$77QChMXNyBalHVJgql/WsebV0ITlfIY8iL9.3/8XqYG3nkV3tqGXi','Test','Test',NULL,NULL,NULL,NULL,NULL,NULL),(6,'abc1.gmal.com','$2a$10$77QChMXNyBalHVJgql/WsebV0ITlfIY8iL9.3/8XqYG3nkV3tqGXi','Test1','Test1',NULL,NULL,NULL,NULL,NULL,NULL),(7,'abc2.gmal.com','$2a$10$77QChMXNyBalHVJgql/WsebV0ITlfIY8iL9.3/8XqYG3nkV3tqGXi','Test2','Test2',NULL,NULL,NULL,NULL,NULL,NULL),(8,'abc3.gmal.com','$2a$10$77QChMXNyBalHVJgql/WsebV0ITlfIY8iL9.3/8XqYG3nkV3tqGXi','Test3','Test3',NULL,NULL,NULL,NULL,NULL,NULL),(13,'kalyansaim6@gmail.com','$2a$10$TkT2o65gQQxwP8k.NxCNYesxzPWdrs0RpekG6kufsu95zC0JnDVeu','Sai','Kalyan Moguloju',NULL,NULL,'805a2b69-0b8f-4a2c-9d14-bff46f2fdbe2','2017-03-28 17:27:52','\0',NULL),(16,'kaljyansaim@gmail.com','$2a$10$A8eJQHHV.HZbsdR5K30oEOoE1domuz.Iy7bwV76msASSs/NIu.4ra','Sai','Kalyan Moguloju',NULL,NULL,'9e566ecd-1d36-4cc4-96bc-168e723c8e76','2017-03-29 02:09:45','\0',NULL),(18,'testing@gmail.com','$2a$10$aII7x9lk6nlkarM.2pej6.1BYgT675FwPlMkwSU7lmjEEAtacRXBm','Sai','Kalyan Moguloju',NULL,NULL,'c38ddaa6-317f-4fbb-9b6b-242b469d507a','2017-03-29 02:13:23','\0',NULL);
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

-- Dump completed on 2017-03-30  0:59:07
