enyo.kind({	
	name: "receptions.barnyards.map",
	arrReception:[{content:"Recepcion",value:1},{content:"Deseleccionar",value:2}],	
	arrPostReception:[{content:"Alimento",value:3},
				      {content:"Inspeccion",value:4},
					  {content:"Editar",value:5},
					  {content:"Liberar",value:6},					  
					  {content:"Deseleccionar",value:8},					  					  
					  ],		
	style:"cursor:pointer;",					  
	kind: "Scroller", touch:true,
	events:{onGoBack:""},
	fit: true,
	classes: "enyo-fit bymBG",
	style: "width:100%; height:100%; bottom:0px; top:0px; left:0px;right:0px",	
	arrByMOver:{},
	objSelected:null,
	arrSelected:{},  
	arrSelectedOccupied:{},  	
	sColorOccupied:"#ff7200",
	sColorFree:"white",	
	sColorSelect:"lightgreen",	
	sColorSelectOccupied:"#9b7eb1",			
	components: [
		{kind:"FittableRows", flex:1, classes:"mapBG",
		 components:[
			{name: "options", kind: "onyx.Picker", onSelect: "actionSelected",items:[]},	
			{
			components:[
				{name: "cells", kind: "FittableRows",align:"middle", onclick: "cellsClick"},
			]},
			{kind: "Popup",name: "popMan", showHideMode: "transition", openClassName: "zoomFadeIn", 
			 classes: "transitioner2", layoutKind: "VFlexLayout",
			 style: "overflow: hidden; posiposition:absolute", width: "95%", height: "95%",scrim: true,}]}
	],
	create: function() {
		this.inherited(arguments);
		this.last=this.$.cells;
		//this.addRow(true);		
		this.addRowHeader();		
		this.createCells("2E",7,4,"50px","50px");
		this.splitRow();
		this.addCustomCell("corraman","Corrales de <br/> Manejo","100px","50px");
		this.createCells("1E",5,6,"50px","50px");
		this.splitRow();
		this.createCells("1E",17,8,"50px","50px");						
		this.addRow();		
		this.createCells("2E",8,4,"50px","50px");
		this.splitRow();
		this.createCells("1E",2,8,"50px","50px");		
		this.splitRow();
		this.createCells("1E",18,8,"50px","50px");		
								
		this.addRow(true);		
		this.createCells("2D",11,4,"50px","50px");
		this.splitRow();
		this.createCells("1D",1,8,"50px","50px");				
		this.splitRow();
		this.createCells("1D",17,8,"50px","50px");
								
		this.addRow();	
		this.createCells("2D",12,6,"33.33px","25px");
		this.splitRow();
		this.createCells("1D",2,12,"33.33px","25px");
		this.splitRow();
		this.createCells("1D",26,4,"100px","25px");		
		
		this.addRow(true);	
		this.createCells("2C",11,6,"33.33px","25px");
		this.splitRow();
		this.createCells("1C",1,12,"33.33px","25px");
		this.splitRow();
		this.createCells("1C",25,4,"100px","25px");	
							
		this.addRow();
		this.createCells("2C",12,6,"33.33px","25px");
		this.splitRow();
		this.createCells("1C",2,12,"33.33px","25px");
		this.splitRow();
		this.createCells("1C",26,4,"100px","25px");		
									
		this.addRow(true);			
		this.createCells("2B",11,6,"33.33px","25px");
		this.splitRow();
		this.createCells("1B",1,12,"33.33px","25px");
		this.splitRow();
		this.createCells("1B",25,4,"100px","25px");						
									
		
		this.addRow(true);
		this.createCells("2B",8,4,"50px","50px");
		this.splitRow();
		this.createCells("1B",2,8,"50px","50px");
		this.splitRow();
		this.createCells("1B",18,6,"50px","50px");		
		this.addCustomCell("lagoxi","Laguna de <br/> Oxidacion","98px","50px");		
											
		this.addRow(true);
		this.createCells("2A",7,4,"50px","50px");
		this.splitRow();
		this.createCells("1A",1,8,"50px","50px");		
		this.splitRow();
		this.createCells("1A",17,8,"50px","50px");		
											
		this.addRow();		
		this.createCells("2A",8,4,"50px","50px");
		this.splitRow();
		this.addCustomCell("cabaA","Caballerizas A","99px","50px");
		this.addCustomCell("cabaB","Caballerizas B","100px","50px");		
		this.createCells("1A",10,4,"50px","50px");
		this.splitRow();
		this.createCells("1A",18,8,"50px","50px");		
		
		
		this.addRow();	
		this.createCells("2R",7,4,"50px","50px");
		this.splitRow();
		this.addCustomCell("spacerone","","813px","50px","customBYCellDesc");		
		
													
		this.addRow();
		this.createCells("2R",8,4,"50px","50px");
		this.splitRow();
		this.addCustomCell("spacertwo","","813px","50px");	
	},
	last:null,
	addQuitButton:function(sName,sCaption,sWidth,sHeight,sClass){
		if(!sClass){
			sClass="customBYcell"
		}
		objBarn.createComponent({kind:onyx.Button,
		                         onclick:"doGoBack",
								 style:"height:30px; width:50px; padding:0",
								 content:"X"
								 },{owner: this});		
	},
	addCustomCell:function(sName,sCaption,sWidth,sHeight,sClass){
		if(!sClass){
			sClass="customBYcell"
		}
		objBarn.createComponent({kind:enyo.Control,
		                         classes:sClass,
								 allowHtml:true,
		                          style: "width:"+sWidth+
						                 ";height:"+sHeight+";",
			                      name:sName,
								  content:sCaption,
								 },{owner: this});		
	},
	addRowHeader:function(){
			this.inherited(arguments);
			this.last=objBarn=this.$.cells.createComponent({kind: "FittableColumns"});																								
			this.addCustomCell("alatwo","<strong>ZONA SUR</strong>",
			           "200px","30px","customBYcellZone");
			this.splitRow();
			this.addCustomCell("alaone","<strong>CHIHUAHUA</strong>",
					           "765px","30px","customBYcellZone");	
			this.addQuitButton();										   
			this.addRow();
	},
	addRow:function(bDiv){
		if (bDiv){
			this.$.cells.createComponent({classes:"divider"});
		}else{
			this.$.cells.createComponent({kind: "FittableColumns", style:"height:5px"});									
		}
		this.last=objBarn=this.$.cells.createComponent({kind: "FittableColumns"});						
	},
	splitRow:function(sHeight){
  		objBarn=this.last;		
		objBarn.createComponent({kind:enyo.Control,
		                         style: "width:15px; height:"+sHeight+
										";align:left"+
										""});
	},
	createCells:function(sLetter,iStart,iNumber,sWidth,sHeight){
		objBarn=this.last;				
		var sColor;
		for (var i=0; i<iNumber; i++) {
			var iOccupied;
			if(cacheBY.isOccupied(sLetter+iStart)){
				iOccupied=1;
				sColor=this.sColorOccupied;
			}else{
				iOccupied=0;				
				sColor=this.sColorFree;				
			}
			var c=objBarn.createComponent({kind:enyo.Control,
										   classes:"byCell",
										   style:"width:"+sWidth+
											   ";height:"+sHeight+
											   ";align:left"+															
											   ";background-color:"+sColor+
											   ";", 										
			                               name:sLetter+iStart,
			                               bBY:true,
										   occupied:iOccupied,
										   content:sLetter.substr(1)+iStart,
										   onclick: "cellClick",									   
										  },{owner: this});
			iStart=iStart+2;
		}			
	},
	cellOver:function(inSender, inEvent){
		if(inSender.occupied!=0 && inSender.occupied!=2){
			this.highLightReception(cacheBY.inUse()[inSender.name].reception_id);
		}
	},
	highLightReception:function(iRecID){
		this.arrByMOver=cacheBY.getBYbyRecID(iRecID);
		for(sKey in this.arrByMOver){
			this.$[sKey].addClass("selectCell");
		}
	},
	cellOut:function(){
		for(sKey in this.arrByMOver){			
			this.$[sKey].removeClass("selectCell");		
		}
		this.arrByMOver={};		
	},	
	cellClick:function(inSender, inEvent){
		this.cellOut();
		this.cellOver(inSender, inEvent);	
		this.objSelected=inSender;
		switch(inSender.occupied){
			/*case 0:
				this.clearDesc();
				if(enyo.json.stringify(this.arrSelectedOccupied)!="{}"){
					for(var sKey in this.arrSelectedOccupied){
						if(cacheBY.isOccupied(sKey)){
							this.$[sKey].occupied=1;
							this.$[sKey].applyStyle("background-color",this.sColorOccupied);
						}
					}
					this.arrSelectedOccupied={};
				}
				inSender.occupied=2;
				this.arrSelected[inSender.name]=inSender.name;			
				inSender.applyStyle("background-color",this.sColorSelect);							
				break;
				*/
			case 1:
				this.setDesc(inSender.name);
				/*if(enyo.json.stringify(this.arrSelected)!="{}"){
					this.$.options.setItems([{caption:"Anexar",value:7}]);
					this.$.options.render();
					this.$.options.openAtEvent(inEvent);							
				}else{
					*/
					for(var sKey in this.arrSelectedOccupied){
						if(cacheBY.inUse()[sKey].reception_id!=cacheBY.inUse()[inSender.name].reception_id){
							for(var sKey in this.arrSelectedOccupied){
								this.$[sKey].occupied=1;
								this.$[sKey].applyStyle("background-color",this.sColorOccupied);
							}
							this.arrSelectedOccupied={};
						}
						break;
					}
					/*
					//cacheBY.get
					inSender.occupied=3;					
					this.arrSelectedOccupied[inSender.name]=inSender.name;
					inSender.applyStyle("background-color",this.sColorSelectOccupied);
				}
				*/
				break;							
		/*	case 2:
				this.$.options.createComponent(this.arrReception);
				this.$.options.render();
				this.$.options.openAtEvent(inEvent);		
				break;			
			case 3:
				if(enyo.json.stringify(this.arrSelected)=="{}"){
					this.$.options.createComponent(this.arrPostReception);
				}else{
					this.$.options.createComponent(this.arrPostReception.concat({caption:"Anexar",value:7}));					
				}
				this.$.options.render();				
				this.$.options.openAtEvent(inEvent);		
				break;									
				//alert(enyo.json.stringify(this.arrSelected));
		*/
		}
		
	},
	clearDesc:function(){
		//_objMainHeader.setContent("");
		this.$.spacerone.setContent("");
	},
	setDesc:function(sBY){
		var objRec=cacheReceptions.getByID(cacheBY.inUse()[sBY].reception_id);
		var sBy="";
		var iBy=0;
		for(var sKey in objRec.barnyards){
			iBy++;
			sBy+=sKey+", ";
		}
		sBy=sBy.slice(0,-2);
		var iAc=0;				
		if(objRec.accepted_count!=""){
			iAc=objRec.accepted_count;
		}
		this.$.spacerone.setContent("<strong>"+objRec.rancher_name +"</strong> "+
									"- "+objRec.city_name+" - "+objRec.cattype_name+
									"  ("+ objRec.weights[0].weight+"/"+objRec.hc_aprox+" KG) Promedio: "+ (objRec.weights[0].weight/objRec.hc_aprox)+
									"KG	 "+objRec.arrival_date+
									"</br> Corrales ("+iBy+") - "+sBy);		
		
	},
	actionSelected:function(inSender, inSelected){				
		switch(inSelected.value){
			case 1:
				if(this.$.dynocon){
					this.$.dynocon.destroy();
				}
				if(this.$.tbHeaderRec){
					this.$.tbHeaderRec.destroy();
				}					
				this.$.popMan.createComponent({kind: "receptions.create",
										       onAddReception:"updateBY",onCancel:"closePopUp", 
										       name:'dynocon',flex: 1},{owner:this});			
				this.$.dynocon.setReception(null,this.arrSelected)
				this.$.dynocon.toggleAdd();
				this.$.popMan.render();
				this.$.popMan.openAtCenter();												
				break;
			case 2:
				delete this.arrSelected[this.objSelected.name];	
				this.objSelected.occupied=0;
				this.objSelected.applyStyle("background-color",this.sColorFree);						
				break;
			case 3:
				if(this.$.dynocon){
					this.$.dynocon.destroy();
				}
				if(this.$.tbHeaderRec){
					this.$.tbHeaderRec.destroy();
				}				
			    this.$.popMan.createComponent({kind: "Toolbar",name:"tbHeaderRec",style:"height:10px", 
											 components: [
												{kind: "Spacer"},
												{name:'btnLogOut', onclick:"closePopUp",
												 icon:"images/command-menu/icon-context.png"}]},{owner:this});						
				this.$.popMan.createComponent({kind: "receptions.feed",
										       onAddFeed:"closePopUp",onCancel:"closePopUp", 
										       name:'dynocon',flex: 1},{owner:this});			
				var objRec=cacheReceptions.getByID(cacheBY.inUse()[this.objSelected.name].reception_id);											
				this.$.dynocon.set(objRec,this.arrSelectedOccupied);
				this.$.dynocon.toggleAdd();
				this.$.popMan.render();
				this.$.popMan.openAtCenter();												
				break;				
			case 4:
				if(this.$.dynocon){
					this.$.dynocon.destroy();
				}		
				if(this.$.tbHeaderRec){
					this.$.tbHeaderRec.destroy();
				}
			    this.$.popMan.createComponent({kind: "Toolbar",name:"tbHeaderRec",style:"height:10px", 
											 components: [
												{kind: "Spacer"},
												{name:'btnLogOut', onclick:"closePopUp",
												 icon:"images/command-menu/icon-context.png"}]},{owner:this});																		
				this.$.popMan.createComponent({kind: "receptions.inspections",
										onAddReception:"closePopUp", onCancel:"closePopUp",
										name:'dynocon',flex: 1},{owner:this});
				var objRec=cacheReceptions.getByID(cacheBY.inUse()[this.objSelected.name].reception_id);										
				this.$.dynocon.set(objRec)		
				this.$.dynocon.toggleAdd();
				this.$.popMan.render();
				this.$.popMan.openAtCenter();												
				break;	
			case 5:
				if(this.$.dynocon){
					this.$.dynocon.destroy();
				}
				if(this.$.tbHeaderRec){
					this.$.tbHeaderRec.destroy();
				}										
				this.$.popMan.createComponent({kind: "receptions.create",
										       onUpdateReception:"closePopUp", onCancel:"closePopUp",
											   name:'dynocon',flex: 1},{owner:this});			
				var objRec=cacheReceptions.getByID(cacheBY.inUse()[this.objSelected.name].reception_id);
				this.$.dynocon.setReception(objRec,objRec.barnyards);
				this.$.dynocon.toggleUpdate();
				this.$.popMan.render();
				this.$.popMan.openAtCenter();		
				break;
			case 6:
				var objRec=cacheReceptions.getByID(cacheBY.inUse()[this.objSelected.name].reception_id);			
				cacheBY.releaseBY(objRec,this.objSelected.name,this,"releaseBY");
				break;
			case 7:
				var objRec=cacheReceptions.getByID(cacheBY.inUse()[this.objSelected.name].reception_id);
				cacheReceptions.appendBY(objRec,this.arrSelected,this,"updateBY")
				break;	
			case 8:
				delete this.arrSelectedOccupied[this.objSelected.name];	
				this.objSelected.occupied=1;
				this.objSelected.applyStyle("background-color",this.sColorOccupied);									
				break;									
		}
	},
	closePopUp:function(){	
		for (var sKey in this.arrSelectedOccupied){
			this.setDesc(sKey);
			break;
		}	
		this.deselect();
		this.$.popMan.close();
	},
	updateBY:function(){		
		this.$.popMan.close();	
		this.cellOut();
		for (var sKey in this.arrSelected){
			this.setDesc(sKey);
			this.highLightReception(cacheBY.inUse()[sKey].reception_id);			
			break;
		}
		for (var sKey in this.arrSelected){
			this.$[sKey].occupied=1;
			this.$[sKey].applyStyle("background-color",this.sColorOccupied);			
		}
		this.arrSelected={};		
	},
	releaseBY:function(){
		this.objSelected.occupied=0;
		this.objSelected.applyStyle("background-color",this.sColorFree);								
		this.$[sKey].removeClass("selectCell");		
	},
	deselect:function(){
		for (var sKey in this.arrSelected){
			delete this.arrSelected[sKey];	
			this.$[sKey].occupied=0;
			this.$[sKey].applyStyle("background-color",this.sColorFree);									
		}
		for (var sKey in this.arrSelectedOccupied){		
			delete this.arrSelectedOccupied[sKey];	
			this.$[sKey].occupied=1;
			this.$[sKey].applyStyle("background-color",this.sColorOccupied);							
		}
	},
	refreshMap:function(){		
		cacheRanchers.refreshData();			
		cacheCattle.refreshData();
		cacheBY.refreshData();
		cacheReceptions.refreshData();
		for (var i = 0, a; (a=this.$.cells.children[i]); i++) {			
			for (var j = 0, b; (b =a.children[j]); j++) {				
				if(b.bBY==true){
					this.$[b.name].removeClass("selectCell");
					if(cacheBY.isOccupied(b.name)){
						//alert(b.name)
						this.$[b.name].occupied=1;						
						this.$[b.name].applyStyle("background-color",this.sColorOccupied);						
					}else{
						this.$[b.name].occupied=0;								
						this.$[b.name].applyStyle("background-color",this.sColorFree);																	
					}
				}
			}
		}
		this.arrByMOver={};
		this.objSelected=null;
		this.arrSelected={};
		this.arrSelectedOccupied={};		
	}	
});		