/*
 * The database script is executed in mysql command line:
 * psql -d sisoprega -f /path/to/deploy/pg_sisoprega_I1.sql
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
 * 01/29/2013  Diego Torres                  Add rancher user.
 * 01/29/2013  Alfredo Pacheco               Index rancher_id removed from cat_rancher_invoice.
 * 02/01/2013  Alfredo Pacheco               cat_rancher_invoice.rancher_id now references cat_rancher.rancher_id
 * 02/02/2013  Diego Torres                  sys_sisoprega_role.record_id provides a unique id for data model.
 * 02/07/2013  Diego Torres                  add table for document management (pedimentos)
 * 02/11/2013  Diego Torres                  Changing cat_location for cat_zone
 * 02/16/2013  Alfredo Pacheco		     zone_id field added to cat_reception
 * 02/16/2013  Alfredo Pacheco		     zone_id field added to ctrl_inspection_forecast_detail
 * 03/05/2013  Diego Torres                  adding table for print app.
 * 03/13/2013  Alfredo Pacheco               Three phones by rancher, and sms_phone_chosen fields added.
 * 04/06/2013  Diego Torres                  Adding tables for I2
 * 05/08/2013  Diego Torres                  Adding zones for I2: 3 = West; 4 = East
 * 06/30/2013  Diego Torres                  Cascade and trigger for rancher users.
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
	user_name varchar(30) NOT NULL PRIMARY KEY,
	user_password varchar(32) NOT NULL
);
 
GRANT ALL ON sys_sisoprega_user TO sisoprega;
 
DROP TABLE IF EXISTS sys_sisoprega_role CASCADE;
CREATE TABLE sys_sisoprega_role(
    record_id SERIAL PRIMARY KEY,
	user_name varchar(30) NOT NULL REFERENCES sys_sisoprega_user(user_name) ON DELETE CASCADE ON UPDATE CASCADE,
	role_name varchar(20) NOT NULL
);

GRANT ALL ON sys_sisoprega_user to sisoprega;
GRANT ALL ON sys_sisoprega_role to sisoprega;
GRANT ALL ON sys_sisoprega_role_record_id_seq to sisoprega;
 
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
  telephone VARCHAR(20),
  telephone_2 VARCHAR(20),
  telephone_3 VARCHAR(20),
  sms_phone_chosen integer
);

CREATE UNIQUE INDEX U_cat_person_rancher ON cat_person_rancher (first_name, last_name, mother_name);

GRANT ALL ON cat_person_rancher TO sisoprega;

DROP TABLE IF EXISTS cat_enterprise_rancher CASCADE;

CREATE TABLE cat_enterprise_rancher(
  enterprise_id integer PRIMARY KEY,
  legal_name VARCHAR(100) NOT NULL,
  address_one VARCHAR(100),
  address_two VARCHAR(100),
  city VARCHAR(80),
  address_state VARCHAR(80),
  zip_code VARCHAR(9),
  legal_id VARCHAR(13),
  telephone VARCHAR(20),
  telephone_2 VARCHAR(20),
  telephone_3 VARCHAR(20),
  sms_phone_chosen integer,
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

DROP TABLE IF EXISTS cat_rancher_user CASCADE;
CREATE TABLE cat_rancher_user(
  record_id SERIAL PRIMARY KEY,
  rancher_id integer NOT NULL REFERENCES cat_rancher(rancher_id) ON DELETE CASCADE,
  user_name VARCHAR(30) NOT NULL REFERENCES sys_sisoprega_user(user_name) ON DELETE CASCADE
);

DROP TRIGGER rancher_user_delete_trigger ON cat_rancher_user;
CREATE OR REPLACE FUNCTION proc_rancher_user_delete() RETURNS TRIGGER AS
$proc$
BEGIN
	DELETE FROM sys_sisoprega_user
	WHERE user_name = Old.user_name;
	
	Return NULL;
END;
$proc$ LANGUAGE 'plpgsql';

CREATE TRIGGER rancher_user_delete_trigger
AFTER DELETE ON cat_rancher_user
FOR EACH ROW
EXECUTE PROCEDURE proc_rancher_user_delete();

CREATE UNIQUE INDEX U_rancher_user ON cat_rancher_user(rancher_id, user_name);

GRANT ALL ON cat_rancher_user TO sisoprega;
GRANT ALL ON cat_rancher_user_record_id_seq TO sisoprega;

DROP TABLE IF EXISTS cat_rancher_invoice CASCADE;

CREATE TABLE cat_rancher_invoice (
  rancher_invoice_id  SERIAL PRIMARY KEY,
  rancher_id integer NOT NULL REFERENCES cat_rancher(rancher_id) ON DELETE CASCADE,
  legal_name VARCHAR(100) NOT NULL,
  address_one VARCHAR(100) NOT NULL,
  address_two VARCHAR(100),
  city VARCHAR(80) NOT NULL,
  address_state VARCHAR(80) NOT NULL,
  zip_code VARCHAR(9) NOT NULL,
  legal_id VARCHAR(13) NOT NULL
);

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

/*
  Table structure for table cat_location 
  Handles country states
  */
