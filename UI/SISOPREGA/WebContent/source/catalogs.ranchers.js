enyo
		.kind({
			name : "catalogs.ranchers",
			kind : enyo.VFlexBox,
			components : [ {
				kind : enyo.Pane,
				flex : 1,
				name : "mainPane",
				transitionKind : "enyo.transitions.LeftRightFlyin",
				components : [ {
					kind : "catalogs.ranchers.list",
					name : "ranchersList",
					flex : 1,
					onSelectRancher : "showOptions",
					onEnterprise : "showEnterprise",
					onPerson : "showPerson"
				}, {
					kind : "catalogs.ranchers.person.create",
					name : "ranPerCreate",
					onAddRancher : "goBack",
					onUpdateRancher : "goBack",
					onCancel : "goBack"
				}, {
					kind : "catalogs.ranchers.enterprise.create",
					name : "ranEPCreate",
					onAddRancher : "goBack",
					onUpdateRancher : "goBack",
					onCancel : "goBack"
				}, {
					kind : "catalogs.ranchers.options",
					name : "ranOptions",
					onGoback : "goBack",
					onEdit : "showEdit",
					onContacts : "showContacts",
					onBilling : "showBillings"
				}, {
					kind : "catalogs.ranchers.contact.list",
					name : "contactList",
					onGoback : "goBack",
					onAddContact : "showAddContact",
					onSelect : "showEditContact"
				}, {
					kind : "catalogs.ranchers.contact.create",
					name : "acontact",
					onGoback : "goBack",
					onAddRancher : "goBack",
					onUpdateRancher : "goBack"
				}, {
					kind : "catalogs.ranchers.billing.list",
					name : "billingList",
					onGoback : "goBack",
					onAddBilling : "showAddBilling",
					onSelect : "showEditBilling"
				}, {
					kind : "catalogs.ranchers.billing.create",
					name : "abilling",
					onGoback : "goBack",
					onAddBilling : "goBack",
					onUpdateBilling : "goBack"
				}, ]
			} ],
			showPerson : function() {
				_gobackStack.push({
					caption : "Ganaderos",
					paneMan : this.$.mainPane,
					paneName : "ranchersList"
				});
				this.$.ranPerCreate.toggleAdd();
				this.$.ranPerCreate.objList = cacheRanchers.get();
				_objMainHeader.setContent('Nuevo Ganadero - Persona Fisica');
				this.$.mainPane.selectViewByName("ranPerCreate");
			},
			showEdit : function() {

				var objRan = this.$.ranchersList.getSelected();
				objRan.first_name = objRan.first_name;
				if (objRan.rancher_type == 1) {
					_gobackStack.push({
						caption : "Ganadero - Persona Fisica",
						paneMan : this.$.mainPane,
						paneName : "ranOptions"
					});
					this.$.ranPerCreate.setRancher(objRan);
					this.$.ranPerCreate.toggleUpdate();
					_objMainHeader
							.setContent('Editar Ganadero - Persona Fisica');
					this.$.mainPane.selectViewByName("ranPerCreate");
				} else {
					_gobackStack.push({
						caption : "Ganadero - Empresa / Sociedad",
						paneMan : this.$.mainPane,
						paneName : "ranOptions"
					});
					this.$.ranEPCreate.setRancher(objRan);
					this.$.ranEPCreate.toggleUpdate();
					_objMainHeader
							.setContent('Editar Ganadero - Empresa / Sociedad');
					this.$.mainPane.selectViewByName("ranEPCreate");
				}
			},
			showEnterprise : function() {
				_gobackStack.push({
					caption : "Ganaderos",
					paneMan : this.$.mainPane,
					paneName : "ranchersList"
				});
				this.$.ranEPCreate.toggleAdd();
				this.$.ranEPCreate.objList = cacheRanchers.get();
				_objMainHeader
						.setContent('Nuevo Ganadero - Empresa / Sociedad');
				this.$.mainPane.selectViewByName("ranEPCreate");
			},
			showCapacity : function(inSender, inEvent) {
				this.addGoBackAction();
				this.$.capList._arrCapacity = _arrBarnyards[inEvent.rowIndex].barnyard_capacity;
				this.$.capList.render();
				this.$.mainPane.selectViewByName("capList");
				return true;
			},
			showOptions : function() {
				_gobackStack.push({
					caption : "Ganaderos",
					paneMan : this.$.mainPane,
					paneName : "ranchersList"
				});
				var objRan = this.$.ranchersList.getSelected();
				if (objRan.rancher_type == 2) {
					_objMainHeader.setContent('Ganadero - Empresa / Sociedad');
					this.$.ranOptions.$.button3.setShowing(!1);
				} else {
					_objMainHeader.setContent('Ganadero - Persona Fisica');
					this.$.ranOptions.$.button3.setShowing(1);
				}
				this.$.mainPane.selectViewByName("ranOptions");
			},
			showContacts : function() {

				var objRan = this.$.ranchersList.getSelected();
				if (objRan.rancher_type == 2) {
					_gobackStack.push({
						caption : "Ganadero - Empresa / Sociedad",
						paneMan : this.$.mainPane,
						paneName : "ranOptions"
					});
					_objMainHeader
							.setContent('Contacto - (Empresa / Sociedad)');
					this.$.ranOptions.$.button3.setShowing(!1);
				} else {
					_gobackStack.push({
						caption : "Ganadero - Persona Fisica",
						paneMan : this.$.mainPane,
						paneName : "ranOptions"
					});
					_objMainHeader.setContent('Contacto - (Persona Fisica)');
					this.$.ranOptions.$.button3.setShowing(1);
				}
				this.$.contactList.setList(this.$.ranchersList.getSelected());

				this.$.contactList.updateList();

				this.$.mainPane.selectViewByName("contactList");
			},
			showAddContact : function() {

				var objRan = this.$.ranchersList.getSelected();
				if (objRan.rancher_type == 2) {
					_gobackStack.push({
						caption : "Contacto - (Empresa / Sociedad)",
						paneMan : this.$.mainPane,
						paneName : "contactList"
					});
				} else {
					_gobackStack.push({
						caption : "Contacto - (Persona Fisica)",
						paneMan : this.$.mainPane,
						paneName : "contactList"
					});
				}
				this.$.acontact.objList = _arrRancherList[this.$.ranchersList.iSelected].contacts;
				this.$.acontact.setRancher(this.$.ranchersList.getSelected());
				this.$.acontact.toggleAdd();
				_objMainHeader.setContent('Nuevo Contacto');
				this.$.mainPane.selectViewByName("acontact");
			},
			showEditContact : function() {
				var objRan = this.$.ranchersList.getSelected();
				if (objRan.rancher_type == 2) {
					_gobackStack.push({
						caption : "Contacto - (Empresa / Sociedad)",
						paneMan : this.$.mainPane,
						paneName : "contactList"
					});
				} else {
					_gobackStack.push({
						caption : "Contacto - (Persona Fisica)",
						paneMan : this.$.mainPane,
						paneName : "contactList"
					});
				}
				_gobackStack.push({
					caption : "Ganaderos",
					paneMan : this.$.mainPane,
					paneName : "contactList"
				});
				this.$.acontact.setContact(this.$.ranchersList.getSelected(),
						this.$.contactList.getContact());
				_objMainHeader.setContent('Editar Contacto');
				this.$.mainPane.selectViewByName("acontact");
			},
			showBillings : function() {

				var objRan = this.$.ranchersList.getSelected();
				if (objRan.rancher_type == 2) {
					_gobackStack.push({
						caption : "Ganadero - Empresa / Sociedad",
						paneMan : this.$.mainPane,
						paneName : "ranOptions"
					});
					_objMainHeader
							.setContent('Facturación - (Empresa / Sociedad)');
					this.$.ranOptions.$.button3.setShowing(!1);
				} else {
					_gobackStack.push({
						caption : "Ganadero - Persona Fisica",
						paneMan : this.$.mainPane,
						paneName : "ranOptions"
					});
					_objMainHeader.setContent('Facturación - (Persona Fisica)');
					this.$.ranOptions.$.button3.setShowing(1);
				}
				this.$.billingList.setList(this.$.ranchersList.getSelected());

				this.$.billingList.updateList();

				this.$.mainPane.selectViewByName("billingList");
			},
			showAddBilling : function() {

				var objRan = this.$.ranchersList.getSelected();
				if (objRan.rancher_type == 2) {
					_gobackStack.push({
						caption : "Facturación - (Empresa / Sociedad)",
						paneMan : this.$.mainPane,
						paneName : "billingList"
					});
				} else {
					_gobackStack.push({
						caption : "Facturación - (Persona Fisica)",
						paneMan : this.$.mainPane,
						paneName : "billingList"
					});
				}
				this.$.abilling.objList = _arrRancherList[this.$.ranchersList.iSelected].billings;
				this.$.abilling.setBilling(this.$.ranchersList.getSelected());
				this.$.abilling.toggleAdd();
				_objMainHeader.setContent('Nuevos Datos De Facturación');
				this.$.mainPane.selectViewByName("abilling");
			},
			showEditBilling : function() {
				var objRan = this.$.ranchersList.getSelected();
				if (objRan.rancher_type == 2) {
					_gobackStack.push({
						caption : "Facturación - (Empresa / Sociedad)",
						paneMan : this.$.mainPane,
						paneName : "billingList"
					});
				} else {
					_gobackStack.push({
						caption : "Facturación - (Persona Fisica)",
						paneMan : this.$.mainPane,
						paneName : "billingList"
					});
				}
				_gobackStack.push({
					caption : "Ganaderos",
					paneMan : this.$.mainPane,
					paneName : "billingList"
				});
				this.$.abilling.setBilling(this.$.ranchersList.getSelected(),
						this.$.billingList.getBilling());
				_objMainHeader.setContent('Editar Datos De Facturación');
				this.$.mainPane.selectViewByName("abilling");
			},
			addGoBackAction : function() {
				_gobackStack.push({
					caption : "Ganaderos",
					paneMan : this.$.mainPane,
					paneName : "ranchersList"
				});
			},
			goBack : function() {
				this.$.ranchersList.filterRanchers();
				this.$.contactList.updateList();
				cacheMan.goBack();
			}
		});
