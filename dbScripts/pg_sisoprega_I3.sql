CREATE OR REPLACE VIEW vw_app_log AS
select ROW_NUMBER() over (order by OperationTime) as id, * from (
SELECT 'RECEPTION' as Operation,
ctrl_reception_headcount.operationdatetime as OperationTime,
  ctrl_reception_headcount.hc as Heads,
  ctrl_reception_headcount.weight as Weight,
cat_cattle_type.cattype_name || ' ' ||
  cat_measurement_unit.unit_name as Description
FROM 
  public.ctrl_reception_headcount,
  public.ctrl_reception,
  public.cat_cattle_type,
  public.cat_measurement_unit
WHERE
  ctrl_reception_headcount.weight_uom = cat_measurement_unit.unit_id AND
  ctrl_reception.reception_id = ctrl_reception_headcount.reception_id AND
  ctrl_reception.cattle_type = cat_cattle_type.cattype_id 

UNION ALL
SELECT 'INSPECTION' as Operation,
 ctrl_inspection_result.operationdatetime as OperationTime,
  ctrl_inspection_result.hc as Heads,
  0 as Weight,
  cat_inspection_code.inspection_code_description as Description
FROM
  public.ctrl_inspection,
  public.ctrl_inspection_result,
  public.cat_inspection_code
WHERE
  ctrl_inspection.inspection_id = ctrl_inspection_result.inspection_id AND
  cat_inspection_code.inspection_code_id = ctrl_inspection_result.inspection_code_id

UNION ALL


SELECT 'PURCHASE' as Operation,
  ctrl_purchase.operationdatetime as OperationTime,
  sum(ctrl_purchase_detail.heads) as Heads,
  sum(ctrl_purchase_detail.weight) as Weight,
  '' as Description
FROM
  public.ctrl_purchase,
  public.ctrl_purchase_detail
WHERE
  ctrl_purchase.purchase_id = ctrl_purchase_detail.purchase_id
  GROUP BY operation, ctrl_purchase.operationdatetime

UNION ALL


SELECT 'HERMANA' as Operation,
  ctrl_hermana.de_when as OperationTime, 
  SUM(ctrl_hermana_corte.heads) as Heads, 
  sum(ctrl_hermana_corte.weight) as Weight,
  '' as Description
FROM 
  public.ctrl_hermana, 
  public.ctrl_hermana_corte, 
  public.cat_cattle_quality
WHERE 
  ctrl_hermana_corte.hermana_id = ctrl_hermana.hermana_id AND
  ctrl_hermana_corte.quality_id = cat_cattle_quality.quality_id
  GROUP BY
  ctrl_hermana.de_when

UNION ALL


SELECT 'SALE' as Operation,
  ctrl_sale.operationdatetime as OperationTime,
 sum(ctrl_sale_detail.heads) as Heads, 
  sum(ctrl_sale_detail.weight) as Weight,
   cat_cattle_type.cattype_name as Description 
 
FROM 
  public.ctrl_sale, 
  public.ctrl_sale_detail, 
  public.cat_cattle_type
WHERE 
  ctrl_sale.sale_id = ctrl_sale_detail.sale_id AND
  cat_cattle_type.cattype_id = ctrl_sale.cattype_id

  GROUP BY
	ctrl_sale.operationdatetime, 
   cat_cattle_type.cattype_name

UNION ALL


SELECT DISTINCT
'SHIP SCHEDULE' as Operation,
  ctrl_shipment.date_time_programed as OperationTime, 
 ctrl_shipment_detail.heads as Heads, 
  ctrl_shipment_detail.weight as Weight,
'' as Description
  
FROM 
  public.ctrl_shipment, 
  public.ctrl_shipment_detail, 
  public.ctrl_shipment_release
WHERE 
  ctrl_shipment.shipment_id = ctrl_shipment_detail.shipment_id AND
   ctrl_shipment.shipment_id not in (

SELECT ctrl_shipment_release.shipment_id FROM ctrl_shipment_release)


UNION ALL


SELECT 'SHIP RELEASE' as Operation,
  ctrl_shipment.date_time_programed as OperationTime,
 sum(ctrl_shipment_detail.heads) as Heads,
  sum(ctrl_shipment_detail.weight) as Weight,
  '' as Description
FROM 
  public.ctrl_shipment, 
  public.ctrl_shipment_detail, 
  public.ctrl_shipment_release
WHERE 
  ctrl_shipment.shipment_id = ctrl_shipment_detail.shipment_id AND
  ctrl_shipment_release.shipment_id = ctrl_shipment.shipment_id
GROUP BY ctrl_shipment.date_time_programed

) as todayLog
where OperationTime > current_date - 1
ORDER BY OperationTime DESC;

