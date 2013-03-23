enyo
		.kind({
			name : "sales",
			kind : enyo.VFlexBox,
			arrReceptions : null,
			arrDetail : [],
			components : [
					{
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
								onfocus : "applyMask"
							},
							{
								content : 'mes/dia/año',
								className : "listFirst",
								style : "background-color:#DABD8B;margin-left:2px;font-size:12px;",
								width:"80px;"
							},]
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
					},
					{

					},
					{
						kind : "HFlexBox",
						className : "listFirst",
						style : "padding-left:100px;",
						// style : "font-size:13px;background-color:#DABD8B;",
						// layoutKind : enyo.HFlexLayout,
						align : "center",
						pack : "start",
						components : [ {
							kind : "controls.autocomplete",
							name : "clase",
							hint : 'Clase',
							width : "150px;",
							style : "margin-right: 15px;"
						}, {
							kind : "ToolInput",
							name : "cabezas",
							hint : 'Cabezas',
							width : "150px;",
							style : "margin-right: 15px;"
						}, {
							kind : "ToolInput",
							name : "corrales",
							hint : "Corrales",
							width : "300px;",
							style : "margin-right: 15px;"
						}, {
							kind : enyo.Button,
							caption : "Agregar",
							onclick : "agregar_click"
						}, ]
					},
					{
						kind : "HFlexBox",
						className : "listFirst",
						style : "font-size:13px;background-color:#DABD8B;border-bottom-style: solid;border-bottom-color: #482400;",
						height : "30px",
						align : "center",
						pack : "start",
						components : [
								{
									content : 'Clase',
									// className : "listSecond",
									style : "width:153px;margin-right:15px;margin-left:107px;",
								}, {
									content : 'Cantidad',
									// className : "listSecond",
									style : "width:153px;margin-right:15px;"
								}, {
									content : "Corrales",
									// className : "listSecond",
									style : "width:300px;margin-right:15px;"
								}, {
									content : "Peso",
									style : "width:300px;margin-right:15px;"
								}, {
									style : "width:79px;margin-left:20px;"
								} ]
					},
					{
						kind : enyo.Scroller,
						name:"detailScroller",
						flex : 1,
						// className : "listBG",
						style : "background-color: #482400;",
						// style:"background-image:url('images/images
						// (3).jpg');background-repeat:repeat;margin-top: 5px;",
						components : [ {
							kind : enyo.VirtualRepeater,
							name : "weightsList",
							onSetupRow : "setupRow",
							components : [ {
								kind : enyo.Item,
								layoutKind : enyo.HFlexLayout,
								align : "center",
								pack : "start",
								height : "40px",
								className : "listBG",
								components : [
										{
											name : 'detail_number',
											className : "listSecond",
											style : "width:30px;margin-right:15px;margin-left:30px;color:#5F0712",
										},
										{
											name : 'detail_clase',
											className : "listSecond",
											style : "width:153px;margin-right:15px;margin-left:23px;",
										},
										{
											name : 'detail_cabezas',
											className : "listSecond",
											style : "width:153px;margin-right:15px;"
										},
										{
											name : "detail_corrales",
											label : "Corrales",
											className : "listSecond",
											style : "width:300px;margin-right:15px;"
										},
								// {
								// name : "weight",
								// kind : "ToolInput",
								// width : "70px;",
								// hint : "Peso",
								// oninput : "weight_changed"
								// }, {
								// name : 'btnSave',
								// kind : enyo.Button,
								// caption : "Guardar",
								// onclick : "updateWeight",
								// style :
								// "width:55px;margin-left:20px;height:20px;"
								//
								// }
								]
							} ]
						} ]
					},
					{
						kind : enyo.VFlexBox,
						style : "padding:20px;border-top-style: solid;border-top-color:#482400",
						pack : "center",
						
						components : [ {
							kind : enyo.HFlexBox,
							align : "center",
							height : "40px;",
							style:"font-size:14px;",
							components : [
									{
										content : "Total Cabezas:",
									},
									{
										content : '0',
										name : "totalHC",
										className : "listFirst",
										style : "background-color:#DABD8B;margin-left:10px",
										width:"60px;"
									},
									{
										content : "Total Peso:",
									},
									{
										content : '0',
										name : "totalWeight",
										className : "listFirst",
										style : "background-color:#DABD8B;margin-left:10px;",
										width:"60px;"
									},
									{kind:enyo.Spacer},
									{
										kind : enyo.Button,
										caption : "Efectuar Venta",
										onclick : "sell_click",
										style:"background-color: #DABD8B;"
									}

							]
						} ]
					} ],
			agregar_click : function() {

				var newObject = {
					clase : this.$.clase.getValue(),
					cabezas : this.$.cabezas.getValue(),
					corrales : this.$.corrales.getValue()
				};

				this.arrDetail.push(newObject);
				this.updateList();
				
				this.$.detailScroller.scrollTo(this.$.detailScroller.getBoundaries().bottom,0);
			},
			setupRow : function(inSender, inIndex) {
				if (this.arrDetail[inIndex]) {
					this.$.detail_number.setContent(inIndex + 1);
					this.$.detail_clase
							.setContent(this.arrDetail[inIndex].clase);
					this.$.detail_cabezas
							.setContent(this.arrDetail[inIndex].cabezas);
					this.$.detail_corrales
							.setContent(this.arrDetail[inIndex].corrales);
					return true;
				}

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
				this.$.saleDate.setValue(utils.dateOut(new Date()));
				this.$.saleDate.$.input.applyStyle("text-align","center");
				// this.$.weight.$.input.applyStyle("text-align", "right");
				// this.$.btnSave.hide();
				// this.updateList();
			},
			updateList : function() {
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
			applyMask : function(inSender) {
				var _id = inSender.$.input.getId();
				jQuery(function(j) {
					j(document.getElementById(_id)).mask('99/99/9999');
				});
			}
		});