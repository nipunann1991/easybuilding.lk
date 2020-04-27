-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 27, 2020 at 08:47 PM
-- Server version: 5.7.21
-- PHP Version: 5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `easybuilding_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cat_id` varchar(100) DEFAULT '0',
  `cat_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `cat_id`, `cat_name`) VALUES
(19, 'C1019', 'Services'),
(15, 'C1015', 'Product Suppliers');

-- --------------------------------------------------------

--
-- Table structure for table `categories-level1`
--

DROP TABLE IF EXISTS `categories-level1`;
CREATE TABLE IF NOT EXISTS `categories-level1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cat_lvl1_id` varchar(100) NOT NULL,
  `cat_lvl1_name` varchar(100) NOT NULL,
  `parent_cat_id` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories-level1`
--

INSERT INTO `categories-level1` (`id`, `cat_lvl1_id`, `cat_lvl1_name`, `parent_cat_id`) VALUES
(15, 'CL11015', 'Construction Contractors', 'C1019'),
(16, 'CL11016', 'Professional Service Providers', 'C1019'),
(17, 'CL11017', 'House Interior Construction Contractors', 'C1019'),
(18, 'CL11018', 'Construction Materials', 'C1015');

-- --------------------------------------------------------

--
-- Table structure for table `categories-level2`
--

DROP TABLE IF EXISTS `categories-level2`;
CREATE TABLE IF NOT EXISTS `categories-level2` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cat_lvl2_id` varchar(100) NOT NULL,
  `cat_lvl2_name` varchar(100) NOT NULL,
  `parent_cat_id` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories-level2`
--

INSERT INTO `categories-level2` (`id`, `cat_lvl2_id`, `cat_lvl2_name`, `parent_cat_id`) VALUES
(10, 'CL21010', 'House Construction Contractors', 'CL11015'),
(11, 'CL21011', 'Architects', 'CL11016'),
(12, 'CL21012', 'Interior Designers', 'CL11016'),
(13, 'CL21013', 'Interior Work, Partition Work & Ceiling work Contractors', 'CL11017'),
(14, 'CL21014', 'Interior Designers', 'CL11017'),
(15, 'CL21015', 'Plumbing Accessories, Pipes & Waste Removal', 'CL11018'),
(16, 'CL21016', 'Cement', 'CL11018'),
(17, 'CL21017', 'Sand ', 'CL11018'),
(18, 'CL21018', 'Ready Mix Concrete', 'CL11015'),
(19, 'CL21019', 'Bricks', 'CL11018'),
(20, 'CL21020', 'Adhesive, Grout and Sealant', 'CL11018'),
(21, 'CL21021', 'Commercial Building Contraction Contractors ', 'CL11015');

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `client_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `name` varchar(300) NOT NULL,
  `address` varchar(500) NOT NULL,
  `email` varchar(100) NOT NULL,
  `tel1` varchar(30) NOT NULL,
  `tel2` varchar(30) NOT NULL,
  `profie_image` varchar(1000) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `provider` varchar(1) NOT NULL,
  `provider_id` varchar(150) NOT NULL,
  PRIMARY KEY (`client_id`)
) ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`client_id`, `first_name`, `last_name`, `name`, `address`, `email`, `tel1`, `tel2`, `profie_image`, `status`, `provider`, `provider_id`) VALUES
(41, 'Nipuna', 'Nanayakkara', '', '', 'nipunann0710@gmail.com', '', '', 'https://lh3.googleusercontent.com/a-/AOh14GisC--kL07FCODwshq3lCEH8lnSWOfzpBvcjEQbqg=s96-c', 1, 'G', '101780267759212434309'),
(42, 'Nirmal', 'Nanayakkara', '', '', 'nipuisha@yahoo.com', '', '', 'https://graph.facebook.com/3184985174847762/picture?type=normal', 2, 'F', '3184985174847762');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `password` varchar(300) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_sessions`
--

DROP TABLE IF EXISTS `user_sessions`;
CREATE TABLE IF NOT EXISTS `user_sessions` (
  `session_id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `auth_token` varchar(500) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_sessions`
--

INSERT INTO `user_sessions` (`session_id`, `client_id`, `auth_token`, `password`) VALUES
(23, 42, 'EAAlrbREIkZCkBAOWAsmEKBJzsZBmxE8eaPhSf0V6tZBv5flGhZBsTK0ACtCQsElzajNpeEwXCixkGqtyBzna6m87rK1tkBOfM7FLi2lIyy2eohcmoAXmo4B4wWSDKMc3ntEKYS5MdCwJQzZAeEgeZAeUu8lyfNXMQjgd7PerZADxbh28hFflXEaF36RzLZAvRZBNw1yuZAteGp8e5m5EdO76Xp', ''),
(22, 41, 'ya29.a0Ae4lvC1Qw6sq1w3oj34Bbx0BG5gIF4Gl4H3jzYZAwZx3sHEGFbGYM3cGdAu8cQwtRBIlT9jFJAbkazrVN23ONQi7X3ClnE0qfiMJ2WmnLbZUQMy-ZO0ZlS6VNh8IfFPtUNdMYL3PCxjDrQ8jTzJtvItnNhuX99_3YG8n', '');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
