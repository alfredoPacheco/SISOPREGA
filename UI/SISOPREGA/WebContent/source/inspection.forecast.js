enyo.kind({
	name : "inspection.forecast",
	kind : enyo.SlidingView,
	layoutKind : enyo.VFlexLayout,
	events : {
		"onAddInspectionForecast" : "",
		"onUpdateInspectionForecast" : "",
		"onRemoveInspectionForecast" : "",
		"onRancherInputKeyPress" : "",
		"onAddRancher" : "",
		"onCancel" : ""
	},
	objRan : null,
	objLoc : null,
	objCattleType : null,
	objList : [],
	arrBY : [],
	arrTempPopupSelection : [],
	itemSelectedPopup : -1,
	components : [ {
		name : "options",		
		kind : enyo.PopupList,
		style:"width:300px;",
		onkeypress:"teclaPresionada",
		modal:false,		
		onSelect : "clickOption",
		onBeforeOpen: "setupItem",
		items : []		
	}, {
		kind : "Popup",
		name : "addRancherDialog",
		showHideMode : "transition",
		openClassName : "zoomFadeIn",
		className : "transitioner2",
		layoutKind : "VFlexLayout",
		style : "overflow:hidden",
		width : "85%",
		heigth : "85%",
		scrim : true,
		components : []
	}, {
		kind : "SlidingPane",
		flex : 1,
		components : [ {
			name : "left",
			width : "300px",
			components : [ {
				kind : "RowGroup",
				defaultKind : "HFlexBox",
				caption : "",
				style : "color:#FFF",
				components : [ {
					kind : "Item",
					components : [ {
						layoutKind : enyo.HFlexLayout,
						components : [ {
							kind : "Input",
							name : "rancherInput",
							hint: "Ganadero",
							onkeydown:"teclaPresionada",
							onblur:"lostFocus",
							flex:1							
						}, {
							kind : "IconButton",
							icon : "images/menu-icon-new.png",
							onclick : "contextMenuClicked"
						}]
					} ],
					
				},				
				{
					kind : "Item",
					components : [ {
						layoutKind : enyo.HFlexLayout,
						components : [ {
							kind : "Input",
							name : "autorizacion",
							hint : "Autorizacion",
							flex:1
						} ]
					} ]
				}, {
					kind : "Item",
					components : [ {
						layoutKind : enyo.HFlexLayout,
						components : [ {
							kind : "Input",
							name : "origen",
							hint : "Origen",
							flex:1
						}]
					} ]
				}, {
					kind : "Item",
					components : [ {
						layoutKind : enyo.HFlexLayout,
						components : [ {
							kind : "Input",
							name : "cattle_type_id",
							hint : "Clase",
							onkeydown:"teclaPresionada",
							onblur:"lostFocus",
							flex : 1
						} ]
					}]
				}, {
					kind : "Item",
					components : [ {
						layoutKind : enyo.HFlexLayout,
						components : [ {
							kind : "Input",
							name : "cantidad",
							hint : "Cantidad",
							inputType : "number",
							flex:1
						} ]
					} ]
				},
				{
					kind : "Item",
					components : [ {
						layoutKind : enyo.HFlexLayout,
						components : [ {
							kind : "Input",
							name : "localidad",
							hint : "Localidad",	
							onkeydown:"teclaPresionada",
							onblur:"lostFocus",
							flex:1
						},
//						{
//							kind : "IconButton",
//							icon : "images/menu-icon-new.png",
//							onclick : "contextBarnyardsClicked"
//						}
						]
					} ]
				},
				{
					kind : "Item",
					components : [ {
						layoutKind : enyo.HFlexLayout,
						components : [ {
							kind : "Input",
							name : "corrales",
							hint : "Corrales",							
							flex:1
						},
//						{
//							kind : "IconButton",
//							icon : "images/menu-icon-new.png",
//							onclick : "contextBarnyardsClicked"
//						}
						]
					} ]
				},
//				{
//					kind : "Item",
//					components : [ {
//						layoutKind : enyo.HFlexLayout,
//						style:"height:40px",
//						components : [
//						              {kind:"Scroller", horizontal:true,vertical:false, flex:1,
//						            	  components: [
//						            	               {		name: "bys",						            	  	
//											            	  	layoutKind: enyo.HFlexLayout, 
//											            	  	align:"left",
//											            	  	style: "width:100px",						            	  	
//											            	  	components: []
//						            	               	}]
//						              } 
//						 ]
//					}]
//				}, 
				{
					kind : "Item",
					components : [ {
						layoutKind : enyo.HFlexLayout,
						components : [ {
							kind : "Button",
							name : "btnAdd",
							className : "enyo-button-affirmative",
							flex : 1,
							caption : "Guardar",
							onclick : "saveInspectionForecast"
						}, {
							kind : "Button",
							name : "btnCancelCreate",
							className : "enyo-button-negative",
							flex : 1,
							caption : "Cancelar",
							onclick : "doCancel"
						} ]
					} ]
				} ]
			} ]
		}, {
			name : "middle",
			peekwidth : 58,
			components : [ {
				kind : enyo.Scroller,
				flex : 1,
				className : "listBG",
				components : [ {
					kind : enyo.VirtualRepeater,
					name : "forecastList",
					onSetupRow : "setupForecastRow",
					onclick : "selectForecast",
					components : [ {
						kind : "Divider"
					}, {
						kind : enyo.SwipeableItem,
						onConfirm : "dropForecast",
						tapHighlight : true,
						components : [ {
							name : "listRancher",
							className : "listFirst",
							content : ""
						}, {
							name : "listAuth",
							className : "listFirst",
							content : ""
						}, {
							name : "listOrigin",
							className : "listFirst",
							content : ""
						}, {
							name : "listCattleType",
							className : "listFirst",
							content : ""
						}, {
							name : "listQuantity",
							className : "listFirst",
							content : ""
						}, {
							name : "listLocation",
							className : "listFirst",
							content : ""
						}, {
							name : "listBarnyards",
							className : "listSecond",
							content : ""
						} ]
					} ]
				} ]
			} ]
		} ]
	} ],
	ready : function() {
		this.resetValues();
		this.updateList();
	},
	resetValues : function() {
		// TODO: Reset form values
	},
	selectForecast : function(inSender, inEvent) {
		if (this.objList[inEvent.rowIndex]) {
			this.iSelected = inEvent.rowIndex;
			this.doSelectForecast();
		}
	},
	setupForestRow : function(inSender, inIndex) {
		var objFore;
		if (objFore = this.objList[inIndex]) {
			this.$.listRancher.setContent(objFore.rancher);
			this.$.listAuth.setContent(objFore.auth);
			this.$.listOrigin.setContent(objFore.origin);
			this.$.listCattleType.setContent(objFore.cattle_type);
			this.$.listQuantity.setContent(objFore.quantity);
			this.$.listLocation.setContent(objFore.location);
			this.$.listBarnyards.setContent(objFore.barnyards);
			return true;
		}
	},
	dropForecast : function(inSender, inIndex) {
		if (cacheInspFore.del(this.objList[inIndex], this, "updateList")) {
			return true;
		} else {
			return false;
		}
	},
	updateList : function() {
		this.objList = [];
		this.objList = cacheInspFore.get();
		this.$.forecastList.render();
	},
	getSelected : function() {
		return this.objList[this.iSelected];
	},
	contextMenuClicked : function(inSender, inEvent) {
		this.$.options.openAtEvent(inEvent);
		
		return false;
	},
	setupItem : function (inSender, inEvent){
		console.log("setupITem popup list");
		this.arrTempPopupSelection  = inSender.controls;
		return true;
	},
	controlSelectionItem : function(direction){
		if (direction=="down"){
			if(d){
				
			}
		}
	},
	lostFocus:function(inSender, inEvent){
		
		//this.clickOption(inSender);
		this.$.options.close();
	},
//	addNewRancher : function(inSender, inSelected) {
//		if (this.$.dynoco) {
//			this.$.dynoco.destroy();
//		}
//		switch (inSelected.value) {
//		case 1:
//			this.$.addRancherDialog.createComponent({
//				kind : "catalogs.ranchers.enterprise.create",
//				onAddRancher : "adoken",
//				name : 'dynoco',
//				flex : 1
//			}, {
//				owner : this
//			});
//			break;
//		case 2:
//			this.$.addRancherDialog.createComponent({
//				kind : "catalogs.ranchers.person.create",
//				onAddRancher : "adoken",
//				name : 'dynoco',
//				flex : 1
//			}, {
//				owner : this
//			});
//			break;
//		}
//		this.$.addRancherDialog.render();
//		this.$.addRancherDialog.openAtCenter();
//	},
	clickOption : function(inSender, inSelected) {
		switch(inSender.name){
			case "rancherInput":	
				if (inSelected){
					this.$.rancherInput.setValue(inSender.items[inSelected].caption);
					this.objRan = inSender.items[inSelected];
				}else if (this.$.options.items[0]){
					this.$.rancherInput.setValue(this.$.options.items[0].caption);
					this.objRan = this.$.options.items[0];
				}
					
				break;
			case "localidad":	
				if (inSelected){
					this.$.localidad.setValue(inSender.items[inSelected].caption);
					this.objLoc = inSender.items[inSelected];
				}else if (this.$.options.items[0]){
					this.$.localidad.setValue(this.$.options.items[0].caption);
					this.objLoc = this.$.options.items[0];
				}
					
				break;
			case "cattle_type_id":	
				if (inSelected){
					this.$.cattle_type_id.setValue(inSender.items[inSelected].caption);
					this.objCattleType = inSender.items[inSelected];
				}else if (this.$.options.items[0]){
					this.$.cattle_type_id.setValue(this.$.options.items[0].caption);
					this.objCattleType = this.$.options.items[0];
				}
					
				break;
			case "barnyards":
				
				break;
			default:			
			
		}
		
		
	},
	selectBarnyard : function(inSender, inSelected) {
//		this.arrBY.push(inSender.items[inSelected]);
		var newOne = this.$.bys.createComponent({	
			events:{onkeydown:"doteclaPresionada"},
			name : inSender.items[inSelected].value,
			style:"width:70px; border-width:1px;border-color:#333;" 
			 		+ "font-size:12px;color:#333;padding:2px;box-sizing: border-box;border-style:solid;" 
					+ "border-radius:5px;text-align:center;margin-right:2px;",
			content:inSender.items[inSelected].barnyard_code + "</BR>" + inSender.items[inSelected].location,
			isSelected:false,			
			onclick:"clickBarnyard"
			
		},{owner: this});
		
		this.$.bys.render();
	},
	clickBarnyard:function(inSender,inEvent){
		
		if (inSender.isSelected == false){
			inSender.addStyles("background-color:#CCFF66;");
			inSender.isSelected = true;			
		}else{
			inSender.addStyles("background-color:transparent;");
			inSender.isSelected = false;
		}
		
		
		
		
	},
	removeBY:function(inSender,inEvent){
		
	},
	adoken : function() {
		this.resetValues();
		this.$.rancher_id.setValue(this.$.dynoco.getJustCreated());
		this.$.addRancherDialog.close();
	},
	saveInspectionForecast : function() {
		this.addInspectionForecast();
		// TODO: Implement
	},
	contextMenuClicked: function(inSender, inEvent ){
		this.$.options.setItems(cacheRanchers.getAllForList());
		this.$.options.openAtEvent(inEvent);		
		//inSender.stopPropagation();
		return false;
	},
	contextBarnyardsClicked: function(inSender, inEvent ){
		
		
		if (this.objRan){
			var items = cacheReceptions.getActiveBYForListByRancherID(this.objRan.value);
			if (items.length > 0){
				this.$.barnyardsMenu.setItems(items);	
			}else{
				this.$.barnyardsMenu.setItems(cacheBY.getAllForList());
			}
			
		}else{
			this.$.barnyardsMenu.setItems(cacheBY.getAllForList());
		}
//		this.$.options.setItems(cacheBY.getAllForList());
		this.$.barnyardsMenu.openAtEvent(inEvent);		
		//inSender.stopPropagation();
		return false;
	},
	teclaPresionada:function(inSender, inEvent){
		var arrAux = [];
		var value="";
		
		switch(inEvent.keyCode){
		case 8:
			value = inSender.value = inSender.value.slice(0,inSender.value.length - 1);
			break;
		case 9:
			if (inSender.value != ""){
				this.clickOption(inSender);
			}
			return;
		case 40:
			return;
		default:
			value = inSender.value + String.fromCharCode(inEvent.keyCode);
		}
		
		
		switch(inSender.name){
		case "rancherInput":
			console.log('input key press with value:' + inSender.value + ' and key: ' + String.fromCharCode(inEvent.keyCode));
			console.log('value = ' + cacheRanchers.findRancher(value));
			
			arrAux = cacheRanchers.findRancher(value);
			if (arrAux.length > 0){
				this.$.options.setItems(arrAux);
//				this.$.options.$.list.$.client.controls[0].setStyle("background-color:yellow;");
				this.$.options.openAroundControl(this.$.rancherInput, "", "left");
			}else
			{
//				this.$.options.setItems(cacheRanchers.getAllForList());
				this.$.options.close();
			}	
			break;
		case "localidad":
			arrAux = cacheMan.findLocation(value);
			if (arrAux.length > 0){
				this.$.options.setItems(arrAux);
				this.$.options.openAroundControl(this.$.localidad, "", "left");
			}else
			{
//				this.$.options.setItems(cacheMan.allLocationsForList());
				this.$.options.close();
			}	
			break;
		case "cattle_type_id":
		arrAux = cacheCattle.findCattle(value);
		if (arrAux.length > 0){
			this.$.options.setItems(arrAux);
			this.$.options.openAroundControl(this.$.cattle_type_id, "", "left");
		}else
		{
			this.$.options.close();
		}	
		break;
		case "barnyards":
			break;
		default:
			
			break;
		}
		
		
	},
	getInspectionForecast:function(){				
	
		var fmt = new enyo.g11n.DateFmt({format: "yyyy/MM/dd", locale: new enyo.g11n.Locale("es_es")});
		var objInspFore={
						id:					undefined,
						fore_details_id:	undefined,
						rancher_id:			undefined,
						auth:				undefined,	
						origin:				undefined,
						cattle_type:		undefined,
						quantity:			0,
						barnyards:			undefined,	
						fore_date:			undefined
					};
		
		objInspFore.rancher_id 		= 	this.objRan.value;
		objInspFore.auth 			= 	this.$.autorizacion.getValue();
		objInspFore.fore_date		=	fmt.format(new Date());   
		objInspFore.origin			=	this.$.origen.getValue();
		objInspFore.cattle_type		=	this.objCattleType.value;
		objInspFore.quantity		=	this.$.cantidad.getValue();
		
		var barnyardsAux = this.$.corrales.getValue().split(",");
		for (i in barnyardsAux){
			barnyardsAux[i] = barnyardsAux[i].replace(" ", "");
			barnyardsAux[i] = this.objLoc.value + barnyardsAux[i];
			barnyardsAux[i] = cacheBY.getByBarnyard(barnyardsAux[i]);
		}
		
		objInspFore.barnyards = barnyardsAux;	
		
		return objInspFore;
	},
	addInspectionForecast:function(){				
		this.iCreated=cacheInspFore.addForecast(this.getInspectionForecast(),this,"afterAddInspFore");		
	},
	afterAddInspFore:function(objForecast){
		this.updateList();
	}
	
});
