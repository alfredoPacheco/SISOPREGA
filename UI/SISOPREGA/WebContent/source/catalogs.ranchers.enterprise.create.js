enyo.kind({
	name: "catalogs.ranchers.enterprise.create",	
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	events: {
		"onAddRancher": "",
		"onUpdateRancher": "",		
		"onCancel":""
	},
	objRan:{},
	components: [	
		{kind: enyo.Scroller,
    	 style: "background-image: url(images/practice_background.png); background-size: cover; ",			 
	     flex: 1,
		 components: [
			{kind: "RowGroup", defaultKind: "HFlexBox", caption: "",
			 components: [
					  {kind: "Input", name:"company_name", hint:"Razon Social",},	       
					  {kind: "Input", name:"address_one", hint:"Calle y Numero"},	       
					  {kind: "Input", name:"address_two", hint:"Colonia"},	       														  					  {kind: "Input", name:"state_id", hint:"Entidad"},
					  {kind: "Input", name:"city_id", hint:"Poblacion"},	
					  {kind: "Input", name:"zip_code", hint:"Codigo Postal"},					
					  {kind: "Input", name:"rfc", hint:"RFC"},	
					  {kind: "Input", name:"phone_number", hint:"Telefono"},																											
			]},
			{kind: "Drawer", name:"draAdd", components: [ 					
				{kind: "Button",name:"btnAdd", className: "enyo-button-affirmative", 
				 caption: "Crear", onclick: "addRancher"},										
			]},
			{kind: "Drawer", name:"draUpdate", components: [		
			    {layoutKind: "HFlexLayout", align: "center",components: [			
					{kind: "Button",name:"btnUpdate", className: "enyo-button-affirmative", 
					 flex:1, caption: "Actualizar", onclick: "updateRancher"},							
					{kind: "Button",name:"btnCancel", className: "enyo-button-negative", 
					 flex:1,caption: "Cancelar", onclick: "doCancel"},
				]}
			]},		
		]},
	],
	ready: function() {		
		this.$.draAdd.setOpen(true);
		this.$.draUpdate.setOpen(false);					
	},
	resetValues:function(){		
		this.objRan=null;
		this.$.company_name.setValue("");
		this.$.address_one.setValue("");
		this.$.address_two.setValue("");
		this.$.state_id.setValue("");
		this.$.city_id.setValue("");
		this.$.zip_code.setValue("");
		this.$.rfc.setValue("");
		this.$.phone_number.setValue("");		
	},
	updateRancher:function(){
		cacheRanchers.create(this.objRan,this.getRancher(),this,"doUpdateRancher");
	},
	getRancher:function(){
		var objRan ={
						rancher_id:		"",
						company_name:	"",
						contacts:		[],
						billing:		{},
						rancher_type:	2,
						address_one:	"",
						address_two:	"",
						city_id:		"",
						city_name:		"",
						state_id:		"",
						state_name:		"",
						zip_code:		"",
						rfc:			"",
						phone_number:	""
					};
		objRan.company_name=this.$.company_name.getValue();
		objRan.address_one=this.$.address_one.getValue();
		objRan.address_two=this.$.address_two.getValue();
		objRan.state_id=this.$.state_id.getValue();
		objRan.city_id=this.$.city_id.getValue();
		objRan.zip_code=this.$.zip_code.getValue();								
		objRan.rfc=this.$.rfc.getValue();
		objRan.phone_number=this.$.phone_number.getValue();
		return objRan;
	},
	addRancher:function(){
		cacheRanchers.create(this.getRancher(),this,"doAddRancher");
	},
	setRancher:function(objRan){
		this.resetValues();		
		this.objRan=objRan;
		this.$.company_name.setValue(this.objRan.company_name);
		this.$.address_one.setValue(this.objRan.address_one);
		this.$.address_two.setValue(this.objRan.address_two);
		this.$.state_id.setValue(this.objRan.state_id);
		this.$.city_id.setValue(this.objRan.city_id);
		this.$.zip_code.setValue(this.objRan.zip_code);
		this.$.rfc.setValue(this.objRan.rfc);
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
	},		
});