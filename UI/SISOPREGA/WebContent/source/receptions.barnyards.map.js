enyo.kind({
	name: "receptions.barnyards.map",	
	arrReception:[{caption:"Recepcion",value:1},{caption:"Deseleccionar",value:2}],
	arrPostReception:[{caption:"Alimento",value:3},
				      {caption:"Inspeccion",value:4},
					  {caption:"Editar",value:5},
					  {caption:"Liberar",value:6},
					  {caption:"Deseleccionar",value:8},
					  ],
    kind: enyo.VFlexBox,
    flex:1,
	arrByMOver:{},
	objSelected:null,
	arrSelected:{},
	arrSelectedOccupied:{},
	sColorOccupied:"#ff7200",
	sColorFree:"white",	
	sColorSelect:"lightgreen",
	sColorSelectOccupied:"#9b7eb1",	
	className:"mapBG",
	components: [
//		{kind:"VFlexBox", flex:1,className:"mapBG",
//		 components:[
			{name: "options", kind: enyo.PopupSelect, onSelect: "actionSelected",items:[]},
			{kind:enyo.BasicScroller,flex: 1, 
			components:[
				{name: "cells", kind: "VFlexBox",align:"center",pack:"center", onclick: "cellsClick"},
			]},
			{kind: "Popup",name: "popMan", showHideMode: "transition", openClassName: "zoomFadeIn",
			 className: "transitioner2", layoutKind: "VFlexLayout",
			 style: "overflow: hidden", width: "95%", height: "95%",scrim: true,}//]}
	],
	ready: function() {
		this.last=this.$.cells;
		//this.addRow(true);
		this.addRow();
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
	addCustomCell:function(sName,sCaption,sWidth,sHeight,sClass){
		if(!sClass){
			sClass="customBYcell";
		}
		objBarn.createComponent({kind:enyo.Control,
		                         className:sClass,
								 allowHtml:true,
		                          style:"width:"+sWidth+
						                ";height:"+sHeight+";" +
				                 		"text-align: center;" +
				                 		"vertical-align: middle;" +
				                 		"background-color:#DABD8B;" +
				                 		"padding-top: 5px;",
			                      name:sName,
								  content:sCaption,
								 },{owner: this});		
	},
	addRowHeader:function(){
			this.last=objBarn=this.$.cells.createComponent({kind: "HFlexBox"});																								
			this.addCustomCell("alatwo","<strong>ZONA SUR</strong>",
					           "200px","30px","customBYcellZone");
			this.splitRow();
			this.addCustomCell("alaone","<strong>CHIHUAHUA</strong>",
					           "815px","30px","customBYcellZone");			
			this.addRow();
	},
	addRow:function(bDiv){
		if (bDiv){	
			this.$.cells.createComponent({kind: "Divider",caption:"", style:"margin-left:-15px;width: 1040px;"});
		}else{
			this.$.cells.createComponent({kind: "HFlexBox",style:"height:5px;"});									
		}
		this.last=objBarn=this.$.cells.createComponent({kind: "HFlexBox"});						
	},
	splitRow:function(sHeight){
  		objBarn=this.last;		
		objBarn.createComponent({kind:enyo.Control,
		                         style: "width:15px; height:"+sHeight+
										";align:center"});
	},	
	createCells:function(sLetter,iStart,iNumber,sWidth,sHeight){
		//this.createCells("1E",5,6,"50px","50px");
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
			objBarn.createComponent({kind:enyo.Control,
										   className:"byCell",
										   style:"width:"+sWidth+
											   ";height:"+sHeight+
											   ";align:left"+															
											   ";background-color:"+sColor+
											   ";", 										
			                               name:sLetter+iStart,
										   occupied:iOccupied,
										   content:sLetter.substr(1)+iStart,
										   onclick: "cellClick",
										   onmousehold:"cellHold",
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
			case 0: //Seleccionar corral disponible
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
			case 1:
				this.setDesc(inSender.name);
				if(enyo.json.stringify(this.arrSelected)!="{}"){
					this.$.options.setItems([{caption:"Anexar",value:7}]);
					this.$.options.render();
					this.$.options.openAtEvent(inEvent);							
				}else{
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
					//cacheBY.get
					inSender.occupied=3;					
					this.arrSelectedOccupied[inSender.name]=inSender.name;
					inSender.applyStyle("background-color",this.sColorSelectOccupied);
				}
				break;							
			case 2: //Deseleccionar corral libre
				delete this.arrSelected[this.objSelected.name];	
				this.objSelected.occupied=0;
				this.objSelected.applyStyle("background-color",this.sColorFree);						
				break;
						
			case 3:
				delete this.arrSelectedOccupied[this.objSelected.name];	
				this.objSelected.occupied=1;
				this.objSelected.applyStyle("background-color",this.sColorOccupied);									
				break;								
				
		}
	},
	cellHold:function(inSender, inEvent){
		inEvent.stopPropagation();
		
		this.objSelected=inSender;
		switch(inSender.occupied){
			case 0:
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
				this.cellHold(inSender, inEvent);
				break;
			case 1: 
				this.setDesc(inSender.name);
				if(enyo.json.stringify(this.arrSelected)!="{}"){
					this.$.options.setItems([{caption:"Anexar",value:7}]);
					this.$.options.render();
					this.$.options.openAtEvent(inEvent);							
				}else{
					this.cellOut();
					this.cellOver(inSender, inEvent);
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
					//cacheBY.get
					inSender.occupied=3;					
					this.arrSelectedOccupied[inSender.name]=inSender.name;
					inSender.applyStyle("background-color",this.sColorSelectOccupied);
					this.cellHold(inSender, inEvent);
				}				
				break;							
			case 2: //Abrir opciones para corral libre
				this.$.options.setItems(this.arrReception);
				this.$.options.render();
				this.$.options.openAtEvent(inEvent);		
				break;			
			case 3: //Abrir opciones para corral ocupado
				if(enyo.json.stringify(this.arrSelected)=="{}"){
					this.$.options.setItems(this.arrPostReception);
				}else{
					this.$.options.setItems(this.arrPostReception.concat({caption:"Anexar",value:7}));					
				}
				this.$.options.render();				
				this.$.options.openAtEvent(inEvent);		
				break;									
				//alert(enyo.json.stringify(this.arrSelected));
		}
	},
	clearDesc:function(){
		_objMainHeader.setContent("");
		this.$.spacerone.setContent("");
	},
	setDesc:function(sBY){
		_objMainHeader.setStyle("color:#FFF;border:none;font-size:12px; text-align:center;min-width:150px;");
		try {
		var objRec=cacheReceptions.getByID(cacheBY.inUse()[sBY].reception_id);
		var sBy="";
		var iBy=0;
		for(var sKey in objRec.barnyards){
			iBy++;
			sBy+=sKey+", ";
		}
		sBy=sBy.slice(0,-2);
//		var iAc=0;				
//		if(objRec.accepted_count!=""){
//			iAc=objRec.accepted_count;
//		}
		_objMainHeader.setContent(objRec.rancher_name+" - "+objRec.city_name+"<BR>"+objRec.cattype_name+
								  "  ("+ objRec.hc_aprox+"/"+objRec.weights[0].weight+")"+
							  	  "	 "+objRec.arrival_date		
		);	
		/*this.$.spacerone.setContent("<strong>"+objRec.rancher_name +"</strong> "+
									"- "+objRec.city_name+" - "+objRec.cattype_name+
									"  ("+ objRec.hc_aprox+"/"+objRec.weights[0].weight+")"+
									"	 "+objRec.arrival_date+
									"</br> Corrales ("+iBy+") - "+sBy);		
		*/}
		catch(e){
			_objMainHeader.setContent("");
		}
	},
	actionSelected:function(inSender, inSelected){		
		switch(inSelected.value){
			case 1: //Recepcion
				if(this.$.dynocon){
					this.$.dynocon.destroy();
				}
				if(this.$.tbHeaderRec){
					this.$.tbHeaderRec.destroy();
				}					
				this.$.popMan.createComponent({kind: "receptions.create",
										       onAddReception:"updateBY",onCancel:"closePopUp", 
										       name:'dynocon',flex: 1},{owner:this});			
				this.$.dynocon.setReception(null,this.arrSelected);
				this.$.dynocon.toggleAdd();
				this.$.popMan.render();
				this.$.popMan.openAtCenter();												
				break;
			case 2: //Deseleccionar
				delete this.arrSelected[this.objSelected.name];	
				this.objSelected.occupied=0;
				this.objSelected.applyStyle("background-color",this.sColorFree);						
				break;
			case 3: //Alimento
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
			case 4: //Inspeccion
				if(this.$.dynocon){
					this.$.dynocon.destroy();
				}		
				if(this.$.tbHeaderRec){
					this.$.tbHeaderRec.destroy();
				}
			    this.$.popMan.createComponent({kind: "Toolbar",name:"tbHeaderRec",style:"height:10px", 
											 components: [
												{kind: "Spacer"},												
												{kind: "VFlexBox", name:'lblInfo', allowHtml:true,
												 style:"color:#FFF;border:none;font-size:15px", content: "Texto"},  
												{kind: "Spacer"},
												{name:'btnLogOut', onclick:"closePopUp",
												 icon:"images/command-menu/icon-context.png"}]},{owner:this});																		
				this.$.popMan.createComponent({kind: "receptions.inspections",
										onAddReception:"closePopUp", onCancel:"closePopUp",
										name:'dynocon',flex: 1},{owner:this});
				var objRec=cacheReceptions.getByID(cacheBY.inUse()[this.objSelected.name].reception_id);										
				this.$.dynocon.set(objRec);		
				this.$.dynocon.toggleAdd();
				this.$.popMan.render();
				this.$.popMan.openAtCenter();												
				break;	
			case 5: //Editar
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
			case 6: //Liberar
				var objRec=cacheReceptions.getByID(cacheBY.inUse()[this.objSelected.name].reception_id);			
				cacheBY.releaseBY(objRec,this.objSelected.name,this,"releaseBY");
				break;
			case 7:
				var objRec=cacheReceptions.getByID(cacheBY.inUse()[this.objSelected.name].reception_id);
				cacheReceptions.appendBY(objRec,this.arrSelected,this,"updateBY");
				break;	
			case 8: //Deseleccionar
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
		delete this.arrSelectedOccupied[this.objSelected.name];
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
	}
});		