GRANT ALL ON vw_app_log to sisoprega;






CREATE OR REPLACE VIEW vw_unpriced AS
SELECT 	detail.record_id as record_id,
	seller.seller_id as who_id, 
	'seller' as who_type, 
	seller.seller_name as who_name, 
	quality.quality_name, 
	cattle.cattype_name, 
	purchase.purchase_date as operation_date, 
	array_to_string(array_agg(pens.barnyard_code),',') AS pen, 
	SUM(detail.heads) as heads, 
	SUM(detail.weight) as weight

FROM ctrl_purchase purchase
INNER JOIN cat_seller seller ON purchase.seller_id = seller.seller_id
INNER JOIN cat_cattle_type cattle ON purchase.cattype_id = cattle.cattype_id
INNER JOIN ctrl_purchase_detail detail ON purchase.purchase_id = detail.purchase_id
INNER JOIN cat_barnyard pens ON detail.barnyard_id = pens.barnyard_id
INNER JOIN cat_cattle_quality quality ON quality.quality_id = detail.quality_id
GROUP BY detail.record_id, seller.seller_id, seller.seller_name, quality.quality_name, cattle.cattype_name, purchase.purchase_date

UNION ALL

SELECT 	detail.corte as record_id,
	rancher.rancher_id as who_id, 
	'rancher' as who_type, 
	rancher.rancher_name as who_name, 
	quality.quality_name, 
	cattle.cattype_name, 
	date(hermana.de_when) as operation_date,
	array_to_string(array_agg(pens.barnyard_code),',') AS pen, 
	SUM(detail.heads) as heads, 
	SUM(detail.weight) as weight

FROM ctrl_hermana hermana
INNER JOIN vw_rancher rancher ON rancher.rancher_id = hermana.rancher_id
INNER JOIN ctrl_hermana_corte detail ON detail.hermana_id = hermana.hermana_id
INNER JOIN cat_cattle_quality quality ON quality.quality_id = detail.quality_id
INNER JOIN ctrl_hermana_reception chr ON chr.hermana_id = hermana.hermana_id
INNER JOIN ctrl_reception reception ON reception.reception_id = chr.reception_id
INNER JOIN cat_cattle_type cattle ON cattle.cattype_id = reception.cattle_type
INNER JOIN cat_barnyard pens ON detail.barnyard_id = pens.barnyard_id
GROUP BY detail.corte, rancher.rancher_id, rancher.rancher_name, quality.quality_name, cattle.cattype_name, hermana.de_when

UNION ALL

SELECT 	detail.record_id as record_id, 
	customer.customer_id as who_id, 
	'customer' as who_type, 
	customer.customer_name as who_name, 
	quality.quality_name, 
	cattle.cattype_name, 
	sale.sale_date as operation_date, 
	array_to_string(array_agg(pens.barnyard_code),',') AS pen, 
	SUM(detail.heads) as heads, 
	SUM(detail.weight) as weight

FROM ctrl_sale sale
INNER JOIN cat_customer customer ON sale.customer_id = customer.customer_id
INNER JOIN cat_cattle_type cattle ON sale.cattype_id = cattle.cattype_id
INNER JOIN ctrl_sale_detail detail ON sale.sale_id = detail.sale_id
INNER JOIN cat_barnyard pens ON detail.barnyard_id = pens.barnyard_id
INNER JOIN cat_cattle_quality quality ON quality.quality_id = detail.quality_id
GROUP BY detail.record_id, customer.customer_id, customer.customer_name, quality.quality_name, cattle.cattype_name, sale.sale_date;

