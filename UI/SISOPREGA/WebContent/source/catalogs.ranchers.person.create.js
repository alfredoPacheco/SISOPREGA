enyo.kind({
	name : "catalogs.ranchers.person.create",
	kind : "Control",
	layoutKind : "VFlexLayout",
	iCreated : null,
	events : {
		"onAddRancher" : "",
		"onUpdateRancher" : "",
		"onCancel" : ""
	},
	objRan : {},
	components : [ {
		kind : enyo.Scroller,
		flex : 1,
		className : "formBG",
		components : [ {
			kind : "RowGroup",
			defaultKind : "HFlexBox",
			caption : "",
			components : [ {
				kind : "Input",
				name : "aka",
				hint : "Alias",
				inputClassName : "blankInput",
				focusClassName : "darkFocus"
			}, {
				kind : "Input",
				name : "first_name",
				hint : "Nombres",
				inputClassName : "blankInput",
				focusClassName : "darkFocus"
			}, {
				kind : "Input",
				name : "last_name",
				hint : "Apellido Paterno",
				inputClassName : "blankInput",
				focusClassName : "darkFocus"
			}, {
				kind : "Input",
				name : "mother_name",
				hint : "Apellido Materno",
				inputClassName : "blankInput",
				focusClassName : "darkFocus"
			}, {
				kind : "VFlexBox",
				style : "",
				components : [ {
					content : "Fecha de Nacimiento"
				}, {
					kind : "DatePicker",
					name : "birth_date",
					minYear : 1940,
					maxYear : new Date().getFullYear(),
					label : "",
					className : "picker-hbox"
				} ]
			}, {
				kind : "Input",
				name : "email_add",
				hint : "Email",
				inputType : "email",
				inputClassName : "blankInput",
				focusClassName : "darkFocus"
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
			
		]},
		{
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
				} ]
			} ]
		} ]
	}],
	ready : function() {
		this.$.draAdd.setOpen(true);
		this.$.draUpdate.setOpen(false);
	},
	resetValues : function() {
		this.objRan = null;
		this.$.aka.setValue("");
		this.$.first_name.setValue("");
		this.$.last_name.setValue("");
		this.$.mother_name.setValue("");
		this.$.birth_date.setValue(new Date());
//		this.$.birth_date.setNull();
		this.$.email_add.setValue("");
		this.$.phone_number.setValue("");
		this.$.phone_number2.setValue("");
		this.$.phone_number3.setValue("");
		this.setPhoneSMS(0);
	},
	updateRancher : function() {
		cacheRanchers.upd(this.objRan, this.getRancher(), this,
				"doUpdateRancher");
	},
	getRancher : function() {

		var fmt = new enyo.g11n.DateFmt({
			format : "yyyy/MM/dd",
			locale : new enyo.g11n.Locale("es_es")
		});
		var objRan = {
			rancher_id : 		"",
			aka : 				"",
			birth_date : 		"",
			email_add : 		"",
			first_name : 		"",
			last_name : 		"",
			mother_name : 		"",
			phone_number : 		"",
			phone_number2 : 	"",
			phone_number3 : 	"",
			sms_phone_chosen:	0,
			rancher_type : 		1,
		};

		objRan.aka = this.$.aka.getValue();

		if (this.$.birth_date.getValue() != null) {
			objRan.birth_date = fmt.format(this.$.birth_date.getValue());
		}

		objRan.email_add = this.$.email_add.getValue();
		objRan.first_name = this.$.first_name.getValue();
		objRan.last_name = this.$.last_name.getValue();
		objRan.mother_name = this.$.mother_name.getValue();
		objRan.phone_number = 		this.$.phone_number.getValue();
		objRan.phone_number2 = 		this.$.phone_number2.getValue();
		objRan.phone_number3 = 		this.$.phone_number3.getValue();
		objRan.sms_phone_chosen = 	this.getCheckBoxSelected();

		return objRan;
	},
	addRancher:function(){				
		cacheRanchers.Create(this.getRancher(),this,"afteraddRancher");		
	},
	afteraddRancher : function() {
		this.iCreated = cacheRanchers.iLastRanID;
		this.doAddRancher();
	},
	getJustCreated : function() {
		return this.iCreated;
	},
	setRancher : function(objVar) {
		this.resetValues();
		this.objRan = objVar;
		this.$.aka.setValue(this.objRan.aka);

		// Diego: Validate if retrieved value from database is not empty.
		if (this.objRan.birth_date != '') {
			this.$.birth_date.setValue(new Date(this.objRan.birth_date
					.substring(0, 4),
					this.objRan.birth_date.substring(5, 7) - 1,
					this.objRan.birth_date.substring(8, 10)));
		}

		this.$.email_add.setValue(this.objRan.email_add);
		this.$.first_name.setValue(this.objRan.first_name);
		this.$.last_name.setValue(this.objRan.last_name);
		this.$.mother_name.setValue(this.objRan.mother_name);
		this.$.phone_number.setValue(this.objRan.phone_number);
		this.$.phone_number2.setValue(this.objRan.phone_number2);
		this.$.phone_number3.setValue(this.objRan.phone_number3);
		this.setPhoneSMS(this.objRan.sms_phone_chosen);
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