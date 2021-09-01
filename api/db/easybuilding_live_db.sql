-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 01, 2021 at 06:44 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `easybuilding_live_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `cat_id` varchar(100) DEFAULT '0',
  `cat_name` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `cat_id`, `cat_name`) VALUES
(19, 'C1019', 'Services'),
(15, 'C1015', 'Products'),
(22, 'C1022', 'Photos');

-- --------------------------------------------------------

--
-- Table structure for table `categories-level1`
--

CREATE TABLE `categories-level1` (
  `id` int(11) NOT NULL,
  `cat_lvl1_id` varchar(100) NOT NULL,
  `cat_lvl1_name` varchar(100) NOT NULL,
  `parent_cat_id` varchar(100) NOT NULL,
  `sort_order` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories-level1`
--

INSERT INTO `categories-level1` (`id`, `cat_lvl1_id`, `cat_lvl1_name`, `parent_cat_id`, `sort_order`) VALUES
(15, 'CL11015', 'Construction Contractors', 'C1019', 1),
(16, 'CL11016', 'Professional Service Providers', 'C1019', 3),
(18, 'CL11018', 'Construction Materials', 'C1015', 6),
(21, 'CL11021', 'Electrical, AC & Mechanical Contractors', 'C1019', 2),
(22, 'CL11022', 'Flooring Materials ', 'C1015', 9),
(23, 'CL11023', 'Paints & Coating ', 'C1015', 11),
(24, 'CL11024', 'Electrical ', 'C1015', 3),
(25, 'CL11025', 'Furniture ', 'C1015', 2),
(26, 'CL11026', 'Bathroom ', 'C1015', 4),
(27, 'CL11027', 'Roofing Materials', 'C1015', 12),
(28, 'CL11028', 'CCTV & Home Security Systems ', 'C1015', 8),
(29, 'CL11029', 'House Interior Deco ', 'C1015', 1),
(30, 'CL11030', 'AC & Mechanical Systems ', 'C1015', 7),
(32, 'CL11032', 'Machinery Tools and Vehicles ', 'C1015', 10),
(33, 'CL11033', 'House', 'C1022', 1),
(34, 'CL11034', 'Product Photos', 'C1022', 2),
(39, 'CL11039', 'Hardware Shops (Near By) ', 'C1015', 5);

-- --------------------------------------------------------

--
-- Table structure for table `categories-level2`
--

CREATE TABLE `categories-level2` (
  `id` int(11) NOT NULL,
  `cat_lvl2_id` varchar(100) NOT NULL,
  `cat_lvl2_name` varchar(100) NOT NULL,
  `parent_cat_id` varchar(100) NOT NULL,
  `file_name` varchar(100) NOT NULL,
  `featured` int(11) NOT NULL DEFAULT 0,
  `featured_order` int(11) NOT NULL DEFAULT 0,
  `sort_order` int(11) NOT NULL DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories-level2`
--

INSERT INTO `categories-level2` (`id`, `cat_lvl2_id`, `cat_lvl2_name`, `parent_cat_id`, `file_name`, `featured`, `featured_order`, `sort_order`) VALUES
(185, 'CL21185', 'Fabrications (Steel & Stainless Steel)', 'CL11021', '16229508971721452706.jpg', 0, 0, 0),
(11, 'CL21011', 'Architects', 'CL11016', '1622081531588719478.jpg', 0, 0, 0),
(13, 'CL21013', 'Interior Work, Partition Work & Ceiling work Contractors', 'CL11017', '', 0, 0, 0),
(14, 'CL21014', 'Interior Designers', 'CL11017', '', 0, 0, 0),
(184, 'CL21184', 'Hardware Shops', 'CL11039', '16223078931959308477.jpg', 0, 0, 0),
(16, 'CL21016', 'Cement', 'CL11018', '1622081360708768815.jpg', 0, 0, 3),
(18, 'CL21018', 'Ready Mix Concrete', 'CL11018', '16220812501727112173.jpg', 0, 0, 8),
(20, 'CL21020', 'Pipes & Sealants', 'CL11018', '1622081018825471857.jpg', 0, 0, 7),
(22, 'CL21022', 'Structural Engineers', 'CL11016', '16220805772118126615.jpg', 0, 0, 0),
(23, 'CL21023', 'Sand & Stones ', 'CL11018', '1622080905690067731.jpg', 0, 0, 2),
(24, 'CL21024', 'Bricks & Blocks', 'CL11018', '1622080169189366919.jpg', 0, 0, 1),
(146, 'CL21146', 'Houses (Exterior look)', 'CL11033', '16143670451697543230.jpg', 1, 9, 2),
(27, 'CL21027', 'Water Proofing Materials ', 'CL11018', '16220429851911635601.jpg', 0, 0, 11),
(28, 'CL21028', 'Glass and AL', 'CL11018', '1622042595863172419.jpg', 0, 0, 6),
(29, 'CL21029', 'Door & Window Fittings ', 'CL11018', '16220423511475836019.jpg', 0, 0, 5),
(32, 'CL21032', 'Concrete Products', 'CL11018', '16220419581849028808.jpg', 0, 0, 4),
(33, 'CL21033', 'Timber & Saw Mills', 'CL11018', '16220391591806562146.jpg', 0, 0, 10),
(179, 'CL21179', 'House Cleaners', 'CL11015', '16220386401463125632.jpg', 0, 0, 9),
(180, 'CL21180', 'Designers Interior ', 'CL11016', '1622038726758825684.jpg', 0, 0, 0),
(181, 'CL21181', 'Steel Reinforcement ', 'CL11018', '1622082201901579628.jpg', 0, 0, 9),
(43, 'CL21043', 'Quantity Surveyors (QS)', 'CL11016', '16220380561805798896.jpg', 0, 0, 0),
(44, 'CL21044', 'Surveyors Land', 'CL11016', '16220379611076365339.jpg', 0, 0, 0),
(45, 'CL21045', 'Draftsman', 'CL11016', '16220378311766870921.jpg', 0, 0, 0),
(46, 'CL21046', 'Electrical Engineers', 'CL11016', '1622037767570893443.jpg', 0, 0, 0),
(47, 'CL21047', 'Plumbing Engineers (MEP)', 'CL11016', '16220376971110060609.jpg', 0, 0, 0),
(48, 'CL21048', 'Air condition & Energy Consultants (AC)', 'CL11016', '16220371861338761786.jpg', 0, 0, 0),
(50, 'CL21050', '3D Images', 'CL11016', '16220365501069361308.jpg', 0, 0, 0),
(51, 'CL21051', 'Home Valuers', 'CL11016', '1622036498919821605.jpg', 0, 0, 0),
(52, 'CL21052', 'Project Managers', 'CL11016', '1622036125352526495.jpg', 0, 0, 0),
(53, 'CL21053', 'Steel Building ', 'CL11015', '16220339311717716567.jpg', 0, 0, 15),
(54, 'CL21054', 'Road & Infrastructure ', 'CL11015', '1622033826276695619.jpg', 0, 0, 13),
(55, 'CL21055', 'Painters', 'CL11015', '16220337181227014601.jpg', 0, 0, 2),
(56, 'CL21056', 'Landscaping & Paving ', 'CL11015', '1622033574910502458.jpg', 0, 0, 10),
(57, 'CL21057', 'Grass  & Tree Cutters', 'CL11015', '1622033416401124770.jpg', 0, 0, 6),
(58, 'CL21058', 'Carpenters & Wood ', 'CL11015', '1622033286585664779.jpg', 0, 0, 5),
(59, 'CL21059', 'Plumbers', 'CL11015', '16220332291953113241.jpg', 0, 0, 12),
(60, 'CL21060', 'Water Proofing ', 'CL11015', '1622033163692690422.jpg', 0, 0, 18),
(61, 'CL21061', 'Soil & Concrete Testing ', 'CL11015', '1622032915921255039.jpg', 0, 0, 14),
(62, 'CL21062', 'Aluminum & Glass ', 'CL11015', '16220316341699858612.jpg', 0, 0, 3),
(63, 'CL21063', 'Masons', 'CL11015', '1622031573435581316.jpg', 0, 0, 1),
(64, 'CL21064', 'Welders & Steel', 'CL11015', '16220315211917173185.jpg', 0, 0, 19),
(65, 'CL21065', 'Titanium & Tiling', 'CL11015', '1622031322274655327.jpg', 0, 0, 17),
(66, 'CL21066', 'Pest Controllers', 'CL11015', '16220309241253946158.jpg', 0, 0, 11),
(68, 'CL21068', 'Swimming Pool ', 'CL11015', '1622030715578567425.jpg', 0, 0, 16),
(69, 'CL21069', 'Gully Bowsers ', 'CL11015', '16220305471655403726.jpg', 0, 0, 7),
(70, 'CL21070', 'Electricians', 'CL11021', '16216697151774324931.jpg', 0, 0, 0),
(71, 'CL21071', 'Electrical  Contractors', 'CL11021', '1621669567760155954.jpg', 0, 0, 0),
(72, 'CL21072', 'AC Contractors', 'CL11021', '16216694251847363675.jpg', 0, 0, 0),
(74, 'CL21074', 'AC Technicians', 'CL11021', '16216690021544578759.jpg', 0, 0, 0),
(75, 'CL21075', 'Solar ', 'CL11021', '16216687931256804441.jpg', 0, 0, 0),
(79, 'CL21079', 'Titanium Products', 'CL11022', '16216686031925246051.jpg', 0, 0, 0),
(80, 'CL21080', 'Tiles', 'CL11022', '16216662101744838490.jpg', 0, 0, 0),
(81, 'CL21081', 'Timber & Wooden Flooring', 'CL11022', '16216660051091066887.jpg', 0, 0, 0),
(82, 'CL21082', 'Carpets', 'CL11022', '1621665855189513598.jpg', 0, 0, 0),
(83, 'CL21083', 'Epoxy and Floor Paints', 'CL11022', '1621665598241994076.jpg', 0, 0, 0),
(84, 'CL21084', 'Laminated Flooring', 'CL11022', '16216654051120260574.jpg', 0, 0, 0),
(85, 'CL21085', 'Wall Paints', 'CL11023', '1621661619465862946.jpg', 0, 0, 0),
(86, 'CL21086', 'Wood Care Coatings', 'CL11023', '1621661346269729626.jpg', 0, 0, 0),
(89, 'CL21089', 'Primer Paints ', 'CL11023', '1621661081747078706.jpg', 0, 0, 0),
(90, 'CL21090', 'Steel & Metal Care Coatings', 'CL11023', '16216614301945077043.jpg', 0, 0, 0),
(91, 'CL21091', 'Light Fittings', 'CL11024', '1621659522565851551.jpg', 0, 0, 0),
(92, 'CL21092', 'Wires & Cables', 'CL11024', '1621659630561069904.jpg', 0, 0, 0),
(175, 'CL21175', 'Pumps & Motors', 'CL11024', '16216598861077422701.jpg', 0, 0, 0),
(96, 'CL21096', 'Electrical Accessories ', 'CL11024', '16216593211039946574.jpg', 0, 0, 0),
(97, 'CL21097', 'Generators', 'CL11024', '1621658941872235470.jpg', 0, 0, 0),
(98, 'CL21098', 'Roller Doors & Gates', 'CL11024', '1621658693189731967.jpg', 0, 0, 0),
(99, 'CL21099', 'Sofas', 'Furniture', '', 0, 0, 0),
(100, 'CL21100', 'Living Room Furniture', 'Furniture', '', 0, 0, 0),
(174, 'CL21174', 'Pantry Cupboards', 'CL11025', '16211839532004052402.jpg', 0, 0, 0),
(103, 'CL21103', 'Living & Dining Room (Kitchen) Furniture', 'CL11025', '16211837181944970691.jpg', 0, 0, 0),
(104, 'CL21104', 'Office Furniture ', 'CL11025', '162118337485186557.jpg', 0, 0, 0),
(173, 'CL21173', 'Electrical Appliances ', 'CL11029', '1621182538463274465.jpg', 0, 0, 3),
(106, 'CL21106', 'Bed Room  Furniture ', 'CL11025', '162118321318885662.jpg', 0, 0, 0),
(107, 'CL21107', 'Outdoor Furniture ', 'CL11025', '16211830901263989603.jpg', 0, 0, 0),
(111, 'CL21111', 'Floor & Wall Tiles', 'CL11026', '1621181043549117907.jpg', 0, 0, 0),
(112, 'CL21112', 'Bathroom Fittings', 'CL11026', '16211799312049517681.jpg', 0, 0, 0),
(116, 'CL21116', 'Roofing Tiles', 'CL11027', '1621179398787835719.jpg', 0, 0, 0),
(117, 'CL21117', 'Roofing Sheets', 'CL11027', '16211795371295563313.jpg', 0, 0, 0),
(118, 'CL21118', 'Gutters', 'CL11027', '1621179310195152310.jpg', 0, 0, 0),
(122, 'CL21122', 'Fire Protection ', 'CL11028', '16211784382086945137.jpg', 0, 0, 0),
(124, 'CL21124', 'Sound Systems', 'CL11028', '16211783261848181070.jpg', 0, 0, 0),
(125, 'CL21125', 'IT & Network', 'CL11028', '162117810048560480.jpg', 0, 0, 0),
(126, 'CL21126', 'CCTV & Security', 'CL11028', '16211777321159597420.jpg', 0, 0, 0),
(127, 'CL21127', 'Blinds & Curtains', 'CL11029', '16211768371419555237.jpg', 0, 0, 2),
(128, 'CL21128', 'Arts & Crafts', 'CL11029', '16211765031018264277.jpg', 0, 0, 4),
(130, 'CL21130', 'Plywood & Gypsum', 'CL11029', '1621176174619642632.jpg', 0, 0, 1),
(132, 'CL21132', 'Air Condition', 'CL11030', '16211753621856536332.jpg', 0, 0, 1),
(134, 'CL21134', 'Industrial Machineries ', 'CL11030', '1621174416286899697.jpg', 0, 0, 4),
(135, 'CL21135', 'Lifts & Hoists', 'CL11030', '16211741022045586252.jpg', 0, 0, 3),
(136, 'CL21136', 'Fans & Exhausts', 'CL11030', '16211752131350404102.jpg', 0, 0, 2),
(143, 'CL21143', 'Heavy Machines', 'CL11032', '16211708861121778313.jpg', 0, 0, 0),
(144, 'CL21144', ' Tools', 'CL11032', '16211498731545559773.jpg', 0, 0, 0),
(145, 'CL21145', 'Material Handling ', 'CL11032', '162115029942889733.jpg', 0, 0, 0),
(147, 'CL21147', 'Living Rooms', 'CL11033', '1622092608190020996.jpg', 1, 3, 8),
(148, 'CL21148', 'Bed Room & Closet', 'CL11033', '16143644231004933114.jpg', 1, 5, 4),
(149, 'CL21149', 'Kitchen & Pantry', 'CL11033', '16143661591659840798.jpg', 1, 2, 3),
(150, 'CL21150', 'Bathrooms', 'CL11033', '16220924701773124543.jpg', 1, 6, 5),
(151, 'CL21151', 'Landscaping', 'CL11033', '16220922971823272305.jpg', 1, 1, 6),
(152, 'CL21152', 'Swimming Pools', 'CL11033', '1622092090399755567.jpg', 1, 8, 9),
(154, 'CL21154', 'Light fittings ', 'CL11033', '1622091734532643194.jpg', 1, 7, 7),
(156, 'CL21156', 'Furniture', 'CL11033', '1614366711502216453.jpg', 1, 4, 1),
(182, 'CL21182', 'Air Condition Units', 'CL11034', '16220930761550126156.jpg', 0, 0, 0),
(183, 'CL21183', 'test1', 'CL11034', '', 0, 0, 0),
(177, 'CL21177', 'House Building Contractors', 'CL11015', '16220342501513318709.jpg', 0, 0, 8),
(178, 'CL21178', 'Building Contractors', 'CL11015', '16220343892059626478.jpg', 0, 0, 4);

-- --------------------------------------------------------

--
-- Table structure for table `cites`
--

CREATE TABLE `cites` (
  `city_id` int(11) NOT NULL,
  `district_id` int(11) NOT NULL,
  `city` varchar(70) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
(1284, 10, 'Kirindiwela'),
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
(1277, 23, 'Thalawakale'),
(1279, 10, 'Ragama'),
(1280, 8, 'Mulleriyawa'),
(0, 8, 'Colombo'),
(1283, 8, 'Habarakada');

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `client_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `company_name` varchar(1000) NOT NULL,
  `email` varchar(100) NOT NULL,
  `profie_image` varchar(1000) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `provider` varchar(1) NOT NULL,
  `provider_id` varchar(150) NOT NULL,
  `verified_email` int(11) NOT NULL DEFAULT 0,
  `verify_code` int(11) NOT NULL,
  `request_reset` int(11) NOT NULL DEFAULT 0,
  `created_date` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`client_id`, `first_name`, `last_name`, `company_name`, `email`, `profie_image`, `status`, `provider`, `provider_id`, `verified_email`, `verify_code`, `request_reset`, `created_date`) VALUES
