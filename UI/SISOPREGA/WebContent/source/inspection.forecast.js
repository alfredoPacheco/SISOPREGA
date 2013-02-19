enyo
		.kind({
			name : "inspection.forecast",
			kind : enyo.SlidingView,
			layoutKind : enyo.VFlexLayout,
//			create : function() {
//				this.inherited(arguments);				
//				
//				this.$.cattle_type.setItems(cacheCattle.getAllCattleType());
//				this.$.zone.setItems(cacheMan.getAllZonesForList());
//				this.$.origin.setItems(cacheMan.getAllLocationsForList());				
//				this.$.barnyards.setItems(cacheReceptions.getActiveBYForListByRancherID(14));
//				this.$.rancher.setItems(cacheRanchers.getAllForList());
//			},
			iSelected : null,
			_id : undefined,
			objList : [],
			arrBY : [],
			arrTempPopupSelection : [],
			itemSelectedPopup : -1,
			fecha : undefined,
			totalItems : 0,
			arrReceptions:[],
			arrActiveReceptions:[],
			arrFilter:[],
			defaultZone : 1,
			actualFilter:{
					rancher_id : "",
					zone_id:"",
					origin_id : "",
					cattle_type_id : "",
					reception_id : "", //reception for barnyards
			},			
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
									components : [ {
										kind : "Item",
										components : [ {
											layoutKind : enyo.HFlexLayout,
											components : [ {
												kind : "controls.autocomplete",
												name : "rancher",
												hint : "Ganadero",
												onSelectItem:"on_select_item"
											} ]
										} ]
									},
									{
										kind : "Item",
										components : [ {
											layoutKind : enyo.HFlexLayout,
											components : [ {
												kind : "controls.autocomplete",
												name : "zone",
												hint : "Localidad",
												onSelectItem:"on_select_item"
											} ]
										} ]
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
												kind : "controls.autocomplete",
												name : "origin",
												hint : "Origen",
												onSelectItem:"on_select_item"
											} ]
										} ]
									},
									{
										kind : "Item",
										components : [ {
											layoutKind : enyo.HFlexLayout,
											components : [ {
												kind : "controls.autocomplete",
												name : "cattle_type",
												hint : "Ganado",
												onSelectItem:"on_select_item"
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
											components : [ {
												kind : "controls.multiselect",
												name : "barnyards",
												hint : "Corrales",
												onSelectItem:"on_select_item"
											} ]
										} ]
									},
//									{
//										kind : "Item",
//										components : [ {
//											layoutKind : enyo.HFlexLayout,
//											components : [ {
//												kind : "Input",
//												name : "corrales",
//												hint : "Corrales",
//												flex : 1
//											} ]
//										} ]
//									}
									]
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
															name : "listZone",
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
				this.arrActiveReceptions = cacheReceptions.get();				
				this.$.fechaPicker.setValue(new Date());
				this.cambioDeFecha();				
				
			},
			resetValues : function() {
				this.$.rancher.clear();
				this.$.autorizacion.setValue("");
				this.$.origin.clear();
				this.$.cattle_type.clear();
				this.$.cantidad.setValue("");
				this.$.zone.clear();
				this.$.barnyards.clear();
				this.actualFilter.rancher_id = "";
				this.actualFilter.zone_id = "";
				this.actualFilter.origin_id = "";
				this.actualFilter.cattle_type_id = "";
				this.actualFilter.reception_id = "";
				
				this.arrFilter = this.arrActiveReceptions;
			},
			cambioDeFecha : function() {
				var fmt = new enyo.g11n.DateFmt({
					format : "yyyy/MM/dd",
					locale : new enyo.g11n.Locale("es_es")
				});
				this.fecha = fmt.format(this.$.fechaPicker.getValue());
				
				
//				this.$.cattle_type.setIndex(1);
//				this.$.zone.setIndex(1);
				
				this.updateList();
				this.load_combos();
				
			},
			cambiarAHoy : function() {
				this.$.fechaPicker.setValue(new Date());
				this.cambioDeFecha();
			},
			on_select_zone:function(InSender, InEvent){
				this.defaultZone = this.$.zone.getIndex();
			},
			on_select_item: function(InSender, InEvent){
				switch(InSender.name){
				case "rancher":
					this.actualFilter.rancher_id = InSender.index;
					break;
				case "zone":
					this.actualFilter.zone_id = InSender.index;
					break;
				case "origin":
					this.actualFilter.origin_id = InSender.index;
					break;
				case "cattle_type":
					this.actualFilter.cattle_type_id = InSender.index;
					break;
				case "barnyards":
					this.actualFilter.reception_id = InSender.index;					
					break;
				}				
				this.applyFilter();
//				this.load_combos();
				this.autoCompleteFields();			
			},
			applyFilter:function(){
				this.arrFilter = this.arrActiveReceptions;
				if(this.actualFilter.rancher_id != ""){
					this.filterByRancher(this.actualFilter.rancher_id);	
				}
				if(this.actualFilter.zone_id != ""){
					this.filterByZone(this.actualFilter.zone_id);
				}
				if(this.actualFilter.origin_id != ""){
					this.filterByOrigin(this.actualFilter.origin_id);
				}
				if(this.actualFilter.cattle_type_id != ""){
					this.filterByCattle(this.actualFilter.cattle_type_id);
				}
				if(this.actualFilter.reception_id != ""){
					this.filterByReception(this.actualFilter.reception_id);
				}
			},
			filterByRancher:function(rancher_id){				
				if (rancher_id > -1){
					var arrResult = [];
					if(this.arrFilter.length > 0){
						for (i in this.arrFilter){
							if (this.arrFilter[i].rancher_id == rancher_id){
								arrResult.push(this.arrFilter[i]);
							}
						}
					}else{
						for (i in this.arrActiveReceptions){
							if (this.arrActiveReceptions[i].rancher_id == rancher_id){
								arrResult.push(this.arrActiveReceptions[i]);
							}
						}	
					}
					this.arrFilter = arrResult;					
				}
			},
			filterByZone:function(zone_id){				
				if (zone_id > -1){
					var arrResult = [];
					if(this.arrFilter.length > 0){
						for (i in this.arrFilter){
							if (this.arrFilter[i].zone_id == zone_id){
								arrResult.push(this.arrFilter[i]);
							}
						}
					}else{
						for (i in this.arrActiveReceptions){
							if (this.arrActiveReceptions[i].zone_id == zone_id){
								arrResult.push(this.arrActiveReceptions[i]);
							}
						}	
					}
					this.arrFilter = arrResult;					
				}
			},
			filterByOrigin:function(location_id){				
				if (location_id > -1){
					var arrResult = [];
					if(this.arrFilter.length > 0){
						for (i in this.arrFilter){
							if (this.arrFilter[i].location_id == location_id){
								arrResult.push(this.arrFilter[i]);
							}
						}
					}else{
						for (i in this.arrActiveReceptions){
							if (this.arrActiveReceptions[i].location_id == location_id){
								arrResult.push(this.arrActiveReceptions[i]);
							}
						}	
					}
					this.arrFilter = arrResult;					
				}
			},
			filterByCattle:function(cattype_id){				
				if (cattype_id > -1){
					var arrResult = [];
					if(this.arrFilter.length > 0){
						for (i in this.arrFilter){
							if (this.arrFilter[i].cattype_id == cattype_id){
								arrResult.push(this.arrFilter[i]);
							}
						}
					}else{
						for (i in this.arrActiveReceptions){
							if (this.arrActiveReceptions[i].cattype_id == cattype_id){
								arrResult.push(this.arrActiveReceptions[i]);
							}
						}	
					}
					this.arrFilter = arrResult;					
				}
			},
			filterByReception:function(reception_id){				
				if (reception_id > -1){
					var arrResult = [];
					if(this.arrFilter.length > 0){
						for (i in this.arrFilter){
							if (this.arrFilter[i].reception_id == reception_id){
								arrResult.push(this.arrFilter[i]);
							}
						}
					}else{
						for (i in this.arrActiveReceptions){
							if (this.arrActiveReceptions[i].reception_id == reception_id){
								arrResult.push(this.arrActiveReceptions[i]);
							}
						}	
					}
					this.arrFilter = arrResult;					
				}
			},
			load_combos:function(){
				this.load_ranchers();
				this.load_zones();
				this.load_origins();
				this.load_cattles();
				this.load_barnyards();
			},
			load_ranchers:function(){
				var arrResult = [];
				var result = [];
				if(this.arrFilter.length>0){
					for (i in this.arrFilter){
						var obj = {
								value:		this.arrFilter[i].rancher_id,
								caption:	this.arrFilter[i].rancher_name
						};
						if(!(arrResult[obj.value] in arrResult)){
							arrResult[obj.value]=obj;	
						}
					}
				}
					
				for(i in arrResult){
					result.push(arrResult[i]);
				}

				this.$.rancher.setItems(result);
			},
			load_zones:function(){
				var arrResult = [];
				var result = [];
				if(this.arrFilter.length>0){
					for (i in this.arrFilter){
						var obj = {
								value:		this.arrFilter[i].zone_id,
								caption:	cacheMan.getZoneByID(this.arrFilter[i].zone_id).zone_name
						};
						if(!(arrResult[obj.value] in arrResult)){
							arrResult[obj.value]=obj;	
						}
					}
				}
				for(i in arrResult){
					result.push(arrResult[i]);
				}
				this.$.zone.setItems(result);
			},
			load_origins:function(){
				var arrResult = [];
				var result = [];
				if(this.arrFilter.length>0){
					for (i in this.arrFilter){
						var obj = {
								value:		this.arrFilter[i].location_id,
								caption:	this.arrFilter[i].location_name
						};
						if(!(arrResult[obj.value] in arrResult)){
							arrResult[obj.value]=obj;	
						}
					}
				}
				for(i in arrResult){
					result.push(arrResult[i]);
				}
				this.$.origin.setItems(result);
			},
			load_cattles:function(){
				var arrResult = [];
				var result = [];
				if(this.arrFilter.length>0){
					for (i in this.arrFilter){
						var obj = {
								value:		this.arrFilter[i].cattype_id,
								caption:	this.arrFilter[i].cattype_name
						};
						if(!(arrResult[obj.value] in arrResult)){
							arrResult[obj.value]=obj;	
						}
					}
				}
				for(i in arrResult){
					result.push(arrResult[i]);
				}
				this.$.cattle_type.setItems(result);
			},
			load_barnyards:function(){
				var arrResult = [];
				var result = [];
				if(this.arrFilter.length>0){
					for (i in this.arrFilter){
						var auxCaption = "";
						for(j in this.arrFilter[i].barnyards){
							auxCaption += this.arrFilter[i].barnyards[j].substring(1) + ", ";
						}
						auxCaption.slice(0, -2);
						var obj = {
								value:		this.arrFilter[i].reception_id,
								caption:	auxCaption,
//								barnyards:	this.arrFilter[i].barnyards
						};						
						if(!(arrResult[obj.value] in arrResult)){
							arrResult[obj.value]=obj;	
						}
					}
				}
				for(i in arrResult){
					result.push(arrResult[i]);
				}
				this.$.barnyards.setItems(result);
			},
			addRancherSelected:function(rancher_id){
				if (rancher_id > -1){
					for (i in this.arrReceptions){
						if (this.arrReceptions[i].rancher_id == rancher_id){
							return;
						}
					}
					
					var objRancherSelected={
							rancher_id : 	rancher_id,
							receptions:		cacheReceptions.getReceptionsByRancherID(rancher_id),
							origins: [],
							cattle_types: [],
							zones:[],
							barnyards:[]
					};
					
					this.arrReceptions.push(objRancherSelected);
				}
			},
