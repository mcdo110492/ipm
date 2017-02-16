-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 16, 2017 at 02:53 PM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbipm2`
--

-- --------------------------------------------------------

--
-- Table structure for table `complaint`
--

CREATE TABLE `complaint` (
  `complaint_id` int(12) NOT NULL,
  `complaint_no` int(12) UNSIGNED ZEROFILL NOT NULL,
  `type_est_id` int(12) NOT NULL,
  `client_name` varchar(250) NOT NULL,
  `client_type` varchar(200) DEFAULT NULL,
  `contact_no` varchar(20) DEFAULT NULL,
  `details` varchar(250) NOT NULL,
  `location` varchar(250) NOT NULL,
  `complaint_date` date NOT NULL,
  `status` int(2) NOT NULL,
  `user_id` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `complaint`
--

INSERT INTO `complaint` (`complaint_id`, `complaint_no`, `type_est_id`, `client_name`, `client_type`, `contact_no`, `details`, `location`, `complaint_date`, `status`, `user_id`) VALUES
(9, 000000000001, 3, 'Sample Client 21', 'House Maid', '0942394024', 'Wala nakuha', 'Brgy Bata', '2017-02-04', 1, 0),
(10, 000000000002, 3, 'John Doe', 'House Owner of House 54', '09402934023', 'Basura wala nakuha', 'Carmella Homes', '2017-01-23', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `complaint_dispatcher`
--

CREATE TABLE `complaint_dispatcher` (
  `complaint_dispatcher_id` int(12) NOT NULL,
  `complaint_id` int(12) NOT NULL,
  `user_id` int(12) NOT NULL,
  `trip_ticket_id` int(12) NOT NULL,
  `dispatcher_status` int(12) NOT NULL,
  `dispatcher_remarks` varchar(250) DEFAULT NULL,
  `last_save` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `complaint_dispatcher`
--

INSERT INTO `complaint_dispatcher` (`complaint_dispatcher_id`, `complaint_id`, `user_id`, `trip_ticket_id`, `dispatcher_status`, `dispatcher_remarks`, `last_save`) VALUES
(6, 9, 1, 2, 1, NULL, '2017-02-14'),
(7, 10, 1, 1, 1, NULL, '2017-02-14');

-- --------------------------------------------------------

--
-- Table structure for table `complaint_it`
--

CREATE TABLE `complaint_it` (
  `complaint_it_id` int(12) NOT NULL,
  `complaint_id` int(12) NOT NULL,
  `user_id` int(12) NOT NULL,
  `geofence_id` int(12) DEFAULT NULL,
  `it_status` int(12) NOT NULL,
  `it_remarks` int(12) DEFAULT NULL,
  `last_save` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `complaint_it`
--

INSERT INTO `complaint_it` (`complaint_it_id`, `complaint_id`, `user_id`, `geofence_id`, `it_status`, `it_remarks`, `last_save`) VALUES
(6, 9, 1, 10, 1, NULL, '2017-02-14'),
(7, 10, 1, 5, 1, NULL, '2017-02-13');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `department_id` int(12) NOT NULL,
  `department_name` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`department_id`, `department_name`) VALUES
(2071, 'Bacolod Waste');

-- --------------------------------------------------------

--
-- Table structure for table `driver`
--

CREATE TABLE `driver` (
  `driver_id` int(12) NOT NULL,
  `employee_id` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `driver`
--

INSERT INTO `driver` (`driver_id`, `employee_id`) VALUES
(1, 6),
(2, 7);

-- --------------------------------------------------------

--
-- Table structure for table `driver_equipment`
--

CREATE TABLE `driver_equipment` (
  `driver_equipment_id` int(11) NOT NULL,
  `equipment_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `driver_equipment`
--

