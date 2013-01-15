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
	objRec : null,
	objList : [],
	arrBY : null,
	components : [ {
		name : "options",		
		kind : enyo.PopupList,
		style:"width:300px;",
		modal:false,
		onSelect : "selectRancher",
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
							flex:1,
							iSelected:null
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
		this.$.rancherInput.iSelected = inSender.items[inSelected];
	},
	adoken : function() {
		this.resetValues();
		this.$.rancher_id.setValue(this.$.dynoco.getJustCreated());
		this.$.addRancherDialog.close();
	},
	saveInspectionForecast : function() {
		this.getInspectionForecast();
		// TODO: Implement
	},
	contextMenuClicked: function(inSender, inEvent ){
		this.$.options.setItems(cacheRanchers.getAllForList());
		this.$.options.openAtEvent(inEvent);		
		//inSender.stopPropagation();
		return false;
	},
	teclaPresionada:function(inSender, inEvent){
		console.log('input key press with value:' + inSender.value + ' and key: ' + String.fromCharCode(inEvent.keyCode));
		console.log(cacheRanchers.findRancher(inSender.value + String.fromCharCode(inEvent.keyCode)));
		var arrAux = [];
		if(inEvent.keyCode != 8 ){
		arrAux = cacheRanchers.findRancher(inSender.value + String.fromCharCode(inEvent.keyCode));
		}
		else {
			arrAux = cacheRanchers.findRancher(inSender.value.slice(0,inSender.value.length - 1));
		}
		if (arrAux.length > 0){
			this.$.options.setItems(arrAux);
			this.$.options.$.list.$.client.controls[0].setStyle("background-color:yellow;");
			this.$.options.openAroundControl(this.$.rancherInput, "", "left");
		}else
		{
			this.$.options.setItems(cacheRanchers.getAllForList());
			this.$.options.close();
		}	
	},
	getInspectionForecast:function(){				
	
//		var fmt = new enyo.g11n.DateFmt({format: "yyyy/MM/dd", locale: new enyo.g11n.Locale("es_es")});
		var objInspFore={
						insp_fore_id:	"",
						rancher_id:		"",
						autorization:	"",	
						origin:			"",
						ins_class:		"",
						quantity:		"",
						barnyards:		"",						
					};
		
		objInspFore.rancher_id 		= this.$.rancherInput.iSelected.value;
		objInspFore.autorization 	= this.$.autorizacion.getValue();
//		
//		if(this.$.birth_date.getValue()!=null){			
//			objRan.birth_date=fmt.format(this.$.birth_date.getValue());   
//		}
//		
		objInspFore.origin			=	this.$.origen.getValue();
		objInspFore.ins_class		=	this.$.cattle_type_id.getValue();
		objInspFore.quantity		=	this.$.cantidad.getValue();
		objInspFore.barnyards		=	this.$.barnyards.getValue();	
		
		return objInspFore;
	},
	addInspectionForecast:function(){				
		this.iCreated=cacheRanchers.create(this.getRancher(),this,"afteraddRancher");		
	},
	
});
