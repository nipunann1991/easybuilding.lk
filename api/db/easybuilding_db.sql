-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 19, 2020 at 08:00 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
(15, 'C1015', 'Product Suppliers');

-- --------------------------------------------------------

--
-- Table structure for table `categories-level1`
--

CREATE TABLE `categories-level1` (
  `id` int(11) NOT NULL,
  `cat_lvl1_id` varchar(100) NOT NULL,
  `cat_lvl1_name` varchar(100) NOT NULL,
  `parent_cat_id` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories-level1`
--

INSERT INTO `categories-level1` (`id`, `cat_lvl1_id`, `cat_lvl1_name`, `parent_cat_id`) VALUES
(15, 'CL11015', 'Construction Contractors', 'C1019'),
(16, 'CL11016', 'Professional Service Providers', 'C1019'),
(17, 'CL11017', 'House Interior Contractors', 'C1019'),
(18, 'CL11018', 'Construction Materials', 'C1015'),
(21, 'CL11021', 'Electrical, AC & Mechanical Contractors', 'C1019'),
(22, 'CL11022', 'Flooring Materials ', 'C1015'),
(23, 'CL11023', 'Paints & Coating ', 'C1015'),
(24, 'CL11024', 'Electrical ', 'C1015'),
(25, 'CL11025', 'Furniture ', 'C1015'),
(26, 'CL11026', 'Bathroom ', 'C1015'),
(27, 'CL11027', 'Roofing Materials', 'C1015'),
(28, 'CL11028', 'CCTV & Home Security Systems ', 'C1015'),
(29, 'CL11029', 'House Interior Deco ', 'C1015'),
(30, 'CL11030', 'AC & Mechanical Systems ', 'C1015'),
(31, 'CL11031', 'Kitchen ', 'C1015'),
(32, 'CL11032', 'Machinery Tools and Vehicles ', 'C1015');

-- --------------------------------------------------------

--
-- Table structure for table `categories-level2`
--

CREATE TABLE `categories-level2` (
  `id` int(11) NOT NULL,
  `cat_lvl2_id` varchar(100) NOT NULL,
  `cat_lvl2_name` varchar(100) NOT NULL,
  `parent_cat_id` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
(18, 'CL21018', 'Ready Mix Concrete', 'CL11018'),
(19, 'CL21019', 'Bricks', 'CL11018'),
(20, 'CL21020', 'Adhesive, Grout and Sealant', 'CL11018'),
(21, 'CL21021', 'Commercial Building Contraction Contractors ', 'CL11015'),
(22, 'CL21022', 'Structural Engineers & Consultants', 'CL11016'),
(23, 'CL21023', 'Metal', 'CL11018'),
(24, 'CL21024', 'Blocks', 'CL11018'),
(25, 'CL21025', 'Steel', 'CL11018'),
(27, 'CL21027', 'Water Proofing Materials ', 'CL11018'),
(28, 'CL21028', 'Glass', 'CL11018'),
(29, 'CL21029', 'Door & Window Fittings ', 'CL11018'),
(30, 'CL21030', 'Hardware Stores', 'CL11018'),
(31, 'CL21031', 'Pavers', 'CL11018'),
(32, 'CL21032', 'Concrete Products', 'CL11018'),
(33, 'CL21033', 'Timber Supplier & Saw Mills', 'CL11018'),
(34, 'CL21034', 'Titanium, Terrazzo & Tiling Contractors ', 'CL11017'),
(35, 'CL21035', 'Pantry Cupboard and Kitchen Accessory Makers', 'CL11017'),
(36, 'CL21036', 'Furniture and Wood Workers ', 'CL11017'),
(37, 'CL21037', 'Carpeting, Wood Flooring , Artificial Flooring Contractors ', 'CL11017'),
(38, 'CL21038', 'House Cleaners', 'CL11017'),
(39, 'CL21039', 'CCTV & Home Security Systems', 'CL11017'),
(40, 'CL21040', 'Aluminum and Glass Contractors', 'CL11017'),
(41, 'CL21041', 'Arts & Craft', 'CL11017'),
(42, 'CL21042', 'Interior Deco, Curtains, Wall Papers and Window Films', 'CL11017'),
(43, 'CL21043', 'Quantity Surveyors (QS)', 'CL11016'),
(44, 'CL21044', 'Land Surveyors', 'CL11016'),
(45, 'CL21045', 'Draftsmen', 'CL11016'),
(46, 'CL21046', 'Electrical Engineers', 'CL11016'),
(47, 'CL21047', 'MEP Engineers', 'CL11016'),
(48, 'CL21048', 'Air condition Engineers & Consultants', 'CL11016'),
(49, 'CL21049', 'Energy Consultants', 'CL11016'),
(50, 'CL21050', '3D Image  Makers', 'CL11016'),
(51, 'CL21051', 'Home Valuers', 'CL11016'),
(52, 'CL21052', 'Project Managers', 'CL11016'),
(53, 'CL21053', 'Steel Building Contractors', 'CL11015'),
(54, 'CL21054', 'Road & Infrastructure Building Contractors', 'CL11015'),
(55, 'CL21055', 'Building Painters', 'CL11015'),
(56, 'CL21056', 'Landscaping & Paving Contractors', 'CL11015'),
(57, 'CL21057', 'Grass Cutters & Tree Cutters', 'CL11015'),
(58, 'CL21058', 'Carpenters & Wood workers', 'CL11015'),
(59, 'CL21059', 'Plumbing Contractors', 'CL11015'),
(60, 'CL21060', 'Water Proofing Contractors', 'CL11015'),
(61, 'CL21061', 'Soil & Concrete testing Contractors', 'CL11015'),
(62, 'CL21062', 'Aluminum and Glass Contractors', 'CL11015'),
(63, 'CL21063', 'Masons', 'CL11015'),
(64, 'CL21064', 'Steel Fences, Steel Gate  Contractors & Welders', 'CL11015'),
(65, 'CL21065', 'Titanium, Terrazzo & Tiling Contractors', 'CL11015'),
(66, 'CL21066', 'Pest Controllers', 'CL11015'),
(67, 'CL21067', 'Roller Gates & Roller Door Makers', 'CL11015'),
(68, 'CL21068', 'Swimming Pool Makers', 'CL11015'),
(69, 'CL21069', 'Gully Bowsers & West Removal', 'CL11015'),
(70, 'CL21070', 'House Wiring Electricians', 'CL11021'),
(71, 'CL21071', 'Electrical Supply & Installation Contractors', 'CL11021'),
(72, 'CL21072', 'Electrical Engineers', 'CL11021'),
(73, 'CL21073', 'AC Supply and Installation Contractors', 'CL11021'),
(74, 'CL21074', 'AC Technicians', 'CL11021'),
(75, 'CL21075', 'Solar Power Suppliers & Installers', 'CL11021'),
(76, 'CL21076', 'Lift, Elevator & Hoist Suppliers & Makers', 'CL11021'),
(77, 'CL21077', 'Steel Fences, Steel Gate  Contractors & Welders', 'CL11021'),
(78, 'CL21078', 'Generator Suppliers & Installations', 'CL11021'),
(79, 'CL21079', 'Titanium Products', 'CL11022'),
(80, 'CL21080', 'Tiles', 'CL11022'),
(81, 'CL21081', 'Timber & Wooden Flooring', 'CL11022'),
(82, 'CL21082', 'Carpets', 'CL11022'),
(83, 'CL21083', 'Epoxy and Floor Paints', 'CL11022'),
(84, 'CL21084', 'Artificial Flooring', 'CL11022'),
(85, 'CL21085', 'Wall Paints', 'CL11023'),
(86, 'CL21086', 'Wood Care Coatings', 'CL11023'),
(87, 'CL21087', 'Epoxy and Floor Paints', 'CL11023'),
(88, 'CL21088', 'Water Proofing Materials', 'CL11023'),
(89, 'CL21089', 'Primers & Under coats', 'CL11023'),
(90, 'CL21090', 'Steel & Metal Care Coatings', 'CL11023'),
(91, 'CL21091', 'Light Fittings', 'CL11024'),
(92, 'CL21092', 'Wires & Cables', 'CL11024'),
(93, 'CL21093', 'Electrical Switches & Sockets', 'CL11024'),
(94, 'CL21094', 'Electrical Conduits, Trunkings & Fittings', 'CL11024'),
(95, 'CL21095', 'Solar Power Systems', 'CL11024'),
(96, 'CL21096', 'Electrical Panels Boards, Breakers', 'CL11024'),
(97, 'CL21097', 'Generators', 'CL11024'),
(98, 'CL21098', 'Roller Doors, Gates & Auto Mated Doors', 'CL11024'),
(99, 'CL21099', 'Sofas', 'Furniture'),
(100, 'CL21100', 'Living Room Furniture', 'Furniture'),
(101, 'CL21101', 'Sofa', 'CL11025'),
(102, 'CL21102', 'Living Room Furniture', 'CL11025'),
(103, 'CL21103', 'Dining Room Furniture', 'CL11025'),
(104, 'CL21104', 'Office Furniture', 'CL11025'),
(105, 'CL21105', 'Specialized Furniture', 'CL11025'),
(106, 'CL21106', 'Bed Room Furniture', 'CL11025'),
(107, 'CL21107', 'Outdoor', 'CL11025'),
(108, 'CL21108', 'Kitchen', 'CL11025'),
(110, 'CL21110', 'Floor Tiles', 'CL11026'),
(111, 'CL21111', 'Wall Tiles', 'CL11026'),
(112, 'CL21112', 'Bathroom Fittings', 'CL11026'),
(113, 'CL21113', 'Plumbing Accessories, Pipes & Waste Removal', 'CL11026'),
(114, 'CL21114', 'Showers, Taps & Accessories', 'CL11026'),
(115, 'CL21115', 'Mirrors', 'CL11026'),
(116, 'CL21116', 'Roofing Tiles', 'CL11027'),
(117, 'CL21117', 'Roofing Sheets', 'CL11027'),
(118, 'CL21118', 'Sandwich Roofing Sheets', 'CL11027'),
(119, 'CL21119', 'Sandwich Roofing Sheets', 'CL11027'),
(120, 'CL21120', 'Sky Lights', 'CL11027'),
(121, 'CL21121', 'CCTV Suppliers', 'CL11028'),
(122, 'CL21122', 'Fire Protection Systems', 'CL11028'),
(123, 'CL21123', 'Home Security Systems', 'CL11028'),
(124, 'CL21124', 'PA Systems', 'CL11028'),
(125, 'CL21125', 'Network & Data Systems', 'CL11028'),
(126, 'CL21126', 'Accesses Control', 'CL11028'),
(127, 'CL21127', 'Blinds & Curtains', 'CL11029'),
(128, 'CL21128', 'Arts & Crafts', 'CL11029'),
(129, 'CL21129', 'Wall Papers', 'CL11029'),
(130, 'CL21130', 'Plywood, Partition & Cladding', 'CL11029'),
(131, 'CL21131', 'Home Improvement Products', 'CL11029'),
(132, 'CL21132', 'AC Unit Suppliers', 'CL11030'),
(133, 'CL21133', 'Chillers', 'CL11030'),
(134, 'CL21134', 'Boilers', 'CL11030'),
(135, 'CL21135', 'Lifts, Escalators & Hoists', 'CL11030'),
(136, 'CL21136', 'Fans, Exhaust Fans &  Air Extractors', 'CL11030'),
(137, 'CL21137', 'Sky Lights', 'CL11030'),
(138, 'CL21138', 'Pantry Cupboards', 'CL11031'),
(139, 'CL21139', 'Cooking Equipments ', 'CL11031'),
(140, 'CL21140', 'Kitchen Accessories', 'CL11031'),
(141, 'CL21141', 'Water Filter', 'CL11031'),
(142, 'CL21142', 'Furniture', 'CL11031'),
(143, 'CL21143', 'Heavy Construction Machinery Suppliers', 'CL11032'),
(144, 'CL21144', 'Construction Tool Suppliers', 'CL11032'),
(145, 'CL21145', 'Material Handling Equipments ', 'CL11032');

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
  `verify_code` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`client_id`, `first_name`, `last_name`, `company_name`, `email`, `profie_image`, `status`, `provider`, `provider_id`, `verified_email`, `verify_code`) VALUES
(66, 'Nirmal', 'Nanayakkara', '', 'nirmalnipunananayakkara@gmail.com', '1592118606prof.png', 1, 'F', '3184985174847762', 0, 0),
(67, 'Nipuna', 'Nanayakkara', '', 'nipunann0710@gmail.com', '1592233783prof.png', 1, 'G', '101780267759212434309', 0, 0),
(68, 'Imali', 'Gunawardana', '', 'imaligunawardana1995@gmail.com', '1592412727prof.png', 1, 'G', '106207594050682912858', 0, 0),
(76, 'Nishantha', 'Perera', '', 'nishanthaperera77@gmail.com', '', 1, 'E', '1596897751555', 0, 0),
(75, 'Mahesh', 'Fernando', '', 'maheshfdo90@gmail.com', '', 1, 'E', '1596694098300', 0, 0),
(77, 'Mithila', 'Samarasingha', '', 'mithila@gmail.com', '', 1, 'E', '1598932425341', 0, 0),
(84, 'Imali', 'Gunawardena', '', 'imali.gunawardena@gmail.com', '', 1, 'E', '1605383438032', 0, 0),
(85, 'Thilini', 'Perera', '', 'thilini.perera@gmail.com', '', 1, 'E', '1605501792378', 0, 0);

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
  `service_areas` mediumblob NOT NULL,
  `service_dist` mediumblob NOT NULL,
  `services` mediumblob NOT NULL,
  `total_reviews` int(11) NOT NULL DEFAULT 0,
  `rating` float NOT NULL,
  `company_profile` int(11) NOT NULL DEFAULT 1
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `client_company`
--

INSERT INTO `client_company` (`company_id`, `client_id`, `display_name`, `description`, `website`, `br_no`, `email`, `address_line1`, `address_line2`, `city`, `tel1`, `tel2`, `profie_image`, `cover_img`, `prof_category`, `verified_email`, `verify_code`, `steps`, `parent`, `all_island`, `service`, `service_areas`, `service_dist`, `services`, `total_reviews`, `rating`, `company_profile`) VALUES
(1, 66, 'UK Livings (Pvt) Ltd', '<p>Milind Pai - Architect &amp; Interior Designers was established in 1987. Since then we have evolved into a dedicated team of professionals committed to designing excellence and offering comprehensive service in Interior Designing and Project Consultation.</p><p>&nbsp;</p><p>&nbsp;In this firm the Architects &amp; the Interior Designers work in close collaboration with other experts including Engineers, Graphic Designers, Artists, Sculptures, Landscape Designers, Lighting &amp; Acoustic Specialists. We work on various verticals like Luxury Residential, Commercial, Boutique Retail, Institutional, Medical and Boutique Hospitality. Our well-trained design team undertakes professional designing job &amp; implement them in close co-ordination with various agencies engaged for the job. The site work is closely monitored by the site associates &amp; site supervisors designated for the particular site &amp; the total co-ordination job between the client &amp; the agencies is taken care of.&nbsp;</p><p>&nbsp;</p><p>Besides Mumbai we have executed projects in more than 30 Indian cities like Delhi, Surat, Pune, Bangalore, Nagpur, Indore, Hyderabad, Kolkatta, Guwahti, Pondicherry, Jodhpur, Bhubaneshwar, Raipur etc. and also International Cities like Dubai, Singapore and Muscat. Now we are also exploring more projects in the USA.</p>', 'https://oozmm.com', 'PV263644577', 'info@n3holdings.com', '275A Colombo Road  ', 'Kidagammulla', 'Gampaha', '033-2228887', '071-6378515', '1594828893blob.jpg', '1595390456blob.jpg', 1, 0, 0, 4, 0, 0, 0, 0x5b5d, 0x5b2234222c223130225d, 0x5b22434c3231303231222c22434c3231303134222c22434c3231303131225d, 6, 4, 1),
(7, 75, 'Mahesh Steel Decos', '', '', '', 'maheshsteel@gmail.com', '248 Negambo Road', '', 'Wattala', '01124456733', '', '1596706929blob.jpg', '', 1, 0, 0, 4, 0, 0, 0, 0x5b2231303837222c2231303938222c2231303939225d, 0x5b5d, 0x5b22434c3231303133225d, 1, 3, 1),
(3, 68, 'Test Holdings', '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod</p><p>tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p><p>quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo</p><p>consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse</p><p>cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non</p><p>proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>', '', '', 'nipunann07101@gmail.com', '275A Colombo Road, KIdagammulla', '', 'Gampaha', '0716378515', '', '', '', 1, 0, 0, 4, 0, 0, 0, 0x5b2231323233225d, '', '', 0, 0, 1),
(2, 67, 'JAT Living', '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>', '', '', 'info@jatliving.lk', '141 Danister De Silva Mw,', 'Orion City,', 'Colombo 09', '0112589963', '', '1595702942blob.jpg', '', 1, 0, 0, 4, 0, 0, 0, 0x5b2231303731222c2231303438222c2231303432225d, '', '', 3, 4.66667, 1),
(8, 76, 'Nishantha Constructions', '', '', 'PV58566101', 'info@nishconstructions.com', '89/4 Gampola Road', '', 'Peradeniya', '0812265786', '', '', '', 2, 0, 0, 4, 0, 0, 0, 0x5b5d, 0x5b223134222c223135222c223139222c223233225d, 0x5b22434c3231303130222c22434c3231303131225d, 0, 0, 1),
(17, 85, '', '', '', '', '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, '', '', '', 0, 0, -1),
(16, 84, 'Imali Gunawardena', '<p>I love creative architecture.</p>', '', '', 'imali.gunawardena@gmail.com', '233, Sinhagiri', 'Welikanna', 'Waga', '0362289002', '', '1605692538blob.jpg', '1605386181blob.jpg', 0, 0, 0, 2, 0, 0, 0, '', '', '', 0, 0, 0);

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
(1, 'EasyBuilding.lk', '', '<p>EasyBuilding.lk is the Premier House and Building Construction Web Portal which is designed to cater all your construction requirements! We aim at finding a Reputed, Reliable, and Trustworthy local construction related partners for you just within a click.</p><p>&nbsp;</p><p>Our website forms an ideal platform through which client can connect with our reputed service providers, apply for quotation requests, create your own Bill of Quantities (BOQ), view our best deals and rates for your services, while also standing a chance to grasp some of the useful construction tips provided by us! &nbsp;</p><p>&nbsp;</p>', '05/08/2020', '70, Diyawanna Gardens,\nPalawatta, Battaramulla,\nSri Lanka', '011 2785843', '077 7269108', 'info@easybuilding.lk', 'https://www.facebook.com/ConstructionEasyBuilding/', 'https://twitter.com/EasybuildingLk', 'https://www.youtube.com/channel/UCY5nKYQ-Uiq9Zg2UyGKtvxQ', 'https://www.linkedin.com/company/easybuilding-lk-pvt-ltd/');

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
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `project_id` int(11) NOT NULL,
  `project_name` varchar(100) NOT NULL,
  `project_description` varchar(1000) NOT NULL,
  `project_year` varchar(10) NOT NULL,
  `project_cost` varchar(100) NOT NULL,
  `project_address` varchar(500) NOT NULL,
  `company_id` int(11) NOT NULL,
  `services` mediumblob NOT NULL,
  `images` mediumblob NOT NULL,
  `architect` varchar(250) NOT NULL,
  `contractor` varchar(250) NOT NULL,
  `structural_engineer` varchar(250) NOT NULL,
  `primary_img` varchar(1000) NOT NULL,
  `total_imgs` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`project_id`, `project_name`, `project_description`, `project_year`, `project_cost`, `project_address`, `company_id`, `services`, `images`, `architect`, `contractor`, `structural_engineer`, `primary_img`, `total_imgs`) VALUES
(31, 'Katunayaka Airport Project', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat nonproident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2020', '10B', '', 2, '', 0x5b22313539353730323733327765625f4368616e67692d54342d53696e6761706f72652d332d48522d4372656469742d42656e6f792e6a7067222c22313539353730323733387765625f4368616e67692d54342d53696e6761706f72652d312d48522d4372656469742d42656e6f792e6a7067222c22313539353730323833377765625f4368616e67692d54342d53696e6761706f72652d382d48522d4372656469742d42656e6f792e6a7067222c22313539353730333335337765625f4368616e67692d54342d53696e6761706f72652d372d48522d4372656469742d42656e6f792e6a7067225d, '', '0', '0', '1595702732web_Changi-T4-Singapore-3-HR-Credit-Benoy.jpg', 4),
(30, 'Homagama Housing Project', 'Homagama Housing Project - The traditional beige two-story wood exterior home idea in Boston with a shingle roof uis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non.', '2020', '30M', '', 1, 0x5b22434c3231303131222c22434c3231303134225d, 0x5b22313539353730323133313232363231363138362e6a7067222c22313539353730323133314e6f726d616e746f6e2d4176656e75652d332d3136303078313036382e6a7067222c22313539353730323133316c616b652d686f7573652d696e2d6173636f6e612d62792d77657370692d64652d6d6575726f6e2d726f6d656f2d617263686974656374732d3035312e6a7067225d, 'Amal Fernando', 'R&D Constructions', 'Nirmal Perera', '1595702131226216186.jpg', 3);

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
(6, 30, 'CL21011'),
(7, 30, 'CL21014');

-- --------------------------------------------------------

--
-- Table structure for table `project_images`
--

CREATE TABLE `project_images` (
  `img_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `file_name` varchar(1000) NOT NULL,
  `description` varchar(1500) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `project_images`
--

INSERT INTO `project_images` (`img_id`, `project_id`, `file_name`, `description`) VALUES
(59, 31, '1595702837web_Changi-T4-Singapore-8-HR-Credit-Benoy.jpg', ''),
(58, 31, '1595702738web_Changi-T4-Singapore-1-HR-Credit-Benoy.jpg', ''),
(60, 31, '1595703353web_Changi-T4-Singapore-7-HR-Credit-Benoy.jpg', ''),
(56, 31, '1595702732web_Changi-T4-Singapore-3-HR-Credit-Benoy.jpg', ''),
(52, 30, '1595702131226216186.jpg', ''),
(53, 30, '1595702131Normanton-Avenue-3-1600x1068.jpg', ''),
(54, 30, '1595702131lake-house-in-ascona-by-wespi-de-meuron-romeo-architects-051.jpg', '');

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
(12, 66, 0, 'Murali Vijay', 'Looking to use an icon or symbol in place of text for some pagination links? Be sure to provide proper screen reader support with aria attributes.', 3, NULL);

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
(139, 'CL21011', 1),
(28, 'CL21011', 8),
(27, 'CL21010', 8),
(31, 'CL21018', 14),
(138, 'CL21014', 1),
(137, 'CL21021', 1);

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
(1, 1071, 2),
(2, 1048, 2),
(3, 1042, 2),
(150, 1099, 7),
(149, 1098, 7),
(148, 1087, 7),
(151, 1100, 14);

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
(55, 23, 8),
(54, 19, 8),
(53, 15, 8),
(52, 14, 8),
(82, 10, 1),
(81, 4, 1);

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
(9, 'manager@easybuilding.com', 0, '25d55ad283aa400af464c76d713c07ad', 3, '6SLYLQA7Z895UE2Y0YR88NX5A1HYSX3EOCTQPHTYUEFCU6YHMMNLUTJIWTS3T8Q099H2WQ4UKB1XW8.0914E2THJRJ.B7M5FTZ5I', 1),
(7, 'nipunann0710@gmail.com', 0, 'f6fdffe48c908deb0f4c3bd36c032e72', 2, '50WNHBUTVETA0C8JXR3GFWHD4F76A3HF7Q49.76AIGKOCLI43JCPS775OW8DOM344A46M2WBTOJ687TYDWK.4.XWTJK40SSIEETI', 1);

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
(49, 68, 'ya29.a0AfH6SMBOtHqXoOMrDPi0KQBpa_kH4zb_BblRmBGas0Mm2PyMhnB01FaSW-TBa8iijdnJRsRV8fu2ziBml-tHqYuimqr97-JbnUP6Miw2IlMWiDuxzW9Xx7hoKVy42DHHWLcgTMDskZHv7eCNo1xnMgq9-J2L-xV52Aom1A', ''),
(50, 69, 'EAAlrbREIkZCkBADIzYv4TSZC9sqnIwzMgKM7lYQCYFvlatZB53BcU6h61OWTfAiPZAZCGAC8MEwkmgLxZBYONS17uVUlYPSL7KFq7tU6i9hc0sggFdUPndHFrcZASazH1JfOtlyunu5tI6EZBGjE454ikaCEpsYM2ZBlmZCEhZAMRp31e2HmaFAZANf93yNZBgabg2rP5lFW4KddRp4Oac8PKgzy4', ''),
(51, 70, 'ya29.a0AfH6SMC5P51k_otbDQ2N-XPWyrg7JMJW7pfp_8sGW--8V7d0WhSAEvxK30wZPkmVQbS_eklU4mtNLwX-gcIdNG7b62QE59XIwCmubHoLJhQcqLMWH8VO4uXVYBRfa0pg2exfB3c1uYU-_YN_RGgVCu_E5CG1AwTAULpNUQ', ''),
(57, 76, '24FLddcRPGKrZC91596897750977', '123456789'),
(58, 77, 'sKj4LhVUde7wAal1598932425264', '123456789'),
(48, 67, 'ya29.A0AfH6SMCjYFOvRiTvo6OXw3RLeldStQfyJ3WkOBU3h2uNhp9arsShEyMMLyY056E2kK4uAO_3LpmDHunvN2abarytQlxzIBNwX_CoWZH9vZMrz0_RWnq7ea1b4jiVZsw35SyrThCHF--uB1mpVimXNRyi0sQwN4We4xR4ITaplyzABQ', ''),
(47, 66, 'EAAlrbREIkZCkBABltzZBfbgz0U2jamapnxTfbCPVAQhYXASdKZB0wZBik4RgbIvHgjkZCe5UZA6h3EcpoC1Mzlx0xtelcoaQKNkzwTaqevwuL3nZAUppkGToZCGdDU76XGTYkTF8xhna71mAWZAlbyL9yCforyyVd210LNpA8GNZAZBPkYAPgTw9gPkaHK8rWAYW4qnb7jsfuYxAWZCVDVwHeDPn', ''),
(46, 65, 'EAAlrbREIkZCkBAOHVjjUZCBewHTfKUnqDc56JFkG7bKHsi9GQhxZCrm9tUY4ZBYg76zZB2xZC99j22HoU0AGkPOJuW0IxZAVd4hI96l4oQtG4saG6STgGKiCZCtvhPO5kGsMZAJYkdwpnpeQqFThhDFZCiZB5QarXXswuA4tXLyTdYQ1G01EAv25mS0ZA1eYTSJu6P8m7N8l9zuypCpY4T2roZBs3', ''),
(59, 78, 'EAAlrbREIkZCkBAJNtFOvVAP1VGqwak3lphgAFWDScZBUbi1GbHwZCKDXyKxtjbxcDPeWoxqYquRGRd4Rvct7ejOpNsatyJRrPC9JZBEO0ooIjk9xljLvprIuQtwDE5EsU2sZAX52EmqS6fvQ5JIobqx6OILdkTe8nM53TrbXOmFPzNWe5x8POYA0V7onsTag3XDd55rE0bbGQ7IZBo7Ijr', ''),
(60, 79, 'EAAlrbREIkZCkBALAXr92TgW2ZCdE4sudVz8RYEeLEuokzRQndiYz1qTRG5XOlVqmNi9oF4brljOEuAqPd8ulbHY36OAZBZBkrEePJb3ULvxjjIelnVq7UPjYkUZAZBztB37QNC2CyxuhmDTKhpHNK0UaKeXTIbGGc31z1OZAk1ZCt6Hiw7VCgUoJTdJmhWRHsPaJMLWuutiPm78lP4j9bm9z', ''),
(61, 80, 'sG9JTIpESTNPCH91605337768371', '12345678'),
(62, 81, '12JeUFGFfk6a8RG1605355126371', '12345678'),
(63, 82, 'fMpBshqWlwPeeeJ1605380324080', '12345678'),
(64, 83, 'tqHhqcJy5wccBCv1605383015806', '12345678'),
(65, 84, 'TcKfRbL8VtJlJQN1605693525052', '123456789'),
(66, 85, 'NAvegHm9qKP8TTd1605501791505', '12345678');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `categories-level1`
--
ALTER TABLE `categories-level1`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `categories-level2`
--
ALTER TABLE `categories-level2`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;

--
-- AUTO_INCREMENT for table `cites`
--
ALTER TABLE `cites`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1279;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT for table `client_company`
--
ALTER TABLE `client_company`
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

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
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `project_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `project_category`
--
ALTER TABLE `project_category`
  MODIFY `project_cat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `project_images`
--
ALTER TABLE `project_images`
  MODIFY `img_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `services_list`
--
ALTER TABLE `services_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;

--
-- AUTO_INCREMENT for table `service_areas`
--
ALTER TABLE `service_areas`
  MODIFY `id` double NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;

--
-- AUTO_INCREMENT for table `service_districts`
--
ALTER TABLE `service_districts`
  MODIFY `id` float NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user_sessions`
--
ALTER TABLE `user_sessions`
  MODIFY `session_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
