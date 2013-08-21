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
	cattype_id     integer NOT NULL REFERENCES cat_cattle_type(cattype_id),
	purchase_date  DATE not null DEFAULT current_date
);

GRANT ALL ON ctrl_purchase TO sisoprega;
GRANT ALL ON ctrl_purchase_purchase_id_seq TO sisoprega;

DROP TABLE IF EXISTS ctrl_purchase_detail CASCADE;
CREATE TABLE ctrl_purchase_detail(
	record_id    SERIAL PRIMARY KEY,
	purchase_id  integer NOT NULL REFERENCES ctrl_purchase(purchase_id),
	barnyard_id  integer NOT NULL REFERENCES cat_barnyard(barnyard_id),
	quality_id   integer NOT NULL REFERENCES cat_cattle_quality(quality_id),
	heads        integer not null,
	weight       decimal(12,4) not null
);

GRANT ALL ON ctrl_purchase_detail TO sisoprega;
GRANT ALL ON ctrl_purchase_detail_record_id_seq TO sisoprega;

DROP TABLE IF EXISTS cat_customer CASCADE;
CREATE TABLE cat_customer(
	customer_id    SERIAL PRIMARY KEY,
	customer_name  varchar(80) UNIQUE NOT NULL,
	address_one  varchar(250),
	address_two  varchar(250),
	city         varchar(80),
	address_state varchar(80),
	zip_code varchar(20),
	phone varchar(20),
	email varchar(150)
);

GRANT ALL ON cat_customer TO sisoprega;
GRANT ALL ON cat_customer_customer_id_seq TO sisoprega;

DROP TABLE IF EXISTS ctrl_inventory CASCADE;
CREATE TABLE ctrl_inventory(
	inventory_id SERIAL PRIMARY KEY,
	cattype_id     integer NOT NULL REFERENCES cat_cattle_type(cattype_id),
	quality_id   integer NOT NULL REFERENCES cat_cattle_quality(quality_id),
	barnyard_id  integer UNIQUE NOT NULL REFERENCES cat_barnyard(barnyard_id),
	heads integer NOT NULL DEFAULT 0,
	weight decimal(12,4) not null,
	feed integer NOT NULL DEFAULT 0,
	UNIQUE (barnyard_id)
);

GRANT ALL ON ctrl_inventory TO sisoprega;
GRANT ALL ON ctrl_inventory_inventory_id_seq TO sisoprega;

DROP TABLE IF EXISTS ctrl_sale CASCADE;
CREATE TABLE ctrl_sale(
	sale_id        	SERIAL PRIMARY KEY,
	customer_id     integer NOT NULL REFERENCES cat_customer(customer_id),
	cattype_id     	integer NOT NULL REFERENCES cat_cattle_type(cattype_id),
	sale_date  	DATE not null DEFAULT current_date
);

GRANT ALL ON ctrl_sale TO sisoprega;
GRANT ALL ON ctrl_sale_sale_id_seq TO sisoprega;

DROP TABLE IF EXISTS ctrl_sale_detail CASCADE;
CREATE TABLE ctrl_sale_detail(
	record_id    SERIAL PRIMARY KEY,
	sale_id      integer NOT NULL REFERENCES ctrl_sale(sale_id),
	barnyard_id  integer NOT NULL REFERENCES cat_barnyard(barnyard_id),
	quality_id   integer NOT NULL REFERENCES cat_cattle_quality(quality_id),
	heads        integer not null,
	weight       decimal(12,4) not null
);

GRANT ALL ON ctrl_sale_detail TO sisoprega;
GRANT ALL ON ctrl_sale_detail_record_id_seq TO sisoprega;
