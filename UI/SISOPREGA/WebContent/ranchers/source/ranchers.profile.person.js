enyo.kind({
	name: "ranchers.profile.person",
	kind: "FittableColumns",
	classes: "onyx",
	events: {	
		onUpdate:"",
		onCancel:"",
	},	
	iId:null,
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
				{kind:"onyx.DatePicker", bBlank:true,name:'birth_date', minYear:1900, maxYear:2010, style:"border-width: 0 0px 0px 0px;",
				 onclick:"reloadControl"},		
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
				  {kind:"onyx.Button", onclick:"doUpdate",content:"OK",classes: "onyx-affirmative",
				   style:"width:49%",},
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
		this.$.phone_number.setValue(objData.phone)
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
	},
	reloadControl:function(){
		this.$.birth_date.completeSetup();
	}
});
