enyo
		.kind({
			name : "sales",
			kind : enyo.VFlexBox,
			arrReceptions : null,
			components : [ {
				kind : enyo.VFlexBox,
				style : "padding:20px;",
				pack : "center",
				components : [ {
					kind : enyo.HFlexBox,
					align : "center",
					height : "40px;",
					components : [ {
						content : "Fecha:",
						width : "80px;"
					}, {
						kind : "ToolInput",
						name : "saleDate",
						width : "135px;",
						height : "35px;",
					} ]
				}, {
					kind : enyo.HFlexBox,
					align : "center",
					height : "40px;",
					components : [ {
						content : "Cliente:",
						width : "80px;"
					}, {
						kind : "controls.autocomplete",
						name : "customer",
						width : "500px;",
						height : "35px;",
					} ]
				} ]
			}, {

			}, {
				kind : "HFlexBox",
				className : "listFirst",
				style : "font-size:13px;background-color:#DABD8B;",
//				layoutKind : enyo.HFlexLayout,
				align : "center",
				pack : "start",
				components : [ {
					kind : "ToolInput",
					hint : 'Clase',
					width : "150px;",
					style : "margin-right: 15px;"
				}, {
					kind : "ToolInput",
					hint : 'Cabezas',
					width : "150px;",
					style : "margin-right: 15px;"
				}, {
					kind : "ToolInput",
					hint : "Corrales",
					width : "300px;",
					style : "margin-right: 15px;"
				}, {
					kind : enyo.Button,
					caption : "Agregar"
				},
				]
			}, {
				kind : enyo.Scroller,
				flex : 1,
				className : "listBG",
				components : [ {
					kind : enyo.VirtualRepeater,
					name : "weightsList",
					onSetupRow : "setupRow",
					components : [ {
						kind : enyo.Item,
						layoutKind : enyo.HFlexLayout,
						align : "center",
						pack : "start",
						height : "65px",
						components : [ {
							receptionId : null
						}, {
							name : 'date',
							className : "listSecond",
							style : "width:80px;padding-right:20px;"
						}, {
							name : 'rancher',
							className : "listSecond",
							style : "width:170px;padding-right:20px;"
						}, {
							name : "hc",
							label : "HC",
							className : "listSecond",
							style : "width:70px;padding-right:20px;"
						}, {
							name : "weight",
							kind : "ToolInput",
							width : "70px;",
							hint : "Peso",
							oninput : "weight_changed"
						}, {
							name : 'btnSave',
							kind : enyo.Button,
							caption : "Guardar",
							onclick : "updateWeight",
							style : "width:55px;margin-left:20px;height:20px;"

						} ]
					} ]
				} ]
			} ],
			setupRow : function(inSender, inIndex) {
				// var obj;
				// if(this.arrReceptions[inIndex]){
				// if (obj=this.arrReceptions[inIndex]){
				// if(obj.inspections.length > 0){
				// this.$.date.setContent(obj.arrival_date);
				// this.$.rancher.setContent(obj.rancher_name);
				// var sum_HCR = 0;
				// for(var i=0; i<obj.inspections.length;i++){
				// sum_HCR += parseInt(obj.inspections[i].rejected_count);
				// }
				// this.$.hc.setContent(sum_HCR);
				// if(obj.weight_rejected && parseFloat(obj.weight_rejected)>0){
				// this.$.weight.setValue(obj.weight_rejected);
				// this.$.weight.$.input.applyStyle("color","#1E1C1B");
				// }
				//					
				// return true;
				// }
				// }
				// }
			},
			afterUpdate : function() {
				this.updateList();
			},
			ready : function() {
				this.$.weight.$.input.applyStyle("text-align", "right");
				this.$.btnSave.hide();
				// this.updateList();
			},
			updateList : function() {
				this.arrReceptions = cacheReceptions.get();

				for ( var i = this.arrReceptions.length - 1; i > 0; i--) {
					if (this.arrReceptions[i].inspections.length == 0) {
						this.arrReceptions.splice(i, 1);
					}
				}
				this.arrReceptions.sort(function(a, b) {
					return parseInt(a.reception_id) - parseInt(b.reception_id);
				});
				this.$.weightsList.render();
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
		});