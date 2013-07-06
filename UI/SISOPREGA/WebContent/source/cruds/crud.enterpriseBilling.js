/**
 * Provides a handler for rancher data options.
 * 
 * Revision History: - [DATE] By Alan del Rio: Initial Version. - [DATE] By
 * Alfredo Pacheco: Integrate with web services. - 02/03/2013 By Diego Torres:
 * Add rancher user handlers. - 05/27/2013 By Diego Torres: Adapt to crud.cache.
 * 
 */
enyo.kind({
    name : "crud.enterpriseBilling",
    published: {
	entityName : "EnterpriseInvoice",
	createKindName : "catalogs.enterprise.billing.form"
    },
    kind : "crud.rancherBilling",
});
var crudEnterpriseBilling = new crud.enterpriseBilling();