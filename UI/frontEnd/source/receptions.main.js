enyo.kind({
	name: "receptions.main",
	//kind: enyo.SlidingView,
	kind: enyo.VFlexBox,	
	iProduct:"",
	events:{
		"onGoBack":"",
		"onWeights":""
	},
	components: [	
		{kind: enyo.Pane, flex: 1, name: "mainPane",
		 components:[
					{kind:"receptions.list",name:"receptionList", objList:null, 
					 onSelectReception:"selectProduct",onCreation:"showCreate"},
					{kind:"receptions.create",name:"reception",onAddReception:"addReception", 
					 onUpdateReception:"addReception",onCancel:"showList"},					
					{kind:"receptions.options",name:"recOptions", onEdit:"showEditReception",
					 onWeights:"showWeights",onBarnyards:"showBarnyards"},
					{kind:"receptions.weights",name:"weightList"},
					{kind:"receptions.barnyards",name:"barnyardList"},																												
		]},
	],
	showEditReception:function(){
		this.$.reception.toggleUpdate();		
		this.$.reception.setReception(this.$.receptionList.getReception());
		this.$.mainPane.selectViewByName("reception");
	},
	addReception:function(){
		this.$.receptionList.updateList();
		cacheMan.goBack();
	},
	ready:function(){
		this.$.receptionList.updateList();
	},
	selectProduct:function(inSender, inEvent){
		this._addGoback();		
		this.$.mainPane.selectViewByName("recOptions");
	},
	showCreate:function(){
		this._addGoback();		
		this.$.reception.resetValues();		
		this.$.reception.toggleAdd();
		this.$.mainPane.selectViewByName("reception");
	},
	showEdit:function(){
		this._addGoback();
		this.$.mainPane.selectViewByName("reception");
	},	
	showList:function(){
		this._addGoback();		
		this.$.mainPane.selectViewByName("receptionList");		
	},
	showWeights:function(){
		_gobackStack.push({caption:"Acciones",paneMan:this.$.mainPane,paneName:"recOptions"});		
		_objMainHeader.setContent('Pesos');
		this.$.weightList.setReception(this.$.receptionList.getReception());
		this.$.weightList.updateList();
		this.$.mainPane.selectViewByName("weightList");				
	},
	showBarnyards:function(){
		_gobackStack.push({caption:"Acciones",paneMan:this.$.mainPane,paneName:"recOptions"});		
		_objMainHeader.setContent('Corrales');	
		this.$.barnyardList.setReception(this.$.receptionList.getReception());
		this.$.barnyardList.updateList();		
		this.$.mainPane.selectViewByName("barnyardList");							
	},
	_addGoback:function(){
		_gobackStack.push({caption:"Recepciones",paneMan:this.$.mainPane,paneName:"receptionList",
		                   cbObj:this,cbMethod:"updateBYList"});		
	},
	updateBYList:function(){
		this.$.receptionList.updateList();		
	}
});
