enyo
	.kind(
	{
	  name : "shipments.popup.split",
	  kind : enyo.VFlexBox,
	  style : "background-color:#DABD8B;font-size:15px;",
	  align : "center",
	  pack : "center",
	  objToSplit : {},
	  events :
	  {
		onAccept : "",
		onCancel : ""
	  },
	  components : [
	  {
		kind : enyo.VFlexBox,
		// style : "padding:20px 20px 0px 20px",
		pack : "center",
		components : [
		{
		  kind : enyo.HFlexBox,
		  align : "center",
		  pack : "center",
		  height : "40px",
		  style : "margin:5px;",
		  components : [
		  {
			content : "Amount to split:",
			width : "130px",
			style : "text-align: right;margin-right: 5px;"
		  },
		  {
			kind : "ToolInput",
			name : "txtQuantity",
			hint : "",
			width : "60px",
			height : "35px",
			oninput : "on_input"
		  },
		  {
			name : "lblWeight",
			content : "Aprox. Weight <br />0.00 lb",
			width : "100px",
			style : "text-align:center;margin:5px;font-size:12px;",
			allowHtml : true
		  } ]
		} ]
	  },
	  {
		kind : enyo.HFlexBox,
		align : "right",
		height : "40px;",
		style : "font-size:14px;margin:5px;",
		components : [
		{
		  kind : enyo.Spacer
		},
		{
		  kind : enyo.Button,
		  caption : "OK",
		  onclick : "accept_click",
		  style : "background-color: #DABD8B;"
		},
		{
		  kind : enyo.Button,
		  caption : "Cancel",
		  onclick : "cancel_click",
		  style : "background-color: #DABD8B;"
		} ]
	  } ],
	  ready : function() {
		this.$.txtQuantity.$.input.applyStyle("text-align", "center");
	  },
	  accept_click : function() {
		var objNew = enyo.clone(this.objToSplit);
		this.objToSplit.heads -= utils.parseToNumber(this.$.txtQuantity.getValue());
		this.objToSplit.weight -= utils.parseToNumber(this.$.txtQuantity.getValue())
			* utils.parseToNumber(this.objToSplit.aveWeight);
		objNew.heads = utils.parseToNumber(this.$.txtQuantity.getValue());
		objNew.weight = utils.parseToNumber(this.objToSplit.aveWeight)
			* utils.parseToNumber(this.$.txtQuantity.getValue());
		this.doAccept(objNew);
	  },
	  cancel_click : function() {
		this.doCancel();
	  },
	  setObjToSplit : function(obj) {
		this.objToSplit = obj;
	  },
	  on_input : function(inSender, inEvent) {
		if (isNaN(utils.parseToNumber(inSender.value))) {
		  return false;
		} else {
		  this.$.lblWeight
			  .setContent("Aprox. Weight <br />"
				  + utils
					  .formatNumberThousands((utils.parseToNumber(inSender.value)
						  * utils.parseToNumber(this.objToSplit.weight) / utils.parseToNumber(this.objToSplit.heads)))
				  + " lb");
		  return true;
		}

	  }
	});