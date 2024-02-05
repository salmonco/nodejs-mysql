CREATE DATABASE `nodejs_mysql` DEFAULT CHARACTER SET utf8mb4;
SHOW DATABASES;
USE `nodejs_mysql`;

CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nickname` varchar(50) NOT NULL,
  `gender` varchar(2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(`id`)
) ENGINE=InnoDB;

CREATE TABLE `board` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `contents` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `writer` varchar(255) NOT NULL,
  `user_id` int unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(`id`),
  FOREIGN KEY(`user_id`) REFERENCES `user`(`id`)
) ENGINE=InnoDB;

DESCRIBE `user`;
DESCRIBE `board`;

select * from `user`;
select * from `board`;

drop table `board`;
drop table `user`;

show errors;
show warnings;
