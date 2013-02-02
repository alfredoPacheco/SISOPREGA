enyo
		.kind({
			name : "inspection.forecast",
			kind : enyo.SlidingView,
			layoutKind : enyo.VFlexLayout,
			create : function() {
				this.inherited(arguments);				
				this.$.rancherInput.setItems(cacheRanchers.getAllForList());
				this.$.cattle_type_id.setItems(cacheCattle.getAllCattleType());
				this.$.localidad.setItems(cacheMan.allLocationsForList());
			},
			iSelected : null,
			_id : undefined,
			objList : [],
			arrBY : [],
			arrTempPopupSelection : [],
			itemSelectedPopup : -1,
			fecha : undefined,
			totalItems : 0,
			components : [ {
				kind : "SlidingPane",
				flex : 1,
				name : "slidingpane",
				components : [
						{
							name : "left",
							width : "300px",
							kind : enyo.SlidingView,
							components : [ {
								kind : "Header",
								name : "encabezadoFecha",
								style : "background-color:#DABD8B;",
								pack : "center",
								components : [ {
									kind : "Button",
									content : "Hoy",
									style : "background-color:#DABD8B;",
									onclick : "cambiarAHoy"
								}, {
									kind : "DatePicker",
									label : "",
									name : "fechaPicker",
									onChange : "cambioDeFecha"
								} ]
							}, {
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
									components : [ {
										kind : "Item",
										components : [ {
											layoutKind : enyo.HFlexLayout,
											components : [ {
												kind : "controls.autocomplete",
												name : "rancherInput",
												hint : "Ganadero"
											} ]
										} ]
									},  {
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
									}, {
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
									}, {
										kind : "controls.autocomplete",
										name : "cattle_type_id",
										hint : "Ganado"
									}, {
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
									}, {
										kind : "controls.autocomplete",
										name : "localidad",
										hint : "Localidad"
									}, {
										kind : "Item",
										components : [ {
											layoutKind : enyo.HFlexLayout,
											components : [ {
												kind : "Input",
												name : "corrales",
												hint : "Corrales",
												flex : 1
											} ]
										} ]
									} ]
								} ]
							}, {
								kind : "Drawer",
								name : "draAdd",
								animate : false,
								components : [ {
									kind : "Button",
									name : "btnAdd",
									className : "enyo-button-affirmative",
									caption : "Agregar",
									onclick : "saveInspectionForecast"
								} ]
							}, {
								kind : "Drawer",
								name : "draUpdate",
								animate : false,
								open : false,
								components : [ {
									layoutKind : "HFlexLayout",
									align : "center",
									components : [ {
										kind : "Button",
										name : "btnUpdate",
										className : "enyo-button-affirmative",
										flex : 1,
										caption : "Actualizar",
										onclick : "updateForecast"
									}, {
										kind : "Button",
										name : "btnCancel",
										className : "enyo-button-negative",
										flex : 1,
										caption : "Cancelar",
										onclick : "onCancel"
									} ]
								} ]
							} ]

						},
						{
							name : "middle",
							kind : enyo.SlidingView,
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
										} ]
									}, {
										kind : "Drawer",
										name : "draDel",
										open : false,
										components : [ {
											kind : "Toolbar",
											components : [ {
												kind : "enyo.IconButton",
												style : "width:100px;",
												label : "Eliminar",
												onclick : "onEliminar"
											}, {
												kind : "enyo.IconButton",
												style : "width:100px;",
												label : "Cancelar",
												onclick : "onCancel"
											}, ]
										}

										]
									}, ]
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
						this.$.listaScroller.scrollTo(0, 0);
					}
				}
			},
			ready : function() {
				this.$.fechaPicker.setValue(new Date());
				this.cambioDeFecha();
			},
			resetValues : function() {
				this.$.rancherInput.setIndex(-1);
				this.$.autorizacion.setValue("");
				this.$.origen.setValue("");
				this.$.cattle_type_id.setIndex(-1);
				this.$.cantidad.setValue("");
				this.$.localidad.setIndex(-1);
				this.$.corrales.setValue("");
			},
			cambioDeFecha : function() {
				var fmt = new enyo.g11n.DateFmt({
					format : "yyyy/MM/dd",
					locale : new enyo.g11n.Locale("es_es")
				});
				this.fecha = fmt.format(this.$.fechaPicker.getValue());
				this.updateList();
			},
			cambiarAHoy : function() {
				this.$.fechaPicker.setValue(new Date());
				this.cambioDeFecha();
			},
			selectForecast : function(inSender, inEvent) {
				if (objFore = this.objList[inEvent.rowIndex]) {
					this.$.rancherInput.setIndex(objFore.rancher_id);
					this.$.autorizacion.setValue(objFore.auth);
					this.$.origen.setValue(objFore.origin);
					this.$.cattle_type_id.setIndex(objFore.cattle_type);
					
					this.$.cantidad.setValue(objFore.quantity);

					if (objFore.barnyards.length > 0) {
						this.$.localidad.setIndex(objFore.barnyards[0].location_id);						
						var strBarnyards = "";
						for (i in objFore.barnyards) {
							strBarnyards = strBarnyards
									+ objFore.barnyards[i].barnyard_code + ", ";

						}
						strBarnyards = strBarnyards.slice(0, -2);
						this.$.corrales.setValue(strBarnyards);
					} else {
						this.$.localidad.setIndex(-1);
						this.$.corrales.setValue("");
					}
					this.iSelected = inEvent.rowIndex;
					this.totalItems = 0;
					this.$.forecastList.render();
					this.$.draDel.render();
					this.$.draDel.setOpen(true);
					this.$.draAdd.setOpen(false);
					this.$.draUpdate.setOpen(true);
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

					if (objFore.barnyards.length > 0) {
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
					} else {
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
				if (cacheInspFore.deleteForecastDetail(
						this.objList[this.iSelected], this, "updateList") == true) {
					return true;
				} else {
					return false;
				}
			},
			updateList : function() {
				this._id = undefined;
				this.totalItems = 0;
				this.objList = [];
				var arrAllForecasts = [];
				this.iSelected = null;
				this.$.draDel.setOpen(false);
				this.$.draUpdate.setOpen(false);
				this.$.draAdd.setOpen(true);
				this.resetValues();
				arrAllForecasts = cacheInspFore.get();
				for (i in arrAllForecasts) {
					if (arrAllForecasts[i].fore_date == this.fecha) {
						this._id = arrAllForecasts[i].id;
						if (arrAllForecasts[i].fore_details_id) {
							this.objList.push(arrAllForecasts[i]);
						}
					}
				}
				this.$.forecastList.render();
			},
			getSelected : function() {
				return this.objList[this.iSelected];
			},
			saveInspectionForecast : function() {
				this.addInspectionForecast();
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

				objInspFore.rancher_id = this.$.rancherInput.getIndex();
				objInspFore.cattle_type = this.$.cattle_type_id.getIndex();
				objInspFore.auth = this.$.autorizacion.getValue();
				objInspFore.fore_date = this.fecha;
				objInspFore.origin = this.$.origen.getValue();
				objInspFore.quantity = this.$.cantidad.getValue();

				var barnyardsAux = this.$.corrales.getValue().split(",");
				for (i in barnyardsAux) {
					barnyardsAux[i] = barnyardsAux[i].replace(" ", "");
					barnyardsAux[i] = this.$.localidad.getIndex()
							+ barnyardsAux[i];
					var auxBarn = cacheBY.getByBarnyard(barnyardsAux[i]);
					if (auxBarn == undefined) {
						cacheMan.setMessage("", "[Exception ID: LOCAL"
								+ "] Descripción: No existe el corral: "
								+ barnyardsAux[i].slice(1)
								+ " para la localidad: "
								+ this.$.localidad.getValue());
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
					if (this._id) {
						objForecast.id = this._id;
						cacheInspFore.addForecast(objForecast, this,
								"afterAddInspFore");
					} else {
						cacheInspFore.createForecast(objForecast, this,
								"afterAddInspFore");
					}

				}
			},
			updateForecast : function() {
				var objForecast = this.getInspectionForecast();
				if (objForecast) {
					objForecast.id = this._id;
					objForecast.fore_details_id = this.getSelected().fore_details_id;
					cacheInspFore.updateForecastDetails(objForecast, this,
							"afterAddInspFore");
				}
			},
			afterAddInspFore : function() {
				this.updateList();
			},
			onCancel : function() {
				this.iSelected = null;
				this.$.draDel.setOpen(false);
				this.$.draAdd.setOpen(true);
				this.$.draUpdate.setOpen(false);
				this.totalItems = 0;
				this.resetValues();
				this.$.forecastList.render();
			},
			onMoverArriba : function() {
				console.log("mover arriba");

			},
			onMoverAbajo : function() {
				console.log("mover abajo");
			},
			onEliminar : function() {
				if (this.dropForecast() == true) {
					this.onCancel();
				}
			}

		});
