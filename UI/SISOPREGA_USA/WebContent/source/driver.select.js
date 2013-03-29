enyo
		.kind({
			name : "driver.select",
			kind : enyo.VFlexBox,
			style : "padding:10px;font-size:17px;",
			components : [
					{
						kind : enyo.HFlexBox,
						align : "center",
						pack : "center",
						height : "40px;",
						components : [ {
							content : "Transportista:",
							width : "103px;",
							style : "text-align: right;margin-right:10px;"
						}, {
							kind : "controls.autocomplete",
							inputKind : "ToolInput",
							name : "carrier",
							flex : 1,
							height : "35px;",
							hint : "Transportista",
						// style:"max-width: 500px;"
						} ]
					},
					{
						kind : enyo.HFlexBox,
						align : "center",
						pack : "center",
						height : "40px;",
						components : [ {
							content : "Placas:",
							width : "103px;",
							style : "text-align: right;margin-right:10px;"
						}, {
							kind : "ToolInput",
							name : "plate",
							hint : 'Placas',
							flex : 1,
						// style:"max-width: 500px;"
						}, ]
					},
					{
						kind : enyo.HFlexBox,
						align : "center",
						pack : "center",
						height : "40px;",
						components : [ {
							content : "Chofer:",
							width : "103px;",
							style : "text-align: right;margin-right:10px;"
						}, {
							kind : "ToolInput",
							name : "driver",
							hint : 'Chofer',
							flex : 1,
						// style:"max-width: 500px;"
						}, ]
					},
					{
						kind : enyo.HFlexBox,
						align : "center",
						pack : "center",
						height : "40px;",
						components : [
								{
									content : "Fecha y Hora:",
									width : "103px;",
									style : "text-align: right;margin-right:10px;"
								},
								{
									kind : "ToolInput",
									name : "releaseDate",
									hint:"mes/dia/año",
									// width : "103px;",
									flex : 1,
									height : "35px;",
									onfocus : "applyMask",
								// style:"text-align: right;max-width: 500px;"
								},
//								{
//									content : 'mes/dia/año',
//									className : "listFirst",
//									style : "background-color:#DABD8B;margin-left:2px;font-size:12px;",
//									width : "80px;"
//								},
								{
									kind : "ToolInput",
									name : "releaseTime",
									// width : "103px;",
									hint:"HH:MM",
									flex : 1,
									height : "35px;",
									onfocus : "applyTimeMask",
								// style:"text-align: right;max-width: 500px;"
								}
								]
					},
					{
						kind : enyo.HFlexBox,
						align : "center",
						height : "40px;",
						style : "font-size:14px;",
						components : [
								{
									kind : enyo.Button,
									caption : "Guardar",
									onclick : "save_click",
									style : "background-color: #DABD8B;margin-left:115px;"
								}, {
									kind : enyo.Spacer
								}, ]
					}
			// ]},
			],
			agregar_click : function() {

				var newObject = {
					clase : this.$.clase.getValue(),
					cabezas : this.$.cabezas.getValue(),
					corrales : this.$.corrales.getValue()
				};

				this.arrDetail.push(newObject);
				this.updateList();

				this.$.detailScroller.scrollTo(this.$.detailScroller
						.getBoundaries().bottom, 0);
			},
			afterUpdate : function() {
				this.updateList();
			},
			ready : function() {
				this.$.releaseDate.setValue(utils.dateOut(new Date()));
				this.$.releaseDate.$.input.applyStyle("text-align", "left");
				 this.$.carrier.setItems(cacheDrivers.getAllForList());
			},
			updateWeight : function(inSender, inEvent) {
				var objReception = cacheReceptions
						.getByID(this.arrReceptions[inEvent.rowIndex].reception_id);
				cacheReceptions.updateRejectsWeight(objReception, this.$.weight
						.getValue(), this, "afterUpdate");
			},
			weight_changed : function(inSender, inEvent) {
				if (parseFloat(this.arrReceptions[inEvent.rowIndex].weight_rejected) == parseFloat(this.$.weight
						.getValue())) {
					this.$.btnSave.hide();
				} else {
					this.$.btnSave.show();
				}
			},
			applyMask : function(inSender) {
				var _id = inSender.$.input.getId();
				jQuery(function(j) {
					j(document.getElementById(_id)).mask('99/99/9999');
				});
			},
			applyTimeMask:function(inSender){
				var _id = inSender.$.input.getId();
				jQuery(function(j) {
					j(document.getElementById(_id)).mask('99:99');
				});
			}
		});