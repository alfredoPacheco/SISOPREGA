/*
 * The database script is executed in mysql command line:
 * ./ /path/to/sisoprega.sql
 * 
 * Revision History:
 * 
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 10/20/2012  Alan del Rios                 Initial Version.
 * 11/01/2012  Diego Torres                  Adaptable for script execution in command
 *                                           line.
 * ====================================================================================
 * 
 * Author: Alan del Rio
 *  
 */
CREATE DATABASE IF NOT EXISTS sisoprega;
USE sisoprega;

/*
  Table structure for table cat_location 
  */
DROP TABLE IF EXISTS cat_location;

CREATE TABLE cat_location (
  location_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  location_name VARCHAR(50) NOT NULL,
  PRIMARY KEY (location_id)
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
  banyard_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  banyard_code VARCHAR(3) NOT NULL,
  available BOOLEAN NOT NULL DEFAULT TRUE,
  location_id SMALLINT UNSIGNED NOT NULL REFERENCES cat_location(location_id),
  PRIMARY KEY (banyard_id),
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
  catclass_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  catclass_name VARCHAR(50) NOT NULL,
  PRIMARY KEY (catclass_id)
);

INSERT INTO cat_cattle_class(catclass_name) VALUES('Vacuno');
INSERT INTO cat_cattle_class(catclass_name) VALUES('Bobino');


/* 
  Table structure for table cat_banyard_capacity.
  it is pretendable to have different capacities by
  cattle type.
*/
DROP TABLE IF EXISTS cat_banyard_capacity;

CREATE TABLE cat_banyard_capacity (
  capacity_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  banyard_id SMALLINT UNSIGNED NOT NULL REFERENCES cat_banyard(banyard_id) ON DELETE CASCADE,
  catclass_id SMALLINT UNSIGNED NOT NULL REFERENCES cat_cattle_class(catclass_id) ON DELETE CASCADE,
  head_count SMALLINT UNSIGNED NOT NULL DEFAULT 50,
  PRIMARY KEY (capacity_id),
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
  cattype_id SMALLINT unsigned NOT NULL AUTO_INCREMENT,
  catclass_id SMALLINT UNSIGNED NOT NULL REFERENCES cat_cattle_class(catclass_id),
  cattype_name VARCHAR(50) NOT NULL,
  PRIMARY KEY (cattype_id)
);

INSERT INTO cat_cattle_type(catclass_id, cattype_name) VALUES(1, 'Novillos');
INSERT INTO cat_cattle_type(catclass_id, cattype_name) VALUES(1, 'Vaquillas');
INSERT INTO cat_cattle_type(catclass_id, cattype_name) VALUES(2, 'Caballos');
INSERT INTO cat_cattle_type(catclass_id, cattype_name) VALUES(2, 'Yeguas');

/*
 Table structure for table cat_country
 */

DROP TABLE IF EXISTS cat_country;
CREATE TABLE cat_country (
  country_id SMALLINT unsigned NOT NULL AUTO_INCREMENT,
  country_name VARCHAR(50) NOT NULL,
  PRIMARY KEY (country_id)
);

INSERT INTO cat_country(country_name) VALUES('Mexico');
INSERT INTO cat_country(country_name) VALUES('Estados Unidos');

/*Table structure for table cat_countries_states */
DROP TABLE IF EXISTS cat_country_state;

CREATE TABLE cat_country_state (
  state_id SMALLINT unsigned NOT NULL AUTO_INCREMENT,
  country_id SMALLINT unsigned NOT NULL REFERENCES cat_country(country_id),
  state_name VARCHAR(50) NOT NULL,
  state_code VARCHAR(3),
  PRIMARY KEY (state_id),
  UNIQUE KEY U_countryid_statename (country_id,state_name)
);

/*
 States data sample.
*/
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Aguascalientes', 'AGU', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Baja California', 'BCN', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Baja California Sur', 'BCS', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Campeche', 'CAM', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Chiapas', 'CHP', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Chihuahua', 'CHH', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Coahuila', 'COA', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Colima', 'COL', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Distrito Federal', 'DIF', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Durango', 'DUR', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Guanajuato', 'GUA', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Guerrero', 'GRO', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Hidalgo', 'HID', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Jalisco', 'JAL', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Estado de Mexico', 'MEX', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Michoacan', 'MIC', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Morelos', 'MOR', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Nayarit', 'NAY', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Nuevo Leon', 'NLE', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Oaxaca', 'OAX', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Puebla', 'PUE', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Queretaro', 'QUE', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Quintana Roo', 'ROO', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('San Luis Potosi', 'SLP', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Sinaloa', 'SIN', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Sonora', 'SON', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Tabasco', 'TAB', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Tamaulipas', 'TAM', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Tlaxcala', 'TLA', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Veracruz', 'VER', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Yucatan', 'YUC', 1);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Zacatecas', 'ZAC', 1);

INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Alabama', 'AL', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Alaska', 'AK', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Arizona', 'AZ', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Arkansas', 'AR', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('California', 'CA', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Colorado', 'CO', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Connecticut', 'CT', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Delaware', 'DE', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('District of Columbia', 'DC', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Florida', 'FL', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Georgia', 'GA', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Hawaii', 'HI', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Idaho', 'ID', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Illinois', 'IL', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Indiana', 'IN', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Iowa', 'IA', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Kansas', 'KS', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Kentucky', 'KY', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Louisiana', 'LA', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Maine', 'ME', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Maryland', 'MD', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Massachusetts', 'MA', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Michigan', 'MI', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Minnesota', 'MN', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Mississippi', 'MS', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Missouri', 'MO', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Montana', 'MT', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Nebraska', 'NE', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Nevada', 'NV', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('New Hampshire', 'NH', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('New Jersey', 'NJ', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('New Mexico', 'NM', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('New York', 'NY', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('North Carolina', 'NC', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('North Dakota', 'ND', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Ohio', 'OH', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Oklahoma', 'OK', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Oregon', 'OR', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Pennsylvania', 'PA', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Rhode Island', 'RI', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('South Carolina', 'SC', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('South Dakota', 'SD', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Tennessee', 'TN', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Texas', 'TX', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Utah', 'UT', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Vermont', 'VT', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Virginia', 'VA', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Washington', 'WA', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('West Virginia', 'WV', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Wisconsin', 'WI', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Wyoming', 'WY', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('American Samoa', 'AS', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Guam', 'GU', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Northern Mariana Islands', 'MP', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Puerto Rico', 'PR', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Virgin Islands', 'VI', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Federated States of Micronesia', 'FM', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Marshall Islands', 'MH', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Palau', 'PW', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Armed Forces AA', 'AA', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Armed Forces AE', 'AE', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Armed Forces AP', 'AP', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Canal Zone', 'CZ', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Philippine Islands', 'PI', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Trust Territory of the Pacific Islands', 'TT', 2);
INSERT INTO cat_country_state(state_name, state_code, country_id) VALUES('Commonwealth of the Northern Mariana Islands', 'CM', 2);


/*Table structure for table cat_countries_states_cities */

DROP TABLE IF EXISTS cat_country_state_city;
CREATE TABLE cat_country_state_city (
  city_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  state_id SMALLINT UNSIGNED NOT NULL REFERENCES cat_country_state(state_id),
  city_name VARCHAR(50) NOT NULL,
  area_code VARCHAR(3),
  PRIMARY KEY (city_id)
);

INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(1, 'Aguascalientes', '449');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(1, 'Amarillas de Esparza (Amarillas)', '496');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(1, 'Asientos', '496');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(1, 'Calvillo', '495');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(1, 'Cienaga Grande', '496');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(1, 'Cosio', '458');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(1, 'Emiliano Zapata', '465');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(1, 'General Ignacio Zaragoza (Venadero)', '449');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(1, 'Gral. J. Ma. Morelos y Pavon (Cañada Honda)', '449');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(1, 'Jaltiche de Abajo', '495');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(1, 'Jaltomate', '449');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(1, 'Jesus Maria', '449');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(1, 'La Panadera', '495');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(1, 'La Punta', '458');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(1, 'Malpaso', '495');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(1, 'Pabellon de Arteaga', '465');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(1, 'Pabellon de Hidalgo', '465');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(1, 'Palo Alto', '496');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(1, 'Peñuelas (El Cienegal)', '449');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(1, 'Pilotos', '496');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(1, 'Rincon de Romos', '465');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(1, 'San Francisco de los Romo', '465');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(1, 'San Ignacio', '449');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(1, 'San Jose de Gracia', '465');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(1, 'San Tadeo', '495');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(1, 'Tepezala', '465');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(1, 'Valladolid', '449');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Alfredo B. Bonfil', '616');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Bajamar', '646');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Benito Juarez (Tecolotes)', '658');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Camalu', '616');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Ciudad Morelos (Cuervos)', '658');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Colonia Benito Garcia (El Zorrillo)', '646');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Colonia La Puerta', '686');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Colonia Vicente Guerrero', '616');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Chihuahua', '686');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Delta (Estacion Delta)', '686');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Durango', '686');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Ejido 27 de Enero', '616');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Ejido Chiapas 1', '658');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Ejido Distrito Federal', '658');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Ejido Dr. Alberto Oviedo Mota (El Indiviso)', '658');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Ejido General Leandro Valle', '616');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Ejido Guadalajara', '658');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Ejido Guanajuato', '686');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Ejido Jose Maria Morelos', '616');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Ejido Lazaro Cardenas', '658');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Ejido Monterrey (Colonia Bataquez)', '658');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Ejido Ojo de Agua', '664');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Ejido Queretaro', '658');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Ejido Quintana Roo', '658');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Ejido Sanson Flores', '686');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Ejido Sinaloa', '686');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Ejido Yucatan', '658');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'El Descanso', '665');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'El Hongo', '665');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'El Porvenir Guadalupe', '646');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'El Rosario', '616');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'El Sauzal', '646');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Ensenada', '646');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Erendira', '646');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Estacion Coahuila (Km 57)', '653');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Francisco R. Serrano (Valle San Matias)', '646');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Guadalupe Victoria (Km 43)', '658');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Hermosillo', '658');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Heroes de la Independencia', '646');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Ingeniero Francisco Murguia (Km. 49)', '658');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Isla de Cedros', '616');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Islas Agrarias Grupo A', '686');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Islas Agrarias Grupo B', '686');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Jalapa', '686');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'La Bufadora', '646');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Lazaro Cardenas (Valle de la Trinidad)', '646');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Maneadero', '646');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Marena Cove', '661');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Merida', '658');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Mexicali', '686');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Michoacan de Ocampo', '686');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Mision', '646');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Nacionalista de Sanchez Taboada', '646');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Nayarit Llamada', '686');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Nuevo Leon', '686');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Ojos Negros Real del Castillo', '646');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Paredones', '658');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Poblado Heroes de Chapultepec', '616');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Popotla', '661');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Primo Tapia', '661');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Puebla', '686');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Punta Banda (El Rincon de Punta Banda)', '646');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Punta Colonet', '616');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Republica Mexicana', '658');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Rosarito (Campo 30-06)', '661');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Ruben Jaramillo', '616');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Rumorosa', '686');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Saltillo', '658');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'San Antonio del Mar', '664');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'San Felipe', '686');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'San Quintin', '616');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'San Vicente', '646');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Santo Tomas', '646');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Tecate', '665');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Tijuana', '664');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Uruapan', '646');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Valle de la Trinidad', '646');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Valle de las Palmas', '646');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Venustiano Carranza (Santa Maria)', '616');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Vicente Guerrero (Algodones)', '658');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Villa Alberto A. Alvarado A. (El Fundo Legal)', '615');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Villa de Juarez (San Antonio de las Minas)', '646');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(2, 'Villa Hermosa', '658');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(3, 'Gustavo Diaz Ordaz (Vizcaino)', '615');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(3, 'Bahia Tortugas', '615');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(3, 'Buena Vista', '624');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(3, 'Cabo del Sol', '624');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(3, 'Cabo Real', '624');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(3, 'Cabo San Lucas', '624');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(3, 'Ciudad Constitucion', '613');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(3, 'Chametla', '612');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(3, 'Estero de la Bocana', '615');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(3, 'Guerrero Negro', '615');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(3, 'La Paz', '612');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(3, 'La Ribera', '624');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(3, 'Las Lagunitas', '624');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(3, 'Loreto', '613');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(3, 'Miraflores', '624');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(3, 'Mulege (Mulege)', '615');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(3, 'Nopolo', '613');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(3, 'Puerto Adolfo Lopez Mateos', '613');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(3, 'Puerto San Carlos', '613');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(3, 'Punta Abreojos', '615');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(3, 'San Ignacio', '615');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(3, 'San Jose del Cabo', '624');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(3, 'San Jose Viejo', '624');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(3, 'Santa Rosalia', '615');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(3, 'Santiago', '624');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(3, 'Todos Santos', '612');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(3, 'Villa Insurgentes', '613');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(4, 'Alfredo B. Bonfil', '981');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(4, 'Becal', '996');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(4, 'Calkini', '996');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(4, 'Campeche', '981');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(4, 'Candelaria', '982');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(4, 'Ciudad del Carmen', '938');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(4, 'Champoton', '982');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(4, 'China', '981');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(4, 'Division del Norte', '982');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(4, 'Dzibalchen', '996');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(4, 'Dzitbalche', '996');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(4, 'Escarcega', '982');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(4, 'Hecelchakan', '996');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(4, 'Hopelchen', '996');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(4, 'Isla Aguada', '982');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(4, 'Ley Federal de Reforma Agraria', '982');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(4, 'Nuevo Progreso', '938');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(4, 'Palizada', '913');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(4, 'Pomuch', '996');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(4, 'Sabancuy', '982');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(4, 'Seybaplaya', '982');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(4, 'Sihochac', '982');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(4, 'Tenabo', '996');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(4, 'Xpujil', '983');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Guadalupe Victoria (Mp.Asencion)', '636');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Abraham Gonzalez', '659');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Areponapuchi', '635');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Baborigame', '649');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Bachiniva', '659');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Batopilas', '649');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Benito Juarez (Mpio.Buenaven', '636');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Bocoyna', '635');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Buenos Aires', '636');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Campo 303', '659');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Campo 305 ( Jagueyes )', '659');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Campo Menonita Numero 106', '625');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Campo Numero Ciento Uno Viejo', '625');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Campo Numero Cientosiete', '625');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Campo Numero Ocho', '625');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Campo Numero Seis y Medio B', '625');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Campo Numero Veinte', '625');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Campo Numero Veintidos', '625');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Carichi', '635');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Casa de Janos', '636');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Casas Grandes', '636');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Ciudad Camargo', '648');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Ciudad Cuauhtemoc', '625');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Ciudad Delicias', '639');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Ciudad Jimenez', '629');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Ciudad Juarez', '656');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Ciudad Madera', '652');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Colonia Alvaro Obregon (Rubio)', '625');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Colonia Anahuac', '625');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Colonia Campesina', '639');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Colonia Juarez', '636');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Colonia Le Baron', '636');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Colonia Madero', '636');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Coyame', '626');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Creel', '635');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Chihuahua', '614');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Doctor Porfirio Parra (La Caseta)', '656');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Ejido B.Juarez (Mpio.Namiquipa)', '659');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Ejido Constitucion', '636');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Ejido El Largo', '652');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'El Molino', '659');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'El Porvenir (Mpio. Bachiniva)', '659');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'El Porvenir (Mpio. Praxedis G.)', '656');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'El Sauz', '614');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'El Tule', '649');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'El Vergel (Ejido El Vergel)', '649');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Escalon', '629');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'G.Rodrigo M. Quevedo (Pto.Palomas)', '656');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Galeana', '636');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Guachochi', '649');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Guadalupe Distrito Bravos', '656');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Guadalupe Victoria (Mp.Meoqui)', '639');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Guadalupe y Calvo', '649');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Hidalgo (Ejido Hidalgo)', '636');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Ignacio Allende', '636');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Ignacio Zaragoza', '636');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Independencia (Cologachi)', '659');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Janos', '636');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Julimes', '621');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'La Ascension', '636');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'La Boquilla del Conchos', '648');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'La Cruz', '648');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'La Junta', '635');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'La Norteña', '652');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'La Paz', '625');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'La Perla', '648');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Las Varas', '639');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Las Virginias', '636');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Lazaro Cardenas (Mp.Cuauhtemoc)', '625');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Lazaro Cardenas (Mpio Meoqui)', '639');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Lic. Adolfo Lopez Mateos', '635');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Manuel Benavides', '626');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Manuel Ojinaga', '626');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Mariano Matamoros', '628');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Matachic', '659');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Miguel Ahumada', '656');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Monte Verde (El Coyote)', '636');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Naica', '621');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Nicolas Bravo', '652');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Nonoava', '635');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Nueva Madera', '652');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Nuevo Casas Grandes', '636');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Oscar Soto Maynez', '659');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Parral', '627');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Pascual Orozco (San Isidro)', '635');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Pedro Meoqui', '639');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Peña Blanca', '652');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Praxedis G. Guerrero', '656');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Pueblito de Allende', '628');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Ricardo Flores Magon (El Carmen)', '636');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Rodrigo M. Quevedo', '636');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Samalayuca', '656');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'San Buenaventura', '636');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'San Francisco de Borja', '635');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'San Francisco de Conchos', '648');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'San Francisco del Oro', '628');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'San Isidro (Rio Grande)', '656');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'San Jose Babicora', '652');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'San Juanito', '635');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'San Lorenzo (Mp.Buenaventura)', '636');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'San Lorenzo (Mp.Dr.Belisario D)', '625');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'San Nicolas de Carretas', '625');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'San Pablo Balleza', '649');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'San Rafael', '635');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Santa Barbara de Tutuaca (Tutuaca)', '625');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Santa Barbara', '628');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Santa Cruz de Rosales', '639');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Santa Eulalia', '614');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Santa Gertrudis (La Hacienda)', '621');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Santa Isabel', '614');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Santa Rosalia de Cuevas', '625');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Santo Tomas', '635');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Satevo', '614');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Saucillo', '621');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Seccion Enriquez (Colonia Enriquez)', '636');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Sisoguichi', '635');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Temoris', '635');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Temosachi', '659');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Tomochi', '635');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Torreon de Cañas', '649');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Tres Alamos', '636');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Urique', '635');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Uruachi', '635');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Valentin Gomez Farias', '652');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Valle de Ignacio Allende', '628');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Valle de Zaragoza', '649');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Vicente Guerrero', '635');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Villa Ahumada y Anexas', '656');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Villa Aldama', '614');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(6, 'Villa Lopez', '629');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Acacoyagua', '918');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Acapetahua', '918');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Altamirano', '919');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Alvaro Obregon', '962');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Arriaga', '966');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Berriozabal', '961');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Bochil', '919');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Buenos Aires(Zinacantal)', '964');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Cabeza de Toro', '994');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Cacahoatan', '962');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Catazaja', '916');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Cintalapa', '968');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Ciudad Cuauhtemoc', '963');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Ciudad Hidalgo', '962');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Colonia Soconusco', '918');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Comitan de Dominguez', '963');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Copainala', '968');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Corazon de Maria', '967');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Cristobal Obregon', '965');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Chamula', '967');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Chiapa de Corzo', '961');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Chicomuselo', '963');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Chilon', '919');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'El Ingenio Azucarero', '964');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'El Jobo', '961');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'El Parral', '965');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'El Rayon', '919');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'El Sabino', '961');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Escuintla', '918');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Flores Magon', '918');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Frontera Comalapa', '963');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Huehuetan', '964');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Huixtla', '964');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Ixtacomitan', '932');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Ixtapa', '961');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Jaltenango de la Paz', '992');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Jesus Maria Garza', '965');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Jiquipilas', '968');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Jitotol de Zaragoza', '919');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Juarez', '932');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'La Libertad ((Mpio. Suchiate)', '962');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'La Libertad (Mpio. La Libertad)', '934');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'La Trinitaria', '963');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Las Garzas', '917');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Las Margaritas', '963');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Lazaro Cardenas', '968');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Mapastepec', '918');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Mazatan', '964');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Metapa de Dominguez', '962');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Motozintla', '962');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Nueva Concordia', '992');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Ocosingo', '919');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Ocozocoautla', '968');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Oxchuc', '919');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Palenque', '916');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Pantelho', '919');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Paredon', '994');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Petalcingo', '919');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Pichucalco', '932');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Pijijiapan', '918');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Pueblo Nuevo Comaltitlan', '918');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Pueblo Nuevo Solistahuacan', '919');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Puerto Arista', '994');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Puerto Madero (San Benito)', '962');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Pujiltic', '992');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Rancho Nuevo', '967');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Raudales Malpaso', '968');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Reforma', '917');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Revolucion Mexicana', '965');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Salto de Agua', '916');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'San Cristobal de las Casas', '967');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'San Fernando', '961');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'San Pedro Buenavista', '965');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Simojovel', '919');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Socoltenango', '992');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Soyatitan', '992');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Suchiapa', '961');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Suchiate', '962');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Tapachula', '962');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Tapilula', '919');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Tecpatan', '968');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Tenejapa', '967');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Teopisca', '992');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Tierra y Libertad', '968');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Tila', '919');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Tonala', '966');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Tres Picos', '994');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Tuxtla Chico', '962');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Tuxtla Gutierrez', '961');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Tzimol', '963');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Union Juarez', '962');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Veinte de Noviembre', '961');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Venustiano Carranza', '992');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Villa Corzo', '965');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Villa de Acala', '961');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Villa de las Rosas', '992');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Villa Flores', '965');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(5, 'Yajalon', '919');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Abasolo', '866');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Agujita', '861');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Allende', '862');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Arteaga', '844');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Candela', '873');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Castaños', '866');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Ciudad Acuña', '877');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Cuatrocienegas', '869');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'El Coyote', '871');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Entronque Congregacion Hgo.', '871');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Francisco I. Madero', '872');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Frontera', '866');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'General Cepeda', '842');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Guerrero', '862');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Hidalgo', '867');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Jimenez', '878');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Juarez', '861');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'La Concordia (Rosita)', '872');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'La Partida', '871');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'La Paz', '871');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Laguna del Rey (Del Rey', '872');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Las Esperanzas', '864');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Lequeitio', '872');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Luchana', '872');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Matamoros', '871');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Minas de Barroteran', '864');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Monclova', '866');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Morelos', '862');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Muzquiz', '864');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Nava', '862');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Nueva Rosita', '861');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Ocampo', '869');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Palau', '864');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Parras de la Fuente', '842');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Piedras Negras', '878');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Primero de Mayo', '866');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Progreso', '861');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Ramos Arizpe', '844');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Sabinas', '861');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Saltillo', '844');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'San Buenaventura', '869');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'San Jose de Aura', '861');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'San Pedro', '872');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'San Rafael de Arriba', '872');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Santo Niño Aguanaval', '871');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Torreon', '871');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Viesca', '671');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Villa Union', '862');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(7, 'Zaragoza', '862');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(8, 'Cabañas Juluapan (Los Almendros)', '314');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(8, 'Camotlan de Miraflores', '314');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(8, 'Cerro de Ortega', '313');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(8, 'Ciudad de Armeria', '313');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(8, 'Ciudad de Villa de Alvarez', '312');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(8, 'Cofradia de Suchitlan', '318');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(8, 'Colima', '312');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(8, 'Comala', '312');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(8, 'Coquimatlan', '312');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(8, 'Cuauhtemoc', '318');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(8, 'Cuyutlan', '313');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(8, 'Chiapa', '312');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(8, 'El Colomo', '314');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(8, 'El Trapiche', '312');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(8, 'Ixtlahuacan', '313');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(8, 'Los Tepames', '312');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(8, 'Madrid', '313');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(8, 'Manzanillo', '314');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(8, 'Minatitlan', '314');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(8, 'Pueblo Juarez (La Magdalena)', '312');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(8, 'Queseria', '318');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(8, 'Rincon de Lopez', '313');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(8, 'Tecoman', '313');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(8, 'Venustiano Carranza (Cualata)', '314');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(9, 'Ciudad de Mexico', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(9, 'San Antonio Tecomitl', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(9, 'San Juan Ixtayopan', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(9, 'San Lorenzo Acopilco', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(9, 'San Miguel Ajusco', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(9, 'San Miguel Topilejo', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(9, 'San Nicolas Tetelco', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(9, 'San Pablo Oztotepec', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(9, 'San Pedro Atocpan', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(9, 'Santa Catarina Yecahuitzotl', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Abasolo', '677');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Antonio Amaro', '676');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Bermejillo', '872');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Canatlan', '677');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Canelas', '674');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Canutillo', '649');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Ceballos', '629');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Cienaga de Nuestra Señora de Guadalupe', '674');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Ciudad Lerdo', '871');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Colonia Hidalgo', '618');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Coneto de Comonfort', '677');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Cuauhtemoc', '676');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Cuencame de Ceniceros', '671');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Diez de Octubre (San Lucas de Ocampo)', '677');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Donato Guerra', '677');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Durango', '618');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Ejido Revolucion (Las Viboras)', '629');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'El Compas', '871');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'El Lucero (Arcinas)', '872');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'El Nayar', '618');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'El Salto', '675');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Emiliano Zapata', '676');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Francisco I. Madero', '677');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'General Escobedo', '649');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'General Jesus Agustin Castro (Independencia)', '676');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'General Simon Bolivar', '671');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Gomez Palacio', '871');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Gral.Felipe Carrillo Puerto', '676');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Guadalupe Victoria', '676');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Guanacevi', '674');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Guatimape', '677');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Ignacio Allende', '676');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Ignacio Ramirez', '676');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Inde', '649');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Jose Guadalupe Aguilera (Santa Lucia)', '677');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Jose Guadalupe Rodriguez (Peñuelas)', '676');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Jose Maria Morelos (Chinacates)', '674');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'La Ciudad', '675');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'La Constancia', '675');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'La Goma', '871');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'La Joya', '675');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'La Purisima', '674');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Las Nieves', '649');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Los Herrera', '674');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Llano Grande', '618');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Mapimi', '872');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Nazareno', '871');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Nazas', '671');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Nicolas Bravo', '677');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Nombre de Dios', '675');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Nuevo Ideal', '677');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Nuevo San Diego Tensaenz (El Caballo)', '674');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Otaez', '674');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Panuco de Coronado', '676');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Paso Nacional', '671');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Pedriceña (Estacion Pedriceña)', '671');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Peñon Blanco', '676');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Ramon Corona', '676');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Rodeo', '677');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'San Bernardo', '649');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'San Francisco del Mezquital', '675');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'San Jose de Tuitan (Tuitan)', '675');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'San Juan de Guadalupe', '671');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'San Juan del Rio del Centauro del Norte', '677');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'San Luis del Cordero', '671');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'San Miguel de Cruces', '674');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'San Nicolas de Presidio (Presidio de Arriba)', '674');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'San Nicolas', '674');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'San Pedro del Gallo', '671');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Santa Maria del Oro', '649');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Santiago Papasquiaro', '674');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Suchil', '675');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Tamazula de Victoria', '674');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Tayoltita', '674');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Tepehuanes', '674');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Tlahualilo de Zaragoza', '872');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Topia', '674');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Velardeña', '671');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Vencedores', '674');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Vicente Guerrero', '675');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Villa Juarez', '871');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Villa Ocampo', '649');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Villa Orestes Pereyra (Rosario)', '649');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(10, 'Villa Union', '675');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Acamixtla', '762');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Acapetlahuaya', '736');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Acapulco', '744');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Acuchillan del Progreso', '732');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Ahuacuotzingo', '756');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Ahuehuepan', '733');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Alcozauca de Guerrero', '757');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Alpoyeca', '757');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Amuco de la Reforma', '767');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Anonas', '767');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Apango', '754');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Apaxtla de Castrejon', '736');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Aratichanguio', '767');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Arcelia', '732');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Arroyo Grande', '732');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Atenango del Rio', '727');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Atliaca', '754');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Atlixtac', '756');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Atoyac de Alvarez', '742');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Ayutla de los Libres', '745');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Azoyu', '741');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Bajos del Ejido', '781');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Barra Vieja', '744');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Buenavista de Cuellar', '727');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Ciudad Altamirano', '767');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Coacoyul', '755');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Coacoyula de Alvarez', '733');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Cocula', '736');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Colotlipa', '756');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Copala', '741');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Copalillo', '727');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Coyuca de Benitez', '781');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Coyuca de Catalan', '767');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Coyuquilla Norte', '742');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Cruz Grande', '745');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Cruz Quemada', '745');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Cuajinicuilapa', '741');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Cualac', '757');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Cuetzala del Progreso', '736');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Cutzamala de Pinzon', '732');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Changata', '732');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Chaucingo', '727');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Chichihualco', '747');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Chilapa', '756');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Chilpancingo', '747');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Dos Arroyos', '744');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'El Escondido', '732');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'El Espinalillo', '781');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'El Ocotito', '745');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'El Paraiso', '742');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Guayameo', '767');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Hacienda de Cabañas', '781');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Huamuxtitlan', '757');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Huitzuco', '727');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Huixtac', '762');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Iguala', '733');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Ixcapuzalco', '736');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Ixcateopan de Cuauhtemoc', '736');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Ixtapa Zihuatanejo', '755');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Juchitan', '741');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Kilometro 30', '744');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'La Union', '755');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Las Mesas', '745');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Las Vigas', '745');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Los Sauces', '736');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Luces del Mar', '744');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Marquelia', '741');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Maxela', '733');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Mayanalan', '733');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Mazatlan', '747');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Mezcala', '733');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Mochitlan', '754');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Nuevo Balsas', '736');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Nuxco', '742');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Olinala', '756');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Ometepec', '741');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Oxtotitlan', '736');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Papanoa', '742');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Paso de Arena', '767');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Paso Morelos (Cuetlajuchi)', '727');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Petacalco', '753');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Petatlan', '758');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Pilcaya', '721');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Placeres del Oro', '767');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Quechultenango', '756');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Sabana Grande', '733');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'San Jeronimito (San Jeronimo)', '758');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'San Jeronimo de Juarez', '781');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'San Jose Poliutla', '732');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'San Juan Tetelcingo', '733');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'San Luis Acatlan', '741');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'San Luis de la Loma', '742');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'San Marcos', '745');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'San Martin Pachivia', '736');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'San Miguel Tecuixiapan', '733');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'San Miguel Totolapan', '732');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'San Nicolas', '741');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'San Vicente Palapa', '733');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Santa Ana del Aguila', '732');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Santa Teresa', '733');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Tanganhuato', '767');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Taxco', '762');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Tecoanapa', '745');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Tecpan de Galeana', '742');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Teloloapan', '736');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Temalacatzingo', '756');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Tenexpa', '742');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Tepecoacuilco de Trujano', '733');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Tepetixtla', '781');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Tetitlan', '742');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Tierra Colorada', '745');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Tixtla', '754');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Tlacoachistlahuaca', '741');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Tlacotepec', '736');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Tlalchapa', '732');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Tlalixtaquilla', '757');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Tlapa de Comonfort', '757');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Tlapehuala', '732');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Tlaxmalac', '727');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Tonalapa del Sur', '733');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Troncones (Emiliano Zapata)', '755');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Tuliman', '727');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Villa Hidalgo (El Cubo)', '732');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Villa Nicolas Bravo', '732');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Xaltianguis', '744');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Xochihuehuetlan', '757');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Xochipala', '747');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Xochistlahuaca', '741');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Zacacoyuca', '733');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Zacapalco', '727');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Zacapuato', '732');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Zacatipa', '757');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Zacualpan', '742');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Zihuatanejo', '755');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Zirandaro', '767');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(12, 'Zumpango del Rio', '747');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'La Estancia de San Jose del Carmen', '466');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Abasolo', '429');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Acambaro', '417');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Adjuntas del Rio (Las Adjunts)', '418');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Alvaro Obregon', '477');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Ameche', '442');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Apaseo El Alto', '413');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Apaseo El Grande', '413');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Arandas', '462');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Arperos', '473');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Arreguin de Abajo', '461');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Atotonilco (santuario)', '415');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Bajio de Bonillas', '472');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Buenavista de Cortes', '469');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Caleras de Ameche', '442');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Calzada del Tepozan (El Tepozan)', '432');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Cañada de Caracheo', '411');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Carrizal Grande', '462');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Celaya', '461');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Cerano (San Juan Cerano)', '438');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Cerro Gordo (San Rafael)', '464');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Ciudad Manuel Doblado', '432');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Colonia 18 de Marzo', '411');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Comanjilla', '472');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Comonfort', '412');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Coroneo', '421');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Corralejo de Hidalgo', '469');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Cortazar', '411');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Covadonga', '468');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Cueramaro', '429');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Cuevas de Morales', '352');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Cupareo', '466');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Chamacuaro', '417');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Charco de Pantoja', '462');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Chichimequillas', '472');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Chupicuaro (Nuevo Chupicuaro)', '417');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Dolores Hidalgo', '418');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Dolores', '476');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Dr. Mora', '419');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'El Capulin', '419');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'El Derramadero', '445');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'El Fresno', '461');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'El Jocoque', '413');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'El Marmol', '469');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'El Ramillete', '477');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'El Sabino', '466');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'El Sauz (El Sauz de Villaseñor)', '461');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'El Tigre', '411');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Empalme Escobedo', '412');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Franco Tavera', '412');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Frias', '432');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Guadalupe de Rivera', '462');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Guanajuato', '473');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Guarapo', '456');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Huanimaro', '429');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Huapango', '466');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Huitzatarito', '429');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Iramuco', '417');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Irapuato', '462');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Jaral de Berrios', '428');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Jaral del Progreso', '411');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Jerecuaro', '421');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Jesus Maria', '419');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Juan Lucas', '411');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Juan Martin', '461');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Juventino Rosas', '412');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'La Aldea', '472');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'La Caja', '462');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'La Calera (El Canario)', '411');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'La Cuevita', '413');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'La Encarnacion', '417');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'La Escondida', '428');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'La Joya de Calvillo', '429');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Laguna Larga', '462');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Lagunillas', '469');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Las Cañas', '462');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Las Hilamas (El Piedrero)', '477');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Las Jicamas', '462');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Leon', '477');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Lo de Juarez', '462');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Loma de Zempoala', '411');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Loreto (Teresa)', '417');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Los Frailes', '415');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Los Ocotes', '469');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Los Rodriguez', '415');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Los Sauces', '477');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Loza de los Padres (La Loza)', '477');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Maguey', '476');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Marfil', '473');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Medina', '477');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Mineral de San Pedro Pozos (Mineral de Pozos)', '442');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Moncada', '466');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Moroleon', '445');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Neutla', '412');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Nigromante', '415');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Nuevo Mexico', '472');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Obrajuelo', '417');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Ocampo', '428');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Ochomitas', '411');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Ojo de Agua de Ballesteros', '466');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Ordeñita de Barajas (Ordeña de Barajas)', '469');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Orduña de Arriba', '412');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Palo Alto de Abajo', '469');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Palo Verde', '469');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Paracuaro', '417');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Penjamo', '469');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Peralta', '429');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Piñicuaro', '445');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Plan de Ayala (Santa Rosa)', '477');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Pozos CD. Porfirio Diaz (Mineral)', '412');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Praderas de la Hacienda (Antillon)', '461');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Pueblo Nuevo', '429');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Puentecillas', '473');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Puerta de Andaracua', '456');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Purisima de Bustos', '476');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Rancho Nuevo de la Cruz', '429');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Rancho Nuevo de San Andres', '456');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Rancho Seco de Guantes', '456');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Rincon de Tamayo', '461');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Rio Laja', '418');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Romita', '432');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Salamanca', '464');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Salvatierra', '466');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'San Antonio de Mogotes', '462');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'San Cristobal (El Cerrito)', '476');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'San Cristobal de Ayala (San Cristobal)', '429');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'San Diego de la Union', '418');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'San Felipe (El Chilarillo)', '469');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'San Felipe Guanajuato', '428');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'San Francisco del Rincon', '476');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'San Gabriel (San Gabriel y San Ignacio)', '469');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'San Jose de Gracia', '411');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'San Jose de Merino', '412');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'San Jose Iturbide', '419');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'San Jose Temascatio', '464');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'San Juan de la Vega', '461');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'San Juan del Llanito', '413');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'San Luis de la Paz', '468');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'San Mateo Tocuaro (Tocuaro)', '417');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'San Miguel de Allende', '415');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'San Miguel Emenguaro (Emenguaro)', '466');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'San Miguel Octopan', '461');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'San Nicolas de la Condesa', '466');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'San Nicolas de los Agustinos', '466');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'San Pablo Casacuaran (San Pablo)', '411');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'San Pablo Pejo (San Pablo)', '466');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'San Pedro de los Naranjos', '466');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'San Pedro Tenango El Viejo', '413');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'San Roque de Montes (San Roque)', '476');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'San Roque', '462');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'San Salvador Torrecillas', '411');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Santa Catarina', '419');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Santa Monica Ozumbilla (Ozumbilla)', '411');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Santa Rosa', '411');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Santa Teresa', '473');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Santas Marias', '415');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Santiago de Cuenda', '412');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Santiago Maravatio', '466');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Sarabia', '411');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Silao', '472');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Tacubaya', '469');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Tarandacuao', '421');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Tarimoro', '466');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Tomelopitos', '462');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Uriangato', '445');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Valtierrilla', '464');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Valle de Santiago', '456');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Victoria', '419');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Villagran', '411');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Villas de Irapuato', '462');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Yuriria', '445');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Yustis', '461');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Zapote de Adjuntas', '432');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Zapote de Peralta', '429');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(11, 'Zapotitos', '411');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Acatlan', '775');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Acaxochitlan', '776');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Actopan', '772');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Agua Blanca Iturbide', '774');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Ajacuba', '778');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Alfajayucan', '738');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Almoloya', '748');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Apan', '748');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Atitalaquia', '778');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Atlapexco', '789');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Atotonilco de Tula', '778');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Atotonilco El Grande', '774');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Bomintzha', '773');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Calnali', '774');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Caltimacan', '759');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Cerro Colorado', '774');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Ciudad Sahagun', '791');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Colonia 28 de Mayo (Santa Rosa)', '775');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Cruz Azul San Miguel Vindho', '773');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Cuautepec de Hinojosa', '775');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Chapantongo', '763');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Chapulhuacan', '483');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Chicavasco', '772');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Chilcuautla', '738');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'El Alberto', '759');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'El Pedregal San Jose', '775');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'El Tephe', '759');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'El Tothie', '738');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Emiliano Zapata', '748');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Epazoyucan', '771');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Estacion de Apulco', '774');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Gandho', '761');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'General Pedro Maria Anaya (San Mateo)', '773');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Huasca de Ocampo', '771');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Huautla', '746');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Huejutla de Reyes', '789');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Huichapan', '761');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Ixmiquilpan', '759');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Jacala', '441');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Jaguey de Tellez (Estacion Tellez)', '743');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Jaltepec', '775');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Jose Maria Morelos (San Jose)', '748');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'La Lagunilla', '775');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'La Providencia', '771');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Las Plazas', '779');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Maravillas', '761');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Melchor Ocampo (El Salto)', '773');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Metepec', '774');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Metztitlan', '774');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Mezquititlan', '774');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Mineral del Monte', '771');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Mixquiahuala', '738');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Molango', '774');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Napateco', '775');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Nopala', '761');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Omitlan de Juarez', '771');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Orizabita', '759');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Pachuca de Soto', '771');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Pisaflores Hidalgo', '483');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Praderas del Potrero', '591');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Progreso', '738');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'San Agustin Tlaxiaca', '743');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'San Agustin Zapotlan', '743');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'San Bartolo Tutotepec', '774');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'San Buenaventura', '773');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'San Felipe Orizatlan', '483');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'San Juan Tilcuautla', '771');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'San Juan Tizahuapan', '771');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'San Pedro Tlachichilco', '776');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'San Salvador', '738');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'San Sebastian Tenochtitlan', '761');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Santa Ana Ahuehuepan', '773');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Santa Ana de Allende', '775');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Santa Ana Hueytlalpan', '775');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Santa Matilde', '771');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Santa Monica', '771');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Santiago de Anaya', '772');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Santiago Tepeyahualco', '743');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Santiago Tezontlale', '778');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Santiago Tlapacoya', '771');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Santiago Tlautla', '773');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Santiago Tulantepec', '775');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Santo Tomas', '743');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Singuilucan', '775');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Tasquillo', '759');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Tecozautla', '761');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Tehuetlan', '789');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Tenango de Doria', '776');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Tenango', '774');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Teñhe', '738');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Teocalco', '778');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Tepatepec', '738');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Tepeji de Ocampo', '773');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Tezontepec de Aldama', '763');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Tianguistengo', '774');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Tizayuca', '779');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Tlahuelilpan', '763');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Tlahuelompa (San Francisco Tlahuelompa)', '774');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Tlanchinol', '774');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Tlaxcoapan', '778');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Tolcayuca', '743');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Tula', '773');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Tulancingo', '775');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Villa Tezontepec', '743');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Xochitlan', '738');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Yolotepec', '772');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Zacualtipan', '774');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Zapotlan de Juarez', '743');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Zempoala', '743');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(13, 'Zimapan', '759');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Mezcala (Mp.Tepatitlan de Morelo)', '378');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Marcos (Mp.Zacoalco de Torres', '326');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Acatic', '378');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Acatlan de Juarez', '387');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Ahualulco', '386');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Ajijic', '376');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Amacueca', '372');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Amatitan', '374');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Ameca', '375');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Antonio Escobedo', '386');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Arandas', '348');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Atemajac de Brizuela', '326');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Atengo', '349');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Atenguillo', '388');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Atenquique', '371');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Atequiza', '376');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Atotonilco El Alto', '391');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Atoyac', '372');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Autlan', '317');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Ayotlan', '345');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Ayutla', '316');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Bajio de San Jose', '475');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Barra de Navidad', '315');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Barranca de Otates', '326');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Barranca de Santa Clara (Barranca de Enmedio)', '326');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Base Aerea Militar No. 5', '33');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Belen del Refugio', '346');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Bellavista', '387');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Betania', '345');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Betulia', '474');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Buenavista', '385');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Cajititlan', '33');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Campamento Sarh', '322');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Campo Acosta', '322');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Cañadas de Obregon', '431');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Capilla de Guadalupe', '378');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Capilla de Milpillas (Milpillas)', '378');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Careyes', '315');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Casimiro Castillo', '357');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Cihuatlan', '315');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Citala', '372');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Ciudad Guzman', '341');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Club de Golf Santa Anita', '33');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Cocula', '377');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Cofradia', '372');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Colotlan', '499');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Concepcion de Buenos Aires', '372');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Cuautitlan', '357');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Cuautla', '316');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Cuquio', '373');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Chapala', '376');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Chimaltitan', '437');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Chiquilistlan', '385');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Degollado', '345');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Ejutla', '343');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'El Arenal', '374');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'El Carmen', '386');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'El Chante', '317');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'El Grullo', '321');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'El Jazmin', '343');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'El Limon', '321');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'El Puesto', '474');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'El Salitre', '385');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'El Salto', '33');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'El Salvador', '374');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'El Tuito', '322');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Encarnacion de Diaz', '475');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Estipac', '377');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Etzatlan', '386');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Francisco Javier Mina', '391');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Gomez Farias', '341');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Guachinango', '388');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Guadalajara', '33');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Hostotipaquillo', '386');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Huascato', '345');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Huejucar', '457');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Huejuquilla El Alto', '457');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Huisquilco (Huiscuilco)', '344');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Ixtapa', '322');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Ixtlahuacan de los Membrillos', '376');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Ixtlahuacan del Rio', '373');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Jalostotitlan', '431');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Jamay', '392');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Jesus Maria', '348');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Jilotlan de los Dolores', '424');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Jocotepec', '387');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Jose Maria Morelos', '322');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Josefino de Allende', '348');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Juchitlan', '349');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'La Barca', '393');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'La Calera', '33');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'La Concepcion', '345');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'La Frontera', '343');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'La Garita', '358');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'La Higuera', '318');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'La Huerta', '357');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'La Manzanilla de la Paz', '372');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'La Manzanilla', '315');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'La Mesa (El Fresnito)', '341');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'La Paz', '496');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'La Trinidad', '348');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'La Venta del Astillero', '33');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Lagos de Moreno', '474');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Las Cañadas (Bosques de San Isidro)', '33');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Las Navajas', '384');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Las Palmas de Arriba', '322');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Las Pintas', '33');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Lo Arado', '357');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Los Azulitos', '474');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Los Campos', '496');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Los Tecomates (Piedra Pesada)', '357');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Los Volcanes', '388');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Magdalena', '386');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Manalisco', '344');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Manuel M. Dieguez', '354');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Margaritas', '391');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Mascota', '388');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Matanzas', '474');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Matatlan', '373');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Mazamitla', '382');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Mechoacanejo', '346');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Mexticacan', '344');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Mezcala de los Romeros', '376');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Mezquitic', '457');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Mismaloya', '322');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Mixtlan', '388');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Nicolas R. Casillas', '33');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Oconahua', '386');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Ocotlan', '392');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Ojuelos de Jalisco', '496');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Otatlan', '391');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Palomar', '33');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Palos Altos', '373');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Paso de Cuarenta', '474');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Pegueros', '378');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Pihuamo', '318');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Poncitlan', '391');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Potrerillos', '387');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Puente Grande', '33');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Puerto Vallarta', '322');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Quila (Quila El Grande)', '349');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Quitupan', '382');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Rancho Contento', '33');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Rancho La Tijera', '33');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Andres Figueroa', '326');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Andres', '386');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Antonio de Fernandez', '391');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Antonio de los Vazquez', '373');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Antonio Puerta de la Vega', '375');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Clemente', '316');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Cristobal de la Barranca', '373');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Cristobal', '474');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Diego de Alejandria', '395');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Esteban', '33');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Francisco de Rivas', '393');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Gabriel', '343');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Gaspar de los Reyes (San Gaspar)', '431');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Ignacio Cerro Gordo', '348');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Isidro Mazatepec', '379');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Isidro', '343');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Jose Casas Caidas', '393');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Jose de Gracia', '391');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Jose de la Paz', '392');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Jose de las Moras', '393');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Jose de los Reynoso', '474');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Jose del Castillo', '33');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Juan Cosala', '387');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Juan de los Lagos', '395');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Juan Tecomatlan', '376');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Julian', '347');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Luis Soyatlan', '376');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Marcos (Mpio. San Marcos)', '386');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Marcos (Mpio. Tonila)', '318');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Martin de las Flores de Abajo', '33');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Martin de las Flores', '33');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Martin de Zula (Zula)', '392');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Martin Hidalgo', '385');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Mateo', '315');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Miguel Cuyutlan', '379');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Miguel El Alto', '347');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Miguel Zapotitlan', '391');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Nicolas (San Nicolas de Acuña)', '385');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Patricio (Melaque)', '315');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Pedro Tesistan', '387');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Ramon', '393');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Sebastian del Alamo', '475');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'San Sebastian El Grande', '33');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Santa Cruz de las Flores', '379');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Santa Cruz del Astillero', '374');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Santa Cruz del Valle', '33');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Santa Cruz El Grande', '392');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Santa Fe', '373');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Santa Maria de Abajo', '475');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Santa Maria del Valle', '348');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Santiaguito de Velazquez', '348');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Sayula', '342');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Tala', '384');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Talpa de Allende', '388');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Tamazula', '358');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Tamazulita', '385');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Tapalpa', '343');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Tasinaxtla (La Cañada)', '341');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Tecalitlan', '371');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Tecolotlan', '349');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Tecualtitan', '391');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Temastian', '437');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Tenamaxtlan', '349');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Teocaltiche', '346');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Teocuitatlan de Corona', '372');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Tepatitlan de Morelos', '378');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Tepusco', '495');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Tequesquitlan', '357');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Tequila', '374');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Tesistan (San Francisco Tesistan)', '33');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Teuchitlan', '384');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Tizapan El Alto', '376');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Tlacuitapan', '395');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Tlajomulco de Zuñiga', '379');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Tlaquepaque', '33');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Toliman', '343');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Tomatlan', '322');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Tonala', '33');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Tonaya', '343');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Tonila', '318');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Totatiche', '437');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Tototlan', '391');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Trejos', '373');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Tuxcacuesco', '343');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Tuxpan', '371');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Union de Guadalupe', '372');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Union de San Antonio', '395');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Union de Tula', '316');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Valle de Guadalupe', '347');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Valle de Juarez', '382');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Villa Corona', '387');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Villa de Contla (Contla)', '358');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Villa Guerrero', '437');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Villa Hidalgo', '495');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Villa Lazaro Cardenas (El Aserradero)', '341');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Villa Purificacion', '357');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Vista Hermosa (Santa Cruz del Cortijo)', '358');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Yahualica', '344');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Zacoalco', '326');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Zapopan', '33');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Zapote del Valle (Zapote de Santa Cruz)', '33');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Zapotiltic', '341');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Zapotitan de Hidalgo', '387');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Zapotitlan de Vadillo', '343');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Zapotlan del Rey', '391');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(14, 'Zapotlanejo', '373');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Santiago Cuautlalpan (Mp.Tepotzot', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Santiago Cuautlalpan (Mp.Texcoco)', '595');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Acambay', '718');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Aculco', '718');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Ahuacatitlan Centro', '718');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Almoloya de Alquisiras', '716');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Almoloya de Juarez', '725');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Almoloya de las Granadas', '724');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Amanalco de Becerra', '726');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Amatepec', '716');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Amecameca', '597');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Apaxco', '599');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Atlacomulco', '712');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Atlatlahuca', '717');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Axotlan', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Buenavista', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Calimaya de Diaz Gonzalez', '722');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Calixtlahuaca', '722');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Campo Militar N. 37B (El Cabi)', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Canalejas', '761');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Capardillas (Rancho Santa Lugarda)', '722');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Cieneguillas', '725');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Ciudad Lopez Mateos', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Ciudad Nezahualcoyotl', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Coatepec Harinas', '723');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Coatepec', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Cocotitlan', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Colonia Dr. Gustavo Baz', '726');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Colorines', '726');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Coyotepec', '593');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Cuautitlan Izcalli', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Cuautitlan', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Chalco', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Chalma', '714');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Chiconcuac de Juarez', '595');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Chimalhuacan', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Chosto de los Jarros', '712');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Dongu', '588');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Ecatepec de Morelos', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'El Agostadero (San Jose Agostadero)', '718');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'El Cerrillo Piedras Blancas (El Cerrillo)', '722');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'El Estanco', '724');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'El Oro', '711');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'El Salitre Palmarillos', '716');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'El Tajuelo', '593');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Ex-hacienda de Solis', '718');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Fuentes del Valle', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Hermiltepec (Peña Blanca)', '724');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Huehuetoca', '593');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Hueypoxtla', '599');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Huixquilucan', '729');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Ixtapaluca', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Ixtapan de la Sal', '721');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Ixtapan del Oro', '726');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Ixtlahuaca de Villada', '723');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Ixtlahuaca', '712');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Jilotepec', '761');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Jilotzingo', '599');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Jiquipilco', '712');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Jocotitlan', '712');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Joquicingo de Leon Guzman', '714');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Jorobas', '593');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Juchitepec', '597');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'La Esperanza', '588');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'La Loma', '718');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'La Unidad Huitzizilapan', '728');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Las Cabañas', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Lerma', '728');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Los Reyes Acaquilpan', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Los Reyes Acozac', '596');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Luvianos', '724');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Magdalena Chichicaspa', '729');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Malinalco', '714');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Melchor Ocampo', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Metepec', '722');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Mexicaltzingo', '722');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Monte de Peña', '588');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Naucalpan de Juarez (Mp.Huixqui', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Naucalpan de Juarez (Mp.Naucalp', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Nepantla de Sor Juana Ines de la Cruz', '597');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Nextlalpan', '591');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Nopaltepec', '592');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Ocoyoacac', '728');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Ocuilan de Arteaga', '714');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Ojo de Agua', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Otumba', '592');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Otzoloapan', '726');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Oxtotipac', '592');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Ozumba', '597');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Ozumbilla(Ejido El Zapote)', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Palmar Chico', '716');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Pipioltepec (Santa Maria Pipioltepec)', '726');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Polotitlan', '427');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Progreso Industrial', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Pueblo Tecamac', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Rancho Avandaro', '726');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Rio Frio', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Salazar', '729');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Andres Cuexcontitlan', '722');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Andres Timilpan', '712');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Andres Tlalamac', '597');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Antonio del Rosario', '767');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Antonio La Isla', '717');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Bartolo Cuautlalpan', '591');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Bartolo Morelos', '712');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Bernardo Tlalmimilolpan', '595');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Felipe del Progreso', '712');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Francisco Coacalco', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Francisco Cheje', '712');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Francisco Chimalpa', '729');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Francisco Magu', '588');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Francisco Tepeolulco', '718');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Francisco Xonacatlan', '719');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Francisco Zacacalco', '599');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Gabriel Docuan', '588');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Jeronimo Amanalco', '595');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Jose del Rincon', '712');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Jose El Vidrio', '588');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Juan Acatitlan (Acatitlan)', '724');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Juan Pueblo Nuevo', '591');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Juan Tilapa', '722');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Juan Xochiaca', '714');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Lorenzo Huitzizilapan', '728');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Lorenzo Malacota', '712');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Luis Ayucan', '588');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Luis Tecuahutitlan', '596');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Marcos Nepantla', '594');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Maria Atarasquillo', '728');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Martin Cachihuapan', '588');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Martin Cuautlalpan', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Martin de las Piramides', '594');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Mateo Atenco', '728');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Mateo Otzacatipan', '722');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Mateo Oxtotitlan', '722');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Miguel Ixtapan', '724');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Miguel Jaltepec', '592');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Miguel Mimiapan', '719');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Miguel Tlaixpan', '595');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Miguel Zinacantepec', '722');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Miguel', '714');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Pablo Atlazalpan', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Pablo Autopan', '722');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Pedro Atlapulco', '728');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Pedro Limon', '716');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Pedro los Baños', '712');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Pedro Totoltepec', '722');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Salvador Atenco', '595');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Sebastian (San Sebastian Buenos Aires)', '712');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Simon de Guerrero', '716');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'San Vicente Chicoloapan', '595');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Santa Ana Jilotzingo', '588');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Santa Cruz Atizapan', '713');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Santa Cruz Ayotuzco', '729');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Santa Maria Ajoloapan', '599');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Santa Maria Canchesda', '718');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Santa Maria Cuevas (Cuevas)', '591');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Santa Maria del Monte', '725');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Santa Maria Jajalpa', '717');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Santa Maria Magdalena Cahuacan', '588');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Santa Maria Mazatla', '588');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Santa Maria Tlalmimilolpan', '728');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Santa Mateo Atarasquillo', '728');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Santiago Acutzilapan', '712');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Santiago Coachochitlan', '718');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Santiago Oxtotitlan', '714');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Santiago Tianguistenco', '713');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Santiago Tolman', '592');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Santiago Yeche', '712');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Santo Tomas Apipilhuasco (Santo Tomas)', '595');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Sultepec', '716');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Tecomatlan (San Miguel Tecomatlan)', '714');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Tejupilco de Hidalgo', '724');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Temascalapa', '596');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Temascalcingo', '718');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Temascaltepec', '716');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Temoaya', '719');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Tenancingo', '714');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Tenango de Arista', '717');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Tenango del Aire', '597');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Tenantongo (Avandaro)', '726');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Tenjay', '588');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Teoloyucan', '593');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Teotihuacan', '594');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Tepetitlan', '595');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Tepetlaoxtoc', '595');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Tepexpan', '594');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Tepojaco', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Tepotzotlan', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Tequexquinahuac', '595');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Tequixquiac', '591');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Texcaltitlan', '716');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Texcoco de Mora', '595');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Tezoyuca', '594');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Tlachaloya 1a. Seccion', '722');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Tlalmanalco', '597');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Tlalnepantla', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Tlapanaloya', '599');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Tlazala de Fabela', '588');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Toluca', '722');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Tonatico', '721');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Transfiguracion', '588');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Tultepec', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Tultitlan de Mariano Escobedo', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Valle de Bravo', '726');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Valle de Chalco', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Villa del Carbon', '588');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Villa Guerrero', '714');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Villa Nicolas Romero', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Villa Victoria', '726');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Xala', '592');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Xalatlaco', '713');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Xico', '55');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Xometla', '594');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Zacamulpa', '729');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Zitlaltepec', '591');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Zumpahuacan', '714');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(15, 'Zumpango', '591');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Acuitzeramo', '471');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Acuitzio del Canje', '434');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Agostitlan', '786');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Aguililla', '426');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Alvaro Obregon', '455');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Angamacutiro', '454');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Angangueo', '715');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Antunez', '425');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Apatzingan', '453');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Aporo', '786');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Ario de Rayon', '351');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Ario de Rosales', '422');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Arteaga', '753');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Atacheo de Regalado', '351');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Bahia Bufadero', '753');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Benito Juarez', '786');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Buenavista Tomatlan', '426');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Buenos Aires', '753');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Capacho', '455');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Caracuaro', '459');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Carapan', '355');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Catalinas (Francisco Villa)', '426');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Caurio de Guadalupe (Cabrio)', '454');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Cenobio Moreno (Las Colonias)', '453');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Cerrito Colorado', '353');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Ciudad Hidalgo', '786');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Ciudad Lazaro Cardenas', '753');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Coahuayana de Hidalgo', '313');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Coahuayana Viejo', '313');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Coalcoman', '424');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Coeneo de la Libertad', '454');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Cojumatlan', '381');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Colesio', '328');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Comanja', '454');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Contepec', '447');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Copandaro', '454');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Corupo', '452');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Cotija de la Paz', '394');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Cuamio', '455');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Cuanajo', '434');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Cuaracurio', '455');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Cuitzeo del Porvenir', '455');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Cumuatillo', '353');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Curimeo', '454');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Cuto del Porvenir', '443');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Charo', '451');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Chavinda', '383');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Cheran Atzicuirin (Cheranastico)', '423');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Cheran', '423');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Chilchota', '355');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Chucandiro', '443');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Chupicuaro', '455');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Churintzio', '328');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Dieciocho de Marzo', '426');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Ecuandureo', '328');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'El Ahuaje', '424');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'El Capulin', '328');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'El Chauz', '425');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'El Fortin', '353');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'El Rosario', '435');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'El Sabino', '381');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'El Sauz de Abajo', '351');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Epitacio Huerta', '421');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Erongaicuaro', '434');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Estacion Querendaro', '451');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Etucuaro', '459');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Felipe Carrillo Puerto (La Ruana)', '426');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Gabriel Zamora (Lombardia)', '422');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Galeana', '438');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Gambara', '425');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Gildardo Magaña (Los Angeles)', '354');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Guascuaro de Mugica', '354');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Huajumbaro', '786');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Huandacareo', '455');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Huaniqueo de Morales', '454');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Huetamo', '435');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Huiramba', '434');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Ibarra', '393');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Ihuatzio', '434');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Indaparapeo', '451');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Infiernillo (Morelos de Infiernillo)', '753');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Ixtlan de los Hervores', '328');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Jacona de Plancarte', '351');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Janambo', '438');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Jaracuaro', '434');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Jaripo', '353');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Jiquilpan de Juarez', '353');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Jucatacato', '452');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Jungapeo', '715');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'La Cañada', '454');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'La Esperanza', '383');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'La Estanzuela', '328');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'La Excusa', '438');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'La Huacana', '425');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'La Luz (Mpio. Pajacuaran)', '328');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'La Luz (Mpio. Penjamillo)', '359');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'La Magdalena', '353');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'La Mira', '753');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'La Noria', '328');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'La Palma (La Palma de Jesus)', '353');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'La Palma (Las Palmas)', '443');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'La Piedad', '352');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'La Plaza de Fco. J. Mugica (Plaza del Limon)', '328');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'La Sauceda', '351');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'La Yerbabuena', '471');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Lagunillas', '434');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Las Cieneguitas', '356');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Las Guacamayas', '753');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Las Ranas', '438');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Los Charcos', '356');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Los Guajes', '352');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Los Limones', '354');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Los Pilares', '328');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Los Reyes', '354');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Manuel Villalongin', '438');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Maravatio', '447');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Mariano Escobedo (San Lorenzo)', '455');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Morelia', '443');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Nueva Italia', '425');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Nuevo San Juan Parangaricutiro', '452');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Nuevo Urecho', '422');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Nuevo Zirosto', '354');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Numeran', '359');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Nurio', '423');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Ocampo', '715');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Pajarearan', '353');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Palo Alto', '381');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Panindicuaro', '454');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Paracuaro', '425');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Paracho', '423');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Pareo', '453');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Paricuaro', '786');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Pastor Ortiz', '438');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Patamban (Patambam)', '355');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Patzcuaro', '434');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Patzimaro de Aviña (Patzimaro del Rincon)', '352');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Pedernales', '459');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Penjamillo', '359');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Periban de Ramos', '354');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Pizandaro', '426');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Playa Azul', '753');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Pueblo Viejo', '451');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Punta del Agua', '426');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Purepero', '471');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Puruandiro', '438');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Puruaran', '459');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Querendaro', '451');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Quiringuicharo (La Hacienda)', '328');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Quiroga', '454');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Rancho Nuevo', '455');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Sahuayo', '353');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Salto de Tepuxtepec (Tepuxtepec)', '443');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'San Andres Coru', '423');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'San Andres La Venta', '786');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'San Andres Zirondaro', '454');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'San Antonio Guaracha', '353');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'San Antonio Ocampo (Rincon del Tepetate)', '355');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'San Antonio Villalongin', '786');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'San Bartolo Cuitareo (Cuitareo)', '786');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'San Francisco Periban', '354');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'San Jose de Gracia', '381');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'San Jose Huipana (Huipana)', '438');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'San Juan de Viña', '459');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'San Lucas', '435');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'San Martin', '438');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'San Miguel Epejan', '454');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'San Miguel Taimeo (Taimeo)', '451');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'San Nicolas', '438');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'San Pedro Jacuaro (Las Joyas)', '786');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Santa Ana Amatlan (Santa Ana)', '426');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Santa Ana Maya', '455');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Santa Clara del Cobre', '434');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Santa Clara del Tule', '451');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Santa Clara', '438');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Santa Fe del Rio', '359');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Santa Maria Huiramangaro (San Juan)', '434');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Santiago Conguripo', '454');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Santiago Tangamandapio', '383');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Santiago Tingambato', '423');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Santiago Undameo', '443');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Senguio', '786');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Susupuato de Guerrero', '786');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Tacambaro', '459');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Tafetan', '459');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Tancitaro', '425');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Tangancicuaro', '355');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Tanhuato de Guerrero', '356');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Taretan', '422');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Tarimbaro', '443');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Tarimoro', '356');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Tecomatan', '328');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Tepalcatepec', '424');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Ticuitaco (Tocuitaco)', '352');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Tinaja de Vargas', '356');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Tinguindin', '354');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Tiquicheo', '459');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Tiripetio', '443');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Tlalpujahua', '711');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Tlazazalca', '471');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Tocumbo', '354');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Tumbiscatio de Ruiz', '452');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Tungareo', '443');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Turitzio', '435');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Tuxpan', '786');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Tuzantla', '786');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Tzintzingareo', '786');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Tziritzicuaro (Nativitas)', '443');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Uruapan', '452');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Uruetaro', '443');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Uspero (Reynosa)', '425');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Valle de Juarez (Jerahuaro)', '451');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Venustiano Carranza', '353');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Villa Jimenez', '454');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Villa Madero', '459');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Villa Morelos', '438');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Villamar', '383');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Vista Hermosa', '328');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Yoricostio (La Villita)', '459');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Yurecuaro', '356');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Zacan', '354');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Zacapu', '436');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Zamora', '351');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Zaragoza', '352');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Zicuiran', '425');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Zinaparo', '359');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Zinapecuaro', '451');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Ziquitaro', '359');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Ziracuaretiro', '423');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Zirahuen', '434');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(16, 'Zitacuaro', '715');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Acamilpa', '734');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Amacuzac', '751');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Amayuca', '731');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Atlatlahucan', '735');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Axochiapan', '769');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Coajomulco', '739');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Coatetelco', '737');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Coatlan del Rio', '751');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Cuahuchichinola', '751');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Cuautla', '735');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Cuernavaca', '777');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Chalcatzingo', '731');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Chinameca', '735');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Emiliano Zapata', '777');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Felipe Neri (Cuatepec)', '735');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Fracc. Kunetzin de los Volcanes', '735');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Huajintlan', '751');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Huecahuasco', '731');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Huitchila', '769');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Huitzilac', '739');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Jiutepec', '777');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Jojutla', '734');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Jonacatepec', '735');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Jumiltepec', '731');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'La Joya', '777');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Marcelino Rodriguez (San Ignacio)', '769');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Miacatlan', '737');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Michapa', '751');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Oacalco', '735');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Oaxtepec', '735');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Pedro Amaro', '734');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Puente de Ixtla', '751');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Quebrantadero (San Jose)', '769');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'San Jose Vistahermosa', '734');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'San Juan Tlacotenco', '739');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'San Vicente de Juarez (Las Piedras)', '735');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Santa Catarina', '739');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Santa Fe', '777');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Tehuixtla', '734');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Telixtac', '769');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Temixco', '777');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Tenextepango', '735');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Tepalcingo', '769');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Tepoztlan', '739');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Tequesquitengo', '734');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Tetecala', '751');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Tetela del Volcan', '731');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Ticuman', '734');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Tilzapotla', '751');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Tlacotepec', '731');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Tlalnepantla', '735');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Tlaltizapan', '734');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Tlaquiltenango', '734');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Tlayacapan', '735');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Tlayecac', '735');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Totolapa', '735');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'U. H. J. Ma. Morelos y Pavon', '734');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Xaloxtoc', '735');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Xochitepec', '777');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Xoxocotla', '734');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Yautepec', '735');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Yecapixtla', '731');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Zacatepec de Hidalgo', '734');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(17, 'Zacualpan', '731');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Agualeguas', '892');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Allende', '826');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Aramberri', '826');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Atongo de Abajo', '826');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Bustamante', '829');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Cadereyta', '828');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Carmen', '81');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Cerralvo', '892');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Cienaga de Flores', '825');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Ciudad Anahuac', '873');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Ciudad Apodaca', '81');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Ciudad Benito Juarez', '81');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Ciudad General Escobedo', '81');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Ciudad Santa Catarina', '81');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Ciudad Satelite del Norte', '81');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Colombia', '867');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Congregacion Calles', '826');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'China', '823');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Doctor Arroyo', '488');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Doctor Coss', '823');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Doctor Gonzalez', '825');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'El Barrial (Rancho de los Benavides)', '81');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'El Potrero', '829');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Galeana', '826');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Garcia', '81');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Garza Ayala', '824');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Garza Gonzalez', '823');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'General Bravo', '823');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'General Teran', '826');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'General Treviño', '892');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'General Zaragoza', '826');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'General Zuazua', '825');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Guadalupe', '81');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Hidalgo', '829');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Higueras', '825');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Hualahuises', '821');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Iturbide', '821');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'La Ascension', '826');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Lampazos', '873');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Linares', '821');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Los Aldamas', '892');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Los Ayala', '81');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Los Colorados de Abajo', '824');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Los Herreras', '823');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Los Ramones', '823');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Marin', '825');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Melchor Ocampo', '892');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Mina', '829');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Montemorelos', '826');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Monterrey', '81');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Parque Ind. Cienega de Flores', '81');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Parque Industrial Ciudad Mitras', '81');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Pesqueria', '825');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Sabinas Hidalgo', '824');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Salinas Victoria', '81');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'San Juan', '828');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'San Nicolas de los Garza', '81');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'San Pedro Garza Garcia', '81');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'San Rafael', '826');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'San Vicente', '823');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Santiago( El Cercado )', '827');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Villa Aldama', '829');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Villa de Paras', '892');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(19, 'Villas Campestres', '81');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Acaponeta', '325');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Ahuacatlan', '324');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Amapa', '323');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Amatlan de Cañas', '324');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Aticama', '323');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Bellavista', '311');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Boca de Camichin', '323');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Bucerias', '329');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Cañada del Tabaco', '323');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Coamiles', '319');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Compostela', '327');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Cruz de Juanacaxtle', '329');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Chapalilla', '327');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Chilapa', '319');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'El Capomo', '327');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'El Colomo', '329');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'El Jicote', '311');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'El Tizate', '323');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Estacion Yago', '323');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Felipe Carrillo Puerto (Carrillo Puerto)', '327');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Fracc. Emiliano Zapata', '329');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Francisco I. Madero (Puga)', '311');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Guadalupe Victoria (La Virocha)', '323');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Huajicori', '325');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Ixtapa de la Concepcion', '327');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Ixtlan del Rio', '324');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Jala', '324');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Jalcocotan', '327');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'La Presa', '323');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Las Varas', '327');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Lo de Marcos', '327');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Mecatan', '327');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Mezcales', '329');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Milpas Viejas', '389');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Monteon', '327');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Navarrete', '327');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Nuevo Vallarta', '322');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Palma Grande', '319');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Pantanal', '311');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Pozo de Ibarra', '323');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Quimichis', '389');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Rincon de Guayabitos', '327');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Rosamorada', '319');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Ruiz', '319');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'San Blas', '323');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'San Cayetano', '311');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'San Felipe Aztatan', '389');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'San Francisco', '311');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'San Jose del Valle', '329');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'San Juan de Abajo', '329');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'San Pedro Lagunillas', '327');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'San Vicente', '329');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Santa Cruz de Miramar', '323');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Santa Maria del Oro', '327');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Santiago Ixcuintla', '323');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Sauta', '323');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Sentispac', '323');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Tecuala', '389');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Tepic', '311');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Tepuzhuacan', '324');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Tetitlan', '324');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Tuxpan', '319');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Valle de Banderas', '329');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Villa Hidalgo (El Nuevo)', '323');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Villa Juarez (La Trozada)', '323');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Xalisco', '311');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(18, 'Zacualpan', '327');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Acatlan de Perez Figueroa', '274');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Asuncion Ixtaltepec', '971');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Asuncion Nochixtlan', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Ayoquezco de Aldama', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Bahia de Huatulco(crucesita)', '958');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Bajos de Chila', '954');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Barrio El Rosario', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Benemerito Juarez (Palo Gacho)', '287');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Ciudad de Huajuapam de Leon', '953');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Cuicatlan', '236');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Chahuites', '994');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Ejutla de Crespo', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'El Barrio de la Soledad', '972');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'El Camaron', '995');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'El Porvenir', '924');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Espinal', '971');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Guegovela', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Huautla de Jimenez', '236');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Ixtepec', '971');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Ixtlan de Juarez', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Jalapa del Marque', '995');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Juchitan', '971');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'La Ventosa', '971');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Lagunas', '972');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Loma Bonita', '281');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Lombardo de Caso', '283');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Magdalena Teitipac', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Magdalena Tequisistlan', '995');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Mariscala de Juarez', '953');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Matias Romero', '972');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Miahuatlan', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Mitla', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Oaxaca de Juarez', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Ocotlan de Morelos', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Palomares', '972');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Papaloapam', '287');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Paso Ancho', '958');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Pinotepa de Don Luis', '954');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Pinotepa Nacional', '954');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Puerto Angel', '958');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Puerto Escondido', '954');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Putla Villa de Guerrero', '953');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Rincon Juarez', '994');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Rio Grande', '954');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Salina Cruz', '971');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Agustin Amatengo', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Agustin Etla', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Andres Huaxpaltepec', '954');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Baltazar Guelavila', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Bartolo Coyotepec', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Dionisio Ocotepec', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Felipe Jalapa de Diaz', '287');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Francisco Ixhuatan', '994');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Jeronimo Tlacochahuaya', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Jorge Nuchita', '953');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Jose Chiltepec', '287');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Jose del Progreso', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Juan Bautista lo de Soto', '954');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Juan Bautista Valle Nacional', '283');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Juan Cacahuatepec', '954');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Juan del Estado', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Juan Guichicovi', '972');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Juan Mixtepec -distr. 08-', '953');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Lorenzo Cacaotepec', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Lucas Ojitlan', '287');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Martin Peras', '953');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Miguel Sola de Vega', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Miguel Tlacotepec', '953');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Pablo Huitzo', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Pedro Amuzgos', '954');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Pedro Apostol', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Pedro Comitancillo', '971');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Pedro de Tututepec', '954');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Pedro Ixtlahuaca', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Pedro Pochutla', '958');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Pedro Tapanatepec', '994');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Pedro Totolapa', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'San Pedro y San Pablo Teposcolula', '953');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Santa Catarina Juquila', '954');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Santa Cruz Amilpas', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Santa Cruz Papalutla', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Santa Cruz Xitla', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Santa Cruz Xoxocotlan', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Santa Gertrudis', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Santa Maria Chilapa de Diaz', '953');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Santa Maria del Tule', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Santa Maria Huatulco', '958');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Santa Maria Mixtequilla', '971');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Santa Maria Tecomavaca', '236');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Santa Maria Xadani', '971');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Santa Maria Zacatepec', '954');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Santiago Chazumba', '953');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Santiago Jamiltepec', '954');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Santiago Juxtlahuaca', '953');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Santiago Matatlan', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Santiago Niltepec', '994');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Santiago Tamazola', '953');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Santiago Yolomecatl', '953');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Santo Domingo Chihuitan', '971');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Santo Domingo Ingenio', '994');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Santo Domingo Petapa', '972');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Santo Domingo Tonala', '953');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Santo Domingo Yanhuitlan', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Santo Domingo Zanatepec', '994');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Santos Reyes Nopala', '954');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Silacayoapam', '953');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Soledad Etla', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Tehuantepec', '971');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Temascal', '274');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Teotitlan de Flores Magon', '236');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Teotitlan del Valle', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Tetela', '274');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Tezoatlan de Segura y Luna', '953');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Tlacolula de Matamoros', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Tlaxiaco', '953');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Trinidad de Viguera', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Tuxtepec', '287');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Union Hidalgo', '971');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Vicente Camalote', '274');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Villa de Etla', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Villa de Tamazulapam del Progreso', '953');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Villa Tejupam de la Union', '953');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Zaachila', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Zapotitlan Lagunas', '757');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(20, 'Zimatlan de Alvarez', '951');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Acatlan de Osorio', '953');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Acatzingo', '249');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Acaxtlahuacan de Albino Zertuche', '275');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Ahuazotepec', '776');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Ajalpan', '236');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Amozoc', '222');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Atencingo', '243');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Atlixco', '244');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Atoyatempan', '224');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Atzitzintla', '245');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Ayotoxco de Guerrero', '233');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Ayutla (San Felipe Ayutla)', '243');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Barrio La Soledad', '249');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Calipan', '236');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Calmeca (San Juan Calmeca)', '243');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Ciudad Serdan', '245');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Coatzingo', '243');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Colucan (San Lucas Colucan)', '243');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Cuachila', '222');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Cuetzalan', '233');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Cuyoaco', '276');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Chiautla de Tapia', '275');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Chignahuapan', '797');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Chignautla', '231');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Chila de la Sal', '275');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Chila de las Flores', '953');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Chinantla', '275');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Chipilo de Francisco Javier Mina (Chipilo)', '222');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Cholula de Rivadabia', '222');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'El Oasis Valsequillo', '222');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Esperanza', '245');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Estacion San Diego', '222');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Guadalupe Santa Ana', '275');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Guadalupe Victoria', '282');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Hermenegildo Galeana', '953');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Honey', '776');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Huachinantla', '275');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Huatlatlauca', '224');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Huauchinango', '776');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Huehuetlan El Chico', '275');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Huejotzingo', '227');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Hueytamalco', '232');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Ixcamilpa', '275');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Ixtahuiata (La Legua)', '231');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Izucar de Matamoros', '243');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Jolalpan', '275');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Jose Maria Pino Suarez', '238');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'La Magdalena Tetela Morelos (La Magdalena)', '223');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'La Noria Hidalgo', '275');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'La Trinidad', '244');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'La Venta (Cacaloxuchitl)', '244');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'La Venta (Rancho La Venta)', '244');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Lagunillas de Rayon (Alchichica)', '243');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Libres', '276');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Los Reyes de Juarez', '249');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Martiniano Hernandez (San Jose Xilotzingo)', '222');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Mecapalapa', '746');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Metlaltoyuca', '746');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Molcaxac', '224');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Morelos Cañada', '249');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Necaxa', '764');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Ocotepec', '276');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Oriental', '276');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Pahuatlan de Valle', '776');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Palmar de Bravo', '249');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Palmarito Tochapan', '249');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Petlalcingo', '953');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Progreso', '275');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Puebla', '222');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Andres Calpan', '227');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Andres Cholula', '222');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Antonio Chiltepec', '275');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Antonio Texcala', '237');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Baltazar Temaxcalac', '248');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Baltazar Tetela', '222');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Buenaventura Nealtican', '227');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Buenaventura Tecaltzingo', '248');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Felipe Teotlalcingo', '248');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Felix Rijo', '243');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Francisco Cuapa', '222');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Francisco Ocotlan (Ocotlan)', '222');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Francisco Tepeyecac', '248');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Gabriel Chilac', '237');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Jeronimo Coyula', '244');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Jeronimo Tianguismanalco', '248');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Jeronimo Xayacatlan', '953');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Jose Acateno', '232');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Jose Alchichica', '282');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Jose Tilapa', '236');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Jose Tlautla', '222');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Juan Amecac', '244');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Juan Atenco', '245');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Juan Cuautlancingo', '222');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Juan Epatlan', '243');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Juan Ixcaquixtla', '224');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Lorenzo Chiautzingo', '248');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Lucas El Grande', '248');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Lucas Tulcingo (Tulcingo)', '244');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Luis Tehuiloyocan', '222');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Martin Texmelucan de Labastida', '248');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Martinito', '222');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Miguel Canoa', '222');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Miguel Tenextatiloyan', '233');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Miguel Xoxtla', '222');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Nicolas de Buenos Aires', '245');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Pablito', '776');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Pablo Amicano', '275');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Pablo de las Tunas', '249');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Pedro Benito Juarez', '244');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Pedro Cuayuca', '275');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Pedro Zacachimalpa', '222');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Rafael Tlanalapan', '248');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Salvador El Seco', '249');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Salvador El Verde', '248');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Salvador Huixcolotla', '249');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Sebastian Aparicio', '222');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Sebastian Villanueva', '249');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Simon Yehualtepec', '237');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'San Vicente Boqueron', '953');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Santa Clara Ocoyucan', '222');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Santa Ines Ahuatempan', '224');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Santa Isabel Tlanepantla', '224');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Santa Lucia Cosamaloapan', '244');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Santa Maria Coronango', '222');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Santa Maria Moyotzingo', '248');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Santa Maria Xonacatepec', '222');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Santa Rita Tlahuapan', '248');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Santiago Alseseca', '249');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Santiago Miahuatlan', '238');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Santiago Tenango', '249');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Santo Domingo Atoyatempan', '244');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Santo Domingo Huehuetlan', '243');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Santo Tomas Chautla', '222');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Santo Tomas Hueyotlipan', '224');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Soltepec', '249');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Tecali de Herrera', '224');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Tecamachalco', '249');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Tecomatlan', '275');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Tehuacan', '238');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Tehuitzingo', '275');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Tenampulco', '233');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Teopantlan', '243');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Tepanco de Lopez', '238');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Tepatlaxco de Hidalgo', '223');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Tepeaca', '223');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Tepexco', '243');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Tepexi de Rodriguez', '224');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Tetela de Ocampo', '797');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Teteles', '231');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Teziutlan', '231');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Tezuapan', '249');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Tianguistengo', '953');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Tlacotepec', '237');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Tlachichuca', '245');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Tlatlauquitepec', '233');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Tochimilco', '244');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Tochtepec', '224');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Tonantzintla', '222');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Tronconal', '244');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Tulcingo de Valle', '275');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Tzicatlan', '275');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Venustiano Carranza', '746');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Villa Avila Camacho (La Ceiba)', '764');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Villa Lazaro Cardenas (La Uno)', '746');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Villa Rafael Lara Grajales', '276');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Xicotepec de Juarez', '764');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Zacapala', '224');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Zacapoaxtla', '233');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Zacatlan', '797');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Zapotitlan Salinas', '237');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(21, 'Zaragoza', '233');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(23, 'Akumal', '984');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(23, 'Alfredo V. Bonfil', '998');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(23, 'Bacalar', '983');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(23, 'Calderitas', '983');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(23, 'Cancun', '998');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(23, 'Cozumel', '987');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(23, 'Chemuyil', '984');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(23, 'Chetumal', '983');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(23, 'Chunhuhub', '983');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(23, 'Dziuche', '997');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(23, 'Felipe Carrillo Puerto', '983');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(23, 'Holbox', '984');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(23, 'Ignacio Zaragoza (Kilometro 80)', '984');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(23, 'Ingenio Alvaro Obregon', '983');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(23, 'Isla Mujeres', '998');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(23, 'Jose Maria Morelos', '997');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(23, 'Kantunilkin', '984');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(23, 'Leona Vicario', '998');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(23, 'Morocoy', '983');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(23, 'Nicolas Bravo', '983');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(23, 'Nuevo Xcan', '984');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(23, 'Playa del Carmen', '984');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(23, 'Puerto Aventuras', '984');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(23, 'Puerto Morelos', '998');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(23, 'Sergio Butron Casas', '983');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(23, 'Subteniente Lopez (Santa Elena)', '983');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(23, 'Tulum', '984');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(23, 'Xcaret', '984');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(23, 'Xpu-ha', '984');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'Amazcala', '442');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'Amealco', '448');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'Arroyo Seco', '487');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'Bella Vista del Rio', '761');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'Boye', '441');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'Buenavista', '442');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'Cadereyta', '441');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'Casa Blanca', '442');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'Colon', '419');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'Conca', '487');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'Chichimequillas', '442');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'El Cazadero', '427');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'El Palmar (Santa Maria del Palmar)', '441');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'El Pueblito', '442');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'El Salitre', '442');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'Ezequiel Montes', '441');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'Fracc. Industrial Bernardo Quintana', '442');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'Granjas Residenciales', '414');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'Huimilpan', '448');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'Jalpan de Serra', '441');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'Jurica (Ex-Hacienda)', '442');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'Juriquilla', '442');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'La "d"', '448');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'La Cañada', '442');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'La Estancia', '427');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'La Fuente', '414');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'La Valla', '427');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'Loma Linda', '427');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'Pedro Escobedo', '448');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'Pie de Gallo', '442');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'Pinal de Amoles', '441');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'Puerta de Palmillas', '427');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'Queretaro', '442');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'Refugio', '487');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'Saldarriaga', '442');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'San Joaquin', '441');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'San Juan del Rio', '427');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'Santa Rosa Jauregui', '442');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'Tequisquiapan', '414');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'Tlacote El Bajo', '442');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(22, 'Vizarron de Montes', '441');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Agua Buena', '482');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Ahualulco', '444');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Aquismon', '482');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Axtla de Terrazas', '489');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Cardenas', '487');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Cedral', '488');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Cerritos de Villa de Pozos', '444');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Cerritos', '486');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Ciudad del Maiz', '482');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Ciudad Valles', '481');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Colonia El Meco', '482');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Corte Primero', '444');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Coxcatlan', '489');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Chapulhuacanito', '483');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Charcas', '486');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Damian Carmona', '482');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Ebano', '845');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'El Capulin', '487');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'El Jabali', '487');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'El Naranjo', '482');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'El Zacaton', '458');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Estacion Catorce', '488');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Exhacienda de Jesus Maria', '485');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Guadalcazar', '486');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Hernandez', '458');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Huichihuayan', '482');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'La Paz', '488');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Matehuala', '488');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Matlapa', '483');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Mexquitic de Carmona', '444');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Moctezuma', '486');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Ojo Caliente', '485');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Palma de la Cruz', '444');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Palma Pegada', '496');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Plan de Iguala', '845');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Ponciano Arriaga', '845');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Pujal Coy', '845');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Rascon', '481');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Rayon', '487');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Real de Catorce', '488');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Rincon del Porvenir', '444');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Rioverde', '487');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Salinas de Hidalgo', '496');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Salitral de Carrera', '458');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'San Ciro de Acosta', '487');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'San Diego', '487');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'San Luis Potosi', '444');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'San Marcos Carmona', '444');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'San Martin Chalchicuautla', '483');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'San Vicente Tancuayalab', '489');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Santa Catarina', '486');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Santa Maria del Rio', '485');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Soledad de Graciano Sanchez', '444');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Suspiro Picacho', '444');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Taman', '483');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Tamasopo', '482');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Tamazunchale', '483');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Tambaca', '482');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Tampamolon Corona', '489');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Tamuin', '489');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Tancanhuitz', '482');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Tanlajas', '489');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Tanquian de Escobedo', '489');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Tierranueva', '485');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Vanegas', '488');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Venado', '486');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Villa de Arista', '486');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Villa de Arriaga', '485');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Villa de Ramos', '458');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Villa de Reyes', '485');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Villa Hidalgo', '486');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Villa Juarez', '486');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(24, 'Xilitla', '489');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Villa Adolfo Lopez Mateos (El Tamarindo)', '667');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Adolfo Lopez Mateos (El Jahuara )', '698');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Adolfo Ruiz Cortines', '687');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Agua Caliente de Garate', '694');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Agua Verde', '694');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Aguaruto', '667');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Ahome', '668');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Alfonso G. Calderon (Poblado 7)', '668');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Alfonso G. Calderon Velarde', '687');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Altata', '672');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Angostura', '697');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Bachoco', '687');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Bachomobampo Numero Dos', '668');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Badiraguato', '697');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Bagojo Colectivo Emiliano Zapata', '668');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Benito Juarez', '673');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Caimanero', '697');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Campo Balbuena', '672');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Cerrillos (Campo 35)', '668');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Cohuibampo', '668');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Colonia Agricola Independencia', '697');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Colonia Agricola Mexico (Plamitas)', '697');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Concordia', '694');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Corerepe (El Gallo)', '687');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Cosala', '696');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Costa Rica', '667');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Coyotitan', '696');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Cubilete', '687');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Cubiri de Portelas', '687');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Culiacan', '667');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Culiacancito', '667');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Charay', '698');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Chihuahuita', '668');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Choix', '698');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Dimas (Estacion Dimas)', '696');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Ejido El Quemadito', '667');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'El Bolillo', '696');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'El Burrion', '687');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'El Castillo (Mpio. Mazatlan)', '669');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'El Castillo (Mpio. Navolato)', '672');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'El Cerro Cabezon', '687');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'El Dorado', '667');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'El Espinal', '696');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'El Fuerte', '698');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'El Huitussi', '687');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'El Pitahayal', '687');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'El Potrero de Sataya', '672');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'El Pozole', '694');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'El Quelite', '669');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'El Roble', '669');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'El Salado', '667');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'El Venadillo', '669');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'El Verde', '694');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Escuinapa', '695');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Estacion Bamoa (Campo Wilson)', '687');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Estacion Naranjo', '687');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Gabriel Leyva Solano (Benito Juarez)', '687');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Genaro Estrada', '687');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'General Chavez Talamantes', '668');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Guadalupe Victoria', '667');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Guamuchil', '673');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Guasave', '687');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Gustavo Diaz Ordaz (El Carrizo)', '668');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Higuera de Zaragoza', '668');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Isla del Bosque', '695');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Juan Aldama (El Tigre)', '697');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Juan Jose Rios', '687');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'La Brecha', '687');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'La Concha', '695');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'La Cruz', '696');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'La Reforma', '697');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'La Trinidad', '687');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Las Grullas Margen Izquierdo', '668');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Leon Fonseca Estacion Verdura)', '687');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Limon de los Ramos', '667');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Los Mochis', '668');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Mazatlan', '669');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Mezquite Alto', '687');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Mocorito', '673');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Mochicahui Pueblo', '698');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Navolato', '672');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Nio', '687');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Nueve de Diciembre', '668');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Ojo de Agua de Palmillas', '695');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Palos Blancos', '687');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Pericos', '697');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Poblado Numero Cinco', '668');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Poblado Numero Seis (Los Natoches)', '668');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Potrerillo del Norote', '696');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Potrerillos', '694');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Pueblos Unidos', '667');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Quila', '667');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Revolucion Mexicana', '668');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Rosario', '694');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'San Blas', '698');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'San Ignacio', '696');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'San Jose de Ahome', '668');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'San Miguel Zapotitlan', '668');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Sanchez Celis (El Gato de Lara)', '697');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Sanchez Celis', '667');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Sinaloa de Leyva', '687');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Tamazula', '687');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Teacapan', '695');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Topolobampo', '668');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Villa Angel Flores', '672');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Villa Gustavo Diaz Ordaz (Campo Plata)', '697');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Villa Juarez(Campo Gob.)', '672');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(25, 'Villa Union', '669');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Aconchi', '623');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Agua Blanca', '643');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Agua Prieta', '633');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Alamos', '647');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Altar', '637');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Arivechi', '634');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Arizpe', '634');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Atil', '637');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Bacadehuachi', '634');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Bacame Nuevo', '647');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Bacerac', '634');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Bacoachi', '645');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Bacobampo', '647');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Bacum', '644');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Bahia de Kino', '662');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Banamichi', '623');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Baviacora', '623');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Bavispe', '634');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Benjamin Hill', '641');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Buaysiacobe', '643');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Caborca', '637');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Cananea', '645');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Carbo', '623');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Cibuta', '631');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Ciudad Obregon', '644');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Colonia El Tajo', '634');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Colonia Irrigacion', '643');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Colonia Jecopaco', '643');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Cumpas', '634');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Chinotahueca', '642');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Ejido 31 de Octubre', '643');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Ejido Cuauhtemoc (Campo Cinco)', '644');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Ejido Francisco Javier Mina (Campo 60)', '643');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Ejido La Victoria', '662');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Ejido Lagunitas', '653');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'El Chucarit', '647');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Empalme', '622');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Esperanza', '644');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Esqueda', '633');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Estacion Llano', '641');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Etchojoa', '647');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Etchoropo', '647');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Fraccionamiento Nuevo Empalme', '622');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Fronteras', '633');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Golfo de Santa Clara', '653');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Guadalupe (Guadalupe de Ures)', '623');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Guaymas', '622');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Hermosillo', '662');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Huachinera', '634');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Huasabas', '634');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Huatabampo', '647');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Huepac', '623');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Imuris', '632');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Independencia', '653');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Ingeniero Luis B. Sanchez', '653');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Islita', '653');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Jecopaco', '643');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'La Caridad (Fraccion G)', '634');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'La Choya', '638');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Los Abanicos (El Abanico)', '634');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Los Globos', '634');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Magdalena de Kino', '632');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Marte R. Gomez (Tobarito)', '644');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Mazatan', '623');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Miguel Aleman (La Doce)', '662');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Moctezuma', '634');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Naco', '633');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Nacori Chico', '634');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Nacozari', '634');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Navojoa', '642');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Nogales', '631');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Pesqueira', '623');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Pitiquito', '637');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Potam', '643');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Providencia', '644');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Pueblo Mayo', '642');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Pueblo Yaqui', '643');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Puerto Libertad', '637');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Puerto Peñasco', '638');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Querobabi', '641');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Quetchehueca', '643');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Rayon', '623');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Rosario Tesopaco', '647');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Sahuaripa', '634');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'San Carlos Nuevo Guaymas', '622');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'San Ignacio Rio Muerto (Colonia Militar)', '643');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'San Ignacio', '632');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'San Jose de Bacum', '643');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'San Luis Rio Colorado', '653');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'San Pedro de la Cueva', '623');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'San Pedro O Saucito (San Pedro El Saucito)', '662');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Santa Ana', '641');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Santa Cruz', '645');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Saric', '637');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Sasabe', '637');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Sonoita', '651');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Tepache', '634');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Trincheras', '641');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Ures', '623');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Vicam (Switch)', '643');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Villa Hidalgo', '634');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Yavaros (Isla Las Viejas)', '647');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(26, 'Yecora', '623');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Anacleto Canabal 1a. Seccion', '993');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Aquiles Serdan (San Fernando)', '936');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Balancan', '934');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Benito Juarez (San Carlos)', '936');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Boqueron 3a. Seccion (Guanal)', '993');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Cap. Felipe Castellanos (San Pedro)', '934');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Cardenas', '937');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Comalcalco', '933');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Conduacan', '914');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Coronel Gregorio Mendez Magaña', '937');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Chable', '934');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'El Triunfo', '934');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Emiliano Zapata', '934');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Estacion Chontalpa', '917');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Francisco Rueda', '923');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Frontera', '913');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Huimanguillo', '917');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Jalapa', '932');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Jalpa de Mendez', '914');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Jonuta', '913');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'La Venta', '923');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Macultepec-Ocuiltzapotlan', '993');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Macuspana', '936');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Nacajuca', '914');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Once de Febrero 1a. Seccion', '914');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Paraiso', '933');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Parrilla Primera Seccion', '993');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Pemex (Ciudad Pemex)', '936');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Playas del Rosario (Subteniente Garcia)', '993');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Pueblo Sanchez Magallane', '923');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Tacotalpa', '932');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Tamulte de las Sabanas', '993');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Teapa', '932');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Tecolutilla', '933');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Tenosique', '934');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Vicente Guerrero', '913');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Villa Aldama 1a. Seccion', '933');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Villa Benito Juarez (Campo Magallanes)', '923');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(27, 'Villahermosa', '993');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Adolfo Lopez Mateos (Chamal Nuevo)', '832');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Gral. Fco. Gonzalez Villarreal', '841');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'San Juan', '841');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Abasolo', '835');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Alfredo V. Bonfil', '868');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Altamira', '833');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Anahuac', '894');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Antiguo Morelos', '831');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Arcabuz', '897');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Burgos', '841');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Casas', '835');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Celaya', '831');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Ciudad Camargo', '891');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Ciudad Madero', '833');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Ciudad Mante', '831');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Ciudad Mier', '897');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Ciudad Miguel Aleman', '897');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Ciudad Victoria', '834');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Ejido Germinal', '833');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'El Abra', '831');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'El Barretal', '835');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'El Control', '868');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'El Limon', '831');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Empalme', '894');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Estacion Cuauhtemoc', '836');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Estacion Manuel', '836');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Estacion Santa Engracia', '835');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Esteros', '836');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Fortines y Emiliano Zapata (Fortines)', '831');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'General Francisco Villa', '841');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Gonzalez', '836');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Graciano Sanchez', '836');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Gsemez', '835');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Guadalupe Victoria', '835');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Guardados de Arriba', '897');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Gustavo Diaz Ordaz', '891');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Hidalgo', '835');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Jaumave', '832');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'La Pesca', '835');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'La Soledad', '899');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Loma Alta (Loma Alta de Gomez Farias)', '832');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Lomas del Real', '836');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Los Aztecas', '831');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Los Comales', '891');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Llera de Canales', '832');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Matamoros', '868');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Miquihuana', '832');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Nueva Ciudad Guerrero', '897');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Nuevo Padilla', '835');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Nuevo Laredo', '867');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Nuevo Morelos', '482');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Nuevo Progreso', '899');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Nuevo Tantoan', '831');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Ocampo', '832');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Plan de Ayala', '831');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Reynosa', '899');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Rio Bravo', '899');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'San Antonio Rayon', '836');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'San Fernando', '841');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'San German', '841');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Sandoval', '868');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Santa Apolonia', '894');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Santa Rosalia', '891');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Santander Jimenez', '835');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Soto La Marina', '835');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Tampico', '833');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Tula', '832');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Valadeces', '891');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Valle Hermoso', '894');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Villa Aldama', '836');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Villa de Mendez', '841');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Villagran', '835');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(28, 'Xicotencatl', '832');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'Acopinalco del Peñon', '241');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'Altzayanca', '276');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'Apizaco', '241');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'Benito Juarez', '748');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'Calpulalpan', '749');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'Chiautempan', '246');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'Españita', '241');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'Huamantla', '247');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'Hueyotlipan', '241');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'Mazatecochco', '222');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'Muñoz', '241');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'Nanacamilpa', '748');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'Panotla', '246');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'Papalotla', '222');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'San Antonio Atotonilco', '248');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'San Bartolome Cuahuixmatlac', '246');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'San Cosme Xalostoc', '241');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'San Damian Texoloc', '246');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'San Lorenzo Cuapiaxtla', '276');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'San Marcos Contla', '246');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'San Martin Xaltocan', '241');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'San Mateo Tepetitla', '248');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'San Salvador Tzompantepec', '241');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'San Simeon Xipetzinco', '241');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'Sanctorum Lazaro Cardenas', '748');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'Santa Ana Nopalucan', '246');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'Santa Maria Nativitas', '246');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'Tequexquitla', '276');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'Tetla', '241');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'Tlaxcala', '246');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'Tlaxco', '241');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'Villa Mariano Matamoros', '248');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'Villa Vicente Guerrero', '222');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'Zacatelco', '246');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(29, 'Zitlaltepec', '223');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Abasolo del Valle', '283');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Acatlan', '279');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Acayucan', '924');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Actopan', '279');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Acula', '288');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Acultzingo', '272');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Achotal', '924');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Agua Dulce Papantla', '784');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Agua Dulce', '923');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Aguilera', '924');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Alamo Temapache', '765');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Almagres', '924');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Alto Lucero', '279');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Altotonga', '226');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Alvarado', '297');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Amartillan', '288');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Amatlan', '271');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Anahuac', '833');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Angel Rosario Cabada', '284');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Anton Lizardo', '297');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Arroyo Hondo', '235');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Banderilla', '228');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Boca del Monte', '283');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Boca del Rio', '229');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Camaron de Tejeda', '273');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Campo Cuichapa (Mpio. Cuichapa)', '278');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Canticas', '921');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Carlos A. Carrillo (San Cristobal)', '288');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Casitas', '232');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Castillo de Teayo', '746');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Catemaco', '294');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Cazones de Herrera', '784');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Cerro Azul', '785');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Citlaltepec', '785');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Ciudad Cardel', '296');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Ciudad Cuauhtemoc', '833');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Ciudad Mendoza', '272');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Ciudad Quetzalcoatl', '833');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Coacoatzintla', '228');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Coatepec', '228');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Coatzacoalcos', '921');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Coatzintla', '782');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Colipa', '279');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Colonia Manuel Gonzalez', '273');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Colonia Nuevo Morelos', '924');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Colonia Piloto', '846');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Comalteco', '784');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Comoapan', '294');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Cordoba', '271');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Corozal', '789');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Corral Nuevo', '294');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Cosamaloapan', '288');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Cosautlan de Carvajal', '279');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Coscomatepec', '273');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Cosoleacaque', '922');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Cotaxtla', '278');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Coyutla', '784');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Cuautlapan', '271');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Cuichapa (Mpio. Moloacan)', '923');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Cuitlahuac', '278');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Chacaltianguis', '288');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Chalma', '789');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Chiconquiaco', '279');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Chicontepec', '746');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Chichicaxtle', '296');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Chijol 17', '846');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Chinameca', '922');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Chocaman', '273');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Chontla', '785');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Dos Rios', '228');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'El Alazan', '765');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'El Cocuite', '285');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'El Conchal', '229');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'El Chote', '784');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'El Farallon(Campamento CFE)', '296');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'El Higo', '489');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'El Jicaro', '274');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'El Magozal', '833');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'El Moralillo', '833');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'El Nigromante', '283');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'El Palmar', '296');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'El Pital', '232');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Emilio Carranza', '235');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Entabladero', '784');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Estanzuela', '228');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Felipe Carrillo Puerto (Paso Largo)', '232');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Fortin de las Flores', '271');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Francisco Sarabia', '235');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Gutierrez Zamora', '766');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Hidalgotitlan', '924');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Huatusco', '273');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Huayacocotla', '774');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Huayalejo', '846');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Hueytepec', '232');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Idolos', '279');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Ignacio de la Llave', '285');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Isla', '283');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Ixcatepec', '785');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Ixhuatlan del Cafe', '273');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Ixhuatlan del Sureste', '921');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Ixtaczoquitlan', '272');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Jalacingo', '226');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Jalapa (Xalapa)', '228');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Jaltipan', '922');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Jamapa', '285');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Jesus Carranza', '924');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Joachin', '274');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Jose Cardel', '296');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Juan Diaz Covarrubias', '294');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Juanita', '924');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Juchique de Ferrer', '279');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'La Antigua', '296');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'La Concepcion', '228');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'La Granja', '288');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'La Laguna y Monte del Castillo', '285');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'La Reforma', '279');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'La Tinaja', '278');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'La Vigueta', '232');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Las Cucharas', '846');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Las Choapas', '923');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Lazaro Cardenas', '846');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Lerdo de Tejada', '284');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Linda Vista', '283');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Loma Bonita', '235');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Lomas de Arena', '766');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Lomas de Barrillas', '921');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Los Altos', '282');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Los Robles', '285');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Los Tigres (San Marcos)', '283');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Mahuixtlan', '228');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Maltrata', '272');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Manlio Fabio Altamirano', '285');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Martinez de la Torre', '232');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Medellin de Bravo', '285');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Medias Aguas', '924');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Minatitlan', '922');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Misantla', '235');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Monte Blanco', '273');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Mozomboa', '296');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Nanchital de Lazaro Cardenas del Rio', '921');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Naolinco de Victoria', '279');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Naranjal', '271');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Naranjos', '768');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Nautla', '235');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Nopaltepec', '288');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Nuevo Ixcatlan', '283');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Nuevo Progreso (El Doce)', '782');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Omealca', '278');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Orizaba', '272');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Otatitlan', '287');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Ozuluama', '846');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Pacho Viejo', '228');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Palma Sola', '296');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Panuco', '846');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Papantla', '784');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Paraiso La Reforma', '278');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Paraiso Novillero', '288');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Paraje Nuevo', '271');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Paso de Ovejas', '285');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Paso del Macho', '273');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Perote', '282');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Piedras Negras', '285');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Plan de Arroyos', '226');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Plan de las Hayas', '279');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Platon Sanchez', '789');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Playa Vicente', '283');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Potrero', '273');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Poza Rica', '782');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Rafael Ramirez (Las Vigas)', '282');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Rinconada', '279');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Rio Blanco', '272');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Rodriguez Clara', '283');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Saladero', '768');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'San Andres Tuxtla', '294');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'San Antonio Tenextepec', '282');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'San Juan Evangelista', '924');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'San Rafael', '235');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Santiago de la Peña', '783');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Santiago Tuxtla', '294');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Sayula de Aleman', '924');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Soledad de Doblado', '285');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Suchilapan del Rio', '924');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Sumidero', '272');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Tamalin', '768');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Tamiahua', '768');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Tamos', '846');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Tampico Alto', '833');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Tantoyuca', '789');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Tecolutla', '766');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Tempoal de Sanchez', '789');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Tenenexpan', '285');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Teocelo', '279');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Tepetlan', '279');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Tepetzintla', '785');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Tequila', '278');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Texistepec', '924');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Tezonapa', '278');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Tierra Blanca', '274');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Tihuatlan', '746');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Tlacojalpan', '288');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Tlacolula', '746');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Tlacotalpan', '288');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Tlalixcoyan', '285');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Tlapacoyan', '225');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Tolome', '285');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Tomatlan', '273');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Totutla', '273');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Trapiche del Rosario', '279');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Tres Valles', '288');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Tres Zapotes', '294');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Tuxpan', '783');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Tuxtilla', '288');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Tuzamapan', '228');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Ursulo Galvan', '296');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Valente Diaz', '229');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Vega de Alatorre', '235');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Veracruz', '229');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Villa Azueta', '283');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Villa Cacalilao (Cacalilao)', '846');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Villa Emiliano Zapata (El Carrizal)', '279');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Villa Tejeda', '274');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Xico', '228');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Yanga', '278');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Yecuatla', '279');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Zacate Colorado', '746');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Zempoala', '296');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Zongolica', '278');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(30, 'Zozocolco de Hidalgo', '784');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Acanceh', '988');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Akil', '997');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Baca', '991');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Buctzotz', '991');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Cacalchen', '991');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Cansahcab', '991');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Caucel', '999');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Celestun', '988');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Cenotillo', '991');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Colonia Yucatan', '986');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Conkal', '999');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Chemax', '985');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Chicxulub Pueblo', '999');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Chochola', '988');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Cholul', '999');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Dzidzantun', '991');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Dzilam de Bravo', '991');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Dzilam Gonzalez', '991');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Espita', '986');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Flamboyanes', '969');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Halacho', '997');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Hocaba', '988');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Hoctun', '988');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Huhi', '988');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Hunucma', '988');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Izamal', '988');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Kanasin', '999');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Kantunil', '988');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Kaua', '985');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Komchen', '999');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Las Coloradas', '986');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Mani', '997');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Maxcanu', '997');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Merida', '999');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Motul', '991');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Muna', '997');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Oxkutzcab', '997');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Panaba', '986');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Peto', '997');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Piste', '985');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Progreso', '969');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Rio Lagartos', '986');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'San Felipe', '986');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Seye', '988');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Sotuta', '988');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Sucila', '986');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Tahmek', '988');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Tecoh', '988');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Tekanto', '991');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Tekax', '997');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Tekit', '997');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Telchac Pueblo', '991');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Telchac Puerto', '991');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Temax', '991');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Temozon', '985');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Ticul', '997');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Tixkokob', '991');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Tizimin', '986');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Tunkas', '991');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Tzucacab', '997');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Uman', '988');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Uxmal (Hoteles)', '997');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Valladolid', '985');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(31, 'Xmatkuil', '999');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Benito Juarez (Mpio.B. Juarez)', '467');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Apozol', '467');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Apulco', '346');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Atolinga', '437');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Benito Juarez (Mpio.Sombrerete)', '433');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Boquilla de Arriba', '498');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Calera de Victor Rosales', '478');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Campo Cinco (La Honda)', '433');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Campo Diecisiete (La Honda)', '433');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Cañitas de Felipe Pescador', '458');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Ciudad Jerez de Garcia Salinas', '494');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Colonia Gonzalez Ortega', '433');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Colonia Madero (Madero)', '496');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Concepcion del Oro', '842');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Chalchihuites', '457');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Charco Blanco', '433');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'El Bordo Buenavista', '492');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'El Bote', '492');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'El Cargadero', '494');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'El Chique', '463');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'El Saucito', '458');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Emiliano Zapata (Morones)', '498');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Ermita de Guadalupe', '494');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Ermita de los Correas', '494');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Estacion San Jose', '493');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Estancia de Animas', '496');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Fresnillo', '493');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Garcia de la Cadena', '467');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'General Enrique Estrada', '478');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'General Genaro Codina', '458');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Gonzalez Ortega', '496');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Guadalupe', '492');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Hacienda Nueva', '492');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Hidalgo (Colonia Hidalgo)', '433');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Huanusco', '463');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Ignacio Allende (Santa Maria de la)', '467');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Jalpa', '463');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Jimenez del Teul', '457');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Jose Maria Morelos (San Jose de Gracia)', '457');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Juan Aldama', '498');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Juchipila', '467');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'La Luz', '492');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'La Victoria', '496');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Laguna Grande', '457');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Las Esperanzas (El Ranchito)', '498');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Loreto', '496');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Luis Moya', '458');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Malpaso', '499');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Mazapil', '842');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Mezquital del Oro', '467');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Miguel Auza', '433');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Momax', '437');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Monte Escobedo', '457');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Monte Mariana', '493');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Morelos', '492');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Moyahua', '467');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Nieves', '498');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Nochistlan', '346');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Noria de Angeles', '496');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Ojocaliente', '458');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Panfilo Natera', '458');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Pastoria', '458');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Piedra Gorda', '458');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Pimienta', '492');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Pinos', '496');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Plateros', '493');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Plenitud', '493');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Pozo de Gamboa', '478');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Progreso de Alfonso Medina (Colonia Progreso)', '498');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Rancho Grande', '498');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Rio Florido', '493');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Rio Grande', '498');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Sain Alto', '498');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Saladillo (El Saladillo)', '458');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'San Jeronimo', '492');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'San Jose de Lourdes', '493');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'San Pedro Piedra Gorda', '458');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'San Tiburcio', '842');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Santa Elena (Francisco Zarco)', '458');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Santa Rita', '498');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Sauceda de la Borda', '492');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Sombrerete', '433');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Tabasco', '463');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Tacoaleche', '492');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Tayahua (San Jose de Tayahua)', '499');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Tepechitlan', '437');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Tepetongo', '494');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Tetillas', '498');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Teul de Gonzalez Ortega', '467');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Tierra Blanca', '496');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Tlachichila', '346');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Tlaltenango', '437');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Trancoso', '492');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Valparaiso', '457');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Villa de Cos', '458');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Villa Hidalgo', '496');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Villa Insurgentes (El Calabazal)', '433');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Villanueva', '499');
INSERT INTO cat_country_state_city(state_id, city_name, area_code) VALUES(32, 'Zacatecas', '492');

/*
 Table structure for table cat_measurement_units 
 */
DROP TABLE IF EXISTS cat_measurement_units;

CREATE TABLE cat_measurement_units (
  unit_id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  unit_name VARCHAR(50) NOT NULL
);

/*
 Table structure for table cat_phone_types
 */
DROP TABLE IF EXISTS cat_phone_types;

CREATE TABLE cat_phone_types (
  phtype_id int(10) unsigned NOT NULL AUTO_INCREMENT,
  phone_type varchar(50) NOT NULL,
  PRIMARY KEY (phtype_id)
);

/*Table structure for table cat_ranchers */

DROP TABLE IF EXISTS cat_ranchers;

CREATE TABLE cat_ranchers (
  rancher_id int(10) unsigned NOT NULL AUTO_INCREMENT,
  aka varchar(100) DEFAULT NULL,
  first_name varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL,
  mother_name varchar(50) DEFAULT NULL,
  birth_date date NOT NULL,
  email_add varchar(150) NOT NULL,
  job_title varchar(150) NOT NULL,
  rfc varchar(100) NOT NULL,
  PRIMARY KEY (rancher_id),
  UNIQUE KEY U_aka (aka)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
