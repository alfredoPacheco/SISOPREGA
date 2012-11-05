/*
 * The database script is executed in mysql command line:
 * \. /path/to/sisoprega_I1.sql
 *
 * This script is intended to create only the necesary structure to accomplish iteration 1.
 * 
 * Revision History:
 * 
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 10/03/2012  Diego Torres                  Initial Version.
 * ====================================================================================
 * 
 * Author: Diego Torres
 *  
 */
CREATE DATABASE IF NOT EXISTS sisoprega;
USE sisoprega;

/*Table structure for table cat_ranchers */

DROP TABLE IF EXISTS cat_rancher;

CREATE TABLE cat_rancher (
  rancher_id SMALLINT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  aka VARCHAR(100),
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  mother_name VARCHAR(50),
  birth_date date,
  email_add VARCHAR(150),
  telephone VARCHAR(20),
  UNIQUE KEY U_cat_rancher (first_name, last_name, mother_name)
);

-- SAMPLE DATA FOR RANCHERS
INSERT INTO cat_rancher(aka, first_name, last_name, mother_name, email_add, telephone) 
VALUES('El Vato', 'Alfredo', 'Pacheco', 'Figueroa', 'j.alfredo.pacheco@gmail.com', '044 (656) 305-0450');
INSERT INTO cat_rancher(first_name, last_name, mother_name, birth_date, email_add, telephone)
VALUES('Diego A.', 'Torres', 'Fuerte', '1982-04-13', 'diego.torres.fuerte@gmail.com', '044 (656) 217-1598');


DROP TABLE IF EXISTS cat_enterprise_rancher;

CREATE TABLE cat_enterprise_rancher(
  enterprise_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  legal_name VARCHAR(100) NOT NULL,
  address_one VARCHAR(100) NOT NULL,
  address_two VARCHAR(100),
  city VARCHAR(80) NOT NULL,
  fed_entity VARCHAR(80) NOT NULL,
  zip_code VARCHAR(9) NOT NULL,
  legal_id VARCHAR(13) NOT NULL,
  telephone	VARCHAR(20)
);

DROP TABLE IF EXISTS cat_rancher_legal;

CREATE TABLE cat_rancher_legal (
  rancher_id SMALLINT UNSIGNED NOT NULL PRIMARY KEY REFERENCES cat_rancher(rancher_id),
  legal_name VARCHAR(100) NOT NULL,
  address_one VARCHAR(100) NOT NULL,
  address_two VARCHAR(100),
  city VARCHAR(80) NOT NULL,
  fed_entity VARCHAR(80) NOT NULL,
  zip_code VARCHAR(9) NOT NULL,
  legal_id VARCHAR(13) NOT NULL,
  telephone	VARCHAR(20)
);



/*Table structure for table cat_ranchers_addresses */

DROP TABLE IF EXISTS cat_ranchers_addresses;

