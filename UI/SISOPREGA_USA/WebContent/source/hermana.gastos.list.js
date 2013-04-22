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
	    style : "width:700px;margin-right:15px;margin-left:14px;",
	}, {
	    content : "Monto",
	    style : "width:200px;margin-right:15px;text-align:center;",
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
		    style : "width:700px;margin-right:15px;",
		    content : ""
		}, {
		    name : "charge_price",
		    style : "width:107px;margin-right:15px;text-align:right;",
		    content : ""
		} ]
	    } ]
	} ]
    }, {
	kind : "HFlexBox",
	components : [  {
	    kind : "HFlexBox",
	    flex : .05,
	    content : "Total",
	    style:"text-align:right;"
	}, {
	    kind : "HFlexBox",
	    width:"200px",
	    style:"margin-right:20px;",
	    name : "charge_summary",
	    content : ""
	}]
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