DROP TABLE IF EXISTS cat_location CASCADE;

CREATE TABLE cat_location (
  location_id SERIAL PRIMARY KEY,
  location_name VARCHAR(50) NOT NULL
);

GRANT ALL ON cat_location TO sisoprega;
GRANT ALL ON cat_location_location_id_seq TO sisoprega;


/*
  Handles barnyard zones.
*/

DROP TABLE IF EXISTS cat_zone CASCADE;

CREATE TABLE cat_zone(
  zone_id SERIAL PRIMARY KEY,
  zone_name VARCHAR(50) NOT NULL
);

GRANT ALL ON cat_zone TO sisoprega;
GRANT ALL ON cat_zone_zone_id_seq TO sisoprega;

/*
 DEFAULT DATA FOR LOCATIONS
 */

INSERT INTO cat_zone(zone_name) VALUES('Chihuahua');
INSERT INTO cat_zone(zone_name) VALUES('Zona Sur');
-- I2 Zones 3 = West, 4 = East
INSERT INTO cat_zone(zone_name) VALUES('West');
INSERT INTO cat_zone(zone_name) VALUES('East');

/*
 Table structure for table cat_barnyards
*/

DROP TABLE IF EXISTS cat_barnyard CASCADE;

CREATE TABLE cat_barnyard (
  barnyard_id SERIAL PRIMARY KEY,
  barnyard_code VARCHAR(3) NOT NULL,
  available BOOLEAN NOT NULL DEFAULT TRUE,
  zone_id integer NOT NULL REFERENCES cat_zone(zone_id)
);

CREATE UNIQUE INDEX U_barnyard_code ON cat_barnyard(barnyard_code, zone_id);

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

/*Table structure for table ctrl_receptions */

DROP TABLE IF EXISTS ctrl_reception CASCADE;

