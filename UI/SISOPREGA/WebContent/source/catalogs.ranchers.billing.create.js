enyo.kind({
    name : "catalogs.ranchers.billing.create",
    kind : "catalogs.create",
    objRancher : null,
    objBilling : {},
    entityKind : cacheRancherBilling,
    create : function() {
	this.inherited(arguments);
	this.$.rowGroup.createComponents([ {
	    kind : "Input",
	    name : "company_name",
	    hint : "Razon Social",
	    bindTo:"legalName"
	}, {
	    kind : "Input",
	    name : "address_one",
	    hint : "Calle y Numero",
	    bindTo:"addressOne"
	}, {
	    kind : "Input",
	    name : "address_two",
	    hint : "Colonia",
	    bindTo:"addressTwo"
	}, {
	    kind : "Input",
	    name : "state_id",
	    hint : "Entidad",
	    bindTo:"addressState"
	}, {
	    kind : "Input",
	    name : "city_id",
	    hint : "Poblacion",
	    bindTo:"city"
	}, {
	    kind : "Input",
	    name : "zip_code",
	    hint : "Codigo Postal",
	    bindTo:"zipCode"
	}, {
	    kind : "Input",
	    name : "rfc",
	    hint : "RFC",
	    bindTo:"legalId"
	} ], {
	    owner : this
	});
    }
});