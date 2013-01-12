enyo.kind({
	name : "catalogs.ranchers.list",
	kind : enyo.SlidingView,
	layoutKind : enyo.VFlexLayout,
	events : {
		"onPerson" : "",
		"onEnterprise" : "",
		"onSelectRancher" : ""
	},
	iSelected : null,
	objList : [],
	components : [ {
		kind : enyo.Scroller,
		flex : 1,
		className : "listBG",
		components : [ {
			kind : enyo.VirtualRepeater,
			name : "rancherList",
			onSetupRow : "setupProductRow",
			onclick : "selectRancher",
			components : [ {
				kind : "Divider"
			}, {
				kind : enyo.SwipeableItem,
				onConfirm : "deleteRancher",
				tapHighlight : true,
				components : [ {
					name : "name",
					className : "listFirst",
					content : ""
				}, {
					name : "info",
					className : "listSecond",
					content : ""
				} ]
			} ]
		} ]
	}, {
		kind : "Toolbar",
		components : [ {
			kind : "enyo.IconButton",
			flex : 1,
			label : "Persona Fisica",
			onclick : "doPerson"
		}, {
			kind : "enyo.IconButton",
			flex : 1,
			label : "Empresa Sociedad",
			onclick : "doEnterprise"
		}, {
			kind : "ListSelector",
			name : 'filter_id',
			label : "Filtro",
			hideItem : true,
			onChange : "filterRanchers",
			items : [ {
				caption : "Persona Fisica",
				value : 1
			}, {
				caption : "Empresa/Sociedad",
				value : 2
			}, {
				caption : "Todo",
				value : 3
			} ],
			flex : 1,
			contentPack : "end"
		} ]
	}, ],
	selectRancher : function(inSender, inEvent) {
		if (this.objList[inEvent.rowIndex]) {
			this.iSelected = inEvent.rowIndex;
			this.doSelectRancher();
		}
	},
	getSelected : function() {
		return this.objList[this.iSelected];
	},
	getGroupName : function(inIndex) {
		try {
			// get previous record
			var r0 = this.objList[inIndex - 1];
			// get (and memoized) first letter of last name
			if (r0) {
				r0.letter = r0.sortStr.substr(0, 1).toUpperCase();
			}
			var a = r0 && r0.letter;
			// get record
			var r1 = this.objList[inIndex];
			r1.letter = r1.sortStr.substr(0, 1).toUpperCase();
			var b = r1.letter;
			// new group if first letter of last name has changed
			return a != b ? b : null;
		} catch (e) {
			return null;
		}

	},
	setupDivider : function(inIndex) {
		// use group divider at group transition, otherwise use item border for
		// divider
		var group = this.getGroupName(inIndex);
		this.$.divider.setCaption(group);
		this.$.divider.canGenerate = Boolean(group);
	},
	setupProductRow : function(inSender, inIndex) {
		var objRan;
		if (objRan = this.objList[inIndex]) {
			this.setupDivider(inIndex);
			if (objRan.rancher_type == 1) {
				// Diego: Change label to sort order (lastname, name/alias).
				if (objRan.aka != "") {
					this.$.name.setContent(objRan.last_name + ', '
							+ objRan.first_name + ' / ' + objRan.aka);
				} else {
					this.$.name.setContent(objRan.last_name + ', '
							+ objRan.first_name);
				}
				this.$.info.setContent(objRan.phone_number);
			} else {
				this.$.name.setContent(objRan.company_name);
				this.$.info.setContent(objRan.phone_number);
			}
			return true;
		}
	},
	deleteRancher : function(inSender, inIndex) {
		if (cacheRanchers.del(this.objList[inIndex], this, "filterRanchers")) {
			return true;
		} else {
			return false;
		}
	},
	ready : function() {
		this.$.filter_id.setValue(3);
		this.filterRanchers();
	},
	updateList : function() {

		this.objList = this.objList.sort(function(inA, inB) {
			if (inA.rancher_type == 1) {
				inA['sortStr'] = inA.last_name.toLowerCase();
			} else {
				inA['sortStr'] = inA.company_name.toLowerCase();
			}

			if (inB.rancher_type == 1) {
				inB['sortStr'] = inB.last_name.toLowerCase();
			} else {
				inB['sortStr'] = inB.company_name.toLowerCase();
			}
			return [ inA['sortStr'], inA['sortStr'] ] < [ inB['sortStr'],
					inB['sortStr'] ] ? -1 : 1;
		});
		this.$.rancherList.render();
	},
	filterRanchers : function() {
		this.objList = [];
		var objRan;
		var arrRanchersAux = cacheRanchers.get();
		for ( var i = 0; i < arrRanchersAux.length; i++) {
			objRan = arrRanchersAux[i];
			if (this.$.filter_id.getValue() == 3
					|| objRan.rancher_type == this.$.filter_id.getValue()) {
				this.objList.push(arrRanchersAux[i]);
			}
		}
		this.updateList();
	}
});