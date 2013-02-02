enyo.kind({
	name : "catalogs.ranchers.billing.create",
	kind : enyo.SlidingView,
	layoutKind : enyo.VFlexLayout,
	events : {
		"onAddBilling" : "",
		"onUpdateBilling" : "",
		"onCancel" : ""
	},
	objRan : null,
	objBilling : {},
	components : [ {
		kind : enyo.Scroller,
		className : "formBG",
		flex : 1,
		components : [ {
			kind : "RowGroup",
			defaultKind : "HFlexBox",
			caption : "",
			style : "color:#FFF",
			components : [ {
				kind : "Input",
				name : "company_name",
				hint : "Razon Social",
			}, {
				kind : "Input",
				name : "address_one",
				hint : "Calle y Numero"
			}, {
				kind : "Input",
				name : "address_two",
				hint : "Colonia"
			}, {
				kind : "Input",
				name : "state_id",
				hint : "Entidad"
			}, {
				kind : "Input",
				name : "city_id",
				hint : "Poblacion"
			}, {
				kind : "Input",
				name : "zip_code",
				hint : "Codigo Postal"
			}, {
				kind : "Input",
				name : "rfc",
				hint : "RFC"
			}
//			, {
//				kind : "Input",
//				name : "phone_number",
//				hint : "Telefono"
//			},
			]
		}, {
			kind : "Drawer",
			name : "draAdd",
			components : [ {
				kind : "Button",
				name : "btnAdd",
				className : "enyo-button-affirmative",
				caption : "Crear",
				onclick : "addBilling"
			}, ]
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
					onclick : "updateBilling"
				}, {
					kind : "Button",
					name : "btnCancel",
					className : "enyo-button-negative",
					flex : 1,
					caption : "Cancelar",
					onclick : "doCancel"
				}, ]
			} ]
		}, ]
	}, ],
	ready : function() {
		this.$.draAdd.setOpen(true);
		this.$.draUpdate.setOpen(false);
	},
	resetValues : function() {
		this.objBilling = null;
		this.$.company_name.setValue("");
		this.$.address_one.setValue("");
		this.$.address_two.setValue("");
		this.$.state_id.setValue("");
		this.$.city_id.setValue("");
		this.$.zip_code.setValue("");
		this.$.rfc.setValue("");
//		this.$.phone_number.setValue("");
	},
	updateBilling : function() {
		cacheRanchers.updateBilling(this.objRan, this.objBilling, this
				.getBilling(), this, "doUpdateBilling");
	},
	getBilling : function() {
		var objBilling = {
			billing_id : "",
			rancher_id : "",
			company_name : "",
			address_one : "",
			address_two : "",
			city_id : "",
			state_id : "",
			zip_code : "",
			rfc : "",
//			phone_number : ""
		};
		objBilling.company_name = this.$.company_name.getValue();
		objBilling.address_one = this.$.address_one.getValue();
		objBilling.address_two = this.$.address_two.getValue();
		objBilling.state_id = this.$.state_id.getValue();
		objBilling.city_id = this.$.city_id.getValue();
		objBilling.zip_code = this.$.zip_code.getValue();
		objBilling.rfc = this.$.rfc.getValue();
//		objBilling.phone_number = this.$.phone_number.getValue();
		return objBilling;
	},
	addBilling : function() {
		cacheRanchers.addBilling(this.objRan, this.getBilling(), this,
				"doAddBilling");
	},
	setRancher : function(objRancher) {
		this.objRan = objRancher;
	},
	setBilling : function(objRan, objBilling) {
		this.resetValues();
		this.objRan = objRan;
		this.objBilling = objBilling;
		this.$.company_name.setValue(this.objBilling.company_name);
		this.$.address_one.setValue(this.objBilling.address_one);
		this.$.address_two.setValue(this.objBilling.address_two);
		this.$.state_id.setValue(this.objBilling.state_id);
		this.$.city_id.setValue(this.objBilling.city_id);
		this.$.zip_code.setValue(this.objBilling.zip_code);
		this.$.rfc.setValue(this.objBilling.rfc);
//		this.$.phone_number.setValue(this.objBilling.phone_number);
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
});