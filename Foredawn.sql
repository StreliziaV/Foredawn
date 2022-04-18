DROP SCHEMA IF EXISTS server;
CREATE SCHEMA server;
USE server;

DROP TABLE IF EXISTS user;
CREATE TABLE `server`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `photo` TEXT NULL,
  `isAdmin` BOOLEAN NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE);

DROP TABLE IF EXISTS savefile;
CREATE TABLE `server`.`savefile` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `save_name`  VARCHAR(40) NOT NULL,
  `nickname` VARCHAR(40),
  `scene` INT NOT NULL,
  `location` INT NOT NULL,
  `hasring` BOOLEAN NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
  
INSERT INTO USER VALUES ('1', 'Administrator1', 'asdfghjkl', '119010406@link.cuhk.edu.cn', './image/user.png', true);
