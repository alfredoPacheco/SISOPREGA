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
	objList : [],
	arrBY : [],
	components : [ {
		name : "options",		
		kind : enyo.PopupList,
		style:"width:300px;",
		modal:false,
		onSelect : "selectRancher",
		items : []		
	},{
		name : "barnyardsMenu",		
		kind : enyo.PopupList,
		style:"width:300px;",
		modal:false,
		onSelect : "selectBarnyard",
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
							onkeypress : "rancherInputKeyPress",
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
				}, {
					kind : "Item",
					components : [ {
						layoutKind : enyo.HFlexLayout,
						components : [ {
							kind : "Input",
							name : "barnyards",
							hint : "Corrales",
							flex : 1
						},{
							kind : "IconButton",
							icon : "images/menu-icon-new.png",
							onclick : "contextBarnyardsClicked"
						} ]
					} ]
				}, {
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
							name : "name",
							className : "listFirst",
							content : ""
						}, {
							name : "info",
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
	},
	resetValues : function() {
		// TODO: Reset form values
	},
	contextMenuClicked : function(inSender, inEvent) {
		this.$.options.openAtEvent(inEvent);		
		return false;
	},
	lostFocus:function(){
//		this.$.options.close();
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
	selectRancher : function(inSender, inSelected) {
		this.$.rancherInput.setValue(inSender.items[inSelected].caption);
		this.objRan = inSender.items[inSelected];
	},
	selectBarnyard : function(inSender, inSelected) {
		
		this.arrBY.push(inSender.items[inSelected]);
		var strAux = "";
		for (i in this.arrBY){
			strAux = strAux + this.arrBY[i].caption + ", ";
		}
		strAux = strAux.slice(0, -2);
		this.$.barnyards.setValue(strAux);
		
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
		if(inEvent.keyCode != 8 ){
			value = inSender.value + String.fromCharCode(inEvent.keyCode);
		}
		else {
			value = inSender.value.slice(0,inSender.value.length - 1);
		}
		
		switch(inSender.name){
		case "rancherInput":
			console.log('input key press with value:' + inSender.value + ' and key: ' + String.fromCharCode(inEvent.keyCode));
			console.log('value = ' + cacheRanchers.findRancher(value));
			
			arrAux = cacheRanchers.findRancher(value);
			if (arrAux.length > 0){
				this.$.options.setItems(arrAux);
				this.$.options.$.list.$.client.controls[0].setStyle("background-color:yellow;");
				this.$.options.openAroundControl(this.$.rancherInput, "", "left");
			}else
			{
				this.$.options.setItems(cacheRanchers.getAllForList());
				this.$.options.close();
			}	
			break;
		case "barnyards":
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
		objInspFore.cattle_type		=	this.$.cattle_type_id.getValue();
		objInspFore.quantity		=	this.$.cantidad.getValue();
		
				
		objInspFore.barnyards		=	this.arrBY;	
		
		return objInspFore;
	},
	addInspectionForecast:function(){				
		this.iCreated=cacheInspFore.addForecast(this.getInspectionForecast(),this,"afterAddInspFore");		
	},
	afterAddInspFore:function(){
		alert("AddRancher");
	}
	
});
