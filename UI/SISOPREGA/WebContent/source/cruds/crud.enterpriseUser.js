/**
 * Provides a handler for rancher data options.
 * 
 * Revision History: - [DATE] By Alan del Rio: Initial Version. - [DATE] By
 * Alfredo Pacheco: Integrate with web services. - 02/03/2013 By Diego Torres:
 * Add rancher user handlers. - 05/27/2013 By Diego Torres: Adapt to crud.cache.
 * 
 */
enyo.kind({
    name : "crud.enterpriseUser",
    kind : "crud.rancherUser",
    published : {
	entityName : "EnterpriseUser",
	createKindName : "catalogs.enterprise.user.form"
    },
});
var crudEnterpriseUser = new crud.enterpriseUser();