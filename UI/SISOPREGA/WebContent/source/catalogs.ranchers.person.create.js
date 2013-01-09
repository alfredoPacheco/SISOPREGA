enyo.kind({
	name: "catalogs.ranchers.person.create",	
	kind: "Control", layoutKind: "HFlexLayout",
	events: {
		"onAddRancher": "",
		"onUpdateRancher": "",	
		"onCancel":""	
	},
	objRan:{},	
	components: [	
			{kind: enyo.Scroller, flex: 1,	
			className:"formBG",
			 components:[
			{kind: "RowGroup", defaultKind: "HFlexBox", caption: "",
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
						{kind: "DatePicker", name:"birth_date", minYear:1940, maxYear:new Date().getFullYear(), label: "", className:"picker-hbox"}]},						
				  {kind: "Input", name:"email_add", hint:"Email", inputType:"email",
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
		this.$.birth_date.setNull();
		this.$.email_add.setValue("");
		this.$.phone_number.setValue("");		
	},
	updateRancher:function(){		
		cacheRanchers.upd(this.objRan,this.getRancher(),this,"doUpdateRancher");
	},
	getRancher:function(){				
	
		var fmt = new enyo.g11n.DateFmt({format: "yyyy/MM/dd", locale: new enyo.g11n.Locale("en_us")});
		var objRan={
						rancher_id:		"",
						aka:			"",	
						birth_date:		"",
						email_add:		"",
						first_name:		"",
						last_name:		"",
						mother_name:	"",
						phone_number:	"",
						rancher_type:	1,
					};
		
		objRan.aka			=	this.$.aka.getValue();
		
		if(this.$.birth_date.getValue()!=null){			
			objRan.birth_date=fmt.format(this.$.birth_date.getValue());   
		}
		
		objRan.email_add	=	this.$.email_add.getValue();
		objRan.first_name	=	this.$.first_name.getValue();
		objRan.last_name	=	this.$.last_name.getValue();
		objRan.mother_name	=	this.$.mother_name.getValue();
		objRan.phone_number	=	this.$.phone_number.getValue();
		
		return objRan;
	},
	addRancher:function(){				
		this.iCreated=cacheRanchers.create(this.getRancher(),this,"afteraddRancher");		
	},
	afteraddRancher:function(){
		this.iCreated=cacheRanchers.iLastRanID;
		this.doAddRancher();
	},
	getJustCreated:function(){
		return this.iCreated;
	},	
	setRancher:function(objVar){
		this.resetValues();		
		this.objRan=objVar;
		this.$.aka.setValue(this.objRan.aka);
		
		// Diego: Validate if retrieved value from database is not empty.
		if(this.objRan.birth_date != ''){
			this.$.birth_date.setValue(new Date(this.objRan.birth_date.substring(0,4),
					this.objRan.birth_date.substring(5,7)-1,
					this.objRan.birth_date.substring(8,10)																
			));
		}
		
		
		this.$.email_add.setValue(this.objRan.email_add);
		this.$.first_name.setValue(this.objRan.first_name);
		this.$.last_name.setValue(this.objRan.last_name);
		this.$.mother_name.setValue(this.objRan.mother_name);
		this.$.phone_number.setValue(this.objRan.phone_number);
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