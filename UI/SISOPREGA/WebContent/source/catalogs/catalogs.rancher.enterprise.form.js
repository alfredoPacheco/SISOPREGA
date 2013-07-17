enyo.kind({
    name : "catalogs.rancher.enterprise.form",
    kind : "forms.simple",
    entityKind : crudEnterpriseRancher,
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
		bindTo : "state"
	    }, {
		kind : "Input",
		name : "city_id",
		hint : "Poblacion",
		bindTo : "city"
	    }, {
		kind : "Input",
		name : "zip_code",
		hint : "Codigo Postal",
		bindto : "zipCode"
	    }, {
		kind : "Input",
		name : "rfc",
		hint : "RFC",
		bindTo : "legalId"
	    }, {
		kind : enyo.Item,
		layoutKind : "HFlexLayout",
		components : [ {
		    kind : "controls.phoneBox",
		    name : "phone_number",
		    hint : "Telefono",
		    bindTo : "telephone"
		}, {
		    content : "Para envio de SMS",
		    style : "padding-right: 5px;"
		}, {
		    kind : enyo.CheckBox,
		    name : "checkBox1",
		    onChange : "checkboxChanged"
		} ]
	    }, {
		kind : enyo.Item,
		layoutKind : "HFlexLayout",
		components : [ {
		    kind : "controls.phoneBox",
		    name : "phone_number2",
		    hint : "Telefono 2",
		    bindTo : "telephone2"
		}, {
		    content : "Para envio de SMS",
		    style : "padding-right: 5px;"
		}, {
		    kind : enyo.CheckBox,
		    name : "checkBox2",
		    onChange : "checkboxChanged"
		} ]
	    }, {
		kind : enyo.Item,
		layoutKind : "HFlexLayout",
		components : [ {
		    kind : "controls.phoneBox",
		    name : "phone_number3",
		    hint : "Telefono 3",
		    bindTo : "telephone3"
		}, {
		    content : "Para envio de SMS",
		    style : "padding-right: 5px;"
		}, {
		    kind : enyo.CheckBox,
		    name : "checkBox3",
		    onChange : "checkboxChanged"
		} ]
	    }, {
		kind : "Input",
		name : "email",
		hint : "E Mail",
		bindTo : "email"
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
    setEntity : function(obj) {
	this.inherited(arguments);
	if (obj.smsPhoneChosen !== undefined) {
	    this.setPhoneSMS(obj.smsPhoneChosen);
	}
    },
    resetValues : function() {
	this.inherited(arguments);
	this.objRan = null;
	this.setPhoneSMS(0);
    },
    setPhoneSMS : function(intPhone) {
	this.$.checkBox1.setChecked(false);
	this.$.checkBox2.setChecked(false);
	this.$.checkBox3.setChecked(false);
	switch (parseInt(intPhone)) {
	case 1:
	    this.$.checkBox1.setChecked(true);
	    break;
	case 2:
	    this.$.checkBox2.setChecked(true);
	    break;
	case 3:
	    this.$.checkBox3.setChecked(true);
	    break;
	}
    },
    beforeSave : function(obj) {
	
	var email = this.$.email.getValue();
	if (email != '' && !/\S+@\S+\.\S+/.test(email)) {
	    this.errorMessage = "El formato de correo electrónico no es reconocido (correo@servidor.ext).";
	    return false;
	}
	
	var zip = this.$.zip_code.getValue();
	if(zip != '' && !/^[0-9]{5}$/.test(zip)){
	    this.errorMessage = "Por favor capture un Código Postal Válido";
	    return false;
	}
	
	var rfc = this.$.rfc.getValue();
	if (zip != '' && !/^[A-Z]{4}[0-9]{6}[0-9A-Z]{3}$/.test(rfc)) {
	    this.errorMessage = "Por favor capture un RFC Válido";
	    return false;
	}
	
	obj.smsPhoneChosen = this.getCheckBoxSelected();
	return true;
    },
    checkboxChanged : function(inSender, inEvent) {
	switch (inSender.name) {
	case 'checkBox1':
	    this.setPhoneSMS(inSender.checked ? 1 : 0);
	    break;
	case 'checkBox2':
	    this.setPhoneSMS(inSender.checked ? 2 : 0);
	    break;
	case 'checkBox3':
	    this.setPhoneSMS(inSender.checked ? 3 : 0);
	    break;
	}
    },
    getCheckBoxSelected : function() {
	if (this.$.checkBox1.checked == true) {
	    return 1;
	}
	if (this.$.checkBox2.checked == true) {
	    return 2;
	}
	if (this.$.checkBox3.checked == true) {
	    return 3;
	}
	return 0;
    }
});