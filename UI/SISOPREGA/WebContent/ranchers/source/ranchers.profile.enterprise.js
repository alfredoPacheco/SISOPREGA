enyo.kind({
	name: "ranchers.profile.enterprise",
	kind: "FittableColumns",
	classes: "onyx",
	events: {	
		onUpdate:"",
		onCancel:"",
		onChangePW:""
	},
	iId:null,
	components: [
  		{style:"width:1%"},
  		{style:"width:98%",components:[
			{kind: "onyx.Popup",classes: "onyx", name: "popPassword", centered: true, modal:true,	 floating: true, scrim: true, 
				components: [
					{kind: "ranchers.profile.password",name:'passChange',classes: "onyx",onCancel:"closePopPW",onChange:"doChangePW"}
			]},
			{kind: "onyx.Groupbox", classes:"onyx-sample-result-box", components: [
				{kind: "onyx.GroupboxHeader", content: "Razon Social"},
				{kind: "onyx.InputDecorator", components: [{kind: "onyx.Input",name:"company_name",style:"width:100%", value: "", }]},
			]},
			{kind: "onyx.Groupbox", classes:"onyx-sample-result-box", components: [
				{kind: "onyx.GroupboxHeader", content: "Calle y Numero"},
				{kind: "onyx.InputDecorator", components: [{kind: "onyx.Input",name:"address_one",style:"width:100%", value: "", }]},
			]},
			{kind: "onyx.Groupbox", classes:"onyx-sample-result-box", components: [
				{kind: "onyx.GroupboxHeader", content: "Colonia"},
				{kind: "onyx.InputDecorator", components: [{kind: "onyx.Input",name:"address_two",style:"width:100%", value: "", }]},
			]},
			{kind: "onyx.Groupbox", classes:"onyx-sample-result-box", components: [
				{kind: "onyx.GroupboxHeader", content: "Entidad"},
				{kind: "onyx.InputDecorator", components: [{kind: "onyx.Input",name:"state_id",style:"width:100%", value: "", }]},		
			]},		
			{kind: "onyx.Groupbox", classes:"onyx-sample-result-box", components: [
				{kind: "onyx.GroupboxHeader", content: "Poblacion"},
				{kind: "onyx.InputDecorator", components: [{kind: "onyx.Input",name:"city_id",style:"width:100%", fit:true,value: "", }]},
			]},
			{kind: "onyx.Groupbox", classes:"onyx-sample-result-box", components: [
				{kind: "onyx.GroupboxHeader", content: "Codigo Postal"},
				{kind: "onyx.InputDecorator", components: [{kind: "onyx.Input",name:"zip_code",style:"width:100%", fit:true,value: "", }]},
			]},
			{kind: "onyx.Groupbox", classes:"onyx-sample-result-box", components: [
				{kind: "onyx.GroupboxHeader", content: "RFC"},
				{kind: "onyx.InputDecorator", components: [{kind: "onyx.Input",name:"rfc",style:"width:100%", fit:true,value: "", }]},
			]},
			{kind: "onyx.Groupbox", classes:"onyx-sample-result-box", components: [
				{kind: "onyx.GroupboxHeader", content: "Telefono Celular"},
				{kind: "onyx.InputDecorator", components: [{kind: "onyx.Input",name:"phone_number",style:"width:100%", 
				 value: "", onfocus : "applyMask"}]},
			]},
			{kind: "onyx.Groupbox", classes:"onyx-sample-result-box", components: [
				{kind: "onyx.GroupboxHeader", content: "Email"},
				{kind: "onyx.InputDecorator", components: [{kind: "onyx.Input",name:"email",style:"width:100%", fit:true,value: "", }]},
			]},
			{tag:"br"},					
			{kind: "onyx.Groupbox", classes:"onyx-sample-result-box", components: [
				{kind: "onyx.GroupboxHeader", content: "-"},
				{kind:"onyx.Button", onclick:"launchReport",content:"Cambiar Password",
				 classes: "onyx-blue", style:"width:100%",onclick:"openPopPW"},
			]},								
			{tag:"br"},						
			{tag:"br"},										
			{kind: "FittableColumns", style:"align:center",components:[
				  {kind:"onyx.Button",content:"OK",classes: "onyx-affirmative",
				   style:"width:49%",onclick:"doUpdate"},
				  {style:"width:2%"},
				  {kind:"onyx.Button", onclick:"doCancel",content:"Cancelar",classes: "onyx-negative",
				   style:"width:49%"},
			 ]},
		]},
       {style:"width:1%"},		 	
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