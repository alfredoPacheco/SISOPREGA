enyo
	.kind(
	{
	  name : "cattleMovement",
	  kind : enyo.VFlexBox,
	  style : "background-color:#DABD8B;font-size:15px;",
	  align : "center",
	  pack : "center",
	  flex : 1,
	  events :
	  {
		onAccept : "",
		onCancel:""
	  },
	  components : [
	  {
		kind : enyo.HFlexBox,
		style : "background-color:#DABD8B;font-size:15px;",
		align : "center",
		pack : "center",
		width : "100%",
		height : "100%",
		components : [
		{
		  kind : enyo.Scroller,
		  className : "listBG",
		  style : "border-right: solid 3px;",
		  name : "scroller",
		  width : "60%",
		  height : "400px;",
		  components : [
		  {
			kind : enyo.VFlexBox,
			style : "padding:20px 20px 0px 20px;",
			flex : 1,
			pack : "center",
			components : [
			{
			  name : "lblContent",
			  content : '',
			  allowHtml : true,
			  style : "font-size:12px;width:100%;height:100%;"
			} ]
		  } ]
		},
		{
		  kind : "cattleOrigin",
		  name : "origin_kind",
		  onAccept : "acceptOrigin",
		  height : "400px",
		  width : "40%"
		} ],
	  },
	  {
		kind : enyo.HFlexBox,
		align : "right",
		height : "40px;",
		style : "font-size:14px;margin:5px;",
		components : [
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
		}]
	  } ],
	  ready : function() {
	  },
	  accept_click : function() {
		var arrObjectsToSend = [];
		var self = this;
		jQuery("[txtHeads]").each(
			function() {
			  if (Number(jQuery(this).val()) > 0) {
				var movingFrom = crudInventory.getByID(jQuery(this).attr(
					"txtHeads"));
				var heads = utils.parseToNumber(jQuery(this).val());
				var weight = utils.parseToNumber(jQuery(this).parent()
					.siblings().children("[txtWeight]").val());
				movingFrom.heads = utils.parseToNumber(movingFrom.heads)
					- heads;
				movingFrom.weight = utils.parseToNumber(movingFrom.weight)
					- weight;

				var objNewInventory = enyo.clone(movingFrom);
				delete objNewInventory.inventoryId;
				delete objNewInventory.feedUS;
				delete objNewInventory.shrinkage;
				delete objNewInventory.cycleCompleted;
				objNewInventory.heads = heads;
				objNewInventory.weight = weight;
				objNewInventory.pen = self.toPenName;
				objNewInventory.penId = self.toPen;
				objNewInventory.availableToSell = objNewInventory.heads;
				objNewInventory.feed = 0;
				objNewInventory.availableToProgramShip = 0;
				objNewInventory.availableToShip = 0;
				objNewInventory.programmedToShip = 0;
				objNewInventory.shipped = 0;
				objNewInventory.sold = 0;
				movingTo = objNewInventory;

				arrObjectsToSend.push(crudInventory.adapterToOut(movingFrom));
				arrObjectsToSend.push(crudInventory.adapterToOut(movingTo));
			  }
			});

		crudInventory.save(arrObjectsToSend, this, "afterSave");
		// cacheMan.showScrim();
	  },
	  afterSave : function() {
		this.doAccept();
	  },
	  refreshData : function(fromPen, toPen) {
		this.fromPenName= fromPen;
		this.fromPen = crudInventory.getByPen(fromPen).penId;
		this.toPenName=toPen;
		this.toPen = crudInventory.getByPen(toPen);
		
		if (this.toPen != null) {
		  this.toPen = this.toPen.penId;
		} else {
		  this.toPen = crudPen.getByBarnyard(toPen).penId;
		}

		this.$.origin_kind.refreshData(toPen);

		var penId = crudInventory.getByPen(fromPen).penId;

		var strTable = '<table aTable='
			+ penId
			+ ' style="width:100%;"><thead>'
			+ '<tr><th>Origin Type</th><th>Source Name</th><th>Quality</th><th>Heads</th><th>Weight</th><th>Heads to Move</th><th>Weight to Move</th></tr></thead>'
			+ '<tbody>';
		for ( var i = 0; i < crudInventory.arrObj.length; i++) {
		  var current = crudInventory.arrObj[i];
		  if (current.penId == penId) {
			var originType = '';
			switch (current.sourceType) {
			case '1':
			  originType = 'Hermana';
			  break;
			case '2':
			  originType = 'Purchase';
			  break;
			case '3':
			  originType = 'Prorate';
			  break;
			}
			strTable += '<tr><td style="text-align:center;">'
				+ originType
				+ '</td><td style="text-align:center;">'
				+ current.sourceProviderName
				+ '</td><td style="text-align:center;">'
				+ current.quality_name
				+ '</td><td style="text-align:right;">'
				+ current.heads
				+ '</td><td style="text-align:right;">'
				+ (Number(current.weight)).toFixed(2)
				+ '</td><td style="text-align:center;"><input type="text" id="txtHeads'
				+ current.inventoryId
				+ '" txtHeads="'
				+ current.inventoryId
				+ '" style="width:100px;height:20px;font-size: 12px;text-align: right;"></td>'
				+ '</td><td style="text-align:center;"><input type="text" id="txtWeight'
				+ current.inventoryId
				+ '" txtWeight="'
				+ current.inventoryId
				+ '" style="width:100px;height:20px;font-size: 12px;text-align: right;"></td></tr>';
		  }
		}
		strTable += '</tbody></table><br><br>';

		this.$.lblContent.setContent(crudPen.adapterToList(crudPen
			.getByID(penId)).caption
			+ '<br>' + strTable);
	  },
	  cancel_click:function(){
		this.doCancel();
	  }
	});