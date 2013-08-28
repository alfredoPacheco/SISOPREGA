enyo
		.kind({
			name : "catalogs.drivers.contacts",
			kind : enyo.VFlexBox,
			className : "formBG",
			// arrReceptions : null,
			obj : {
				contacts : []
			},
			iSelected : null,
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
							layoutKind : "HFlexLayout",
							width:"140px;",							
							components : [ {
								kind : "Drawer",
								name : "draAdd",
								animate: false,
								components : [ {
									layoutKind : "HFlexLayout",
									align : "center",
									flex:1,
									components : [ {
										kind : "enyo.IconButton",
										name : "btnAdd",
										icon : "../SISOPREGA/images/menu-icon-new.png",
										onclick : "agregar_click",
										flex:1
									} ]
								} ]
							}, {
								kind : "Drawer",
								name : "draUpdate",
								animate: false,
								components : [ {
									layoutKind : "HFlexLayout",
									align : "center",
									flex:1,
									components : [ {
										kind : "enyo.IconButton",
										name : "btnUpdate",
										icon : "../SISOPREGA/images/btn_edit.png",
//										flex : 1,
										onclick : "update_click"
									}, {
										kind : "Button",
										name : "btnCancel",
										className : "enyo-button-negative",
										flex : 1,
										caption : "Cancelar",
										onclick : "cancel_click"
									}]
								} ]
							} ]
						}]
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
							onmousedown : "selectItem",
							components : [ {
								kind : enyo.SwipeableItem,
								onConfirm : "deleteItem",
								layoutKind : enyo.HFlexLayout,
								align : "center",
								pack : "start",
								height : "40px",
								className : "listBG",
								name : "swipeable_item",
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
							caption : "Cerrar",
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
				
				if(newContact.contact != "" && newContact.phone != ""){
					this.resetValues();
					cacheDrivers.addContact(this.obj, newContact, this,
							"updateList");

					this.$.detailScroller.scrollToBottom();					
				}else
					cacheMan.setMessage("","Verifique campos.");
				

			},
			deleteItem : function(inSender, inIndex) {
				if (cacheDrivers.delContact(this.obj,
						this.obj.contacts[inIndex], this, "updateList")) {
					return true;
				} else {
					return false;
				}
			},
			setupRow : function(inSender, inIndex) {
				if (this.obj.contacts[inIndex]) {
					this.$.detail_contact
							.setContent(this.obj.contacts[inIndex].contact);
					this.$.detail_phone
							.setContent(this.obj.contacts[inIndex].phone);
					if (this.iSelected == inIndex) {
						this.$.swipeable_item.applyStyle("background-color",
								"wheat");
					} else {
						this.$.swipeable_item.applyStyle("background-color",
								null);
					}

					return true;
				}
			},
			selectItem : function(inSender, inEvent) {
				if (this.obj.contacts[inEvent.rowIndex]) {
					this.iSelected = inEvent.rowIndex;
					this.updateList();
					this.toggleUpdate();
					this.$.contact.setValue(this.obj.contacts[this.iSelected].contact);
					this.$.phone.setValue(this.obj.contacts[this.iSelected].phone);
				}
			},
			afterUpdate : function() {
				this.updateList();
			},
			ready : function() {
				// this.$.weight.$.input.applyStyle("text-align", "right");
				// this.$.btnSave.hide();
				this.$.contact.setFocusClassName(null);
				this.$.phone.setFocusClassName(null);
				this.updateList();
				this.resetValues();				
			},
			toggleAdd:function(){
				this.$.draUpdate.setOpen(false);
				this.$.draAdd.setOpen(true);				
			},
			toggleUpdate:function(){
				this.$.draAdd.setOpen(false);
				this.$.draUpdate.setOpen(true);
			},
			update_click:function(){				
				var newInfo = {
						id: this.obj.contacts[this.iSelected].id,
						contact : this.$.contact.getValue(),
						phone : this.$.phone.getValue(),
					};
					
					if(newInfo.contact != "" && newInfo.phone != ""){
						this.resetValues();
						cacheDrivers.updContact(this.obj, newInfo, this,
								"updateList");										
					}else
					    cacheMan.setMessage("","Verifique campos.");
				
			},
			cancel_click:function(){
				this.resetValues();
				this.updateList();
			},
			resetValues : function() {
				this.$.contact.setValue("");
				this.$.phone.setValue("");
				this.iSelected = null;
				this.toggleAdd();
				this.$.contact.forceFocus();
			},
			updateList : function() {
				this.$.list.render();
			},
			setObj : function(obj) {
				this.obj = obj;
				this.updateList();
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