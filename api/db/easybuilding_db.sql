-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 09, 2020 at 07:59 PM
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
-- Table structure for table `cites`
--

DROP TABLE IF EXISTS `cites`;
CREATE TABLE IF NOT EXISTS `cites` (
  `city_id` int(11) NOT NULL AUTO_INCREMENT,
  `district_id` int(11) NOT NULL,
  `city` varchar(70) NOT NULL,
  PRIMARY KEY (`city_id`)
) ENGINE=MyISAM AUTO_INCREMENT=1277 DEFAULT CHARSET=latin1;

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
(1276, 20, 'Tangalle');

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `client_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `display_name` varchar(100) NOT NULL,
  `description` varchar(1500) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address_line1` varchar(250) NOT NULL,
  `address_line2` varchar(250) NOT NULL,
  `city` varchar(100) NOT NULL,
  `tel1` varchar(30) NOT NULL,
  `tel2` varchar(30) NOT NULL,
  `profie_image` varchar(1000) NOT NULL,
  `cover_img` varchar(1000) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `provider` varchar(1) NOT NULL,
  `provider_id` varchar(150) NOT NULL,
  PRIMARY KEY (`client_id`)
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`client_id`, `first_name`, `last_name`, `display_name`, `description`, `email`, `address_line1`, `address_line2`, `city`, `tel1`, `tel2`, `profie_image`, `cover_img`, `status`, `provider`, `provider_id`) VALUES
(41, 'Nipuna', 'Nanayakkara', '', '<p>In this<strong> two-story addition</strong>, the Owner\'s did not simply get more space – the very feel of their home was revolutionized. Through the remodel process, what had been a fine living area before was transformed into an exceptionally open and bright space for welcoming guests and thriving as a family. The deftly designed addition emphasizes a large back deck, which the family has said feels and acts like an extension of the interior space. The new elevated paver deck overlooks <a href=\"https://google.com\">Downtown Seattle</a> and the<i> Cascade mountain range across Elliott Bay</i>. Significant structural work allowed the family room to expand, a dining room to be created, and the basement den to grow to a full-fledged Seahawk haven.</p>', 'nipunann0710@gmail.com', '', '', '', '', '', 'https://lh3.googleusercontent.com/a-/AOh14GisC--kL07FCODwshq3lCEH8lnSWOfzpBvcjEQbqg=s96-c', '1588525217modern-house-design-architecture-280120-1115-01.jpg', 1, 'G', '101780267759212434309'),
(42, 'Nirmal', 'Nanayakkara', '', '<p>Chad Hemphill has a passion and commitment to build luxury homes making quality and the extensive design and details a priority. We are family-owned, with over 35 years of experience building custom homes and strive to build every home as if it were our own! We specialize in energy efficient homes, offering the latest and best technology in lighting and audio systems. Homebuyers today are more educated than ever and looking for long-lasting quality with an elegant, unique design to make their home their own.&nbsp;</p><p>&nbsp;</p><p>Chad Hemphill strives to build a superior quality home, each with your individual style that creates a lifetime of memories for your family! Our luxury homes have a timeless quality that stand out from the rest, call for an appt to see the difference for yourself!</p>', 'nipuisha@yahoo.com', '275A Colombo Road', 'Kidagammulla', 'Gampaha', '071 6378515', '033 222 8887', 'https://graph.facebook.com/3184985174847762/picture?type=normal', '158849489602.jpg', 1, 'F', '3184985174847762'),
(43, 'Imali', 'Sanduni', '', '', 'accoh.reflect@gmail.com', '', '', '', '', '', 'https://lh3.googleusercontent.com/a-/AOh14Gi-iOlnEEw7eYDlssXy0rNNOvQUc4miPn8cad-y=s96-c', '', 0, 'G', '109437793044293365865');

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
  `company_fb_url` varchar(1000) NOT NULL,
  PRIMARY KEY (`company_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `company_details`
--

INSERT INTO `company_details` (`company_id`, `company_name`, `company_logo`, `company_desc`, `company_start_date`, `company_address`, `company_tel1`, `company_tel2`, `company_email`, `company_fb_url`) VALUES
(1, 'EasyBuilding.lk', '', '<p>EasyBuilding.lk is the Premier House and Building Construction Web Portal which is designed to cater all your construction requirements! We aim at finding a Reputed, Reliable, and Trustworthy local construction related partners for you just within a click.</p><p>&nbsp;</p><p>Our website forms an ideal platform through which client can connect with our reputed service providers, apply for quotation requests, create your own Bill of Quantities (BOQ), view our best deals and rates for your services, while also standing a chance to grasp some of the useful construction tips provided by us! &nbsp;</p><p>&nbsp;</p>', '05/08/2020', '70, Diyawanna Gardens,\nPalawatta, Battaramulla,\nSri Lanka', '0112785843', '0777269108', 'info@easybuilding.lk', '');

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
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_email`, `client_id`, `password`, `role_id`, `auth_token`, `status`) VALUES
(8, 'testmanager@test.com', 0, '25f9e794323b453885f5181f1b624d0b', 3, 'UA304PLIFD5FV4CK2V9VXOZ99Q1R8.J2.87NTA7D41BFGUNLOXKSDHBLFF06ES78OKF3AXO0BK6EAS1CBLMTCQQEF9ZHRAMVF6T8', 1),
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
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_sessions`
--

INSERT INTO `user_sessions` (`session_id`, `client_id`, `auth_token`, `password`) VALUES
(23, 42, 'EAAlrbREIkZCkBAPJQRUnohLauXluZAfx6StSyPMySEdAZC6MClZBvMIXi9811oUpDREC4ffdEqyCd79CKEjIfOMj7ZCUMiurkZCJNQNIBbeQR9P91mcPzdFHdUwXOtpXWiUUcbZCpeZA5qdtEpyZBzocTl5BZBCeTqg5M3IkqhdvSrLW02qKTq9Jjs0TMzL8qP4KZA5laHkShosQkZANWX26wxoK', ''),
(24, 43, 'ya29.a0Ae4lvC3Qr8iROZB1ukLhikigM36DHwGsBGquWmBhf1Um-jae5kBfP3CXuOaQNbkvjtvCxQ6Nui_Qa77orYzjRyBBapBfUON-amSRVPCbaGEgTOWTauy7vz4oOPNUEhfTDyQClGl4eAF_cI2A0xzccU-_xmq2bTpJJObZ', ''),
(22, 41, 'ya29.a0Ae4lvC2W6sHP_AhUgZv_H_Nf-mYzpnErkS4894GxQXmsQaI_fSDRZ8MWH2ad0OfaksZA1sXgJ5WaYI6juVMcPKmnhLHU0koAHSp4Qjnk3OvcnCXo5hT1pmwzOYKpzqrPqBkhQo41hC4uc1rx75mZHvLG5-HseAvPyurFHg', '');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