GRANT ALL ON vw_unpriced to sisoprega;



CREATE OR REPLACE VIEW vw_unpriced2 AS
select ROW_NUMBER() over (order by OperationTime) as Id, * from (
SELECT 
  ctrl_purchase_detail.record_id as RecordId,
  'PURCHASE' as Operation,	
  ctrl_purchase.operationdatetime as OperationTime,
  ctrl_purchase.cattype_id as CattleTypeId,
  cat_cattle_type.cattype_name as CattleName,
  ctrl_purchase_detail.quality_id as QualityId,
  cat_cattle_quality.quality_name as QualityName,
  ctrl_purchase_detail.heads as Heads,
  ctrl_purchase_detail.weight as Weight,
  ctrl_purchase_detail.purchase_price as Price
FROM
  ctrl_purchase
  INNER JOIN ctrl_purchase_detail ON ctrl_purchase.purchase_id = ctrl_purchase_detail.purchase_id
  INNER JOIN cat_cattle_quality ON cat_cattle_quality.quality_id = ctrl_purchase_detail.quality_id
  INNER JOIN cat_cattle_type ON cat_cattle_type.cattype_id = ctrl_purchase.cattype_id
WHERE
  ctrl_purchase_detail.purchase_price <= 0

UNION ALL


SELECT distinct
  ctrl_hermana_corte_exportador.corte_expo as RecordId,
  'HERMANA' as Operation,
  ctrl_hermana.de_when as OperationTime, 
  cat_cattle_type.cattype_id as CattleTypeId,
  cat_cattle_type.cattype_name as CattleName,
  ctrl_hermana_corte_exportador.quality_id as QualityId,
  cat_cattle_quality.quality_name as QualityName,
  ctrl_hermana_corte_exportador.heads as Heads, 
  ctrl_hermana_corte_exportador.weight as Weight,
  ctrl_hermana_corte_exportador.purchase_price as Price
FROM
  ctrl_hermana
  INNER JOIN ctrl_hermana_corte_exportador ON ctrl_hermana_corte_exportador.hermana_id = ctrl_hermana.hermana_id
  INNER JOIN cat_cattle_quality ON ctrl_hermana_corte_exportador.quality_id  = cat_cattle_quality.quality_id
  INNER JOIN ctrl_hermana_reception ON ctrl_hermana_reception.hermana_id = ctrl_hermana.hermana_id
  INNER JOIN ctrl_reception ON ctrl_reception.reception_id =ctrl_hermana_reception.reception_id
  INNER JOIN cat_cattle_type ON cat_cattle_type.cattype_id = ctrl_reception.cattle_type
WHERE 
  ctrl_hermana_corte_exportador.purchase_price <= 0

UNION ALL

SELECT 
  ctrl_sale_detail.record_id as RecordId,
  'SALE' as Operation,
  ctrl_sale.operationdatetime as OperationTime,
  ctrl_sale.cattype_id as CattleTypeId,
  cat_cattle_type.cattype_name as CattleName,
  ctrl_sale_detail.quality_id as QualityId,
  cat_cattle_quality.quality_name as QualityName,
  ctrl_sale_detail.heads as Heads, 
  ctrl_sale_detail.weight as Weight,
  ctrl_sale_detail.sale_price as Price
FROM 
  ctrl_sale
  INNER JOIN ctrl_sale_detail ON ctrl_sale_detail.sale_id  = ctrl_sale.sale_id
  INNER JOIN cat_cattle_quality ON ctrl_sale_detail.quality_id  = cat_cattle_quality.quality_id
  INNER JOIN cat_cattle_type ON cat_cattle_type.cattype_id = ctrl_sale.cattype_id
WHERE 
  ctrl_sale_detail.sale_price <= 0

) as unpriced
ORDER BY OperationTime ASC;
  

GRANT ALL ON vw_unpriced2 to sisoprega;


DROP TABLE IF EXISTS cat_payment_concept CASCADE;
CREATE TABLE cat_payment_concept(
	concept_id      	SERIAL PRIMARY KEY,
	concept_name    	VARCHAR(80) UNIQUE NOT NULL,
	concept_description	VARCHAR(150),
	creditor_name		VARCHAR(250)
);

