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
				className:"formBG",
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
						{kind: "DatePicker", name:"birth_date", label: "", minYear:1940, maxYear:new Date().getFullYear(), className:"picker-hbox"}]},						
				  {kind: "Input", name:"email_add", hint:"Email",
				   inputClassName: "blankInput", focusClassName:"darkFocus"},
				   {
						kind : "Input",
						name : "phone_number",
						hint : "Telefono",
						inputClassName : "blankInput",
						focusClassName : "darkFocus",
						onfocus : "applyMask"
					} ,
				   {kind: "Input", name:"address_one", hint:"Domicilio",
					   inputClassName: "blankInput", focusClassName:"darkFocus"},
				   {kind: "Input", name:"address_two", hint:"",
					   inputClassName: "blankInput", focusClassName:"darkFocus"},
				   {kind: "Input", name:"city", hint:"Ciudad",
					   inputClassName: "blankInput", focusClassName:"darkFocus"},
				   {kind: "Input", name:"address_state", hint:"Estado",
					   inputClassName: "blankInput", focusClassName:"darkFocus"},
				   {kind: "Input", name:"zip_code", hint:"Codigo Postal",
					   inputClassName: "blankInput", focusClassName:"darkFocus"},					   
				   ]},
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
		this.$.address_one.setValue("");
		this.$.address_two.setValue("");
		this.$.city.setValue("");
		this.$.address_state.setValue("");
		this.$.zip_code.setValue("");	
		
	},
	updateRancher:function(){		
		cacheRanchers.updateContact(this.objRancher,this.objContact,this.getContact(),this,"doUpdateRancher");
	},
	getContact:function(){
		var fmt = new enyo.g11n.DateFmt({format: "yyyy/MM/dd", locale: new enyo.g11n.Locale("es_es")});		
		
		var objContact = {
				contact_id:		"",
				rancher_id:		"",
				aka:			"",
				first_name:		"",
				last_name:		"",
				mother_name:	"",
				birth_date:		"",
				email_add:		"",
				phone_number:	"",
				address_one:	"",
				address_two:	"",
				city:			"",
				address_state:	"",
				zip_code:		""								
			};
		
		objContact.aka=this.$.aka.getValue();
		objContact.first_name=this.$.first_name.getValue();
		objContact.last_name=this.$.last_name.getValue();
		objContact.mother_name=this.$.mother_name.getValue();
		if(this.$.birth_date.getValue()!=null){			
			objContact.birth_date=fmt.format(this.$.birth_date.getValue());
		}
		objContact.email_add=this.$.email_add.getValue();
		objContact.phone_number=this.$.phone_number.getValue();
		objContact.address_one=this.$.address_one.getValue();
		objContact.address_two=this.$.address_two.getValue();
		objContact.city=this.$.city.getValue();
		objContact.address_state=this.$.address_state.getValue();
		objContact.zip_code=this.$.zip_code.getValue();		
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
		if(this.objContact.birth_date != ''){
			this.$.birth_date.setValue(new Date(this.objContact.birth_date.substring(0,4),
												this.objContact.birth_date.substring(5,7)-1,
												this.objContact.birth_date.substring(8,10)																
									 ));
		}
		this.$.email_add.setValue(this.objContact.email_add);
		this.$.phone_number.setValue(this.objContact.phone_number);
		this.$.address_one.setValue(this.objContact.address_one);
		this.$.address_two.setValue(this.objContact.address_two);
		this.$.city.setValue(this.objContact.city);
		this.$.address_state.setValue(this.objContact.address_state);
		this.$.zip_code.setValue(this.objContact.zip_code);
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
	},
	applyMask : function(inSender) {
		var _id = inSender.$.input.getId();
		jQuery(function(j) {
			j(document.getElementById(_id)).mask('(999) 999-9999');
		});
	}
});