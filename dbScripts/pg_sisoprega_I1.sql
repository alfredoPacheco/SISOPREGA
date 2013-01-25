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
 * 11/27/2012  Diego Torres                  Add tables for security management
 * 12/01/2012  Diego Torres                  System log will be provided by app server.
 * 12/13/2012  Alfredo Pacheco               Field handling moved from ctrl_feed_order_details to ctrl_feed_order.
 * 01/04/2013  Alfredo Pacheco		     On Delete Cascade for ctrl_feed_order_barnyard and ctrl_feed_order_details.
 * 01/13/2013  Diego Torres                  Add email to enterprise rancher.
 * ====================================================================================
 * 
 * Author: Diego Torres
 *  
 */
 
 
 /*
 **********************************************************************************************
 *    SECURITY TABLES
 **********************************************************************************************
 */
 
/* 
 * It is intended to send the password encrypted to the password field.
 */
DROP TABLE IF EXISTS sys_sisoprega_user CASCADE;
CREATE TABLE sys_sisoprega_user(
	user_name varchar(10) NOT NULL PRIMARY KEY,
	user_password varchar(32) NOT NULL
);
 
GRANT ALL ON sys_sisoprega_user TO sisoprega;
 
DROP TABLE IF EXISTS sys_sisoprega_role CASCADE;
CREATE TABLE sys_sisoprega_role(
	user_name varchar(10) NOT NULL REFERENCES sys_sisoprega_user(user_name),
	role_name varchar(20) NOT NULL
);
 
CREATE UNIQUE INDEX U_user_role ON sys_sisoprega_role(user_name, role_name);

GRANT ALL ON sys_sisoprega_role TO sisoprega;
/*
 **********************************************************************************************
 *    DATA TABLES
 **********************************************************************************************
 */

DROP TABLE IF EXISTS cat_rancher CASCADE;
CREATE TABLE cat_rancher(
	rancher_id integer PRIMARY KEY,
	is_enterprise boolean
);

GRANT ALL ON cat_rancher TO sisoprega;

DROP TABLE IF EXISTS cat_person_rancher CASCADE;
CREATE TABLE cat_person_rancher (
  rancher_id integer PRIMARY KEY,
  aka VARCHAR(100),
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  mother_name VARCHAR(50),
  birth_date date,
  email_add VARCHAR(150),
  telephone VARCHAR(20)
);

CREATE UNIQUE INDEX U_cat_person_rancher ON cat_person_rancher (first_name, last_name, mother_name);

GRANT ALL ON cat_person_rancher TO sisoprega;

DROP TABLE IF EXISTS cat_enterprise_rancher CASCADE;

CREATE TABLE cat_enterprise_rancher(
  enterprise_id integer PRIMARY KEY,
  legal_name VARCHAR(100) NOT NULL,
  address_one VARCHAR(100),
  address_two VARCHAR(100),
  city VARCHAR(80) NOT NULL,
  address_state VARCHAR(80) NOT NULL,
  zip_code VARCHAR(9) NOT NULL,
  legal_id VARCHAR(13) NOT NULL,
  telephone VARCHAR(20),
  email VARCHAR(150)
);

CREATE UNIQUE INDEX U_enterprise_rancher_legal_id ON cat_enterprise_rancher(legal_id);
CREATE UNIQUE INDEX U_enterprise_rancher_legal_name ON cat_enterprise_rancher(legal_name);

GRANT ALL ON cat_enterprise_rancher TO sisoprega;

DROP SEQUENCE rancher_seq;
CREATE SEQUENCE rancher_seq;
GRANT ALL ON rancher_seq TO sisoprega;

CREATE OR REPLACE FUNCTION proc_enterprise_rancher_id() RETURNS TRIGGER AS 
$proc$
DECLARE
	new_id integer;
BEGIN
	new_id := nextval('rancher_seq');
	New.enterprise_id := new_id;
	
	INSERT INTO cat_rancher (rancher_id, is_enterprise)
	VALUES (new_id, true);
	
	Return NEW;
