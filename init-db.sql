-- CREATE DATABASE `feyverly` ;
ALTER USER `root`@`localhost` IDENTIFIED BY 'password';

USE `feyverly`;

CREATE TABLE `shop` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `lat` double NOT NULL,
  `lon` double NOT NULL,
  `banner` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ;
