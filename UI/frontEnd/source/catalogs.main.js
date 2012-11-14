enyo.kind({
	name: "catalogs.main",
	//kind: enyo.SlidingView,
	kind: enyo.VFlexBox,	
	iProduct:"",
	events:{
	},
	components: [
		{ kind: enyo.Pane, flex: 1, name: "mainPane",
		 components:[
			{kind:"catalogs.menu",name:"catMenu", onRanchers:"showRanchers",onBarnyards:"showBarnyards",
			 onReports:"showReports",onCattle:"showCattle"},			
			{kind:"catalogs.cattle",name:"catCattle"},									 
			{kind:"catalogs.barnyards",name:"catBY"},						
			{kind:"catalogs.ranchers",name:"catRanchers"},			
		 ]},		 
	],
	showRanchers:function(){
		this.addGoBackAction();
		_objMainHeader.setContent('Ganaderos');
		//this.$.ranchersList.$.catRanchers.upda
		this.$.mainPane.selectViewByName("catRanchers");		
	},	
	showBarnyards:function(){
		this.addGoBackAction();		
		_objMainHeader.setContent('Corrales');
		this.$.catBY.$.barnyardList.updateList();
		this.$.mainPane.selectViewByName("catBY");		
	},		
	showReports:function(){
		this.addGoBackAction();		
		_objMainHeader.setContent('Reportes');
		this.$.mainPane.selectViewByName("reports.menu");		
	},
	showCattle:function(){
		this.addGoBackAction();		
		_objMainHeader.setContent('Ganado');		
		this.$.mainPane.selectViewByName("catCattle");				
	},
	addGoBackAction:function(){
		_gobackStack.push({caption:"Catalogos",paneMan:this.$.mainPane,paneName:"catMenu"});		
	}	
});