(155, 'Admin', 'User', '', 'info@easybuilding.lk', '', 1, 'E', '1622124850344', 0, 0, 0, '2021-05-27'),
(156, 'Admin', 'User', '', 'info@easybuilding.lk', '', 1, 'E', '1622286559218', 0, 0, 0, '2021-05-29'),
(157, 'Admin', 'User', '', 'info@easybuilding.lk', '', 1, 'E', '1622303240408', 0, 0, 0, '2021-05-29'),
(153, 'Admin', 'User', '', 'info@easybuilding.lk', '', 1, 'E', '1622101749409', 0, 0, 0, '2021-05-27'),
(77, 'Mithila', 'Samarasingha', '', 'mithila@gmail.com', '', 1, 'E', '1598932425341', 0, 0, 0, '2020-07-16'),
(85, 'Thilini', 'Perera', '', 'thilini.perera@gmail.com', '', 1, 'E', '1605501792378', 0, 0, 0, '2020-12-26'),
(120, 'Admin', 'User', '', 'info@easybuilding.lk', '', 1, 'E', '1609095873650', 0, 0, 0, '2020-12-08'),
(126, 'Admin', 'User', '', 'info@easybuilding.lk', '', 1, 'E', '1609153074082', 0, 0, 0, '2020-12-10'),
(135, 'Admin', 'User', '', 'info@easybuilding.lk', '', 1, 'E', '1612607512083', 0, 0, 0, '2021-02-06'),
(136, 'Admin', 'User', '', 'info@easybuilding.lk', '', 1, 'E', '1612613689940', 0, 0, 0, '2021-02-06'),
(159, 'Admin', 'User', '', 'info@easybuilding.lk', '', 1, 'E', '1622553389238', 0, 0, 0, '2021-06-01'),
(161, 'Admin', 'User', '', 'info@easybuilding.lk', '', 1, 'E', '1622865401236', 0, 0, 0, '2021-06-04'),
(162, 'Admin', 'User', '', 'info@easybuilding.lk', '', 1, 'E', '1622884528952', 0, 0, 0, '2021-06-05'),
(163, 'Admin', 'User', '', 'info@easybuilding.lk', '', 1, 'E', '1622902338121', 0, 0, 0, '2021-06-05'),
(164, 'Admin', 'User', '', 'info@easybuilding.lk', '', 1, 'E', '1622951034285', 0, 0, 0, '2021-06-05'),
(165, 'Admin', 'User', '', 'info@easybuilding.lk', '', 1, 'E', '1622956014937', 0, 0, 0, '2021-06-06'),
(175, 'Nirmal', 'Nanayakkara', '', 'nirmalnipunananayakkara@gmail.com', '1623517313prof.png', 1, 'F', '1260295603983405', 0, 0, 8364, '2021-06-12'),
(173, 'Admin', 'User', '', 'info@easybuilding.lk', '', 1, 'E', '1623492009495', 0, 0, 0, '2021-06-12'),
(174, 'Admin', 'User', '', 'info@easybuilding.lk', '', 1, 'E', '1623498783211', 0, 0, 0, '2021-06-12'),
(176, 'Admin', 'User', '', 'info@easybuilding.lk', '', 1, 'E', '1623555199919', 0, 0, 0, '2021-06-12'),
(177, 'Admin', 'User', '', 'info@easybuilding.lk', '', 1, 'E', '1623557955940', 0, 0, 0, '2021-06-13'),
(179, 'Dilan', 'Gunasekara', '', 'dkavinda90@gmail.com', '1623568657prof.png', 1, 'G', '118193087047669896944', 0, 0, 0, '2021-06-13'),
(186, 'Admin', 'User', '', 'info@easybuilding.lk', '', 1, 'E', '1624522829984', 0, 0, 0, '2021-06-24'),
(185, 'Mithila', 'Samarasinghe', '', 'mithilas@easybuilding.lk', '', 1, 'E', '1624166087468', 0, 0, 0, '2021-06-20'),
(181, 'Nadeesha', 'Madurawalage', '', 'nadeesham@masholdings.com', '', 1, 'E', '1623597097073', 0, 0, 0, '2021-06-13'),
(187, 'Admin', 'User', '', 'info@easybuilding.lk', '', 1, 'E', '1624524016231', 0, 0, 0, '2021-06-24'),
(188, 'Admin', 'User', '', 'info@easybuilding.lk', '', 1, 'E', '1624524519844', 0, 0, 0, '2021-06-24'),
(189, 'Admin', 'User', '', 'info@easybuilding.lk', '', 1, 'E', '1624525241452', 0, 0, 0, '2021-06-24'),
(190, 'Admin', 'User', '', 'info@easybuilding.lk', '', 1, 'E', '1624766022294', 0, 0, 0, '2021-06-26'),
(213, 'Admin', 'User', '', 'info@easybuilding.lk', '', 1, 'E', '1625993678151', 0, 0, 0, '2021-07-11'),
(210, 'Admin', 'User', '', 'info@easybuilding.lk', '', 1, 'E', '1625991163954', 0, 0, 0, '2021-07-11'),
(0, 'Admin', 'User', '', 'info@easybuilding.lk', '', 1, 'E', '16296409244970', 0, 0, 0, '2021-08-22'),
(217, 'Nipuna', 'Nanayakkara', '', 'nipunann0710@gmail.com', '1630233192prof.png', 1, 'G', '101780267759212434309', 0, 0, 0, '2021-08-29');

-- --------------------------------------------------------

--
-- Table structure for table `client_company`
--

