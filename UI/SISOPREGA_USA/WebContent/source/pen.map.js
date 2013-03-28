enyo
		.kind({
			name : "pen.map",
			kind : enyo.HFlexBox,
			last : null,
			flex : 1,
			arrByMOver : {},
			objSelected : null,
			arrSelected : {},
			arrSelectedOccupied : {},
			arrBYbyRancherSelected : {},
			sColorOccupied : "#ff7200",
			sColorFree : "white",
			sColorSelect : "lightgreen",
			sColorSelectOccupied : "#9b7eb1",
			className : "mapBG",
			create : function() {
				this.inherited(arguments);
			},

			components : [

			{
				kind : enyo.BasicScroller,
				flex : 1,
				components : [ {
					name : "cells",
					kind : "VFlexBox",
					align : "center",
					pack : "center"

				} ],
			},

			],
			ready : function() {
				this.last = this.$.cells;
				// this.addRow(true);
				this.addRow();
				this.addRowHeader();
				this.createCells("2E", -7, 4, "50px", "50px");
				this.splitRow();
				this.createCells("1E", 5, 8, "50px", "50px");
				this.splitRow();
				this.createCells("1E", 17, 6, "50px", "50px");
				this.createCells("1E", 28, 1, "100px", "50px");

				this.addRow(true);
				this.createCells("2D", -11, 2, "100px", "50px");
				this.splitRow();
				this.createCells("1D", 1, 4, "100px", "50px");
				this.splitRow();
				this.createCells("1D", 17, 4, "100px", "50px");

				this.addRow();
				this.createCells("2D", -12, 6, "33.33px", "25px");
				this.splitRow();
				this.createCells("1D", 2, 12, "33.33px", "25px");
				this.splitRow();
				this.createCells("1D", 26, 4, "100px", "25px");

				this.addRow(true);
				this.createCells("2C", -11, 6, "33.33px", "25px");
				this.splitRow();
				this.createCells("1C", 1, 12, "33.33px", "25px");
				this.splitRow();
				this.createCells("1C", 25, 3, "100px", "25px");
				this.createCells("1C", 30, 2, "50px", "25px");

				this.addRow();
				this.createCells("2B", -11, 4, "50px", "50px");
				this.splitRow();
				this.createCells("1B", 1, 8, "50px", "50px");
				this.splitRow();
				this.createCells("1B", 25, 3, "100px", "50px");
				this.createCells("1B", 30, 2, "50px", "50px");

				this.addRow(true);
				this.createCells("2B", -8, 4, "50px", "50px");
				this.splitRow();
				this.createCells("1B", 2, 8, "50px", "50px");
				this.splitRow();
				this.createCells("1B", 18, 8, "50px", "50px");

				this.addRow();
				this.createCells("2A", -7, 4, "50px", "50px");
				this.splitRow();
				this.createCells("1A", 1, 8, "50px", "50px");
				this.splitRow();
				this.createCells("1A", 17, 4, "100px", "50px");

			},
			addRow : function(bDiv) {
				if (bDiv) {
					this.$.cells.createComponent({
						kind : "Divider",
						caption : "",
						style : "margin-left:-15px;width: 1040px;"
					});
				} else {
					this.$.cells.createComponent({
						kind : "HFlexBox",
						style : "height:5px;"
					});
				}
				this.last = objBarn = this.$.cells.createComponent({
					kind : "HFlexBox"
				});
			},
			addRowHeader : function() {
				this.last = objBarn = this.$.cells.createComponent({
					kind : "HFlexBox"
				});
				this.addCustomCell("alatwo", "<strong>WEST</strong>", "200px",
						"30px", "customBYcellZone");
				this.splitRow();
				this.addCustomCell("alaone", "<strong>EAST</strong>", "765px",
						"30px", "customBYcellZone");
				this.addRefreshButton();
				this.addRow();
			},
			addCustomCell : function(sName, sCaption, sWidth, sHeight, sClass) {
				if (!sClass) {
					sClass = "customBYcell";
				}
				objBarn.createComponent({
					kind : enyo.Control,
					className : sClass,
					allowHtml : true,
					style : "width:" + sWidth + ";height:" + sHeight + ";"
							+ "text-align: center;" + "vertical-align: middle;"
							+ "background-color:#DABD8B;"
							+ "display: table-cell;",
					name : sName,
					content : sCaption,
				}, {
					owner : this
				});
			},
			splitRow : function(sHeight) {
				objBarn = this.last;
				objBarn.createComponent({
					kind : enyo.Control,
					style : "width:15px; height:" + sHeight + ";align:center"
				});
			},
			addRefreshButton : function(sName, sCaption, sWidth, sHeight,
					sClass) {
				if (!sClass) {
					sClass = "customBYcell";
				}
				objBarn
						.createComponent(
								{
									kind : "IconButton",
									onclick : "refreshMap",
									icon : "../SISOPREGA/images/command-menu/menu-icon-music-repeat.png",
									style : "height:23px; width:45px; padding:0;margin:0px",
								}, {
									owner : this
								});
			},
			refreshMap : function() {
				for ( var i = 0, a; (a = this.$.cells.children[i]); i++) {
					for ( var j = 0, b; (b = a.children[j]); j++) {
						if (b.bBY == true) {
							this.$[b.name].removeClass("selectCell");
							if (cachePen.isOccupied(b.name)) {
								this.$[b.name].occupied = 1;
								this.$[b.name].applyStyle("background-color",
										this.sColorOccupied);
								
							} else {
								this.$[b.name].occupied = 0;
								this.$[b.name].applyStyle("background-color",
										this.sColorFree);
							}
						}
					}
				}
			},
			createCells : function(sLetter, iStart, iNumber, sWidth, sHeight) {
				// this.createCells("1E",5,6,"50px","50px");
				objBarn = this.last;
				var sColor;
				for ( var i = 0; i < iNumber; i++) {
					var iOccupied;
					if (cachePen.isOccupied(sLetter + Math.abs(iStart))) {
						iOccupied = 1;
						sColor = this.sColorOccupied;
					} else {
						iOccupied = 0;
						sColor = this.sColorFree;
					}
					objBarn.createComponent({
						kind : enyo.Control,
						className : "byCell",
						style : "width:" + sWidth + ";height:" + sHeight
								+ ";align:left" + ";background-color:" + sColor
								+ ";",
						name : sLetter + Math.abs(iStart),
						occupied : iOccupied,
						bBY : true,
						content : sLetter.substr(1) + Math.abs(iStart),
						onclick : "cellClick",
						onmousehold : "cellHold",
					}, {
						owner : this
					});
					iStart = iStart + 2;
				}
			},
			cellOver:function(inSender, inEvent){
				if(inSender.occupied!=0 && inSender.occupied!=2){
					this.highLightReception(cacheBy.inUse()[inSender.name].reception_id);
				}
			},
			highLightReception:function(iRecID){
				this.arrByMOver=cachePen.getBYbyRecID(iRecID);
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
//				this.cellOut();
//				this.cellOver(inSender, inEvent);
				this.objSelected=inSender;
				switch(inSender.occupied){
					case 0: //Seleccionar corral disponible, 0= corral sin recepcion y sin seleccion
						this.clearDesc();
//						this.unselectBY();
//						if(enyo.json.stringify(this.arrSelectedOccupied)!="{}"){
//							for(var sKey in this.arrSelectedOccupied){
//								if(cachePen.isOccupied(sKey)){
//									this.$[sKey].occupied=1;
////									this.$[sKey].applyStyle("background-color",cacheReceptions.getByID(cacheBY.getRecIDbyBY(sKey)).color);
//								}
//							}
//							this.arrSelectedOccupied={};
//						}
						inSender.occupied=2;
//						this.arrSelected[inSender.name]=inSender.name;			
//						inSender.applyStyle("background-color",this.sColorSelect);							
						break;
					case 1: //Seleccionar corral ocupado, 1= corral con recepcion y sin seleccion. 
						this.setDesc(inSender.name);
						//this.unselectBY();
//						if(enyo.json.stringify(this.arrSelected)!="{}"){
//							this.$.options.setItems([{caption:"Anexar",value:7}]);
//							this.$.options.render();
//							this.$.options.openAtEvent(inEvent);							
//						}else{
//							for(var sKey in this.arrSelectedOccupied){
//								if(cachePen.inUse()[sKey].reception_id!=cachePen.inUse()[inSender.name].reception_id){
//									for(var sKey in this.arrSelectedOccupied){
//										this.$[sKey].occupied=1;
//										this.$[sKey].applyStyle("background-color",this.sColorOccupied);
//									}							
//									this.arrSelectedOccupied={};
//								}
//								break;
//							}					
//							//cacheBY.get
//							inSender.occupied=3;					
//							this.arrSelectedOccupied[inSender.name]=inSender.name;					
//							this.colorBYbyRancherSelected(cacheReceptions.getByID(cacheBY.getRecIDbyBY(inSender.name)).rancher_id);
//												
//						}
						break;							
					case 2: //Deseleccionar corral libre, 2= corral sin recepcion pero seleccionado.
						
						delete this.arrSelected[this.objSelected.name];	
						this.objSelected.occupied=0;
						this.objSelected.applyStyle("background-color",this.sColorFree);						
						break;
								
					case 3://Deseleccionar corral ocupado, 3= corral con recepcion y seleccionado.
						delete this.arrSelectedOccupied[this.objSelected.name];	
						this.objSelected.occupied=1;
						this.objSelected.applyStyle("background-color",cacheReceptions.getByID(cachePen.getRecIDbyBY(this.objSelected.name)).color);									
						break;								
						
				}
			},
			clearDesc:function(){
				_objMainHeader.setContent("");
			},
			setDesc:function(sBY){
				_objMainHeader.setStyle("color:#FFF;border:none;font-size:12px; text-align:center;min-width:150px;");
				try {
			//	var objRec=cacheReceptions.getByID(cacheBY.inUse()[sBY].reception_id);
					
//				var sBy="";
//				var iBy=0;
				/*for(var sKey in objRec.barnyards){
					iBy++;
					sBy+=sKey+", ";
				}
				sBy=sBy.slice(0,-2);*/
				_objMainHeader.setContent("Jaime Figueroa - Coahuila <br> Novillos (23/4567654 kg) 2013/03/27");
//				_objMainHeader.setContent(objRec.rancher_name+" - "+objRec.location_name+"<BR>"+objRec.cattype_name+
//										  "  ("+ objRec.hc_aprox+"/"+objRec.weights[0].weight+"kg)"+
//									  	  "	 "+objRec.arrival_date);	
				}
				catch(e){
					_objMainHeader.setContent("");
				}
			},
		});
