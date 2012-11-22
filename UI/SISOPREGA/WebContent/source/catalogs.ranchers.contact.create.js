enyo.kind({
	name: "catalogs.ranchers.contact.create",	
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	events: {
		"onAddRancher": "",
		"onUpdateRancher": "",	
		"onCancel":""	
	},
	objRancher:null,
	objContact:{},	
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
				 caption: "Crear", onclick: "addContact"}]},
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
		this.objContact=null;		
		this.$.aka.setValue("");
		this.$.first_name.setValue("");
		this.$.last_name.setValue("");
		this.$.mother_name.setValue("");
		this.$.birth_date.setValue(new Date());
		this.$.email_add.setValue("");
		this.$.phone_number.setValue("");		
	},
	updateRancher:function(){		
		cacheRanchers.updateContact(this.objRancher,this.objContact,this.getContact(),this,"doUpdateRancher");
	},
	getContact:function(){
		var fmt = new enyo.g11n.DateFmt({format: "yyyy-MM-dd"});		
		var objContact={	
							rancher_id:		"",
							aka:			"", 
							first_name:		"", 
							last_name:		"", 
							mother_name:	"",
							email_add:		"",
							contacts:		[],
							billing:		{},
							rancher_type:	1,
							phone_number:	""
						};
		objContact.aka=this.$.aka.getValue();
		objContact.first_name=this.$.first_name.getValue();
		objContact.last_name=this.$.last_name.getValue();
		objContact.mother_name=this.$.mother_name.getValue();
		objContact.birth_date=fmt.format(this.$.birth_date.getValue());
		objContact.email_add=this.$.email_add.getValue();
		objContact.phone_number=this.$.phone_number.getValue();
		return objContact;
	},
	addContact:function(){
		cacheRanchers.addContact(this.objRancher,this.getContact(),this,"doAddRancher");		
	},
	setRancher:function(objRancher){
		this.objRancher=objRancher;	
	},
	setContact:function(objRancher,objContact){
		this.resetValues();		
		this.objRancher=objRancher;
		this.objContact=objContact;
		this.$.aka.setValue(this.objContact.aka);
		this.$.first_name.setValue(this.objContact.first_name);
		this.$.last_name.setValue(this.objContact.last_name);
		this.$.mother_name.setValue(this.objContact.mother_name);
		this.$.birth_date.setValue(new Date(this.objContact.birth_date.substring(0,4),
												this.objContact.birth_date.substring(5,7)-1,
												this.objContact.birth_date.substring(8,10)																
									 ));
		this.$.email_add.setValue(this.objContact.email_add);
		this.$.phone_number.setValue(this.objContact.phone_number);
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