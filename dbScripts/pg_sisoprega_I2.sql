/* *************************************************************
I2 Tables.
   ************************************************************ */

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


DROP TABLE IF EXISTS cat_expense_concept CASCADE;
CREATE TABLE cat_expense_concept(
	concept_id      SERIAL PRIMARY KEY,
	concept_name    VARCHAR(80) UNIQUE NOT NULL,
	expense_formula VARCHAR(150)
);

GRANT ALL ON cat_expense_concept TO sisoprega;
GRANT ALL ON cat_expense_concept_concept_id_seq TO sisoprega;

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

DROP TABLE IF EXISTS cat_carrier CASCADE;
CREATE TABLE cat_carrier(
	carrier_id	SERIAL PRIMARY KEY,
	carrier_name	varchar(80) UNIQUE NOT NULL,
	address_one 	varchar(250),
	address_two	varchar(250),
	city		varchar(80),
	address_state	varchar(80),
	zip_code	varchar(20),
	phone		varchar(20)
);

GRANT ALL ON cat_carrier TO sisoprega;
GRANT ALL ON cat_carrier_carrier_id_seq TO sisoprega;

   
DROP TABLE IF EXISTS ctrl_hermana CASCADE;
CREATE TABLE ctrl_hermana(
	hermana_id SERIAL PRIMARY KEY,
	entry_no   VARCHAR(16) UNIQUE NOT NULL,
	ref_no     VARCHAR(16) UNIQUE NOT NULL,
	consignee  VARCHAR(80),
	account_of VARCHAR(80),
	rancher_id integer NOT NULL REFERENCES cat_rancher(rancher_id),
	hermana_by varchar(50),
	de_when    timestamp DEFAULT current_timestamp
);

GRANT ALL ON ctrl_hermana TO sisoprega;
GRANT ALL ON ctrl_hermana_hermana_id_seq TO sisoprega;

DROP TABLE IF EXISTS ctrl_hermana_reception CASCADE;
CREATE TABLE ctrl_hermana_reception(
	hermana_id integer NOT NULL REFERENCES ctrl_hermana(hermana_id),
	reception_id integer NOT NULL REFERENCES ctrl_reception(reception_id)
);

GRANT ALL ON ctrl_hermana_reception TO sisoprega;

DROP TABLE IF EXISTS ctrl_hermana_corte_exportador CASCADE;
CREATE TABLE ctrl_hermana_corte_exportador(
	corte_expo      SERIAL PRIMARY KEY,
	hermana_id  integer NOT NULL REFERENCES ctrl_hermana(hermana_id),
	quality_id  integer NOT NULL REFERENCES cat_cattle_quality(quality_id),
	heads       integer not null,
	weight      decimal(12,4) not null,
	cut_seq     integer NOT NULL,
	purchase_price  decimal(10,2) NOT NULL DEFAULT 0.0
);

GRANT ALL ON ctrl_hermana_corte_exportador TO sisoprega;
GRANT ALL ON ctrl_hermana_corte_exportador_corte_expo_seq TO sisoprega;

DROP TABLE IF EXISTS ctrl_hermana_corte CASCADE;
CREATE TABLE ctrl_hermana_corte(
	corte       SERIAL PRIMARY KEY,
	hermana_id  integer NOT NULL REFERENCES ctrl_hermana(hermana_id),
	barnyard_id integer NOT NULL REFERENCES cat_barnyard(barnyard_id),
	quality_id  integer NOT NULL REFERENCES cat_cattle_quality(quality_id),
	heads       integer not null,
	weight      decimal(12,4) not null,
	cut_seq     integer NOT NULL,
	paid_date	DATE,
	paid_amount	decimal(12,2)
	
);

GRANT ALL ON ctrl_hermana_corte TO sisoprega;
GRANT ALL ON ctrl_hermana_corte_corte_seq TO sisoprega;