//			getActiveOrigins:function(){
//				var response = [];
//				var newArray = [];
//				if(this.$.rancher.getIndex()>-1){
//					for (i in this.arrReceptions){
//						if (this.arrReceptions[i].rancher_id == this.$.rancher.getIndex()){
//							for(j in this.arrReceptions[i].receptions){
//								var auxOrigin = {
//									value :		this.arrReceptions[i].receptions[j].location_id,
//									caption : 	this.arrReceptions[i].receptions[j].location_name									
//								};
//								if(!(this.arrReceptions[i].receptions[j].location_id in response)){
//									response[this.arrReceptions[i].receptions[j].location_id]=auxOrigin;	
//								}	
//							}
//						}
//					}
//				}else{
//					response = cacheMan.getAllLocationsForList();
//				}
//				
//				for(i in response){
//					newArray.push(response[i]);
//				}
//				
//				this.$.origin.setItems(newArray);
//				if(newArray.length == 1 && this.$.origin.getValue().trim() == ""){
//					this.$.origin.setIndex(newArray[0].value);
//				}
//			},
//			getActiveCattles:function(){
//				var response = [];
//				var newArray = [];
//				if(this.$.rancher.getIndex()>-1){
//					for (i in this.arrReceptions){
//						if (this.arrReceptions[i].rancher_id == this.$.rancher.getIndex()){
//							for(j in this.arrReceptions[i].receptions){
//								var auxCattle = {
//									value :		this.arrReceptions[i].receptions[j].cattype_id,
//									caption : 	this.arrReceptions[i].receptions[j].cattype_name
//								};
//								if(!(this.arrReceptions[i].receptions[j].cattype_id in response)){
//									response[this.arrReceptions[i].receptions[j].cattype_id]=auxCattle;
//								}								
//							}
//						}
//					}
//				}else{
//					response = cacheCattle.getAllCattleType();
//				}
//				
//				for(i in response){
//					newArray.push(response[i]);
//				}
//				
//				this.$.cattle_type.setItems(newArray);
//				if(newArray.length == 1 && this.$.cattle_type.getValue().trim() == ""){
//					this.$.cattle_type.setIndex(newArray[0].value);
//				}
//			},
//			getActiveBarnyards:function(){
//				var response = [];
//				if(this.$.rancher.getIndex()>-1){
//					for (i in this.arrReceptions){
//						if (this.arrReceptions[i].rancher_id == this.$.rancher.getIndex()){
//							for(j in this.arrReceptions[i].receptions){
//								var barnyards = this.arrReceptions[i].receptions[j].barnyards;
//								for (property in barnyards)
//								{
//									var auxBarnyard = {
//											caption : "",
//											value : ""
//										};
//										var barnyard_id = cacheBY
//												.getByBarnyard(barnyards[property]).barnyard_id;
//										if (barnyards[property].charAt(0) == 1) {
//											auxBarnyard.caption = barnyards[property]
//													.substr(1)
//													+ " [Chihuahua]";
//											auxBarnyard.value = barnyard_id;
//											auxBarnyard.barnyard_code = barnyards[property]
//													.substr(1);
//											auxBarnyard.zone = "Chihuahua";
//											response.push(barnyard);
//										} else {
//											auxBarnyard.caption = barnyards[property]
//													.substr(1)
//													+ " [Zona Sur]";
//											auxBarnyard.value = barnyard_id;
//											auxBarnyard.barnyard_code = barnyards[property]
//													.substr(1);
//											auxBarnyard.zone = "Zona Sur";
//											response.push(barnyard);
//										}
//								}
//							}
//						}
//					}
//				}else{
//					response = cacheReceptions.getActiveBYForListByRancherID();
//				}
//				
//				return response;
//			},
//			filterData:function(items,criteria){
//				return [];
//			},
			autoCompleteFields:function(){
				
				
				if (this.$.rancher.getValue().trim()== ""){
					if(this.arrFilter.length ==1){
						this.$.rancher.setIndex(this.arrFilter[0].rancher_id);
					}
				}
				if (this.$.zone.getValue().trim()== ""){
					if(this.arrFilter.length ==1){
						this.$.zone.setIndex(this.arrFilter[0].zone_id);
					}
				}
				if (this.$.origin.getValue().trim()== ""){
					if(this.arrFilter.length ==1){
						this.$.origin.setIndex(this.arrFilter[0].location_id);
					}
				}
				if (this.$.cattle_type.getValue().trim()== ""){
					if(this.arrFilter.length ==1){
						this.$.cattle_type.setIndex(this.arrFilter[0].cattype_id);
					}
				}
				if (this.$.barnyards.getValue().trim()== ""){
					if(this.arrFilter.length ==1){
						this.$.barnyards.setIndex(this.arrFilter[0].reception_id);
					}
				}
				
			},
			selectForecast : function(inSender, inEvent) {
				if (objFore = this.objList[inEvent.rowIndex]) {
					this.$.rancher.setIndex(objFore.rancher_id);
					this.$.autorizacion.setValue(objFore.auth);
					this.$.origin.setIndex(objFore.origin);
					this.$.cattle_type.setIndex(objFore.cattle_type);
					
					this.$.cantidad.setValue(objFore.quantity);

					if (objFore.barnyards.length > 0) {
						this.$.zone.setIndex(objFore.barnyards[0].zone_id);						
						var strBarnyards = "";
						for (i in objFore.barnyards) {
							strBarnyards = strBarnyards
									+ objFore.barnyards[i].barnyard_code + ", ";

						}
						strBarnyards = strBarnyards.slice(0, -2);
						this.$.barnyards.setValue(strBarnyards);
					} else {
						this.$.zone.setIndex(-1);
						this.$.barnyards.setValue("");
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
						if (objFore.barnyards[0].zone_id == 1) {
							this.$.listZone.setContent("Chihuahua");
						} else {
							this.$.listZone.setContent("Zona Sur");
						}
						var strBarnyards = "";
						for (i in objFore.barnyards) {
							strBarnyards = strBarnyards
									+ objFore.barnyards[i].barnyard_code + ", ";

						}
						strBarnyards = strBarnyards.slice(0, -2);
						this.$.listBarnyards.setContent(strBarnyards);
					} else {
						this.$.listZone.setContent("");
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
						this.$.listZone.applyStyle("color", "white");
						this.$.listBarnyards.applyStyle("color", "white");
					} else {
						this.$.rowItem.applyStyle("background-color", null);
						this.$.listRancher.applyStyle("color", null);
						this.$.listRancher.applyStyle("color", null);
						this.$.listAuth.applyStyle("color", null);
						this.$.listOrigin.applyStyle("color", null);
						this.$.listCattleType.applyStyle("color", null);
						this.$.listQuantity.applyStyle("color", null);
						this.$.listZone.applyStyle("color", null);
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
					zone_id:	undefined,
					auth : undefined,
					origin : undefined,
					cattle_type : undefined,
					quantity : 0,
					barnyards : undefined,
					fore_date : undefined
				};

				objInspFore.rancher_id = this.$.rancher.getIndex();
				objInspFore.zone_id = this.$.zone.getIndex();
				objInspFore.cattle_type = this.$.cattle_type.getIndex();
				objInspFore.auth = this.$.autorizacion.getValue();
				objInspFore.fore_date = this.fecha;
				objInspFore.origin = this.$.origin.getIndex();
				objInspFore.quantity = this.$.cantidad.getValue();

				var barnyardsAux = this.$.barnyards.getValue().split(",");
				for (i in barnyardsAux) {
					barnyardsAux[i] = barnyardsAux[i].replace(" ", "");
					barnyardsAux[i] = this.$.zone.getIndex()
							+ barnyardsAux[i].toUpperCase();
					var auxBarn = cacheBY.getByBarnyard(barnyardsAux[i]);
					if (auxBarn == undefined) {
						cacheMan.setMessage("", "[Exception ID: LOCAL"
								+ "] Descripción: No existe el corral: "
								+ barnyardsAux[i].slice(1)
								+ " para la localidad: "
								+ this.$.zone.getValue());
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
