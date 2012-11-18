enyo.kind({
	name: "catalogs.ranchers.person.create",	
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	events: {
		"onAddRancher": "",
		"onUpdateRancher": "",	
		"onCancel":""	
	},
	objRan:{},	
	components: [	
			{kind: enyo.Scroller, flex: 1,	
			 components:[
			{kind: "RowGroup", defaultKind: "HFlexBox", caption: "", style:"color:#FFF",
			 components: [
				  {kind: "Input", name:"aka", hint:"Alias",
				   inputClassName: "blankInput",focusClassName:"darkFocus"},	       
				  {kind: "Input", name:"first_name", hint:"Nombres",
				   inputClassName: "blankInput", focusClassName:"darkFocus"},	       
				  {kind: "Input", name:"last_name", hint:"Apellido Paterno",
				   inputClassName: "blankInput", focusClassName:"darkFocus"},  							
				  {kind: "Input", name:"mother_name", hint:"Apellido Materno",
				   inputClassName: "blankInput", focusClassName:"darkFocus"},
				  {kind: "VFlexBox", style: "",
				   components:[{content:"Fecha de Nacimiento",},
						{kind: "DatePicker", name:"birth_date", label: "", className:"picker-hbox"}]},						
				  {kind: "Input", name:"email_add", hint:"Email",
				   inputClassName: "blankInput", focusClassName:"darkFocus"},							 
				  {kind: "Input", name:"phone_number", hint:"Telefono",
				   inputClassName: "blankInput", focusClassName:"darkFocus"}]},
			{kind: "Drawer", name:"draAdd", 
			 components: [ 					
				{kind: "Button",name:"btnAdd", className: "enyo-button-affirmative", 
				 caption: "Crear", onclick: "addRancher"}]},
			{kind: "Drawer", name:"draUpdate", components: [		
			    {layoutKind: "HFlexLayout", align: "center",
				 components: [			
					{kind: "Button",name:"btnUpdate", className: "enyo-button-affirmative", 
					 flex:1, caption: "Actualizar", onclick: "updateRancher"},							
					{kind: "Button",name:"btnCancel", className: "enyo-button-negative", 
					 flex:1,caption: "Cancelar", onclick: "doCancel"}]}]}]}		
	],
	ready: function() {		
		this.$.draAdd.setOpen(true);
		this.$.draUpdate.setOpen(false);					
	},
	resetValues:function(){
		this.objRan=null;		
		this.$.aka.setValue("");
		this.$.first_name.setValue("");
		this.$.last_name.setValue("");
		this.$.mother_name.setValue("");
		this.$.birth_date.setValue(new Date());
		this.$.email_add.setValue("");
		this.$.phone_number.setValue("");		
	},
	updateRancher:function(){		
		cacheRanchers.upd(this.objRan,this.getRancher(),this,"doUpdateRancher");
	},
	getRancher:function(){				
		var fmt = new enyo.g11n.DateFmt({format: "MM/dd/yyyy"});
		var objRan={
						rancher_id:		"",
						aka:			"",	
						birthDate:		"",
						emailAddress:	"",
						firstName:		"",
						lastName:		"",
						motherName:		"",
						phone:			"",						
						contacts:		[],
						billing:		{},
						rancher_type:	1,
					};
		
		objRan.aka			=	this.$.aka.getValue();
		objRan.birthDate	=	fmt.format(this.$.birth_date.getValue());
		objRan.emailAddress	=	this.$.email_add.getValue();
		objRan.firstName	=	this.$.first_name.getValue();
		objRan.lastName		=	this.$.last_name.getValue();
		objRan.motherName	=	this.$.mother_name.getValue();
		objRan.phone		=	this.$.phone_number.getValue();
		
		return objRan;
	},
	addRancher:function(){				
		cacheRanchers.create(this.getRancher(),this,"doAddRancher");		
	},
	setRancher:function(objVar){
		this.resetValues();		
		this.objRan=objVar;
		this.$.aka.setValue(this.objRan.aka);
		/*this.$.birth_date.setValue(new Date(this.objRan.birthDate.substring(0,4),
				this.objRan.birthDate.substring(5,7)-1,
				this.objRan.birthDate.substring(8,10)																
		));*/
		this.$.birth_date.setValue(new Date(this.objRan.birthDate.substring(0,2),
				this.objRan.birthDate.substring(3,5)-1,
				this.objRan.birthDate.substring(6,10)																
		));
		this.$.email_add.setValue(this.objRan.emailAddress);
		this.$.first_name.setValue(this.objRan.firstName);
		this.$.last_name.setValue(this.objRan.lastName);
		this.$.mother_name.setValue(this.objRan.motherName);
		this.$.phone_number.setValue(this.objRan.phone);
		this.toggleUpdate();
	},
	toggleUpdate:function(){
		this.$.draAdd.setOpen(false);
		this.$.draUpdate.setOpen(true);				
	},	
	toggleAdd:function(){
		this.$.draAdd.setOpen(true);
		this.$.draUpdate.setOpen(false);				
		this.resetValues();	
	}
});