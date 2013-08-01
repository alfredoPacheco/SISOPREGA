enyo.kind({
    name : "cache.sales",
    lastID:6,
    cacheData : [ 
                 //Correct model:
//                  {
//                 arrToShipDetailed:[{
//                     aveWeight: 469,
//                     buyer: "Este es un cliente",
//                     cattleName: "Caballos",
//                     checked: true,
//                     detailNumber: 0,
//                     heads: 23,
//                     id_inventory: 1,
//                     itemNumber: 0,
//                     pen: "3C2",
//                     sale_id: 7,
//                     shipCarrier: "Transportista 1",
//                     shipProgramDateTime: new Date(),
//                     weight: 10787
//                 },{
//                     aveWeight: 278,
//                     buyer: "Este es un cliente",
//                     cattleName: "Novillos",
//                     detailNumber: 1,
//                     heads: 32,
//                     id_inventory: 3,
//                     itemNumber: 1,
//                     pen: "3C32",
//                     sale_id: 7,
//                     weight: 8896
//                 }],
//	sale_id : 1,   			=saleId
//	buyer:"un cliente",		=customerId
//	sale_date:new Date(),		=saleDate
//	totalHeads:123,			=totalHeads calculated locally
//	totalWeight:123.23,		=totalWeight calculated locally
//	aveWeight:1.01,			=totalAveWeigth calculated locally
//	detail:[{
//	    detailNumber:1,		?
//	    aveWeight:152,		=aveWeight calculated locally
//	    cattleName:"Caballos",	=cattleQualityId
//	    heads:91,			=heads
//	    id_inventory: 1,		
//	    pen:"3C12",			=penId
//	    weight:13832
//	},{
//	    detailNumber:2,
//	    aveWeight: 235,
//	    cattleName: "Novillos",
//	    heads: 78,
//	    id_inventory: 2,
//	    pen: "3C21",
//	    weight: 18330
//	}]	
//                 Finish correct model
                 
                 
//    }, {
//	sale_id : 2,
//	buyer:"segundo cliente",
//	sale_date:new Date(),
//	totalHeads:123,
//	totalWeight:123.23,
//	aveWeight:1.01,
//	detail:[{
//	    detailNumber:1,
//	    aveWeight:152,
//	    cattleName:"Caballos",
//	    heads:91,
//	    pen:"3C12",
//	    weight:13832
//	},{
//	    detailNumber:2,
//	    aveWeight: 235,
//	    cattleName: "Novillos",
//	    heads: 78,
//	    pen: "3C21",
//	    weight: 18330
//	}]	
//    }, {
//	sale_id : 3,
//	buyer:"terecer clinet",
//	sale_date:new Date(),
//	totalHeads:123,
//	totalWeight:123.23,
//	aveWeight:1.01,
//	detail:[{
//	    detailNumber:1,
//	    aveWeight:152,
//	    cattleName:"Caballos",
//	    heads:91,
//	    pen:"3C12",
//	    weight:13832
//	},{
//	    detailNumber:2,
//	    aveWeight: 235,
//	    cattleName: "Novillos",
//	    heads: 78,
//	    pen: "3C21",
//	    weight: 18330
//	}]	
//    },
//    
    ], 
    createData : function() {
    },
    readData : function() {
	return this.cacheData;
    },
    getByID:function(id){
	var len = this.cacheData.length;
	for(var i=0;i<len;i++){
	    if(id==this.cacheData[i].sale_id){
		return this.cacheData[i];
	    }
	}
	return null;
    },
    sell : function(objSale, cbObj, cbMethod) {
	objSale.sale_id = ++this.lastID;
	this.cacheData.push(objSale);
	for(var i=0;i<objSale.detail.length;i++){
	    if(!this.markSoldHeads(objSale.detail[i].pen,objSale.detail[i].heads, objSale.buyer)){
		return false;
	    }
	}
	if (cbMethod) {
	    cbObj[cbMethod]();
	}
	return true;
    },
    markSoldHeads:function(sBy, iHeads, sBuyerName){
	var reception = cachePen.getByBarnyard(sBy);
	if (reception) {
	    var buyer = {
		    name:sBuyerName,
		    heads:iHeads
	    };
	    reception.buyers.push(buyer);
	    return true;
	}
	alert("Ha ocurrido un error al momento de intentar marcar las cabezas vendidas.");
	return false;
    },
    updateData : function() {
    },
    deleteData : function() {
    },
    adapter : function(arrData) {
	var arrNewData = [];
	var i = 0;
	for ( var objData in arrData) {
	    arrNewData[i] = objData;
	    i++;
	}
	return arrNewData;
    }
});
var cacheSales = new cache.sales();