CREATE TABLE ctrl_reception (
  reception_id SERIAL PRIMARY KEY,
  rancher_id integer NOT NULL REFERENCES cat_rancher(rancher_id),
  date_allotted date NOT NULL,
  cattle_type integer NOT NULL REFERENCES cat_cattle_type(cattype_id),
  location_id integer NOT NULL REFERENCES cat_location(location_id),
  zone_id integer NOT NULL REFERENCES cat_zone(zone_id)
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
	feed_date timestamp without time zone NOT NULL DEFAULT now(),
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
  inspection_date date NOT NULL,
  comments text,
  weight decimal(12,4),
  weight_uom integer default 1 REFERENCES cat_measurement_unit(unit_id)
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
	zone_id integer NOT NULL REFERENCES cat_zone(zone_id),
	auth varchar(10),
	origin integer NOT NULL,
	cattle_type integer NOT NULL REFERENCES cat_cattle_type(cattype_id),
	quantity integer not null,
	UNIQUE (forecast_id, rancher_id, zone_id, auth, origin, cattle_type, quantity)
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

/* *************************************************************
I2 Tables.
   ************************************************************ */
DROP TABLE IF EXISTS ctrl_hermana CASCADE;
CREATE TABLE ctrl_hermana(
	hermana_id SERIAL PRIMARY KEY,
	entry_no   VARCHAR(10) UNIQUE NOT NULL,
	ref_no     VARCHAR(10) UNIQUE NOT NULL,
	consignee  VARCHAR(80),
	account_of VARCHAR(80),
	rancher_id integer NOT NULL REFERENCES cat_rancher(rancher_id),
	hermana_by varchar(50),
	de_when    timestamp DEFAULT current_timestamp
);

GRANT ALL ON ctrl_hermana TO sisoprega;
GRANT ALL ON ctrl_hermana_hermana_id_seq TO sisoprega;

DROP TABLE IF EXISTS cat_cattle_quality CASCADE;
CREATE TABLE cat_cattle_quality(
	quality_id    SERIAL PRIMARY KEY,
	quality_name  VARCHAR(20) UNIQUE NOT NULL,
	min_weight    decimal(12,4) NOT NULL DEFAULT 0,
	max_weight    decimal(12,4) NOT NULL DEFAULT 0,
	for_horses    boolean DEFAULT FALSE
);

GRANT ALL ON cat_cattle_quality TO sisoprega;
GRANT ALL ON cat_cattle_quality_quality_id_seq TO sisoprega;


DROP TABLE IF EXISTS ctrl_hermana_corte_exportador CASCADE;
CREATE TABLE ctrl_hermana_corte_exportador(
	corte_expo      SERIAL PRIMARY KEY,
	hermana_id      integer NOT NULL REFERENCES ctrl_hermana(hermana_id),
	quality_id      integer NOT NULL REFERENCES cat_cattle_quality(quality_id),
	purchase_price  money NOT NULL DEFAULT 0.0
);

GRANT ALL ON ctrl_hermana_corte_exportador TO sisoprega;
GRANT ALL ON ctrl_hermana_corte_exportador_corte_expo_seq TO sisoprega;

DROP TABLE IF EXISTS ctrl_hermana_corte CASCADE;
CREATE TABLE ctrl_hermana_corte(
	corte       SERIAL PRIMARY KEY,
	hermana_id  integer NOT NULL REFERENCES ctrl_hermana(hermana_id),
	barnyard_id integer NOT NULL REFERENCES cat_barnyard(barnyard_id),
	quality_id  integer NOT NULL REFERENCES cat_cattle_quality(quality_id),
	corte_expo  integer NOT NULL REFERENCES ctrl_hermana_corte_exportador(corte_expo),
	heads       integer not null,
	weight      decimal(12,4) not null
);

GRANT ALL ON ctrl_hermana_corte TO sisoprega;
GRANT ALL ON ctrl_hermana_corte_corte_seq TO sisoprega;

DROP TABLE IF EXISTS cat_expense_concept CASCADE;
CREATE TABLE cat_expense_concept(
	concept_id      SERIAL PRIMARY KEY,
	concept_name    VARCHAR(30) UNIQUE NOT NULL,
	expense_formula VARCHAR(50)
);

GRANT ALL ON cat_expense_concept TO sisoprega;
GRANT ALL ON cat_expense_concept_concept_id_seq TO sisoprega;

DROP TABLE IF EXISTS ctrl_hermana_expense CASCADE;
CREATE TABLE ctrl_hermana_expense(
	expense_id   SERIAL PRIMARY KEY,
    concept_id  integer NOT NULL REFERENCES cat_expense_concept(concept_id),
	hermana_id  integer NOT NULL REFERENCES ctrl_hermana(hermana_id),
	amount      decimal(12,2) NOT NULL
);

DROP TABLE IF EXISTS cat_seller CASCADE;
CREATE TABLE cat_seller(
	seller_id    SERIAL PRIMARY KEY,
	seller_name  varchar(80) UNIQUE NOT NULL,
	address_one  varchar(250),
	address_two  varchar(250),
	city         varchar(80),
	address_state varchar(80),
	zip_code varchar(20),
	phone varchar(20),
	email varchar(150)
);

GRANT ALL ON cat_seller TO sisoprega;
GRANT ALL ON cat_seller_seller_id_seq TO sisoprega;

DROP TABLE IF EXISTS ctrl_purchase CASCADE;
CREATE TABLE ctrl_purchase(
	purchase_id    SERIAL PRIMARY KEY,
	seller_id      integer NOT NULL REFERENCES cat_seller(seller_id),
	cattype_id     integer NOT NULL REFERENCES cat_cattle_type(cattype_id)
);

GRANT ALL ON ctrl_purchase TO sisoprega;
GRANT ALL ON ctrl_purchase_purchase_id_seq TO sisoprega;

DROP TABLE IF EXISTS ctrl_purchase_detail CASCADE;
CREATE TABLE ctrl_purchase_detail(
	record_id    SERIAL PRIMARY KEY,
	barnyard_id  integer NOT NULL REFERENCES cat_barnyard(barnyard_id),
	quality_id   integer NOT NULL REFERENCES cat_cattle_quality(quality_id),
	heads        integer not null,
	weight       decimal(12,4) not null
);

DROP TABLE IF EXISTS ctrl_print_queue CASCADE;