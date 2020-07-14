-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 14, 2020 at 08:32 PM
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
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

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
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

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
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

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
(21, 'CL21021', 'Commercial Building Contraction Contractors ', 'CL11015'),
(22, 'CL21022', 'Carpenters', 'CL11016');

-- --------------------------------------------------------

--
-- Table structure for table `cites`
--

DROP TABLE IF EXISTS `cites`;
CREATE TABLE IF NOT EXISTS `cites` (
  `city_id` int(11) NOT NULL AUTO_INCREMENT,
  `district_id` int(11) NOT NULL,
  `city` varchar(70) NOT NULL,
  PRIMARY KEY (`city_id`)
) ENGINE=MyISAM AUTO_INCREMENT=1279 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cites`
--

INSERT INTO `cites` (`city_id`, `district_id`, `city`) VALUES
(4, 8, 'Havlock City'),
(5, 10, 'Kiribathgoda'),
(6, 10, 'Biyagama'),
(7, 8, 'Kaduwela'),
(1005, 4, 'Ampara city Limit'),
(1007, 5, 'Anuradhapura City Limit'),
(1008, 5, 'Madawachchiya'),
(1009, 5, 'Horowpothana'),
(1010, 5, 'Kalawewa'),
(1011, 5, 'Mihinthale'),
(1012, 5, 'Kekirawa'),
(1013, 4, 'Pothuvil'),
(1014, 4, 'Sammanthurai'),
(1015, 4, 'Kalmunne'),
(1016, 6, 'Mahiyanganaya'),
(1017, 6, 'Viyaluwa'),
(1018, 6, 'Passara'),
(1021, 6, 'Passara'),
(1022, 6, 'Passara'),
(1023, 6, 'Passara'),
(1024, 6, 'Badulla City Limit'),
(1025, 6, 'Hali-Ela'),
(1026, 6, 'UvaParanagama'),
(1027, 6, 'Welimada'),
(1028, 6, 'Bandarawela'),
(1029, 6, 'Haputhale'),
(1030, 7, 'Batticaloa City Limit'),
(1031, 7, 'Kattankudy'),
(1032, 7, 'Pasikudah'),
(1033, 7, 'Valaichchenai'),
(1034, 7, 'Vakarai'),
(1035, 7, 'Kaluvanchikudy'),
(1036, 4, 'Sammanthurai'),
(1037, 4, 'Pottuvil'),
(1038, 4, 'Padiyathalawa'),
(1039, 4, 'Arugam Bay'),
(1040, 8, 'Colombo Fort '),
(1041, 8, 'Slave Island'),
(1042, 8, 'Collupety'),
(1043, 8, 'Bambalapitiya'),
(1044, 8, 'Narahenpita'),
(1045, 8, 'Kirulapona'),
(1046, 8, 'Wellawatta'),
(1047, 8, 'Cinnamon Garden'),
(1048, 8, 'Borella'),
(1049, 8, 'Dematagoda'),
(1050, 8, 'Maradana'),
(1051, 8, 'Pettah'),
(1052, 8, 'Hulsfdorf '),
(1053, 8, 'Kotahena'),
(1054, 8, 'Grandpass'),
(1055, 8, 'Mattakkuliya'),
(1056, 8, 'Dehiwala'),
(1057, 8, 'Mount Lavinia'),
(1058, 8, 'Homagama'),
(1059, 8, 'Kesbewa'),
(1060, 8, 'Kolonnawa'),
(1061, 8, 'Maharagama'),
(1062, 8, 'Moratuwa'),
(1063, 8, 'Ratmalana'),
(1064, 8, 'Padukka'),
(1065, 8, 'Thimbirigasyaya'),
(1066, 8, 'Avissawella'),
(1068, 8, 'Pita Kotte'),
(1069, 8, 'Ethul Kotte'),
(1070, 8, 'Nawala'),
(1071, 8, 'Nugegoda'),
(1072, 8, 'Rajagiriya'),
(1073, 8, 'Malabe'),
(1074, 8, 'Battaramulla'),
(1075, 8, 'Athurugiriya'),
(1076, 8, 'Piliyandala'),
(1077, 8, 'Hanwella'),
(1078, 8, 'Boralesgamuwa'),
(1079, 8, 'Thalawathugoda'),
(1080, 8, 'Hokandara'),
(1081, 8, 'Godagama'),
(1082, 10, 'Attanagalla'),
(1083, 10, 'Nittambuwa'),
(1084, 10, 'Divulapitiya'),
(1085, 10, 'Dompe'),
(1086, 10, 'Gampaha City Limit'),
(1087, 10, 'Ja-Ela'),
(1088, 10, 'Katana'),
(1089, 10, 'Kochchikade'),
(1090, 10, 'Kelaniya'),
(1091, 10, 'Mahara'),
(1092, 10, 'Kiribathgoda'),
(1093, 10, 'Peliyagoda'),
(1094, 10, 'Kadawatha'),
(1095, 10, 'Minuwangoda'),
(1096, 10, 'Udugampola'),
(1097, 10, 'Mirigama'),
(1098, 10, 'Negombo'),
(1099, 10, 'Wattala'),
(1100, 9, 'Ahangama'),
(1101, 9, 'Ahungalla'),
(1102, 9, 'Baddegama'),
(1103, 9, 'Balapitiya'),
(1104, 9, 'Bentota'),
(1105, 9, 'Elpitiya'),
(1106, 9, 'Habaraduwa'),
(1107, 9, 'Hiniduma'),
(1108, 9, 'Hikkaduwa'),
(1109, 9, 'Imaduwa'),
(1110, 9, 'Karandeniya'),
(1111, 9, 'Koggala'),
(1112, 9, 'Kosgoda'),
(1113, 9, 'Nagoda'),
(1114, 9, 'Neluwa'),
(1115, 9, 'Rathgama'),
(1116, 9, 'Udugama'),
(1117, 9, 'Wanduramba'),
(1118, 9, 'Yakkalamulla'),
(1120, 9, 'Galle City Limit'),
(1121, 9, 'Karapitiya'),
(1122, 11, 'Hambantota City Limit'),
(1123, 11, 'Tangalle'),
(1124, 11, 'Ambalantota'),
(1125, 11, 'Beliatta'),
(1126, 11, 'Tissamaharama'),
(1127, 11, 'Middeniya'),
(1128, 11, 'Angunukolapelessa'),
(1129, 11, 'Walasmulla'),
(1130, 11, 'Weeraketiya'),
(1131, 12, 'Kayts'),
(1132, 12, 'Velanai'),
(1133, 12, 'Jaffna City Limit'),
(1134, 12, 'Karainagar'),
(1135, 12, 'Nallur'),
(1136, 12, 'Chavakachcheri'),
(1137, 12, 'Point Pedro'),
(1138, 12, 'Karaveddy'),
(1139, 12, 'Kopay'),
(1140, 12, 'Tellippalai'),
(1141, 12, 'Uduvil'),
(1142, 12, 'Sandilipay'),
(1143, 12, 'Chankanai'),
(1144, 13, 'Agalawatta'),
(1145, 13, 'Kalutara City Limit'),
(1146, 13, 'Bandaragama'),
(1147, 13, 'Beruwala'),
(1148, 13, 'Bulathsinhala'),
(1149, 13, 'Dodangoda'),
(1150, 13, 'Horana'),
(1151, 13, 'Ingiriya'),
(1152, 13, 'Kalutara City Limit'),
(1153, 13, 'Matugama'),
(1154, 13, 'Baduraliya'),
(1155, 13, 'Panadura'),
(1156, 13, 'Walallavita'),
(1157, 13, 'Madurawela'),
(1158, 13, 'Millaniya'),
(1159, 13, 'Aluthgama'),
(1160, 14, 'Kandy City Limit'),
(1161, 14, 'Peradeniya'),
(1162, 14, 'Katugastota'),
(1163, 14, 'Pallekele'),
(1164, 14, 'Aruppola'),
(1165, 14, 'Gampola'),
(1166, 14, 'Nawalapitiya'),
(1167, 14, 'Akurana'),
(1168, 14, 'Alawatugoda'),
(1169, 14, 'Hanguranketa'),
(1170, 14, 'Kadugannawa'),
(1171, 14, 'Kundasale'),
(1172, 14, 'Madawala'),
(1173, 14, 'Menikdiwela'),
(1174, 14, 'Pilimathalawa'),
(1175, 14, 'Pussellawa'),
(1176, 14, 'Talatuoya'),
(1177, 14, 'Teldeniya'),
(1178, 14, 'Ulapane'),
(1179, 14, 'Watadeniya'),
(1180, 14, 'Wattegama'),
(1181, 14, 'Galagedara'),
(1182, 15, 'Kegalle City Limit'),
(1183, 15, 'Ambepussa'),
(1184, 15, 'Aranayaka'),
(1185, 15, 'Bulathkohupitiya'),
(1186, 15, 'Deraniyagala'),
(1187, 15, 'Dehiovita'),
(1188, 15, 'Galigamuwa'),
(1189, 15, 'Karawanella'),
(1190, 15, 'Kitulgala'),
(1191, 15, 'Mawanella'),
(1192, 15, 'Rambukkana'),
(1193, 15, 'Ruwanwella'),
(1194, 15, 'Warakapola'),
(1195, 15, 'Yatiyanthota'),
(1196, 16, 'Kilinochchi'),
(1197, 17, 'Kurunegala City Limit'),
(1198, 17, 'Kuliyapitiya'),
(1199, 17, 'Narammala'),
(1200, 17, 'Wariyapola'),
(1201, 17, 'Pannala'),
(1202, 17, 'Nikaweratiya'),
(1203, 17, 'Galgamuwa'),
(1204, 17, 'Polgahawela'),
(1205, 17, 'Mahawa'),
(1206, 17, 'Alawwa'),
(1207, 17, 'Giriulla'),
(1208, 17, 'Ibbagamuwa'),
(1209, 17, 'Dambadeniya'),
(1210, 17, 'Hettipola'),
(1211, 17, 'Mawathagama'),
(1212, 17, 'Yapahuwa'),
(1213, 18, 'Mannar City Limit'),
(1215, 19, 'Dambulla'),
(1216, 19, 'Galewela'),
(1217, 19, 'Naula'),
(1218, 19, 'Rattota'),
(1219, 19, 'Ukuwela'),
(1220, 19, 'Laggala Pallegama'),
(1221, 19, 'Matale City Limit'),
(1222, 20, 'Matara City Limit'),
(1223, 20, 'Akuressa'),
(1224, 20, 'Dickwella'),
(1225, 20, 'Devinuwara'),
(1226, 20, 'Hakmana'),
(1227, 20, 'Kamburupitiya'),
(1228, 20, 'Pitabeddara'),
(1229, 20, 'Weligama'),
(1230, 20, 'Deniyaya'),
(1232, 21, 'Moneragala City Limit'),
(1233, 21, 'Bibile'),
(1234, 21, 'Wellawaya'),
(1235, 21, 'Kataragama'),
(1236, 23, 'Nuwara Eliya City Limit'),
(1237, 23, 'Hatton'),
(1238, 23, 'Talawakelle'),
(1239, 23, 'Walapane'),
(1240, 24, 'Kaduruwela'),
(1241, 24, 'Hingurakgoda'),
(1242, 24, 'Minneriya'),
(1243, 24, 'Manampitiya'),
(1244, 25, 'Puttalam City Limit'),
(1245, 25, 'Chilaw'),
(1246, 25, 'Anamaduwa'),
(1247, 25, 'Madampe'),
(1248, 25, 'Marawila'),
(1249, 25, 'Kalpitiya'),
(1250, 25, 'Wennappuwa'),
(1251, 26, 'Ratnapura City Limit'),
(1252, 26, 'Eheliyagoda'),
(1253, 26, 'Pelmadulla'),
(1254, 26, 'Kuruwita'),
(1255, 26, 'Godakawela'),
(1256, 26, 'Kahawatta'),
(1257, 26, 'Rakwana'),
(1258, 26, 'Nivitigala'),
(1259, 26, 'Kalawana'),
(1260, 26, 'Embilipitiya'),
(1261, 27, 'Trincomalee City Limit'),
(1262, 27, 'Kinniya'),
(1263, 27, 'Muttur'),
(1264, 27, 'Kantalai'),
(1265, 28, 'Vavuniya City Limit'),
(1266, 29, 'All Cities'),
(1268, 8, 'Kottawa'),
(1269, 10, 'Miriswatta'),
(1271, 21, 'Kataragama'),
(1273, 19, 'Sigiriya'),
(1274, 8, 'Angoda'),
(1275, 8, 'Kotikawatta'),
(1276, 20, 'Tangalle'),
(1277, 23, 'Thalawakale');

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `client_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `profie_image` varchar(1000) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `provider` varchar(1) NOT NULL,
  `provider_id` varchar(150) NOT NULL,
  `verified_email` int(11) NOT NULL DEFAULT '0',
  `verify_code` int(11) NOT NULL,
  PRIMARY KEY (`client_id`)
) ENGINE=MyISAM AUTO_INCREMENT=70 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`client_id`, `first_name`, `last_name`, `email`, `profie_image`, `status`, `provider`, `provider_id`, `verified_email`, `verify_code`) VALUES
(66, 'Nirmal', 'Nanayakkara', 'nipuisha@yahoo.com', '1592118606prof.png', 1, 'F', '3184985174847762', 0, 0),
(67, 'Nipuna', 'Nanayakkara', 'nipunann0710@gmail.com', '1592233783prof.png', 1, 'G', '101780267759212434309', 0, 0),
(68, 'Imali', 'Gunawardana', 'imaligunawardana1995@gmail.com', '1592412727prof.png', 1, 'G', '106207594050682912858', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `client_company`
--

DROP TABLE IF EXISTS `client_company`;
CREATE TABLE IF NOT EXISTS `client_company` (
  `company_id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `display_name` varchar(100) NOT NULL,
  `description` varchar(1500) NOT NULL,
  `website` varchar(300) NOT NULL,
  `br_no` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address_line1` varchar(200) NOT NULL,
  `address_line2` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `tel1` varchar(25) NOT NULL,
  `tel2` varchar(25) NOT NULL,
  `profie_image` varchar(1000) NOT NULL,
  `cover_img` varchar(1000) NOT NULL,
  `prof_category` int(11) NOT NULL,
  `verified_email` int(11) NOT NULL DEFAULT '0',
  `verify_code` int(11) NOT NULL DEFAULT '0',
  `steps` int(11) NOT NULL DEFAULT '0',
  `parent` int(11) DEFAULT '0',
  `all_island` int(11) NOT NULL DEFAULT '0',
  `service` int(11) NOT NULL DEFAULT '0',
  `service_areas` mediumblob NOT NULL,
  `service_dist` mediumblob NOT NULL,
  `services` mediumblob NOT NULL,
  PRIMARY KEY (`company_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `client_company`
--

INSERT INTO `client_company` (`company_id`, `client_id`, `display_name`, `description`, `website`, `br_no`, `email`, `address_line1`, `address_line2`, `city`, `tel1`, `tel2`, `profie_image`, `cover_img`, `prof_category`, `verified_email`, `verify_code`, `steps`, `parent`, `all_island`, `service`, `service_areas`, `service_dist`, `services`) VALUES
(1, 66, 'Dubai Homes', '<p>Best of Houzz 2012-2020 | With locations in Minnesota and Texas, we work with homeowners from coast to coast to design and furnish their interiors. Contact us today for more information! Martha O’Hara Interiors designs beautiful spaces with the goal of connecting life and style. Finding that enviable mix of style and warmth that exudes your true aesthetic and sticks to your budget - it\'s what we do best! Whether you are building, remodeling, or updating your furniture, our award-winning team will create an interior that is tailored to your tastes and lifestyle. With locations in Minnesota and Texas, we work with homeowners and building professionals from coast to coast.</p>', 'https://oozmm.com', 'PV263644577', 'info@n3holdings.com', '275A Colombo Road', 'Kidagammulla', 'Gampaha', '033-2228887', '071-6378515', '1593686608blob.jpg', '1592629830blob.jpg', 1, 0, 0, 4, 0, 0, 0, 0x5b2231323734222c2231303735222c2231303734222c2237222c2231303733222c2231303732222c2231303739225d, 0x5b5d, 0x5b22434c3231303134222c22434c3231303131222c22434c3231303232225d),
(3, 68, 'Test Holdings', '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod</p><p>tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p><p>quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo</p><p>consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse</p><p>cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non</p><p>proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>', '', '', 'nipunann0710@gmail.com', '275A Colombo Road, KIdagammulla', '', 'Gampaha', '0716378515', '', '', '', 1, 0, 0, 4, 0, 0, 0, 0x5b2231323233225d, '', ''),
(2, 67, 'JAT Living', '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>', '', '', 'info@jatliving.lk', '141 Danister De Silva Mw,', 'Orion City,', 'Colombo 09', '0112589963', '', '', '', 1, 0, 0, 4, 0, 0, 0, 0x5b2231303731222c2231303438222c2231303432225d, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `company_details`
--

DROP TABLE IF EXISTS `company_details`;
CREATE TABLE IF NOT EXISTS `company_details` (
  `company_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(100) NOT NULL,
  `company_logo` varchar(1000) NOT NULL,
  `company_desc` varchar(1000) NOT NULL,
  `company_start_date` varchar(100) NOT NULL,
  `company_address` varchar(300) NOT NULL,
  `company_tel1` varchar(30) NOT NULL,
  `company_tel2` varchar(30) NOT NULL,
  `company_email` varchar(100) NOT NULL,
  `fb_url` varchar(250) NOT NULL,
  `twitter_url` varchar(250) NOT NULL,
  `youtube_url` varchar(250) NOT NULL,
  `linkedin_url` varchar(250) NOT NULL,
  PRIMARY KEY (`company_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `company_details`
--

INSERT INTO `company_details` (`company_id`, `company_name`, `company_logo`, `company_desc`, `company_start_date`, `company_address`, `company_tel1`, `company_tel2`, `company_email`, `fb_url`, `twitter_url`, `youtube_url`, `linkedin_url`) VALUES
(1, 'EasyBuilding.lk', '', '<p>EasyBuilding.lk is the Premier House and Building Construction Web Portal which is designed to cater all your construction requirements! We aim at finding a Reputed, Reliable, and Trustworthy local construction related partners for you just within a click.</p><p>&nbsp;</p><p>Our website forms an ideal platform through which client can connect with our reputed service providers, apply for quotation requests, create your own Bill of Quantities (BOQ), view our best deals and rates for your services, while also standing a chance to grasp some of the useful construction tips provided by us! &nbsp;</p><p>&nbsp;</p>', '05/08/2020', '70, Diyawanna Gardens,\nPalawatta, Battaramulla,\nSri Lanka', '011 2785843', '077 7269108', 'info@easybuilding.lk', 'https://www.facebook.com/ConstructionEasyBuilding/', 'https://twitter.com/EasybuildingLk', 'https://www.youtube.com/channel/UCY5nKYQ-Uiq9Zg2UyGKtvxQ', 'https://www.linkedin.com/company/easybuilding-lk-pvt-ltd/');

-- --------------------------------------------------------

--
-- Table structure for table `districts`
--

DROP TABLE IF EXISTS `districts`;
CREATE TABLE IF NOT EXISTS `districts` (
  `district_id` int(11) NOT NULL AUTO_INCREMENT,
  `district_name` varchar(50) NOT NULL,
  PRIMARY KEY (`district_id`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `districts`
--

INSERT INTO `districts` (`district_id`, `district_name`) VALUES
(8, 'Colombo'),
(10, 'Gampaha'),
(4, 'Ampara'),
(5, 'Anuradhapura'),
(6, 'Badulla'),
(7, 'Batticaloa'),
(9, 'Galle'),
(11, 'Hambantota'),
(12, 'Jaffna'),
(13, 'Kalutara'),
(14, 'Kandy'),
(15, 'Kegalle'),
(16, 'Kilinochchi'),
(17, 'Kurunegala'),
(18, 'Mannar'),
(19, 'Matale'),
(20, 'Matara'),
(21, 'Moneragala'),
(23, 'Nuwara Eliya'),
(24, 'Polonnaruwa'),
(25, 'Puttalam'),
(26, 'Ratnapura'),
(27, 'Trincomalee'),
(28, 'Vavuniya');

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
CREATE TABLE IF NOT EXISTS `project` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `project_name` varchar(100) NOT NULL,
  `project_description` varchar(1000) NOT NULL,
  `project_year` varchar(10) NOT NULL,
  `project_cost` varchar(100) NOT NULL,
  `project_address` varchar(500) NOT NULL,
  `company_id` int(11) NOT NULL,
  `images` mediumblob NOT NULL,
  `primary_img` varchar(1000) NOT NULL,
  `total_imgs` int(11) NOT NULL,
  PRIMARY KEY (`project_id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`project_id`, `project_name`, `project_description`, `project_year`, `project_cost`, `project_address`, `company_id`, `images`, `primary_img`, `total_imgs`) VALUES
(13, 'Living Room Concepts', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste hic, mollitia dolorem unde voluptatibus explicabo consectetur dicta eius sapiente aliquam? Corrupti, velit temporibus! Voluptates, eius error eaque quos quis maiores', '2019', '1M', '', 1, 0x5b2231353934373237323432696d616765735f345f2e6a7067222c2231353934373237323432696d616765735f335f2e6a7067222c22313539343732373234326261642d6c6976696e672d726f6f6d2d636c65616e696e672d6861626974732e6a7067222c22313539343732373234324d6f6465726e2d4c6976696e67726f6f6d2d362e6a7067225d, '1594727242images_4_.jpg', 4),
(12, 'Malabe Housing Project', 'Malabe Housing Project Malabe Housing Project Malabe Housing Project', '2019', '3.5M', '', 1, 0x5b2231353934363635383839696d616765735f325f2e6a7067222c22313539343636353838393232363231363138362e6a7067222c22313539343636353838394e6f726d616e746f6e2d4176656e75652d332d3136303078313036382e6a7067222c22313539343636353838396c616b652d686f7573652d696e2d6173636f6e612d62792d77657370692d64652d6d6575726f6e2d726f6d656f2d617263686974656374732d3035312e6a7067225d, '1594665889images_2_.jpg', 4),
(11, 'Mr Anil\'s Kitchen', 'Reliable, Trustworthy and committed Contractor who will be able to build house construction as per architectural requirements', '2020', '1M', '', 1, 0x5b223135393431353333393832323962393238656135623837643138393863616530613062636234383166382e6a7067222c2231353934313533333939696d616765732e6a7067222c223135393431353333393835666537376437323530663962613930353431653865356433316534346564652e6a7067222c223135393431353333393836616264326134613334313637653531356162383765363536323435383838622e6a7067222c223135393431353334313036616264326134613334313637653531356162383765363536323435383838622e6a7067222c2231353934363635353236696d616765735f315f2e6a7067225d, '1594153398229b928ea5b87d1898cae0a0bcb481f8.jpg', 6);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(50) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`) VALUES
(2, 'Admin'),
(3, 'Manager');

-- --------------------------------------------------------

--
-- Table structure for table `services_list`
--

DROP TABLE IF EXISTS `services_list`;
CREATE TABLE IF NOT EXISTS `services_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cat_lvl2_id` varchar(100) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `services_list`
--

INSERT INTO `services_list` (`id`, `cat_lvl2_id`, `company_id`) VALUES
(1, 'CL21014', 1),
(2, 'CL21011', 1),
(3, 'CL21022', 1);

-- --------------------------------------------------------

--
-- Table structure for table `service_areas`
--

DROP TABLE IF EXISTS `service_areas`;
CREATE TABLE IF NOT EXISTS `service_areas` (
  `id` double NOT NULL AUTO_INCREMENT,
  `city_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=129 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `service_areas`
--

INSERT INTO `service_areas` (`id`, `city_id`, `company_id`) VALUES
(1, 1071, 2),
(2, 1048, 2),
(3, 1042, 2),
(128, 1079, 1),
(127, 1072, 1),
(126, 1073, 1),
(125, 7, 1),
(124, 1074, 1),
(123, 1075, 1),
(122, 1274, 1);

-- --------------------------------------------------------

--
-- Table structure for table `service_districts`
--

DROP TABLE IF EXISTS `service_districts`;
CREATE TABLE IF NOT EXISTS `service_districts` (
  `id` float NOT NULL AUTO_INCREMENT,
  `district_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(1000) NOT NULL,
  `client_id` int(11) NOT NULL,
  `password` varchar(300) NOT NULL,
  `role_id` int(11) NOT NULL,
  `auth_token` varchar(150) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_email`, `client_id`, `password`, `role_id`, `auth_token`, `status`) VALUES
(9, 'manager@easybuilding.com', 0, '25d55ad283aa400af464c76d713c07ad', 3, '6SLYLQA7Z895UE2Y0YR88NX5A1HYSX3EOCTQPHTYUEFCU6YHMMNLUTJIWTS3T8Q099H2WQ4UKB1XW8.0914E2THJRJ.B7M5FTZ5I', 1),
(7, 'nipunann0710@gmail.com', 0, 'f6fdffe48c908deb0f4c3bd36c032e72', 2, '50WNHBUTVETA0C8JXR3GFWHD4F76A3HF7Q49.76AIGKOCLI43JCPS775OW8DOM344A46M2WBTOJ687TYDWK.4.XWTJK40SSIEETI', 1);

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
) ENGINE=MyISAM AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_sessions`
--

INSERT INTO `user_sessions` (`session_id`, `client_id`, `auth_token`, `password`) VALUES
(49, 68, 'ya29.a0AfH6SMBOtHqXoOMrDPi0KQBpa_kH4zb_BblRmBGas0Mm2PyMhnB01FaSW-TBa8iijdnJRsRV8fu2ziBml-tHqYuimqr97-JbnUP6Miw2IlMWiDuxzW9Xx7hoKVy42DHHWLcgTMDskZHv7eCNo1xnMgq9-J2L-xV52Aom1A', ''),
(50, 69, 'EAAlrbREIkZCkBADIzYv4TSZC9sqnIwzMgKM7lYQCYFvlatZB53BcU6h61OWTfAiPZAZCGAC8MEwkmgLxZBYONS17uVUlYPSL7KFq7tU6i9hc0sggFdUPndHFrcZASazH1JfOtlyunu5tI6EZBGjE454ikaCEpsYM2ZBlmZCEhZAMRp31e2HmaFAZANf93yNZBgabg2rP5lFW4KddRp4Oac8PKgzy4', ''),
(48, 67, 'ya29.a0AfH6SMDXG1umKIPgSZI9I6yRwt3jnALF3zgdnvehalcxiDciLlk0GsDM4b61uG4eYsfFXxgG7tAh2OpDdprxXbGidaguowME5euXLE8zgE4LgWXjqEAxk_ULqCVg-F-L9YcSZj7Y0J7lduv1EaIn17IeCCni6t_8omsbcA', ''),
(47, 66, 'EAAlrbREIkZCkBANFVZCZC4KBodsg0MLrBa0LxAHqogvkXpEL0ZCzfSivvnaPocbhB5AKbytZAOpJJZAaPhyjXBR0THfVQf9eDVphVLQ90myGA8guANo6wr8noJtJRTFVTYgIYcZCB1GuhENugti14unBQm7KxXoJTD3kwsGAHZCMkYpGbFO5yezAsXPfe7Oj8U54gCmeC70uOlluWrMCq8FD', ''),
(46, 65, 'EAAlrbREIkZCkBAOHVjjUZCBewHTfKUnqDc56JFkG7bKHsi9GQhxZCrm9tUY4ZBYg76zZB2xZC99j22HoU0AGkPOJuW0IxZAVd4hI96l4oQtG4saG6STgGKiCZCtvhPO5kGsMZAJYkdwpnpeQqFThhDFZCiZB5QarXXswuA4tXLyTdYQ1G01EAv25mS0ZA1eYTSJu6P8m7N8l9zuypCpY4T2roZBs3', '');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
