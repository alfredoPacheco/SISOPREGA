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
 * 11/25/2012  Jaime Figueroa		     Adapt Postgres Database to MySQL tables.
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
  address_state VARCHAR(80) NOT NULL,
  zip_code VARCHAR(9) NOT NULL,
  legal_id VARCHAR(13) NOT NULL,
  telephone	VARCHAR(20),
  UNIQUE KEY U_enterprise_rancher_legal_id(legal_id),
  UNIQUE KEY U_enterprise_rancher_legal_name(legal_name)
);

DROP TABLE IF EXISTS cat_rancher_invoice;

CREATE TABLE cat_rancher_invoice (
  rancher_invoice_id  SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  rancher_id SMALLINT UNSIGNED NOT NULL REFERENCES cat_rancher(rancher_id),
  legal_name VARCHAR(100) NOT NULL,
  address_one VARCHAR(100) NOT NULL,
  address_two VARCHAR(100),
  city VARCHAR(80) NOT NULL,
  address_state VARCHAR(80) NOT NULL,
  zip_code VARCHAR(9) NOT NULL,
  legal_id VARCHAR(13) NOT NULL,
  UNIQUE KEY U_rancher_invoice_rancher_id(rancher_id),
  UNIQUE KEY U_rancher_invoice_legal_name(legal_name),
  UNIQUE KEY U_rancher_invoice_legal_id(legal_id)
);

DROP TABLE IF EXISTS cat_rancher_contact;

CREATE TABLE cat_rancher_contact(
  contact_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  rancher_id SMALLINT UNSIGNED NOT NULL REFERENCES cat_rancher(rancher_id),
  aka VARCHAR(100),
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  mother_name VARCHAR(50),
  birth_date date,
  email_add VARCHAR(150),
  telephone VARCHAR(20),
  address_one VARCHAR(100),
  address_two VARCHAR(100),
  city VARCHAR(80),
  address_state VARCHAR(80),
  zip_code VARCHAR(9),
  UNIQUE KEY U_rancher_contact(rancher_id, first_name, last_name, mother_name)
);

DROP TABLE IF EXISTS cat_enterprise_contact;

CREATE TABLE cat_enterprise_contact (
  contact_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  enterprise_id SMALLINT UNSIGNED NOT NULL REFERENCES cat_enterprise_rancher(enterprise_id),
  aka VARCHAR(100),
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  mother_name VARCHAR(50),
  birth_date date,
  email_add VARCHAR(150),
  telephone VARCHAR(20),
  address_one VARCHAR(100),
  address_two VARCHAR(100),
  city VARCHAR(80),
  address_state VARCHAR(80),
  zip_code VARCHAR(9)
);

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
 Table structure for table cat_barnyards
*/

DROP TABLE IF EXISTS cat_barnyard;

CREATE TABLE cat_barnyard (
  barnyard_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  barnyard_code VARCHAR(3) NOT NULL,
  available BOOLEAN NOT NULL DEFAULT TRUE,
  location_id integer NOT NULL REFERENCES cat_location(location_id)
);
