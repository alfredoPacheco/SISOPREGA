enyo
		.kind({
			name : "shipments",
			kind : enyo.VFlexBox,
			style : "min-width: 620px;background-color:#DABD8B;",
			arrDetail : [],
			hc : 0,
			weight : 0,
			events : {
				onProgram : "",
				onCancel : ""
			},
			components : [
					{
						kind : "HFlexBox",
						className : "listFirst",
						style : "font-size:15px;background-color:#DABD8B;border-bottom-style: solid;border-bottom-color: #482400;padding-left: 10px;",
						height : "30px",
						align : "center",
						pack : "center",
						components : [ {
							content : 'Cliente',
							// className : "listSecond",
							style : "width:210px;margin-right:15px;",
						}, {
							content : 'Cabezas',
							// className : "listSecond",
							style : "width:80px;margin-right:15px;"
						}, {
							content : "Clase",
							// className : "listSecond",
							style : "width:150px;margin-right:15px;"
						}, {
							content : "Peso (Lbs.)",
							style : "width:80px;margin-right:15px;"
						}, {
							width : "30px;"
						} ]
					},
					{
						kind : enyo.Scroller,
						name : "detailScroller",
						flex : 1,
						// className : "listBG",
						style : "background-color: #482400;",
						// style:"background-image:url('images/images
						// (3).jpg');background-repeat:repeat;margin-top: 5px;",
						components : [ {
							kind : enyo.VirtualRepeater,
							name : "list",
							onSetupRow : "setupRow",
							onmousedown : "list_mouseDown",
							components : [ {
								kind : enyo.Item,
								layoutKind : enyo.HFlexLayout,
								align : "center",
								pack : "center",
								height : "50px",
								className : "listBG",
								components : [ {
									name : 'detail_client',
									className : "listSecond",
									style : "width:210px;margin-right:15px;",
								}, {
									name : 'detail_hc',
									className : "listSecond",
									style : "width:80px;margin-right:15px;",
								}, {
									name : 'detail_class',
									className : "listSecond",
									style : "width:150px;margin-right:15px;"
								}, {
									name : "detail_weight",
									className : "listSecond",
									style : "width:80px;margin-right:15px;"
								}, {
									name : "detail_selection",
									kind : enyo.CheckBox,
									onclick : "checkBox_click"
								}, ]
							} ]
						} ]
					},
					{
						kind : enyo.VFlexBox,
						style : "padding:20px;border-top-style: solid;border-top-color:#482400",
						pack : "center",

						components : [
								{
									kind : enyo.HFlexBox,
									align : "center",
									height : "40px;",
									style : "font-size:14px;",
									components : [
											{
												content : "Total Cabezas:",
											},
											{
												content : '0',
												name : "totalHC",
												className : "listFirst",
												style : "background-color:#DABD8B;margin-left:10px",
												width : "60px;"
											},
											{
												content : "Total Peso:",
											},
											{
												content : '0',
												name : "totalWeight",
												className : "listFirst",
												style : "background-color:#DABD8B;margin-left:10px;",
												width : "60px;"
											}, {
												kind : "Spacer"
											}, {
												name : "warning",
												content : "",
												style : "color:red"
											} ]
								},
								{
									kind : enyo.HFlexBox,
									align : "center",
									height : "40px;",
									style : "font-size:14px;",
									components : [
											{
												kind : enyo.Spacer
											},
											{
												kind : enyo.Button,
												caption : "Programar",
												onclick : "doProgram",
												style : "background-color: #DABD8B;max-width: 140px;min-width:70px;",
												flex : 1

											},
											{
												kind : enyo.Button,
												caption : "Cancelar",
												onclick : "doCancel",
												style : "background-color: #DABD8B;max-width: 140px;min-width:70px;",
												flex : 1

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

				this.$.detailScroller.scrollTo(this.$.detailScroller
						.getBoundaries().bottom, 0);
			},
			setupRow : function(inSender, inIndex) {
				if (inIndex < 50) {
					this.$.detail_client.setContent("Cliente " + inIndex + 1);
					this.$.detail_hc.setContent("12");
					this.$.detail_class.setContent("Clase  " + inIndex + 1);
					this.$.detail_weight.setContent("8150.11");
					return true;
				}

			},
			afterUpdate : function() {
				this.updateList();
			},
			ready : function() {
				// this.$.saleDate.setValue(utils.dateOut(new Date()));
				// this.$.saleDate.$.input.applyStyle("text-align", "center");
				// this.$.weight.$.input.applyStyle("text-align", "right");
				// this.$.btnSave.hide();
				// this.updateList();
			},
			updateList : function() {
				this.$.list.render();
			},
			applyMask : function(inSender) {
				var _id = inSender.$.input.getId();
				jQuery(function(j) {
					j(document.getElementById(_id)).mask('99/99/9999');
				});
			},
			checkBox_click : function(inSender, inEvent) {
				this.arrDetail[inEvent.rowIndex].checked = inSender.checked;
				this.calculateTotals();
			},
			calculateTotals : function() {
				var hc = 0;
				var weight = 0;
				for ( var i = 0; i < this.arrDetail.length; i++) {
					if(this.arrDetail[i].checked){
						hc += parseInt(this.arrDetail[i].cabezas);
						weight += 8150.11;	
					}else{
						hc -= parseInt(this.arrDetail[i].cabezas);
						weight -= 8150.11;
					}
					
				}
				this.$.totalHC.setContent(utils.formatNumberThousands(hc));
				this.$.totalWeight.setContent(utils
						.formatNumberThousands(weight));
				this.checkQuantity();
			},
			checkQuantity : function() {
				if (this.weight > 50000)
					this.$.warning
							.setContent("Usted esta programando un embarque superior a 50,000 libras.");
				else
					this.$.warning.setContent("");
			},
			list_mouseDown : function(inSender) {
				// console.debug(inSender);
			}
		});