GRANT ALL ON cat_payment_concept TO sisoprega;
GRANT ALL ON cat_payment_concept_concept_id_seq TO sisoprega;

DROP TABLE IF EXISTS ctrl_paid CASCADE;
CREATE TABLE ctrl_paid(
	paid_id			SERIAL PRIMARY KEY,
	paid_date		DATE not null DEFAULT current_date,
	amount			decimal(12,2) NOT NULL,
	concept_id		integer NOT NULL REFERENCES cat_payment_concept(concept_id)
);

GRANT ALL ON ctrl_paid TO sisoprega;
GRANT ALL ON ctrl_paid_paid_id_seq TO sisoprega;






CREATE OR REPLACE VIEW vw_paid AS
select ROW_NUMBER() over (order by payment_date) as Id, * from (
SELECT 'OTHER' as payment_class,
  ctrl_paid.paid_id as record_id,
  ctrl_paid.paid_date as payment_date, 
  ctrl_paid.amount as amount,
  cat_payment_concept.concept_name, 
  cat_payment_concept.concept_description as description, 
  cat_payment_concept.creditor_name as creditor
FROM 
  cat_payment_concept 
  INNER JOIN ctrl_paid ON ctrl_paid.concept_id =cat_payment_concept.concept_id

UNION ALL

SELECT 'SHIPMENT' as payment_class,
  ctrl_shipment_release.shipment_id as record_id,
  ctrl_shipment_release.paid_date as payment_date, 
  ctrl_shipment_release.paid_amount as amount, 
  'Shipment' as concept_name,
  ctrl_shipment_detail.heads || ' ' || 
  cat_cattle_quality.quality_name || ' ' ||
  cat_customer.customer_name as description,
  cat_carrier.carrier_name as creditor
FROM 
  ctrl_shipment_release
  INNER JOIN ctrl_shipment ON ctrl_shipment_release.shipment_id = ctrl_shipment.shipment_id
  INNER JOIN ctrl_shipment_detail ON ctrl_shipment_detail.shipment_id = ctrl_shipment.shipment_id
  INNER JOIN cat_cattle_quality ON cat_cattle_quality.quality_id = ctrl_shipment.quality_id
  INNER JOIN cat_carrier ON cat_carrier.carrier_id = ctrl_shipment_release.carrier_id
  INNER JOIN cat_customer ON cat_customer.customer_id = ctrl_shipment.customer_id

UNION ALL

SELECT 'IMPORTATION' as payment_class,
  ctrl_hermana_corte.hermana_id as record_id,
  ctrl_hermana_corte.paid_date as payment_date, 
  ctrl_hermana_corte.paid_amount as amount, 
  'Importation' as concept_name,
  vw_rancher.rancher_name || ' ' || 
  ctrl_hermana_corte.heads || ' ' || 
  ctrl_hermana_corte.weight || ' ' || 
  cat_cattle_quality.quality_name as description,
  '' as creditor
FROM 
  ctrl_hermana_corte
  INNER JOIN ctrl_hermana ON ctrl_hermana_corte.hermana_id = ctrl_hermana.hermana_id
  INNER JOIN vw_rancher ON ctrl_hermana.rancher_id = vw_rancher.rancher_id
  INNER JOIN cat_cattle_quality ON cat_cattle_quality.quality_id = ctrl_hermana_corte.quality_id

UNION ALL

SELECT 'PURCHASE' as payment_class,
  ctrl_purchase_detail.record_id as record_id, 
  ctrl_purchase_detail.paid_date as payment_date, 
  ctrl_purchase_detail.paid_amount as amount, 
  'PURCHASE' as concept_name,
  ctrl_purchase_detail.heads || ' ' ||
  ctrl_purchase_detail.weight || ' ' ||
  cat_cattle_quality.quality_name as description, 
  cat_seller.seller_name as creditor
FROM 
  ctrl_purchase_detail
  INNER JOIN ctrl_purchase ON ctrl_purchase.purchase_id = ctrl_purchase_detail.purchase_id
  INNER JOIN cat_seller ON cat_seller.seller_id = ctrl_purchase.seller_id
  INNER JOIN cat_cattle_quality ON cat_cattle_quality.quality_id = ctrl_purchase_detail.quality_id


) as paid
ORDER BY payment_date ASC;

