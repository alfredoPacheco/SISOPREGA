enyo.kind({
	name: "ranchers.profile.person",
	kind: "Scroller",
	layoutKind:"FittableRowsLayout",
	classes: "onyx",
	events: {	
		onUpdate:"",
		onCancel:"",
		onChangePW:""
	},	
	iId:null,
	components: [
  		{style:"height:10px"},
  		{style:"width:500px;margin-left: auto;margin-right: auto;",components:[
			{kind: "onyx.Popup",classes: "onyx", name: "popPassword", centered: true, modal:true,	 floating: true, scrim: true, 
				components: [
					{kind: "ranchers.profile.password",name:'passChange',classes: "onyx",onCancel:"closePopPW",onChange:"doChangePW"}
			]},
			{
		        classes: "onyx-sample-divider",
		        content: "Alias"
		    }, {
		        classes: "onyx-toolbar-inline",
		        components: [
		        {
		            kind: "onyx.InputDecorator",
		            style:"width:100%",
		            components: [{
		                kind: "onyx.Input",
		                name:"aka", value:"",
		                placeholder: "Escriba el texto aqui"
		            }]
		        },
	        ]},
	        {
		        classes: "onyx-sample-divider",
		        content: "Nombre"
		    }, {
		        classes: "onyx-toolbar-inline",
		        components: [
		        {
		            kind: "onyx.InputDecorator",
		            style:"width:100%",
		            components: [{
		                kind: "onyx.Input",
		                name:"first_name",value:"",
		                placeholder: "Escriba el texto aqui"
		            }]
		        },
	        ]},
	        {
		        classes: "onyx-sample-divider",
		        content: "Apellido Paterno"
		    }, {
		        classes: "onyx-toolbar-inline",
		        components: [
		        {
		            kind: "onyx.InputDecorator",
		            style:"width:100%",
		            components: [{
		                kind: "onyx.Input",
		                name:"last_name",value:"",
		                placeholder: "Escriba el texto aqui"
		            }]
		        },
	        ]},
	        {
		        classes: "onyx-sample-divider",
		        content: "Apellido Materno"
		    }, {
		        classes: "onyx-toolbar-inline",
		        components: [
		        {
		            kind: "onyx.InputDecorator",
		            style:"width:100%",
		            components: [{
		                kind: "onyx.Input",
		                name:"mother_name", value:"",
		                placeholder: "Escriba el texto aqui"
		            }]
		        },
	        ]},
	        {
		        classes: "onyx-sample-divider",
		        content: "Fecha de nacimiento"
		    }, {
		        classes: "onyx-toolbar-inline",
		        style:"width:100%",
		        components: [
		        {kind:"onyx.DatePicker", bBlank:true,name:'birth_date', minYear:1900, maxYear:2010, style:"border-width: 0 0px 0px 0px;",
				 onclick:"reloadControl"},
	        ]},
	        {
		        classes: "onyx-sample-divider",
		        content: "eMail"
		    }, {
		        classes: "onyx-toolbar-inline",
		        style:"width:100%",
		        components: [
		        {
		            kind: "onyx.InputDecorator",
		            style:"width:100%",
		            components: [{
		                kind: "onyx.Input",
		                name:"email_add",value:"",
		                placeholder: "Escriba el texto aqui"
		            }]
		        },
	        ]},
	        {
		        classes: "onyx-sample-divider",
		        content: "Telefono celular"
		    }, {
		        classes: "onyx-toolbar-inline",
		        components: [
		        {
		            kind: "onyx.InputDecorator",
		            style:"width:100%",
		            components: [{
		                kind: "onyx.Input",
		                name:"phone_number",onfocus : "applyMask",
		                placeholder: "Escriba el texto aqui",
		            }]
		        },
	        ]},
			{kind:"onyx.Button",content:"Cambiar Password",
				 classes: "onyx-blue", style:"width:100%",onclick:"openPopPW"},
			{tag:"br"},						
			{tag:"br"},										
			{kind: "FittableColumns", style:"align:center",components:[
				  {kind:"onyx.Button", onclick:"doUpdate",content:"OK",classes: "onyx-affirmative",
				   style:"width:49%",},
				  {style:"width:2%"},
				  {kind:"onyx.Button", onclick:"doCancel",content:"Cancelar",classes: "onyx-negative",
				   style:"width:49%"},
			 ]},
		]},
		{ fit:true}		 	
	],
	openPopPW:function(){
		this.$.popPassword.show();
	},	
	closePopPW:function(){
		this.$.popPassword.hide();
		return true;
	},
	setProfile:function(objData){
		
		this.iId=objData.rancherId;
		this.$.aka.getValue(objData.aka);
		// Diego: Validate if retrieved value from database is not empty.		
		if (objData.birthDate!= '') {
			this.$.birth_date.setValue(new Date(objData.birthDate
					.substring(0, 4),
					objData.birthDate.substring(5, 7) - 1,
					objData.birthDate.substring(8, 10)));
		}else{
			
		}
		this.$.email_add.setValue(objData.emailAddress);
		this.$.first_name.setValue(objData.firstName);
		this.$.last_name.setValue(objData.lastName);
		this.$.mother_name.setValue(objData.motherName);
		this.$.phone_number.setValue(objData.phone);
	},	
	getProfile:function(){
		var fmt = new enyo.g11n.DateFmt({
			format : "yyyy/MM/dd",
			locale : new enyo.g11n.Locale("es_es")
		});		
		

     var objData ={rancherId:this.iId,
          		  aka : this.$.aka.getValue(),
				  birthDate : null,
				  emailAddress : this.$.email_add.getValue(),
				  firstName : this.$.first_name.getValue(),
				  lastName : this.$.last_name.getValue(),
				  motherName : this.$.mother_name.getValue(),
				  phone : this.$.phone_number.getValue()};
		if (this.$.birth_date.getValue() != null) {
			objData.birthDate = fmt.format(this.$.birth_date.getValue());
		}     
     	return objData;
	},
	applyMask : function(inSender) {
		var _id = inSender.id;
		jQuery(function(j) {
			j(document.getElementById(_id)).mask('(999) 999-9999');
		});	
	},
	closePWPopup:function(){
		this.$.popPassword.hide();
		return true;
	},	
	reloadControl:function(){
		this.$.birth_date.completeSetup();
	},
	getPWDChangeData:function(){
		return this.$.passChange.getPWChangeData();
	}	
});
