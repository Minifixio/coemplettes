-- MariaDB dump 10.19  Distrib 10.6.12-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: COEMP
-- ------------------------------------------------------
-- Server version	10.6.12-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `status` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `cart_id` (`cart_id`),
  KEY `cart_items_ibfk_2` (`product_id`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`),
  CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (71,33,2,2,0);
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner_id` int(11) NOT NULL,
  `delivery_id` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT current_timestamp(),
  `deadline` datetime NOT NULL,
  `status` int(11) DEFAULT NULL,
  `average_price` float DEFAULT NULL,
  `delivery_proposal_id` int(11) DEFAULT NULL,
  `locker_id` int(11) DEFAULT NULL,
  `price_to_pay` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `owner_id` (`owner_id`),
  KEY `delivery_id` (`delivery_id`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`),
  CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`delivery_id`) REFERENCES `deliveries` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (33,21,3,'2023-03-23 15:16:56','2023-03-23 15:16:54',0,7.52,NULL,NULL,NULL);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(255) DEFAULT NULL,
  `icon_link` char(255) NOT NULL,
  `color` char(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (0,'Fruits','fruit.png','#FF7D5A'),(1,'Legumes','vegetable.png','#0AD300'),(2,'Epicerie','grocery.png','#FFFF5A'),(3,'Soins','care-products.png','#FF80F7'),(4,'Boisons','drink.png','#2EE5FE'),(5,'Céréales','cereal.png','#F1B600');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deliveries`
--

DROP TABLE IF EXISTS `deliveries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deliveries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shipper_id` int(11) NOT NULL,
  `deadline` datetime NOT NULL,
  `status` int(11) DEFAULT NULL,
  `deposit_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `deliveries_ibfk_1` (`shipper_id`),
  CONSTRAINT `deliveries_ibfk_1` FOREIGN KEY (`shipper_id`) REFERENCES `shippers` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deliveries`
--

LOCK TABLES `deliveries` WRITE;
/*!40000 ALTER TABLE `deliveries` DISABLE KEYS */;
INSERT INTO `deliveries` VALUES (3,21,'2023-03-21 22:33:29',2,'2023-03-21 22:33:29');
/*!40000 ALTER TABLE `deliveries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery_proposals`
--

DROP TABLE IF EXISTS `delivery_proposals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `delivery_proposals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shipper_id` int(11) NOT NULL,
  `size` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT current_timestamp(),
  `deadline` datetime NOT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `shipper_id` (`shipper_id`),
  CONSTRAINT `delivery_proposals_ibfk_1` FOREIGN KEY (`shipper_id`) REFERENCES `shippers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_proposals`
--

LOCK TABLES `delivery_proposals` WRITE;
/*!40000 ALTER TABLE `delivery_proposals` DISABLE KEYS */;
/*!40000 ALTER TABLE `delivery_proposals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `featured_products`
--

DROP TABLE IF EXISTS `featured_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `featured_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `featured_products_products_id_fk` (`product_id`),
  CONSTRAINT `featured_products_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `featured_products`
--

LOCK TABLES `featured_products` WRITE;
/*!40000 ALTER TABLE `featured_products` DISABLE KEYS */;
INSERT INTO `featured_products` VALUES (3,1),(4,2),(5,3),(6,4),(7,5),(8,6),(9,7);
/*!40000 ALTER TABLE `featured_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth`
--

DROP TABLE IF EXISTS `oauth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oauth` (
  `user_id` int(11) NOT NULL,
  `access_token` text DEFAULT NULL,
  `expires_at` bigint(20) DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  KEY `oauth_users_id_fk` (`user_id`),
  CONSTRAINT `oauth_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth`
--

LOCK TABLES `oauth` WRITE;
/*!40000 ALTER TABLE `oauth` DISABLE KEYS */;
INSERT INTO `oauth` VALUES (20,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMCwiZW1haWwiOiJ0ZXN0cmVnaXN0ZXIzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJEliOTlSRC9xaDJlZTZ1ajV3bkdyMWVTN3IxVS9mWDVQTUo4S0lESmdTb3JTc1ZZV0k5RC9XIiwiY3JlYXRlZEF0IjoxNjc3OTM2NjQyNTc1LCJpYXQiOjE2Nzc5MzY2NDJ9.eCrzoJKgq4ULiIVeBzAP4aV4Iq9emiFxgG7jTucoVgQ',1677937242581,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMCwiYWNjZXNzX3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SjFjMlZ5WDJsa0lqb3lNQ3dpWlcxaGFXd2lPaUowWlhOMGNtVm5hWE4wWlhJelFHZHRZV2xzTG1OdmJTSXNJbkJoYzNOM2IzSmtJam9pSkRKaUpERXdKRWxpT1RsU1JDOXhhREpsWlRaMWFqVjNia2R5TVdWVE4zSXhWUzltV0RWUVRVbzRTMGxFU21kVGIzSlRjMVpaVjBrNVJDOVhJaXdpWTNKbFlYUmxaRUYwSWpveE5qYzNPVE13TmpVMk5URXpMQ0pwWVhRaU9qRTJOemM1TXpBMk5UWjkuQ2g0dU5lV1BuNDdTdjcxY3dheFlweXRzU25lSWJaRUZxalpXbjJ6OUtJVSIsImNyZWF0ZWRBdCI6MTY3NzkzMDY1NjUxNywiaWF0IjoxNjc3OTMwNjU2fQ.wexL8Nt5agVsZvVg2L4oFCwnxDn-pITxYLfdj-q7PKs'),(21,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMSwiZW1haWwiOiJsb2xvQHRlbGVjb20tcGFyaXMuZnIiLCJwYXNzd29yZCI6IiQyYiQxMCRYanA1OWVrbkEvTHdCMGRFRU1wN28uMTM5Zy84QXdqM1RoQXJwM2guOVJqQmxuZkh0SDFzRyIsImNyZWF0ZWRBdCI6MTY3OTY2NDkwMzI0NCwiaWF0IjoxNjc5NjY0OTAzfQ.1Se853QAv-hte4zVY8bqREbfW8_7h8biNbYDqIlaJFA',1679675703247,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMSwiYWNjZXNzX3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SjFjMlZ5WDJsa0lqb3lNU3dpWlcxaGFXd2lPaUpzYjJ4dlFIUmxiR1ZqYjIwdGNHRnlhWE11Wm5JaUxDSndZWE56ZDI5eVpDSTZJaVF5WWlReE1DUllhbkExT1dWcmJrRXZUSGRDTUdSRlJVMXdOMjh1TVRNNVp5ODRRWGRxTTFSb1FYSndNMmd1T1ZKcVFteHVaa2gwU0RGelJ5SXNJbU55WldGMFpXUkJkQ0k2TVRZM09UWTJORGt3TXpJME5Dd2lhV0YwSWpveE5qYzVOalkwT1RBemZRLjFTZTg1M1FBdi1odGU0elZZOGJxUkViZlc4XzdoOGJpTmJZRHFJbGFKRkEiLCJjcmVhdGVkQXQiOjE2Nzk2NjQ5MDMyNDcsImlhdCI6MTY3OTY2NDkwM30.JwF8nqeTUTkNzkmInWgFzrbVjim0ukXtydH_aCoMpbI'),(22,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMiwiZW1haWwiOiJBZG1pbkB0ZWxlY29tLXBhcmlzLmZyIiwicGFzc3dvcmQiOiIkMmIkMTAkRHdzQ2NwekcvWWlaWVJNZXM4cWJZZWMyb0QxdzVJOUY3VDRaNU12RVZpUXVOeHB4RTFMYXEiLCJjcmVhdGVkQXQiOjE2Nzk0NzI3MTg5NzMsImlhdCI6MTY3OTQ3MjcxOH0.NGhjlZ6UKgY6NKTdoJTvnxKIdoLurp1Qaq38J-QMnIw',1679483518974,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMiwiYWNjZXNzX3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SjFjMlZ5WDJsa0lqb3lNaXdpWlcxaGFXd2lPaUpCWkcxcGJrQjBaV3hsWTI5dExYQmhjbWx6TG1aeUlpd2ljR0Z6YzNkdmNtUWlPaUlrTW1Ja01UQWtSSGR6UTJOd2VrY3ZXV2xhV1ZKTlpYTTRjV0paWldNeWIwUXhkelZKT1VZM1ZEUmFOVTEyUlZacFVYVk9lSEI0UlRGTVlYRWlMQ0pqY21WaGRHVmtRWFFpT2pFMk56azBOekkzTVRnNU56TXNJbWxoZENJNk1UWTNPVFEzTWpjeE9IMC5OR2hqbFo2VUtnWTZOS1Rkb0pUdm54S0lkb0x1cnAxUWFxMzhKLVFNbkl3IiwiY3JlYXRlZEF0IjoxNjc5NDcyNzE4OTc0LCJpYXQiOjE2Nzk0NzI3MTh9.ovkGz9YLoXLBK68XquWUrLETROaK81DoMNbnKqKHbng');
/*!40000 ALTER TABLE `oauth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prodExp`
--

DROP TABLE IF EXISTS `prodExp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prodExp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `quantity_type` char(16) NOT NULL,
  `icon_link` text DEFAULT NULL,
  `average_price` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `prodExp_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prodExp`
--

LOCK TABLES `prodExp` WRITE;
/*!40000 ALTER TABLE `prodExp` DISABLE KEYS */;
/*!40000 ALTER TABLE `prodExp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `quantity_type` char(16) NOT NULL,
  `icon_link` text DEFAULT NULL,
  `average_price` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Poivron',1,NULL,'pièce','https://media.auchan.fr/A0220100225000648660PRIMARY_512x512/B2CD/',0.5),(2,'Granola',2,NULL,'paquet de 12','https://media.auchan.fr/A0220160317000591469PRIMARY_512x512/B2CD/',3.76),(3,'Le Marseillais Vanille',3,NULL,'flacon 300ml','https://media.auchan.fr/P02000000000TW9PRIMARY_512x512/B2CD/',4.56),(4,'Coca-Cola',4,NULL,'1L','https://media.auchan.fr/A0220131018000141418PRIMARY_512x512/B2CD/',2.3),(5,'Riz',5,NULL,'500g','https://media.auchan.fr/P020000000016C7PRIMARY_512x512/B2CD/',2.13),(6,'PANZANI Fusilli',5,NULL,'500g','https://media.auchan.fr/A0220041022000537637PRIMARY_512x512/B2CD/',1.87),(7,'Poireau',1,NULL,'pièce','https://media.auchan.fr/A0220211014000347726PRIMARY_512x512/B2CD/',0.76),(8,'Pomme Golden bio',0,NULL,'pièce','https://media.auchan.fr/MEDIASTEP114480849_512x512/B2CD/',0.23),(9,'Kiwi',0,NULL,'pièce','https://media.auchan.fr/A0219901211000040913PRIMARY_512x512/B2CD/',0.34),(10,'Courgettes 1er prix',1,NULL,'kg','https://media.auchan.fr/A0219870327000035321PRIMARY_512x512/B2CD/',2.1),(11,'MILKA lait et Daim',2,NULL,'2x100g','https://media.auchan.fr/A0220080212000532186PRIMARY_512x512/B2CD/',3.12),(12,'GERBLE Biscuits cookies pépites de chocolat sans gluten',2,NULL,'6 pièces','https://media.auchan.fr/A0220060925000766163PRIMARY_512x512/B2CD/',4.51),(13,'SIGNAL White Now',3,NULL,'pièce','https://media.auchan.fr/P02000000000BWNPRIMARY_512x512/B2CD/',1.45),(14,'ELMEX Dentifrice anti-caries',3,NULL,'pièce','https://media.auchan.fr/A0220150618000070530PRIMARY_512x512/B2CD/',1.89),(15,'FANTA citron',4,NULL,'1.25L','https://media.auchan.fr/P02000000001D3CPRIMARY_512x512/B2CD/',2.02),(16,'Quinoa Tipiak',5,NULL,'200g','https://media.auchan.fr/P02000000000HB8PRIMARY_512x512/B2CD/',4.12),(18,'Citron',0,NULL,'pièce','https://media.auchan.fr/A0219901211000040878PRIMARY_512x512/B2CD/',1.2);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shippers`
--

DROP TABLE IF EXISTS `shippers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shippers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `capacity` int(11) NOT NULL,
  `deliveries_count` int(11) DEFAULT NULL,
  `price_max` int(11) NOT NULL,
  `drive` tinyint(4) NOT NULL COMMENT 'Boolean value to determine if the shipper can take drive commands',
  `shop` tinyint(4) NOT NULL COMMENT 'Boolean value to determine if the shipper can take shop commands',
  `has_car` tinyint(4) NOT NULL,
  `disponibilities` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `shippers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shippers`
--

LOCK TABLES `shippers` WRITE;
/*!40000 ALTER TABLE `shippers` DISABLE KEYS */;
INSERT INTO `shippers` VALUES (1,21,0,NULL,40,1,1,1,'0000000');
/*!40000 ALTER TABLE `shippers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supermarkets`
--

DROP TABLE IF EXISTS `supermarkets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `supermarkets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) DEFAULT NULL,
  `loc_long` float DEFAULT NULL,
  `loc_lat` float DEFAULT NULL,
  `business_hours` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supermarkets`
--

LOCK TABLES `supermarkets` WRITE;
/*!40000 ALTER TABLE `supermarkets` DISABLE KEYS */;
INSERT INTO `supermarkets` VALUES (1,'Leclerc Massy',48.7292,2.24317,NULL);
/*!40000 ALTER TABLE `supermarkets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supermarkets_products`
--

DROP TABLE IF EXISTS `supermarkets_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `supermarkets_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `supermarket_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `is_available` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `supermarket_id` (`supermarket_id`),
  KEY `supermarkets_products_ibfk_1` (`product_id`),
  CONSTRAINT `supermarkets_products_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `supermarkets_products_ibfk_2` FOREIGN KEY (`supermarket_id`) REFERENCES `supermarkets` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supermarkets_products`
--

LOCK TABLES `supermarkets_products` WRITE;
/*!40000 ALTER TABLE `supermarkets_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `supermarkets_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(25) NOT NULL,
  `last_name` varchar(25) NOT NULL,
  `school` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `pwdhash` char(255) NOT NULL COMMENT 'sha2 of the user''s password',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'John','Cena','Télécom Paris','johncena@wwe.us','+33690785634',''),(3,'Michael','Jackson','Télécom Paris','mjtheking@vma.us','+33612543215',''),(4,'John','Mikeal','Télécom Paris','johnmikeal@telecom-paris.fr','+33612345689','hfupaH4UH4P2Uhufpauh2U019jhufa91fba'),(5,'John','Mikeal','Télécom Paris','johnmikeal@telecom-paris.fr','+33612345689','hfupaH4UH4P2Uhufpauh2U019jhufa91fba'),(6,'Stephen','Curry','Télécom Paris','stephcurry30@gmail.com','+330699701358','null'),(7,'Stephen','Curry','Télécom Paris','stephcurry30@gmail.com','+330699701358','null'),(8,'Seth','Curry','Ecole Polytechnique','sethcurry30@gmail.com','+330699701273','null'),(9,'Mike','POST','Ecole Polytechnique','POST@gmail.com','+330699701273','null'),(10,'John','POST2','Ecole Polytechnique','POST@gmail.com','+330699701273','null'),(11,'John','POST2','Ecole Polytechnique','POST@gmail.com','+330699701273','null'),(12,'John','POST2','Ecole Polytechnique','POST@gmail.com','+330699701273','null'),(13,'John','POST2','Ecole Polytechnique','POST@gmail.com','+330699701273','null'),(14,'John','POST2','Ecole Polytechnique','POST@gmail.com','+330699701273','null'),(15,'John','POST2','Ecole Polytechnique','POST@gmail.com','+330699701273','null'),(16,'John','POST2','Ecole Polytechnique','POST@gmail.com','+330699701273','null'),(17,'Test','Register','Ecole Polytechnique','testregister@gmail.com','+330699701273','$2b$10$5/fht39F0l8xysq48DvH..tSsms8d2b/MuO4AKSLpheLy0hODIxCC'),(18,'Test','Register','Ecole Polytechnique','testregister1@gmail.com','+330699701273','$2b$10$fv7RrwNVwU8vj6icV9zRAe5lL5bfpFqBhI77gJlIV.LHhxZDvb.Ne'),(19,'Test','Register','Ecole Polytechnique','testregister2@gmail.com','+330699701273','$2b$10$RK9vH2i2xXINuryJngr6g./8jnEDjrZqly8ZkMFAq7FwzsuV9YeMa'),(20,'Test','Register','Ecole Polytechnique','testregister3@gmail.com','+330699701273','$2b$10$Ib99RD/qh2ee6uj5wnGr1eS7r1U/fX5PMJ8KIDJgSorSsVYWI9D/W'),(21,'Lolo','Popo','Telecom Paris','lolo@telecom-paris.fr','0645342398','$2b$10$Xjp59eknA/LwB0dEEMp7o.139g/8Awj3ThArp3h.9RjBlnfHtH1sG'),(22,'Admin ','Admin','Telecom Paris','Admin@telecom-paris.fr','0645342398','$2b$10$DwsCcpzG/YiZYRMes8qbYec2oD1w5I9F7T4Z5MvEViQuNxpxE1Laq');
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

-- Dump completed on 2023-03-24 13:57:04
