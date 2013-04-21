enyo.kind({
    name : "hermana.gastos.list",
    kind : "VFlexBox",
    arrData : [],
    iSummary : 0,
    components : [ {
	kind : "HFlexBox",
	className:"listFirst",
	style : "font-size:13px;background-color:#DABD8B;",
	height:"30px",
	align:"center",
	pack:"start",
	components : [ {
	    content : "Concepto",
	    flex : .7
	}, {
	    content : "Monto",
	    style : "text-align:center;",
	    flex : .3
	} ]
    }, {
	kind : enyo.Scroller,
	name : "detailScroller",
	style : "background-color: #482400;",
	autoHorizontal : false,
	horizontal : false,
	flex : 1,
//	style : "border: thin dotted black; height:250px;",
	components : [ {
	    kind : enyo.VirtualRepeater,
	    name : "chargesList",
	    onSetupRow : "loadCharges",
	    onclick : "",
	    components : [ {
		kind : enyo.SwipeableItem,
		onConfirm : "deleteCharge",
		layoutKind : enyo.HFlexLayout,
		tapHighlight : true,
		className : "listBG",
		style : "font-size:13px;",
		components : [ {
		    name : "charge_desc",
		    flex : .7,
		    content : ""
		}, {
		    name : "charge_price",
		    flex : .3,
		    content : ""
		} ]
	    } ]
	} ]
    }, {
	kind : "HFlexBox",
	components : [ {
	    kind : "Spacer",
	    flex : .84
	}, {
	    kind : "HFlexBox",
	    flex : .05,
	    content : "Total"
	}, {
	    kind : "HFlexBox",
	    flex : .07,
	    name : "charge_summary",
	    content : ""
	}, {
	    kind : "Spacer",
	    flex : .04
	} ]
    } ],
    addCharge : function(arrData) {
	this.arrData.push(arrData);
	this.updateList();
    },
    loadCharges : function(inSender, inIndex) {
	var objData;
	if (objData = this.arrData[inIndex]) {
	    this.$.charge_desc.setContent(objData.charge_desc);
	    this.$.charge_price.setContent(objData.charge_price);
	    this.iSummary += Number(objData.charge_price);
	    return true;
	} else {
	    this.updateSummary();
	    return false;
	}
    },
    updateSummary : function() {
	this.$.charge_summary.setContent(this.iSummary);
    },
    deleteCharge : function(inSender, inIndex) {
	var objData;
	if (objData = this.arrData[inIndex]) {
	    this.iSummary -= Number(objData.charge_price);
	    this.updateSummary();
	    this.arrData.splice(inIndex, 1);
	    this.updateList();
	    return true;
	} else {
	    return false;
	}
    },
    updateList : function() {
	this.iSummary = 0;
	this.$.chargesList.render();
    }
});