DROP TABLE IF EXISTS ctrl_hermana_expense CASCADE;
CREATE TABLE ctrl_hermana_expense(
	expense_id   SERIAL PRIMARY KEY,
    concept_id  integer NOT NULL REFERENCES cat_expense_concept(concept_id),
	hermana_id  integer NOT NULL REFERENCES ctrl_hermana(hermana_id),
	amount      decimal(12,2)
);

GRANT ALL ON ctrl_hermana_expense TO sisoprega;
GRANT ALL ON ctrl_hermana_expense_expense_id_seq TO sisoprega;

DROP TABLE IF EXISTS ctrl_purchase CASCADE;
CREATE TABLE ctrl_purchase(
	purchase_id    SERIAL PRIMARY KEY,
	seller_id      integer NOT NULL REFERENCES cat_seller(seller_id),
	cattype_id     integer NOT NULL REFERENCES cat_cattle_type(cattype_id),
	purchase_date  DATE not null DEFAULT current_date,
	operationDateTime timestamp without time zone NOT NULL DEFAULT now()
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
	weight       decimal(12,4) not null,
	purchase_price  decimal(10,2) NOT NULL DEFAULT 0.0,
	paid_date	DATE,
	paid_amount	decimal(12,2)
);

GRANT ALL ON ctrl_purchase_detail TO sisoprega;
GRANT ALL ON ctrl_purchase_detail_record_id_seq TO sisoprega;

DROP TABLE IF EXISTS ctrl_inventory CASCADE;
CREATE TABLE ctrl_inventory(
	inventory_id 			SERIAL PRIMARY KEY,
	cattype_id   			integer NOT NULL REFERENCES cat_cattle_type(cattype_id),
	quality_id   			integer NOT NULL REFERENCES cat_cattle_quality(quality_id),
	barnyard_id  			integer NOT NULL REFERENCES cat_barnyard(barnyard_id),
	heads 				integer NOT NULL DEFAULT 0,
	weight 				decimal(12,4) not null,
	feed 				decimal(12,4) NOT NULL DEFAULT 0,
	available_to_sell		integer NOT NULL DEFAULT 0,
	sold				integer NOT NULL DEFAULT 0,
	available_to_program_ship	integer NOT NULL DEFAULT 0,
	programmed_to_ship		integer NOT NULL DEFAULT 0,
	available_to_ship		integer NOT NULL DEFAULT 0,
	shipped				integer NOT NULL DEFAULT 0,
	cycle_completed			DATE
	
);

GRANT ALL ON ctrl_inventory TO sisoprega;
GRANT ALL ON ctrl_inventory_inventory_id_seq TO sisoprega;

DROP TABLE IF EXISTS ctrl_sale CASCADE;
CREATE TABLE ctrl_sale(
	sale_id        	SERIAL PRIMARY KEY,
	customer_id     integer NOT NULL REFERENCES cat_customer(customer_id),
	cattype_id     	integer NOT NULL REFERENCES cat_cattle_type(cattype_id),
	sale_date  	DATE not null DEFAULT current_date,
	operationDateTime timestamp without time zone NOT NULL DEFAULT now()
);

GRANT ALL ON ctrl_sale TO sisoprega;
GRANT ALL ON ctrl_sale_sale_id_seq TO sisoprega;

DROP TABLE IF EXISTS ctrl_sale_detail CASCADE;
CREATE TABLE ctrl_sale_detail(
	record_id    		SERIAL PRIMARY KEY,
	sale_id      		integer NOT NULL REFERENCES ctrl_sale(sale_id),
	barnyard_id  		integer NOT NULL REFERENCES cat_barnyard(barnyard_id),
	quality_id   		integer NOT NULL REFERENCES cat_cattle_quality(quality_id),
	heads        		integer not null,
	weight       		decimal(12,4) not null,
	sale_seq     		integer not null,
	sale_price  		decimal(10,2) NOT NULL DEFAULT 0.0,
	inventory_id 		integer not null,
	collected_date		DATE,
	collected_amount	decimal(12,2),
	folio_id		integer REFERENCES ctrl_folio(folio_id)
	
);