INSERT INTO `driver_equipment` (`driver_equipment_id`, `equipment_id`, `employee_id`) VALUES
(1, 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `driver_paleros`
--

CREATE TABLE `driver_paleros` (
  `driver_paleros_id` int(12) NOT NULL,
  `driver_id` int(12) NOT NULL,
  `employee_id` int(12) NOT NULL,
  `paleros_status` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `driver_paleros`
--

INSERT INTO `driver_paleros` (`driver_paleros_id`, `driver_id`, `employee_id`, `paleros_status`) VALUES
(1, 1, 8, 1),
(2, 1, 9, 0),
(3, 2, 10, 1),
(6, 1, 11, 1);

-- --------------------------------------------------------

--
-- Table structure for table `employee_address_contact`
--

CREATE TABLE `employee_address_contact` (
  `employee_contact_id` int(12) NOT NULL,
  `employee_id` int(12) NOT NULL,
  `present_address` varchar(250) DEFAULT NULL,
  `provincial_address` varchar(250) DEFAULT NULL,
  `tel_no` varchar(200) DEFAULT NULL,
  `cel_no` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee_address_contact`
--

INSERT INTO `employee_address_contact` (`employee_contact_id`, `employee_id`, `present_address`, `provincial_address`, `tel_no`, `cel_no`) VALUES
(1, 3, 'Blk. 45 Lot 4 East Homes 2 Subd. Brgy. Estefania, Bacolod City', 'Blk. 45 Lot 4 East Homes 2 Subd. Brgy. Estefania, Bacolod City', '111', '09152337038'),
(2, 4, NULL, NULL, NULL, NULL),
(3, 5, NULL, NULL, NULL, NULL),
(4, 6, NULL, NULL, NULL, NULL),
(5, 7, NULL, NULL, NULL, NULL),
(6, 8, NULL, NULL, NULL, NULL),
(7, 9, NULL, NULL, NULL, NULL),
(8, 10, NULL, NULL, NULL, NULL),
(9, 11, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `employee_club`
--

CREATE TABLE `employee_club` (
  `employee_club_id` int(12) NOT NULL,
  `employee_id` int(12) NOT NULL,
  `club_name` varchar(250) DEFAULT NULL,
  `club_position` varchar(250) DEFAULT NULL,
  `club_membership` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee_club`
--

INSERT INTO `employee_club` (`employee_club_id`, `employee_id`, `club_name`, `club_position`, `club_membership`) VALUES
(1, 3, 'club name123', 'position123', 'membership123'),
(2, 3, 'club 21', 'position 21', 'membership 21');

-- --------------------------------------------------------

--
-- Table structure for table `employee_education`
--

CREATE TABLE `employee_education` (
  `employee_education_id` int(12) NOT NULL,
  `school_name` varchar(250) DEFAULT NULL,
  `school_year` varchar(20) DEFAULT NULL,
  `school_address` varchar(200) DEFAULT NULL,
  `degree` varchar(250) DEFAULT NULL,
  `honors_awards` varchar(250) DEFAULT NULL,
  `major` varchar(250) DEFAULT NULL,
  `minor` varchar(250) DEFAULT NULL,
  `employee_id` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee_education`
--

INSERT INTO `employee_education` (`employee_education_id`, `school_name`, `school_year`, `school_address`, `degree`, `honors_awards`, `major`, `minor`, `employee_id`) VALUES
(1, 'CSA-B', '2011-2016', 'B.S Aquino Drive, Bacolod City', 'BSIT', '', '', '', 3);

-- --------------------------------------------------------

--
-- Table structure for table `employee_employment_status`
--

CREATE TABLE `employee_employment_status` (
  `employment_status_id` int(12) NOT NULL,
  `employee_id` int(12) NOT NULL,
  `department_id` int(12) NOT NULL,
  `position_id` int(11) NOT NULL,
  `date_employed` date DEFAULT NULL,
  `date_retired` date DEFAULT NULL,
  `salary` varchar(250) DEFAULT NULL,
  `status_id` int(12) NOT NULL,
  `employee_status_type_id` int(12) NOT NULL,
  `remarks` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee_employment_status`
--

INSERT INTO `employee_employment_status` (`employment_status_id`, `employee_id`, `department_id`, `position_id`, `date_employed`, `date_retired`, `salary`, `status_id`, `employee_status_type_id`, `remarks`) VALUES
(1, 3, 2071, 3, '2016-09-26', '2016-12-31', '15000', 2, 1, 'Remarks'),
(2, 4, 2071, 14, '2016-12-15', NULL, NULL, 1, 1, NULL),
(3, 5, 2071, 3, '2017-01-06', NULL, NULL, 1, 1, NULL),
(4, 6, 2071, 16, '2017-02-15', NULL, NULL, 1, 1, NULL),
(5, 7, 2071, 16, '2017-02-15', NULL, NULL, 1, 1, NULL),
(6, 8, 2071, 17, '2017-02-15', NULL, NULL, 1, 1, NULL),
(7, 9, 2071, 17, '2017-02-15', NULL, NULL, 4, 1, NULL),
(8, 10, 2071, 17, '2017-02-15', NULL, NULL, 4, 1, NULL),
(9, 11, 2071, 17, '2017-02-15', NULL, NULL, 4, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `employee_equipmet`
--

CREATE TABLE `employee_equipmet` (
  `employee_equipment_id` int(12) NOT NULL,
  `employee_id` int(12) NOT NULL,
  `equipment_id` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `employee_family`
--

CREATE TABLE `employee_family` (
  `employee_family_id` int(12) NOT NULL,
  `employee_id` int(12) NOT NULL,
  `spouse_name` varchar(250) DEFAULT NULL,
  `spouse_occupation` varchar(250) DEFAULT NULL,
  `spouse_address` varchar(250) DEFAULT NULL,
  `father_name` varchar(250) DEFAULT NULL,
  `father_age` varchar(20) DEFAULT NULL,
  `father_occupation` varchar(250) DEFAULT NULL,
  `father_address` varchar(250) DEFAULT NULL,
  `mother_name` varchar(250) DEFAULT NULL,
  `mother_occupation` varchar(250) DEFAULT NULL,
  `mother_address` varchar(250) DEFAULT NULL,
  `mother_age` varchar(20) DEFAULT NULL,
  `childrens` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee_family`
--

INSERT INTO `employee_family` (`employee_family_id`, `employee_id`, `spouse_name`, `spouse_occupation`, `spouse_address`, `father_name`, `father_age`, `father_occupation`, `father_address`, `mother_name`, `mother_occupation`, `mother_address`, `mother_age`, `childrens`) VALUES
(1, 3, 'Spouse', 'Occupation', 'Address', 'Father', NULL, 'Occupation', 'Address', 'Mother', 'Occupation', 'Address', NULL, 'Children1, Children2'),
(2, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, 11, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `employee_government_issued_number`
--

CREATE TABLE `employee_government_issued_number` (
  `govt_issued_id` int(12) NOT NULL,
  `sss` varchar(20) DEFAULT NULL,
  `pag_ibig` varchar(20) DEFAULT NULL,
  `tin` varchar(20) DEFAULT NULL,
  `philhealth` varchar(20) DEFAULT NULL,
  `employee_id` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee_government_issued_number`
--

INSERT INTO `employee_government_issued_number` (`govt_issued_id`, `sss`, `pag_ibig`, `tin`, `philhealth`, `employee_id`) VALUES
(1, '07-1718054-3', '1210-0849-6638', '932-640-650', '19-089497247-9', 3),
(2, NULL, NULL, NULL, NULL, 4),
(3, NULL, NULL, NULL, NULL, 5),
(4, NULL, NULL, NULL, NULL, 6),
(5, NULL, NULL, NULL, NULL, 7),
(6, NULL, NULL, NULL, NULL, 8),
(7, NULL, NULL, NULL, NULL, 9),
(8, NULL, NULL, NULL, NULL, 10),
(9, NULL, NULL, NULL, NULL, 11);

-- --------------------------------------------------------

--
-- Table structure for table `employee_information`
--

CREATE TABLE `employee_information` (
  `employee_id` int(12) NOT NULL,
  `employee_no` varchar(20) NOT NULL,
  `firstname` varchar(250) NOT NULL,
  `middlename` varchar(250) NOT NULL,
  `lastname` varchar(250) NOT NULL,
  `nickname` varchar(250) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `pob` varchar(250) DEFAULT NULL,
  `height` varchar(20) DEFAULT NULL,
  `weight` varchar(20) DEFAULT NULL,
  `distinguishing_mark` varchar(250) DEFAULT NULL,
  `blood` varchar(10) DEFAULT NULL,
  `civil_status` varchar(250) DEFAULT NULL,
  `religion` int(250) DEFAULT NULL,
  `signature` varchar(250) DEFAULT NULL,
  `status` int(12) DEFAULT NULL,
  `citizenship` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee_information`
--

INSERT INTO `employee_information` (`employee_id`, `employee_no`, `firstname`, `middlename`, `lastname`, `nickname`, `dob`, `pob`, `height`, `weight`, `distinguishing_mark`, `blood`, `civil_status`, `religion`, `signature`, `status`, `citizenship`) VALUES
(3, '14767', 'DARREL JAY', 'UY', 'ABIOL', NULL, '1976-11-18', 'Bacolod City', NULL, NULL, NULL, NULL, 'Single', NULL, NULL, 0, 'Filipino'),
(4, '731293', 'Mc Donald', 'Ramirez', 'Fuentebella', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL),
(5, 'mm-9111', 'mark', 't', 'mendoza', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL),
(6, 'dd-11321', 'John', 'Michael', 'Doe', NULL, '1970-01-01', 'BACOLOD CITY', NULL, NULL, NULL, NULL, 'NEGROS OCCIDENTAL', NULL, NULL, NULL, 'Philippines'),
(7, 'dd-1321', 'Lorem', 'Ipsum', 'Dolor', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'pp-123123', 'Edrey', 'A', 'Adorias', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, 'pp-312312', 'Christopher', 'John', 'Johnson', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 'pp-13123', 'Aaron', 'Garcia', 'Smith', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 'p-31231', 'Baiker', 'Cook', 'Reed', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `employee_license`
--

CREATE TABLE `employee_license` (
  `employee_license_id` int(12) NOT NULL,
  `license_no` varchar(50) NOT NULL,
  `license_type` varchar(250) DEFAULT NULL,
  `date_issued` date DEFAULT NULL,
  `date_expired` date DEFAULT NULL,
  `license_file` varchar(250) DEFAULT NULL,
  `employee_id` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee_license`
--

INSERT INTO `employee_license` (`employee_license_id`, `license_no`, `license_type`, `date_issued`, `date_expired`, `license_file`, `employee_id`) VALUES
(1, '113198744', 'Driver''s License', '2016-12-05', '2019-05-22', NULL, 3),
(3, '3123123', 'Driver''s License', '2017-01-22', '2017-01-22', NULL, 3);

-- --------------------------------------------------------

--
-- Table structure for table `employee_nte`
--

CREATE TABLE `employee_nte` (
  `employee_nte_id` int(12) NOT NULL,
  `employee_violation_id` int(12) NOT NULL,
  `file` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee_nte`
--

INSERT INTO `employee_nte` (`employee_nte_id`, `employee_violation_id`, `file`) VALUES
(4, 8, '84a060c8989b334a6c78b1046d7e156e.jpg'),
(5, 9, 'bc49521d52b3342930b3130fd6f82ba3.jpg'),
(6, 10, '94c5a226fcbff93bcaf3bc466798cbf0.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `employee_status_type`
--

CREATE TABLE `employee_status_type` (
  `employee_status_type_id` int(12) NOT NULL,
  `type` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee_status_type`
--

INSERT INTO `employee_status_type` (`employee_status_type_id`, `type`) VALUES
(1, 'Active'),
(2, 'Inactive');

-- --------------------------------------------------------

--
-- Table structure for table `employee_training_seminar`
--

CREATE TABLE `employee_training_seminar` (
  `employee_trainings_id` int(12) NOT NULL,
  `employee_id` int(12) NOT NULL,
  `training_title` varchar(250) DEFAULT NULL,
  `training_nature` varchar(250) DEFAULT NULL,
  `training_period` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee_training_seminar`
--

INSERT INTO `employee_training_seminar` (`employee_trainings_id`, `employee_id`, `training_title`, `training_nature`, `training_period`) VALUES
(1, 3, 'training title12', 'training nature12', '2014-2016'),
(2, 3, 'training title 2', 'nature 2', '2016-2017');

-- --------------------------------------------------------

--
-- Table structure for table `employee_violation`
--

CREATE TABLE `employee_violation` (
  `employee_violation_id` int(12) NOT NULL,
  `employee_id` int(12) NOT NULL,
  `violation_id` int(12) NOT NULL,
  `date_committed` date DEFAULT NULL,
  `remarks` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee_violation`
--

INSERT INTO `employee_violation` (`employee_violation_id`, `employee_id`, `violation_id`, `date_committed`, `remarks`) VALUES
(8, 3, 1, '2016-12-13', 'Leaving1'),
(9, 3, 2, '2016-12-08', '180kph'),
(10, 3, 6, '2016-12-15', '');

-- --------------------------------------------------------

--
-- Table structure for table `employment_status`
--

CREATE TABLE `employment_status` (
  `status_id` int(12) NOT NULL,
  `status_type` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employment_status`
--

INSERT INTO `employment_status` (`status_id`, `status_type`) VALUES
(1, 'Local Hired Project Employment Contract'),
(2, 'Manila Hired'),
(4, 'Contractual'),
(5, 'Full Time');

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE `equipment` (
  `equipment_id` int(12) NOT NULL,
  `equipment_code` varchar(50) DEFAULT NULL,
  `equipment_name` varchar(250) DEFAULT NULL,
  `equipment_model` varchar(250) DEFAULT NULL,
  `equipment_capacity` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `equipment`
--

INSERT INTO `equipment` (`equipment_id`, `equipment_code`, `equipment_name`, `equipment_model`, `equipment_capacity`) VALUES
(1, 'Code1', 'T1', 'Truck', '200'),
(2, 'Code2', 'T2', 'Truck', '200');

-- --------------------------------------------------------

--
-- Table structure for table `gadget`
--

CREATE TABLE `gadget` (
  `gadget_id` int(12) NOT NULL,
  `gadget_code` varchar(50) DEFAULT NULL,
  `gadget_name` varchar(250) DEFAULT NULL,
  `gadget_model` varchar(250) DEFAULT NULL,
  `gadget_type` varchar(250) DEFAULT NULL,
  `gadget_status` int(12) DEFAULT NULL,
  `remarks` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gadget`
--

INSERT INTO `gadget` (`gadget_id`, `gadget_code`, `gadget_name`, `gadget_model`, `gadget_type`, `gadget_status`, `remarks`) VALUES
(1, 'DQGM3UCGDTWF', 'IPHONE 5', 'ND298ZP/A', 'SMART PHONE', 2, 'Disposed'),
(2, 'SCYHL7LVHUU8KRJN', 'HUAWEI', 'G730-U10', 'SMART PHONE', 1, NULL),
(3, 'RF1FB0JTFGZ', 'GALAXY CORE 2', 'SM-G355H', 'SMART PHONE', 1, NULL),
(4, 'KKDO213KKD', 'POWER BANK 2500MAH', 'GKKS-2313', 'POWER BANK', 1, NULL),
(5, 'KDJAKSJD2312', 'TOSHIBA 2500MAH', 'KDSA-3133', 'POWER BANK', 1, NULL),
(6, 'JDAKD31233', 'GTS50', 'GSDA-3213', 'SMART PHONE', 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `geofence`
--

CREATE TABLE `geofence` (
  `geofence_id` int(12) NOT NULL,
  `route_code` int(12) UNSIGNED ZEROFILL NOT NULL,
  `brgy` varchar(200) DEFAULT NULL,
  `location` varchar(200) DEFAULT NULL,
  `sector` varchar(200) DEFAULT NULL,
  `route_file` varchar(200) DEFAULT NULL,
  `status` int(2) DEFAULT NULL,
  `route_file_name` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `geofence`
--

INSERT INTO `geofence` (`geofence_id`, `route_code`, `brgy`, `location`, `sector`, `route_file`, `status`, `route_file_name`) VALUES
(4, 000000000001, 'sample', 'sample', 'sector 1', '42baf81485ff71b25faf99333d3b5aac.jpg', 2, 'route1'),
(5, 000000000002, 'Brgy. Tangub', 'Subdivision', 'sector 2', 'be1291b9c7ff5d6de71b1ab6d8b45a47.jpg', 1, 'route 2'),
(6, 000000000003, 'Brgy. bata', 'Subdivision 2', 'sector 3', 'f1755be585aeff49e6a0f8686f4efbf8.jpg', 1, 'route3'),
(10, 000000000007, 'Brgy. Tangub1', 'Subdivision1', 'sector 11', '10c903c60650e3954a91ff7b04122d77.jpg', 1, 'route22'),
(11, 000000000011, 'Sample Brgy 3', 'Subdivision23', 'Sector 22', '52d7ec8f8cd50be0e3bdded596df00e4.jpg', 1, 'route23');

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `item_id` int(12) NOT NULL,
  `item_code` varchar(50) DEFAULT NULL,
  `item_name` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`item_id`, `item_code`, `item_name`) VALUES
(4, 'item1', 'Pala');

-- --------------------------------------------------------

--
-- Table structure for table `lunch_box`
--

CREATE TABLE `lunch_box` (
  `lunch_box_id` int(12) NOT NULL,
  `lunch_box_code` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lunch_box`
--

INSERT INTO `lunch_box` (`lunch_box_id`, `lunch_box_code`) VALUES
(1, 'LUNCHBOX1'),
(2, 'LUNCHBOX2');

-- --------------------------------------------------------

--
-- Table structure for table `lunch_box_gadget`
--

CREATE TABLE `lunch_box_gadget` (
  `lunch_box_gadget_id` int(12) NOT NULL,
  `lunch_box_id` int(12) NOT NULL,
  `gadget_id` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lunch_box_gadget`
--

INSERT INTO `lunch_box_gadget` (`lunch_box_gadget_id`, `lunch_box_id`, `gadget_id`) VALUES
(1, 1, 1),
(2, 1, 5),
(3, 1, 6),
(4, 2, 2),
(5, 2, 3),
(6, 2, 4),
(7, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `position`
--

CREATE TABLE `position` (
  `position_id` int(12) NOT NULL,
  `position_name` varchar(250) DEFAULT NULL,
  `department_id` int(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `position`
--

INSERT INTO `position` (`position_id`, `position_name`, `department_id`) VALUES
(3, 'Project Supervisor', 2071),
(4, 'Operations Supervisor', 2071),
(5, 'HR Supervisor', 2071),
(6, 'HR Assistant', 2071),
(7, 'Nurse', 2071),
(8, 'Accountant', 2071),
(9, 'Operations Clerk', 2071),
(10, 'Operations Admin', 2071),
(11, 'Encoder', 2071),
(12, 'Dispatcher', 2071),
(13, 'Monitoring', 2071),
(14, 'IT', 2071),
(15, 'CSR', 2071),
(16, 'Driver', 2071),
(17, 'Paleros', 2071);

-- --------------------------------------------------------

--
-- Table structure for table `shift`
--

CREATE TABLE `shift` (
  `shift_id` int(12) NOT NULL,
  `shift_name` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `shift`
--

INSERT INTO `shift` (`shift_id`, `shift_name`) VALUES
(1, 'Shift 1'),
(2, 'Shift 2');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `supplier_id` int(11) NOT NULL,
  `supplier_name` varchar(250) DEFAULT NULL,
  `supplier_address` varchar(250) DEFAULT NULL,
  `supplier_contact` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `trip_ticket`
--

CREATE TABLE `trip_ticket` (
  `trip_ticket_id` int(12) NOT NULL,
  `trip_ticket_code` varchar(20) NOT NULL,
  `dispatch_time` varchar(20) NOT NULL,
  `dispatch_date` date NOT NULL,
  `shift_id` int(12) NOT NULL,
  `equipment_id` int(12) NOT NULL,
  `lunch_box_id` int(12) NOT NULL,
  `geofence_id` int(12) NOT NULL,
  `employee_id` int(12) NOT NULL,
  `user_id` int(12) NOT NULL,
  `status` int(12) NOT NULL,
  `remarks` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `trip_ticket`
--

INSERT INTO `trip_ticket` (`trip_ticket_id`, `trip_ticket_code`, `dispatch_time`, `dispatch_date`, `shift_id`, `equipment_id`, `lunch_box_id`, `geofence_id`, `employee_id`, `user_id`, `status`, `remarks`) VALUES
(1, '0001231231', '1:30-3:30', '2017-02-02', 1, 1, 1, 4, 3, 1, 0, NULL),
(2, '843849234', '1:30-3:30 PM', '2017-02-14', 2, 2, 1, 6, 3, 1, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `trip_ticket_item`
--

CREATE TABLE `trip_ticket_item` (
  `trip_ticket_item_id` int(12) NOT NULL,
  `item_id` int(12) NOT NULL,
  `trip_ticket_id` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `trip_ticket_paleros`
--

CREATE TABLE `trip_ticket_paleros` (
  `trip_ticket_paleros_id` int(12) NOT NULL,
  `employee_id` int(12) NOT NULL,
  `trip_ticket_id` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `type_establishment`
--

CREATE TABLE `type_establishment` (
  `type_est_id` int(12) NOT NULL,
  `type_est_name` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `type_establishment`
--

INSERT INTO `type_establishment` (`type_est_id`, `type_est_name`) VALUES
(3, 'subdivisions/brgy'),
(4, 'supermarket'),
(5, 'xyz hospital');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(12) NOT NULL,
  `username` varchar(250) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL,
  `profile_name` varchar(200) DEFAULT NULL,
  `role` int(12) DEFAULT NULL,
  `status` int(12) DEFAULT NULL,
  `image` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `password`, `profile_name`, `role`, `status`, `image`) VALUES
(1, 'admin', '$2y$10$ZylsS/0DIAtPjr8fnLL/kOZT.SYFd5u1gnCKjtLt1T4VLEx/TXiyG', 'Mr. Admin', 1, 1, NULL),
(2, 'hradmin', '$2y$10$KamLmUUzqbJM0r/VHKFPeuwEARy9JIcIBPhnG9e7gdVdP.4Co9Icm', 'HR ADMIN', 2, 1, NULL),
(3, 'hrmonitoring', '$2y$10$zZAxjKYnB.QX0FH.KQp1IOs2KQsqwlPE0Nr6yU5zo4TVn219osPEe', 'HR MONITORING', 3, 1, NULL),
(4, 'itpersonnel', '$2y$10$OS3Xv14rQf4POr4j3Yeh/ORPduQdBxDKUd05dhulAFimLyA238.W.', 'IT PERSONNEL', 4, 1, NULL),
(5, 'dispatching', '$2y$10$JrCJYxiWNsyHQGdXJhzLc.ayepVHIu8IU.8zs9fQSUE5AiRVZ6Ecy', 'Dispatching', 5, 1, NULL),
(6, 'warehouse', '$2y$10$/RJbCGXogfimPazLLwzvC.kzYIuG0W06PEg.tgfxIPbjYSYY/ZOLO', 'Warehouse', 6, 1, NULL),
(7, 'csr', '$2y$10$b7HXhn7h5H.2NgEsZ9eezuelpW901Botdv115AIxzMotcbVlHJtyi', 'CSR', 7, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `violation`
--

CREATE TABLE `violation` (
  `violation_id` int(12) NOT NULL,
  `violation_type` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `violation`
--

INSERT INTO `violation` (`violation_id`, `violation_type`) VALUES
(1, 'AWOL'),
(2, 'Over Speeding'),
(3, 'Out of Route'),
(4, 'Parking/Idling for 2 Hours'),
(5, 'Tardiness'),
(6, 'Absent');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `complaint`
--
ALTER TABLE `complaint`
  ADD PRIMARY KEY (`complaint_id`),
  ADD KEY `type_est_id` (`type_est_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `complaint_dispatcher`
--
ALTER TABLE `complaint_dispatcher`
  ADD PRIMARY KEY (`complaint_dispatcher_id`),
  ADD KEY `complaint_id` (`complaint_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `trip_ticket_id` (`trip_ticket_id`);

--
-- Indexes for table `complaint_it`
--
ALTER TABLE `complaint_it`
  ADD PRIMARY KEY (`complaint_it_id`),
  ADD KEY `complaint_id` (`complaint_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`department_id`);

--
-- Indexes for table `driver`
--
ALTER TABLE `driver`
  ADD PRIMARY KEY (`driver_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `driver_equipment`
--
ALTER TABLE `driver_equipment`
  ADD PRIMARY KEY (`driver_equipment_id`);

--
-- Indexes for table `driver_paleros`
--
ALTER TABLE `driver_paleros`
  ADD PRIMARY KEY (`driver_paleros_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `driver_id` (`driver_id`);

--
-- Indexes for table `employee_address_contact`
--
ALTER TABLE `employee_address_contact`
  ADD PRIMARY KEY (`employee_contact_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `employee_club`
--
ALTER TABLE `employee_club`
  ADD PRIMARY KEY (`employee_club_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `employee_education`
--
ALTER TABLE `employee_education`
  ADD PRIMARY KEY (`employee_education_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `employee_employment_status`
--
ALTER TABLE `employee_employment_status`
  ADD PRIMARY KEY (`employment_status_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `department_id` (`department_id`),
  ADD KEY `postion_id` (`position_id`),
  ADD KEY `status_id` (`status_id`),
  ADD KEY `employee_status_type_id` (`employee_status_type_id`);

--
-- Indexes for table `employee_equipmet`
--
ALTER TABLE `employee_equipmet`
  ADD PRIMARY KEY (`employee_equipment_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `equipment_id` (`equipment_id`);

--
-- Indexes for table `employee_family`
--
ALTER TABLE `employee_family`
  ADD PRIMARY KEY (`employee_family_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `employee_government_issued_number`
--
ALTER TABLE `employee_government_issued_number`
  ADD PRIMARY KEY (`govt_issued_id`,`employee_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `FKemployee_g997006` (`employee_id`);

--
-- Indexes for table `employee_information`
--
ALTER TABLE `employee_information`
  ADD PRIMARY KEY (`employee_id`),
  ADD UNIQUE KEY `employee_no` (`employee_no`),
  ADD KEY `status` (`status`);

--
-- Indexes for table `employee_license`
--
ALTER TABLE `employee_license`
  ADD PRIMARY KEY (`employee_license_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `employee_nte`
--
ALTER TABLE `employee_nte`
  ADD PRIMARY KEY (`employee_nte_id`),
  ADD KEY `employee_violation_id` (`employee_violation_id`);

--
-- Indexes for table `employee_status_type`
--
ALTER TABLE `employee_status_type`
  ADD PRIMARY KEY (`employee_status_type_id`);

--
-- Indexes for table `employee_training_seminar`
--
ALTER TABLE `employee_training_seminar`
  ADD PRIMARY KEY (`employee_trainings_id`,`employee_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `FKemployee_t895154` (`employee_id`);

--
-- Indexes for table `employee_violation`
--
ALTER TABLE `employee_violation`
  ADD PRIMARY KEY (`employee_violation_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `violation_id` (`violation_id`);

--
-- Indexes for table `employment_status`
--
ALTER TABLE `employment_status`
  ADD PRIMARY KEY (`status_id`);

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`equipment_id`);

--
-- Indexes for table `gadget`
--
ALTER TABLE `gadget`
  ADD PRIMARY KEY (`gadget_id`);

--
-- Indexes for table `geofence`
--
ALTER TABLE `geofence`
  ADD PRIMARY KEY (`geofence_id`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `lunch_box`
--
ALTER TABLE `lunch_box`
  ADD PRIMARY KEY (`lunch_box_id`),
  ADD UNIQUE KEY `lunch_box_code` (`lunch_box_code`);

--
-- Indexes for table `lunch_box_gadget`
--
ALTER TABLE `lunch_box_gadget`
  ADD PRIMARY KEY (`lunch_box_gadget_id`),
  ADD KEY `lunch_box_id` (`lunch_box_id`),
  ADD KEY `gadget_id` (`gadget_id`);

--
-- Indexes for table `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`position_id`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `shift`
--
ALTER TABLE `shift`
  ADD PRIMARY KEY (`shift_id`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`supplier_id`);

--
-- Indexes for table `trip_ticket`
--
ALTER TABLE `trip_ticket`
  ADD PRIMARY KEY (`trip_ticket_id`),
  ADD UNIQUE KEY `trip_ticket_code` (`trip_ticket_code`),
  ADD KEY `shift_id` (`shift_id`),
  ADD KEY `equipment_id` (`equipment_id`),
  ADD KEY `lunch_box_id` (`lunch_box_id`),
  ADD KEY `geofence_id` (`geofence_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `trip_ticket_item`
--
ALTER TABLE `trip_ticket_item`
  ADD PRIMARY KEY (`trip_ticket_item_id`),
  ADD KEY `item_id` (`item_id`),
  ADD KEY `trip_ticket_id` (`trip_ticket_id`);

--
-- Indexes for table `trip_ticket_paleros`
--
ALTER TABLE `trip_ticket_paleros`
  ADD PRIMARY KEY (`trip_ticket_paleros_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `trip_ticket_id` (`trip_ticket_id`);

--
-- Indexes for table `type_establishment`
--
ALTER TABLE `type_establishment`
  ADD PRIMARY KEY (`type_est_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `violation`
--
ALTER TABLE `violation`
  ADD PRIMARY KEY (`violation_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `complaint`
--
ALTER TABLE `complaint`
  MODIFY `complaint_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `complaint_dispatcher`
--
ALTER TABLE `complaint_dispatcher`
  MODIFY `complaint_dispatcher_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `complaint_it`
--
ALTER TABLE `complaint_it`
  MODIFY `complaint_it_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `department_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2072;
--
-- AUTO_INCREMENT for table `driver`
--
ALTER TABLE `driver`
  MODIFY `driver_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `driver_equipment`
--
ALTER TABLE `driver_equipment`
  MODIFY `driver_equipment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `driver_paleros`
--
ALTER TABLE `driver_paleros`
  MODIFY `driver_paleros_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `employee_address_contact`
--
ALTER TABLE `employee_address_contact`
  MODIFY `employee_contact_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `employee_club`
--
ALTER TABLE `employee_club`
  MODIFY `employee_club_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `employee_education`
--
ALTER TABLE `employee_education`
  MODIFY `employee_education_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `employee_employment_status`
--
ALTER TABLE `employee_employment_status`
  MODIFY `employment_status_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `employee_equipmet`
--
ALTER TABLE `employee_equipmet`
  MODIFY `employee_equipment_id` int(12) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `employee_family`
--
ALTER TABLE `employee_family`
  MODIFY `employee_family_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `employee_government_issued_number`
--
ALTER TABLE `employee_government_issued_number`
  MODIFY `govt_issued_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `employee_information`
--
ALTER TABLE `employee_information`
  MODIFY `employee_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `employee_license`
--
ALTER TABLE `employee_license`
  MODIFY `employee_license_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `employee_nte`
--
ALTER TABLE `employee_nte`
  MODIFY `employee_nte_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `employee_status_type`
--
ALTER TABLE `employee_status_type`
  MODIFY `employee_status_type_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `employee_training_seminar`
--
ALTER TABLE `employee_training_seminar`
  MODIFY `employee_trainings_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `employee_violation`
--
ALTER TABLE `employee_violation`
  MODIFY `employee_violation_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `employment_status`
--
ALTER TABLE `employment_status`
  MODIFY `status_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `equipment_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `gadget`
--
ALTER TABLE `gadget`
  MODIFY `gadget_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `geofence`
--
ALTER TABLE `geofence`
  MODIFY `geofence_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `item_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `lunch_box`
--
ALTER TABLE `lunch_box`
  MODIFY `lunch_box_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `lunch_box_gadget`
--
ALTER TABLE `lunch_box_gadget`
  MODIFY `lunch_box_gadget_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `position`
--
ALTER TABLE `position`
  MODIFY `position_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `shift`
--
ALTER TABLE `shift`
  MODIFY `shift_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `supplier_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `trip_ticket`
--
ALTER TABLE `trip_ticket`
  MODIFY `trip_ticket_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `trip_ticket_item`
--
ALTER TABLE `trip_ticket_item`
  MODIFY `trip_ticket_item_id` int(12) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `trip_ticket_paleros`
--
ALTER TABLE `trip_ticket_paleros`
  MODIFY `trip_ticket_paleros_id` int(12) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `type_establishment`
--
ALTER TABLE `type_establishment`
  MODIFY `type_est_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `violation`
--
ALTER TABLE `violation`
  MODIFY `violation_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
