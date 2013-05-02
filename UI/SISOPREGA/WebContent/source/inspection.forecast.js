enyo
		.kind({
			name : "inspection.forecast",
			kind : enyo.SlidingView,
			layoutKind : enyo.VFlexLayout,
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
			arrAutocompleteFilter:[],
			defaultZone : undefined,
			defaultCattle : undefined,
//			barnyardsFilter:undefined,
			actualFilter:{
					rancher_id : "",
					zone_id:"",
					origin_id : "",
					cattle_type_id : "",
					reception_id : "", //reception for barnyards
			},
			actualAutocompleteFilter:{
				rancher_id : undefined,
				zone_id:undefined,
				origin_id : undefined,
				cattle_type_id : undefined,
				reception_id : undefined, //reception for barnyards
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
							components : [ 
//							               {
//								kind : "Header",
//								name : "encabezadoFecha",
//								style : "background-color:#DABD8B;",
//								pack : "center",
//								components : [ 
//								               {
//									kind : "Button",
//									content : "Hoy",
//									style : "background-color:#DABD8B;",
//									onclick : "cambiarAHoy"
//								}, 
//								{
//									kind : "DatePicker",
//									label : "",
//									name : "fechaPicker",
//									onChange : "cambioDeFecha"
//								} ]
//							}, 
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
									components : [ {
										kind : "Item",
										components : [ {
											layoutKind : enyo.HFlexLayout,
											components : [ {
												kind : "controls.autocomplete",
												name : "rancher",
												hint : "Ganadero",
												onSelectItem:"on_select_item",
												onEnter:"emularTabulacionConEnter"
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
												onSelectItem:"on_select_item",
												onEnter:"emularTabulacionConEnter"
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
												flex : 1,
												onkeydown:"key_down"
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
												onSelectItem:"on_select_item",
												onEnter:"emularTabulacionConEnter"
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
												onSelectItem:"on_select_item",
												onEnter:"emularTabulacionConEnter"
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
												flex : 1,
												onkeydown:"key_down"
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
												onSelectItem:"on_select_item",
												onEnter:"emularTabulacionConEnter"
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
										style : "font-size:13px;background-color:#DABD8B;",
										components : [
												{
												    kind : "enyo.IconButton",
												    name : "btnReport",
												    icon : "images/menu-icon-cards.png",
												    onclick : "enviar_aviso",
												    style : "width:30px;"
												  },
												{
													content : "Ganadero",
													style : "width:150px;text-align:right;margin-right:35px;"
												},
												{
													content : "Autorizaci�n",
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
													style : "width:100px;text-align:left;"
												}
												
												]
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
															style : "width:215px;text-align:right;margin-right:35px;",
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
															style : "width:100px;text-align:left;",
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
			emularTabulacionConEnter:function(inSender){
				switch(inSender.name){
				case "rancher":
					this.$.rancher.setIndex(this.$.rancher.getIndex());
					this.$.zone.setFocus();
					break;
				case "zone":
					this.$.zone.setIndex(this.$.zone.getIndex());
					this.$.autorizacion.forceFocus();
					break;
				case "autorizacion":
					this.$.origin.setFocus();
					break;
				case "origin":
					this.$.origin.setIndex(this.$.origin.getIndex());
					this.$.cattle_type.setFocus();
					break;		
				case "cattle_type":
					this.$.cattle_type.setIndex(this.$.cattle_type.getIndex());
					this.$.cantidad.forceFocus();
					break;
				case "cantidad":
					this.$.barnyards.setFocus();
					break;
				case "barnyards":
					if (this.$.draAdd.open){
						this.saveInspectionForecast();
					}else if (this.$.draUpdate.open){
						this.updateForecast();
					}
					this.$.rancher.setFocus();
					break;
				}
			},
			key_down:function(inSender, inEvent){
				if(inEvent.keyCode == 13){
					this.emularTabulacionConEnter(inSender);
				}
			},
			ready : function() {
				this.arrActiveReceptions = cacheReceptions.get();
				this.arrFilter = this.arrActiveReceptions;
				
				this.$.rancher.setItems(cacheRanchers.getAllForList());
				this.$.cattle_type.setItems(cacheCattle.getAllCattleType());
				this.$.zone.setItems(cacheMan.getAllZonesForList());
				this.$.origin.setItems(cacheMan.getAllLocationsForList());
								
//				if(this.$.zone.getItems().length > 0 ){
//					this.defaultZone = this.$.zone.getFirstOne().value;	
//				}
//				if(this.$.cattle_type.getItems().length > 0 ){
//					this.defaultCattle = this.$.cattle_type.getFirstOne().value;	
//				}
//				
//				this.load_barnyards();
//				this.$.barnyards.setItems(this.$.barnyards.getFilter());
				
				var fmt = new enyo.g11n.DateFmt({
					format : "yyyy/MM/dd",
					locale : new enyo.g11n.Locale("es_es")
				});
				this.fecha = fmt.format(new Date());
				this.updateList();
//				this.$.fechaPicker.setValue(new Date());
//				this.cambioDeFecha();
			},
			updateList : function() {
				//initializing forecast master values***********************
				this._id = undefined;
				this.totalItems = 0;
				this.objList = [];
				var arrAllForecasts = [];
				this.iSelected = null;
				//**********************************************************
				
				//add mode buttons
				this.$.draDel.setOpen(false);
				this.$.draUpdate.setOpen(false);
				this.$.draAdd.setOpen(true);
				
				//reset values and load combos
				this.resetValues();
				
				//filling up right side**************************************
				arrAllForecasts = cacheInspFore.get();
				for (var i =0;i<arrAllForecasts.length;i++) {
					if (arrAllForecasts[i].fore_date == this.fecha) {
						this._id = arrAllForecasts[i].id;
						if (arrAllForecasts[i].fore_details_id) {
							this.objList.push(arrAllForecasts[i]);
						}
					}
				}
				this.$.forecastList.render();
				//***********************************************************
			},
			resetValues : function() {
				//cleaning fileds:
				this.$.rancher.clear();
				this.$.autorizacion.setValue("");
				this.$.origin.clear();
				this.$.cattle_type.clear();
				this.$.cantidad.setValue("");
				this.$.zone.clear();
				this.$.barnyards.clear();
				
				//cleaning filter:
				this.actualFilter.rancher_id = "";
				this.actualFilter.zone_id = "";
				this.actualFilter.origin_id = "";
				this.actualFilter.cattle_type_id = "";
				this.actualFilter.reception_id = "";
				
				this.arrFilter = this.arrActiveReceptions;
				
				if(this.$.zone.getItems().length > 0 ){
					this.defaultZone = this.$.zone.getFirstOne().value;	
				}
				if(this.$.cattle_type.getItems().length > 0 ){
					this.defaultCattle = this.$.cattle_type.getFirstOne().value;	
				}
				
				this.load_combos();
				this.$.barnyards.setItems(this.$.barnyards.getFilter());
				this.autoCompleteFields();
			},
//			cambioDeFecha : function() {
//				var fmt = new enyo.g11n.DateFmt({
//					format : "yyyy/MM/dd",
//					locale : new enyo.g11n.Locale("es_es")
//				});
//				this.fecha = fmt.format(this.$.fechaPicker.getValue());
//				
////				this.$.cattle_type.setIndex(1);
////				this.$.zone.setIndex(1);
//				
//				this.updateList();
//				
//			},
//			cambiarAHoy : function() {
//				this.$.fechaPicker.setValue(new Date());
//				this.cambioDeFecha();
//			},
			autoCompleteFields:function(){
				if(this.arrAutocompleteFilter.length == 0) this.arrAutocompleteFilter = this.arrFilter;
				
					if (this.$.rancher.getHighLighted() && !this.actualAutocompleteFilter.rancher_id){
						if(this.arrAutocompleteFilter.length ==1){
							this.actualAutocompleteFilter.rancher_id =true;
							this.$.rancher.index=this.arrAutocompleteFilter[0].rancher_id;
							this.$.rancher.setValue(this.arrAutocompleteFilter[0].rancher_name);
//							this.arrAutocompleteFilter =this.filterByRancher(this.$.rancher.index, this.arrAutocompleteFilter);
//							this.autoCompleteFields();
//							return;
						}else{
							this.$.rancher.index=-1;
							this.$.rancher.setValue("");
						}
					}
					
					if (this.$.zone.getHighLighted()&& !this.actualAutocompleteFilter.zone_id){
						if(this.defaultZone){
							this.$.zone.index=this.defaultZone;
							this.actualAutocompleteFilter.zone_id =true;
							var oZone = cacheMan.getZoneByID(this.$.zone.index);
							if(oZone){
								this.$.zone.setValue(oZone.zone_name);
							}else{
								this.$.zone.setValue("");
							}
						}else{
							if(this.arrAutocompleteFilter.length ==1){
								this.actualAutocompleteFilter.zone_id =true;
								this.$.zone.index=this.arrAutocompleteFilter[0].zone_id;							
								var oZone = cacheMan.getZoneByID(this.$.zone.index);
								if(oZone){
									this.$.zone.setValue(oZone.zone_name);
								}else{
									this.$.zone.setValue("");
								}
							}
							else{
								this.$.zone.index=-1;
								this.$.zone.setValue("");
							}
						}
					}
					
					if (this.$.origin.getHighLighted()&& !this.actualAutocompleteFilter.origin_id){
						if(this.arrAutocompleteFilter.length ==1){
							this.actualAutocompleteFilter.origin_id =true;
							this.$.origin.index=this.arrAutocompleteFilter[0].location_id;
							this.$.origin.setValue(this.arrAutocompleteFilter[0].location_name);
//							this.arrAutocompleteFilter =this.filterByOrigin(this.$.origin.index, this.arrAutocompleteFilter);
//							this.autoCompleteFields();
						}
						else{
							this.$.origin.index=-1;
							this.$.origin.setValue("");
						}
					}
					if (this.$.cattle_type.getHighLighted()&& !this.actualAutocompleteFilter.cattle_type_id){
						if(this.arrAutocompleteFilter.length ==1){
							this.actualAutocompleteFilter.cattle_type_id =true;
							this.$.cattle_type.index=this.arrAutocompleteFilter[0].cattype_id;
							this.$.cattle_type.setValue(this.arrAutocompleteFilter[0].cattype_name);
//								this.arrAutocompleteFilter =this.filterByCattle(this.$.cattle_type.index, this.arrAutocompleteFilter);
//								this.autoCompleteFields();
						}
						else{
							if(this.defaultCattle){
								this.actualAutocompleteFilter.cattle_type_id =true;
								this.$.cattle_type.index=this.defaultCattle;
								var oCattle = cacheCattle.getByID(this.$.cattle_type.index);
								if(oCattle){
									this.$.cattle_type.setValue(oCattle.cattype_name);	
								}else{
									this.$.cattle_type.setValue("");
								}
							}else{
								this.$.cattle_type.index=-1;
								this.$.cattle_type.setValue("");
							}
						}
					}
					if (this.$.barnyards.getHighLighted() && !this.actualAutocompleteFilter.reception_id){
						this.$.barnyards.value=-1;
						this.$.barnyards.setText("");
						if(this.arrAutocompleteFilter.length ==1){
							var arrBY = this.$.barnyards.getFilter();
							for (var i=0;i<arrBY.length;i++){
								if(arrBY[i].value == this.arrAutocompleteFilter[0].reception_id){
									this.actualAutocompleteFilter.reception_id =true;
									this.$.barnyards.value=arrBY[i].value;
									this.$.barnyards.setText(arrBY[i].caption);
								}
							}	
						}
					}
					
				this.arrAutocompleteFilter = [];
				this.actualAutocompleteFilter={
					rancher_id : undefined,
					zone_id:undefined,
					origin_id : undefined,
					cattle_type_id : undefined,
					reception_id : undefined, //reception for barnyards
				};
			},
			on_select_item: function(InSender, InEvent){
				switch(InSender.name){
				case "rancher":
					this.actualFilter.rancher_id = InSender.index;
					break;
				case "zone":
					this.actualFilter.zone_id = InSender.index;
					this.defaultZone = InSender.index;
					this.load_barnyards();
//					this.barnyardsFilter.zone_id = this.defaultZone;
//					this.$.barnyards.setFilterCriteria(this.barnyardsFilter);
					break;
				case "origin":
					this.actualFilter.origin_id = InSender.index;
					break;
				case "cattle_type":
					this.actualFilter.cattle_type_id = InSender.index;
					this.defaultCattle = InSender.index;
//					this.barnyardsFilter.cattype_id = this.defaultCattle;
//					this.$.barnyards.setFilterCriteria(this.barnyardsFilter);
					break;
				case "barnyards":
					this.actualFilter.reception_id = InSender.index;					
					break;
				}
				this.applyFilter();
				
				this.autoCompleteFields();
				
			},
			applyFilter:function(){
				this.arrFilter = this.arrActiveReceptions;
				if(this.actualFilter.rancher_id != "" && this.actualFilter.rancher_id > -1){
					this.arrFilter = this.filterByRancher(this.actualFilter.rancher_id, this.arrFilter);
				}
				if(this.actualFilter.zone_id != "" && this.actualFilter.zone_id > -1){
//					this.arrFilter = this.filterByZone(this.actualFilter.zone_id, this.arrFilter);
				}
				if(this.actualFilter.origin_id != "" && this.actualFilter.origin_id > -1){
					this.arrFilter = this.filterByOrigin(this.actualFilter.origin_id, this.arrFilter);
				}
				if(this.actualFilter.cattle_type_id != "" && this.actualFilter.cattle_type_id > -1){
					this.arrFilter = this.filterByCattle(this.actualFilter.cattle_type_id, this.arrFilter);
				}
				if(this.actualFilter.reception_id != "" && this.actualFilter.reception_id > -1){
					this.arrFilter = this.filterByReception(this.actualFilter.reception_id, this.arrFilter);
				}
			},
			filterByRancher:function(rancher_id, arrAfected){				
				var arrResult = [];
				if (rancher_id > -1){
					if(arrAfected.length > 0){
						for(var i =0;i<arrAfected.length;i++){
							if (arrAfected[i].rancher_id == rancher_id){
								arrResult.push(arrAfected[i]);
							}
						}
					}else{
						for (var i=0;i<this.arrActiveReceptions.length;i++){
							if (this.arrActiveReceptions[i].rancher_id == rancher_id){
								arrResult.push(this.arrActiveReceptions[i]);
							}
						}	
					}
				}
				return arrResult;
			},
			filterByZone:function(zone_id, arrAfected){				
				var arrResult = [];
				if (parseInt(zone_id) > -1){
					if(arrAfected.length > 0){
						for(var i =0;i<arrAfected.length;i++){
							if (parseInt(arrAfected[i].zone_id) == parseInt(zone_id)){
								arrResult.push(arrAfected[i]);
							}
						}
					}else{
						for (var i=0;i<this.arrActiveReceptions.length;i++){
							if (parseInt(this.arrActiveReceptions[i].zone_id) == parseInt(zone_id)){
								arrResult.push(this.arrActiveReceptions[i]);
							}
						}	
					}
				}
				return arrResult;
			},
			filterByOrigin:function(location_id, arrAfected){				
				var arrResult = [];
				if (location_id > -1){
					if(arrAfected.length > 0){
						for(var i =0;i<arrAfected.length;i++){
							if (arrAfected[i].location_id == location_id){
								arrResult.push(arrAfected[i]);
							}
						}
					}else{
						for (var i=0;i<this.arrActiveReceptions.length;i++){
							if (this.arrActiveReceptions[i].location_id == location_id){
								arrResult.push(this.arrActiveReceptions[i]);
							}
						}	
					}
				}
				return arrResult;	
			},
			filterByCattle:function(cattype_id, arrAfected){				
				var arrResult = [];
				if (cattype_id > -1){
					if(arrAfected.length > 0){
						for(var i =0;i<arrAfected.length;i++){
							if (arrAfected[i].cattype_id == cattype_id){
								arrResult.push(arrAfected[i]);
							}
						}
					}else{
						for (var i=0;i<this.arrActiveReceptions.length;i++){
							if (this.arrActiveReceptions[i].cattype_id == cattype_id){
								arrResult.push(this.arrActiveReceptions[i]);
							}
						}	
					}							
				}
				return arrResult;
			},
			filterByReception:function(reception_id, arrAfected){				
				var arrResult = [];
				if (reception_id > -1){
					if(arrAfected.length > 0){
						for(var i =0;i<arrAfected.length;i++){
							if (arrAfected[i].reception_id == reception_id){
								arrResult.push(arrAfected[i]);
							}
						}
					}else{
						for (var i=0;i<this.arrActiveReceptions.length;i++){
							if (this.arrActiveReceptions[i].reception_id == reception_id){
								arrResult.push(this.arrActiveReceptions[i]);
							}
						}	
					}
				}
				return arrResult;
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
					for (var i=0;i<this.arrFilter.length;i++){
						var obj = {
								value:		this.arrFilter[i].rancher_id,
								caption:	this.arrFilter[i].rancher_name
						};
						if(!(arrResult[obj.value] in arrResult)){
							arrResult[obj.value]=obj;	
						}
					}
				}
					
				for(var i=0;i<arrResult.length;i++){
					result.push(arrResult[i]);
				}

				this.$.rancher.setFilter(result);
			},
			load_zones:function(){
				var arrResult = [];
				var result = [];
				if(this.arrFilter.length>0){
					for (var i= 0;i<this.arrFilter.length;i++){
						var obj = {
								value:		this.arrFilter[i].zone_id,
								caption:	""
						};
						var oZone = cacheMan.getZoneByID(this.arrFilter[i].zone_id);
						if(oZone){obj.caption = oZone.zone_name;}
						if(!(arrResult[obj.value] in arrResult)){
							arrResult[obj.value]=obj;	
						}
					}
				}
				for(var i=0;i<arrResult.length;i++){
					result.push(arrResult[i]);
				}
				this.$.zone.setFilter(result);
			},
			load_origins:function(){
				var arrResult = [];
				var result = [];
				if(this.arrFilter.length>0){
					for (var i= 0;i<this.arrFilter.length;i++){
						var obj = {
								value:		this.arrFilter[i].location_id,
								caption:	this.arrFilter[i].location_name
						};
						if(!(arrResult[obj.value] in arrResult)){
							arrResult[obj.value]=obj;	
						}
					}
				}
				for(var i=0;i<arrResult.length;i++){
					result.push(arrResult[i]);
				}
				this.$.origin.setFilter(result);
			},
			load_cattles:function(){
				var arrResult = [];
				var result = [];
				if(this.arrFilter.length>0){
					for (var i =0;i<this.arrFilter.length;i++){
						var obj = {
								value:		this.arrFilter[i].cattype_id,
								caption:	this.arrFilter[i].cattype_name
						};
						if(!(arrResult[obj.value] in arrResult)){
							arrResult[obj.value]=obj;	
						}
					}
				}
				for(var i=0;i<arrResult.length;i++){
					result.push(arrResult[i]);
				}
				this.$.cattle_type.setFilter(result);
			},
			load_barnyards:function(){
				var arrResult = [];
				var result = [];
				if(this.arrActiveReceptions.length>0){
					for (var i =0;i<this.arrActiveReceptions.length;i++){
						var auxCaption = "";
						for(var j in this.arrActiveReceptions[i].barnyards){
						    if(this.arrActiveReceptions[i].barnyards.hasOwnProperty(j))
							if (parseInt(this.arrActiveReceptions[i].barnyards[j].substring(1,0)) == parseInt(this.defaultZone)){
								auxCaption += this.arrActiveReceptions[i].barnyards[j].substring(1) + ", ";	
							}
						}
						if(auxCaption.length > 0){
							auxCaption = auxCaption.slice(0, -2);
							var obj = {
									value:			this.arrActiveReceptions[i].reception_id,
									caption:		auxCaption
//									cattype_id:	this.arrFilter[i].cattype_id,
//									zone_id:	this.arrFilter[i].zone_id
							};						
							if(!(arrResult[obj.value] in arrResult)){
								arrResult[obj.value]=obj;	
							}	
						}
					}
				}
				for(var i=0;i<arrResult.length;i++){
					result.push(arrResult[i]);
				}
				this.$.barnyards.setFilter(result);
			},
			addRancherSelected:function(rancher_id){
				if (rancher_id > -1){
					for (var i = 0; i<this.arrReceptions.length;i++){
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
			selectForecast : function(inSender, inEvent) {
				if (objFore = this.objList[inEvent.rowIndex]) {
					this.$.rancher.setIndex(objFore.rancher_id);
					this.$.autorizacion.setValue(objFore.auth);
					this.$.origin.setIndex(objFore.origin);
					this.$.cattle_type.setIndex(objFore.cattle_type);
					
					this.$.cantidad.setValue(objFore.quantity);
					this.$.zone.setIndex(objFore.zone_id);
					if (objFore.barnyards.length > 0) {
						var strBarnyards = "";
						for (var i = 0;i<objFore.barnyards.length;i++) {
							strBarnyards = strBarnyards
									+ objFore.barnyards[i].barnyard_code + ", ";

						}
						strBarnyards = strBarnyards.slice(0, -2);
						this.$.barnyards.setText(strBarnyards);
					} else {
						this.$.barnyards.setText("");
					}
					this.$.barnyards.setHighLighted(false);
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
					var oOrigin = cacheMan.getLocationByID(objFore.origin);
					if(oOrigin){
						this.$.listOrigin.setContent(oOrigin.location_name);	
					}else{
						this.$.listOrigin.setContent("");
					}
					
					var oCattle = cacheCattle.getByID(objFore.cattle_type);
					if(oCattle){
						this.$.listCattleType.setContent(oCattle.cattype_name);	
					}else{
						this.$.listCattleType.setContent("");
					}
					
					this.$.listQuantity.setContent(objFore.quantity);
					
					var oZone = cacheMan.getZoneByID(objFore.zone_id);
					if(oZone){
						this.$.listZone.setContent(oZone.zone_name);
					}else{
						this.$.listZone.setContent("");
					}
					
					if (objFore.barnyards.length > 0) {
						var strBarnyards = "";
						for (var i = 0;i<objFore.barnyards.length;i++) {
							strBarnyards += objFore.barnyards[i].barnyard_code + ", ";
						}
						strBarnyards = strBarnyards.slice(0, -2);
						this.$.listBarnyards.setContent(strBarnyards);
					} else {
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

				var barnyardsAux = this.$.barnyards.getText().split(",");
				for (var i=0; i<barnyardsAux.length;i++) {
					barnyardsAux[i] = barnyardsAux[i].replace(" ", "");
					barnyardsAux[i] = this.$.zone.getIndex()
							+ barnyardsAux[i].toUpperCase();
					var auxBarn = cacheBY.getByBarnyard(barnyardsAux[i]);
					if (auxBarn == undefined) {
						cacheMan.setMessage("", "[Exception ID: LOCAL"
								+ "] Descripci�n: No existe el corral: "
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
			},
			enviar_aviso: function(){

				if(confirm("�Desea enviar los avisos ahora?")){
					// Send communication to customers				
					var customers_set = [];
					if(this.objList.length>0){
						for (var i = 0;i<this.objList.length;i++){
							if(!(customers_set[this.objList[i].rancher_id] in customers_set)){
								customers_set[this.objList[i].rancher_id]=this.objList[i].rancher_id;
								var report_name = 'ListaInspeccion?rancherId='
									+ this.objList[i].rancher_id;
								consumingGateway.SendReport(this.objList[i].rancher_id, report_name);
							}
						}
						alert("El aviso se ha enviado satisfactoriamente.");
					}else{
						cacheMan.setMessage("", "Error. No se ha creado la lista de inspecci�n.");
					}
				}
				
			}
		});