CREATE TABLE `client_company` (
  `company_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `display_name` varchar(100) NOT NULL,
  `description` varchar(1500) NOT NULL,
  `website` varchar(300) NOT NULL,
  `br_no` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address_line1` varchar(200) NOT NULL,
  `address_line2` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `city_id` int(11) NOT NULL,
  `tel1` varchar(25) NOT NULL,
  `tel2` varchar(25) NOT NULL,
  `profie_image` varchar(1000) NOT NULL,
  `cover_img` varchar(1000) NOT NULL,
  `prof_category` int(11) NOT NULL,
  `verified_email` int(11) NOT NULL DEFAULT 0,
  `verify_code` int(11) NOT NULL DEFAULT 0,
  `steps` int(11) NOT NULL DEFAULT 0,
  `parent` int(11) DEFAULT 0,
  `all_island` int(11) NOT NULL DEFAULT 0,
  `service` int(11) NOT NULL DEFAULT 0,
  `products` mediumblob NOT NULL,
  `product_string` blob NOT NULL,
  `service_areas` mediumblob NOT NULL,
  `service_dist` mediumblob NOT NULL,
  `services` mediumblob NOT NULL,
  `services_string` blob NOT NULL,
  `total_reviews` int(11) NOT NULL DEFAULT 0,
  `rating` float NOT NULL,
  `company_profile` int(11) NOT NULL DEFAULT 1,
  `featured` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `client_company`
--

INSERT INTO `client_company` (`company_id`, `client_id`, `display_name`, `description`, `website`, `br_no`, `email`, `address_line1`, `address_line2`, `city`, `city_id`, `tel1`, `tel2`, `profie_image`, `cover_img`, `prof_category`, `verified_email`, `verify_code`, `steps`, `parent`, `all_island`, `service`, `products`, `product_string`, `service_areas`, `service_dist`, `services`, `services_string`, `total_reviews`, `rating`, `company_profile`, `featured`, `status`) VALUES
(103, 162, 'Vibhawa Consultants  (Electrical & Energy)', '<p>Vibhawa Consultants (Pvt) Ltd is a Leading Electrical Consultancy &amp; Electrical Testing Services Providing Company Based in Colombo, Sri Lanka. Vibhawa Consultants extend its service to Electrical Testing &amp; Inspection, Electrical Safty Audits, Condition Monitoring, Electrical Design Services, Charted Engineer Certifications, and Energy Management.&nbsp;</p>', 'https://vibhawa.lk', '', 'info@vibhawa.lk', '651 Kotte Rd,', 'Sri Jayawardenepura Kotte', 'Ethulkotte ', 0, '76 657 0000 ', '76 034 7737', '16228855351137167354.jpg', '16228873781452133403.jpg', 2, 0, 0, 4, 0, 0, 0, 0x5b5d, '', 0x5b5d, 0x5b2238222c223130222c223133225d, 0x5b22434c3231303436222c22434c3231303438225d, '', 0, 3.5, 1, 1, 1),
(105, 164, 'Eaksha Holdings (Pvt) Ltd', '<p>Steel and Stainless Steel Fabricators. All household and industrial fabrication work will be fabricated with the best engineering and quality features.</p>', '', '', 'info@eaksha.com', 'No. 147/B,', 'Honnanthara,', 'Piliyandala', 1076, '0714800889', '', '16229515961295729576.jpg', '1622951678131557062.jpg', 3, 0, 0, 4, 0, 0, 0, 0x5b22434c3231313735225d, '', 0x5b5d, 0x5b2238222c223130222c223133225d, 0x5b22434c3231313835225d, '', 0, 0, 1, 0, 1),
(104, 163, '', '', '', '', '', '', '', '', 0, '', '', '', '', 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', 0, 0, -1, 0, 1),
(94, 153, 'Dblend Coatings (Pvt) Limited', '<p>Dblend Coatings (Pvt) Ltd is a &nbsp;manufacturing company of Coatings and Paints. We specialize in manufacturing skim coats, tile mortars, Cement cut Coatings (Titanium), and Wall Decorative Coatings &amp; Paints.&nbsp;</p><p>&nbsp;</p><p>Designed to achieve higher adhesive and bonding strength for leveling agent on masonry surfaces. Made out of finest minerals, special additives, and special polymers.</p><p>&nbsp;</p><p>Dblend tile mortar is specially formulated to lay tiles on floor and wall surfaces which is available in gray and off-white colors. Dblend soft plaster and advanced textured colors are design for an efficient and low-cost option to achieve sand textured colorful walls and many texture designs are available with thousands of color combinations to match customer’s expectations. Get a unique &amp; uncommon appearance on your walls.</p>', 'https://www.dblendcoatings.com', '', 'info@dblendcoatings.com', '163/2, Athurugiriya Road', 'Malapalla,', 'Pannipitiya.', 1268, '0768223314', '0363121272', '16221029811330787413.jpg', '16221030991106064860.jpg', 4, 0, 0, 4, 0, 0, 0, 0x5b22434c3231303839222c22434c3231303835222c22434c3231303237222c22434c3231303739225d, '', 0x5b5d, 0x5b2238222c223130222c223133225d, 0x5b5d, '', 0, 0, 1, 0, 1),
(96, 155, 'Jayathilaka Construction ', '<p>A very reliable, trustworthy, and technically very competent house building contractor. Construction drawing will be followed and technical execution plans given by consultants will be correctly and neatly followed. &nbsp;Expert in civil construction work, foundation work, slab work , tile flooring work, and all house finishing construction work.</p>', '', '', '', '134/2, Eight Miles Post,', 'Panamure,', 'Embilipitiya', 1260, '0717493877', '0714224251', '16221266251160423746.jpg', '16221266031855379007.jpg', 3, 0, 0, 4, 0, 0, 0, 0x5b5d, '', 0x5b5d, 0x5b2238222c2239222c223130222c223131222c223133222c223230222c223231222c223236225d, 0x5b22434c3231303633222c22434c3231313737225d, '', 0, 0, 1, 0, 1),
(97, 156, 'Tissa Construction ', '<p>Reliable and Trustworthy House Building Contractor. &nbsp;Experience more than 20 years in the house, building, and civil construction work. &nbsp;</p>', '', '', '', 'No: 26/10,', 'PahalaGettuwana, ', 'Kurunegala', 1197, '0773875157', '', '1622287203959142068.jpg', '1622287248140047086.jpg', 3, 0, 0, 4, 0, 0, 0, 0x5b5d, '', 0x5b5d, 0x5b2238222c223130222c223134222c223137225d, 0x5b22434c3231313738222c22434c3231313737225d, '', 0, 2, 1, 1, 1),
(102, 161, 'Euro Pantry Systems ', '<p>Euro Pantry System is a Manufacturer and Supplier of Best Quality Furniture, Pantry Systems, &nbsp;TOP STAR post forming laminates, Fioronti Giovenzana (FGV) Dolce Vita kitchen inner wear and accessories, Aluminia Italia for aluminum profiles, Vicostone quartz countertops for worktops and, SIGEE ITALY wire basket innerwear for kitchens and FBS Italy for aluminum roller shutters are the main collaborators.</p><p>&nbsp;</p><p><br>&nbsp;</p>', 'http://europantry.lk/', '', 'info@europantry.lk', '83/1 Ward Place,', '', 'Colombo 7 ', 0, '011 2683632', '', '16228662451171672860.jpg', '1622866271551124594.jpg', 4, 0, 0, 4, 0, 0, 0, 0x5b22434c3231313036222c22434c3231313033222c22434c3231313034222c22434c3231313734222c22434c3231313733225d, '', 0x5b5d, 0x5b2238222c223130225d, 0x5b5d, '', 0, 4.5, 1, 1, 1),
(50, 120, 'Grass Cutters - Athurugiriya', '', '', '', '', '', '', 'Athurugiriya', 0, '0786553219', '', '', '', 2, 0, 0, 4, 0, 0, 0, 0x2222, '', 0x5b2231303735225d, 0x5b5d, 0x5b22434c3231303537225d, '', 0, 0, 1, 0, 1),
(106, 165, 'Simple Engineering ', '<p>Simple Engineering is a renewable/sustainable energy engineering company. We specialize in machine selection &amp; quality assessment, energy auditing, carbon footprint analysis, factory automation, development &amp;&nbsp;maintenance of hydropower plants, and solar PV systems.</p><p>As&nbsp;a registered Energy Services Company (ESCO), we strive to give the best service at all times for our clients.</p><p>Due to our commitment and contribution to the hydropower sector in the international arena, we have been actively participating as a resource for&nbsp;<a href=\"http://www.hpnet.org/\">HPNet</a>‘s training sessions and knowledge transfer sessions.</p>', 'http://simple-engineering.lk', '', 'info@simple-engineering.lk', '64/7, Suhanda Mawatha,', 'I Jothipala Mawatha,', 'Malabe,', 1073, '011 241 3841', '', '1622956794387410355.jpg', '16229568611963917538.jpg', 2, 0, 0, 4, 0, 1, 0, 0x5b5d, '', 0x5b5d, 0x5b5d, 0x5b22434c3231303438222c22434c3231303735225d, '', 0, 0, 1, 0, 1),
(67, 126, 'Gully bowser service', '', '', '', '', '', '', 'Piliyandala', 0, '0715239985', '', '', '', 2, 0, 0, 4, 0, 0, 0, 0x2222, '', 0x5b5d, 0x5b2238225d, 0x5b22434c3231303639225d, '', 0, 0, 1, 0, 1),
(100, 159, 'Architect Hiranya Sandirigama', '<p>Charted Architect and Interior Designer with Experience, Creative, innovative, and sustainable designs&nbsp;</p>', '', '', 'ftghiran@sltnet.lk', 'No 22/21,Muhandiram Weeratunge Mw,', 'Negombo Rd,', 'Kurunegala.', 1197, '0714626544', '', '1622553842711124716.jpg', '16225538811723871045.jpg', 2, 0, 0, 4, 0, 0, 0, 0x5b5d, '', 0x5b5d, 0x5b2238222c223130222c223137222c223235225d, 0x5b22434c3231303131222c22434c3231313830225d, '', 0, 0, 1, 0, 1),
(76, 135, 'SMS Holdings (Pvt) Ltd', '<p>As Sri Lanka’s largest manufacturer and supplier of paving bricks, we are passionate about where you walk. Since 2001, we’ve paved the way for many leading businesses, notable public spaces as well as residential areas to expand and thrive in.</p>', 'http://smspavers.com/', '', 'info@smspavers.com', '622', 'E.W Perera mawatha,', 'Ethulkotte ', 1069, '011 281 3787', '011 534 2414', '16126087391285042574.jpg', '1612610128815593078.jpg', 3, 0, 0, 4, 0, 1, 0, 0x5b22434c3231303331222c22434c3231303137225d, '', 0x5b5d, 0x5b5d, 0x5b22434c3231303536225d, '', 0, 0, 1, 1, 1),
(77, 136, 'Architect Rukmal Indrajith Kasthiriarchchi', '<p>Architectural Designs - House, Private residencies and Commercial building Architectural Designing and Interior Designing</p>', '', '', '', '107/11', 'Salawa Road', 'Mirihana', 1071, '0112834684', '', '1612614044669515687.jpg', '16126140621767506695.jpg', 1, 0, 0, 4, 0, 0, 0, 0x2222, '', 0x5b5d, 0x5b2238225d, 0x5b22434c3231303131222c22434c3231303132225d, '', 0, 0, 1, 1, 1),
(98, 157, 'Crystal Stone', '<h2>Crystal Stone - Quartz &nbsp;a Luxury that Lasts a Lifetime</h2><p>&nbsp;</p><p>Made from Quartz, one of the strongest minerals in nature, Crystal-Stone is an engineered stone surface, highly resistant to impacts, stains, and scratches. Mainly used as kitchen tops, it is superior to granite in many ways. It is the number one choice internationally due to its hygiene and durability.</p><p>&nbsp;</p><p>Crystal Stone offers a wide range of unique surfaces to choose from. With a smooth finish that’s elegant and seamless, quartz surfaces are available in natural granite-like finishes to dazzling whites. Application is avilable for Kitchen Tops Beautiful Kitchen , Vanity Tops for Elegant Bathroom, Table tops for classy appernaces, &nbsp;floors and Stairs for luxuries living&nbsp;</p><p><br>&nbsp;</p>', 'https://crystalstone.lk', '', 'info@crystalstone.lk', 'No 551 Nawala Road,', 'Koswatta, ', 'Rajagiriya', 1072, '0776678679', '', '16223043552025255039.jpg', '16223044701695249798.jpg', 4, 0, 0, 4, 0, 0, 0, 0x5b22434c3231313132222c22434c3231303830222c22434c3231313033222c22434c3231313734225d, '', 0x5b5d, 0x5b2238222c223130222c223133225d, 0x5b22434c3231303635225d, '', 0, 0, 1, 1, 1),
(116, 175, 'Dubai Homes', '<p>They say, “home is where the heart is”. Setup your dream home or workspace in Dubai where the sun, sand and surf blend with the best the cosmopolitan world has to offer. Dubai has embraced the future and is the perfect place for a family or business to thrive. We at Find My Property help our clients discover the finest homes for sale, lease or rent.</p>', '', '', 'info@oozmm.com', '275 A Colombo Road', '', 'Gampaha', 1040, '033-222-8887', '', '16264525641032645822.jpg', '1628623004459778405.jpg', 1, 0, 0, 4, 0, 0, 0, 0x5b5d, '', 0x5b5d, 0x5b2238222c223130225d, 0x5b22434c3231313830222c22434c3231303131222c22434c3231313737222c22434c3231313738225d, '', 0, 0, 1, 0, 1),
(114, 173, 'Sisira Concrete Works', '<p>Sisira Concrete works are easily located in 3 places in Colombo district – Kaduwela, Malabe, and Biyagama, We supply our products to small households to large scale projects and we have experience in working with contractors, engineers, and developers who want a supplier they can count on to provide good quality concrete products that are built to exacting standards and delivered on time.</p>', 'http://www.sisiraconcreteworks.com', '', 'sisiraconcreteworks@gmail.com', '132/3, Awissawella Road,', 'Hewagama,', 'Kaduwela', 7, '0775175066', ' 0718450148', '16234929901475184794.jpg', '16234929031051266731.jpg', 4, 0, 0, 4, 0, 0, 0, 0x5b22434c3231303332222c22434c3231303234225d, '', 0x5b2231303735222c2231303734222c2236222c2237222c2231303733225d, 0x5b5d, 0x5b22434c3231303536225d, '', 0, 0, 1, 1, 1),
(115, 174, 'Super  Titanium ', '<p>We have a wide range of products and services offered to the construction industry. we are doing macra painting, outsides walls rooftop and bathroom waterproofing products, and Crystolac Super Titanium Special Effect Decorative Wall &amp; Floor Paste is another revolutionary product in the leading Market. It is an easy to apply, special effect wall and floor paste. It gives you maximum freedom for your wall or floor decorating. in these 8 years, we’ve become one of the leading construction materials manufacturer and service provider in Sri Lanka. Starting as a small-scale entity, we’ve introduced a vast range of new products to the construction industry in Sri Lanka, within this 8 years long period. Also, our products have been used in many counties. We are working to become a leader in the production of Super Titanium Special Effects Plaster and Waterproofing Products.</p>', 'https://supertitanium.lk', '', 'crystolac@gmail.com', 'No 32 Sunethradevi Rd,', 'Kohuwala', 'Nugegoda', 1071, '011-4988888', '011-2820255', '1623500365785614124.jpg', '16235004931621681433.jpg', 4, 0, 0, 4, 0, 0, 0, 0x5b22434c3231303739225d, '', 0x5b5d, 0x5b2238222c223130222c223134222c223230225d, 0x5b22434c3231303630222c22434c3231303635225d, '', 0, 0, 1, 1, 1),
(117, 176, 'Binuditha Industries ', '<p>Binuditha Industries are a very reliable &amp; &nbsp;Trustworthy House Construction and Electrical Wiring Company with 10 years\' experience.&nbsp;</p>', '', '', 'binudithaindu@gmail.com', 'No 270,  Lunugama', 'Mandawala', 'Kirindiwela', 1284, '0764136290', '0718342818', '16235561711394427792.jpg', '16235562181285741523.jpg', 3, 0, 0, 4, 0, 0, 0, 0x5b5d, '', 0x5b5d, 0x5b2238222c223130222c223133222c223134225d, 0x5b22434c3231313737222c22434c3231303633222c22434c3231303731222c22434c3231303730225d, '', 0, 0, 1, 0, 1),
(118, 177, 'CBN QS Solutions ', '<p>Professional QS (Quantity Service) Provider and Professional House Building Contractor</p>', '', '', 'binendra7@gmail.com', 'No,127, Makandana,', 'Madapatha', 'Piliyandala', 1076, '0775577678', '0717161231', '1623558638154789397.jpg', '16235586731944040869.jpg', 2, 0, 0, 4, 0, 0, 0, 0x5b5d, '', 0x5b5d, 0x5b2238222c223130222c223133222c223134222c223135225d, 0x5b22434c3231303632222c22434c3231313738222c22434c3231313737222c22434c3231303433222c22434c3231303635222c22434c3231303535225d, '', 0, 0, 1, 0, 1),
(129, 188, 'Nimal Jayasinghe Plumbing Work', '<p>Reliable Plumber&nbsp;</p>', '', '', 'NA', '1A, Andawelwalla', 'Udagama', 'Matale', 1221, '0789604170', '', '1624524827718094815.jpg', '16245248431371859082.jpg', 1, 0, 0, 4, 0, 0, 0, 0x5b5d, '', 0x5b5d, 0x5b2238222c223130222c223139225d, 0x5b22434c3231303539225d, '', 0, 0, 1, 0, 1),
(120, 179, 'Dilan Gunasekara', '', '', '', '', '', '', '', 0, '', '', '', '', 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', 0, 0, 0, 0, 1),
(128, 187, 'K.R.V Anthony Plumbing Work', '<p>A Trustworthy &amp; Reliable Plumber&nbsp;</p>', '', '', 'NA', '230/8/1, Ovitigedhara', '', 'Meegoda', 1058, '0716092971', '', '162452431219363712.jpg', '16245243341685329338.jpg', 1, 0, 0, 4, 0, 0, 0, 0x5b5d, '', 0x5b5d, 0x5b2238225d, 0x5b22434c3231303539225d, '', 0, 0, 1, 0, 1),
(122, 181, 'Nadeesha Madurawalage', '', '', '', 'nadeesham@masholdings.com', '70, diyawanna Gardens', 'palawatta', 'battaramulla', 0, '0777269108', '', '', '', 0, 0, 0, 2, 0, 0, 0, '', '', '', '', '', '', 0, 0, 0, 0, 1),
(126, 185, 'Mithila Samarasinghe', '', '', '', 'mithilas@easybuilding.lk', '70,Diyawanna Gardens,', 'Palawatta', 'Battaramulla', 0, '0777269108', '', '', '', 0, 0, 0, 2, 0, 0, 0, '', '', '', '', '', '', 0, 0, 0, 0, 1),
(127, 186, 'Kapila Indika Plumbing Work', '<p>Very &nbsp;Trustworthy Skilled Plumbing Professional</p>', '', '', 'N/A', '215/3, Lihiniya Garden', 'Puwakwatha Para', 'Meegoda', 1058, '0718038720', '0785828040', '1624523790472409100.jpg', '16245238171524664408.jpg', 1, 0, 0, 4, 0, 0, 0, 0x5b5d, '', 0x5b2231303735222c2231303636222c2231303734222c2231303437222c2231303432222c2231303639222c2231303538222c2237222c2231323638222c2231303631222c2231303733222c2231303731222c2231303634222c2231303638225d, 0x5b5d, 0x5b22434c3231303539225d, '', 0, 0, 1, 0, 1),
(130, 189, 'W.  K. Indika Wood Work', '<p>Very Reliable Trustworthy Wood Work and Roof Work Professional&nbsp;</p>', '', '', 'NA', '215/4, Lihiniya Garden', 'Puwakwatha Para', 'Meegoda', 1058, '0712315396', '', '1624525938266257310.jpg', '16245259561559567963.jpg', 1, 0, 0, 4, 0, 0, 0, 0x5b22434c3231313036222c22434c3231313033222c22434c3231313034222c22434c3231313734225d, '', 0x5b5d, 0x5b2238225d, 0x5b22434c3231303538225d, '', 0, 0, 1, 0, 1),
(131, 190, 'Chaminda Pluming Work', '<p>Reliable and technically very &nbsp;capable Plumber&nbsp;</p>', '', '', '', '284Q, Silavimala Mawatha', 'Oruwala', 'Athurugiriya ', 1075, '0774356864', '0774356864', '16247667302067414334.jpg', '1624766745113102383.jpg', 1, 0, 0, 4, 0, 0, 0, 0x5b5d, '', 0x5b5d, 0x5b2238222c223130222c223133225d, 0x5b22434c3231303539222c22434c3231303730222c22434c3231303635225d, '', 0, 0, 1, 0, 1),
(154, 213, 'New Bus2', '', '', '', '', '23 Kandy Road', '', 'Kegalle', 1182, '0813356223', '', '', '', 2, 0, 0, 4, 0, 0, 0, 0x5b22434c3231313330225d, '', 0x5b5d, 0x5b223134222c223135225d, 0x5b22434c3231313835222c22434c3231303630225d, '', 0, 0, 1, 0, 1),
(151, 210, 'LK Homes', '', '', '', '', '23', '', 'Colombo', 1047, '01122233342', '', '', '', 1, 0, 0, 4, 0, 0, 0, 0x5b22434c3231313434222c22434c3231313330222c22434c3231313733225d, '', 0x5b5d, 0x5b2237222c2238225d, 0x5b22434c3231313835222c22434c3231303735225d, '', 0, 0, 1, 0, 1),
(158, 217, 'B@B Sri Lanka', '', '', '', 'nnn@gmail.com', '275A Colombo Road', '', 'Gampaha', 1086, '0716378556', '', '', '', 2, 0, 0, 4, 0, 0, 0, 0x5b5d, '', 0x5b2231303836222c2231303934222c2231323639225d, 0x5b5d, 0x5b22434c3231313738222c22434c3231303537222c22434c3231313835222c22434c3231303436225d, '', 0, 0, 1, 0, 1),
(0, 0, 'Easybuilding Admin', '', '', '00000', '', '70, Diyawanna Gardens,', 'Palawatta', 'Battaramulla', 0, '77 7269108', '', '', '', 1, 0, 0, 4, 0, 1, 0, 0x5b5d, '', 0x5b5d, 0x5b5d, 0x5b22434c3231313830222c22434c3231303131225d, '', 0, 0, 1, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `company_details`
--

CREATE TABLE `company_details` (
  `company_id` int(11) NOT NULL,
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
  `linkedin_url` varchar(250) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `company_details`
--

INSERT INTO `company_details` (`company_id`, `company_name`, `company_logo`, `company_desc`, `company_start_date`, `company_address`, `company_tel1`, `company_tel2`, `company_email`, `fb_url`, `twitter_url`, `youtube_url`, `linkedin_url`) VALUES
(1, 'EasyBuilding.lk', '', '<p>EasyBuilding.lk is the Premier House and Building Construction Web Portal which is designed to cater all your construction requirements! We aim at finding a Reputed, Reliable, and Trustworthy local construction related partners for you just within a click.</p><p>&nbsp;</p><p>Our website forms an ideal platform through which client can connect with our reputed service providers, apply for quotation requests, create your own Bill of Quantities (BOQ), view our best deals and rates for your services, while also standing a chance to grasp some of the useful construction tips provided by us! &nbsp;</p><p>&nbsp;</p>', '05/08/2020', '70, Diyawanna Gardens, \nPalawatta, Battaramulla, \nSri Lanka', '077 7269108', '', 'info@easybuilding.lk', 'https://www.facebook.com/ConstructionEasyBuilding/', 'https://www.instagram.com/', 'https://www.youtube.com/channel/UCY5nKYQ-Uiq9Zg2UyGKtvxQ', 'https://www.linkedin.com/company/easybuilding-lk-pvt-ltd/');

-- --------------------------------------------------------

--
-- Table structure for table `districts`
--

CREATE TABLE `districts` (
  `district_id` int(11) NOT NULL,
  `district_name` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
-- Table structure for table `home_slider`
--

CREATE TABLE `home_slider` (
  `id` int(11) NOT NULL,
  `file_name` varchar(500) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `img_order` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `home_slider`
--

INSERT INTO `home_slider` (`id`, `file_name`, `title`, `description`, `img_order`) VALUES
(16, '1622104836347210660.jpg', 'NSBM Homagama - The  University of the Future ', 'Amazing Landscaping and Paving Project which is Completed by SMS Holdings ', 0),
(21, '16235044311188692818.jpg', 'Private House in Hawaii', 'Architectural Design by Walker Warner Architects  ', 0),
(22, '16235051301349143920.jpg', 'House Interior - Hawaii ', 'Walker Waner Architects ', 0);

-- --------------------------------------------------------

--
-- Table structure for table `house_area`
--

CREATE TABLE `house_area` (
  `id` int(11) NOT NULL,
  `house_area_id` varchar(10) NOT NULL,
  `house_area` varchar(75) NOT NULL,
  `cost_factor` float NOT NULL DEFAULT 1,
  `level` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `house_area`
--

INSERT INTO `house_area` (`id`, `house_area_id`, `house_area`, `cost_factor`, `level`) VALUES
(2, 'H1002', 'Entrance', 0.39, 1),
(10, 'H1010', 'Living Room', 1, 1),
(11, 'H1011', 'Bed Room Master', 1.07, 1),
(12, 'H1012', 'Bed Room 1', 0.95, 1),
(13, 'H1013', 'Bed Room 2', 0.95, 1),
(14, 'H1014', 'Bed Room 3', 0.95, 1),
(15, 'H1015', 'Bed Room 4', 0.95, 1),
(16, 'H1016', 'Dinning Area ', 0.95, 1),
(17, 'H1017', 'Bathroom 1', 1.32, 1),
(18, 'H1018', 'Bathroom 2', 1.32, 1),
(19, 'H1019', 'Pantry', 1.29, 1),
(20, 'H1020', 'Stair Case ', 1.19, 1),
(21, 'H1021', 'TV Lobby', 0.65, 1),
(22, 'H1022', 'Court Yard', 0.39, 1),
(23, 'H1023', 'Servant Room', 0.51, 1),
(24, 'H1024', 'Servant Wash  Room ', 1.12, 1),
(25, 'H1025', 'Driver\'s Room', 0.51, 1),
(26, 'H1026', 'Driver\'s Washroom', 1.12, 1),
(27, 'H1027', 'Balcony', 0.31, 1),
(28, 'H1028', 'Balcony', 0.29, 2),
(29, 'H1029', 'Living Room', 0.95, 2),
(30, 'H1030', 'Bed Room Master ', 0.95, 2),
(31, 'H1031', 'Bed Room 1  ', 0.85, 2),
(32, 'H1032', 'Bed Room 2', 0.85, 2),
(33, 'H1033', 'Bed Room 3', 0.85, 2),
(34, 'H1034', 'Bed Room 4', 0.85, 2),
(35, 'H1035', 'Dinning Area ', 0.85, 2),
(36, 'H1036', 'Bathroom', 1.22, 2),
(37, 'H1037', 'Bathroom 2', 1.22, 2),
(38, 'H1038', 'Pantry', 1.12, 2),
(39, 'H1039', 'Stair Case ', 1.12, 2),
(40, 'H1040', 'TV Lobby', 0.75, 2),
(41, 'H1041', 'Court Yard', 0.39, 2);

-- --------------------------------------------------------

--
-- Table structure for table `house_surfaces`
--

CREATE TABLE `house_surfaces` (
  `id` int(11) NOT NULL,
  `surface_type` varchar(50) NOT NULL,
  `surface_type_id` varchar(10) NOT NULL,
  `featured` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `house_surfaces`
--

INSERT INTO `house_surfaces` (`id`, `surface_type`, `surface_type_id`, `featured`) VALUES
(8, 'Floor Type', 'S1008', 0),
(9, 'Wall Type', 'S1009', 0),
(10, 'Ceiling', 'S1010', 0),
(11, 'Roof', 'S1011', 0),
(12, 'Fix Construction', 'S1012', 0);

-- --------------------------------------------------------

--
-- Table structure for table `house_surfaces_type`
--

CREATE TABLE `house_surfaces_type` (
  `id` int(11) NOT NULL,
  `level` int(11) NOT NULL DEFAULT 1,
  `house_surfaces_type_id` varchar(10) NOT NULL,
  `surface_type_id` varchar(10) NOT NULL,
  `house_surfaces_type` varchar(70) NOT NULL,
  `value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `house_surfaces_type`
--

INSERT INTO `house_surfaces_type` (`id`, `level`, `house_surfaces_type_id`, `surface_type_id`, `house_surfaces_type`, `value`) VALUES
(5, 1, 'ST1005', 'S1003', 'Gupsym 2 by 2', 250),
(6, 1, 'ST1006', 'S1004', 'Tiles', 160),
(7, 1, 'ST1007', 'S1001', 'Tile 2 by 2', 270),
(8, 1, 'ST1008', 'S1002', 'Block', 250),
(9, 1, 'ST1009', 'S1003', 'Superflex', 450),
(10, 1, 'ST1010', 'S1004', 'Asbastos', 150),
(12, 1, 'ST1012', 'S1008', 'Tile 4 by 4', 630),
(13, 1, 'ST1013', 'S1008', 'Tile 2 by 2', 470),
(14, 1, 'ST1014', 'S1008', 'Titanium', 280),
(15, 1, 'ST1015', 'S1008', 'Wood Teak', 2550),
(16, 1, 'ST1016', 'S1008', 'Carpet', 475),
(17, 1, 'ST1017', 'S1009', 'Brick ', 1360),
(18, 1, 'ST1018', 'S1009', 'Block', 980),
(19, 1, 'ST1019', 'S1009', 'Special Stones', 1950),
(20, 1, 'ST1020', 'S1010', 'Ceiling Sheet 2 by 2', 550),
(21, 1, 'ST1021', 'S1010', 'Ceiling (Continuous Single)', 590),
(22, 1, 'ST1022', 'S1010', 'Ceiling Super Flex', 625),
(23, 1, 'ST1023', 'S1010', 'Ceiling Wood', 750),
(24, 1, 'ST1024', 'S1011', 'Tiles', 850),
(25, 1, 'ST1025', 'S1011', 'Asbestos ', 810),
(26, 1, 'ST1026', 'S1011', 'Tile & Asbestos', 1270),
(27, 1, 'ST1027', 'S1011', 'Zinc Aluminum Sheet ', 825),
(28, 1, 'ST1028', 'S1011', 'Roof Slab', 1111),
(29, 1, 'ST1029', 'S1012', 'Foundation, Steel, Electrical, etc', 3440),
(30, 2, 'ST1030', 'S1008', 'Tile 4 by 4', 700),
(31, 2, 'ST1031', 'S1008', 'Tile 2 by 2', 540),
(32, 2, 'ST1032', 'S1008', 'Titanium', 350),
(33, 2, 'ST1033', 'S1008', 'Wood (Teak)', 2620),
(34, 2, 'ST1034', 'S1008', 'Carpet ', 545),
(35, 2, 'ST1035', 'S1009', 'Brick', 1430),
(36, 2, 'ST1036', 'S1009', 'Block', 1050),
(37, 2, 'ST1037', 'S1009', 'Special Stones', 2020),
(38, 2, 'ST1038', 'S1010', 'Ceiling Sheet 2 by 2', 620),
(39, 2, 'ST1039', 'S1010', 'Ceiling (Continuous Single)', 660),
(40, 2, 'ST1040', 'S1010', 'Ceiling Super Flex', 695),
(41, 2, 'ST1041', 'S1010', 'Ceiling Wood', 820),
(42, 2, 'ST1042', 'S1011', 'Tiles', 920),
(43, 2, 'ST1043', 'S1011', 'Asbestos', 880),
(44, 2, 'ST1044', 'S1011', 'Tile & Asbestos', 1340),
(45, 2, 'ST1045', 'S1011', 'Zinc Aluminum Sheet', 895),
(46, 2, 'ST1046', 'S1011', 'Roof Slab', 1331),
(47, 2, 'ST1047', 'S1012', 'Foundation, Steel, Electrical, etc', 2390),
(48, 1, 'ST1048', 'S1010', 'No Ceiling', 0),
(49, 2, 'ST1049', 'S1010', 'No Ceiling', 0);

-- --------------------------------------------------------

--
-- Table structure for table `image_category_list`
--

CREATE TABLE `image_category_list` (
  `id` int(11) NOT NULL,
  `img_id` int(11) NOT NULL,
  `cat_lvl2_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `image_category_list`
--

INSERT INTO `image_category_list` (`id`, `img_id`, `cat_lvl2_id`) VALUES
(12, 103, 'CL21156'),
(13, 103, 'CL21146'),
(14, 103, 'CL21147'),
(28, 85, 'CL21160'),
(29, 85, 'CL21146'),
(37, 52, 'CL21146'),
(38, 53, 'CL21149'),
(39, 171, 'CL21157'),
(40, 171, 'CL21146'),
(41, 169, 'CL21146'),
(42, 169, 'CL21147'),
(46, 168, 'CL21157'),
(47, 168, 'CL21146'),
(48, 104, 'CL21160'),
(49, 104, 'CL21148'),
(50, 104, 'CL21146'),
(51, 84, 'CL21146'),
(52, 84, 'CL21149'),
(53, 75, 'CL21151'),
(54, 82, 'CL21161'),
(55, 82, 'CL21150'),
(56, 82, 'CL21146'),
(57, 155, 'CL21151'),
(60, 173, 'CL21146'),
(61, 173, 'CL21147'),
(66, 83, 'CL21148'),
(67, 81, 'CL21156'),
(68, 81, 'CL21146'),
(69, 81, 'CL21147'),
(70, 54, 'CL21160'),
(71, 54, 'CL21159'),
(74, 157, 'CL21151'),
(88, 176, 'CL21161'),
(89, 177, 'CL21161'),
(90, 177, 'CL21158'),
(104, 80, 'CL21156'),
(105, 80, 'CL21146'),
(106, 80, 'CL21147'),
(110, 59, 'CL21160'),
(111, 59, 'CL21156'),
(112, 59, 'CL21146'),
(115, 175, 'CL21148'),
(116, 175, 'CL21146'),
(117, 174, 'CL21148'),
(118, 174, 'CL21153'),
(119, 174, 'CL21146'),
(120, 192, 'CL21146'),
(121, 191, 'CL21146'),
(122, 190, 'CL21147'),
(123, 189, 'CL21146'),
(124, 183, 'CL21148'),
(125, 196, 'CL21147'),
(126, 201, 'CL21149'),
(127, 200, 'CL21149'),
(128, 199, 'CL21149'),
(129, 206, 'CL21156'),
(132, 205, 'CL21156'),
(133, 205, 'CL21149'),
(134, 204, 'CL21156'),
(136, 202, 'CL21148'),
(137, 202, 'CL21156'),
(140, 203, 'CL21148'),
(141, 203, 'CL21156'),
(143, 219, 'CL21156'),
(144, 219, 'CL21146'),
(145, 220, 'CL21149'),
(146, 224, 'CL21149'),
(149, 228, 'CL21148'),
(151, 229, 'CL21156'),
(152, 229, 'CL21146'),
(153, 229, 'CL21154');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(150) NOT NULL,
  `product_desc` varchar(500) NOT NULL,
  `product_price` int(11) NOT NULL,
  `product_category` varchar(100) NOT NULL,
  `images` mediumblob NOT NULL,
  `company_id` int(11) NOT NULL,
  `primary_img` varchar(1000) NOT NULL,
  `total_imgs` int(11) NOT NULL,
  `product_unit` int(11) NOT NULL,
  `featured` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_desc`, `product_price`, `product_category`, `images`, `company_id`, `primary_img`, `total_imgs`, `product_unit`, `featured`) VALUES
(2, 'Engineering brick', '<p>9\",4\",2.5\" Engineering brick from Embilipitiya</p>', 25, 'CL21019', 0x5b2231363036353737313436627269636b732e706e67225d, 1, '1606577146bricks.png', 1, 1, 0),
(3, '4 CH AHD DVR System 01', '<p>4 CH AHD hybrid DVR System 01&nbsp;</p><p>2.6MP AHD Cameras 04&nbsp;</p><p>Camera Stand 04&nbsp;</p><p>500GB Hard Disk Drive 01&nbsp;</p><p>12V Power Box 04&nbsp;</p><p>BNC Full Copper 08&nbsp;</p><p>Fully Copper 3C2U Data Cable 100M&nbsp;</p><p>Kalani Power Cable 100M With Installation</p>', 52800, 'CL21121', 0x5b2231363036353832323832756e6e616d65642e6a7067225d, 1, '1606582282unnamed.jpg', 1, 2, 1),
(7, 'CCTV 8 Units', 'CCTV 8 Units', 9500, 'CL21121', 0x5b22313631303235353733355f3130373531333730375f63637476626f726465727367657474792e6a7067225d, 1, '1610255735_107513707_cctvbordersgetty.jpg', 1, 1, 1),
(8, 'Paving Blocks', 'Paving Blocks ', 285, 'CL21031', 0x5b2231363132363039363732313735323631393330312e6a7067222c2231363132363039363732313731393536353137312e6a7067222c2231363132363039363732313933363435303636382e6a7067222c2231363132363039363732313833353439303438352e6a7067222c2231363132363039363733313433323630323633352e6a7067225d, 76, '16126096721752619301.jpg', 5, 1, 0),
(9, 'Building Block', 'Blocks ', 100, 'CL21031', 0x5b2231363132363039383936313039393839333431362e6a7067225d, 76, '16126098961099893416.jpg', 1, 1, 0),
(10, 'Land scaping', 'We undertake all type of landscaping work ', 700, 'CL21031', 0x5b2231363132363130373633323033313930393539332e6a7067225d, 76, '16126107632031909593.jpg', 1, 1, 0),
(15, 'Glass Dining Table ', 'Glass dining table  with 6 chairset', 35000, 'CL21103', 0x5b22313631343533313736323935363534373933312e6a7067225d, 26, '1614531762956547931.jpg', 1, 2, 1),
(16, 'Sofa', 'Sofa set - Ash 3 ', 60000, 'CL21102', 0x5b22313631343533323033303733373135373239372e6a7067225d, 26, '1614532030737157297.jpg', 1, 2, 1),
(17, 'Corner Sofa Unit', 'Corner sofa can be chosen in 3 colors', 55000, 'CL21101', 0x5b2231363134353332313637313938393937393731312e6a7067225d, 26, '16145321671989979711.jpg', 1, 2, 1),
(18, 'Floor Tile 2 * 2', 'Ceramic tiles are usually the most popular flooring type in Sri Lanka. They come in different sizes, textures and colors.', 150, 'CL21080', 0x5b22313631343533323939323338363136323039322e6a7067225d, 2, '1614532992386162092.jpg', 1, 1, 1),
(19, 'Hard wood flooring', 'Hard wood is a natural flooring material which is very attractive and durable. ', 210, 'CL21080', 0x5b2231363134353335323738313231323035323539332e6a7067225d, 2, '16145352781212052593.jpg', 1, 3, 1),
(20, 'New Coto Cement', 'New Coto Cement supplier in Sri Lanka', 1500, 'CL21016', 0x5b2231363134353333343133323034393431383330352e6a7067225d, 1, '16145334132049418305.jpg', 1, 1, 1),
(22, 'Skim Coating ', 'Dblend Super coat is the pre-blended cementitious skim coat which is blended with the finest minerals, special additives, and special polymers to achieve high adhesive strength and bonding strength. It can be easily applied on interior and exterior surfaces. It enhances the life and effect of paints with a durable finish. It is an advanced solution for the highest quality plastering. (20 Kg Pack )', 450, 'CL21089', 0x5b223136323231313238303035313234303333392e6a7067225d, 94, '162211280051240339.jpg', 1, 2, 0),
(23, 'Super Coat ', '20Kg Bag', 590, 'CL21089', 0x5b22313632323132333533303833393831303935342e6a7067225d, 94, '1622123530839810954.jpg', 1, 2, 0),
(24, 'Master Plaster - Advance ', 'Dblend Master Paster – Advance tile mortar is a superior quality, polymer-modified mortar for the installation of most porcelain, ceramic, quarry, glass, mosaic, and natural stone in interior, exterior and immersion conditions. It is suitable on floors and walls of concrete, lightweight concrete and plaster. It provides excellent adhesion between tile and substrate and can be used even in old substrates. It is available in off-white or grey color.\n20Kg Bag', 750, 'CL21089', 0x5b2231363232313233363434323037333439323035312e6a7067225d, 94, '16221236442073492051.jpg', 1, 2, 1),
(25, 'Master Plaster - Regular', 'Dblend Master Paster – Regular tile mortar is a polymer modified mortar for the installation of most porcelain, ceramic, quarry, glass, mosaic and natural stone in interior and exterior conditions. It is suitable on floors and walls of concrete, lightweight concrete and plaster, and available in off-white or grey color.\n\n20 Kg Bag', 620, 'CL21089', 0x5b2231363232313233373933313234363433343632362e6a7067225d, 94, '16221237931246434626.jpg', 1, 2, 0),
(26, 'Dblend Colors Cut-cement Wall Finish (Titanium)', 'This method is a product and technique developed for getting cut-cement wall finishes. The wall finish is different from traditional painting and, a rustic appearance can be obtained at comparatively low cost even at old walls in less time. The finishes can be obtained as plain or multi tone methods. Dblend Coatings provide total solution to the customers on this concept by performing total application. Products are not sold.', 0, 'CL21079', 0x5b2231363232313233393033313837313337363036372e6a7067225d, 94, '16221239031871376067.jpg', 1, 1, 0),
(27, 'Dblend Colors  Economy Texture finishes', 'Dblend Colors – Economy Texture finishes provide some relaxing textures, which can be done at low cost. Even though the cost is comparatively low, proper selection of the design and colors will give you an elegant finish. These textures are well suitable for the larger wall areas such as fence walls, blind walls etc. The ability to get the texture on brick walls reduces the cost of finishing and time as well. Dblend Coatings provides the total solution to the customers on this method by performi', 0, 'CL21085', 0x5b2231363232313234313138313232343632313237312e6a7067225d, 94, '16221241181224621271.jpg', 1, 1, 1),
(28, 'Quartz Kitchen Tops', 'Modern kitchens have progressed from gloomy rooms to the home’s center stage. This demands kitchen tops to be both elegant and hygienic. Crystal Stone kitchen tops are by far the most resistant to wear and tear while being rated highest in food safety. ', 0, 'CL21103', 0x5b2231363232333034353538313231393035343138302e6a7067222c2231363232333034353538313333353136353330302e6a7067222c22313632323330343536323930373136323735392e6a7067225d, 98, '16223045581219054180.jpg', 3, 3, 1),
(29, 'Quartz Vanity Tops for Bathrooms ', 'Crystal Stone is ideal for vanity tops, as it absorbs no water. Since washrooms often get wet, vanity tops made of granite can collect bacteria and become discolored. Quartz tops, on the other hand, are easier to clean and stay dry while looking fresh.', 0, 'CL21112', 0x5b2231363232333034363837323030353639373338342e6a7067222c22313632323330343730303936333432323632392e6a7067222c2231363232333034373132323032393835313038342e6a7067225d, 98, '16223046872005697384.jpg', 3, 3, 0),
(30, 'Quartz Flooring & Stairs ', 'Crystal Stone offers flooring for airports, hotels, shopping malls that demand scratch-resistant, easy to clean floors. Being homogeneous they will never wear out or have permanent stains.\n\nQuartz is perfect for staircases as it is homogeneous which gives it depth and character. Its impact resistance also means the stairs are less likely to chip off at the edges.', 0, 'CL21080', 0x5b2231363232333034373735313738323930313738372e6a7067222c22313632323330343737363330323135343237362e6a7067222c2231363232333034373736313835343033373835312e6a7067222c22313632323330343737373239373636393437392e6a7067225d, 98, '16223047751782901787.jpg', 4, 3, 0),
(32, 'Pantry, Kitchen & Dinning Furniture ', 'Best Quality Office Furniture, Tables and Cupboard with guaranteed service, ', 0, 'CL21103', 0x5b22313632323836363939353439313331343636302e6a7067222c2231363232383636393935323037383931303137362e6a7067222c2231363232383636393935313235343139333235312e6a7067225d, 102, '1622866995491314660.jpg', 3, 1, 1),
(34, 'Fridge, Cookers, Hobs, Ovens, Pantry and Kitchen Accessories and Electrical  Appliances ', 'Best Quality Electrical, Kitchen and Pantry accessories and appliances ', 0, 'CL21173', 0x5b2231363232383731383137313739383336363533392e6a7067222c2231363232383731383337313935383130393432322e6a7067222c22313632323837313833373337323831323839382e6a7067222c22313632323837313833383837303234383534372e6a7067225d, 102, '16228718171798366539.jpg', 4, 2, 0),
(35, 'Electrical Consultation  and Testing ', 'Whether it’s a complicated high voltage network for a specialized industrial application, a power plant design or just a simple low voltage system for a commercial building or a hotel, VIBHAWA ELECTRICAL CONSULTANCY SERVICES covers them all. \n\nPeriodic Electrical Testing (or the Electrical Installation Condition Report) is the way of assessing the present condition of your electrical system in a systematic and scientific way. This will ensure that the electrical installation of your facility mee', 0, 'CL21046', 0x5b2231363232383836343231313434343039393232382e6a7067222c22313632323838363432313833353637373736332e6a706567222c22313632323838363432323235353734343935392e6a706567222c22313632323838363432343233333935363237352e706e67222c2231363232383836343235323133353734353530392e706e67225d, 103, '16228864211444099228.jpg', 5, 1, 0),
(36, 'Pantry Cupboards and Pantry Accessories ', ' Most Elegant Pantry Cupboard System in Sri Lanka', 0, 'CL21174', 0x5b22313632323838383039383230393734393732352e6a7067222c22313632323838383039383131373336373730382e6a7067222c2231363232383838303939313934383639313934382e6a7067222c22313632323838383039393330353037353036302e6a7067222c2231363232383838303939313339353332333635312e6a7067225d, 102, '1622888098209749725.jpg', 5, 1, 1),
(37, 'Steel & Stainless Steel Product Fabrication and Manufacturing - Conveyers, Agri machines ', 'Conveyors. Agricultural Machineries, All Engineering Steel and Stainless steel fabrication.', 0, 'CL21185', 0x5b223136323239353137333838323433363633392e6a7067222c2231363232393531373430323032303637353037382e6a7067222c2231363232393531373430313739323239383235342e6a7067225d, 105, '162295173882436639.jpg', 3, 1, 0),
(38, 'Motor & Pumps Repair ', 'Repair & Reinstallation Machines ', 0, 'CL21175', 0x5b22313632323935313936303132383937303833342e6a7067225d, 105, '1622951960128970834.jpg', 1, 1, 0),
(39, 'Solar Energy Power Solutions', 'Simple Engineering Solar PV Systems solution is backed by the expertise of our engineers and experience as Energy Auditors in the energy industry.\n\nBeing registered energy auditors, we always help/advise our clients to minimize their energy requirements before going for solar. It will minimize your investment as well as your energy wastage giving you the overall benefit of the lowest simple payback period while enjoying as an energy producer of your own', 0, 'CL21075', 0x5b223136323239353639313731373538373138322e6a7067222c22313632323935363932363230323033373637382e706e67225d, 106, '162295691717587182.jpg', 2, 1, 0),
(40, 'Energy Consultants ', 'Simple Engineering is equipped with state-of-the-art tools and skilled personnel for a thorough analysis of energy flows within the building and process. Software tools are used in analyzing gathered data in order to find the energy loopholes. We advise on process changes in order to maximize energy efficiency. Electrical and Thermal analysis are the two key areas we concentrate for an energy audit.', 0, 'CL21048', 0x5b2231363232393537323536313235343334333330352e6a7067222c22313632323935373235373735353633333635342e6a7067225d, 106, '16229572561254343305.jpg', 2, 1, 0),
(41, 'Hydro Power Plant Installation & Maintenance ', 'We are well experienced in both grid-connected and off-grid hydropower plants. Various phases of the project development life cycle are described below. We are capable of implementing all the stages as well.', 0, 'CL21048', 0x5b2231363232393537333331313031373137363636302e6a7067225d, 106, '16229573311017176660.jpg', 1, 1, 0),
(42, 'Architect ', 'Charted Architect with Creative, Innovative, and Sustainable Designs ', 0, 'CL21011', 0x5b2231363232393935393232313537393533333634312e6a7067222c2231363232393935393333313330383736353238312e6a7067222c22313632323939353933333135363333303433362e6a7067225d, 100, '16229959221579533641.jpg', 3, 1, 0),
(43, 'Interior Architect & Designer ', 'Most cost-efficient, Modest and Sustainable house and office interior designer ', 0, 'CL21180', 0x5b22313632323939363030313532303237343538392e6a7067222c223136323239393630303638323336363835332e6a7067222c2231363232393936303132313837353333313035302e6a7067225d, 100, '1622996001520274589.jpg', 3, 1, 0),
(44, 'Septic Tanks', 'Best  Quality Septic Tanks for Sewer and Waste  Disposal Requirement ', 0, 'CL21032', 0x5b22313632333439333033363335313037313631332e6a7067225d, 114, '1623493036351071613.jpg', 1, 1, 0),
(45, 'Hume Pipes & Cylinders  ', 'Hume Pipe & Concrete Cylinders for Waste & Sewer Management Requirment ', 0, 'CL21032', 0x5b22313632333439333231313833373131333037392e6a7067222c2231363233343933323232313136313837333337382e6a7067225d, 114, '1623493211837113079.jpg', 2, 1, 0),
(46, 'Concrete Products, Concrete Poles & Flower Pots', 'Best Quality Concrete products ', 0, 'CL21032', 0x5b2231363233343933343533323032333039363431332e6a7067222c22313632333439333435333336313138313333302e6a7067222c22313632333439333435333434363135393831382e6a7067222c2231363233343933343533313139343230353936342e6a7067222c22313632333439333435333531323138303331342e6a7067225d, 114, '16234934532023096413.jpg', 5, 1, 0),
(47, 'Interlock Paving ', 'Paving Products & Interlocks ', 0, 'CL21056', 0x5b2231363233343938363036313939373731353739312e6a7067225d, 114, '16234986061997715791.jpg', 1, 1, 0),
(48, 'Landscaping Products ', 'Concrete Products Required for Landscaping ', 0, 'CL21056', 0x5b2231363233343933373737313130353932313736312e6a7067222c22313632333439333737373833303531383036382e6a7067222c22313632333439333737383332383039383233372e6a7067225d, 114, '16234937771105921761.jpg', 3, 1, 0),
(49, 'Blocks, Engineering Blocks  & Bricks  ', 'Concrete Blocks, Bricks & Engineering Blocks ', 0, 'CL21024', 0x5b2231363233343938363332313235323530353939352e6a7067225d, 114, '16234986321252505995.jpg', 1, 1, 0),
(50, 'Titanium Products, Floor Wax & Titanium Stain', 'Crystolac Super Titanium is an easy-to-apply special effect wall and floor paste. Crystolac super titanium is in two parts and a pre-packed system. These 2 parts can be applied by using a trowel .this layer is very smooth and slurry with the excellent bond to most substrate. the product is based on selected modification cement which are not cracked on any surface. Floor Wax,  \n', 0, 'CL21079', 0x5b223136323335303035363435373438383239302e706e67222c2231363233353030383336323032373237373934392e706e67225d, 115, '162350056457488290.png', 2, 1, 1),
(51, 'Water Proof  Materials', 'Reliable, Proven & World Class  Water Proofing Materials', 0, 'CL21060', 0x5b2231363233353031353034313235303834373034342e6a7067222c22313632333530313530343431393232333033372e6a7067222c2231363233353031353534313334373334323733302e6a7067225d, 115, '16235015041250847044.jpg', 3, 1, 0),
(52, '`Tile Grout & Construction Grout ', 'Water Proofing, Flexible & Crack Bridging, High Strength, Smooth & Water Resist Cement Product', 0, 'CL21065', 0x5b22313632333530333634343234373335313831322e6a7067222c22313632333530333637373839343330323336312e6a7067225d, 115, '1623503644247351812.jpg', 2, 1, 0),
(53, 'Finishing Roof Work', 'Reliable and Quality Finishing Roof Work', 0, 'CL21058', 0x5b22313632343532353937343230383937303338392e6a7067225d, 130, '1624525974208970389.jpg', 1, 1, 0),
(54, 'Wooden Doors &  Windows', 'Best  Quality Wooden Doors & Windows', 0, 'CL21058', 0x5b22313632343532363433303833393534303535352e6a7067225d, 130, '1624526430839540555.jpg', 1, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `img_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `file_name` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`img_id`, `product_id`, `file_name`) VALUES
(2, 2, '1606577146bricks.png'),
(3, 3, '1606582282unnamed.jpg'),
(6, 7, '1610255735_107513707_cctvbordersgetty.jpg'),
(7, 8, '16126096721752619301.jpg'),
(8, 8, '16126096721719565171.jpg'),
(9, 8, '16126096721936450668.jpg'),
(10, 8, '16126096721835490485.jpg'),
(11, 8, '16126096731432602635.jpg'),
(12, 9, '16126098961099893416.jpg'),
(13, 10, '16126107632031909593.jpg'),
(16, 16, '1614532030737157297.jpg'),
(17, 17, '16145321671989979711.jpg'),
(18, 18, '1614532992386162092.jpg'),
(19, 19, '16145331981906209395.jpg'),
(20, 20, '16145334132049418305.jpg'),
(22, 22, '162211280051240339.jpg'),
(23, 23, '1622123530839810954.jpg'),
(24, 24, '16221236442073492051.jpg'),
(25, 25, '16221237931246434626.jpg'),
(26, 26, '16221239031871376067.jpg'),
(27, 27, '16221241181224621271.jpg'),
(28, 28, '16223045581219054180.jpg'),
(29, 28, '16223045581335165300.jpg'),
(30, 28, '1622304562907162759.jpg'),
(31, 29, '16223046872005697384.jpg'),
(32, 29, '1622304700963422629.jpg'),
(33, 29, '16223047122029851084.jpg'),
(34, 30, '16223047751782901787.jpg'),
(35, 30, '1622304776302154276.jpg'),
(36, 30, '16223047761854037851.jpg'),
(37, 30, '1622304777297669479.jpg'),
(41, 32, '1622866995491314660.jpg'),
(42, 32, '16228669952078910176.jpg'),
(43, 32, '16228669951254193251.jpg'),
(47, 34, '16228718171798366539.jpg'),
(48, 34, '16228718371958109422.jpg'),
(49, 34, '1622871837372812898.jpg'),
(50, 34, '1622871838870248547.jpg'),
(51, 35, '16228864211444099228.jpg'),
(52, 35, '1622886421835677763.jpeg'),
(53, 35, '1622886422255744959.jpeg'),
(54, 35, '1622886424233956275.png'),
(55, 35, '16228864252135745509.png'),
(56, 36, '1622888098209749725.jpg'),
(57, 36, '1622888098117367708.jpg'),
(58, 36, '16228880991948691948.jpg'),
(59, 36, '1622888099305075060.jpg'),
(60, 36, '16228880991395323651.jpg'),
(61, 37, '162295173882436639.jpg'),
(62, 37, '16229517402020675078.jpg'),
(63, 37, '16229517401792298254.jpg'),
(64, 38, '1622951960128970834.jpg'),
(65, 39, '162295691717587182.jpg'),
(66, 39, '1622956926202037678.png'),
(67, 40, '16229572561254343305.jpg'),
(68, 40, '1622957257755633654.jpg'),
(69, 41, '16229573311017176660.jpg'),
(70, 42, '16229959221579533641.jpg'),
(71, 42, '16229959331308765281.jpg'),
(72, 42, '1622995933156330436.jpg'),
(73, 43, '1622996001520274589.jpg'),
(74, 43, '162299600682366853.jpg'),
(75, 43, '16229960121875331050.jpg'),
(76, 44, '1623493036351071613.jpg'),
(77, 45, '1623493211837113079.jpg'),
(78, 45, '16234932221161873378.jpg'),
(79, 46, '16234934532023096413.jpg'),
(80, 46, '1623493453361181330.jpg'),
(81, 46, '1623493453446159818.jpg'),
(82, 46, '16234934531194205964.jpg'),
(83, 46, '1623493453512180314.jpg'),
(84, 47, '16234936961090240714.jpg'),
(85, 48, '16234937771105921761.jpg'),
(86, 48, '1623493777830518068.jpg'),
(87, 48, '1623493778328098237.jpg'),
(88, 49, '16234986321252505995.jpg'),
(89, 50, '162350056457488290.png'),
(90, 50, '16235008362027277949.png'),
(91, 51, '16235015041250847044.jpg'),
(92, 51, '1623501504419223037.jpg'),
(93, 51, '16235015541347342730.jpg'),
(94, 52, '1623503644247351812.jpg'),
(95, 52, '1623503677894302361.jpg'),
(96, 53, '1624525974208970389.jpg'),
(97, 54, '1624526430839540555.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `project_id` int(11) NOT NULL,
  `project_name` varchar(100) NOT NULL,
  `project_description` varchar(1000) NOT NULL,
  `project_year` varchar(10) NOT NULL,
  `project_cost` varchar(100) NOT NULL,
  `project_address` varchar(500) NOT NULL,
  `country_location` varchar(500) NOT NULL,
  `company_id` int(11) NOT NULL,
  `services` mediumblob NOT NULL,
  `images` mediumblob NOT NULL,
  `architect` varchar(250) NOT NULL,
  `contractor` varchar(250) NOT NULL,
  `structural_engineer` varchar(250) NOT NULL,
  `primary_img` varchar(1000) NOT NULL,
  `total_imgs` int(11) NOT NULL,
  `approved` int(11) NOT NULL DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`project_id`, `project_name`, `project_description`, `project_year`, `project_cost`, `project_address`, `country_location`, `company_id`, `services`, `images`, `architect`, `contractor`, `structural_engineer`, `primary_img`, `total_imgs`, `approved`) VALUES
(31, 'Katunayaka Airport Project', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat nonproident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2020', '10B', '0', '', 2, '', 0x5b22313539353730323733327765625f4368616e67692d54342d53696e6761706f72652d332d48522d4372656469742d42656e6f792e6a7067222c22313539353730323733387765625f4368616e67692d54342d53696e6761706f72652d312d48522d4372656469742d42656e6f792e6a7067222c22313539353730323833377765625f4368616e67692d54342d53696e6761706f72652d382d48522d4372656469742d42656e6f792e6a7067222c22313539353730333335337765625f4368616e67692d54342d53696e6761706f72652d372d48522d4372656469742d42656e6f792e6a7067225d, '', '0', '0', '1595702732web_Changi-T4-Singapore-3-HR-Credit-Benoy.jpg', 4, 1),
(30, 'Homagama Housing Project', 'Homagama Housing Project - The traditional beige two-story wood exterior home idea in Boston with a shingle roof uis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non.', '2020', '30M', '0', '', 1, 0x5b22434c3231303131225d, 0x5b22313539353730323133313232363231363138362e6a7067222c22313539353730323133314e6f726d616e746f6e2d4176656e75652d332d3136303078313036382e6a7067222c22313539353730323133316c616b652d686f7573652d696e2d6173636f6e612d62792d77657370692d64652d6d6575726f6e2d726f6d656f2d617263686974656374732d3035312e6a7067225d, 'Amal Fernando', 'R&D Constructions', 'Nirmal Perera', '1595702131226216186.jpg', 3, 1),
(38, 'Switzerland landscape project', 'Switzerland landscape project ', '2018', '', '0', '', 1, 0x5b22434c3231303134225d, 0x5b2231363036353537393632304d47733933592d737769747a65726c616e642d77616c6c70617065722e6a7067222c223136303635353739363277616c6c7061706572666c6172652e636f6d5f77616c6c70617065725f315f2e6a7067225d, '', '', '', '16065579620MGs93Y-switzerland-wallpaper.jpg', 2, 1),
(41, '96 Residencies', 'A 12 story Condominium, Offering 54 Contemporary, Luxury Apartments, 96 residencies is set to become the landmark that will redefine the suburb of pagoda. Sri Jayawardenepura Kotte is a planned urban site with government offices and residential housing. 96 Residencies is destined to elevate the lifestyles of those seeking a new home in the modern Suburb Kotte. The 12-story tower, inclusive of 3 levels of car park and a range of opulent amenities, features 54 two- and three bedroom apartments.', '2019', '22.5M', '0', '', 2, 0x5b22434c3231303134225d, 0x5b2231363037333334393538736c6964655f30342e6a7067222c2231363037333334393538736c6964655f30332e6a7067222c2231363037333334393538736c6964655f30382e6a7067222c2231363037333334393538736c6964655f30362e6a7067222c2231363037333334393538736c6964655f30372e6a7067222c22313630373333353231337a63615641564156622e6a7067222c22313630373333353234347663414341562e6a7067225d, ' I. W. Architects', 'JAT Homes', 'Michelle Rodrigo', '1607334958slide_04.jpg', 7, 1),
(43, 'The Mount', 'Ensuring maximum natural light to come in through seamless environment friendly architectural design, this complex will be a unique piece in the Mt. Lavinia neighborhood with its green balconies overlooking the sea view, making this a wise investment.\n\nTHE MOUNT is centrally located in Mount Lavinia on Old Quarry Road within 150 meters to Galle Road, leading to the city of Colombo and the south with access to prominent routes. With the completion of the Marine Drive project, owners will have the privilege to reach Colombo in a few minutes.\n', '2020', '28M', '0', '', 1, 0x5b22434c3231303131222c22434c3231303134225d, 0x5b2231363133333233373931313638353537323437372e6a7067222c2231363133333233383238323033343137343536352e6a7067222c2231363133333233393833313332333933363639362e6a7067225d, 'Mount Archs', 'L.H. Company (Pvt) Ltd', 'Mount Archs', '16133237911685572477.jpg', 3, 1),
(53, 'Commercial Credit - Borella', 'Paving at Borella Commercial credit building', '2015', '1.5M', '0', '', 76, 0x5b22434c3231303536225d, 0x5b22313631323630393038333934383134363630322e6a7067222c2231363132363039303937313437363439373130342e6a7067222c2231363132363039313030313735353139303130322e6a7067222c22313631323630393130323730323432343339302e6a7067222c2231363132363039313033313534393434323435372e6a7067222c2231363132363039313034313738373434373033302e6a7067225d, '', '', '', '1612609083948146602.jpg', 6, 1),
(54, 'Maga NSBM Homagama', 'Maga NSBM Homagama Project ', '2018', '7.7', '0', '', 76, 0x5b22434c3231303536225d, 0x5b2231363132363039323737313136333031393432342e6a7067222c2231363132363039323737323036373735393434342e6a7067222c22313631323630393237383831303134333534342e6a7067222c2231363132363039323738313530303434343934372e6a7067222c223136313236303932373835323530363237352e6a7067222c22313631323630393237393431313335313532342e6a7067225d, '', '', '', '16126092771163019424.jpg', 6, 1),
(55, 'St Mary\'s Church', 'St Mary\'s Church ', '2016', '3.2 M', '0', '', 76, 0x5b22434c3231303536225d, 0x5b2231363132363039333935313738383438393736332e6a7067222c2231363132363039333935313533313739303830312e6a7067222c2231363132363039333936313532393237353933332e6a7067222c22313631323630393339363431363635313735362e6a7067222c223136313236303933393631303035363835352e6a7067222c2231363132363039333936313238383537323938342e6a7067225d, '', '', '', '16126093951788489763.jpg', 6, 1),
(56, 'Individual House In Palawatta', 'House architect and interior designing ', '2012', '17M', '0', '', 77, 0x5b22434c3231303131225d, 0x5b2231363132363134303937313433393039383630322e6a7067222c2231363132363134303937313632313432303430332e6a7067222c22313631323631343039383930363536373539382e6a7067222c2231363132363134303939313736333633353437372e6a7067222c223136313236313430393933303235303037322e6a7067222c22313631323631343039393532303036373530392e6a7067222c2231363132363134303939313333323330393236312e6a7067225d, 'Rukmal  Indrajith Kathriarachchi', '', '', '16126140971439098602.jpg', 7, 1),
(64, 'Pandanus Beach Resort & Spa - Skim Coat Project', 'Skim Coat Project ', '', '', '1159', '', 94, 0x5b22434c3231303839225d, 0x5b22313632323231343537373539323834353938342e6a7067222c2231363232323134353738313434333830373633352e6a7067222c2231363232323134353832313535333534323339362e6a7067222c22313632323231343538363937373238313339382e6a7067222c22313632323231343538383432353430313630382e6a7067222c22313632323231343539313638333834383631392e6a7067222c22313632323231343539313537363730383430302e6a7067225d, '', '', '', '1622214577592845984.jpg', 7, 1),
(65, 'Housing Project Images Done by Tissa Construction in Kurunegala', 'Very few house construction images were constructed by Tissa Construction and handed over to clients with full client satisfaction ', '', '', '1197', '', 97, 0x5b22434c3231313737222c22434c3231313738225d, 0x5b22313632323238373438353237343137383935342e6a7067222c2231363232323837343835313339393732313938322e6a7067222c2231363232323837343836323032353830383436382e6a7067222c22313632323238373531323330353530393835322e6a7067222c2231363232323837353439313132303632393436382e6a7067222c22313632323238373536313130383033363832332e6a7067225d, '', 'Tissa Construction ', '', '1622287485274178954.jpg', 6, 1),
(66, 'Quartz Flooring & Stairs ', 'Crystal Stone offers flooring for airports, hotels, shopping malls that demand scratch-resistant, easy to clean floors. Being homogeneous they will never wear out or have permanent stains.\n\nQuartz is perfect for staircases as it is homogeneous which gives it depth and character. Its impact resistance also means the stairs are less likely to chip off at the edges.\n', '', '', '1072', '', 98, 0x5b22434c3231303830225d, 0x5b2231363232333034393636313036303939363237312e6a7067222c22313632323330343936383831353431303333302e6a7067222c2231363232333034393730313832343935383932302e6a7067222c22313632323330343937313839313038343834342e6a7067225d, '', 'Crystal Stone', '', '16223049661060996271.jpg', 4, 1),
(67, 'Quartz Kitchen ', 'Modern kitchens have progressed from gloomy rooms to the home’s center stage. This demands kitchen tops to be both elegant and hygienic. Crystal Stone kitchen tops are by far the most resistant to wear and tear while being rated highest in food safety. ', '', '', '1072', '', 98, 0x5b22434c3231313734222c22434c3231313033225d, 0x5b22313632323330353235323539323737303032382e6a7067222c2231363232333035323533313230333132373133372e6a7067222c22313632323330353235343639383834393534392e6a7067225d, '', 'Crystal Stone', '', '1622305252592770028.jpg', 3, 1),
(68, 'Furniture for Office, Living, Dinning, kitchen and Pantry ', 'Sri Lankan Best Woodwork Products, Furniture and Pantry supplier ', '', '', '0', '', 102, 0x5b22434c3231313033222c22434c3231313034222c22434c3231313733222c22434c3231313036225d, 0x5b2231363232383732313939313138333034333431372e6a7067222c22313632323837323237373939323935373832382e6a7067222c2231363232383732323833323131303439343131322e6a7067222c223136323238373232383433303332353634392e6a7067222c2231363232383732323837313138353631363633352e6a7067225d, '', '', '', '16228721991183043417.jpg', 5, 1),
(69, 'Electrical Conultation and Testing Projects ', 'Colombo Waste to Energy Project -Protection coordination study and protection function testing/verifying at 10MW Power plant, Kerawalaptiya,\n\nCommissioning & Testing of the Protection System of the 1.7MW Solar PV System (Includes 33kV level NVD Protection, Under & Over Frequency at LV level etc.)\n\n', '', '', '0', '', 103, 0x5b22434c3231303436222c22434c3231303438225d, 0x5b7b22696d675f6964223a22323037222c2266696c655f6e616d65223a2231363232383836303031313937313933313038352e6a706567222c22617070726f766564223a2231227d2c7b22696d675f6964223a22323038222c2266696c655f6e616d65223a22313632323838363030313630333139343239332e6a706567222c22617070726f766564223a2231227d2c7b22696d675f6964223a22323039222c2266696c655f6e616d65223a2231363232383836303032313332373538353831302e6a7067222c22617070726f766564223a2231227d2c7b22696d675f6964223a22323130222c2266696c655f6e616d65223a22313632323838363030333637343233383435342e6a706567222c22617070726f766564223a2231227d2c7b22696d675f6964223a22323131222c2266696c655f6e616d65223a22313632323838363030333238353033393830302e6a706567222c22617070726f766564223a2231227d2c7b22696d675f6964223a22323132222c2266696c655f6e616d65223a2231363232383836303039313630353436373936322e706e67222c22617070726f766564223a2230227d2c7b22696d675f6964223a22323133222c2266696c655f6e616d65223a2231363232383836303039313538363933343236372e706e67222c22617070726f766564223a2231227d2c7b22696d675f6964223a22323134222c2266696c655f6e616d65223a2231363232383836303130313034333832303535322e706e67222c22617070726f766564223a2231227d5d, '', '', '', '16228860021327585810.jpg', 5, 1),
(76, 'Test Project 09', 'Test Project', '2017', '', '1206', '', 116, 0x5b22434c3231313737225d, 0x5b7b22696d675f6964223a22323237222c2266696c655f6e616d65223a2231363239373339323437313238343839393635382e6a706567222c22617070726f766564223a2230227d5d, '', '', '', '16297392471284899658.jpeg', 0, 0),
(77, 'Test new', 'Test new', '2018', '', '1104', '', 154, 0x5b22434c3231303630225d, 0x5b2231363239383331373739313332343136333839322e6a706567225d, '', '', '', '16298317791324163892.jpeg', 1, 1),
(78, 'India Architect 01', 'New Kitchen desings', '2015', '23M', '0', 'Delhi - India', 0, 0x5b22434c3231313034222c22434c3231313033225d, 0x5b7b22696d675f6964223a22323239222c2266696c655f6e616d65223a2231363239383331383932323130383234383531312e6a706567222c22617070726f766564223a2231227d5d, 'Randir Nair', '', '', '16298318922108248511.jpeg', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `project_category`
--

CREATE TABLE `project_category` (
  `project_cat_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `cat_lvl2_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project_category`
--

INSERT INTO `project_category` (`project_cat_id`, `project_id`, `cat_lvl2_id`) VALUES
(8, 0, 'CL21014'),
(9, 30, 'CL21011'),
(12, 0, 'CL21014'),
(13, 40, 'CL21021'),
(18, 41, 'CL21014'),
(25, 42, 'CL21011'),
(26, 42, 'CL21021'),
(47, 44, 'CL21057'),
(57, 46, 'CL21011'),
(58, 47, 'CL21014'),
(59, 48, 'CL21011'),
(60, 49, 'CL21014'),
(61, 50, 'CL21014'),
(68, 51, 'CL21011'),
(69, 38, 'CL21014'),
(72, 52, 'CL21011'),
(73, 52, 'CL21014'),
(74, 53, 'CL21056'),
(75, 54, 'CL21056'),
(76, 55, 'CL21056'),
(77, 56, 'CL21011'),
(84, 57, 'CL21011'),
(85, 58, 'CL21014'),
(90, 43, 'CL21011'),
(91, 43, 'CL21014'),
(96, 59, 'CL21016'),
(97, 60, 'CL21014'),
(98, 61, 'CL21019'),
(99, 62, 'CL21011'),
(100, 63, 'CL21019'),
(101, 63, 'CL21121'),
(102, 64, 'CL21089'),
(103, 65, 'CL21177'),
(104, 65, 'CL21178'),
(105, 66, 'CL21080'),
(106, 67, 'CL21174'),
(107, 67, 'CL21103'),
(108, 68, 'CL21103'),
(109, 68, 'CL21104'),
(110, 68, 'CL21173'),
(111, 68, 'CL21106'),
(114, 69, 'CL21046'),
(115, 69, 'CL21048'),
(116, 70, 'CL21075'),
(117, 71, 'CL21060'),
(118, 72, 'CL21180'),
(119, 73, 'CL21145'),
(120, 73, 'CL21144'),
(121, 74, 'CL21106'),
(145, 76, 'CL21177'),
(154, 75, 'CL21011'),
(155, 75, 'CL21177'),
(156, 77, 'CL21060'),
(163, 78, 'CL21104'),
(164, 78, 'CL21103');

-- --------------------------------------------------------

--
-- Table structure for table `project_images`
--

CREATE TABLE `project_images` (
  `img_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `file_name` varchar(1000) NOT NULL,
  `description` varchar(1500) NOT NULL,
  `img_status` int(11) NOT NULL DEFAULT 1,
  `photo_category` mediumblob NOT NULL,
  `approved` int(11) NOT NULL DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `project_images`
--

INSERT INTO `project_images` (`img_id`, `project_id`, `file_name`, `description`, `img_status`, `photo_category`, `approved`) VALUES
(59, 31, '1595702837web_Changi-T4-Singapore-8-HR-Credit-Benoy.jpg', '', 1, 0x5b22434c3231313630222c22434c3231313536222c22434c3231313436225d, 1),
(58, 31, '1595702738web_Changi-T4-Singapore-1-HR-Credit-Benoy.jpg', '', 1, '', 1),
(60, 31, '1595703353web_Changi-T4-Singapore-7-HR-Credit-Benoy.jpg', '', 1, '', 1),
(56, 31, '1595702732web_Changi-T4-Singapore-3-HR-Credit-Benoy.jpg', '', 1, '', 1),
(75, 38, '16065579620MGs93Y-switzerland-wallpaper.jpg', '', 1, 0x5b22434c3231313531225d, 1),
(76, 38, '1606557962wallpaperflare.com_wallpaper_1_.jpg', '', 1, '', 1),
(86, 41, '1607335244vcACAV.jpg', '', 1, '', 1),
(52, 30, '1595702131226216186.jpg', '', 1, 0x5b22434c3231313436225d, 1),
(53, 30, '1595702131Normanton-Avenue-3-1600x1068.jpg', '', 1, 0x5b22434c3231313439225d, 1),
(54, 30, '1595702131lake-house-in-ascona-by-wespi-de-meuron-romeo-architects-051.jpg', '', 1, 0x5b22434c3231313630222c22434c3231313539225d, 1),
(85, 41, '1607335213zcaVAVAVb.jpg', '', 1, 0x5b22434c3231313630222c22434c3231313436225d, 1),
(80, 41, '1607334958slide_04.jpg', '', 1, 0x5b22434c3231313536222c22434c3231313436222c22434c3231313437225d, 1),
(81, 41, '1607334958slide_03.jpg', '', 1, 0x5b22434c3231313536222c22434c3231313436222c22434c3231313437225d, 1),
(82, 41, '1607334958slide_08.jpg', '', 1, 0x5b22434c3231313631222c22434c3231313530222c22434c3231313436225d, 1),
(83, 41, '1607334958slide_06.jpg', '', 1, 0x5b22434c3231313438225d, 1),
(84, 41, '1607334958slide_07.jpg', '', 1, 0x5b22434c3231313436222c22434c3231313439225d, 1),
(175, 43, '16133239831323936696.jpg', '', 1, 0x5b22434c3231313438222c22434c3231313436225d, 0),
(144, 52, '16108264611906249668.jpg', '', 1, '', 1),
(143, 52, '1610826460774831492.jpg', '', 1, '', 1),
(142, 52, '1610826460572408292.jpg', '', 1, '', 1),
(141, 52, '1610826459728283504.jpg', '', 1, '', 1),
(140, 52, '16108264571185058480.jpg', '', 1, '', 1),
(145, 52, '16108264621696995862.jpg', '', 1, '', 1),
(146, 52, '1610826463961242617.jpg', '', 1, '', 1),
(147, 53, '1612609083948146602.jpg', '', 1, '', 1),
(148, 53, '16126090971476497104.jpg', '', 1, '', 1),
(149, 53, '16126091001755190102.jpg', '', 1, '', 1),
(150, 53, '1612609102702424390.jpg', '', 1, '', 1),
(151, 53, '16126091031549442457.jpg', '', 1, '', 1),
(152, 53, '16126091041787447030.jpg', '', 1, '', 1),
(153, 54, '16126092771163019424.jpg', '', 1, '', 1),
(154, 54, '16126092772067759444.jpg', '', 1, '', 1),
(155, 54, '1612609278810143544.jpg', '', 1, 0x5b22434c3231313531225d, 1),
(156, 54, '16126092781500444947.jpg', '', 1, '', 1),
(157, 54, '161260927852506275.jpg', '', 1, 0x5b22434c3231313531225d, 1),
(158, 54, '1612609279411351524.jpg', '', 1, 0x5b5d, 1),
(159, 55, '16126093951788489763.jpg', '', 1, '', 1),
(160, 55, '16126093951531790801.jpg', '', 1, '', 1),
(161, 55, '16126093961529275933.jpg', '', 1, '', 1),
(162, 55, '1612609396416651756.jpg', '', 1, '', 1),
(163, 55, '161260939610056855.jpg', '', 1, '', 1),
(164, 55, '16126093961288572984.jpg', '', 1, '', 1),
(165, 56, '16126140971439098602.jpg', '', 1, '', 1),
(166, 56, '16126140971621420403.jpg', '', 1, '', 1),
(167, 56, '1612614098906567598.jpg', '', 1, '', 1),
(168, 56, '16126140991763635477.jpg', '', 1, 0x5b22434c3231313537222c22434c3231313436225d, 1),
(169, 56, '161261409930250072.jpg', '', 1, 0x5b22434c3231313436222c22434c3231313437225d, 1),
(170, 56, '1612614099520067509.jpg', '', 1, '', 1),
(171, 56, '16126140991332309261.jpg', '', 1, 0x5b22434c3231313537222c22434c3231313436225d, 1),
(173, 43, '16133237911685572477.jpg', '', 1, 0x5b22434c3231313436222c22434c3231313437225d, 1),
(174, 43, '16133238282034174565.jpg', '', 1, 0x5b22434c3231313438222c22434c3231313533222c22434c3231313436225d, 0),
(182, 64, '1622214577592845984.jpg', '', 1, '', 0),
(183, 64, '16222145781443807635.jpg', '', 1, 0x5b22434c3231313438225d, 1),
(184, 64, '16222145821553542396.jpg', '', 1, '', 0),
(185, 64, '1622214586977281398.jpg', '', 1, '', 0),
(186, 64, '1622214588425401608.jpg', '', 1, '', 0),
(187, 64, '1622214591683848619.jpg', '', 1, '', 0),
(188, 64, '1622214591576708400.jpg', '', 1, '', 0),
(189, 65, '1622287485274178954.jpg', '', 1, 0x5b22434c3231313436225d, 1),
(190, 65, '16222874851399721982.jpg', '', 1, 0x5b22434c3231313437225d, 1),
(191, 65, '16222874862025808468.jpg', '', 1, 0x5b22434c3231313436225d, 1),
(192, 65, '1622287512305509852.jpg', '', 1, 0x5b22434c3231313436225d, 1),
(193, 65, '16222875491120629468.jpg', '', 1, '', 0),
(194, 65, '1622287561108036823.jpg', '', 1, '', 0),
(195, 66, '16223049661060996271.jpg', '', 1, '', 0),
(196, 66, '1622304968815410330.jpg', '', 1, 0x5b22434c3231313437225d, 1),
(197, 66, '16223049701824958920.jpg', '', 1, '', 0),
(198, 66, '1622304971891084844.jpg', '', 1, '', 0),
(199, 67, '1622305252592770028.jpg', '', 1, 0x5b22434c3231313439225d, 1),
(200, 67, '16223052531203127137.jpg', '', 1, 0x5b22434c3231313439225d, 1),
(201, 67, '1622305254698849549.jpg', '', 1, 0x5b22434c3231313439225d, 1),
(202, 68, '16228721991183043417.jpg', '', 1, 0x5b22434c3231313438222c22434c3231313536225d, 1),
(203, 68, '1622872277992957828.jpg', '', 1, 0x5b22434c3231313438222c22434c3231313536225d, 1),
(204, 68, '16228722832110494112.jpg', '', 1, 0x5b22434c3231313536225d, 1),
(205, 68, '162287228430325649.jpg', '', 1, 0x5b22434c3231313536222c22434c3231313439225d, 1),
(206, 68, '16228722871185616635.jpg', '', 1, 0x5b22434c3231313536225d, 1),
(207, 69, '16228860011971931085.jpeg', '', 1, 0x5b5d, 0),
(208, 69, '1622886001603194293.jpeg', '', 1, 0x5b5d, 0),
(209, 69, '16228860021327585810.jpg', '', 1, 0x5b5d, 1),
(210, 69, '1622886003674238454.jpeg', '', 1, 0x5b5d, 1),
(211, 69, '1622886003285039800.jpeg', '', 1, 0x5b5d, 1),
(212, 69, '16228860091605467962.png', '', 1, '', 0),
(213, 69, '16228860091586934267.png', '', 1, 0x5b5d, 1),
(214, 69, '16228860101043820552.png', '', 1, 0x5b5d, 1),
(227, 76, '16297392471284899658.jpeg', '', 1, '', 0),
(228, 77, '16298317791324163892.jpeg', '', 1, 0x5b22434c3231313438225d, 1),
(229, 78, '16298318922108248511.jpeg', '', 1, 0x5b22434c3231313536222c22434c3231313436222c22434c3231313534225d, 1);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `review_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `reviewer_id` int(11) NOT NULL,
  `reviewer_name` varchar(500) NOT NULL,
  `description` varchar(3000) NOT NULL,
  `rating` int(11) NOT NULL,
  `review_date` date DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`review_id`, `client_id`, `reviewer_id`, `reviewer_name`, `description`, `rating`, `review_date`) VALUES
(1, 66, 0, 'Shanthi Alwis', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodoconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.', 4, '2020-08-06'),
(2, 66, 0, 'Nimal De Silva', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets.', 5, '2020-08-08'),
(4, 66, 0, 'Nipuna Nanayakkara', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem id consequatur praesentium rerum quis quo et assumenda, officia corrupti, provident exercitationem hic autem nobis illo ex aliquam numquam doloribus cumque.', 4, '2020-08-08'),
(5, 66, 0, 'Chathumali Gunawardena', 'Very good architecture.', 4, '2020-08-19'),
(6, 66, 0, 'Sunil Almeda', 'My housing project was done by Dubai Homes and highly recommended.', 4, '2020-09-24'),
(7, 75, 0, 'Sarath Fernando', 'Good but average quality work. Need to improve in quality.', 3, '2020-10-30'),
(8, 67, 0, 'Nipuna Nanayakkara', 'Best quality products in Sri Lanka.', 5, NULL),
(9, 67, 0, 'Thilini Perera', 'Nice collection of products found in Sri Lanka', 5, NULL),
(10, 67, 0, 'Anil Ferdz', 'Mind-blowing extraordinary extravagant.The ambience what is created is classic.I have a beautiful house and it\'s my dream house  Touchwood as I keep admiring my house as it\'s beautiful adorned by usPerfectionist is What Milindji.and he has excellent team to be appreciated!!', 4, NULL),
(12, 66, 0, 'Murali Vijay', 'Looking to use an icon or symbol in place of text for some pagination links? Be sure to provide proper screen reader support with aria attributes.', 3, NULL),
(13, 100, 0, 'Mohommad Bin', 'Good work and reasonable price', 4, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(50) NOT NULL
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

CREATE TABLE `services_list` (
  `id` int(11) NOT NULL,
  `cat_lvl2_id` varchar(100) NOT NULL,
  `company_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `services_list`
--

INSERT INTO `services_list` (`id`, `cat_lvl2_id`, `company_id`) VALUES
(24, 'CL21013', 7),
(174, 'CL21101', 26),
(173, 'CL21104', 26),
(346, 'CL21014', 8),
(345, 'CL21010', 8),
(31, 'CL21018', 14),
(172, 'CL21102', 26),
(171, 'CL21103', 26),
(170, 'CL21106', 26),
(169, 'CL21036', 26),
(388, '', 27),
(387, 'CL21014', 27),
(386, 'CL21055', 27),
(506, 'CL21121', 1),
(505, 'CL21019', 1),
(504, 'CL21056', 1),
(248, 'CL21055', 29),
(336, 'CL21066', 68),
(510, 'CL21049', 2),
(240, 'CL21062', 28),
(247, 'CL21062', 29),
(493, 'CL21058', 30),
(492, 'CL21062', 30),
(509, 'CL21045', 2),
(503, 'CL21011', 1),
(309, 'CL21057', 37),
(311, 'CL21057', 40),
(312, 'CL21057', 50),
(313, 'CL21069', 55),
(314, 'CL21062', 57),
(315, 'CL21062', 60),
(316, 'CL21062', 62),
(317, 'CL21062', 66),
(318, 'CL21069', 64),
(320, 'CL21069', 67),
(508, 'CL21014', 2),
(338, 'CL21057', 69),
(389, 'CL21019', 73),
(340, 'CL21055', 74),
(347, 'CL21011', 8),
(385, 'CL21062', 27),
(390, 'CL21032', 73),
(502, 'CL21014', 1),
(501, 'CL21039', 1),
(523, 'CL21017', 76),
(522, 'CL21031', 76),
(541, 'CL21012', 77),
(540, 'CL21011', 77),
(350, 'CL21059', 81),
(351, 'CL21060', 81),
(352, 'CL21133', 81),
(353, 'CL21135', 81),
(521, 'CL21056', 76),
(507, 'CL21016', 1),
(511, 'CL21110', 2),
(512, 'CL21112', 2),
(513, 'CL21082', 2),
(514, 'CL21080', 2),
(515, 'CL21111', 2),
(516, 'CL21114', 2),
(517, 'CL21079', 2),
(518, 'CL21132', 85),
(519, 'CL21112', 90),
(520, 'CL21110', 90),
(526, 'CL21089', 94),
(527, 'CL21085', 94),
(528, 'CL21027', 94),
(529, 'CL21079', 94),
(539, 'CL21177', 96),
(538, 'CL21063', 96),
(536, 'CL21178', 97),
(537, 'CL21177', 97),
(542, 'CL21065', 98),
(543, 'CL21112', 98),
(544, 'CL21080', 98),
(545, 'CL21103', 98),
(546, 'CL21174', 98),
(572, 'CL21180', 100),
(571, 'CL21011', 100),
(566, 'CL21048', 103),
(565, 'CL21046', 103),
(560, 'CL21173', 102),
(559, 'CL21174', 102),
(558, 'CL21104', 102),
(557, 'CL21103', 102),
(556, 'CL21106', 102),
(567, 'CL21185', 105),
(568, 'CL21175', 105),
(569, 'CL21048', 106),
(570, 'CL21075', 106),
(573, 'CL21128', 113),
(574, 'CL21132', 113),
(575, 'CL21056', 114),
(576, 'CL21032', 114),
(577, 'CL21024', 114),
(586, 'CL21079', 115),
(585, 'CL21065', 115),
(584, 'CL21060', 115),
(676, 'CL21178', 116),
(675, 'CL21177', 116),
(674, 'CL21011', 116),
(673, 'CL21180', 116),
(591, 'CL21177', 117),
(592, 'CL21063', 117),
(593, 'CL21071', 117),
(594, 'CL21070', 117),
(595, 'CL21062', 118),
(596, 'CL21178', 118),
(597, 'CL21177', 118),
(598, 'CL21043', 118),
(599, 'CL21065', 118),
(600, 'CL21055', 118),
(601, 'CL21048', 125),
(602, 'CL21046', 125),
(603, 'CL21022', 125),
(604, 'CL21059', 127),
(605, 'CL21059', 128),
(606, 'CL21059', 129),
(615, 'CL21104', 130),
(614, 'CL21103', 130),
(613, 'CL21106', 130),
(612, 'CL21058', 130),
(616, 'CL21174', 130),
(621, 'CL21059', 131),
(622, 'CL21070', 131),
(623, 'CL21065', 131),
(624, 'CL21045', 135),
(625, 'CL21051', 135),
(626, 'CL21022', 135),
(636, 'CL21180', 143),
(635, 'CL21011', 143),
(634, 'CL21055', 143),
(633, 'CL21177', 143),
(632, 'CL21069', 143),
(637, 'CL21045', 143),
(638, 'CL21180', 144),
(639, 'CL21070', 144),
(640, 'CL21069', 144),
(641, 'CL21089', 144),
(642, 'CL21145', 144),
(643, 'CL21075', 147),
(658, 'CL21130', 151),
(657, 'CL21144', 151),
(656, 'CL21075', 151),
(655, 'CL21185', 151),
(659, 'CL21173', 151),
(660, 'CL21047', 153),
(661, 'CL21052', 153),
(669, 'CL21011', 155),
(668, 'CL21130', 154),
(667, 'CL21060', 154),
(666, 'CL21185', 154),
(670, 'CL21180', 155),
(671, 'CL21045', 155),
(672, 'CL21055', 155),
(677, 'CL21180', 157),
(678, 'CL21011', 157),
(684, 'CL21185', 158),
(683, 'CL21057', 158),
(682, 'CL21178', 158),
(685, 'CL21046', 158);

-- --------------------------------------------------------

--
-- Table structure for table `service_areas`
--

CREATE TABLE `service_areas` (
  `id` double NOT NULL,
  `city_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `service_areas`
--

INSERT INTO `service_areas` (`id`, `city_id`, `company_id`) VALUES
(192, 1072, 30),
(191, 1071, 30),
(190, 1074, 30),
(150, 1099, 7),
(149, 1098, 7),
(148, 1087, 7),
(151, 1100, 14),
(164, 1144, 37),
(166, 1075, 40),
(167, 1075, 50),
(168, 1274, 55),
(169, 7, 55),
(170, 1275, 55),
(171, 7, 57),
(172, 7, 60),
(173, 1086, 62),
(174, 7, 66),
(175, 1086, 64),
(183, 1152, 69),
(181, 1094, 68),
(193, 1075, 114),
(194, 1074, 114),
(195, 6, 114),
(196, 7, 114),
(197, 1073, 114),
(198, 1075, 127),
(199, 1066, 127),
(200, 1074, 127),
(201, 1047, 127),
(202, 1042, 127),
(203, 1069, 127),
(204, 1058, 127),
(205, 7, 127),
(206, 1268, 127),
(207, 1061, 127),
(208, 1073, 127),
(209, 1071, 127),
(210, 1064, 127),
(211, 1068, 127),
(217, 1269, 158),
(216, 1094, 158),
(215, 1086, 158);

-- --------------------------------------------------------

--
-- Table structure for table `service_districts`
--

CREATE TABLE `service_districts` (
  `id` float NOT NULL,
  `district_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `service_districts`
--

INSERT INTO `service_districts` (`id`, `district_id`, `company_id`) VALUES
(128, 23, 8),
(127, 19, 8),
(126, 15, 8),
(125, 14, 8),
(95, 8, 26),
(202, 10, 1),
(201, 4, 1),
(96, 10, 26),
(160, 10, 27),
(159, 8, 27),
(124, 8, 74),
(123, 8, 67),
(203, 8, 85),
(204, 8, 90),
(250, 8, 77),
(213, 13, 94),
(212, 10, 94),
(211, 8, 94),
(209, 8, 95),
(210, 10, 95),
(249, 26, 96),
(248, 21, 96),
(247, 20, 96),
(246, 13, 96),
(245, 11, 96),
(244, 10, 96),
(243, 9, 96),
(242, 8, 96),
(238, 8, 97),
(239, 10, 97),
(240, 14, 97),
(241, 17, 97),
(251, 8, 98),
(252, 10, 98),
(253, 13, 98),
(277, 25, 100),
(276, 17, 100),
(275, 10, 100),
(274, 8, 100),
(261, 10, 102),
(260, 8, 102),
(270, 13, 103),
(269, 10, 103),
(268, 8, 103),
(271, 8, 105),
(272, 10, 105),
(273, 13, 105),
(293, 20, 115),
(292, 14, 115),
(291, 10, 115),
(290, 8, 115),
(345, 10, 116),
(344, 8, 116),
(296, 8, 117),
(297, 10, 117),
(298, 13, 117),
(299, 14, 117),
(300, 8, 118),
(301, 10, 118),
(302, 13, 118),
(303, 14, 118),
(304, 15, 118),
(305, 8, 125),
(306, 10, 125),
(307, 13, 125),
(308, 14, 125),
(309, 17, 125),
(310, 20, 125),
(311, 8, 128),
(312, 8, 129),
(313, 10, 129),
(314, 19, 129),
(317, 8, 130),
(320, 8, 131),
(321, 10, 131),
(322, 13, 131),
(323, 8, 135),
(324, 10, 135),
(330, 13, 143),
(329, 10, 143),
(328, 8, 143),
(331, 14, 143),
(332, 8, 144),
(333, 10, 144),
(337, 7, 151),
(338, 8, 151),
(339, 9, 153),
(343, 15, 154),
(342, 14, 154);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_email` varchar(1000) NOT NULL,
  `client_id` int(11) NOT NULL,
  `password` varchar(300) NOT NULL,
  `role_id` int(11) NOT NULL,
  `auth_token` varchar(150) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_email`, `client_id`, `password`, `role_id`, `auth_token`, `status`) VALUES
(9, 'manager@easybuilding.lk', 0, 'e15374bb1dc4543b9ca3dd8ccba6a9c5', 3, '6SLYLQA7Z895UE2Y0YR88NX5A1HYSX3EOCTQPHTYUEFCU6YHMMNLUTJIWTS3T8Q099H2WQ4UKB1XW8.0914E2THJRJ.B7M5FTZ5I', 1),
(7, 'nipunann0710@gmail.com', 0, 'f6fdffe48c908deb0f4c3bd36c032e72', 2, '50WNHBUTVETA0C8JXR3GFWHD4F76A3HF7Q49.76AIGKOCLI43JCPS775OW8DOM344A46M2WBTOJ687TYDWK.4.XWTJK40SSIEETI', 1),
(10, 'owner@easybuilding.lk', 0, '64c4a08bf9666d7a54fa7ce4e4ca3269', 2, 'WZJH1B5N5MCN40MSV2K30K0YJ1NEWKIPJUJNC6OXF0Q7.2GU5ZU0KNS.N3FG044DJ1F0DXA2LMY4FCBNHWNL2GYKH5ZCB4.FXCSF', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_sessions`
--

CREATE TABLE `user_sessions` (
  `session_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `auth_token` varchar(500) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_sessions`
--

INSERT INTO `user_sessions` (`session_id`, `client_id`, `auth_token`, `password`) VALUES
(56, 75, 'DUAUWiVL7oFkNfZ1597291624296', '123456789'),
(49, 68, 'TLLkJcJF1KuWI621620401511189', '123456789'),
(50, 69, 'EAAlrbREIkZCkBADIzYv4TSZC9sqnIwzMgKM7lYQCYFvlatZB53BcU6h61OWTfAiPZAZCGAC8MEwkmgLxZBYONS17uVUlYPSL7KFq7tU6i9hc0sggFdUPndHFrcZASazH1JfOtlyunu5tI6EZBGjE454ikaCEpsYM2ZBlmZCEhZAMRp31e2HmaFAZANf93yNZBgabg2rP5lFW4KddRp4Oac8PKgzy4', ''),
(51, 70, 'ya29.a0AfH6SMC5P51k_otbDQ2N-XPWyrg7JMJW7pfp_8sGW--8V7d0WhSAEvxK30wZPkmVQbS_eklU4mtNLwX-gcIdNG7b62QE59XIwCmubHoLJhQcqLMWH8VO4uXVYBRfa0pg2exfB3c1uYU-_YN_RGgVCu_E5CG1AwTAULpNUQ', ''),
(57, 76, '24FLddcRPGKrZC91596897750977', '123456789'),
(58, 77, 'sKj4LhVUde7wAal1598932425264', '123456789'),
(48, 67, 'ya29.a0AfH6SMAHEMH-f05AShtHrnNaoiS463Ly_cAUD-Qd4la-49E9ZofxTjZQKUGEWA_SH1gDUOOvkEyk8kWBhhWA72yQn7ZRKn2nWcXOtPWTyjCBKCZQ5jfMV5HL3nqPieW9s1gzh8up4nec48XREAvRG-MHMK5WUXo', ''),
(47, 66, 'EAAQPlMeiuc0BAPtQ1fmtHvKqoo4UATZAyNxZA1kdnS3aZAidD6hl4IYYXOt2HAjjefPKF1qBHyOtNAjpzWFogiWK9oesncb4VqAx22rDh3X6MWjTZAWBqjL7ddlU1Gu7ZBtlg5pEZBDdUmx8ZCq2eZB5xsYUl0G6moZA0gCt8EpGCgTtFLLKS06b5pFo9XZC7BSkoZD', ''),
(46, 65, 'EAAlrbREIkZCkBAOHVjjUZCBewHTfKUnqDc56JFkG7bKHsi9GQhxZCrm9tUY4ZBYg76zZB2xZC99j22HoU0AGkPOJuW0IxZAVd4hI96l4oQtG4saG6STgGKiCZCtvhPO5kGsMZAJYkdwpnpeQqFThhDFZCiZB5QarXXswuA4tXLyTdYQ1G01EAv25mS0ZA1eYTSJu6P8m7N8l9zuypCpY4T2roZBs3', ''),
(59, 78, 'EAAlrbREIkZCkBAJNtFOvVAP1VGqwak3lphgAFWDScZBUbi1GbHwZCKDXyKxtjbxcDPeWoxqYquRGRd4Rvct7ejOpNsatyJRrPC9JZBEO0ooIjk9xljLvprIuQtwDE5EsU2sZAX52EmqS6fvQ5JIobqx6OILdkTe8nM53TrbXOmFPzNWe5x8POYA0V7onsTag3XDd55rE0bbGQ7IZBo7Ijr', ''),
(60, 79, 'EAAlrbREIkZCkBALAXr92TgW2ZCdE4sudVz8RYEeLEuokzRQndiYz1qTRG5XOlVqmNi9oF4brljOEuAqPd8ulbHY36OAZBZBkrEePJb3ULvxjjIelnVq7UPjYkUZAZBztB37QNC2CyxuhmDTKhpHNK0UaKeXTIbGGc31z1OZAk1ZCt6Hiw7VCgUoJTdJmhWRHsPaJMLWuutiPm78lP4j9bm9z', ''),
(61, 80, 'sG9JTIpESTNPCH91605337768371', '12345678'),
(62, 81, '12JeUFGFfk6a8RG1605355126371', '12345678'),
(63, 82, 'fMpBshqWlwPeeeJ1605380324080', '12345678'),
(64, 83, 'tqHhqcJy5wccBCv1605383015806', '12345678'),
(65, 84, 'mL8IyteBUOJICWg1620401576138', '123456789'),
(66, 85, 'NAvegHm9qKP8TTd1605501791505', '12345678'),
(111, 134, 'hqGwvhe3uTCM8xP1613199512046', ''),
(69, 88, 'xLNtreZWSlGqxVX1605859065550', ''),
(80, 99, 'hwI6eEEXMUaLM4c1614531413186', '12345678'),
(81, 100, 'EAAlrbREIkZCkBACN9X4xVd5ekUrEnhWgANZBZBdKgIvXXlK4jLZAf8ydZAjAkkZCkwBU5tlHvAI0kYXQwtbHlnO4ht6fSbf9poCxyBgpGs846Q7kJC95QJApuw1teuCv4arq6ZCibSfyGDoUFLmHpPTIZAAThziL9of37RLJO25pxdUHggHGVToHlkPVuYWDeiY3SjvWCsCXcVzGVos5b83G', ''),
(82, 101, 'WvWKQSG1YaxFjdS1607286000046', '12345678'),
(83, 102, 'yoFpoM2CHaf8Uu91607286614861', '12345678'),
(84, 103, '5L7wL92g83gGCsS1613193992467', '12345678'),
(85, 104, 'zgEyUbos1TzuKC71608554535452', '12345678'),
(86, 109, '6b9O3kQVzqU70NL1608999925024', '12345678'),
(87, 110, 'ZblZXp8J14NjRLW1609005317595', '2jRCR5VUMjFTwun'),
(88, 111, 'DupylruPQtsp7Uv1609007454389', 'Pq9xfuzXbRoD6eh'),
(89, 112, 'Ur5JRlqIz6xpRs31609007527027', 'sqpqZwcfolH54L9'),
(90, 113, 'Nlkh72granhnpHS1609011845301', 'EP7PJC9GY4g2FS6'),
(91, 114, 'SCc0C5F9KjDh9sV1609068427144', 'ZmAosktOSN7TM2t'),
(92, 115, 'jSfnhDDkwQCnZ4w1609068793208', 'DUpxdhxTzTFw6k4'),
(93, 116, 'sumEGDMUYjttf461609068856729', 'Swzc3OBz5RqyITL'),
(94, 117, 'e1euUEztGyn1ZZJ1609095514019', 'RWvv2fFOk2i9C0C'),
(95, 118, '', ''),
(96, 119, '', ''),
(97, 120, 'qbxeYwq9cexFHTH1609098459351', 'wfjIpLL5MOkVgbu'),
(98, 121, 'DB18dbO11IRAJeM1609127154006', ''),
(99, 122, 'PSdCL2cITDpHSJK1609127507036', ''),
(100, 123, 'gHJGdKmqGVTH69k1609132303196', ''),
(101, 124, '4QgbiYmzZVRHPfF1609132872509', ''),
(102, 125, 'nqQCd3tzjgvBWFr1609133010533', ''),
(103, 126, 'HM27FA5FsmwJ0231609153073902', ''),
(104, 127, '4KOPaQtPjP1OVzG1609179628178', ''),
(105, 128, 'zAOlY46j7v8XEvE1609216848148', ''),
(106, 129, 'C2K1RD4EDkmu0Tg1609217366663', ''),
(107, 130, 'CSYQ8UXcbUkOvYz1609226463610', ''),
(108, 131, 'jChb9Gxe8JFSpGA1609228507393', ''),
(109, 132, 'BgTLybHTuPIrhyV1609238404189', '12345678'),
(110, 133, 'BUYSBIneUjo3dMF1609596098616', ''),
(112, 135, 'ZjABjuEeRXtuTvX1613199525712', ''),
(113, 136, 'R1ahuGLIgb7uUin1613199568736', ''),
(114, 137, '0ksF5tmjPPDdEqD1613199590856', ''),
(115, 138, 'EAAQPlMeiuc0BAEEIjYOsFKDUlCqI79cZCjtdz0NMFW9q9BIBEZB6rBoEsWBu2a78VQJ3QZAN697ZAH9oz4ZAhSTJZC2dfTQZAvlLeMe4VFLkTdTCZB8sMhsntz1H4dIFF7H3B0ai1oadtPuf3WCuVQ7XaZC6s8BisHxy7pRrYOfYa1qdBkBRuOT8VA5o4ZBZCuI0gwwTIEL9d7QqgZDZD', ''),
(116, 139, 'Gph615dTTdRnInm1612674323834', ''),
(117, 140, 'cSBLSMbacheHEql1612674337103', ''),
(119, 142, 'WdzLSLFo513mtaP1619899192653', ''),
(118, 141, 'glvdTx9WkLxbSYu1613449925022', ''),
(120, 143, '5E9Ln3BXT5KeRjr1619899203581', ''),
(123, 146, 'EAAlrbREIkZCkBACYSML3BEkdP85mSAU3paGsfcxntnWVgUDRrgkBSoCvK0qSRdZBdSQX6z53A3M3GMbRGGkXUOyCFgWLJoknurI95hODlpTsNvIIhwUJJZBGKj0QAfHUz19JGkGkbZCgk3HQa5HJl96ZAZBAib4iMGwTYh1CnO0NqaDOrwGCYoLQ6wHsbp5A8j1k8cOpyJ0FReWPRGbVgZA', ''),
(122, 145, 'EAAlrbREIkZCkBAJtZBlDcpHAWvKl55qaYDJrZBXSpraZCZBcZB4J8CdIsKoQuyKVtwDAJZA3TPkgwoS2HAMcH7x38AGNvpyaexvfrpLLEWKYsi1jSq0m7HBL1DvvZAXVhgjvwZADjjbdOesBApsw9B7yUuWzmymgdG51u0XZAax474xHilVABe6hGDZB3vJ5MDaOLrjnBQNOGVIAkZC8m9ul5qDi', ''),
(124, 147, 'EAAlrbREIkZCkBAJkOvBUqZBMdPmvZCKhiFkN6TDteQYMTyXUrjEu5x4S7lFxz2tIfr6MbueLtUFO7ZBVhMcm8FIytiS7ymGV9OEsiqrhv2KwyrdN565hnChIGuGrY5ZBaGDnl7eZCK2xoi2S9cWr2oZBp3wHBi7VdWZBlbqbVk4rB6k5yJ4v1KZAXcIfww1rkL3ALZAXqZCrM5hgnLeHcoxrmSW', ''),
(125, 148, 'EAAQPlMeiuc0BAAq2DHLTXGcNZAIVoNswMKM5Kjy0LpVaXTUwGHKE1GzUjDVOQE1pok1FC3LCBHu9UtacAqccK21FbUQoMlVCQctm2knZCKcSNqoQSVjD2Mi3ZBy51SzDKflBWTIz1iHaUXIzWbcF9wjx2IBOnHcSAPtFuFqh8let58rOUwgJ7d3U9LNGP0ZD', ''),
(126, 149, 'ya29.a0AfH6SMAXjscLQYA3eCIYHOdY92l7G14LnkaMdcag8y5nAOtWktdgj_fuUjTKl4CkYom_TTX47NqfWJvuWIOL9G3tZ30YpisGWyxIKEWwRE2Qp6MarLfPxe2sn0tRcUE3cOR3fvSfzVMTXmjjt8l2bRURzUkFCYs', ''),
(127, 150, 'RsWY8WfMiQg9PbG1621155657911', ''),
(128, 151, 'EAAQPlMeiuc0BAMn5Q3s1O67G3Rt7pSiRA1woUqqfIeBZBDqr12umw1eaYvJMuGZA9UB596dWjZCS5vIX6xlsOiZBLq0AZBqZA0mZBitZAqvXRkTThQktkr2jwYmSENhMfZAZBYTcb1wmC20StdSmqCmxMF0JTZBLFEMwtHwmm7VaJV0148S698uavfseNMKRtaOCPUZD', ''),
(129, 152, 'EAAQPlMeiuc0BAO4aQrX7dwsbK6q3cf47j3iOhyHRtnC9KkOsu2KdCzjcx6nw7SZCQ9TH6WKXB84Vv1QwRs1DIR3KCtqkBaDzSHDwhdBMssAiCmjWbPkdNnLfl39XFCcg8pJ8EienakXIhQaJw9zDpOxyAO9eV36IfHBF00MZAZBW0djkCZCrjzmtMVdyZAVwZD', ''),
(130, 153, 'BkbS46Oa8zCcET51622101748646', ''),
(131, 154, '239o7vApp6pY28Q1622107732483', 'lV2228887'),
(132, 155, '6TgBHD4OBJuu2Ed1622124849879', ''),
(133, 156, 'tj7itrhAk51A8SQ1622286558327', ''),
(134, 157, 'fWlJ8ludv1LGyep1622303239655', ''),
(135, 158, 'Se2aKIBE0vae3Cz1622553374706', ''),
(136, 159, 'ceNQYfOI9Aw4JWW1622553388560', ''),
(137, 160, 'Bx0SDb3vaI2WnZw1623683425476', 'nadeecandoit2022!'),
(138, 161, 'IDg3ChBQxu2jqaB1622865400989', ''),
(139, 162, 'aucQpouo30WVV2l1622884528065', ''),
(140, 163, 'roIpPkO01icjLjo1622902337313', ''),
(141, 164, 'PzWWUmwS0k1r22X1622951034249', ''),
(142, 165, 'hqUjCkpFgliALEj1622956014335', ''),
(143, 166, 'ya29.a0AfH6SMA-rAM6dCd_O0_OBIwUTcGN0XcdUrxY8NM_XEYOWMLFWVncZdeFmENlm-WojQM2r5EjOFYSssxb-96IAlENmdItHaepA2Gp3SR10lye36w8uAvuHt8mdHzM-C-ouRZTHZUDZ6Q5ZSkxPXECPCPwTa5j', ''),
(144, 167, 'ya29.a0AfH6SMB9YKlIoZd8pRV_INeu5A8mhwNBRutAbIIOFtuDt2uwGOaCke4sJQT-q6NXIJeOl9sAq-YAQYvw2xJ_ajhbzncOTW5JhP6okrIH-zGxayME_-xid5RNzzkhZ433V3FK1WBirXqpSTp3vF75DC9DobQb1Xk', ''),
(145, 168, 'ya29.a0AfH6SMAwD7thk8jygNYIBjOxR1p-6I_c4K28IdMYT4hW2oqHdhvXtFgqSB4EHQRCvd4kyYbSh6XuSgc8cYBZQn-6P9TRB7hw4CIBA_WoUSCs5VyQQoiUcDhpqwH2qmI8xbrISZ_YbskXY0OCOuUKowfLatVm', ''),
(146, 169, 'EAAQPlMeiuc0BAIML25IJq5aompQ3ZCbWMJAa5H3TVLtPJIn0smEb5Xl0yDcZAsTpDwoZCQ6LyQ04xPY6dLpzBgBNrhT1byhnHy3mLNDR4noeOvH2nZAmA2odZA6LVLOKKvo4f72bJNygeX5wJuhcgrdM6M90szZBfpHW3D7rzZBbZBUvZAfo7PlNBZAcDhntCYVlcZD', ''),
(147, 170, 'ya29.a0AfH6SMBSu7lX9m5xDVJhsMLkwIsD0aD_VjcJWY1rd58JJ-i2DtLEk7P6-v3rbQeo_tyJYd2Dr3G1_mpue6bflJHaURzKac8zoDAKfmGVRMohRkACoWdKIUQ_1h-ETiTSD0AbyJerhNIc_lIvAqxOd7iNq7Me', ''),
(148, 171, 'EAAQPlMeiuc0BABrSGZCwqKmMj2reZCWK6Qrd33iyxAkRokK7MPZBUduDxvOdzhtbEXTAEIZAisqXmWM9097ZAjn11H1IMLke8GjPoWf5fuZBiUXiCV1EpjtryGP94tmeEhcpJWCNlPzEt5EYPYz2J6DzdnsG3gjTZBsCfO51aZAfO6UU1SNZCBZCDVZBRoZCd7jo548ZD', ''),
(149, 172, 'ya29.a0AfH6SMDe_ipz4YUeIVTk35bfGacBqBw3evfd4cVZbkbbM4OVy4PuF0W40nrDJ2NzZQiWMAGi3aG2ahA_BT5GWE_rbKYFq2sI3MhH9_XIcQ5MaqoiP57Mi5fN0GUFP1I-4vEFT43Idhz5X1EOakCCLMxbJBn1', ''),
(150, 173, 'soJJ3QfTqBbJzof1623492009369', ''),
(151, 174, 'V2rlHKuVikNmTXw1623498782302', ''),
(152, 175, 'EAAlrbREIkZCkBAFYYJAgovXCeKcCB8oTyp9TQx0XZCNrgEMOIxCKwkNQQYEnfoygschuWs7YVAAY4tJ9AeVuJ8ZA57c2BZCmmMSxhaRdK9KwQZAGXZBEQOg5wimjfXb3RBOTEPDfhBNUP3H6sS0mRDyPUCN22TSFHgL0m2pe4yMfFfHk6Uok2QqoZCcP7pmKQ9VF5CV158eoLzWR65uFTB3', ''),
(153, 176, 'ukrdWFBnAAGB4561623555199793', ''),
(154, 177, 'v65TvJQz3TE293v1623557955177', ''),
(155, 178, 'CmV3vr0mivUGufZ1623563556184', 'nn123456'),
(156, 179, 'ya29.a0AfH6SMDxu00duAPPbVAaLMjASmkIVn8r46dvy_P-oNk5VFVFYRJEvKYeb2leGEjALoT9roAvxNXukZGFdZHGOVKpiVJk5SyXdkGkk-wxmynHgorgqY5ve5xSykjHU33XP-9v1SA7242nYl0CdVZEJzNJ21dvJMI', ''),
(157, 180, 'OUwljNftBHaEgqT1623571237595', ''),
(158, 181, 'xTe3hDZer5zyKYl1623597096556', 'nn123456'),
(159, 182, 'oY2AAiRFYuO0bmw1623598611664', ''),
(160, 183, 'QYnSD1E3RTTdoRL1623601082189', 'adminadmin'),
(161, 184, 'G9iOEoznT9fOgqy1623684313269', 'vjcandoit2022!'),
(162, 185, 'RNSSbN5ARdtWbKl1624166086637', 'nn123456'),
(163, 186, 'rdvtl2fpISxfqHU1624522829030', ''),
(164, 187, 'sApLOKHo1gn3q8R1624524015980', ''),
(165, 188, 'NJtxKnOZYWBz2TD1624524518883', ''),
(166, 189, 'AiaNi7K2wJzHT0P1624525241134', ''),
(167, 190, 'IIIDJFV4rhOxuo21624766022196', ''),
(168, 191, 'ya29.a0ARrdaM_l5rJTKLCpxQuSizNsifBtU6_cJG-bNCdPbasyPpujqOvBDABoQWq4IOlVBpiLkol5Pv2l0qZzKsQVvx134dY-T088jYNKaH2esQZik7BeSoB48uJTXn9aGIsiz2SeR7XzL3WN0Bp6czq6_QI5YpnjXus', ''),
(169, 192, 'ya29.a0ARrdaM-62t73CNBiOtAaekHJ54Izeq4lTLQJ_F-Zcimhjq_EQNEi5rTMAGM-9MZeYm7UJZ3qK5I6CV-DIiAvllYGmF4YsFud9a0hqlXE-fzyyjhT_90lsHtkhiHs4s6N_7hQALd0Ztf70E93uKeWrZpvMyuPWPY', ''),
(170, 193, 'ya29.a0ARrdaM8OgW74IIjgC73FdimPkWVhq6KYl1PnS7jhjQlbPcG-5VoWxngcLT_fPwOph6GzAD5nvJsLUXJy6wTGIzhS5h0iNHtP9MSRltlkQFCAVPyQGStaEbMF6uO4rLY3pfQl9h5FRLzICahm72Dtsy_yvbCCL9M', ''),
(171, 194, 'ya29.a0ARrdaM9dI9CSKC40BqJHMIhnYyGYumdXvGVDOTpocBqQxh4ZY-4fqGz46W7yecHCQDDFUdh5bW8n6efuxJS4nFzoXWzUwlFXmneVE159VHX5bUMJkTRt5zCFGnrbR2Qz2h2T6T06UqDuEBenWo6MnMfrrGR8sIM', 'lV2228887-*/'),
(180, 203, 'ya29.a0ARrdaM_c4trcYih7PfTAj807fm_bojAE4WbuF6qv18Lrx4GlPXCJEhII8dH-VyJyEBs2CtyuLJgaKiZzvUjokmHaFMaHEkSfj80JXUZqicnkaNK27OXogANHZynyF4_yCjqTQ_EDZuRdDgUQGq8GslSequt4du0', 'adminadmin'),
(172, 195, 'ya29.a0ARrdaM-vCwl7D5sdqiXUiBVShrBqELZOMTeaU6elEfU9GWla9NFVXW0WfEWEnufeCiyiht9NY6w0V6_hJqjy-BMn0V1LpxTGtNaCD9v9FvceT2-iaFL0UH3xoa5tan_xTrDG4ogAi4UCidwumq1bboC7jMr91wM', ''),
(173, 196, '1l2Ft1zOffZsP9W1625981474548', ''),
(174, 197, 'rLem0YSpSf0gPEQ1625981490143', ''),
(175, 198, 'JOEYMSx7rG4qEnq1625981859709', ''),
(176, 199, 'Hzxr1uwR8higGi11625983540545', ''),
(177, 200, 'NgX2d5FEoZGUwjV1625983732174', ''),
(178, 201, '52ED7Rh6A3TXJMz1625983851156', ''),
(179, 202, 'hssN1UQjT13dqlI1625983926211', ''),
(181, 204, 'ya29.a0ARrdaM8D6m51K-h6dvCdUTj3MhTRBFdEvyZFk9vuoJlLuxjktuKTKncdJjlehT5XpYQU6tr0JURfVcOTCZ2KBlAt8TIBQirwLEb5wkiYwW6wObVeOQ-FA-JKG9ULi-Ju9iCovjWjoEyHcJMEZXRqAWVfzxwrf5Q', ''),
(182, 205, 'Nh4OFXIY6mFOA6Q1625989530717', ''),
(183, 206, 'LV8UebnSRvHvsDQ1625989546083', ''),
(184, 207, 'GE1F2KT5mHw9Y001625989803079', ''),
(185, 208, 'XsmZVmTtJTwlpb61625990847994', ''),
(186, 209, 'L8LcNDNcZ2aV8oZ1625990973085', ''),
(187, 210, 'VN9aqnTBbTWvPqA1625991163881', ''),
(188, 211, 'q4q67UZOh22uozd1625991303199', 'adminadmin'),
(189, 212, 'XPzGhMZRK0lV8Tg1625991700035', ''),
(190, 213, 'kWhAVC5NW19HfZe1625993677181', ''),
(194, 217, 'ya29.a0ARrdaM_Vbl0EorDA0JRRzfsmxSYx6zakvfX2QcTzJbWT05B-bpXkIFz7Ymjy2Fom459SWDJo_fIkxN-Ys_m09inqxnZopjED5z9Yyf_N1DEhSKUuK5jxKk1W4G7xXo_OZwzefar91WJoR80boi3qd1L5zOLp7dY', ''),
(191, 214, 'ya29.a0ARrdaM9pKgTIzkt4zgwf_-32x_lC1EBU4DdSIAxsbEy7dGM5Ms10Lbvk7Cflh3_E4REy2KR_S0h8bzSurOflC8vPTp801rB0G6woashw60i_8O1nqkZ4VVfHwdIjv6SnuIppT8L8uehxg16tKLDXNjFPNjDYF4I', ''),
(192, 215, 'ya29.a0ARrdaM8z1SsdX-r22-scqffmUrDnBHf_XZu55xFJcZ-CUwIDbVwuMIiEWO8tQ1MTqOXvXCgLw2-D36kVvTxIeL1aPNiiS9lcHuRowZ78GI5YMBc_TsDXlYBINvUcL9utiAbEIVkpbx79xuiZX1V_KxeZqYGfH7U', ''),
(193, 0, 'utTpjQMHJsgfGcG1629640924175', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories-level1`
--
ALTER TABLE `categories-level1`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories-level2`
--
ALTER TABLE `categories-level2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cites`
--
ALTER TABLE `cites`
  ADD PRIMARY KEY (`city_id`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`client_id`);

--
-- Indexes for table `client_company`
--
ALTER TABLE `client_company`
  ADD PRIMARY KEY (`company_id`);

--
-- Indexes for table `company_details`
--
ALTER TABLE `company_details`
  ADD PRIMARY KEY (`company_id`);

--
-- Indexes for table `districts`
--
ALTER TABLE `districts`
  ADD PRIMARY KEY (`district_id`);

--
-- Indexes for table `home_slider`
--
ALTER TABLE `home_slider`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `house_area`
--
ALTER TABLE `house_area`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `house_surfaces`
--
ALTER TABLE `house_surfaces`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `house_surfaces_type`
--
ALTER TABLE `house_surfaces_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `image_category_list`
--
ALTER TABLE `image_category_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`img_id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`project_id`);

--
-- Indexes for table `project_category`
--
ALTER TABLE `project_category`
  ADD PRIMARY KEY (`project_cat_id`);

--
-- Indexes for table `project_images`
--
ALTER TABLE `project_images`
  ADD PRIMARY KEY (`img_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `services_list`
--
ALTER TABLE `services_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service_areas`
--
ALTER TABLE `service_areas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service_districts`
--
ALTER TABLE `service_districts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_sessions`
--
ALTER TABLE `user_sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `categories-level1`
--
ALTER TABLE `categories-level1`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `categories-level2`
--
ALTER TABLE `categories-level2`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=187;

--
-- AUTO_INCREMENT for table `cites`
--
ALTER TABLE `cites`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1285;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=218;

--
-- AUTO_INCREMENT for table `client_company`
--
ALTER TABLE `client_company`
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=159;

--
-- AUTO_INCREMENT for table `company_details`
--
ALTER TABLE `company_details`
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `districts`
--
ALTER TABLE `districts`
  MODIFY `district_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `home_slider`
--
ALTER TABLE `home_slider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `house_area`
--
ALTER TABLE `house_area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `house_surfaces`
--
ALTER TABLE `house_surfaces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `house_surfaces_type`
--
ALTER TABLE `house_surfaces_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `image_category_list`
--
ALTER TABLE `image_category_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=154;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `img_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `project_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `project_category`
--
ALTER TABLE `project_category`
  MODIFY `project_cat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;

--
-- AUTO_INCREMENT for table `project_images`
--
ALTER TABLE `project_images`
  MODIFY `img_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=230;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `services_list`
--
ALTER TABLE `services_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=686;

--
-- AUTO_INCREMENT for table `service_areas`
--
ALTER TABLE `service_areas`
  MODIFY `id` double NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=218;

--
-- AUTO_INCREMENT for table `service_districts`
--
ALTER TABLE `service_districts`
  MODIFY `id` float NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=346;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user_sessions`
--
ALTER TABLE `user_sessions`
  MODIFY `session_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=195;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
