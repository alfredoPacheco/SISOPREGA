/*

*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`sisoprega` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `sisoprega`;

/*Table structure for table `cat_banyard_capacity` */

DROP TABLE IF EXISTS `cat_banyard_capacity`;

CREATE TABLE `cat_banyard_capacity` (
  `capacity_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `banyard_id` int(10) unsigned NOT NULL,
  `cattype_id` int(10) unsigned NOT NULL,
  `head_count` int(3) NOT NULL,
  PRIMARY KEY (`capacity_id`),
  UNIQUE KEY `U_banyardid_cattypeid` (`banyard_id`,`cattype_id`),
  KEY `FK_cat_banyard_capacity_cat_cattle_types` (`cattype_id`),
  CONSTRAINT `FK_cat_banyard_capacity_cat_cattle_types` FOREIGN KEY (`cattype_id`) REFERENCES `cat_cattle_types` (`cattype_id`),
  CONSTRAINT `FK_cat_banyard_capacity_cat_banyards` FOREIGN KEY (`banyard_id`) REFERENCES `cat_banyards` (`banyard_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Table structure for table `cat_banyards` */

DROP TABLE IF EXISTS `cat_banyards`;

CREATE TABLE `cat_banyards` (
  `banyard_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `branch_id` int(10) unsigned NOT NULL,
  `banyard_code` varchar(3) NOT NULL,
  `available` tinyint(1) unsigned NOT NULL,
  `location_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`banyard_id`),
  UNIQUE KEY `U_branchid_banyardid` (`branch_id`,`banyard_id`),
  KEY `FK_cat_banyards_cat_cat_banyards_locations` (`location_id`),
  CONSTRAINT `FK_cat_banyards_cat_branches` FOREIGN KEY (`branch_id`) REFERENCES `cat_branches` (`branch_id`),
  CONSTRAINT `FK_cat_banyards_cat_cat_banyards_locations` FOREIGN KEY (`location_id`) REFERENCES `cat_banyards_locations` (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

/*Table structure for table `cat_banyards_locations` */

DROP TABLE IF EXISTS `cat_banyards_locations`;

CREATE TABLE `cat_banyards_locations` (
  `location_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `location_name` varchar(50) NOT NULL,
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Table structure for table `cat_branches` */

DROP TABLE IF EXISTS `cat_branches`;

CREATE TABLE `cat_branches` (
  `branch_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `branch_name` varchar(50) NOT NULL,
  `aka` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`branch_id`),
  UNIQUE KEY `U_branchname` (`branch_name`),
  UNIQUE KEY `U_aka` (`aka`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Table structure for table `cat_cattle_classes` */

DROP TABLE IF EXISTS `cat_cattle_classes`;

CREATE TABLE `cat_cattle_classes` (
  `catclass_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `catclass_name` varchar(50) NOT NULL,
  PRIMARY KEY (`catclass_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `cat_cattle_types` */

DROP TABLE IF EXISTS `cat_cattle_types`;

CREATE TABLE `cat_cattle_types` (
  `cattype_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cattype_name` varchar(50) NOT NULL,
  PRIMARY KEY (`cattype_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Table structure for table `cat_countries` */

DROP TABLE IF EXISTS `cat_countries`;

CREATE TABLE `cat_countries` (
  `country_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `country_name` varchar(50) NOT NULL,
  PRIMARY KEY (`country_id`),
  UNIQUE KEY `U_countryname` (`country_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `cat_countries_states` */

DROP TABLE IF EXISTS `cat_countries_states`;

CREATE TABLE `cat_countries_states` (
  `state_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `country_id` int(10) unsigned NOT NULL,
  `state_name` varchar(50) NOT NULL,
  PRIMARY KEY (`state_id`),
  UNIQUE KEY `U_countryid_statename` (`country_id`,`state_name`),
  CONSTRAINT `FK_cat_countries_states_cat_countries` FOREIGN KEY (`country_id`) REFERENCES `cat_countries` (`country_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `cat_countries_states_cities` */

DROP TABLE IF EXISTS `cat_countries_states_cities`;

CREATE TABLE `cat_countries_states_cities` (
  `city_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `state_id` int(10) unsigned NOT NULL,
  `city_name` varchar(50) NOT NULL,
  `area_code` int(3) NOT NULL,
  PRIMARY KEY (`city_id`),
  UNIQUE KEY `U_stateid_cityname` (`state_id`,`city_name`),
  CONSTRAINT `FK_cat_cities_cat_states` FOREIGN KEY (`state_id`) REFERENCES `cat_countries_states` (`state_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `cat_credentials_type` */

DROP TABLE IF EXISTS `cat_credentials_type`;

CREATE TABLE `cat_credentials_type` (
  `credtype_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cred_name` varchar(50) NOT NULL,
  PRIMARY KEY (`credtype_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `cat_employee_jobs` */

DROP TABLE IF EXISTS `cat_employee_jobs`;

CREATE TABLE `cat_employee_jobs` (
  `job_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_name` varchar(50) NOT NULL,
  PRIMARY KEY (`job_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `cat_employees` */

DROP TABLE IF EXISTS `cat_employees`;

CREATE TABLE `cat_employees` (
  `employee_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `branch_id` int(10) unsigned NOT NULL,
  `creation_date` date NOT NULL,
  `aka` varchar(100) DEFAULT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `mother_name` varchar(50) DEFAULT NULL,
  `dob` date NOT NULL,
  `job_id` int(10) unsigned NOT NULL,
  `city_id` int(10) unsigned NOT NULL,
  `phone_number` int(7) unsigned DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  KEY `FK_cat_employees_cat_employees_jobs` (`job_id`),
  CONSTRAINT `FK_cat_employees_cat_employees_jobs` FOREIGN KEY (`job_id`) REFERENCES `cat_employee_jobs` (`job_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `cat_employees_credentials` */

DROP TABLE IF EXISTS `cat_employees_credentials`;

CREATE TABLE `cat_employees_credentials` (
  `credential_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `employee_id` int(10) unsigned NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `user_password` varchar(20) NOT NULL,
  `credtype_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`credential_id`),
  KEY `FK_cat_employees_credentials_credentials_type` (`credtype_id`),
  KEY `FK_cat_employees_credentials_cat_employees` (`employee_id`),
  CONSTRAINT `FK_cat_employees_credentials_cat_employees` FOREIGN KEY (`employee_id`) REFERENCES `cat_employees` (`employee_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_cat_employees_credentials_credentials_type` FOREIGN KEY (`credtype_id`) REFERENCES `cat_credentials_type` (`credtype_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `cat_entity_actions` */

DROP TABLE IF EXISTS `cat_entity_actions`;

CREATE TABLE `cat_entity_actions` (
  `action_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `action_name` varchar(50) NOT NULL,
  PRIMARY KEY (`action_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `cat_feed` */

DROP TABLE IF EXISTS `cat_feed`;

CREATE TABLE `cat_feed` (
  `feedtype_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `feed_name` varchar(50) NOT NULL,
  PRIMARY KEY (`feedtype_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `cat_feed_units` */

DROP TABLE IF EXISTS `cat_feed_units`;

CREATE TABLE `cat_feed_units` (
  `feedunit_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `feedtype_id` int(10) unsigned NOT NULL,
  `unit_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`feedunit_id`),
  KEY `FK_cat_feed_units_cat_measurement_units` (`unit_id`),
  KEY `FK_cat_feed_units_FK_cat_feed` (`feedtype_id`),
  CONSTRAINT `FK_cat_feed_units_FK_cat_feed` FOREIGN KEY (`feedtype_id`) REFERENCES `cat_feed` (`feedtype_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_cat_feed_units_cat_measurement_units` FOREIGN KEY (`unit_id`) REFERENCES `cat_measurement_units` (`unit_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `cat_measurement_units` */

DROP TABLE IF EXISTS `cat_measurement_units`;

CREATE TABLE `cat_measurement_units` (
  `unit_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `unit_name` varchar(50) NOT NULL,
  PRIMARY KEY (`unit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Table structure for table `cat_phone_types` */

DROP TABLE IF EXISTS `cat_phone_types`;

CREATE TABLE `cat_phone_types` (
  `phtype_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `phone_type` varchar(50) NOT NULL,
  PRIMARY KEY (`phtype_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `cat_ranchers` */

DROP TABLE IF EXISTS `cat_ranchers`;

CREATE TABLE `cat_ranchers` (
  `rancher_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `aka` varchar(100) DEFAULT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `mother_name` varchar(50) DEFAULT NULL,
  `birth_date` date NOT NULL,
  `email_add` varchar(150) NOT NULL,
  `job_title` varchar(150) NOT NULL,
  `rfc` varchar(100) NOT NULL,
  PRIMARY KEY (`rancher_id`),
  UNIQUE KEY `U_aka` (`aka`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `cat_ranchers_addresses` */

DROP TABLE IF EXISTS `cat_ranchers_addresses`;

CREATE TABLE `cat_ranchers_addresses` (
  `address_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rancher_id` int(10) unsigned NOT NULL,
  `city_id` int(10) unsigned NOT NULL,
  `address_one` varchar(50) NOT NULL,
  `address_two` varchar(50) NOT NULL,
  `zip_code` int(5) unsigned NOT NULL,
  PRIMARY KEY (`address_id`),
  KEY `FK_cat_ranchers_addresses_cat_countries_states_cities` (`city_id`),
  KEY `FK_cat_ranchers_addresses_ctrl_ranchers` (`rancher_id`),
  CONSTRAINT `FK_cat_ranchers_addresses_ctrl_ranchers` FOREIGN KEY (`rancher_id`) REFERENCES `cat_ranchers` (`rancher_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_cat_ranchers_addresses_cat_countries_states_cities` FOREIGN KEY (`city_id`) REFERENCES `cat_countries_states_cities` (`city_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `cat_ranchers_phones` */

DROP TABLE IF EXISTS `cat_ranchers_phones`;

CREATE TABLE `cat_ranchers_phones` (
  `phone_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rancher_id` int(10) unsigned NOT NULL,
  `phone_number` int(7) unsigned NOT NULL,
  `city_id` int(10) unsigned NOT NULL,
  `phone_type` int(10) unsigned NOT NULL,
  PRIMARY KEY (`phone_id`),
  KEY `FK_cat_ranchers_phones_cat_phone_types` (`phone_type`),
  KEY `FK_cat_ranchers_phones_cat_ranchers` (`rancher_id`),
  CONSTRAINT `FK_cat_ranchers_phones_cat_ranchers` FOREIGN KEY (`rancher_id`) REFERENCES `cat_ranchers` (`rancher_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_cat_ranchers_phones_cat_phone_types` FOREIGN KEY (`phone_type`) REFERENCES `cat_phone_types` (`phtype_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `cat_transactions` */

DROP TABLE IF EXISTS `cat_transactions`;

CREATE TABLE `cat_transactions` (
  `transaction_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `transaction_name` varchar(50) NOT NULL,
  PRIMARY KEY (`transaction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `ctrl_receptions` */

DROP TABLE IF EXISTS `ctrl_receptions`;

CREATE TABLE `ctrl_receptions` (
  `reception_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rancher_id` int(10) unsigned NOT NULL,
  `date_allotted` date NOT NULL,
  `branch_id` int(10) unsigned NOT NULL,
  `cattle_type` int(10) unsigned NOT NULL,
  `city_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`reception_id`),
  KEY `FK_ctrl_receptions_cat_ranchers` (`rancher_id`),
  KEY `FK_ctrl_receptions_cat_branches` (`branch_id`),
  KEY `FK_ctrl_receptions_cat_cattle_types` (`cattle_type`),
  KEY `FK_ctrl_receptions_cat_countries_states_cities` (`city_id`),
  CONSTRAINT `FK_ctrl_receptions_cat_countries_states_cities` FOREIGN KEY (`city_id`) REFERENCES `cat_countries_states_cities` (`city_id`),
  CONSTRAINT `FK_ctrl_receptions_cat_branches` FOREIGN KEY (`branch_id`) REFERENCES `cat_branches` (`branch_id`),
  CONSTRAINT `FK_ctrl_receptions_cat_cattle_types` FOREIGN KEY (`cattle_type`) REFERENCES `cat_cattle_types` (`cattype_id`),
  CONSTRAINT `FK_ctrl_receptions_cat_ranchers` FOREIGN KEY (`rancher_id`) REFERENCES `cat_ranchers` (`rancher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `ctrl_receptions_barnyards` */

DROP TABLE IF EXISTS `ctrl_receptions_barnyards`;

CREATE TABLE `ctrl_receptions_barnyards` (
  `recbarnyard_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `reception_id` int(10) unsigned NOT NULL,
  `banyard_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`recbarnyard_id`),
  KEY `FK_ctrl_receptions_barnyards_cat_barnyard` (`banyard_id`),
  KEY `FK_ctrl_receptions_barnyards_ctrl_receptions` (`reception_id`),
  CONSTRAINT `FK_ctrl_receptions_barnyards_ctrl_receptions` FOREIGN KEY (`reception_id`) REFERENCES `ctrl_receptions` (`reception_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ctrl_receptions_barnyards_cat_barnyard` FOREIGN KEY (`banyard_id`) REFERENCES `cat_banyards` (`banyard_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `ctrl_receptions_feed` */

DROP TABLE IF EXISTS `ctrl_receptions_feed`;

CREATE TABLE `ctrl_receptions_feed` (
  `feed_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `reception_id` int(10) unsigned NOT NULL,
  `feedtype_id` int(10) unsigned NOT NULL,
  `amount` int(3) unsigned NOT NULL,
  PRIMARY KEY (`feed_id`),
  KEY `FK_ctrl_receptions_feed_cat_feed_types` (`feedtype_id`),
  KEY `FK_ctrl_receptions_feed_ctrl_receptions` (`reception_id`),
  CONSTRAINT `FK_ctrl_receptions_feed_ctrl_receptions` FOREIGN KEY (`reception_id`) REFERENCES `ctrl_receptions` (`reception_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ctrl_receptions_feed_cat_feed_types` FOREIGN KEY (`feedtype_id`) REFERENCES `cat_feed` (`feedtype_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `ctrl_receptions_feed_banyard` */

DROP TABLE IF EXISTS `ctrl_receptions_feed_banyard`;

CREATE TABLE `ctrl_receptions_feed_banyard` (
  `feedby_id` int(10) unsigned NOT NULL,
  `feed_id` int(10) unsigned NOT NULL,
  `barnyard_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`feedby_id`),
  UNIQUE KEY `U_feedid_banyardid` (`feed_id`,`barnyard_id`),
  KEY `FK_ctrl_receptions_feed_banyard_cat_banyards` (`barnyard_id`),
  CONSTRAINT `FK_ctrl_receptions_feed_banyard_ctrl_receptions_feed` FOREIGN KEY (`feed_id`) REFERENCES `ctrl_receptions_feed` (`feed_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ctrl_receptions_feed_banyard_cat_banyards` FOREIGN KEY (`barnyard_id`) REFERENCES `cat_banyards` (`banyard_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `ctrl_receptions_feed_notes` */

DROP TABLE IF EXISTS `ctrl_receptions_feed_notes`;

CREATE TABLE `ctrl_receptions_feed_notes` (
  `note_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `feed_id` int(10) unsigned NOT NULL,
  `note` text NOT NULL,
  PRIMARY KEY (`note_id`),
  KEY `FK_ctrl_receptions_feed_notes_ctrl_receptions_feed` (`feed_id`),
  CONSTRAINT `FK_ctrl_receptions_feed_notes_ctrl_receptions_feed` FOREIGN KEY (`feed_id`) REFERENCES `ctrl_receptions_feed` (`feed_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `ctrl_receptions_headcount` */

DROP TABLE IF EXISTS `ctrl_receptions_headcount`;

CREATE TABLE `ctrl_receptions_headcount` (
  `headcount_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `reception_id` int(10) unsigned NOT NULL,
  `hc` int(3) unsigned NOT NULL,
  `hc_sex` enum('1','0') NOT NULL,
  PRIMARY KEY (`headcount_id`),
  KEY `FK_ctrl_receptions_headcoun_ctrl_receptions` (`reception_id`),
  CONSTRAINT `FK_ctrl_receptions_headcoun_ctrl_receptions` FOREIGN KEY (`reception_id`) REFERENCES `ctrl_receptions` (`reception_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `ctrl_receptions_headcount_barnyards` */

DROP TABLE IF EXISTS `ctrl_receptions_headcount_barnyards`;

CREATE TABLE `ctrl_receptions_headcount_barnyards` (
  `hcbarnyard_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `headcount_id` int(10) unsigned NOT NULL,
  `barnyard_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`hcbarnyard_id`),
  KEY `FK_ctrl_receptions_headcount_barnyards_cat_barnyards` (`barnyard_id`),
  KEY `FK_ctrl_receptions_headcount_barnyards_ctrl_receptions_headcount` (`headcount_id`),
  CONSTRAINT `FK_ctrl_receptions_headcount_barnyards_ctrl_receptions_headcount` FOREIGN KEY (`headcount_id`) REFERENCES `ctrl_receptions_headcount` (`headcount_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ctrl_receptions_headcount_barnyards_cat_barnyards` FOREIGN KEY (`barnyard_id`) REFERENCES `cat_banyards` (`banyard_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `ctrl_receptions_inspections` */

DROP TABLE IF EXISTS `ctrl_receptions_inspections`;

CREATE TABLE `ctrl_receptions_inspections` (
  `inspection_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `reception_id` int(10) unsigned NOT NULL,
  `insp_date` date NOT NULL,
  `catclass_id` int(10) unsigned NOT NULL,
  `quantity` int(3) unsigned NOT NULL,
  PRIMARY KEY (`inspection_id`),
  KEY `FK_ctrl_receptions_inspections_cat_cattle_classes` (`catclass_id`),
  KEY `FK_ctrl_receptions_inspections_ctrl_receptions` (`reception_id`),
  CONSTRAINT `FK_ctrl_receptions_inspections_ctrl_receptions` FOREIGN KEY (`reception_id`) REFERENCES `ctrl_receptions` (`reception_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ctrl_receptions_inspections_cat_cattle_classes` FOREIGN KEY (`catclass_id`) REFERENCES `cat_cattle_classes` (`catclass_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `ctrl_receptions_inspections_banyards` */

DROP TABLE IF EXISTS `ctrl_receptions_inspections_banyards`;

CREATE TABLE `ctrl_receptions_inspections_banyards` (
  `insbanyard_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `inspection_id` int(10) unsigned NOT NULL,
  `banyard_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`insbanyard_id`),
  UNIQUE KEY `U_inspectionid_banyardid` (`inspection_id`,`banyard_id`),
  KEY `FK_ctrl_receptions_inspections_banyards_cat_banyards` (`banyard_id`),
  CONSTRAINT `FK_ctrl_recep_inspect_banyards_ctrl_recep_inspect` FOREIGN KEY (`inspection_id`) REFERENCES `ctrl_receptions_inspections` (`inspection_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ctrl_receptions_inspections_banyards_cat_banyards` FOREIGN KEY (`banyard_id`) REFERENCES `cat_banyards` (`banyard_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `ctrl_receptions_inspections_codes` */

DROP TABLE IF EXISTS `ctrl_receptions_inspections_codes`;

CREATE TABLE `ctrl_receptions_inspections_codes` (
  `inspcode_id` int(10) unsigned NOT NULL,
  `inspection_id` int(10) unsigned NOT NULL,
  `code_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`inspcode_id`),
  KEY `FK_ctrl_receptions_inspections_codes_ctrl_receptions_inspections` (`inspection_id`),
  CONSTRAINT `FK_ctrl_receptions_inspections_codes_ctrl_receptions_inspections` FOREIGN KEY (`inspection_id`) REFERENCES `ctrl_receptions_inspections` (`inspection_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `ctrl_receptions_notes` */

DROP TABLE IF EXISTS `ctrl_receptions_notes`;

CREATE TABLE `ctrl_receptions_notes` (
  `note_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `reception_id` int(10) unsigned NOT NULL,
  `note` text NOT NULL,
  PRIMARY KEY (`note_id`),
  KEY `FK_ctrl_receptions_notes_ctrl_receptions` (`reception_id`),
  CONSTRAINT `FK_ctrl_receptions_notes_ctrl_receptions` FOREIGN KEY (`reception_id`) REFERENCES `ctrl_receptions` (`reception_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `ctrl_receptions_weights` */

DROP TABLE IF EXISTS `ctrl_receptions_weights`;

CREATE TABLE `ctrl_receptions_weights` (
  `weight_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `reception_id` int(10) unsigned NOT NULL,
  `unit_id` int(10) unsigned NOT NULL,
  `weight` int(3) unsigned NOT NULL,
  PRIMARY KEY (`weight_id`),
  KEY `FK_ctrl_receptions_weights_cat_measurement_units` (`unit_id`),
  KEY `FK_ctrl_receptions_weights_ctrl_receptions` (`reception_id`),
  CONSTRAINT `FK_ctrl_receptions_weights_ctrl_receptions` FOREIGN KEY (`reception_id`) REFERENCES `ctrl_receptions` (`reception_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ctrl_receptions_weights_cat_measurement_units` FOREIGN KEY (`unit_id`) REFERENCES `cat_measurement_units` (`unit_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `ctrl_receptions_weights_banyard` */

DROP TABLE IF EXISTS `ctrl_receptions_weights_banyard`;

CREATE TABLE `ctrl_receptions_weights_banyard` (
  `weightby_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `weight_id` int(10) unsigned NOT NULL,
  `banyard_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`weightby_id`),
  UNIQUE KEY `U_weightid_banyardid` (`weight_id`,`banyard_id`),
  KEY `FK_ctrl_receptions_weights_banyard_cat_banyards` (`banyard_id`),
  CONSTRAINT `FK_ctrl_receptions_weights_banyard_ctrl_receptions_weights` FOREIGN KEY (`weight_id`) REFERENCES `ctrl_receptions_weights` (`weight_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ctrl_receptions_weights_banyard_cat_banyards` FOREIGN KEY (`banyard_id`) REFERENCES `cat_banyards` (`banyard_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `ctrl_transactions_log` */

DROP TABLE IF EXISTS `ctrl_transactions_log`;

CREATE TABLE `ctrl_transactions_log` (
  `log_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `credential_id` int(10) unsigned NOT NULL,
  `transaction_id` int(10) unsigned NOT NULL,
  `transaction_info` text NOT NULL,
  `transaction_date` date NOT NULL,
  PRIMARY KEY (`log_id`),
  KEY `FK_ctrl_transactions_log_cat_employees_credentials` (`credential_id`),
  KEY `FK_ctrl_transactions_log_cat_transactions` (`transaction_id`),
  CONSTRAINT `FK_ctrl_transactions_log_cat_transactions` FOREIGN KEY (`transaction_id`) REFERENCES `cat_transactions` (`transaction_id`),
  CONSTRAINT `FK_ctrl_transactions_log_cat_employees_credentials` FOREIGN KEY (`credential_id`) REFERENCES `cat_employees_credentials` (`credential_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `ctrl_transactions_log_entity` */

DROP TABLE IF EXISTS `ctrl_transactions_log_entity`;

CREATE TABLE `ctrl_transactions_log_entity` (
  `entity_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `log_id` int(10) unsigned NOT NULL,
  `entity_name` varchar(50) NOT NULL,
  `action_id` int(10) unsigned NOT NULL,
  `id` int(10) unsigned NOT NULL,
  `entity_info` text NOT NULL,
  PRIMARY KEY (`entity_id`),
  KEY `FK_ctrl_transactions_log_entity_cat_entity_actions` (`action_id`),
  KEY `FK_ctrl_transactions_log_entity_ctrl_transactions_log` (`log_id`),
  CONSTRAINT `FK_ctrl_transactions_log_entity_ctrl_transactions_log` FOREIGN KEY (`log_id`) REFERENCES `ctrl_transactions_log` (`log_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ctrl_transactions_log_entity_cat_entity_actions` FOREIGN KEY (`action_id`) REFERENCES `cat_entity_actions` (`action_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
