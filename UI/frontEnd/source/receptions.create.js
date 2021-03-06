enyo.kind({
	name: "receptions.create",	
	kind: enyo.SlidingView,	
	layoutKind: enyo.VFlexLayout,	
	events: {
		"onAddReception": "",
		"onUpdateReception": "",
		"onAddRancher":"",		
		"onCancel":""
	},
	objRec:null,
	objList:[],
	arrBY:null,
	components: [	
		{kind: enyo.Scroller,
    	 className:"formBG",			 
	     flex: 1,
		 components: [
			{name: "options", kind: enyo.PopupSelect, onSelect: "addNewRancher",
				items:[
					{caption: "Empresa/Sociedad", value:1 },
					{caption: "Persona Fisica", value:2 },
				]
			},		 
			{name: "addRancherDialog", kind: "Popup", showHideMode: "transition", openClassName: "zoomFadeIn", 
			 className: "transitioner2", layoutKind: "VFlexLayout",
			 style: "overflow: hidden", width: "85%", height: "85%",scrim: true, components: [
				
			]},
			{kind: "RowGroup", defaultKind: "HFlexBox", caption: "", style:"color:#FFF",
			 components: [
					  {kind: "Item",
						components: [
							{content: "Ganadero", className: "enyo-label", flex: 1},
							{layoutKind: enyo.HFlexLayout,components:[
								{name: 'rancher_id', flex:1, kind: "ListSelector",contentPack:"end", items: []},
								{kind: enyo.IconButton, icon: "images/menu-icon-new.png", 
								 onclick: "contextMenuClicked" },	
							]}							
					   ]},
							
					  {kind: "Item",
						components: [
							{content: "Ganado", className: "enyo-label", flex: 1},
							{name: 'cattype_id', flex: 1, kind: "ListSelector", contentPack:"end", items: []}]},
					  {kind: "Item",
						components: [
							{content: "Ciudad de Origen", className: "enyo-label", flex: 1},
							{name: 'city_id',flex: 1, kind: "ListSelector",float:true,
							 contentPack:"end", items:[]}]},					  
					{kind: "VFlexBox", style: "",					  				  
					 components:[
					     {content:"Fecha de Llegada",},
						 {kind: "DatePicker", name:"arrival_date", label:"",
						  inputClassName: "blankInput",focusClassName:"darkFocus",changeOnInput: true}]},
						 {kind: "Input", name:"hc_aprox",   hint:"Cabezas",inputClassName: "blankInput",
					 	  changeOnInput: true,inputType:"number",},
						 {kind: "Input", name:"weight", hint:"Peso",inputClassName: "blankInput",
					 	  changeOnInput: true,inputType:"number",}]},
			{kind: "Drawer", name:"draAdd", 
			 components: [ 					
			    {layoutKind: "HFlexLayout", align: "center",components: [			
				{kind: "Button",name:"btnAdd", className: "enyo-button-affirmative", 
				 flex:1,caption: "Crear", onclick: "addReception"},										
				{kind: "Button",name:"btnCancelCreate", className: "enyo-button-negative", 
				 flex:1,caption: "Cancelar", onclick: "doCancel"}]}]},
			{kind: "Drawer", name:"draUpdate", components: [		
			    {layoutKind: "HFlexLayout", align: "center",
				 components: [			
					{kind: "Button",name:"btnUpdate", className: "enyo-button-affirmative", 
					 flex:1, caption: "Actualizar", onclick: "updateReception"},							
					{kind: "Button",name:"btnCancelUpd", className: "enyo-button-negative", 
					 flex:1,caption: "Cancelar", onclick: "doCancel"},]}]},			
		]},
	],
	categoryChanged: function(inSender, inValue, inOldValue) {
		//enyo.log(enyo.json.stringify(this._arrDefinitions[inValue]));
		//this.$.lstDef.setItems(this._arrDefinitions[inValue]);
		//this.$.lstDef.setValue(null);			
	},
	ready:function(){
		this.resetValues();
	},
	addReception:function(){
		cacheReceptions.create(this.getReception(),this,"doAddReception");
	},
	getReception:function(){
		var receptionDef;		
		receptionDef ={rancher_id:null,arrival_date:"",company_name:"",
					   arrival_date:"",cattype_id:"",cattype_name:"",hc_aprox:"",city_id:"",city_name:"",
					   weights:[], barnyards:[],accepted_count:"",inspections:[],feed:[]};
					   
		var fmt = new enyo.g11n.DateFmt({format: "yyyy-MM-dd"});		
		var rancher=cacheRanchers.getByID(this.$.rancher_id.getValue());
		if(rancher.rancher_type==1){			
			receptionDef.rancher_name=rancher.aka+" / "+rancher.last_name+" "+
									  rancher.mother_name+" "+rancher.first_name;			
		}else{
			receptionDef.rancher_name=rancher.company_name;
		}
		receptionDef.rancher_id=this.$.rancher_id.getValue();				
		receptionDef.city_id=this.$.city_id.getValue();
		receptionDef.city_name=cacheMan.getCityByID(this.$.city_id.getValue()).city_name;
		receptionDef.arrival_date=fmt.format(this.$.arrival_date.getValue());
		receptionDef.cattype_id=this.$.cattype_id.getValue();
		receptionDef.cattype_name=cacheCattle.getByID(this.$.cattype_id.getValue()).cattype_name;	
		receptionDef.weights.push({hcw_id:null,hc:this.$.hc_aprox.getValue(),weight:this.$.weight.getValue()});
		receptionDef.hc_aprox=this.$.hc_aprox.getValue();
		receptionDef.barnyards=this.arrBY;		
		return receptionDef;
	},
	updateReception:function(){		
		cacheReceptions.upd(this.objRec,this.getReception(),this,"doUpdateReception");				
	},
	resetValues:function(){
		this.$.rancher_id.setValue(0);
		this.$.cattype_id.setValue(0);
		this.$.city_id.setValue(0);		
		this.$.arrival_date.setValue(new Date());
		this.$.hc_aprox.setValue("");
		this.$.rancher_id.setItems(cacheRanchers.ls());
		this.$.cattype_id.setItems(cacheCattle.getLS());
		this.$.city_id.setItems(cacheMan.getCitiesLS());
	},
	setReception:function(receptionDef,arrBY){
		this.resetValues();
		this.arrBY=arrBY;
		if(receptionDef){
			this.objRec=receptionDef;
			this.$.rancher_id.setValue(receptionDef.rancher_id);
			this.$.arrival_date.setValue(new Date(receptionDef.arrival_date.substring(0,4),
												  receptionDef.arrival_date.substring(5,7)-1,
												  receptionDef.arrival_date.substring(8,10)																
										 ));
			this.$.city_id.setValue(receptionDef.city_id);
			this.$.cattype_id.setValue(receptionDef.cattype_id);
			this.$.hc_aprox.setValue(receptionDef.hc_aprox);
			if(receptionDef.weights.length==1){
				this.$.weight.setValue(receptionDef.weights[0].weight);		
			}
		}		
	},
	toggleUpdate:function(){
		this.$.draAdd.setOpen(false);
		this.$.draUpdate.setOpen(true);				
	},	
	toggleAdd:function(){
		this.$.draAdd.setOpen(true);
		this.$.draUpdate.setOpen(false);				
		//this.resetValues();	
	},
	addNewRancher:function(inSender, inSelected ){
		if(this.$.dynoco){
			this.$.dynoco.destroy();
		}
		switch(inSelected.value){ 
			case 1:
				this.$.addRancherDialog.createComponent({kind: "catalogs.ranchers.enterprise.create",
														 onAddRancher:"adoken", name:'dynoco',flex: 1},{owner:this});				
				break;
			case 2:
				this.$.addRancherDialog.createComponent({kind: "catalogs.ranchers.person.create",
														 onAddRancher:"adoken", name:'dynoco',flex: 1},{owner:this});								
				break;
		}
		this.$.addRancherDialog.render();
		this.$.addRancherDialog.openAtCenter();
	},
	contextMenuClicked: function(inSender, inEvent ){		
		this.$.options.openAtEvent(inEvent);		
		//inSender.stopPropagation();
		return false;
	},
	adoken:function(){
		this.resetValues();		
		this.$.rancher_id.setValue(this.$.dynoco.getJustCreated())
		this.$.addRancherDialog.close();		
	}
});