enyo.kind({
	name : "pen.map",
	kind : enyo.HFlexBox,
	last : null,
	flex:1,
	arrByMOver:{},
	objSelected:null,
	arrSelected:{},
	arrSelectedOccupied:{},
	arrBYbyRancherSelected:{},
	sColorOccupied:"#ff7200",
	sColorFree:"white",	
	sColorSelect:"lightgreen",
	sColorSelectOccupied:"#9b7eb1",
	className:"mapBG",

	components : [

	{
		kind : enyo.BasicScroller,
		flex : 1,
		components : [ {
			name : "cells",
			kind : "VFlexBox",
			align : "center",
			pack : "center"

		} ],
	},

	],
	ready : function() {
		this.last = this.$.cells;
		// this.addRow(true);
		this.addRow();
		this.addRowHeader();
		this.createCells("2E", -7, 4, "50px", "50px");
		this.splitRow();
		this.createCells("1E", 5, 8, "50px", "50px");
		this.splitRow();
		this.createCells("1E", 17, 6, "50px", "50px");
		this.createCells("1E", 23, 1, "100px", "50px");

		this.addRow(true);
		this.createCells("2D", -11, 2, "100px", "50px");
		this.splitRow();
		this.createCells("1D", 1, 4, "100px", "50px");
		this.splitRow();
		this.createCells("1D", 17, 4, "100px", "50px");

		this.addRow();
		this.createCells("2D", -12, 6, "33.33px", "25px");
		this.splitRow();
		this.createCells("1D", 2, 12, "33.33px", "25px");
		this.splitRow();
		this.createCells("1D", 26, 4, "100px", "25px");

		this.addRow(true);
		this.createCells("2C", -11, 6, "33.33px", "25px");
		this.splitRow();
		this.createCells("1C", 1, 12, "33.33px", "25px");
		this.splitRow();
		this.createCells("1C", 25, 3, "100px", "25px");
		this.createCells("1C", 25, 2, "50px", "25px");

		this.addRow();
		this.createCells("2B", -11, 4, "50px", "50px");
		this.splitRow();
		this.createCells("1B", 1, 8, "50px", "50px");
		this.splitRow();
		this.createCells("1B", 25, 3, "100px", "50px");
		this.createCells("1B", 25, 2, "50px", "50px");

		this.addRow(true);
		this.createCells("2B", -8, 4, "50px", "50px");
		this.splitRow();
		this.createCells("1B", 2, 8, "50px", "50px");
		this.splitRow();
		this.createCells("1B", 18, 8, "50px", "50px");

		this.addRow();
		this.createCells("2A", -7, 4, "50px", "50px");
		this.splitRow();
		this.createCells("1A", 1, 8, "50px", "50px");
		this.splitRow();
		this.createCells("1A", 17, 4, "100px", "50px");

	},
	addRow : function(bDiv) {
		if (bDiv) {
			this.$.cells.createComponent({
				kind : "Divider",
				caption : "",
				style : "margin-left:-15px;width: 1040px;"
			});
		} else {
			this.$.cells.createComponent({
				kind : "HFlexBox",
				style : "height:5px;"
			});
		}
		this.last = objBarn = this.$.cells.createComponent({
			kind : "HFlexBox"
		});
	},
	addRowHeader : function() {
		this.last = objBarn = this.$.cells.createComponent({
			kind : "HFlexBox"
		});
		this.addCustomCell("alatwo", "<strong>WEST</strong>", "200px",
				"30px", "customBYcellZone");
		this.splitRow();
		this.addCustomCell("alaone", "<strong>EAST</strong>", "765px",
				"30px", "customBYcellZone");
		this.addRefreshButton();
		this.addRow();
	},
	addCustomCell : function(sName, sCaption, sWidth, sHeight, sClass) {
		if (!sClass) {
			sClass = "customBYcell";
		}
		objBarn.createComponent({
			kind : enyo.Control,
			className : sClass,
			allowHtml : true,
			style : "width:" + sWidth + ";height:" + sHeight + ";"
					+ "text-align: center;" + "vertical-align: middle;"
					+ "background-color:#DABD8B;" + "display: table-cell;",
			name : sName,
			content : sCaption,
		}, {
			owner : this
		});
	},
	splitRow:function(sHeight){
  		objBarn=this.last;		
		objBarn.createComponent({kind:enyo.Control,
		                         style: "width:15px; height:"+sHeight+
										";align:center"});
	},
	addRefreshButton:function(sName,sCaption,sWidth,sHeight,sClass){
		if(!sClass){
			sClass="customBYcell";
		}
		objBarn.createComponent({kind: "IconButton",  onclick:"refreshMap",
		                         icon:"../SISOPREGA/images/command-menu/menu-icon-music-repeat.png",
								 style:"height:23px; width:45px; padding:0;margin:0px",
								 },{owner: this});		
	},	
	createCells:function(sLetter,iStart,iNumber,sWidth,sHeight){
		//this.createCells("1E",5,6,"50px","50px");
		objBarn=this.last;				
		var sColor;
		for (var i=0; i<iNumber; i++) {
			var iOccupied;
			if(cachePen.isOccupied(sLetter+Math.abs(iStart))){
				iOccupied=1;
				sColor=this.sColorOccupied;
			}else{
				iOccupied=0;				
				sColor=this.sColorFree;				
			}
			objBarn.createComponent({kind:enyo.Control,
										   className:"byCell",
										   style:"width:"+sWidth+
											   ";height:"+sHeight+
											   ";align:left"+															
											   ";background-color:"+sColor+
											   ";", 										
			                               name:sLetter+Math.abs(iStart),
										   occupied:iOccupied,
										   bBY:true,
										   content:sLetter.substr(1)+Math.abs(iStart),
										   onclick: "cellClick",
										   onmousehold:"cellHold",
										  },{owner: this});
			iStart=iStart+2;
		}			
	},
});