GRANT ALL ON vw_paid to sisoprega;



DROP TABLE IF EXISTS ctrl_folio CASCADE;
CREATE TABLE ctrl_folio(
	folio_id	      	SERIAL PRIMARY KEY,
	folio			SERIAL
);

GRANT ALL ON ctrl_folio TO sisoprega;
GRANT ALL ON ctrl_folio_folio_id_seq TO sisoprega;
GRANT ALL ON ctrl_folio_folio_seq TO sisoprega;

DROP TABLE IF EXISTS ctrl_collected CASCADE;
CREATE TABLE ctrl_collected (
	collected_id		SERIAL PRIMARY KEY,
	folio_id		integer NOT NULL REFERENCES ctrl_folio(folio_id),		
	collected_date		DATE not null DEFAULT current_date,
	amount			decimal(12,2) NOT NULL,
	description		VARCHAR(150),
	customer_id		integer NOT NULL REFERENCES cat_customer(customer_id)
);

GRANT ALL ON ctrl_collected TO sisoprega;
GRANT ALL ON ctrl_collected_collected_id_seq TO sisoprega;



CREATE OR REPLACE VIEW vw_collected AS
select ROW_NUMBER() over (order by folio) as Id, * from (
SELECT 
  'CATTLE SOLD' as sale_class,
  ctrl_sale_detail.record_id, 
  ctrl_folio.folio, 
  ctrl_sale_detail.collected_date, 
  cat_customer.customer_name as customer,
  ctrl_sale_detail.heads || ' ' ||
  cat_cattle_quality.quality_name as description, 
  ctrl_sale_detail.collected_amount as amount
FROM 
  cat_customer
  INNER JOIN ctrl_sale ON ctrl_sale.customer_id = cat_customer.customer_id
  INNER JOIN ctrl_sale_detail ON ctrl_sale_detail.sale_id = ctrl_sale.sale_id
  INNER JOIN cat_cattle_quality ON cat_cattle_quality.quality_id = ctrl_sale_detail.quality_id
  INNER JOIN ctrl_folio ON ctrl_folio.folio_id = ctrl_sale_detail.folio_id


UNION ALL


SELECT 
  'OTHER SOLD' as sale_class,
  ctrl_collected.collected_id as record_id, 
  ctrl_folio.folio, 
  ctrl_collected.collected_date, 
  cat_customer.customer_name as customer,
  ctrl_collected.description, 
  ctrl_collected.amount
  
FROM 
  cat_customer
  INNER JOIN  ctrl_collected ON ctrl_collected.customer_id = cat_customer.customer_id
  INNER JOIN ctrl_folio ON ctrl_folio.folio_id = ctrl_collected.folio_id 
 ) as collected
ORDER BY folio ASC;


GRANT ALL ON vw_collected to sisoprega;


CREATE OR REPLACE VIEW vw_ballance AS
select ROW_NUMBER() over (order by operation_date) as Id, * from (

SELECT 
  'OUTCOME' AS transaction_type, 
  vw_paid.payment_class AS transaction_class, 
  vw_paid.record_id AS operation_id, 
  vw_paid.payment_date AS operation_date, 
  vw_paid.amount,
  vw_paid.creditor AS debtor_or_creditor, 
  vw_paid.description || ' Concepto: ' || 
  vw_paid.concept_name AS description
FROM
  vw_paid

UNION ALL

SELECT
  'INCOME' AS transaction_type,
  vw_collected.sale_class AS transaction_class, 
  vw_collected.record_id AS operaion_id,
  vw_collected.collected_date AS operation_date, 
  vw_collected.amount,
  vw_collected.customer AS debtor_or_creditor,
  vw_collected.description || ' Folio: ' || 
  vw_collected.folio AS description 
  
FROM  
  vw_collected
) as ballance
ORDER BY operation_date ASC;

GRANT ALL ON vw_ballance to sisoprega;




CREATE OR REPLACE VIEW vw_toschedule AS

