enyo.kind({
	name : "catalogs.ranchers.enterprise.create",
	kind : enyo.SlidingView,
	layoutKind : enyo.VFlexLayout,
	iCreated : null,
	events : {
		"onAddRancher" : "",
		"onUpdateRancher" : "",
		"onCancel" : ""
	},
	objRan : {},
	components : [ {
		kind : enyo.Scroller,
		className : "listBG",
		flex : 1,
		components : [ {
			kind : "RowGroup",
			defaultKind : "HFlexBox",
			caption : "",
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
			},	
			{
				kind:enyo.Item,
				layoutKind:"HFlexLayout",
				components:[{
					kind : "Input",
					name : "phone_number",
					hint : "Telefono",
					inputClassName : "blankInput",
					focusClassName : "darkFocus",
					onfocus : "applyMask",
					flex:1
				},
				{content:"Para envio de SMS", style:"padding-right: 5px;"},
				{kind: enyo.CheckBox, name:"checkBox1", onChange:"checkboxChanged"}				
			]},
			{
				kind:enyo.Item,
				layoutKind:"HFlexLayout",
				components:[{
					kind : "Input",
					name : "phone_number2",
					hint : "Telefono 2",
					inputClassName : "blankInput",
					focusClassName : "darkFocus",
					onfocus : "applyMask",
					flex:1
				},
				{content:"Para envio de SMS", style:"padding-right: 5px;"},
				{kind: enyo.CheckBox, name:"checkBox2", onChange:"checkboxChanged"}				
			]},
			{
				kind:enyo.Item,
				layoutKind:"HFlexLayout",
				components:[{
					kind : "Input",
					name : "phone_number3",
					hint : "Telefono 3",
					inputClassName : "blankInput",
					focusClassName : "darkFocus",
					onfocus : "applyMask",
					flex:1
				},
				{content:"Para envio de SMS", style:"padding-right: 5px;"},
				{kind: enyo.CheckBox, name:"checkBox3", onChange:"checkboxChanged"}				
			]},
			{
				kind : "Input",
				name : "email",
				hint : "E Mail"
			} ]
		}, {
			kind : "Drawer",
			name : "draAdd",
			components : [ {
				kind : "Button",
				name : "btnAdd",
				className : "enyo-button-affirmative",
				caption : "Crear",
				onclick : "addRancher"
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
					onclick : "updateRancher"
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
		this.objRan = null;
		this.$.company_name.setValue("");
		this.$.address_one.setValue("");
		this.$.address_two.setValue("");
		this.$.state_id.setValue("");
		this.$.city_id.setValue("");
		this.$.zip_code.setValue("");
		this.$.rfc.setValue("");
		this.$.phone_number.setValue("");
		this.$.phone_number2.setValue("");
		this.$.phone_number3.setValue("");
		this.setPhoneSMS(0);
		this.$.email.setValue("");
	},
	updateRancher : function() {
		cacheRanchers.upd(this.objRan, this.getRancher(), this,
				"doUpdateRancher");
	},
	getRancher : function() {
		var objRan = {
			rancher_id : 		"",
			company_name : 		"",
			contacts : 			[],
			billing : 			{},
			rancher_type : 		2,
			address_one : 		"",
			address_two : 		"",
			city_id : 			"",
			city_name : 		"",
			state_id : 			"",
			state_name : 		"",
			zip_code : 			"",
			rfc : 				"",
			phone_number : 		"",
			phone_number2 : 	"",
			phone_number3 : 	"",
			sms_phone_chosen:	0,
			email : 			""
		};
		objRan.company_name = 		this.$.company_name.getValue();
		objRan.address_one = 		this.$.address_one.getValue();
		objRan.address_two = 		this.$.address_two.getValue();
		objRan.state_id = 			this.$.state_id.getValue();
		objRan.city_id = 			this.$.city_id.getValue();
		objRan.zip_code = 			this.$.zip_code.getValue();
		objRan.rfc =	 			this.$.rfc.getValue();
		objRan.phone_number = 		this.$.phone_number.getValue();
		objRan.phone_number2 = 		this.$.phone_number2.getValue();
		objRan.phone_number3 = 		this.$.phone_number3.getValue();
		objRan.sms_phone_chosen = 	this.getCheckBoxSelected();
		objRan.email = 				this.$.email.getValue();
		return objRan;
	},
	addRancher : function() {
		cacheRanchers.Create(this.getRancher(), this, "afteraddRancher");
	},
	afteraddRancher : function() {
		this.iCreated = cacheRanchers.iLastRanID;
		this.doAddRancher();
	},
	getJustCreated : function() {
		return this.iCreated;
	},
	setRancher : function(objRan) {
		this.resetValues();
		this.objRan = objRan;
		this.$.company_name.setValue(this.objRan.company_name);
		this.$.address_one.setValue(this.objRan.address_one);
		this.$.address_two.setValue(this.objRan.address_two);
		this.$.state_id.setValue(this.objRan.state_id);
		this.$.city_id.setValue(this.objRan.city_id);
		this.$.zip_code.setValue(this.objRan.zip_code);
		this.$.rfc.setValue(this.objRan.rfc);
		this.$.phone_number.setValue(this.objRan.phone_number);
		this.$.phone_number2.setValue(this.objRan.phone_number2);
		this.$.phone_number3.setValue(this.objRan.phone_number3);
		this.setPhoneSMS(this.objRan.sms_phone_chosen);
		this.$.email.setValue(this.objRan.email);
		
		this.toggleUpdate();

	},
	setPhoneSMS : function (intPhone){
		this.$.checkBox1.setChecked(false);
		this.$.checkBox2.setChecked(false);
		this.$.checkBox3.setChecked(false);
		switch(parseInt(intPhone)){
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
	checkboxChanged:function(inSender, inEvent){
		switch(inSender.name){
		case 'checkBox1':
			this.setPhoneSMS(inSender.checked?1:0);
			break;
		case 'checkBox2':
			this.setPhoneSMS(inSender.checked?2:0);
			break;
		case 'checkBox3':
			this.setPhoneSMS(inSender.checked?3:0);
			break;
		}
	},
	getCheckBoxSelected:function(){
		if (this.$.checkBox1.checked ==true){
			return 1;
		}
		if (this.$.checkBox2.checked ==true){
			return 2;
		}
		if (this.$.checkBox3.checked ==true){
			return 3;
		}
		return 0;
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