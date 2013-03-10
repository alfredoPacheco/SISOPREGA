enyo.kind({
	name: "ranchers.profile.enterprise",
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
		        content: "Raz&oacute;n Social",
		        allowHtml:true
		    }, {
		        classes: "onyx-toolbar-inline",
		        components: [
		        {
		            kind: "onyx.InputDecorator",
		            style:"width:100%",
		            components: [{
		                kind: "onyx.Input",
		                name:"company_name", value:"",
		                placeholder: "Escriba el texto aqui"
		            }]
		        },
	        ]},
	        {
		        classes: "onyx-sample-divider",
		        content: "Calle y N&uacute;mero",
		        allowHtml:true
		    }, {
		        classes: "onyx-toolbar-inline",
		        components: [
		        {
		            kind: "onyx.InputDecorator",
		            style:"width:100%",
		            components: [{
		                kind: "onyx.Input",
		                name:"address_one", value:"",
		                placeholder: "Escriba el texto aqui"
		            }]
		        },
	        ]},
	        {
		        classes: "onyx-sample-divider",
		        content: "Colonia"
		    }, {
		        classes: "onyx-toolbar-inline",
		        components: [
		        {
		            kind: "onyx.InputDecorator",
		            style:"width:100%",
		            components: [{
		                kind: "onyx.Input",
		                name:"address_two", value:"",
		                placeholder: "Escriba el texto aqui"
		            }]
		        },
	        ]},
			
	        {
		        classes: "onyx-sample-divider",
		        content: "Entidad"
		    }, {
		        classes: "onyx-toolbar-inline",
		        components: [
		        {
		            kind: "onyx.InputDecorator",
		            style:"width:100%",
		            components: [{
		                kind: "onyx.Input",
		                name:"state_id", value:"",
		                placeholder: "Escriba el texto aqui"
		            }]
		        },
	        ]},
	        {
		        classes: "onyx-sample-divider",
		        content: "Poblaci&oacute;n",
		        allowHtml:true
		    }, {
		        classes: "onyx-toolbar-inline",
		        components: [
		        {
		            kind: "onyx.InputDecorator",
		            style:"width:100%",
		            components: [{
		                kind: "onyx.Input",
		                name:"city_id", value:"",
		                placeholder: "Escriba el texto aqui"
		            }]
		        },
	        ]},
	        {
		        classes: "onyx-sample-divider",
		        content: "Codigo Postal"
		    }, {
		        classes: "onyx-toolbar-inline",
		        components: [
		        {
		            kind: "onyx.InputDecorator",
		            style:"width:100%",
		            components: [{
		                kind: "onyx.Input",
		                name:"zip_code", value:"",
		                placeholder: "Escriba el texto aqui"
		            }]
		        },
	        ]},
	        {
		        classes: "onyx-sample-divider",
		        content: "RFC"
		    }, {
		        classes: "onyx-toolbar-inline",
		        components: [
		        {
		            kind: "onyx.InputDecorator",
		            style:"width:100%",
		            components: [{
		                kind: "onyx.Input",
		                name:"rfc", value:"",
		                placeholder: "Escriba el texto aqui"
		            }]
		        },
	        ]},
	        {
		        classes: "onyx-sample-divider",
		        content: "Telefono Celular"
		    }, {
		        classes: "onyx-toolbar-inline",
		        components: [
		        {
		            kind: "onyx.InputDecorator",
		            style:"width:100%",
		            components: [{
		                kind: "onyx.Input",
		                name:"phone_number", value:"",
		                placeholder: "Escriba el texto aqui"
		            }]
		        },
	        ]},
	        {
		        classes: "onyx-sample-divider",
		        content: "Email"
		    }, {
		        classes: "onyx-toolbar-inline",
		        components: [
		        {
		            kind: "onyx.InputDecorator",
		            style:"width:100%",
		            components: [{
		                kind: "onyx.Input",
		                name:"email", value:"",
		                placeholder: "Escriba el texto aqui"
		            }]
		        },
	        ]},
			{tag:"br"},					
			{kind:"onyx.Button", onclick:"launchReport",content:"Cambiar Password",
			 classes: "onyx-blue", style:"width:100%",onclick:"openPopPW"},
			{tag:"br"},						
			{tag:"br"},										
			{kind: "FittableColumns", style:"align:center",components:[
				  {kind:"onyx.Button",content:"OK",classes: "onyx-affirmative",
				   style:"width:49%",onclick:"doUpdate"},
				  {style:"width:2%"},
				  {kind:"onyx.Button", onclick:"doCancel",content:"Cancelar",classes: "onyx-negative",
				   style:"width:49%"},
			 ]},
		]}		 	
	],
	setProfile:function(objData){
		this.iId=objData.enterpriseId;
		this.$.company_name.setValue(objData.legalName);
		this.$.address_one.setValue(objData.addressOne);
		this.$.address_two.setValue(objData.addressTwo);
		this.$.city_id.setValue(objData.city);
		this.$.state_id.setValue(objData.state);
		this.$.zip_code.setValue(objData.zipCode);
		this.$.rfc.setValue(objData.legalId);
		this.$.phone_number.setValue(objData.telephone);
		this.$.email.setValue(objData.email);				 
	},		
	getProfile:function(){		
		 var objData ={enterpriseId:this.iId,
				 	  legalName: this.$.company_name.getValue(),
					  addressOne: this.$.address_one.getValue(),
					  addressTwo: this.$.address_two.getValue(),
					  city: this.$.city_id.getValue(),
					  state: this.$.state_id.getValue(),
					  zipCode: this.$.zip_code.getValue(),
					  legalId: this.$.rfc.getValue(),
					  telephone: this.$.phone_number.getValue(),
					  email: this.$.email.getValue()};		
		 return objData;		 
	},	
	openPopPW:function(){
		this.$.popPassword.show();
	},	
	closePopPW:function(){
		this.$.popPassword.hide();
		return true;
	},
	getPWDChangeData:function(){
		return this.$.passChange.getPWChangeData();
	},
	closePWPopup:function(){
		this.$.popPassword.hide();
		return true;
	},
	applyMask : function(inSender) {
		var _id = inSender.id;
		jQuery(function(j) {
			j(document.getElementById(_id)).mask('(999) 999-9999');
		});	
	}
});