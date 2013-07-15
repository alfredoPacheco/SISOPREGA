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
		autoKeyModifier : "num-lock"
	    }, {
		kind : "Input",
		name : "rfc",
		hint : "RFC",
		bindTo : "legalId"
	    } ]
	} ], {
	    owner : this
	});
    },
    ready : function() {
	this.inherited(arguments);
	this.$.rfc.$.input.setAttribute('maxlength', '13');
	this.$.zip_code.$.input.setAttribute('maxlength', '5');
    },
    beforeSave : function(obj) {
	var rfc = this.$.rfc.getValue();
	if (!/^[A-Z]{4}[0-9]{6}[0-9A-Z]{3}$/.test(rfc)) {
	    this.errorMessage = "Por favor capture un RFC Válido";
	    return false;
	}

	var zip = this.$.zip_code.getValue();
	if (!/^[0-9]{5}$/.test(zip)) {
	    this.errorMessage = "Por favor capture un Código Postal Válido";
	    return false;
	}

	// company_name, address_one, address_two, state_id, city_id
	if (this.$.company_name.getValue() == ""
		|| this.$.address_one.getValue() == ""
		|| this.$.address_two.getValue() == ""
		|| this.$.state_id.getValue() == ""
		|| this.$.city_id.getValue() == ""){
	    this.errorMessage = "Toda información fiscal es requerida para crear detalles de facturación.";
	    return false;
	}

	    return true;
    },
});