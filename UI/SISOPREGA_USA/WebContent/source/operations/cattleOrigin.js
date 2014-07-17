enyo
	.kind(
	{
	  name : "cattleOrigin",
	  kind : enyo.VFlexBox,
	  style : "background-color:#DABD8B;font-size:15px;",
	  align : "center",
	  pack : "center",
	  components : [

	  {
		kind : enyo.Scroller,
		width : '100%',
		height : '100%',
		className : "listBG",
		name : "scroller",
		components : [
		{
		  kind : enyo.VFlexBox,
		  style : "padding:20px 20px 0px 20px",
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
	  } ],
	  ready : function() {
	  },
	  refreshData : function(inPen) {
		var penId = crudInventory.getByPen(inPen);
		if (penId != null) {
		  penId = penId.penId;
		} else {
		  this.$.lblContent.setContent("" + crudPen.adapterToList(crudPen.getByID(crudPen.getByBarnyard(inPen).penId)).caption + "<br><br>No Cattle in this Pen.");
		  return;
		}

		var strTable = '<table aTable='
			+ penId
			+ ' class="display"><thead>'
			+ '<tr><th>Origin Type</th><th>Source Name</th><th>Quality</th><th>Heads</th><th>Weight</th><th>Average</th></tr></thead>'
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
			strTable += '<tr><td style="text-align:center;">' + originType
				+ '</td><td style="text-align:center;">'
				+ current.sourceProviderName
				+ '</td><td style="text-align:center;">' + current.quality_name
				+ '</td><td style="text-align:right;">' + current.heads
				+ '</td><td style="text-align:right;">'
				+ (Number(current.weight)).toFixed(2)
				+ '</td><td style="text-align:right;">'
				+ (Number(current.aveweight)).toFixed(2) + '</td></tr>';
		  }
		}
		strTable += '</tbody></table><br><br>';

		this.$.lblContent.setContent(crudPen.adapterToList(crudPen
			.getByID(penId)).caption
			+ '<br>' + strTable);
		var theTable = jQuery('[aTable=' + penId + ']');
		theTable.dataTable(
		{
		  "bFilter" : false,
		  "bLengthChange" : false,
		  "bInfo" : false,
		  "bPaginate" : false,
		});
	  }
	});