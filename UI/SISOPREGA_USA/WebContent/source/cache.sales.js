enyo.kind({
    name : "cache.sales",
    lastID:6,
    cacheData : [ {
	sale_id : 1,
	buyer:"un cliente",
	sale_date:new Date(),
	totalHeads:123,
	totalWeight:123.23,
	aveWeight:1.01,
	detail:[{
	    aveWeight:152.23,
	    cattleName:"Caballos",
	    heads:91,
	    pen:"3C12",
	    weight:13832
	},{
	    aveWeight: 235,
	    cattleName: "Novillos",
	    heads: 78,
	    pen: "3C21",
	    weight: 18330
	}]	
    }, {
	sale_id : 2,
	buyer:"segundo cliente",
	sale_date:new Date(),
	totalHeads:123,
	totalWeight:123.23,
	aveWeight:1.01,
	detail:[{
	    aveWeight:152.23,
	    cattleName:"Caballos",
	    heads:91,
	    pen:"3C12",
	    weight:13832
	},{
	    aveWeight: 235,
	    cattleName: "Novillos",
	    heads: 78,
	    pen: "3C21",
	    weight: 18330
	}]	
    }, {
	sale_id : 3,
	buyer:"terecer clinet",
	sale_date:new Date(),
	totalHeads:123,
	totalWeight:123.23,
	aveWeight:1.01,
	detail:[{
	    aveWeight:152.23,
	    cattleName:"Caballos",
	    heads:91,
	    pen:"3C12",
	    weight:13832
	},{
	    aveWeight: 235,
	    cattleName: "Novillos",
	    heads: 78,
	    pen: "3C21",
	    weight: 18330
	}]	
    }, {
	sale_id : 4,
	buyer:"cuarto cliente",
	sale_date:new Date(),
	totalHeads:123,
	totalWeight:123.23,
	aveWeight:1.01,
	detail:[{
	    aveWeight:152.23,
	    cattleName:"Caballos",
	    heads:91,
	    pen:"3C12",
	    weight:13832
	},{
	    aveWeight: 235,
	    cattleName: "Novillos",
	    heads: 78,
	    pen: "3C21",
	    weight: 18330
	}]	
    }, {
	sale_id : 5,
	buyer:"quinto cliente",
	sale_date:new Date(),
	totalHeads:123,
	totalWeight:123.23,
	aveWeight:1.01,
	detail:[{
	    aveWeight:152.23,
	    cattleName:"Caballos",
	    heads:91,
	    pen:"3C12",
	    weight:13832
	},{
	    aveWeight: 235,
	    cattleName: "Novillos",
	    heads: 78,
	    pen: "3C21",
	    weight: 18330
	}]	
    }, {
	sale_id : 6,
	buyer:"sexto cliente",
	sale_date:new Date(),
	totalHeads:123,
	totalWeight:123.23,
	aveWeight:1.01,
	detail:[{
	    aveWeight:152.23,
	    cattleName:"Caballos",
	    heads:91,
	    pen:"3C12",
	    weight:13832
	},{
	    aveWeight: 235,
	    cattleName: "Novillos",
	    heads: 78,
	    pen: "3C21",
	    weight: 18330
	}]	
    }, ], 
    createData : function() {
    },
    readData : function() {
	return this.cacheData;
    },
    sell : function(objSale, cbObj, cbMethod) {
	objSale.sale_id = ++this.lastID;
	this.cacheData.push(objSale);
	for(var i=0;i<objSale.detail.length;i++){
	    if(!cachePen.substractHeadsInPen(objSale.detail[i].pen,objSale.detail[i].heads)){
		return false;
	    }
	}
	if (cbMethod) {
	    cbObj[cbMethod]();
	}
	return true;
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