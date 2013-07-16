enyo.kind(
  {
    name : "catalogs.rancher.contact.form",
    kind : "forms.simple",
    objRancher : null,
    objContact : {},
    entityKind : crudRancherContact,
    create : function() {
	this.inherited(arguments);
	this.$.mainScroller.createComponents([ {
	    kind : "RowGroup",
	    name : "rowGroup",
	    defaultKind : "HFlexBox",
	    caption : "",
	    components : [ {
		kind : "Input",
		name : "aka",
		hint : "Alias",
		inputClassName : "blankInput",
		focusClassName : "darkFocus",
		bindTo : "aka"
	    }, {
		kind : "Input",
		name : "first_name",
		hint : "Nombres",
		inputClassName : "blankInput",
		focusClassName : "darkFocus",
		bindTo : "firstName"
	    }, {
		kind : "Input",
		name : "last_name",
		hint : "Apellido Paterno",
		inputClassName : "blankInput",
		focusClassName : "darkFocus",
		bindTo : "lastName"
	    }, {
		kind : "Input",
		name : "mother_name",
		hint : "Apellido Materno",
		inputClassName : "blankInput",
		focusClassName : "darkFocus",
		bindTo : "motherName"
	    }, {
		kind : "VFlexBox",
		style : "",
		components : [ {
		    content : "Fecha de Nacimiento",
		}, {
		    kind : "DatePicker",
		    name : "birth_date",
		    label : "",
		    minYear : 1940,
		    maxYear : new Date().getFullYear(),
		    className : "picker-hbox",
		    bindTo : "birthDate"
		} ]
	    }, {
		kind : "Input",
		name : "email_add",
		hint : "Email",
		inputClassName : "blankInput",
		focusClassName : "darkFocus",
		bindTo : "emailAddress"
	    }, {
		kind : "controls.phoneBox",
		name : "phone_number",
		hint : "Telefono",
		inputClassName : "blankInput",
		focusClassName : "darkFocus",
		onfocus : "applyMask",
		bindTo : "telephone"
	    }, {
		kind : "Input",
		name : "address_one",
		hint : "Domicilio",
		inputClassName : "blankInput",
		focusClassName : "darkFocus",
		bindTo : "addressOne"
	    }, {
		kind : "Input",
		name : "address_two",
		hint : "Colonia",
		inputClassName : "blankInput",
		focusClassName : "darkFocus",
		bindTo : "addressTwo"
	    }, {
		kind : "Input",
		name : "city",
		hint : "Ciudad",
		inputClassName : "blankInput",
		focusClassName : "darkFocus",
		bindTo : "city"
	    }, {
		kind : "Input",
		name : "address_state",
		hint : "Estado",
		inputClassName : "blankInput",
		focusClassName : "darkFocus",
		bindTo : "addressState"
	    }, {
		kind : "Input",
		name : "zip_code",
		hint : "Codigo Postal",
		inputClassName : "blankInput",
		focusClassName : "darkFocus",
		bindTo : "zipCode"
	    } ]
	} ], {
	    owner : this
	});
    },
    ready : function() {
	this.inherited(arguments);
	this.$.zip_code.$.input.setAttribute('maxlength', '5');
    },
    beforeSave : function(obj) {
	var email = this.$.email_add.getValue();
	if (!/^([0-9a-zA-Z]([-\\.\\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\\w]*[0-9a-zA-Z]\\.)+[a-zA-Z]{2,9})$/.test(email)) {
	    this.errorMessage = "El formato de correo electr�nico no es reconocido (correo@servidor.ext).";
	    return false;
	}
	
	var zip = this.$.zip_code.getValue();
	if (!/^[0-9]{5}$/.test(zip)) {
	    this.errorMessage = "Por favor capture un C�digo Postal V�lido";
	    return false;
	}
	
	obj.birthDate = utils.dateOut(obj.birthDate);
	return true;
    },
  });