select ROW_NUMBER() over (order by OperationTime) as Id, * from (
SELECT 
  ctrl_purchase_detail.record_id as RecordId,
  'PURCHASE' as OperationType,
  cat_seller.seller_name as Who,
  ctrl_purchase.operationdatetime as OperationTime,
  cat_cattle_type.cattype_name || ', ' ||
  cat_cattle_quality.quality_name as description,
  ctrl_purchase_detail.heads as Heads,
  ctrl_purchase_detail.weight as Weight,
  ctrl_purchase_detail.purchase_price as Amount,
  ctrl_purchase_detail.paid_date as WhenToPay
FROM
  ctrl_purchase
  INNER JOIN ctrl_purchase_detail ON ctrl_purchase.purchase_id = ctrl_purchase_detail.purchase_id
  INNER JOIN cat_cattle_quality ON cat_cattle_quality.quality_id = ctrl_purchase_detail.quality_id
  INNER JOIN cat_cattle_type ON cat_cattle_type.cattype_id = ctrl_purchase.cattype_id
  INNER JOIN cat_seller ON cat_seller.seller_id = ctrl_purchase.seller_id
WHERE
  ctrl_purchase_detail.paid_date is null AND ctrl_purchase_detail.purchase_price > 0

UNION ALL


SELECT distinct
  ctrl_hermana_corte_exportador.corte_expo as RecordId,
  'HERMANA' as OperationType,
  vw_rancher.rancher_name as Who,
  ctrl_hermana.de_when as OperationTime, 
  cat_cattle_type.cattype_name || ', ' ||
  cat_cattle_quality.quality_name as description,
  ctrl_hermana_corte_exportador.heads as Heads, 
  ctrl_hermana_corte_exportador.weight as Weight,
  ctrl_hermana_corte_exportador.purchase_price as Amount,
  ctrl_hermana_corte_exportador.paid_date as WhenToPay
FROM
  ctrl_hermana
  INNER JOIN ctrl_hermana_corte_exportador ON ctrl_hermana_corte_exportador.hermana_id = ctrl_hermana.hermana_id
  INNER JOIN cat_cattle_quality ON ctrl_hermana_corte_exportador.quality_id  = cat_cattle_quality.quality_id
  INNER JOIN ctrl_hermana_reception ON ctrl_hermana_reception.hermana_id = ctrl_hermana.hermana_id
  INNER JOIN ctrl_reception ON ctrl_reception.reception_id =ctrl_hermana_reception.reception_id
  INNER JOIN cat_cattle_type ON cat_cattle_type.cattype_id = ctrl_reception.cattle_type
  INNER JOIN vw_rancher ON vw_rancher.rancher_id = ctrl_hermana.rancher_id
WHERE 
  ctrl_hermana_corte_exportador.paid_date is null AND ctrl_hermana_corte_exportador.purchase_price > 0

UNION ALL

SELECT 
  ctrl_sale_detail.record_id as RecordId,
  'SALE' as OperationType,
  cat_customer.customer_name as Who,
  ctrl_sale.operationdatetime as OperationTime,
  cat_cattle_type.cattype_name || ', ' ||
  cat_cattle_quality.quality_name as description,
  ctrl_sale_detail.heads as Heads, 
  ctrl_sale_detail.weight as Weight,
  ctrl_sale_detail.sale_price as Price,
  ctrl_sale_detail.collected_date as WhenToPay
FROM 
  ctrl_sale
  INNER JOIN ctrl_sale_detail ON ctrl_sale_detail.sale_id  = ctrl_sale.sale_id
  INNER JOIN cat_cattle_quality ON ctrl_sale_detail.quality_id  = cat_cattle_quality.quality_id
  INNER JOIN cat_cattle_type ON cat_cattle_type.cattype_id = ctrl_sale.cattype_id
  INNER JOIN cat_customer ON cat_customer.customer_id = ctrl_sale.customer_id
WHERE 
  ctrl_sale_detail.collected_date is null AND ctrl_sale_detail.sale_price > 0

) as toSchedule
ORDER BY OperationTime ASC;
GRANT ALL ON vw_toschedule to sisoprega;