GRANT ALL ON ctrl_sale_detail TO sisoprega;
GRANT ALL ON ctrl_sale_detail_record_id_seq TO sisoprega;

CREATE OR REPLACE VIEW vw_importable AS
SELECT reception.reception_id, 
    reception.rancher_id, 
    reception.cattle_type, 
    cattle.cattype_name AS cattle_name, 
    detail.hc, 
    detail.weight, 
    sum(rejects.hc) AS rejects_hc, 
    sum(inspection.weight) AS rejects_weight
   FROM ctrl_reception reception
   JOIN cat_cattle_type cattle ON reception.cattle_type = cattle.cattype_id
   JOIN ctrl_reception_headcount detail ON reception.reception_id = detail.reception_id
   JOIN ctrl_inspection inspection ON reception.reception_id = inspection.reception_id
   LEFT JOIN ctrl_inspection_result rejects ON inspection.inspection_id = rejects.inspection_id
   LEFT JOIN ctrl_hermana_reception hermana ON reception.reception_id = hermana.reception_id
   LEFT JOIN ctrl_reception_barnyard r_by ON reception.reception_id = r_by.reception_id 
  WHERE hermana.hermana_id IS NULL AND r_by.barnyard_id IS NULL
  GROUP BY reception.reception_id, reception.rancher_id, reception.cattle_type, cattle.cattype_name, detail.hc, detail.weight, hermana.hermana_id;

GRANT ALL ON vw_importable TO sisoprega;

DROP TABLE IF EXISTS ctrl_shipment CASCADE;
CREATE TABLE ctrl_shipment(
	shipment_id  		SERIAL PRIMARY KEY,
	date_time_programed    	timestamp without time zone NOT NULL DEFAULT now(),
	customer_id   		integer NOT NULL REFERENCES cat_customer(customer_id),
	carrier_id_programed   	integer REFERENCES cat_carrier(carrier_id),
	quality_id		integer NOT NULL REFERENCES cat_cattle_quality(quality_id),
	record_when		timestamp NOT NULL DEFAULT now()
);

GRANT ALL ON ctrl_shipment TO sisoprega;
GRANT ALL ON ctrl_shipment_shipment_id_seq TO sisoprega;

DROP TABLE IF EXISTS ctrl_shipment_detail CASCADE;
CREATE TABLE ctrl_shipment_detail(
	shipment_detail_id	SERIAL PRIMARY KEY,
	shipment_id  		integer NOT NULL REFERENCES ctrl_shipment(shipment_id),
	inventory_id		integer NOT NULL REFERENCES ctrl_inventory(inventory_id),
	heads        		integer NOT NULL,
	weight       		decimal(12,4) NOT NULL,
	sale_id  		integer NOT NULL REFERENCES ctrl_sale(sale_id),
	sale_detail_id 		integer NOT NULL REFERENCES ctrl_sale_detail(record_id),
	item_number		integer not null	
);

GRANT ALL ON ctrl_shipment_detail TO sisoprega;
GRANT ALL ON ctrl_shipment_detail_shipment_detail_id_seq TO sisoprega;

DROP TABLE IF EXISTS ctrl_shipment_release CASCADE;
CREATE TABLE ctrl_shipment_release (
	shipment_release_id	SERIAL PRIMARY KEY,
	shipment_id	 	integer NOT NULL REFERENCES ctrl_shipment(shipment_id),
	date_time    		timestamp without time zone NOT NULL DEFAULT now(),
	carrier_id   		integer REFERENCES cat_carrier(carrier_id),
	driver			VARCHAR(80),
	plates			VARCHAR(20),
	paid_date		DATE,
	paid_amount		decimal(12,2)
	
);

GRANT ALL ON ctrl_shipment_release TO sisoprega;
GRANT ALL ON ctrl_shipment_release_shipment_release_id_seq TO sisoprega;