END;
$proc$ LANGUAGE 'plpgsql';

DROP TRIGGER enterprise_rancher_id_trigger ON cat_enterprise_rancher;
CREATE TRIGGER enterprise_rancher_id_trigger 
BEFORE INSERT ON cat_enterprise_rancher
FOR EACH ROW
EXECUTE PROCEDURE proc_enterprise_rancher_id();

DROP TRIGGER enterprise_rancher_delete_trigger ON cat_enterprise_rancher;
CREATE OR REPLACE FUNCTION proc_enterprise_rancher_delete() RETURNS TRIGGER AS
$proc$
BEGIN
	DELETE FROM cat_rancher
	WHERE rancher_id = Old.enterprise_id;
	
	Return NULL;
END;
$proc$ LANGUAGE 'plpgsql';

CREATE TRIGGER enterprise_rancher_delete_trigger 
AFTER DELETE ON cat_enterprise_rancher
FOR EACH ROW
EXECUTE PROCEDURE proc_enterprise_rancher_delete();

DROP TRIGGER person_rancher_id_trigger ON cat_person_rancher;
CREATE OR REPLACE FUNCTION proc_person_rancher_id() RETURNS TRIGGER AS
$proc$
DECLARE
	new_id integer;
BEGIN
	new_id := nextval('rancher_seq');
	New.rancher_id := new_id;
	
	INSERT INTO cat_rancher(rancher_id, is_enterprise)
	VALUES(new_id, false);
	
	Return NEW;
END;
$proc$ LANGUAGE 'plpgsql';

CREATE TRIGGER person_rancher_id_trigger
BEFORE INSERT ON cat_person_rancher
FOR EACH ROW
EXECUTE PROCEDURE proc_person_rancher_id();

DROP TRIGGER person_rancher_delete_trigger ON cat_person_rancher;
CREATE OR REPLACE FUNCTION proc_person_rancher_delete() RETURNS TRIGGER AS
$proc$
BEGIN
	DELETE FROM cat_rancher
	WHERE rancher_id = Old.rancher_id;
	
	Return NULL;
END;
$proc$ LANGUAGE 'plpgsql';

CREATE TRIGGER person_rancher_delete_trigger
AFTER DELETE ON cat_person_rancher
FOR EACH ROW
EXECUTE PROCEDURE proc_person_rancher_delete();

-- SAMPLE DATA FOR RANCHERS
INSERT INTO cat_person_rancher(aka, first_name, last_name, mother_name, email_add, telephone) 
VALUES('El Vato', 'Alfredo', 'Pacheco', 'Figueroa', 'j.alfredo.pacheco@gmail.com', '044 (656) 305-0450');
INSERT INTO cat_person_rancher(first_name, last_name, mother_name, birth_date, email_add, telephone)
VALUES('Diego A.', 'Torres', 'Fuerte', '1982-04-13', 'diego.torres.fuerte@gmail.com', '044 (656) 217-1598');
INSERT INTO cat_enterprise_rancher(legal_name, address_one, address_two, city, address_state, zip_code, legal_id, telephone)
VALUES('Ganaderia Apaloosa', 'Calle prueba #7357', 'Colonia foo bar', 'cd. Juarez', 'Chih.', '32590', 'GAAP339648IEA', '656 000-0000');


DROP TABLE IF EXISTS cat_rancher_invoice CASCADE;

CREATE TABLE cat_rancher_invoice (
  rancher_invoice_id  SERIAL PRIMARY KEY,
  rancher_id integer NOT NULL REFERENCES cat_person_rancher(rancher_id) ON DELETE CASCADE,
  legal_name VARCHAR(100) NOT NULL,
  address_one VARCHAR(100) NOT NULL,
  address_two VARCHAR(100),
  city VARCHAR(80) NOT NULL,
  address_state VARCHAR(80) NOT NULL,
  zip_code VARCHAR(9) NOT NULL,
  legal_id VARCHAR(13) NOT NULL
);

