enyo.kind({
	name : "catalogs.providers.create",
	kind : enyo.SlidingView,
	layoutKind : enyo.VFlexLayout,
	iCreated : null,
	events : {
		"onAdd" : "",
		"onUpdate" : "",
		"onCancel" : ""
	},
	obj : {},
	components : [ {
		kind : enyo.Scroller,
		autoHorizontal : false,
		horizontal : false,
		className : "listBG",
		flex : 1,
		components : [ {
			kind : "RowGroup",
			defaultKind : "HFlexBox",
			caption : "",
			components : [ {
				kind : "Input",
				name : "input_name",
				hint : "Razon Social",
			}, {
				kind : "Input",
				name : "input_address_one",
				hint : "Calle y Numero"
			}, {
				kind : "Input",
				name : "input_address_two",
				hint : "Colonia"
			}, {
				kind : "Input",
				name : "input_city_name",
				hint : "Poblacion"
			}, {
				kind : "Input",
				name : "input_state_name",
				hint : "Entidad"
			}, {
				kind : "Input",
				name : "input_zip_code",
				hint : "Codigo Postal"
			}, {
				kind : enyo.Item,
				layoutKind : "HFlexLayout",
				components : [ {
					kind : "Input",
					name : "input_phone_number",
					hint : "Telefono",
					inputClassName : "blankInput",
					focusClassName : "darkFocus",
					onfocus : "applyMask",
					flex : 1
				} ]
			}, {
				kind : "Input",
				name : "input_email",
				hint : "E Mail"
			} ]
		} ]
	}, {
		kind : "Drawer",
		name : "draAdd",
		components : [ {
			layoutKind : "HFlexLayout",
			align : "center",
			components : [ {
				kind : "Button",
				name : "btnAdd",
				className : "enyo-button-affirmative",
				caption : "Crear",
				onclick : "add",
				flex : 1
			}, {
				kind : "Button",
				name : "btnCancel",
				className : "enyo-button-negative",
				flex : 1,
				caption : "Cancelar",
				onclick : "doCancel"
			} ]
		} ]
	}, {
		kind : "Drawer",
		name : "draUpdate",
		components : [ {
			layoutKind : "HFlexLayout",
			align : "center",
			components : [ {
				kind : "Button",
				name : "btnUpdate",
				className : "enyo-button-affirmative",
				flex : 1,
				caption : "Actualizar",
				onclick : "update"
			}, {
				kind : "Button",
				name : "btnCancel",
				className : "enyo-button-negative",
				flex : 1,
				caption : "Cancelar",
				onclick : "doCancel"
			}, ]
		} ]
	} ],
	ready : function() {
		this.$.draAdd.setOpen(true);
		this.$.draUpdate.setOpen(false);
	},
	resetValues : function() {
		this.obj = null;
		this.$.input_name.setValue("");
		this.$.input_address_one.setValue("");
		this.$.input_address_two.setValue("");
		this.$.input_state_name.setValue("");
		this.$.input_city_name.setValue("");
		this.$.input_zip_code.setValue("");
		this.$.input_phone_number.setValue("");
		this.$.input_email.setValue("");
	},
	update : function() {
		cacheProviders.update(this.obj, this.get(), this, "doUpdate");
	},
	get : function() {
		var objProvider = {
			id : "",
			name : "",
			address_one : "",
			address_two : "",
			city_id : "",
			city_name : "",
			state_id : "",
			state_name : "",
			zip_code : "",
			phone_number : "",
			email : ""
		};
		objProvider.name = this.$.input_name.getValue();
		objProvider.address_one = this.$.input_address_one.getValue();
		objProvider.address_two = this.$.input_address_two.getValue();
		objProvider.state_name = this.$.input_state_name.getValue();
		objProvider.city_name = this.$.input_city_name.getValue();
		objProvider.zip_code = this.$.input_zip_code.getValue();
		objProvider.phone_number = this.$.input_phone_number.getValue();
		objProvider.email = this.$.input_email.getValue();
		return objProvider;
	},
	add : function() {
		cacheProviders.Create(this.get(), this, "afterAdd");
	},
	afterAdd : function() {
		// this.iCreated = cacheCustomers.iLastID;
		this.doAdd();
	},
	getJustCreated : function() {
		return this.iCreated;
	},
	setObj : function(obj) {
		this.resetValues();
		this.obj = obj;
		this.$.input_name.setValue(this.obj.name);
		this.$.input_address_one.setValue(this.obj.address_one);
		this.$.input_address_two.setValue(this.obj.address_two);
		this.$.input_state_name.setValue(this.obj.state_name);
		this.$.input_city_name.setValue(this.obj.city_name);
		this.$.input_zip_code.setValue(this.obj.zip_code);
		this.$.input_phone_number.setValue(this.obj.phone_number);
		this.$.input_email.setValue(this.obj.email);

		this.toggleUpdate();
	},
	toggleUpdate : function() {
		this.$.draAdd.setOpen(false);
		this.$.draUpdate.setOpen(true);
	},
	toggleAdd : function() {
		this.$.draAdd.setOpen(true);
		this.$.draUpdate.setOpen(false);
		this.resetValues();
	},
	applyMask : function(inSender) {
		var _id = inSender.$.input.getId();
		jQuery(function(j) {
			j(document.getElementById(_id)).mask('(999) 999-9999');
		});
	}
});