enyo
		.kind({
			name : "inspection.forecast",
			kind : enyo.SlidingView,
			layoutKind : enyo.VFlexLayout,
			events : {
				"onAddInspectionForecast" : "",
				"onUpdateInspectionForecast" : "",
				"onRemoveInspectionForecast" : "",
				"onRancherInputKeyPress" : "",
				"onAddRancher" : ""
			},
			create : function() {

				this.inherited(arguments);
				this.cambioDeFecha();
			},
			iSelected : null,
			objRan : null,
			objLoc : null,
			objCattleType : null,
			objList : [],
			arrBY : [],
			arrTempPopupSelection : [],
			itemSelectedPopup : -1,
			fecha : undefined,
			totalItems : 0,
			components : [
					{
						name : "options",
						kind : enyo.PopupList,
						style : "width:300px;",
						onkeypress : "teclaPresionada",
						modal : false,
						onSelect : "clickOption",
						onBeforeOpen : "setupItem",
						items : []
					},
					{
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
					},
					{
						kind : "SlidingPane",
						flex : 1,
						name : "slidingpane",
						components : [
								{
									name : "left",
									width : "300px",
									kind : enyo.SlidingView,
									components : [
											{
												kind : "Header",
												name : "encabezadoFecha",
												style : "background-color:#DABD8B;",
												pack : "center",
												components : [ {
													kind : "DatePicker",
													label : "",
													name : "fechaPicker",
													onChange : "cambioDeFecha"
												} ]
											},
											{
												kind : enyo.Scroller,
												name : "FormScroller",
												horizontal : false,
												autoHorizontal : false,
												flex : 1,
												onScroll : "scroll",
												components : [ {
													kind : "RowGroup",
													defaultKind : "HFlexBox",
													caption : "",
													style : "color:#FFF;",
													components : [
															{
																kind : "Item",
																components : [ {
																	layoutKind : enyo.HFlexLayout,
																	components : [
																			{
																				kind : "Input",
																				name : "rancherInput",
																				hint : "Ganadero",
																				onkeydown : "teclaPresionada",
																				onblur : "lostFocus",
																				flex : 1
																			},
																			{
																				kind : "IconButton",
																				icon : "images/menu-icon-new.png",
																				onclick : "contextMenuClicked"
																			} ]
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
																		flex : 1
																	} ]
																} ]
															},
															{
																kind : "Item",
																components : [ {
																	layoutKind : enyo.HFlexLayout,
																	components : [ {
																		kind : "Input",
																		name : "origen",
																		hint : "Origen",
																		flex : 1
																	} ]
																} ]
															},
															{
																kind : "Item",
																components : [ {
																	layoutKind : enyo.HFlexLayout,
																	components : [ {
																		kind : "Input",
																		name : "cattle_type_id",
																		hint : "Clase",
																		onkeydown : "teclaPresionada",
																		onblur : "lostFocus",
																		flex : 1
																	} ]
																} ]
															},
															{
																kind : "Item",
																components : [ {
																	layoutKind : enyo.HFlexLayout,
																	components : [ {
																		kind : "Input",
																		name : "cantidad",
																		hint : "Cantidad",
																		inputType : "number",
																		flex : 1
																	} ]
																} ]
															},
															{
																kind : "Item",
																components : [ {
																	layoutKind : enyo.HFlexLayout,
																	components : [
																			{
																				kind : "Input",
																				name : "localidad",
																				hint : "Localidad",
																				onkeydown : "teclaPresionada",
																				onblur : "lostFocus",
																				flex : 1
																			},
																	// {
																	// kind :
																	// "IconButton",
																	// icon :
																	// "images/menu-icon-new.png",
																	// onclick :
																	// "contextBarnyardsClicked"
																	// }
																	]
																} ]
															},
															{
																kind : "Item",
																components : [ {
																	layoutKind : enyo.HFlexLayout,
																	components : [
																			{
																				kind : "Input",
																				name : "corrales",
																				hint : "Corrales",
																				flex : 1
																			},
																	// {
																	// kind :
																	// "IconButton",
																	// icon :
																	// "images/menu-icon-new.png",
																	// onclick :
																	// "contextBarnyardsClicked"
																	// }
																	]
																} ]
															},
															// {
															// kind : "Item",
															// components : [ {
															// layoutKind :
															// enyo.HFlexLayout,
															// style:"height:40px",
															// components : [
															// {kind:"Scroller",
															// horizontal:true,vertical:false,
															// flex:1,
															// components: [
															// { name: "bys",
															// layoutKind:
															// enyo.HFlexLayout,
															// align:"left",
															// style:
															// "width:100px",
															// components: []
															// }]
															// }
															// ]
															// }]
															// },
															{
																kind : "Item",
																components : [ {
																	layoutKind : enyo.HFlexLayout,
																	components : [
																			{
																				kind : "Button",
																				name : "btnAdd",
																				className : "enyo-button-affirmative",
																				flex : 1,
																				caption : "Guardar",
																				onclick : "saveInspectionForecast"
																			},
																			{
																				kind : "Button",
																				name : "btnCancelCreate",
																				className : "enyo-button-negative",
																				flex : 1,
																				caption : "Cancelar",
																				onclick : "onCancel"
																			} ]
																} ]
															} ]
												} ]
											} ]

								},
								{
									name : "middle",
									kind : enyo.SlidingView,
									// dragAnywhere :false,
									edgeDragging : true,
									peekwidth : 58,
									components : [
											{
												kind : "Header",
												name : "encabezado",
												className : "listFirst",
												style : "font-size:13px;height:20px;background-color:#DABD8B;",
												components : [
														{
															content : "Ganadero",
															style : "width:250px;text-align:center;"
														},
														{
															content : "Autorización",
															style : "width:100px;text-align:center;"
														},
														{
															content : "Origen",
															style : "width:100px;text-align:center;"
														},
														{
															content : "Clase",
															style : "width:100px;text-align:center;"
														},
														{
															content : "Cantidad",
															style : "width:100px;text-align:center;"
														},
														{
															content : "Localidad",
															style : "width:150px;text-align:center;"
														},
														{
															content : "Corrales",
															style : "width:200px;text-align:left;"
														} ]
											},
											{
												kind : enyo.Scroller,
												name : "listaScroller",
												horizontal : false,
												autoHorizontal : false,
												flex : 1,
												// style : "width:1500px;",
												className : "listBG",
												onScroll : "scroll",
												components : [ {
													kind : enyo.VirtualRepeater,
													name : "forecastList",
													onSetupRow : "setupForecastRow",
													onclick : "selectForecast",
													components : [ {
														kind : enyo.RowItem,
														onConfirm : "dropForecast",
														layoutKind : enyo.HFlexLayout,
														tapHighlight : true,
														style : "font-size:13px;",
														components : [
																{
																	name : "listRancher",
																	style : "width:250px;text-align:left;",
																	content : ""
																},
																{
																	name : "listAuth",
																	style : "width:100px;text-align:center;",
																	content : ""
																},
																{
																	name : "listOrigin",
																	style : "width:100px;text-align:center;",
																	content : ""
																},
																{
																	name : "listCattleType",
																	style : "width:100px;text-align:center;",
																	content : ""
																},
																{
																	name : "listQuantity",
																	style : "width:100px;text-align:center;",
																	content : ""
																},
																{
																	name : "listLocation",
																	style : "width:150px;text-align:center;",
																	content : ""
																},
																{
																	name : "listBarnyards",
																	style : "width:200px;text-align:left;",
																	content : ""
																} ]
													} ]
												// } ]
												// }]
												} ]
											},

											{
												kind : "Drawer",
												name : "draAdd",
												open : false,
												components : [ {
													kind : "Toolbar",
													components : [
															{
																kind : "enyo.IconButton",
																// flex : 1,
																style : "width:100px;",
																label : "Eliminar",
																onclick : "onEliminar"
															},
															{
																kind : "enyo.IconButton",
																// flex : 1,
																style : "width:100px;",
																label : "Cancelar",
																onclick : "onCancel"
															}, ]
												}

												]
											},

									]
								} ]
					} ],
			scroll : function(inSender, inEvent) {
				switch (inSender.name) {
				case "FormScroller":
					if (this.$.FormScroller.getScrollTop() < -20) {
						this.$.FormScroller.scrollTo(30, 0);
					}
					break;
				case "listaScroller":
					if (this.$.listaScroller.getScrollTop() < -20) {
						// this.$.listaScroller.setScrollTop(0);
						this.$.listaScroller.scrollTo(0, 0);
					}
				}

			},
			ready : function() {
				this.resetValues();
				this.updateList();
			},
			resetValues : function() {
				// TODO: Reset form values
			},
			cambioDeFecha : function() {
				var fmt = new enyo.g11n.DateFmt({
					format : "yyyy/MM/dd",
					locale : new enyo.g11n.Locale("es_es")
				});
				
				this.fecha = fmt.format(this.$.fechaPicker.getValue());
				this.updateList();

			},
			selectForecast : function(inSender, inEvent) {
				if (this.objList[inEvent.rowIndex]) {
					this.iSelected = inEvent.rowIndex;
					this.$.forecastList.render();
					this.$.draAdd.setOpen(true);
				}
			},
			setupForecastRow : function(inSender, inIndex) {
				var objFore;
				if (objFore = this.objList[inIndex]) {
					var auxRancher = cacheRanchers.getByID(objFore.rancher_id);
					if (auxRancher) {
						if (auxRancher.rancher_type == 1) {
							this.$.listRancher.setContent(auxRancher.last_name
									+ " " + auxRancher.mother_name + " "
									+ auxRancher.first_name);
						} else {
							this.$.listRancher
									.setContent(auxRancher.company_name);
						}
					}
					this.$.listAuth.setContent(objFore.auth);
					this.$.listOrigin.setContent(objFore.origin);
					this.$.listCattleType.setContent(cacheCattle
							.getByID(objFore.cattle_type).cattype_name);
					this.$.listQuantity.setContent(objFore.quantity);
					
					if (objFore.barnyards.length > 0){
						if (objFore.barnyards[0].location_id == 1) {
							this.$.listLocation.setContent("Chihuahua");
						} else {
							this.$.listLocation.setContent("Zona Sur");
						}
	
						var strBarnyards = "";
						for (i in objFore.barnyards) {
							strBarnyards = strBarnyards
									+ objFore.barnyards[i].barnyard_code + ", ";
	
						}					
						strBarnyards = strBarnyards.slice(0, -2);
						this.$.listBarnyards.setContent(strBarnyards);
					}else {
						this.$.listLocation.setContent("");
						this.$.listBarnyards.setContent("");
					}
					if (inIndex == this.iSelected) {
						this.$.rowItem.applyStyle("background-color",
								"cadetblue");
						this.$.listRancher.applyStyle("color", "white");
						this.$.listAuth.applyStyle("color", "white");
						this.$.listOrigin.applyStyle("color", "white");
						this.$.listCattleType.applyStyle("color", "white");
						this.$.listQuantity.applyStyle("color", "white");
						this.$.listLocation.applyStyle("color", "white");
						this.$.listBarnyards.applyStyle("color", "white");
					} else {
						this.$.rowItem.applyStyle("background-color", null);
						this.$.listRancher.applyStyle("color", null);
						this.$.listRancher.applyStyle("color", null);
						this.$.listAuth.applyStyle("color", null);
						this.$.listOrigin.applyStyle("color", null);
						this.$.listCattleType.applyStyle("color", null);
						this.$.listQuantity.applyStyle("color", null);
						this.$.listLocation.applyStyle("color", null);
						this.$.listBarnyards.applyStyle("color", null);
					}
					this.totalItems++;
					return true;
				}

				return false;
			},
			dropForecast : function() {
				if(cacheInspFore.deleteForecastDetail(this.objList[this.iSelected], this,
						"updateList")==true){
					return true;
				}else{
					return false;
				}

			},
			updateList : function() {
				this.totalItems = 0;
				this.objList = [];
				var arrAllForecasts = [];
				arrAllForecasts = cacheInspFore.get();
				for (i in arrAllForecasts) {
					if (arrAllForecasts[i].fore_date == this.fecha) {
						this.objList.push(arrAllForecasts[i]);
					}
				}
				this.$.forecastList.render();
			},
			getSelected : function() {
				return this.objList[this.iSelected];
			},
			contextMenuClicked : function(inSender, inEvent) {
				this.$.options.openAtEvent(inEvent);

				return false;
			},
			setupItem : function(inSender, inEvent) {
				console.log("setupITem popup list");
				this.arrTempPopupSelection = inSender.controls;
				return true;
			},
			controlSelectionItem : function(direction) {
				if (direction == "down") {
					if (d) {

					}
				}
			},
			lostFocus : function(inSender, inEvent) {

				// this.clickOption(inSender);
				this.$.options.close();
			},
			// addNewRancher : function(inSender, inSelected) {
			// if (this.$.dynoco) {
			// this.$.dynoco.destroy();
			// }
			// switch (inSelected.value) {
			// case 1:
			// this.$.addRancherDialog.createComponent({
			// kind : "catalogs.ranchers.enterprise.create",
			// onAddRancher : "adoken",
			// name : 'dynoco',
			// flex : 1
			// }, {
			// owner : this
			// });
			// break;
			// case 2:
			// this.$.addRancherDialog.createComponent({
			// kind : "catalogs.ranchers.person.create",
			// onAddRancher : "adoken",
			// name : 'dynoco',
			// flex : 1
			// }, {
			// owner : this
			// });
			// break;
			// }
			// this.$.addRancherDialog.render();
			// this.$.addRancherDialog.openAtCenter();
			// },
			clickOption : function(inSender, inSelected) {
				switch (inSender.name) {
				case "rancherInput":
					if (inSelected) {
						this.$.rancherInput
								.setValue(inSender.items[inSelected].caption);
						this.objRan = inSender.items[inSelected];
					} else if (this.$.options.items[0]) {
						this.$.rancherInput
								.setValue(this.$.options.items[0].caption);
						this.objRan = this.$.options.items[0];
					}

					break;
				case "localidad":
					if (inSelected) {
						this.$.localidad
								.setValue(inSender.items[inSelected].caption);
						this.objLoc = inSender.items[inSelected];
					} else if (this.$.options.items[0]) {
						this.$.localidad
								.setValue(this.$.options.items[0].caption);
						this.objLoc = this.$.options.items[0];
					}

					break;
				case "cattle_type_id":
					if (inSelected) {
						this.$.cattle_type_id
								.setValue(inSender.items[inSelected].caption);
						this.objCattleType = inSender.items[inSelected];
					} else if (this.$.options.items[0]) {
						this.$.cattle_type_id
								.setValue(this.$.options.items[0].caption);
						this.objCattleType = this.$.options.items[0];
					}

					break;
				case "barnyards":

					break;
				default:
					if (inSelected) {
						this.$.rancherInput
								.setValue(inSender.items[inSelected].caption);
						this.objRan = inSender.items[inSelected];
					} else if (this.$.options.items[0]) {
						this.$.rancherInput
								.setValue(this.$.options.items[0].caption);
						this.objRan = this.$.options.items[0];
					}

				}

			},
			selectBarnyard : function(inSender, inSelected) {
				// this.arrBY.push(inSender.items[inSelected]);
				var newOne = this.$.bys
						.createComponent(
								{
									events : {
										onkeydown : "doteclaPresionada"
									},
									name : inSender.items[inSelected].value,
									style : "width:70px; border-width:1px;border-color:#333;"
											+ "font-size:12px;color:#333;padding:2px;box-sizing: border-box;border-style:solid;"
											+ "border-radius:5px;text-align:center;margin-right:2px;",
									content : inSender.items[inSelected].barnyard_code
											+ "</BR>"
											+ inSender.items[inSelected].location,
									isSelected : false,
									onclick : "clickBarnyard"

								}, {
									owner : this
								});

				this.$.bys.render();
			},
			clickBarnyard : function(inSender, inEvent) {

				if (inSender.isSelected == false) {
					inSender.addStyles("background-color:#CCFF66;");
					inSender.isSelected = true;
				} else {
					inSender.addStyles("background-color:transparent;");
					inSender.isSelected = false;
				}

			},
			removeBY : function(inSender, inEvent) {

			},
			adoken : function() {
				this.resetValues();
				this.$.rancher_id.setValue(this.$.dynoco.getJustCreated());
				this.$.addRancherDialog.close();
			},
			saveInspectionForecast : function() {
				this.addInspectionForecast();
			},
			contextMenuClicked : function(inSender, inEvent) {
				this.$.options.setItems(cacheRanchers.getAllForList());
				this.$.options.openAtEvent(inEvent);
				// inSender.stopPropagation();
				return false;
			},
			contextBarnyardsClicked : function(inSender, inEvent) {

				if (this.objRan) {
					var items = cacheReceptions
							.getActiveBYForListByRancherID(this.objRan.value);
					if (items.length > 0) {
						this.$.barnyardsMenu.setItems(items);
					} else {
						this.$.barnyardsMenu.setItems(cacheBY.getAllForList());
					}

				} else {
					this.$.barnyardsMenu.setItems(cacheBY.getAllForList());
				}
				// this.$.options.setItems(cacheBY.getAllForList());
				this.$.barnyardsMenu.openAtEvent(inEvent);
				// inSender.stopPropagation();
				return false;
			},
			teclaPresionada : function(inSender, inEvent) {
				var arrAux = [];
				var value = "";

				switch (inEvent.keyCode) {
				case 8:
					value = inSender.value = inSender.value.slice(0,
							inSender.value.length - 1);
					break;
				case 9:
					if (inSender.value != "") {
						this.clickOption(inSender);
					}
					return;
				case 40:
					return;
				default:
					value = inSender.value
							+ String.fromCharCode(inEvent.keyCode);
				}

				switch (inSender.name) {
				case "rancherInput":
					arrAux = cacheRanchers.findRancher(value);
					if (arrAux.length > 0) {
						this.$.options.setItems(arrAux);
						// this.$.options.$.list.$.client.controls[0].setStyle("background-color:yellow;");
						this.$.options.openAroundControl(this.$.rancherInput,
								"", "left");
					} else {
						// this.$.options.setItems(cacheRanchers.getAllForList());
						this.$.options.close();
					}
					break;
				case "localidad":
					arrAux = cacheMan.findLocation(value);
					if (arrAux.length > 0) {
						this.$.options.setItems(arrAux);
						this.$.options.openAroundControl(this.$.localidad, "",
								"left");
					} else {
						// this.$.options.setItems(cacheMan.allLocationsForList());
						this.$.options.close();
					}
					break;
				case "cattle_type_id":
					arrAux = cacheCattle.findCattle(value);
					if (arrAux.length > 0) {
						this.$.options.setItems(arrAux);
						this.$.options.openAroundControl(this.$.cattle_type_id,
								"", "left");
					} else {
						this.$.options.close();
					}
					break;
				case "barnyards":
					break;
				default:

					break;
				}

			},
			getInspectionForecast : function() {

				var objInspFore = {
					id : undefined,
					fore_details_id : undefined,
					rancher_id : undefined,
					auth : undefined,
					origin : undefined,
					cattle_type : undefined,
					quantity : 0,
					barnyards : undefined,
					fore_date : undefined
				};

				objInspFore.rancher_id = this.objRan.value;
				objInspFore.auth = this.$.autorizacion.getValue();
				objInspFore.fore_date = this.fecha;
				objInspFore.origin = this.$.origen.getValue();
				objInspFore.cattle_type = this.objCattleType.value;
				objInspFore.quantity = this.$.cantidad.getValue();

				var barnyardsAux = this.$.corrales.getValue().split(",");
				for (i in barnyardsAux) {
					barnyardsAux[i] = barnyardsAux[i].replace(" ", "");
					barnyardsAux[i] = this.objLoc.value + barnyardsAux[i];
					var auxBarn = cacheBY.getByBarnyard(barnyardsAux[i]);
					if (auxBarn == undefined) {
						cacheMan.setMessage("", "[Exception ID: LOCAL"
								+ "] Descripción: No existe el corral: "
								+ barnyardsAux[i].slice(1)
								+ " para la localidad: " + this.objLoc.caption);
						return null;
					}
					barnyardsAux[i] = auxBarn;

				}

				objInspFore.barnyards = barnyardsAux;

				return objInspFore;
			},
			addInspectionForecast : function() {
				var objForecast = this.getInspectionForecast();				
				if (objForecast) {
					if (this.totalItems > 0){
						objForecast.id = this.objList[0].id;
						this.iCreated = cacheInspFore.addForecast(objForecast,
								this, "afterAddInspFore");	
					}else {
						this.iCreated = cacheInspFore.createForecast(objForecast,
								this, "afterAddInspFore");
					}
					
					
				}
			},
			afterAddInspFore : function(objForecast) {
				this.updateList();
			},
			onCancel : function() {
				this.iSelected = null;
				this.$.draAdd.setOpen(false);
				this.$.forecastList.render();
			},
			onMoverArriba : function() {
				console.log("mover arriba");

			},
			onMoverAbajo : function() {
				console.log("mover abajo");
			},
			onEliminar : function() {
				if(this.dropForecast()==true){
					this.iSelected = null;
					this.$.draAdd.setOpen(false);
				}			
			}

		});
