enyo.kind({
	name: "catalogs.ranchers.billing.create",	
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
		 className:"formBG",
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
		cacheRanchers.updateBilling(this.objRan,this.getBilling(),this,"doUpdateRancher");
	},
	getBilling:function(){
		var objBilling ={billing_id:null,rancher_id:null,company_name:"",					 
					 address_one:"",address_two:"",
				     city_name:"",state_id:"",state_name:"",zip_code:"",rfc:"",phone_number:""};
		objBilling.company_name=this.$.company_name.getValue();
		objBilling.address_one=this.$.address_one.getValue();
		objBilling.address_two=this.$.address_two.getValue();
		objBilling.state_id=this.$.state_id.getValue();
		objBilling.city_id=this.$.city_id.getValue();
		objBilling.zip_code=this.$.zip_code.getValue();								
		objBilling.rfc=this.$.rfc.getValue();
		objBilling.phone_number=this.$.phone_number.getValue();
		return objBilling;
	},
	setRancher:function(objRan){
		this.resetValues();		
		this.objRan=objRan;
		if(this.objRan.billing.rfc){
			this.$.company_name.setValue(this.objRan.billing.company_name);
			this.$.address_one.setValue(this.objRan.billing.address_one);
			this.$.address_two.setValue(this.objRan.billing.address_two);
			this.$.state_id.setValue(this.objRan.billing.state_id);
			this.$.city_id.setValue(this.objRan.billing.city_id);
			this.$.zip_code.setValue(this.objRan.billing.zip_code);
			this.$.rfc.setValue(this.objRan.billing.rfc);
			this.$.phone_number.setValue(this.objRan.billing.phone_number);
		}else{
			this.resetValues();
		}
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