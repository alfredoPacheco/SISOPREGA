enyo.kind({
	name: "ranchers.profile.person",
	kind: "FittableColumns",
	classes: "onyx",
	events: {	
		onUpdate:"",
		onCancel:"",
	},	
	components: [
  		{style:"width:1%"},
  		{style:"width:98%",components:[
			{kind: "onyx.Popup",classes: "onyx", name: "popPassword", centered: true, modal:true,	 floating: true, scrim: true, 
				components: [
					{kind: "ranchers.profile.password",classes: "onyx",onCancel:"closePopPW",onChange:"changePW"}
			]},
			{kind: "onyx.Groupbox", classes:"onyx-sample-result-box", components: [
				{kind: "onyx.GroupboxHeader", content: "alias"},
				{kind: "onyx.InputDecorator", components: [{kind: "onyx.Input",name:"aka",style:"width:100%", value: ""}]},
			]},			
			{kind: "onyx.Groupbox", classes:"onyx-sample-result-box", components: [
				{kind: "onyx.GroupboxHeader", content: "Nombre"},
				{kind: "onyx.InputDecorator", components: [{kind: "onyx.Input",name:"first_name",style:"width:100%", value: ""}]},
			]},
			{tag:"br"},
			{kind: "onyx.Groupbox", classes:"onyx-sample-result-box", components: [
				{kind: "onyx.GroupboxHeader", content: "Apellido Paterno"},
				{kind: "onyx.InputDecorator", components: [{kind: "onyx.Input",name:"last_name",style:"width:100%", value: "", }]},
			]},
			{tag:"br"},   		
			{kind: "onyx.Groupbox", classes:"onyx-sample-result-box", components: [
				{kind: "onyx.GroupboxHeader", content: "Apellido Materno"},
				{kind: "onyx.InputDecorator", components: [{kind: "onyx.Input",name:"mother_name",style:"width:100%", value: "", }]},
			]},
			{tag:"br"},		
			{kind: "onyx.Groupbox", classes:"onyx-sample-result-box", components: [
				{kind: "onyx.GroupboxHeader", content: "Fecha de Nacimiento"},
				{kind:"onyx.DatePicker", name:'birth_date', minYear:1900, maxYear:2010, style:"border-width: 0 0px 0px 0px;"},		
			]},		
			{tag:"br"},		
			{kind: "onyx.Groupbox", classes:"onyx-sample-result-box", components: [
				{kind: "onyx.GroupboxHeader", content: "Email"},
				{kind: "onyx.InputDecorator", components: [{kind: "onyx.Input",name:"email_add",style:"width:100%", fit:true,value: "", }]},
			]},
			{tag:"br"},		
			{kind: "onyx.Groupbox", classes:"onyx-sample-result-box", components: [
				{kind: "onyx.GroupboxHeader", content: "Telefono Celular"},
				{kind: "onyx.InputDecorator", components: [{kind: "onyx.Input",style:"width:100%", value: "", name:"phone_number",
				                                            onfocus : "applyMask"}]},
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
				  {kind:"onyx.Button", onclick:"launchReport",content:"OK",classes: "onyx-affirmative",
				   style:"width:49%", onclick:"updateProfile"},
				  {style:"width:2%"},
				  {kind:"onyx.Button", onclick:"doCancel",content:"Cancelar",classes: "onyx-negative",
				   style:"width:49%"},
			 ]},
		]},
       {style:"width:1%"},		 	
	],
	openPopPW:function(){
		this.$.popPassword.show();
	},	
	closePopPW:function(){
		this.$.popPassword.hide();
	},
	setProfile:function(objData){
		this.$.aka.getValue(objData.aka);
		//this.$.birth_date.setValue(objData.birth_date);
		this.$.email_add.setValue(objData.email_add);
		this.$.first_name.setValue(objData.first_name);
		this.$.last_name.setValue(objData.last_name);
		this.$.mother_name.setValue(objData.mother_name);
		this.$.phone_number.setValue(objData.phone_number)
	},	
	getProfile:function(){
     var objData ={
          		  aka : this.$.aka.getValue(),
				  birth_date : this.$.birth_date.getValue(),
				  email_add : this.$.email_add.getValue(),
				  first_name : this.$.first_name.getValue(),
				  last_name : this.$.last_name.getValue(),
				  mother_name : this.$.mother_name.getValue(),
				  phone_number : this.$.phone_number.getValue(),
        };
     	return objData;
	},
	changePW:function(){
		alert('TODO: Change password');
		var objData={};
		this.$.popPassword.hide();
	},
	applyMask : function(inSender) {
		var _id = inSender.id;
		jQuery(function(j) {
			j(document.getElementById(_id)).mask('(999) 999-9999');
		});	
	}				
});