CREATE TABLE cat_ranchers_addresses (
  address_id int(10) unsigned NOT NULL AUTO_INCREMENT,
  rancher_id int(10) unsigned NOT NULL,
  city_id int(10) unsigned NOT NULL,
  address_one varchar(50) NOT NULL,
  address_two varchar(50) NOT NULL,
  zip_code int(5) unsigned NOT NULL,
  PRIMARY KEY (address_id),
  KEY FK_cat_ranchers_addresses_cat_countries_states_cities (city_id),
  KEY FK_cat_ranchers_addresses_ctrl_ranchers (rancher_id),
  CONSTRAINT FK_cat_ranchers_addresses_ctrl_ranchers FOREIGN KEY (rancher_id) REFERENCES cat_ranchers (rancher_id) ON DELETE CASCADE,
  CONSTRAINT FK_cat_ranchers_addresses_cat_countries_states_cities FOREIGN KEY (city_id) REFERENCES cat_countries_states_cities (city_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*Table structure for table cat_ranchers_phones */
DROP TABLE IF EXISTS cat_ranchers_phones;

CREATE TABLE cat_ranchers_phones (
  phone_id int(10) unsigned NOT NULL AUTO_INCREMENT,
  rancher_id int(10) unsigned NOT NULL,
  phone_number int(7) unsigned NOT NULL,
  city_id int(10) unsigned NOT NULL,
  phone_type int(10) unsigned NOT NULL,
  PRIMARY KEY (phone_id),
  KEY FK_cat_ranchers_phones_cat_phone_types (phone_type),
  KEY FK_cat_ranchers_phones_cat_ranchers (rancher_id),
  CONSTRAINT FK_cat_ranchers_phones_cat_ranchers FOREIGN KEY (rancher_id) REFERENCES cat_ranchers (rancher_id) ON DELETE CASCADE,
  CONSTRAINT FK_cat_ranchers_phones_cat_phone_types FOREIGN KEY (phone_type) REFERENCES cat_phone_types (phtype_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



/*
  Table structure for table cat_location 
  */
DROP TABLE IF EXISTS cat_location;

CREATE TABLE cat_location (
  location_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  location_name VARCHAR(50) NOT NULL
);

/*
 DEFAULT DATA FOR LOCATIONS
 */

INSERT INTO cat_location(location_name) VALUES('Chihuahua');
INSERT INTO cat_location(location_name) VALUES('Zona Sur');

/*
 Table structure for table cat_banyards
 Sort by barnyard_location and code to provide selections to user.
 TODO: Handle position data in order to provide an interactive map.
*/

DROP TABLE IF EXISTS cat_banyard;

CREATE TABLE cat_banyard (
  banyard_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  banyard_code VARCHAR(3) NOT NULL,
  available BOOLEAN NOT NULL DEFAULT TRUE,
  location_id SMALLINT UNSIGNED NOT NULL REFERENCES cat_location(location_id),
  UNIQUE KEY U_banyard_code (banyard_code, location_id)
);

/* Chihuahua (1) Banyards */
-- TODO: Retrieve from map pictures.
INSERT INTO cat_banyard(banyard_code, location_id) VALUES('E1', 1);
INSERT INTO cat_banyard(banyard_code, location_id) VALUES('E2', 1);
INSERT INTO cat_banyard(banyard_code, location_id) VALUES('E3', 1);

/* Zona Sur (2) Banyards */
-- TODO: Retrieve from map pictures.
INSERT INTO cat_banyard(banyard_code, location_id) VALUES('E1', 2);
INSERT INTO cat_banyard(banyard_code, location_id) VALUES('E2', 2);
INSERT INTO cat_banyard(banyard_code, location_id) VALUES('E3', 2);

/*
 Table structure for table cat_cattle_classes
 */
DROP TABLE IF EXISTS cat_cattle_class;

CREATE TABLE cat_cattle_class (
  catclass_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  catclass_name VARCHAR(50) NOT NULL
);

INSERT INTO cat_cattle_class(catclass_name) VALUES('Bobino');
INSERT INTO cat_cattle_class(catclass_name) VALUES('Equino');


/* 
  Table structure for table cat_banyard_capacity.
  it is pretendable to have different capacities by
  cattle type.
*/
DROP TABLE IF EXISTS cat_banyard_capacity;

CREATE TABLE cat_banyard_capacity (
  capacity_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  banyard_id SMALLINT UNSIGNED NOT NULL REFERENCES cat_banyard(banyard_id) ON DELETE CASCADE,
  catclass_id SMALLINT UNSIGNED NOT NULL REFERENCES cat_cattle_class(catclass_id) ON DELETE CASCADE,
  head_count SMALLINT UNSIGNED NOT NULL DEFAULT 50,
  UNIQUE KEY U_banyardid_cattypeid (banyard_id,catclass_id)
);

/*
 All banyards capacity are set to 50 by default for all cattle type.
*/
INSERT INTO cat_banyard_capacity(banyard_id, catclass_id)
SELECT banyard_id, catclass_id
FROM cat_banyard, cat_cattle_class;

/*
 Table structure for table cat_cattle_types
 */
DROP TABLE IF EXISTS cat_cattle_type;

CREATE TABLE cat_cattle_type (
  cattype_id SMALLINT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  catclass_id SMALLINT UNSIGNED NOT NULL REFERENCES cat_cattle_class(catclass_id),
  cattype_name VARCHAR(50) NOT NULL
);

INSERT INTO cat_cattle_type(catclass_id, cattype_name) VALUES(1, 'Novillos');
INSERT INTO cat_cattle_type(catclass_id, cattype_name) VALUES(1, 'Vaquillas');
INSERT INTO cat_cattle_type(catclass_id, cattype_name) VALUES(2, 'Caballos');
INSERT INTO cat_cattle_type(catclass_id, cattype_name) VALUES(2, 'Yeguas');

/*
 Table structure for table cat_measurement_units 
 */
DROP TABLE IF EXISTS cat_measurement_unit;

CREATE TABLE cat_measurement_unit (
  unit_id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  unit_name VARCHAR(50) NOT NULL,
  unit_abreviation VARCHAR(4)
);


INSERT INTO cat_measurement_unit('Kilos', 'kg.');
INSERT INTO cat_measurement_unit('Libras', 'lbs.');

/*
 * Equivalence table will transform units
 */

DROP TABLE cat_measurement_unit_equivalence;

CREATE TABLE cat_measurement_unit_equivalence(
	unit_src TINYINT UNSIGNED NOT NULL,
	unit_dest TINYINT UNSIGNED NOT NULL,
	equivalence DECIMAL(6,4)
);

INSERT INTO cat_measurement_unit_equivalence VALUES(1, 2, 2.2);
INSERT INTO cat_measurement_unit_equivalence VALUES(2, 1, 0.4546);

/*
 Table structure for table cat_phone_types
 */
DROP TABLE IF EXISTS cat_phone_types;

CREATE TABLE cat_phone_types (
  phtype_id int(10) unsigned NOT NULL AUTO_INCREMENT,
  phone_type varchar(50) NOT NULL,
  PRIMARY KEY (phtype_id)
);

/*Table structure for table cat_transactions */

DROP TABLE IF EXISTS cat_transactions;

CREATE TABLE cat_transactions (
  transaction_id int(10) unsigned NOT NULL AUTO_INCREMENT,
  transaction_name varchar(50) NOT NULL,
  PRIMARY KEY (transaction_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table ctrl_receptions */

DROP TABLE IF EXISTS ctrl_receptions;

CREATE TABLE ctrl_receptions (
  reception_id int(10) unsigned NOT NULL AUTO_INCREMENT,
  rancher_id int(10) unsigned NOT NULL,
  date_allotted date NOT NULL,
  branch_id int(10) unsigned NOT NULL,
  cattle_type int(10) unsigned NOT NULL,
  city_id int(10) unsigned NOT NULL,
  PRIMARY KEY (reception_id),
  KEY FK_ctrl_receptions_cat_ranchers (rancher_id),
  KEY FK_ctrl_receptions_cat_branches (branch_id),
  KEY FK_ctrl_receptions_cat_cattle_types (cattle_type),
  KEY FK_ctrl_receptions_cat_countries_states_cities (city_id),
  CONSTRAINT FK_ctrl_receptions_cat_countries_states_cities FOREIGN KEY (city_id) REFERENCES cat_countries_states_cities (city_id),
  CONSTRAINT FK_ctrl_receptions_cat_branches FOREIGN KEY (branch_id) REFERENCES cat_branches (branch_id),
  CONSTRAINT FK_ctrl_receptions_cat_cattle_types FOREIGN KEY (cattle_type) REFERENCES cat_cattle_types (cattype_id),
  CONSTRAINT FK_ctrl_receptions_cat_ranchers FOREIGN KEY (rancher_id) REFERENCES cat_ranchers (rancher_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table ctrl_receptions_barnyards */

DROP TABLE IF EXISTS ctrl_receptions_barnyards;

CREATE TABLE ctrl_receptions_barnyards (
  recbarnyard_id int(10) unsigned NOT NULL AUTO_INCREMENT,
  reception_id int(10) unsigned NOT NULL,
  banyard_id int(10) unsigned NOT NULL,
  PRIMARY KEY (recbarnyard_id),
  KEY FK_ctrl_receptions_barnyards_cat_barnyard (banyard_id),
  KEY FK_ctrl_receptions_barnyards_ctrl_receptions (reception_id),
  CONSTRAINT FK_ctrl_receptions_barnyards_ctrl_receptions FOREIGN KEY (reception_id) REFERENCES ctrl_receptions (reception_id) ON DELETE CASCADE,
  CONSTRAINT FK_ctrl_receptions_barnyards_cat_barnyard FOREIGN KEY (banyard_id) REFERENCES cat_banyards (banyard_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table ctrl_receptions_feed */

DROP TABLE IF EXISTS ctrl_receptions_feed;

CREATE TABLE ctrl_receptions_feed (
  feed_id int(10) unsigned NOT NULL AUTO_INCREMENT,
  reception_id int(10) unsigned NOT NULL,
  feedtype_id int(10) unsigned NOT NULL,
  amount int(3) unsigned NOT NULL,
  PRIMARY KEY (feed_id),
  KEY FK_ctrl_receptions_feed_cat_feed_types (feedtype_id),
  KEY FK_ctrl_receptions_feed_ctrl_receptions (reception_id),
  CONSTRAINT FK_ctrl_receptions_feed_ctrl_receptions FOREIGN KEY (reception_id) REFERENCES ctrl_receptions (reception_id) ON DELETE CASCADE,
  CONSTRAINT FK_ctrl_receptions_feed_cat_feed_types FOREIGN KEY (feedtype_id) REFERENCES cat_feed (feedtype_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table ctrl_receptions_feed_banyard */

DROP TABLE IF EXISTS ctrl_receptions_feed_banyard;

CREATE TABLE ctrl_receptions_feed_banyard (
  feedby_id int(10) unsigned NOT NULL,
  feed_id int(10) unsigned NOT NULL,
  barnyard_id int(10) unsigned NOT NULL,
  PRIMARY KEY (feedby_id),
  UNIQUE KEY U_feedid_banyardid (feed_id,barnyard_id),
  KEY FK_ctrl_receptions_feed_banyard_cat_banyards (barnyard_id),
  CONSTRAINT FK_ctrl_receptions_feed_banyard_ctrl_receptions_feed FOREIGN KEY (feed_id) REFERENCES ctrl_receptions_feed (feed_id) ON DELETE CASCADE,
  CONSTRAINT FK_ctrl_receptions_feed_banyard_cat_banyards FOREIGN KEY (barnyard_id) REFERENCES cat_banyards (banyard_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table ctrl_receptions_feed_notes */

DROP TABLE IF EXISTS ctrl_receptions_feed_notes;

CREATE TABLE ctrl_receptions_feed_notes (
  note_id int(10) unsigned NOT NULL AUTO_INCREMENT,
  feed_id int(10) unsigned NOT NULL,
  note text NOT NULL,
  PRIMARY KEY (note_id),
  KEY FK_ctrl_receptions_feed_notes_ctrl_receptions_feed (feed_id),
  CONSTRAINT FK_ctrl_receptions_feed_notes_ctrl_receptions_feed FOREIGN KEY (feed_id) REFERENCES ctrl_receptions_feed (feed_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table ctrl_receptions_headcount */

DROP TABLE IF EXISTS ctrl_receptions_headcount;

CREATE TABLE ctrl_receptions_headcount (
  headcount_id int(10) unsigned NOT NULL AUTO_INCREMENT,
  reception_id int(10) unsigned NOT NULL,
  hc int(3) unsigned NOT NULL,
  hc_sex enum('1','0') NOT NULL,
  PRIMARY KEY (headcount_id),
  KEY FK_ctrl_receptions_headcoun_ctrl_receptions (reception_id),
  CONSTRAINT FK_ctrl_receptions_headcoun_ctrl_receptions FOREIGN KEY (reception_id) REFERENCES ctrl_receptions (reception_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table ctrl_receptions_headcount_barnyards */

DROP TABLE IF EXISTS ctrl_receptions_headcount_barnyards;

CREATE TABLE ctrl_receptions_headcount_barnyards (
  hcbarnyard_id int(10) unsigned NOT NULL AUTO_INCREMENT,
  headcount_id int(10) unsigned NOT NULL,
  barnyard_id int(10) unsigned NOT NULL,
  PRIMARY KEY (hcbarnyard_id),
  KEY FK_ctrl_receptions_headcount_barnyards_cat_barnyards (barnyard_id),
  KEY FK_ctrl_receptions_headcount_barnyards_ctrl_receptions_headcount (headcount_id),
  CONSTRAINT FK_ctrl_receptions_headcount_barnyards_ctrl_receptions_headcount FOREIGN KEY (headcount_id) REFERENCES ctrl_receptions_headcount (headcount_id) ON DELETE CASCADE,
  CONSTRAINT FK_ctrl_receptions_headcount_barnyards_cat_barnyards FOREIGN KEY (barnyard_id) REFERENCES cat_banyards (banyard_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table ctrl_receptions_inspections */

DROP TABLE IF EXISTS ctrl_receptions_inspections;

CREATE TABLE ctrl_receptions_inspections (
  inspection_id int(10) unsigned NOT NULL AUTO_INCREMENT,
  reception_id int(10) unsigned NOT NULL,
  insp_date date NOT NULL,
  catclass_id int(10) unsigned NOT NULL,
  quantity int(3) unsigned NOT NULL,
  PRIMARY KEY (inspection_id),
  KEY FK_ctrl_receptions_inspections_cat_cattle_classes (catclass_id),
  KEY FK_ctrl_receptions_inspections_ctrl_receptions (reception_id),
  CONSTRAINT FK_ctrl_receptions_inspections_ctrl_receptions FOREIGN KEY (reception_id) REFERENCES ctrl_receptions (reception_id) ON DELETE CASCADE,
  CONSTRAINT FK_ctrl_receptions_inspections_cat_cattle_classes FOREIGN KEY (catclass_id) REFERENCES cat_cattle_classes (catclass_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table ctrl_receptions_inspections_banyards */

DROP TABLE IF EXISTS ctrl_receptions_inspections_banyards;

CREATE TABLE ctrl_receptions_inspections_banyards (
  insbanyard_id int(10) unsigned NOT NULL AUTO_INCREMENT,
  inspection_id int(10) unsigned NOT NULL,
  banyard_id int(10) unsigned NOT NULL,
  PRIMARY KEY (insbanyard_id),
  UNIQUE KEY U_inspectionid_banyardid (inspection_id,banyard_id),
  KEY FK_ctrl_receptions_inspections_banyards_cat_banyards (banyard_id),
  CONSTRAINT FK_ctrl_recep_inspect_banyards_ctrl_recep_inspect FOREIGN KEY (inspection_id) REFERENCES ctrl_receptions_inspections (inspection_id) ON DELETE CASCADE,
  CONSTRAINT FK_ctrl_receptions_inspections_banyards_cat_banyards FOREIGN KEY (banyard_id) REFERENCES cat_banyards (banyard_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table ctrl_receptions_inspections_codes */

DROP TABLE IF EXISTS ctrl_receptions_inspections_codes;

CREATE TABLE ctrl_receptions_inspections_codes (
  inspcode_id int(10) unsigned NOT NULL,
  inspection_id int(10) unsigned NOT NULL,
  code_id int(10) unsigned NOT NULL,
  PRIMARY KEY (inspcode_id),
  KEY FK_ctrl_receptions_inspections_codes_ctrl_receptions_inspections (inspection_id),
  CONSTRAINT FK_ctrl_receptions_inspections_codes_ctrl_receptions_inspections FOREIGN KEY (inspection_id) REFERENCES ctrl_receptions_inspections (inspection_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table ctrl_receptions_notes */

DROP TABLE IF EXISTS ctrl_receptions_notes;

CREATE TABLE ctrl_receptions_notes (
  note_id int(10) unsigned NOT NULL AUTO_INCREMENT,
  reception_id int(10) unsigned NOT NULL,
  note text NOT NULL,
  PRIMARY KEY (note_id),
  KEY FK_ctrl_receptions_notes_ctrl_receptions (reception_id),
  CONSTRAINT FK_ctrl_receptions_notes_ctrl_receptions FOREIGN KEY (reception_id) REFERENCES ctrl_receptions (reception_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table ctrl_receptions_weights */

DROP TABLE IF EXISTS ctrl_receptions_weights;

CREATE TABLE ctrl_receptions_weights (
  weight_id int(10) unsigned NOT NULL AUTO_INCREMENT,
  reception_id int(10) unsigned NOT NULL,
  unit_id int(10) unsigned NOT NULL,
  weight int(3) unsigned NOT NULL,
  PRIMARY KEY (weight_id),
  KEY FK_ctrl_receptions_weights_cat_measurement_units (unit_id),
  KEY FK_ctrl_receptions_weights_ctrl_receptions (reception_id),
  CONSTRAINT FK_ctrl_receptions_weights_ctrl_receptions FOREIGN KEY (reception_id) REFERENCES ctrl_receptions (reception_id) ON DELETE CASCADE,
  CONSTRAINT FK_ctrl_receptions_weights_cat_measurement_units FOREIGN KEY (unit_id) REFERENCES cat_measurement_units (unit_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table ctrl_receptions_weights_banyard */

DROP TABLE IF EXISTS ctrl_receptions_weights_banyard;

CREATE TABLE ctrl_receptions_weights_banyard (
  weightby_id int(10) unsigned NOT NULL AUTO_INCREMENT,
  weight_id int(10) unsigned NOT NULL,
  banyard_id int(10) unsigned NOT NULL,
  PRIMARY KEY (weightby_id),
  UNIQUE KEY U_weightid_banyardid (weight_id,banyard_id),
  KEY FK_ctrl_receptions_weights_banyard_cat_banyards (banyard_id),
  CONSTRAINT FK_ctrl_receptions_weights_banyard_ctrl_receptions_weights FOREIGN KEY (weight_id) REFERENCES ctrl_receptions_weights (weight_id) ON DELETE CASCADE,
  CONSTRAINT FK_ctrl_receptions_weights_banyard_cat_banyards FOREIGN KEY (banyard_id) REFERENCES cat_banyards (banyard_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table ctrl_transactions_log */

DROP TABLE IF EXISTS ctrl_transactions_log;

CREATE TABLE ctrl_transactions_log (
  log_id int(10) unsigned NOT NULL AUTO_INCREMENT,
  credential_id int(10) unsigned NOT NULL,
  transaction_id int(10) unsigned NOT NULL,
  transaction_info text NOT NULL,
  transaction_date date NOT NULL,
  PRIMARY KEY (log_id),
  KEY FK_ctrl_transactions_log_cat_employees_credentials (credential_id),
  KEY FK_ctrl_transactions_log_cat_transactions (transaction_id),
  CONSTRAINT FK_ctrl_transactions_log_cat_transactions FOREIGN KEY (transaction_id) REFERENCES cat_transactions (transaction_id),
  CONSTRAINT FK_ctrl_transactions_log_cat_employees_credentials FOREIGN KEY (credential_id) REFERENCES cat_employees_credentials (credential_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table ctrl_transactions_log_entity */

DROP TABLE IF EXISTS ctrl_transactions_log_entity;

CREATE TABLE ctrl_transactions_log_entity (
  entity_id int(10) unsigned NOT NULL AUTO_INCREMENT,
  log_id int(10) unsigned NOT NULL,
  entity_name varchar(50) NOT NULL,
  action_id int(10) unsigned NOT NULL,
  id int(10) unsigned NOT NULL,
  entity_info text NOT NULL,
  PRIMARY KEY (entity_id),
  KEY FK_ctrl_transactions_log_entity_cat_entity_actions (action_id),
  KEY FK_ctrl_transactions_log_entity_ctrl_transactions_log (log_id),
  CONSTRAINT FK_ctrl_transactions_log_entity_ctrl_transactions_log FOREIGN KEY (log_id) REFERENCES ctrl_transactions_log (log_id) ON DELETE CASCADE,
  CONSTRAINT FK_ctrl_transactions_log_entity_cat_entity_actions FOREIGN KEY (action_id) REFERENCES cat_entity_actions (action_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