CREATE OR REPLACE VIEW vw_timeline AS

select ROW_NUMBER() over (order by OperationTime) as Id, * from (
SELECT 
  ctrl_purchase_detail.record_id as RecordId,
  'PURCHASE' as OperationType,
  cat_seller.seller_name as Who,
  ctrl_purchase.operationdatetime as OperationTime,
  cat_cattle_type.cattype_name || ', ' ||
  cat_cattle_quality.quality_name as description,
  ctrl_purchase_detail.heads as Heads,
  ctrl_purchase_detail.weight as Weight,
  ctrl_purchase_detail.purchase_price as Amount,
  ctrl_purchase_detail.paid_date as WhenToPay,
  ctrl_purchase_detail.is_settled
FROM
  ctrl_purchase
  INNER JOIN ctrl_purchase_detail ON ctrl_purchase.purchase_id = ctrl_purchase_detail.purchase_id
  INNER JOIN cat_cattle_quality ON cat_cattle_quality.quality_id = ctrl_purchase_detail.quality_id
  INNER JOIN cat_cattle_type ON cat_cattle_type.cattype_id = ctrl_purchase.cattype_id
  INNER JOIN cat_seller ON cat_seller.seller_id = ctrl_purchase.seller_id
WHERE
  ctrl_purchase_detail.paid_date is not null

UNION ALL


SELECT distinct
  ctrl_hermana_corte_exportador.corte_expo as RecordId,
  'HERMANA' as OperationType,
  vw_rancher.rancher_name as Who,
  ctrl_hermana.de_when as OperationTime, 
  cat_cattle_type.cattype_name || ', ' ||
  cat_cattle_quality.quality_name as description,
  ctrl_hermana_corte_exportador.heads as Heads, 
  ctrl_hermana_corte_exportador.weight as Weight,
  ctrl_hermana_corte_exportador.purchase_price as Amount,
  ctrl_hermana_corte_exportador.paid_date as WhenToPay,
  ctrl_hermana_corte_exportador.is_settled
FROM
  ctrl_hermana
  INNER JOIN ctrl_hermana_corte_exportador ON ctrl_hermana_corte_exportador.hermana_id = ctrl_hermana.hermana_id
  INNER JOIN cat_cattle_quality ON ctrl_hermana_corte_exportador.quality_id  = cat_cattle_quality.quality_id
  INNER JOIN ctrl_hermana_reception ON ctrl_hermana_reception.hermana_id = ctrl_hermana.hermana_id
  INNER JOIN ctrl_reception ON ctrl_reception.reception_id =ctrl_hermana_reception.reception_id
  INNER JOIN cat_cattle_type ON cat_cattle_type.cattype_id = ctrl_reception.cattle_type
  INNER JOIN vw_rancher ON vw_rancher.rancher_id = ctrl_hermana.rancher_id
WHERE 
  ctrl_hermana_corte_exportador.paid_date is not null

UNION ALL

SELECT 
  ctrl_sale_detail.record_id as RecordId,
  'SALE' as OperationType,
  cat_customer.customer_name as Who,
  ctrl_sale.operationdatetime as OperationTime,
  cat_cattle_type.cattype_name || ', ' ||
  cat_cattle_quality.quality_name as description,
  ctrl_sale_detail.heads as Heads, 
  ctrl_sale_detail.weight as Weight,
  ctrl_sale_detail.sale_price as Price,
  ctrl_sale_detail.collected_date as WhenToPay,
  ctrl_sale_detail.is_settled
FROM 
  ctrl_sale
  INNER JOIN ctrl_sale_detail ON ctrl_sale_detail.sale_id  = ctrl_sale.sale_id
  INNER JOIN cat_cattle_quality ON ctrl_sale_detail.quality_id  = cat_cattle_quality.quality_id
  INNER JOIN cat_cattle_type ON cat_cattle_type.cattype_id = ctrl_sale.cattype_id
  INNER JOIN cat_customer ON cat_customer.customer_id = ctrl_sale.customer_id
WHERE 
  ctrl_sale_detail.collected_date is not null

) as timeLine
ORDER BY OperationTime ASC;
GRANT ALL ON vw_timeline to sisoprega;