DROP TABLE IF EXISTS ctrl_shrinkage CASCADE;
CREATE TABLE ctrl_shrinkage(
	shrinkage_id  		SERIAL PRIMARY KEY,
	date_time    		timestamp without time zone NOT NULL DEFAULT now(),
	inventory_id 		integer NOT NULL REFERENCES ctrl_inventory(inventory_id),	
	heads 			integer NOT NULL DEFAULT 0,
	weight 			decimal(12,4) not null,	
	comment			varchar(100)
);

GRANT ALL ON ctrl_shrinkage TO sisoprega;
GRANT ALL ON ctrl_shrinkage_shrinkage_id_seq TO sisoprega;

DROP TABLE IF EXISTS ctrl_feed_us CASCADE;
CREATE TABLE ctrl_feed_us(
	feed_us_id  		SERIAL PRIMARY KEY,
	date_time    		timestamp without time zone NOT NULL DEFAULT now(),
	inventory_id 		integer NOT NULL REFERENCES ctrl_inventory(inventory_id),
	quantity		decimal(12,4) not null DEFAULT 0
);

GRANT ALL ON ctrl_feed_us TO sisoprega;
GRANT ALL ON ctrl_feed_us_feed_us_id_seq TO sisoprega;


DROP TABLE IF EXISTS cat_carrier_contact CASCADE;
CREATE TABLE cat_carrier_contact(
	carrier_contact_id	SERIAL PRIMARY KEY,
	carrier_id 		integer NOT NULL REFERENCES cat_carrier(carrier_id),
	name			varchar(50),
	phone			varchar(20)

);

GRANT ALL ON cat_carrier_contact TO sisoprega;
GRANT ALL ON cat_carrier_contact_carrier_contact_id_seq TO sisoprega;

CREATE OR REPLACE VIEW vw_purchased AS
SELECT seller.seller_id as seller_id, 'seller' as seller_type, seller.seller_name as seller, quality.quality_name, cattle.cattype_name, purchase.purchase_date, 
array_to_string(array_agg(pens.barnyard_code),',') AS pen, SUM(detail.heads) as heads, SUM(detail.weight) as weight
FROM ctrl_purchase purchase
INNER JOIN cat_seller seller ON purchase.seller_id = seller.seller_id
INNER JOIN cat_cattle_type cattle ON purchase.cattype_id = cattle.cattype_id
INNER JOIN ctrl_purchase_detail detail ON purchase.purchase_id = detail.purchase_id
INNER JOIN cat_barnyard pens ON detail.barnyard_id = pens.barnyard_id
INNER JOIN cat_cattle_quality quality ON quality.quality_id = detail.quality_id
GROUP BY seller.seller_id, seller.seller_name, quality.quality_name, cattle.cattype_name, purchase.purchase_date
UNION ALL
SELECT rancher.rancher_id as seller_id, 'rancher' as seller_type, rancher.rancher_name as seller, quality.quality_name, cattle.cattype_name, date(hermana.de_when) as sale_date,
array_to_string(array_agg(pens.barnyard_code),',') AS pen, SUM(detail.heads) as heads, SUM(detail.weight) as weight
FROM ctrl_hermana hermana
INNER JOIN vw_rancher rancher ON rancher.rancher_id = hermana.rancher_id
INNER JOIN ctrl_hermana_corte detail ON detail.hermana_id = hermana.hermana_id
INNER JOIN cat_cattle_quality quality ON quality.quality_id = detail.quality_id
INNER JOIN ctrl_hermana_reception chr ON chr.hermana_id = hermana.hermana_id
INNER JOIN ctrl_reception reception ON reception.reception_id = chr.reception_id
INNER JOIN cat_cattle_type cattle ON cattle.cattype_id = reception.cattle_type
INNER JOIN cat_barnyard pens ON detail.barnyard_id = pens.barnyard_id
GROUP BY rancher.rancher_id, rancher.rancher_name, quality.quality_name, cattle.cattype_name, hermana.de_when;
GRANT ALL ON vw_purchased to sisoprega;