CREATE UNIQUE INDEX U_rancher_invoice_rancher_id ON cat_rancher_invoice(rancher_id);
CREATE UNIQUE INDEX U_rancher_invoice_legal_name ON cat_rancher_invoice(legal_name);
CREATE UNIQUE INDEX U_rancher_invoice_legal_ID ON cat_rancher_invoice(legal_id);

GRANT ALL ON cat_rancher_invoice TO sisoprega;
GRANT ALL ON cat_rancher_invoice_rancher_invoice_id_seq TO sisoprega;

DROP TABLE IF EXISTS cat_rancher_contact CASCADE;

CREATE TABLE cat_rancher_contact(
  contact_id SERIAL PRIMARY KEY,
  rancher_id integer NOT NULL REFERENCES cat_rancher(rancher_id),
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

CREATE UNIQUE INDEX U_cat_rancher_contact ON cat_rancher_contact(rancher_id, first_name, last_name, mother_name);

GRANT ALL ON cat_rancher_contact TO sisoprega;
GRANT ALL ON cat_rancher_contact_contact_id_seq TO sisoprega;

/*
 Table structure for table cat_cattle_classes
 */
DROP TABLE IF EXISTS cat_cattle_class CASCADE;

CREATE TABLE cat_cattle_class (
  catclass_id SERIAL PRIMARY KEY,
  catclass_name VARCHAR(50) NOT NULL
);

CREATE UNIQUE INDEX U_catclass_name ON cat_cattle_class(catclass_name);

GRANT ALL ON cat_cattle_class TO sisoprega;
GRANT ALL ON cat_cattle_class_catclass_id_seq TO sisoprega;

INSERT INTO cat_cattle_class(catclass_name) VALUES('Bovino');
INSERT INTO cat_cattle_class(catclass_name) VALUES('Equino');

/*
 Table structure for table cat_cattle_types
 */
DROP TABLE IF EXISTS cat_cattle_type CASCADE;

CREATE TABLE cat_cattle_type (
  cattype_id SERIAL PRIMARY KEY,
  catclass_id integer NOT NULL REFERENCES cat_cattle_class(catclass_id),
  cattype_name VARCHAR(50) NOT NULL
);

CREATE UNIQUE INDEX U_cattle_type ON cat_cattle_type(cattype_name);

GRANT ALL ON cat_cattle_type TO sisoprega;
GRANT ALL ON cat_cattle_type_cattype_id_seq TO sisoprega;

INSERT INTO cat_cattle_type(catclass_id, cattype_name) VALUES(1, 'Novillos');
INSERT INTO cat_cattle_type(catclass_id, cattype_name) VALUES(1, 'Vaquillas');
INSERT INTO cat_cattle_type(catclass_id, cattype_name) VALUES(2, 'Caballos');
INSERT INTO cat_cattle_type(catclass_id, cattype_name) VALUES(2, 'Yeguas');

/*
  Table structure for table cat_location 
  */
DROP TABLE IF EXISTS cat_location CASCADE;

CREATE TABLE cat_location (
  location_id SERIAL PRIMARY KEY,
  location_name VARCHAR(50) NOT NULL
);

GRANT ALL ON cat_location TO sisoprega;
GRANT ALL ON cat_location_location_id_seq TO sisoprega;

/*
 DEFAULT DATA FOR LOCATIONS
 */

INSERT INTO cat_location(location_name) VALUES('Chihuahua');
INSERT INTO cat_location(location_name) VALUES('Zona Sur');

/*
 Table structure for table cat_barnyards
*/

DROP TABLE IF EXISTS cat_barnyard CASCADE;

CREATE TABLE cat_barnyard (
  barnyard_id SERIAL PRIMARY KEY,
  barnyard_code VARCHAR(3) NOT NULL,
  available BOOLEAN NOT NULL DEFAULT TRUE,
  location_id integer NOT NULL REFERENCES cat_location(location_id)
);

CREATE UNIQUE INDEX U_barnyard_code ON cat_barnyard(barnyard_code, location_id);

GRANT ALL ON cat_barnyard TO sisoprega;
GRANT ALL ON cat_barnyard_barnyard_id_seq TO sisoprega;

/* 
  Table structure for table cat_barnyard_capacity.
  it is pretendable to have different capacities by
  cattle type.
*/
DROP TABLE IF EXISTS cat_barnyard_capacity CASCADE;

CREATE TABLE cat_barnyard_capacity (
  capacity_id SERIAL PRIMARY KEY,
  barnyard_id integer NOT NULL REFERENCES cat_barnyard(barnyard_id) ON DELETE CASCADE,
  catclass_id integer NOT NULL REFERENCES cat_cattle_class(catclass_id) ON DELETE CASCADE,
  head_count integer NOT NULL DEFAULT 50
);

CREATE UNIQUE INDEX U_barnyard_cattle_class ON cat_barnyard_capacity(barnyard_id, catclass_id);

GRANT ALL ON cat_barnyard_capacity TO sisoprega;
GRANT ALL ON cat_barnyard_capacity_capacity_id_seq TO sisoprega;

/*
 All barnyards capacity are set to 50 by default for all cattle type.
*/
INSERT INTO cat_barnyard_capacity(barnyard_id, catclass_id)
SELECT barnyard_id, catclass_id
FROM cat_barnyard, cat_cattle_class;

/*
 Table structure for table cat_measurement_units 
 */
DROP TABLE IF EXISTS cat_measurement_unit CASCADE;

CREATE TABLE cat_measurement_unit (
  unit_id SERIAL PRIMARY KEY,
  unit_name VARCHAR(50) NOT NULL,
  unit_abreviation VARCHAR(4)
);

GRANT ALL ON cat_measurement_unit TO sisoprega;
GRANT ALL ON cat_measurement_unit_unit_id_seq TO sisoprega;

INSERT INTO cat_measurement_unit(unit_name, unit_abreviation) VALUES('Kilos', 'kg.');
INSERT INTO cat_measurement_unit(unit_name, unit_abreviation) VALUES('Libras', 'lbs.');

/*
 * Equivalence table will transform units
 */

DROP TABLE cat_measurement_unit_equivalence CASCADE;

CREATE TABLE cat_measurement_unit_equivalence(
	equivalence_id SERIAL PRIMARY KEY,
	unit_src integer NOT NULL,
	unit_dest integer NOT NULL,
	equivalence DECIMAL(6,4)
);

GRANT ALL ON cat_measurement_unit_equivalence TO sisoprega;
GRANT ALL ON cat_measurement_unit_equivalence_equivalence_id_seq TO sisoprega;

INSERT INTO cat_measurement_unit_equivalence VALUES(1, 2, 2.2);
INSERT INTO cat_measurement_unit_equivalence VALUES(2, 1, 0.4546);

/*Table structure for table ctrl_receptions */

DROP TABLE IF EXISTS ctrl_reception CASCADE;

CREATE TABLE ctrl_reception (
  reception_id SERIAL PRIMARY KEY,
  rancher_id integer NOT NULL REFERENCES cat_rancher(rancher_id),
  date_allotted date NOT NULL,
  cattle_type integer NOT NULL REFERENCES cat_cattle_type(cattype_id),
  location_id integer NOT NULL REFERENCES cat_location(location_id)
);

GRANT ALL ON ctrl_reception TO sisoprega;
GRANT ALL ON ctrl_reception_reception_id_seq TO sisoprega;

/*Table structure for table ctrl_receptions_barnyards */
DROP TABLE IF EXISTS ctrl_reception_barnyard CASCADE;

CREATE TABLE ctrl_reception_barnyard (
  rec_barnyard_id SERIAL PRIMARY KEY,
  reception_id integer NOT NULL REFERENCES ctrl_reception(reception_id),
  barnyard_id integer NOT NULL REFERENCES cat_barnyard(barnyard_id)
);

GRANT ALL ON ctrl_reception_barnyard TO sisoprega;
GRANT ALL ON ctrl_reception_barnyard_rec_barnyard_id_seq TO sisoprega;

/*Table structure for table ctrl_receptions_headcount */
DROP TABLE IF EXISTS ctrl_reception_headcount CASCADE;

CREATE TABLE ctrl_reception_headcount (
  headcount_id SERIAL PRIMARY KEY,
  reception_id integer NOT NULL REFERENCES ctrl_reception(reception_id),
  hc integer NOT NULL,
  weight DECIMAL(12,4),
  weight_uom integer NOT NULL REFERENCES cat_measurement_unit(unit_id)
);

GRANT ALL ON ctrl_reception_headcount TO sisoprega;
GRANT ALL ON ctrl_reception_headcount_headcount_id_seq TO sisoprega;

DROP TABLE IF EXISTS ctrl_feed_order CASCADE;

CREATE TABLE ctrl_feed_order(
	order_id SERIAL PRIMARY KEY,
	reception_id integer NOT NULL REFERENCES ctrl_reception(reception_id),
	feed_date date NOT NULL,
	feed_originator varchar(150),
	handling varchar(100)
);

GRANT ALL ON ctrl_feed_order TO sisoprega;
GRANT ALL ON ctrl_feed_order_order_id_seq TO sisoprega;

DROP TABLE IF EXISTS ctrl_feed_order_barnyard CASCADE;

CREATE TABLE ctrl_feed_order_barnyard(
	feed_ord_barn_id SERIAL PRIMARY KEY,
	order_id integer NOT NULL REFERENCES ctrl_feed_order(order_id) ON DELETE CASCADE,
	barnyard_id integer NOT NULL REFERENCES cat_barnyard(barnyard_id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX U_feed_order_barnyard ON ctrl_feed_order_barnyard(order_id, barnyard_id);

GRANT ALL ON ctrl_feed_order_barnyard TO sisoprega;
GRANT ALL ON ctrl_feed_order_barnyard_feed_ord_barn_id_seq TO sisoprega;

DROP TABLE IF EXISTS cat_food CASCADE;
CREATE TABLE cat_food(
	food_id SERIAL PRIMARY KEY,
	food_name VARCHAR(15)
);

GRANT ALL ON cat_food TO sisoprega;
GRANT ALL ON cat_food_food_id_seq TO sisoprega;

DROP TABLE IF EXISTS ctrl_feed_order_details CASCADE;
CREATE TABLE ctrl_feed_order_details(
	id SERIAL PRIMARY KEY,
	order_id integer NOT NULL REFERENCES ctrl_feed_order(order_id) ON DELETE CASCADE,
	food_id integer NOT NULL REFERENCES cat_food(food_id),
	quantity DECIMAL(10,2) NOT NULL DEFAULT 0.0
);

CREATE UNIQUE INDEX U_feed_order_food ON ctrl_feed_order_details(order_id, food_id);

GRANT ALL ON ctrl_feed_order_details TO sisoprega;
GRANT ALL ON ctrl_feed_order_details_id_seq TO sisoprega;

/*
  Table structure for table ctrl_receptions_inspections 
*/

DROP TABLE IF EXISTS ctrl_inspection CASCADE;

CREATE TABLE ctrl_inspection (
  inspection_id SERIAL PRIMARY KEY,
  reception_id integer NOT NULL REFERENCES ctrl_reception(reception_id),
  inspection_date date NOT NULL
);

GRANT ALL ON ctrl_inspection TO sisoprega;
GRANT ALL ON ctrl_inspection_inspection_id_seq TO sisoprega;

/*
 Table structure for table ctrl_receptions_inspections_barnyards
 */
DROP TABLE IF EXISTS ctrl_inspection_barnyard CASCADE;

CREATE TABLE ctrl_inspection_barnyard (
  id SERIAL PRIMARY KEY,
  inspection_id integer NOT NULL REFERENCES ctrl_inspection(inspection_id),
  barnyard_id integer NOT NULL REFERENCES cat_barnyard(barnyard_id)
);

CREATE UNIQUE INDEX U_inspection_barnyard ON ctrl_inspection_barnyard(inspection_id, barnyard_id);

GRANT ALL ON ctrl_inspection_barnyard TO sisoprega;
GRANT ALL ON ctrl_inspection_barnyard_id_seq TO sisoprega;

DROP TABLE IF EXISTS cat_inspection_code CASCADE;

CREATE TABLE cat_inspection_code(
  inspection_code_id SERIAL PRIMARY KEY,
  inspection_code_description VARCHAR(50)
);

GRANT ALL ON cat_inspection_code TO sisoprega;
GRANT ALL ON cat_inspection_code_inspection_code_id_seq TO sisoprega;

DROP TABLE IF EXISTS ctrl_inspection_result CASCADE;
CREATE TABLE ctrl_inspection_result(
	id SERIAL PRIMARY KEY,
	inspection_id integer NOT NULL REFERENCES ctrl_inspection(inspection_id),
	inspection_code_id integer NOT NULL REFERENCES cat_inspection_code(inspection_code_id),
	hc integer NOT NULL,
	weight decimal(12,4),
	weight_uom integer NOT NULL REFERENCES cat_measurement_unit(unit_id),
	note varchar(100)
);

GRANT ALL ON ctrl_inspection_result TO sisoprega;
GRANT ALL ON ctrl_inspection_result_id_seq TO sisoprega;

DROP TABLE IF EXISTS ctrl_inspection_forecast CASCADE;
CREATE TABLE ctrl_inspection_forecast(
	id SERIAL PRIMARY KEY,
	forecast_date DATE not null default CURRENT_DATE
);

GRANT ALL ON ctrl_inspection_forecast TO sisoprega;
GRANT ALL ON ctrl_inspection_forecast_id_seq TO sisoprega;

DROP TABLE IF EXISTS ctrl_inspection_forecast_detail CASCADE;
CREATE TABLE ctrl_inspection_forecast_detail(
	id SERIAL PRIMARY KEY,
	forecast_id integer NOT NULL REFERENCES ctrl_inspection_forecast(id) ON DELETE CASCADE,
	rancher_id integer NOT NULL REFERENCES cat_rancher(rancher_id),
	auth varchar(10),
	origin varchar(20),
	cattle_type integer NOT NULL REFERENCES cat_cattle_type(cattype_id),
	quantity integer not null
);

GRANT ALL ON ctrl_inspection_forecast_detail TO sisoprega;
GRANT ALL ON ctrl_inspection_forecast_detail_id_seq TO sisoprega;

DROP TABLE IF EXISTS ctrl_inspection_forecast_barnyard;
CREATE TABLE ctrl_inspection_forecast_barnyard(
	id SERIAL PRIMARY KEY,
	detail_id integer NOT NULL REFERENCES ctrl_inspection_forecast_detail(id) ON DELETE CASCADE,
	barnyard_id integer NOT NULL REFERENCES cat_barnyard(barnyard_id)
);

GRANT ALL ON ctrl_inspection_forecast_barnyard TO sisoprega;
GRANT ALL ON ctrl_inspection_forecast_barnyard_id_seq TO sisoprega;

CREATE OR REPLACE VIEW vw_rancher AS
SELECT 
  rancher_id, 
  first_name || ' ' || last_name AS rancher_name 
FROM 
  cat_person_rancher 
UNION (SELECT 
  enterprise_id AS rancher_id, 
  legal_name AS rancher_name 
FROM cat_enterprise_rancher)
ORDER BY rancher_name;

GRANT ALL ON vw_rancher TO sisoprega;
