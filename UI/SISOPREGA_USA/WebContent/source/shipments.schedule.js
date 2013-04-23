enyo.kind({
    name : "shipments.schedule",
    kind : enyo.VFlexBox,
    style : "background-color:#DABD8B;font-size:15px;",
    arrToShip : [],
    arrToShipDetailed:[],
    totalHC : 0,
    totalWeight : 0,
    events : {
	onProgram : "",
	onCancel : ""
    },
    components : [ {
        kind : enyo.Popup,
        name : "popup_split",
        width : "330px",
        height : "120px",
        dismissWithClick : true,
        layoutKind : "VFlexLayout",
        style : "overflow: hidden;border-width: 8px;",
        scrim : true,          
        components :
          [
            {
              kind : "shipments.popup.split",
              name : "split_kind",
              flex : 1,
              onAccept : "on_accept_split",
              onCancel : "on_cancel_split"
            } ]
      },{
	kind : enyo.VFlexBox,
	style : "padding:20px;",
	pack : "center",
	components : [ {
	    kind : enyo.HFlexBox,
	    align : "center",
	    pack : "center",
	    height : "40px;",
	    components : [ {
		content : "Fecha y Hora:",
		width : "110px;",
		style : "text-align: right;margin-right: 5px;"
	    }, {
		kind : "ToolInput",
		name : "programDate",
		hint : "mes/dia/año",
		// width : "103px;",
		flex : 1,
		height : "35px;",
		onfocus : "applyMask",
	    // style:"text-align: right;max-width: 500px;"
	    }, {
		kind : "ToolInput",
		name : "programTime",
		// width : "103px;",
		hint : "HH:MM",
		flex : 1,
		height : "35px;",
		onfocus : "applyTimeMask",
	    // style:"text-align: right;max-width: 500px;"
	    } ]
	}, {
	    kind : enyo.HFlexBox,
	    align : "center",
	    height : "40px;",
	    components : [ {
		content : "Transportista:",
		width : "110px",
		style : "text-align: right;margin-right: 5px;"
	    }, {
		kind : "controls.autocomplete",
		inputKind : "ToolInput",
		name : "carrier",
		width : "500px;",
		flex:1,
		height : "35px;",
	    } ]
	}]
    },
    {// HEADER:
	kind : "HFlexBox",
	className : "listFirst",
	style : "font-size:13px;background-color:#DABD8B;border-bottom-style: solid;border-bottom-color: #482400;",
	height : "30px",
	align : "center",
	pack : "start",
	components : [
                {
                    content : 'Cliente',
                    // className : "listSecond",
                    style : "width:150px;margin-right:15px;margin-left:89px;",
                },
		{
		    content : 'Clase',
		    // className : "listSecond",
		    style : "width:150px;margin-right:15px;",
		}, {
		    content : "Corral",
		    // className : "listSecond",
		    style : "width:100px;margin-right:15px;"
		}, {
		    content : 'Cantidad',
		    // className : "listSecond",
		    style : "width:100px;margin-right:15px;"
		}, {
		    content : "Peso",
		    style : "width:100px;"
		}, {
		    content : "Programar",
		    style : "width:70px;margin-left:102px;"
		} ]
    },
    {
	kind : enyo.Scroller,
	name : "detailScroller",
	flex : 1,
	// className : "listBG",
	style : "background-color: #482400;",
	autoHorizontal : false,
	horizontal : false,
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
			    name : 'detail_number',
			    className : "listSecond",
			    style : "width:30px;margin-right:15px;margin-left:12px;color:#5F0712",
			},
			{
			    name : 'detail_customer',
			    className : "listSecond",
			    style : "width:150px;margin-right:15px;margin-left:23px;",
			},
			{
			    name : 'detail_clase',
			    className : "listSecond",
			    style : "width:150px;margin-right:15px;",
			},
			{
			    name : "detail_corrales",
			    className : "listSecond",
			    style : "width:100px;margin-right:15px;"
			},
			{
			    name : 'detail_cabezas',
			    className : "listSecond",
			    style : "width:100px;margin-right:15px;"
			}, {
			    name : "detail_weight",
			    className : "listSecond",
			    style : "width:100px;"
			},
			{
				kind : enyo.HFlexBox,
				components : [ {
				    
					kind : enyo.Button,
					name : "split_button",
					onclick : "split_click",
					caption : "Dividir",
					style : "min-width:50px;margin-top:-6px;padding: 0px 9px;min-height:20px;background-color: #DABD8B;",
					width:"70px"

				}, 
				{kind: "CheckBox", name:"chkToShip", style:"margin-top: -6px;margin-left:20px;", iPos:"",checked: false, onclick:"checkBox_click"}
				]
			}]
	    } ]
	} ]
    },  
    {
	kind : enyo.VFlexBox,
	style : "padding:20px;",
	pack : "center",
	components : [ {
	    kind : enyo.HFlexBox,
	    align : "center",
	    height : "40px;",
	    style : "font-size:14px;",
	    components : [ {
		kind : enyo.Spacer
	    }, {
		kind : enyo.Button,
		caption : "Programar Envío",
		onclick : "program_click",
		style : "background-color: #DABD8B;"
	    }, {
		kind : enyo.Button,
		caption : "Cancelar",
		onclick : "cancel_click",
		style : "background-color: #DABD8B;"
	    } ]
	} ]
    }],
    afterUpdate : function() {
	this.updateList();
    },
    ready : function() {
	this.$.programDate.setValue(utils.dateOut(new Date()));
	this.$.programDate.$.input.applyStyle("text-align", "center");
	this.$.programTime.$.input.applyStyle("text-align", "center");
	this.$.programTime.setValue(new Date().toLocaleTimeString()
		.substring(0, 5));
	this.$.carrier.setItems(cacheDrivers.getAllForList());
    },
    setupRow:function(inSender, inIndex){
	if (this.arrToShipDetailed[inIndex]) {
	    this.$.detail_number.setContent(inIndex + 1);
	    this.$.detail_customer
	    .setContent(this.arrToShipDetailed[inIndex].buyer);
	    this.$.detail_clase
		    .setContent(this.arrToShipDetailed[inIndex].cattleName);
	    this.$.detail_cabezas
		    .setContent(utils.formatNumberThousands(this.arrToShipDetailed[inIndex].heads));
	    this.$.detail_corrales
		    .setContent(this.arrToShipDetailed[inIndex].pen.substring(1));
	    this.$.detail_weight
		    .setContent(utils.formatNumberThousands(this.arrToShipDetailed[inIndex].weight) + " lb");
	    this.totalHC += Number(this.arrToShipDetailed[inIndex].heads);
	    this.totalWeight += Number(this.arrToShipDetailed[inIndex].weight);
	    return true;
	}
    },
    updateList:function(){
	this.$.list.render();
    },
    setArrShipment : function(arr) {
	this.arrToShip = arr;
	this.arrToShipDetailed = [];
	for(var i = 0; i<this.arrToShip.length;i++){
	    for(var j = 0;j<this.arrToShip[i].detail.length;j++){
		var objShipmentDetailed = this.arrToShip[i].detail[j];
		objShipmentDetailed.buyer = this.arrToShip[i].buyer;
		this.arrToShipDetailed.push(objShipmentDetailed);
	    }
	}	
    },
    program_click : function() {
	for(var i =0;i<this.arrToShip.length;i++){
	    this.arrToShip[i].shipProgramDateTime = new Date("" + this.$.programDate
			.getValue() + " " + this.$.programTime.getValue());
	    this.arrToShip[i].shipCarrier = this.$.carrier.getValue();
	    var obj = {
		    buyer : 			this.arrToShip[i].buyer,
		    cattleName : 		this.arrToShip[i].cattleName,
		    totalHeads : 		this.arrToShip[i].totalHeads,
		    totalWeight : 		this.arrToShip[i].totalWeight,
		    aveWeight : 		this.arrToShip[i].aveWeight,
		    shipCarrier : 		this.arrToShip[i].shipCarrier,
		    shipProgramDateTime :	this.arrToShip[i].shipProgramDateTime
	    };
	    cacheShip.createData(obj);
	}
	this.doProgram();
    },
    split_click:function(inSender, inEvent){
	this.$.popup_split.validateComponents();
	this.$.split_kind.setObjToSplit(this.arrToShipDetailed[inEvent.rowIndex]);
	this.$.popup_split.openAtCenter();
    },
    cancel_click : function() {
	this.doCancel();
    },
    on_accept_split:function(inSender, objNew){
	this.$.popup_split.close();
	this.arrToShipDetailed.push(objNew);
	this.updateList();
    },
    on_cancel_split:function(){
	this.$.popup_split.close();
    },
    applyMask : function(inSender) {
	var _id = inSender.$.input.getId();
	jQuery(function(j) {
	    j(document.getElementById(_id)).mask('99/99/9999');
	});
    }
});