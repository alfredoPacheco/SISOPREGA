enyo.kind({
    name : "shipments.schedule",
    kind : enyo.VFlexBox,
    style : "background-color:#DABD8B;font-size:15px;",
    arrSales : [],
    arrToShipDetailed:[],
    iHeads:null,
    iWeight:null,
    itemNumber:0,
    events : {
	onProgram : "",
	onCancel : ""
    },
    components : [ {
        name : "addCarrierDialog",
        kind : "Popup",
        showHideMode : "transition",
        openClassName : "zoomFadeIn",
        className : "transitioner2",
        layoutKind : "VFlexLayout",
        style : "overflow: hidden",
        width : "85%",
        height : "85%",
        scrim : true,
        components : []
      },{
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
		content : "Date/Time:",
		width : "110px;",
		style : "text-align: right;margin-right: 5px;"
	    }, {
		kind : "ToolInput",
		name : "programDate",
		hint : "mm/dd/yyyy",
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
		content : "Freighter:",
		width : "110px",
		style : "text-align: right;margin-right: 5px;"
	    }, {
		kind : "controls.autocomplete",
		inputKind : "ToolInput",
		name : "carrier",
		width : "500px;",
		flex:1,
		height : "35px;",
	    },{
                kind : enyo.IconButton,
                icon : "../SISOPREGA_WEB_LIB/images/menu-icon-new.png",
                onclick : "showCarrierForm",
                height : "23px",
                width : "31px",
                style : "padding: 2px;margin-top: 3px;background-color: #DABD8B;"
              }]
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
                    content : 'Client',
                    // className : "listSecond",
                    style : "width:150px;margin-right:15px;margin-left:89px;",
                },
		{
		    content : 'Class',
		    // className : "listSecond",
		    style : "width:150px;margin-right:15px;",
		}, {
		    content : "Pen",
		    // className : "listSecond",
		    style : "width:100px;margin-right:15px;"
		}, {
		    content : 'Heads',
		    // className : "listSecond",
		    style : "width:100px;margin-right:15px;"
		}, {
		    content : "Weight",
		    style : "width:100px;"
		}, {
		    content : "Schedule",
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
	    style:"font-size: 15px;",
	    components : [ {
		kind : enyo.SwipeableItem,
		layoutKind : enyo.HFlexLayout,
		align : "center",
		pack : "start",
		height : "40px",
		className : "listBG",
    		name : "rowItem",
    		onConfirm : "resetItem",
    		confirmCaption:"Restore",
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
				components : [{
					kind : enyo.Button,
					name : "split_button",
					onclick : "split_click",
					caption : "Split",
					style : "min-width:50px;margin-top:-2px;padding: 0px 9px;min-height:22px;background-color: #DABD8B;",
					width:"70px"
				}, 
				{kind: "CheckBox", name:"chkToShip", style:"margin-top: -2px;margin-left:20px;", iPos:"",checked: false, onclick:"checkBox_click"},
				 {
				    name:"lblAlreadyProgrammed",
				    content:"",
				    style:"font-size: 13px;margin-top: -6px;",
				    showing:false,
				    allowHtml:true
				}
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
		components : [
				{
					content : "Total Heads:",
				},
				{
					content : '0',
					name : "totalHC",
					className : "listFirst",
					style : "background-color:#DABD8B;margin-left:10px",
					width : "60px;"
				},
				{
					content : "Total Weight:",
				},
				{
					content : '0',
					name : "totalWeight",
					className : "listFirst",
					style : "background-color:#DABD8B;margin-left:10px;",
					width : "60px;"
				}, {
					kind : "Spacer"
				}, {
					name : "warning",
					content : "",
					style : "color:red"
				} ]
	},{
	    kind : enyo.HFlexBox,
	    align : "center",
	    height : "40px;",
	    style : "font-size:14px;",
	    components : [ {
		kind : enyo.Spacer
	    }, {
		kind : enyo.Button,
		caption : "Schedule Shipment",
		onclick : "program_click",
		style : "background-color: #DABD8B;"
	    }, {
		kind : enyo.Button,
		caption : "Cancel",
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
	this.$.programDate.$.input.applyStyle("text-align", "black");
	this.$.programTime.$.input.applyStyle("text-align", "black");
	this.$.programTime.setValue(new Date().toLocaleTimeString()
		.substring(0, 5));
	this.$.carrier.setItems(crudCarrier.getList());
    },
    setupRow:function(inSender, inIndex){
	if (this.arrToShipDetailed[inIndex]) {
	    this.$.detail_number.setContent(inIndex + 1);
	    var customer = null;
	    if(customer = crudCustomer.getByID(this.arrToShipDetailed[inIndex].customerId)){
		this.$.detail_customer.setContent(customer.customerName);
	    }else{
		this.$.detail_customer.setContent("");
	    }
	    var quality = null;
	    if(quality = crudCattleQuality.getByID(this.arrToShipDetailed[inIndex].qualityId)){
		this.$.detail_clase.setContent(quality.qualityName);
	    }else{
		this.$.detail_clase.setContent("");
	    }
	    this.$.detail_cabezas.setContent(utils.formatNumberThousands(this.arrToShipDetailed[inIndex].heads));
	    var pen = null;
	    if(pen=crudPen.getByID(this.arrToShipDetailed[inIndex].penId)){
		this.$.detail_corrales.setContent(pen.barnyardCode);
	    }else{
		this.$.detail_corrales.setContent("");
	    }
	    this.$.detail_weight.setContent(utils.formatNumberThousands(this.arrToShipDetailed[inIndex].weight) + " lb");
	    this.totalHC += utils.parseToNumber(this.arrToShipDetailed[inIndex].heads);
	    this.totalWeight += utils.parseToNumber(this.arrToShipDetailed[inIndex].weight);
	    
	    if(this.arrToShipDetailed[inIndex].dateTimeProgrammed){
		this.$.chkToShip.hide();
		this.$.split_button.hide();
		this.$.rowItem.setSwipeable(false);
		this.$.lblAlreadyProgrammed.setContent("Scheduled for " + this.arrToShipDetailed[inIndex].dateTimeProgrammed.toLocaleDateString() +
			" " + this.arrToShipDetailed[inIndex].dateTimeProgrammed.toLocaleTimeString().substring(0,5) +
			"<br />Freight: " + crudCarrier.getByID(this.arrToShipDetailed[inIndex].carrierIdProgrammed).carrierName);
		this.$.lblAlreadyProgrammed.show();
		
	    }else if(this.arrToShipDetailed[inIndex].checked) {
		this.$.chkToShip.setChecked(true);
	    }
	    return true;
	}
    },
    updateList:function(){
	this.$.list.render();
	this.calculateTotals();
    },
    setArrShipment : function(arr) {
	this.arrSales = arr;
	this.arrToShipDetailed = [];
	this.itemNumber= 0;
	
	
	for(var i = 0; i<this.arrSales.length;i++){
	    var salesAlreadyProgrammed=[];
	    //Already planned shipments:
	    if(this.arrSales[i].arrToShipDetailed){
		for(var k=0;k<this.arrSales[i].arrToShipDetailed.length;k++){
		    var objShipmentDetailed = this.arrSales[i].arrToShipDetailed[k];
		    objShipmentDetailed.itemNumber = this.itemNumber++;
		    objShipmentDetailed.checked = false;
		    this.arrToShipDetailed.push(objShipmentDetailed);
		    salesAlreadyProgrammed.push(objShipmentDetailed);
		}
		
		//Substract planned heads and weight from sales detail:
		var saleDetail = enyo.clone(this.arrSales[i].SaleDetail);
		for(var x = 0;x<salesAlreadyProgrammed.length;x++){
		    for(var j=0;j<saleDetail.length;j++){
			var objShipmentDetailed = saleDetail[j];			    
			if(utils.parseToNumber(objShipmentDetailed.saleDetailId) == utils.parseToNumber(salesAlreadyProgrammed[x].saleDetailId)){
			    objShipmentDetailed.heads = utils.parseToNumber(objShipmentDetailed.heads) -utils.parseToNumber(salesAlreadyProgrammed[x].heads);
			    objShipmentDetailed.weight = utils.parseToNumber(objShipmentDetailed.weight) -utils.parseToNumber(salesAlreadyProgrammed[x].weight);
			}
		    }
		}
		
		//Adding to list detail sales not programmed yet
		for(var j=0;j<saleDetail.length;j++){		    
		    var objShipmentDetailed = saleDetail[j];
		    if(utils.parseToNumber(objShipmentDetailed.heads) > 0){			
			objShipmentDetailed.aveWeight = objShipmentDetailed.weight / objShipmentDetailed.heads;
			objShipmentDetailed.customerId = this.arrSales[i].customerId;
			objShipmentDetailed.saleId = this.arrSales[i].saleId;
			objShipmentDetailed.itemNumber = this.itemNumber++;
			this.arrToShipDetailed.push(objShipmentDetailed);
		    }		    
		}
	    }else{//None of those sale detail has been programmed, therefore we added all
		for(var j=0;j<this.arrSales[i].SaleDetail.length;j++){
		    var objShipmentDetailed = enyo.clone(this.arrSales[i].SaleDetail[j]);
		    objShipmentDetailed.customerId = this.arrSales[i].customerId;
		    objShipmentDetailed.saleId = this.arrSales[i].saleId;
		    objShipmentDetailed.itemNumber = this.itemNumber++;
		    this.arrToShipDetailed.push(objShipmentDetailed);
		}
	    }    
	}
		
    },
    program_click : function() {
	var arrToShip = [];
	for(var i =0;i<this.arrToShipDetailed.length;i++){
	    if(this.arrToShipDetailed[i].checked){
		this.arrToShipDetailed[i].shipProgramDateTime = new Date("" + this.$.programDate
			.getValue() + " " + this.$.programTime.getValue());
		this.arrToShipDetailed[i].carrierId = this.$.carrier.getIndex();
    	    	var obj = {
    		    customerId :		this.arrToShipDetailed[i].customerId,
    		    qualityId :			this.arrToShipDetailed[i].qualityId,
    		    totalHeads : 		this.arrToShipDetailed[i].heads,
    		    totalWeight : 		this.arrToShipDetailed[i].weight,
    		    aveWeight : 		this.arrToShipDetailed[i].aveWeight,
    		    carrierId : 		this.arrToShipDetailed[i].carrierId,
    		    shipProgramDateTime :	this.arrToShipDetailed[i].shipProgramDateTime,
    		    saleId:			this.arrToShipDetailed[i].saleId,
    		    saleDetailId:		this.arrToShipDetailed[i].saleDetailId,
    		    inventoryId:		this.arrToShipDetailed[i].inventoryId,
    		    itemNumber:			this.arrToShipDetailed[i].itemNumber,
    		    penId:			this.arrToShipDetailed[i].penId,
    	    	};
    	    	arrToShip.push(obj);
    	    	//this.setShipToSale(this.arrToShipDetailed[i]);
//    	    	if(!cacheShip.createData(obj,this,"setShipToSale",this.arrToShipDetailed[i])){
//    	    	    return;
//    	    	}
    	    }
	    else{
    		this.setShipToSale(this.arrToShipDetailed[i]);
    	    }
	}
	
	if(arrToShip.length){
	    this.saveShip(arrToShip);    
	}else{
	    cacheMan.setMessage("","None Selected.");
	}
    },
    saveShip:function(arrShip){

	
	var arrByBuyer={};
	
	//Ordering data by customerId	
	for(var i=0;i<arrShip.length;i++){
	    if(!(arrShip[i].customerId in arrByBuyer)){
		arrByBuyer[arrShip[i].customerId] = [];
	    }
	    arrByBuyer[arrShip[i].customerId].push(arrShip[i]);
	}
	
	//Ordering data by cattle
	var objShip = {};
	var arrDetail = {};
	for(i in arrByBuyer){
	    if (arrByBuyer.hasOwnProperty(i)){
		for(var j=0;j<arrByBuyer[i].length;j++){
		    if(!(arrByBuyer[i][j].qualityId in arrDetail)){
			arrDetail[arrByBuyer[i][j].qualityId]=[];
//			arrDetail[arrByBuyer[i][j].qualityId].totalHeads =0;
//			arrDetail[arrByBuyer[i][j].qualityId].totalWeight =0;
		    }
		    arrDetail[arrByBuyer[i][j].qualityId].push(arrByBuyer[i][j]);
//		    arrDetail[arrByBuyer[i][j].qualityId].totalHeads += utils.parseToNumber(arrByBuyer[i][j].totalHeads);
//		    arrDetail[arrByBuyer[i][j].qualityId].totalWeight += utils.parseToNumber(arrByBuyer[i][j].totalWeight);
		}
		objShip[i] = arrDetail;
		arrDetail={};
	    }
	}
	
	var shipsToSave=[];
	
	for(client in objShip){
	    if(objShip.hasOwnProperty(client)){
		for(cattle in objShip[client]){
		    if(objShip[client].hasOwnProperty(cattle)){			
			shipsToSave.push(objShip[client][cattle]);			
		    }
		}
	    }
	}
	arrObjectsToSend=[];
	this.readCounter = 0;
	this.iShipTotal = shipsToSave.length;
	for(var i=0;i<shipsToSave.length;i++){
	    // Defining parent
	    var objShip = {};
	    var obj = enyo.clone(shipsToSave[i][0]);	    
	    objShip.carrierIdProgrammed = utils.parseToNumber(obj.carrierId);
	    objShip.customerId = utils.parseToNumber(obj.customerId);
	    objShip.dateTimeProgrammed = obj.shipProgramDateTime;
	    objShip.qualityId = obj.qualityId;
	    for(var j=0;j<shipsToSave[i].length;j++){
		// Defining child
		if(!objShip.ShipmentDetail){
		    objShip.ShipmentDetail = [];    
		}		
		var child = {};
		child.heads = shipsToSave[i][j].totalHeads;
		child.inventoryId = shipsToSave[i][j].inventoryId;
		child.itemNumber = shipsToSave[i][j].itemNumber;	    
		child.saleId = shipsToSave[i][j].saleId;
		child.saleDetailId = shipsToSave[i][j].saleDetailId;
		child.weight = shipsToSave[i][j].totalWeight;		
		objShip.ShipmentDetail.push(child);
	    }
	    //crudShipment.create(objShip,this,"readCallBack");
	    arrObjectsToSend.push(crudShipment.adapterToOut(objShip));    
	}
	
	consumingGateway.Save("Shipment",arrObjectsToSend, this, "finishRead");
	
	
//	for(var y =0;y<objShip[client][cattle].length;y++){
//	    var obj=null;
//	    if(obj=this.getItemByItemutils.parseToNumber(objShip[client][cattle][y].itemNumber)){
//		obj.shipment_id = objShip[client][cattle].shipment_id;
//	    }else{
//		return;
//	    }
//	}
	
    },
    iShipTotal:0, //Total of shipments to save
    readCounter : 0,
    readCallBack : function() {
	this.readCounter++;
	if (this.readCounter == this.iShipTotal) {
	    this.readCounter = 0;
	    this.finishRead();
	}
    },
    finishRead : function() {
	this.doProgram();
    },
    getItemByItemNumber:function(itemNumber){
	for(var x=0;x<this.arrToShipDetailed.length;x++){
	    if(this.arrToShipDetailed[x].itemNumber==itemNumber){
		return this.arrToShipDetailed[x];
	    }
	}
    },
    setShipToSale:function(objShip){
	var shipAlreadyExistsInShip=false;
	for(var i=0;i<this.arrSales.length;i++){
	    if(this.arrSales[i].saleId==objShip.saleId){
		if(!("arrToShipDetailed" in this.arrSales[i])){
		    this.arrSales[i].arrToShipDetailed=[];
		    this.arrSales[i].arrToShipDetailed.push(objShip);
		    break;
		}else{
		    if(objShip.shipment_id !== undefined){
    		    	shipAlreadyExistsInShip=false;
    		    	for(var j=0;j<this.arrSales[i].arrToShipDetailed.length;j++){
    		    	    if(objShip.shipment_id == this.arrSales[i].arrToShipDetailed[j].shipment_id){
    		    		shipAlreadyExistsInShip=true;
    		    		break;
    		    	    }
    		    	}
		    }
		    else{
			for(var j=0;j<this.arrSales[i].arrToShipDetailed.length;j++){
    		    	    if(objShip.itemNumber == this.arrSales[i].arrToShipDetailed[j].itemNumber){
    		    		shipAlreadyExistsInShip=true;
    		    		break;
    		    	    }
    		    	}
		    }
		    if(!shipAlreadyExistsInShip){
		    	    this.arrSales[i].arrToShipDetailed.push(objShip);
		    	    break;
		    }
		}
	    }
	}
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
	objNew.itemNumber = this.itemNumber++;
	this.arrToShipDetailed.push(objNew);
	this.updateList();
    },
    on_cancel_split:function(){
	this.$.popup_split.close();
    },
    resetItem:function(inSender, inIndex){	
	var len = this.arrToShipDetailed.length;
	var firstFound = -1;
	var itemInIndex = this.arrToShipDetailed[inIndex];
	for (var i=0;i<len;i++){
		if(this.arrToShipDetailed[i].saleDetailId == itemInIndex.saleDetailId){
		    if(!this.arrToShipDetailed[i].hasOwnProperty("shipProgramDateTime")){
			if(firstFound > -1){
			    this.arrToShipDetailed[firstFound].heads += utils.parseToNumber(this.arrToShipDetailed[i].heads);
			    this.arrToShipDetailed[firstFound].weight += utils.parseToNumber(this.arrToShipDetailed[i].weight);
			    this.arrToShipDetailed.splice(i,1);			
			    i--;
			    len--;
			}else{
			    firstFound = i;
			}
		    }
		}
	}
	this.updateList();
    },    
    checkBox_click : function(inSender, inEvent) {
    	this.arrToShipDetailed[inEvent.rowIndex].checked = inSender.checked;
    	this.calculateTotals();
    },
    calculateTotals : function() {
	var hc = 0;
	var weight = 0;
	for ( var i = 0;i<this.arrToShipDetailed.length;i++){
	    if (!this.arrToShipDetailed[i].shipProgramDateTime && this.arrToShipDetailed[i].checked) {
		hc += utils.parseToNumber(this.arrToShipDetailed[i].heads);
		weight += utils.parseToNumber(this.arrToShipDetailed[i].weight);
	    }
	}
	if (weight > 50000) {
	    this.$.warning.setContent("You are about to schedule a shipment higher than 50K pounds");
	} else {
	    this.$.warning.setContent("");
	}
	
	this.$.totalHC.setContent(utils.formatNumberThousands(hc));
	this.$.totalWeight.setContent(utils.formatNumberThousands(weight));
		
    },
    applyMask : function(inSender) {
	var _id = inSender.$.input.getId();
	jQuery(function(j) {
	    j(document.getElementById(_id)).mask('99/99/9999');
	});
    },
    showCarrierForm : function() {
	if (this.$.carrierForm) {
	    this.$.carrierForm.destroy();
	}
	this.$.addCarrierDialog.createComponent({
	kind : "catalogs.carrier.form",
	onAdd : "addCarrier",
	onCancel : "cancelCreateCarrier",
	name : "carrierForm",
	flex : 1
	}, {
	    owner : this
	});
	this.$.addCarrierDialog.render();
	this.$.addCarrierDialog.openAtCenter();
    },
    addCarrier : function(inSender, result) {
	this.$.carrier.setItems(crudCarrier.getList());
	
	var justCreated = result.records[0];
	this.$.carrier.setIndex(justCreated.carrierId);
	this.$.addCarrierDialog.close();
	cacheMan.hideScrim();
    },
    cancelCreateCarrier: function() {
	this.$.addCarrierDialog.close();
    }
});