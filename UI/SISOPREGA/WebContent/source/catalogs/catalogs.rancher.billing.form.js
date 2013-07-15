enyo.kind({
    name : "catalogs.rancher.billing.form",
    kind : "forms.simple",
    objRancher : null,
    entityKind : crudRancherBilling,
    create : function() {
	this.inherited(arguments);
	this.$.mainScroller.createComponents([ {
	    kind : "RowGroup",
	    name : "rowGroup",
	    defaultKind : "HFlexBox",
	    caption : "",
	    components : [ {
		kind : "Input",
		name : "company_name",
		hint : "Razon Social",
		bindTo : "legalName"
	    }, {
		kind : "Input",
		name : "address_one",
		hint : "Calle y Numero",
		bindTo : "addressOne"
	    }, {
		kind : "Input",
		name : "address_two",
		hint : "Colonia",
		bindTo : "addressTwo"
	    }, {
		kind : "Input",
		name : "state_id",
		hint : "Entidad",
		bindTo : "addressState"
	    }, {
		kind : "Input",
		name : "city_id",
		hint : "Poblacion",
		bindTo : "city"
	    }, {
		kind : "Input",
		name : "zip_code",
		hint : "Codigo Postal",
		bindTo : "zipCode",
		attributes:{maxlength:5},
		autoKeyModifier: "num-lock"
	    }, {
		kind : "Input",
		name : "rfc",
		hint : "RFC",
		bindTo : "legalId",
		attributes:{maxlength:5}
	    } ]
	} ], {
	    owner : this
	});
    },
    beforeSave : function(obj) {
	var rfc = this.$.rfc.getValue();
	if(/[^[A-Z]{4}[0-9]{6}[0-9A-Z]{3}$]/.test(rfc)){
	    alert("Por favor capture un RFC Válido");
	    return false;
	}
	
	var zip = this.$.zip_code.getValue();
	if(/[^[0-9]{5}$]/.test(zip)){
	    alert("Por favor capture un Código Postal Válido");
	    return false;
	}
	
	// this function can be overriden in order to do something with obj
	// can do validations, if false, will cancel save operation.
	return true;
    },
});