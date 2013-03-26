enyo
		.kind({
			name : "catalogs.drivers.contacts",
			kind : enyo.VFlexBox,
			className : "formBG",
			// arrReceptions : null,
			obj : {contacts:[]},
			events : {
				onOk : ""
			},
			components : [
					{
						kind : "HFlexBox",
						className : "listFirst",
						style : "background-color:#DABD8B;border-bottom-style:solid;border-bottom-color: #482400;"
								+ "border-bottom-width:5px;",
						align : "center",
						pack : "start",
						components : [ {
							kind : "ToolInput",
							name : "contact",
							hint : 'Contacto',
							flex : 1
						// style : "margin-right: 15px;"
						}, {
							kind : "ToolInput",
							name : "phone",
							hint : "Telefono",
							width : "150px;",
							onfocus : "applyMask"
						// style : "margin-right: 15px;"
						}, {
							kind : enyo.Button,
							caption : "Agregar",
							onclick : "agregar_click"
						}, ]
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
							components : [ {
								kind : enyo.Item,
								layoutKind : enyo.HFlexLayout,
								align : "center",
								pack : "start",
								height : "40px",
								className : "listBG",
								components : [
										{
											name : 'detail_contact',
											className : "listSecond",
											style : "margin-right:15px;margin-left:30px;",
											flex : 1
										},
										{
											name : 'detail_phone',
											className : "listSecond",
											style : "max-width: 115px;margin-right:15px;margin-left:23px;",
										} ]
							} ]
						} ]
					}, {
						layoutKind : "HFlexLayout",
						align : "center",
						// style : "border-top-style:
						// solid;border-top-color:#482400;border-top-width:5px;",
						components : [ {
							kind : enyo.Spacer
						}, {
							kind : "Button",
							name : "ok_button",
							className : "enyo-button-affirmative",
							caption : "Aceptar",
							onclick : "ok_click",
							// flex:1
							width : "120px;"
						} ]
					} ],
			agregar_click : function() {

				var newContact = {
					contact : this.$.contact.getValue(),
					phone : this.$.phone.getValue(),
				};

				// this.arrDetail.push(newObject);

				cacheDrivers.addContact(this.obj, newContact, this,
						"updateList");

				this.$.detailScroller.scrollToBottom();
			},
			setupRow : function(inSender, inIndex) {
				if (this.obj.contacts[inIndex]) {
					this.$.detail_contact
							.setContent(this.obj.contacts[inIndex].contact);
					this.$.detail_phone
							.setContent(this.obj.contacts[inIndex].phone);
					return true;
				}
			},
			afterUpdate : function() {
				this.updateList();
			},
			ready : function() {
				// this.$.weight.$.input.applyStyle("text-align", "right");
				// this.$.btnSave.hide();
				this.updateList();
			},
			updateList : function() {
				this.$.list.render();
			},
			setObj : function(obj) {
				this.obj = obj;
			},
			ok_click : function() {
				this.doOk();
			},
			// updateWeight : function(inSender, inEvent) {
			// var objReception = cacheReceptions
			// .getByID(this.arrReceptions[inEvent.rowIndex].reception_id);
			// cacheReceptions.updateRejectsWeight(objReception, this.$.weight
			// .getValue(), this, "afterUpdate");
			// },
			// weight_changed : function(inSender, inEvent) {
			// if
			// (parseFloat(this.arrReceptions[inEvent.rowIndex].weight_rejected)
			// == parseFloat(this.$.weight
			// .getValue())) {
			// this.$.btnSave.hide();
			// } else {
			// this.$.btnSave.show();
			// }
			//
			// },
			applyMask : function(inSender) {
				var _id = inSender.$.input.getId();
				jQuery(function(j) {
					j(document.getElementById(_id)).mask('(999) 999-9999');
				});
			}
		});